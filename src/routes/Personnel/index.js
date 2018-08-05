import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, Button } from 'antd-mobile';
import { Link } from 'dva/router';

import Search from '_c/search';
import Pagination from '_c/pagination';
import { _getUserList } from '_s/user';

class Personnel extends Component {
  state = {
    search: '',
    offset: 1,
    size: 10,
    totalPage: null,
    paginationList: [],
  }
  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadPaginationList();
    });
  }
  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadPaginationList);
  }

  loadPaginationList() {
    const { size, offset, search } = this.state;

    _getUserList({
      size,
      offset: (offset - 1) * size,
      search,
    })
    .then(res => {
      let len = Math.ceil(res.length / size);
      this.setState({
        paginationList: res,
        totalPage: len,
      })
    });
  }

  componentWillMount() {
    this.loadPaginationList();
  }

  render() {
    const { history, match } = this.props;
    const { offset, totalPage, paginationList } = this.state;
    console.log(paginationList);
    return (
      <div className='conter'>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<Link to={`${ match.path }/add/-1`}>添加</Link>}
        >
          人员管理
        </NavBar>
        <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.box}>
          {
            paginationList.map((item,i)=>{
              return (
                <section key={i} className={styles.people}>
                  <p>登录名：{item.name}</p>
                  <p>联系方式：{item.mobile}</p>
                  <p>所属单位：{item.company}</p>
                  <p>权限：{item.name}</p>
                  <div className={styles.ctrl}>
                    <Link to={`${ match.path }/add/${item.id}`} size='small'>修改</Link>
                    <Link to={`${ match.path }/AddEquipment/${item.id}`} size='small'>添加设备</Link>
                  </div>
                </section>
              )
            })
          }

        </div>
        {
          totalPage
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
  ...state.Personnel,
});

export default connect(mapStateToProps)(Personnel);
