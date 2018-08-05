import React, { Component } from 'react';
import { connect } from 'dva';

import service from '_s/Index';

import Search from '_c/search';
import Title from '_c/topbar';
import Pagination from '_c/pagination';
import styles from './style.scss';

const Item = (props) => {
  const { data } = props;
  const statusInner = ['纸币正常', '纸币清零'];
  const status = ['success', 'error'];
	return (
		<li className={styles.recorditem}>
			<p className={styles.name}>{data.adr}</p>
			<p>纸币金额：{data.price}</p>
			<p>订单编号：{data.order_id}</p>
			<p className={styles.time}>{data.date}
        <a href="javascript:;" className={styles[status[data.state]]}>{statusInner[data.state]}</a>
			</p>
		</li>
	);
}

class Record extends Component {
	constructor(props) {
		super(props);
		this.state = {
      size: 10,
      offset: 1,
      search: '',
      type: 0,

      totalPage: null,

      paperOrderList: null,
		};
	}

	pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadPaperOrderList();
    });
  }

  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadPaperOrderList);
  }

  changeType = (type) => {
    this.setState({type, offset: 1}, this.loadPaperOrderList);
  }

  loadPaperOrderList() {
    const { getPaperOrderList } = service;
    const { size, offset, search, type } = this.state;
    getPaperOrderList({
      size,
      offset: (offset - 1) * size,
      search,
      type,
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          this.setState({
            paperOrderList: data.data.result.length ? data.data.result : null,
            totalPage: data.data.total_page || null,
          })
        } else {
          console.log('获取纸币记录失败');
        }
      });
  }

  componentWillMount() {
    this.loadPaperOrderList();
  }

  render() {
    const { offset, totalPage, paperOrderList, type } = this.state;
    const { history } = this.props;
    return (
      <section className={styles.record}>
        <Title
    			leftContent="返回"
    			centerContent="纸币记录"
    			leftClick={() => history.goBack()}
    	  />
    	  <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.tabswitch}>
        	<a
            href="javascript:;"
            className={type === 0 ? styles.active : null}
            onClick={() => {this.changeType(0)}}
          >全部状态</a>
        	<a
            href="javascript:;"
            className={type === 1 ? styles.active : null}
            onClick={() => {this.changeType(1)}}
          >纸币清零</a>
        </div>
        <div>
	        <ul>
	        	{
              paperOrderList
              &&
              paperOrderList.length
              &&
              paperOrderList.map(item => (<Item key={item.order_id} data={item} />))
            }
	        </ul>
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
      </section>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Record,
});

export default connect(mapStateToProps)(Record);
