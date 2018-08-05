import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker, List, Picker } from 'antd-mobile';
import Title from '_c/topbar';
import Pagination from '_c/pagination';
import styles from './style.scss';


const Table = (props) => {
  return (
    <div className={styles.tableitem}>
      <table className={styles.tableinfo}>
        <tbody>
          <tr>
            <td style={{textAlign: 'left'}} colSpan="4">2001/12/12 - 2012/12/12</td>
          </tr>
          <tr>
            <td width="25%">56457471</td>
            <td colSpan="3">一个名字</td>
          </tr>
          <tr style={{color: '#000'}}>
            <td>名称</td>
            <td>销售数量</td>
            <td>单价</td>
            <td>总价</td>
          </tr>
          <tr>
            <td>名称</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td>名称</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td>名称</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
          <tr>
            <td colSpan="3">合计</td>
            <td style={{color: '#000'}}>123223</td>
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
      currentPage: 1,
      maxPage: 13,
      showCalendar: true,
      sdate: new Date(),
      edate: new Date(),
      selectedValue: ['a'],
      selectData: [
        {
          value: 'a',
          label: '别表1'
        },
        {
          value: 'b',
          label: '别表2'
        }
      ]
		};
	}

	back = () => {
		history.back(-1);
	}

  onConfirm = (e, v) => {
    console.log(e, v);
  }

  onPickerChange = (e) => {
    console.log(e);
  }

  render() {
    const { currentPage, maxPage, edate, sdate, selectData, selectedValue } = this.state;
    const now = new Date();
    const day = 8.64e7;
    return (
      <div className={styles.salecount}>
        <Title
    			leftContent="返回"
    			centerContent="纸币记录"
    			rightContent="今天统计"
    			leftClick={this.back}
    			rightClick={this.back}
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
          <div className={styles.selected}>已选：
            <i>{sdate.format('yyyy-MM-dd') + ' 至 ' + edate.format('yyyy-MM-dd')}</i>
            <i>{(selectData.find(item => item.value === selectedValue[0]) || {}).label}</i>
          </div>
          <a className={styles.seacrchbtn} href="javascirpt:;">查询</a>
        </div>
    	  <div>
          <div className={styles.sum}>
            <span>销售额： <strong className="num">¥00.00</strong></span>
            <a href="javascirpt:;">对账详单</a>
          </div>
	        <section>
            <Table />
            <Table />
            <Table />
            <Table />
	        </section>
          <Pagination
            pageChange={this.pageChange}
            maxPage={maxPage}
            currentPage={currentPage}
          />
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
