import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { Link } from 'dva/router';

import Pagination from '_c/pagination';
import Search from '_c/search';

import { _getSoftwareList } from '_s/utils';

class Payment extends Component {
  state = {
    search: '',
    offset: 1,
    size: 10,
    totalPage: null,
    payList: [],
  }
  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadPayList();
    });
  }
  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadPayList);
  }

  loadPayList() {
    const { size, offset, search } = this.state;

    _getSoftwareList({
      size,
      offset: (offset - 1) * size,
      search
    })
    .then(res => {
      console.log(res);
      if (res.status === '1' && res.data.result) {
        this.setState({
          payList: res.data.result,
          totalPage: res.data.total_page,
        })
      } else {
        Toast.fail('列表加载失败', 1);
      }
      
    })
    .catch(() => {
      Toast.fail('列表加载失败', 1);
    });
  }

  componentWillMount() {
    this.loadPayList();
  }

  render() {
    const { history , match } = this.props;
    const { offset, totalPage, payList } = this.state;
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<Link to={`${ match.path }/add/-1`}>添加</Link>}
        >
          软件更新
        </NavBar>
        <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.paymentList}>
        {
          payList.map((item,i)=>{
            return (
              <Link key={i} to={`${ match.path }/add/${item.id}`}>
                <span>{item.channel_name}</span>
                <Icon type='right'/>
              </Link>
            )
          })
        }
        </div>
        {
          totalPage
          &&
          payList.length !== 0
          &&
          <Pagination
            pageChange={this.pageChange}
            maxPage={totalPage}
            currentPage={offset}
          />
        }
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Payment,
});

export default connect(mapStateToProps)(Payment);
