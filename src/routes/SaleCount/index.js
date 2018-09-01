import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, List, Picker } from 'antd-mobile';
import Title from '_c/topbar';
import service from '_s/Index';
import Pagination from '_c/pagination';
import { HOST } from '_u/api';
import styles from './style.scss';

const Table = (props) => {
  let { query, data } = props;
  return (
    <div className={styles.tableitem}>
      <table className={styles.tableinfo}>
        <tbody>
          <tr>
            <td style={{textAlign: 'left'}} colSpan="4">{query.start} - {query.end}</td>
          </tr>
          <tr>
            <td width="25%">{data.id}</td>
            <td colSpan="3">{data.name}</td>
          </tr>
          <tr style={{color: '#000'}}>
            <td>名称</td>
            <td>销售数量</td>
            <td>单价</td>
            <td>总价</td>
          </tr>
          {
            data.goods_data.length
            ?
            data.goods_data.map((val, index) => (<tr key={index}>
              <td>{val.goods_name}</td>
              <td>{val.sale_count}</td>
              <td>{val.price}</td>
              <td>{val.sale_volume}</td>
            </tr>))
            : null
          }
          
          <tr>
            <td colSpan="3">合计</td>
            <td style={{color: '#000'}}>{data.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

class SaleCount extends Component {
	constructor(props) {
		super(props);
		this.state = {
      size: 10,
      offset: 1,

      totalPage: null,

      sdate: new Date(),
      edate: new Date(),
      selectedValue: [''],
      selectData: [
        {
          value: '',
          label: '全部'
        }
      ],
      query: {
        start: new Date().format('yyyy-MM-dd'),
        end: new Date().format('yyyy-MM-dd'),
        devices: '',
      },
      // 销售额
      total: '00.00',
      // 销售列表
      saleAccountList: null,
		};
	}

	back = () => {
		history.back(-1);
	}

  today = () => {
    let query = this.state.query;
    query.start = new Date().format('yyyy-MM-dd');
    query.end = new Date().format('yyyy-MM-dd');


    this.setState({ query, sdate: new Date(), edate: new Date() }, this.loadOrderList);
  }

  loadOrderList() {
    const { getSaleAccountList } = service;
    const { size, offset, query } = this.state;

    getSaleAccountList({
      size,
      offset: (offset - 1) * size,
      start: query.start,
      end: query.end,
      devices: query.devices,
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          this.setState({
            saleAccountList: data.data.result.length ? data.data.result : null,
            totalPage: data.data.total_page || null,
            total: data.data.total
          });
        } else {
          console.log('销售统计列表失败');
        }
      });
  }

  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadOrderList();
    });
  }

  toSearch = () => {
    this.setState({
      offset: 1,
      totalPage: null,
      query: {
        start: new Date(this.state.sdate).format('yyyy-MM-dd'),
        end: new Date(this.state.edate).format('yyyy-MM-dd'),
        devices: this.state.selectedValue[0] || '',
      }
    }, this.loadOrderList);
  }

  componentWillMount() {
    service.getDeviceListOnly()
      .then(res => {
        const data = res.data;
        if (+data.status === 1 && data.data.result) {
          let selectData = [{
            value: '',
            label: '全部'
          }];
          data.data.result.forEach(item => {
            selectData.push({label: item.name, value: item.id});
          });
          this.setState({selectData}, this.loadOrderList);
        } else {
          console.log('设备列表获取失败');
        }
      });
  }

  render() {
    const {
      size, offset, totalPage, edate,
      sdate, selectData, selectedValue,
      total, saleAccountList, query
    } = this.state;

    const now = new Date();
    const day = 8.64e7;

    const search = {
      size,
      offset: (offset - 1) * size,
      start: query.start,
      end: query.end,
      devices: query.devices,
    }
    const downLoad = `${HOST}/download_sale_account_list?${Object.keys(search).map(key => `${key}=${search[key]}`).join('&')}`;
    return (
      <div className={styles.salecount}>
        <Title
    			leftContent="返回"
    			centerContent="销售统计"
    			rightContent="今天统计"
    			leftClick={this.back}
    			rightClick={this.today}
    	  />
        <div className={styles.search}>
          <div>
            <span>日期：</span>
            <div className={styles.datasecect}>
              <DatePicker
                mode="date"
                title="选择开始时间"
                extra="Optional"
                value={sdate}
                maxDate={edate}
                onChange={sdate => this.setState({ sdate })}
              >
                <List.Item></List.Item>
              </DatePicker>
            </div>
            <span className={styles.concat}>至</span>
            <div className={styles.datasecect}>
              <DatePicker
                mode="date"
                title="选择结束时间"
                extra="Optional"
                value={edate}
                minDate={sdate}
                onChange={edate => this.setState({ edate })}
              >
                <List.Item></List.Item>
              </DatePicker>
            </div>
          </div>
          <div>
            <span>设备：</span>
            <div className={styles.datasecect}>
              <Picker
                data={selectData}
                cols="1"
                value={selectedValue}
                cascade
                onOk={v => {this.setState({selectedValue: v})}}
              >
                <List.Item onClick={() => {}}></List.Item>
              </Picker>
            </div>
          </div>
          <div className={styles.selected}>
            <span>已选：</span>
            <i>{sdate.format('yyyy-MM-dd') + ' 至 ' + edate.format('yyyy-MM-dd')}</i>
            <i>{(selectData.find(item => item.value === selectedValue[0]) || {}).label}</i>
          </div>
          <a className={styles.seacrchbtn} onClick={this.toSearch} href="javascirpt:;">查询</a>
        </div>
    	  <div>
          <div className={styles.sum}>
            <span>销售额： <strong className="num">¥{total}</strong></span>
            <a target="_blank" href={downLoad}>对账详单</a>
          </div>
	        <section>
            {
              saleAccountList
              &&
              saleAccountList.map(item =>(<Table data={item} key={item.id} query={query} />))
            }
	        </section>
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
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.SaleCount,
});

export default connect(mapStateToProps)(SaleCount);
