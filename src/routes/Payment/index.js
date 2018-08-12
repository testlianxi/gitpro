import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon } from 'antd-mobile';
import { Link } from 'dva/router';

import Pagination from '_c/pagination';
import Search from '_c/search';

import { _getPayList } from '_s/pay';

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

    _getPayList({
      size,
      offset: (offset - 1) * size,
      search,
    })
    .then(res => {
      this.setState({
        payList: res.result,
        totalPage: res.total_page,
      })
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
          支付管理
        </NavBar>
        <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.paymentList}>
        {
          payList.length == 0 && <div>没有数据</div>
        }
        {
          payList.map((item,i)=>{
            return (
              <Link key={i} to={`${ match.path }/add/${item.id}`}>
                <span>{item.name}</span>
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
