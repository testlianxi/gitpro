import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon } from 'antd-mobile';
import { Link } from 'dva/router';

import Shoping from '_c/Shoping';
import Search from '_c/search';
import Pagination from '_c/pagination';

import { _getGoodList } from '_s/good';

class Commodity extends Component {

  state = {
    search: '',
    offset: 1,
    size: 10,
    totalPage: null,
    goodList: [],
  }
  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadGoodList();
    });
  }
  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadGoodList);
  }

  loadGoodList() {
    const { size, offset, search } = this.state;

    _getGoodList({
      size,
      offset: (offset - 1) * size,
      search,
    })
    .then(res => {
      let len = Math.ceil(res.length / size);
      this.setState({
        goodList: res,
        totalPage: len,
      })
    });
  }

  componentWillMount() {
    this.loadGoodList();
  }

  render() {
    const { history, match } = this.props;
    const { offset, totalPage, goodList } = this.state;
    return (
      <div className='conter'>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<Link to={`${ match.path }/add/-1`}>添加</Link>}
        >
          商品管理
        </NavBar>
        <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.box}>
        {
          goodList.map((item,i)=>{
            return (
              <Shoping money={item.price} name={item.name} url={item.image_url} key={i}>
                <Link to={`${ match.path }/add/${item.id}`}>编辑</Link>
              </Shoping>
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
  ...state.Commodity,
});

export default connect(mapStateToProps)(Commodity);
