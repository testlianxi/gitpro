import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

import service from '_s/Index';

import Search from '_c/search';
import Title from '_c/topbar';
import Pagination from '_c/pagination';

import styles from './style.scss';

const RecordItem = (props) => {
  // state:0 成功，1：数据中断，2：退款成功，3：退款失败,4:点击退款
  const { data, getRefund } = props;
  const payType = {
    2: '微信',
    3: '支付宝'
  };
  const statusInner = ['成功', '数据中断', '退款成功', '退款失败', '点击退款'];
  const status = ['success', 'waring', 'success', 'waring', 'error'];

	return (
		<li className={styles.recorditem}>
			<p className={styles.name}>{data.adr}<span>单价：{data.price}</span></p>
			<p>商品名称：{data.goods_name}</p>
			<p>订单编号：{data.order_id}</p>
			<p>{payType[data.pay_type]}支付单号：{data.transaction_id}</p>
			<p>收款账号：{data.company}</p>
			<p className={styles.time}>{data.date}
				<a
          href="javascript:;"
          className={styles[status[data.state]]}
          onClick={+data.state === 4 ? function() {getRefund(data.order_id)} : null}
        >{statusInner[data.state]}</a>
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

      totalPage: null,

      type: 0,

      orderListData: null,
		};
	}

  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadOrderList();
    });
  }

  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadOrderList);
  }

	back = () => {
		history.back(-1);
	}

	toNotes = () => {
		this.props.dispatch(routerRedux.push('/BankNotes'));
	}

  changeType = (type) => {
    this.setState({type, offset: 1}, this.loadOrderList);
  }

  scrollTo() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  loadOrderList() {
    const { getOrderList } = service;
    const { size, offset, search, type } = this.state;

    getOrderList({
      size,
      offset: (offset - 1) * size,
      search,
      type,
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          this.setState({
            orderListData: data.data.result.length ? data.data.result : null,
            totalPage: data.data.total_page || null,
          });
        } else {
          console.log('获取订单列表失败');
        }
      });
  }

  loadRefund = (id) => {
    service.getRefund({id})
      .then(res => {
        if (res.data.status === '1') {
          Toast.success('退款成功！', 1);
          this.loadOrderList();
        } else {
          Toast.fail('退款失败！', 1);
        }
      });
  }

  componentWillMount() {
    this.loadOrderList();
  }

  render() {
    const { offset, totalPage, orderListData, type } = this.state;
    return (
      <section className={styles.record}>
        <Title
    			leftContent="返回"
    			centerContent="交易记录"
    			rightContent="纸币记录"
    			leftClick={this.back}
    			rightClick={this.toNotes}
    	  />
    	  <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <div className={styles.tabswitch}>
        	<a
            className={type === 0 ? styles.active : null}
            href="javascript:;"
            onClick={() => {this.changeType(0)}}
          >全部状态</a>
        	<a
            className={type === 2 ? styles.active : null}
            href="javascript:;"
            onClick={() => {this.changeType(2)}}
          >数据中断</a>
        	<a
            className={type === 1 ? styles.active : null}
            href="javascript:;"
            onClick={() => {this.changeType(1)}}
          >退款订单</a>
        </div>
        <div>
	        <ul>
            {
              orderListData
              &&
              orderListData.length
              &&
              orderListData.map(item => <RecordItem getRefund={this.loadRefund} key={item.order_id} data={item} />)
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
