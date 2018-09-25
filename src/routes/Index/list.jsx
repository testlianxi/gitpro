import React, { Component } from 'react';

import service from '_s/Index';

import Search from '_c/search';
import Pagination from '_c/pagination';
import styles from './style.scss';

const Item = (props) => {
  const data = props.data;
  return (
    <li className={styles.item}>
      <div className={styles.rightinfo}>
        <span>{data.version}<i className={styles.vifi}>wifi</i></span>
        <span className={styles.daymoney}>¥{data.sale_amount}</span>
      </div>
      <div className={styles.deviceindex}>
        <span style={data.is_online === 0 ? {color: '#ccc'} : {}}>NO:{data.machine_id}</span>
        {+data.goods_status === 1 && (<span className={styles.taglack}>缺货</span>)}
        {+data.sign_status === 1 && (<span className={styles.tagerr}>故障</span>)}
      </div>
      <div className={styles.devicename}>{data.company}</div>
      <div className={styles.deviceaddr}>{data.adr}</div>
    </li>
  );
}

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
      size: 10,
      offset: 1,
      search: '',

      totalPage: null,

      companyDeviceList: null,
		};
	}

  pageChange = (n) => {
    this.setState({offset: n}, () => {
      n && this.loadCompanyDeviceList();
    });
  }

  toSearch = (search) => {
    this.setState({search, offset: 1}, this.loadCompanyDeviceList);
  }

  loadCompanyDeviceList() {
    const { getCompanyDeviceList } = service;
    const { size, offset, search } = this.state;

    getCompanyDeviceList({
      size,
      offset: (offset - 1) * size,
      search,
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          this.setState({
            companyDeviceList: data.data.result && data.data.result.length ? data.data.result : null,
            totalPage: data.data.total_page || null,
          })
        } else {
          console.log('获取公司设备失败');
        }
      });
  }

  componentWillMount() {
    this.loadCompanyDeviceList();
  }

  render() {
    const { offset, totalPage, companyDeviceList } = this.state;

    return (
      <div className={styles.list}>
        <Search
          placeholder="请输入搜索词"
          searchText="搜索"
          onSearch={this.toSearch}
        />
        <section className={styles.fninfo}>
          <ul>
            {
              companyDeviceList
              &&
              companyDeviceList.length
              &&
              companyDeviceList.map(item => (<Item key={item.machine_id} data={item} />))
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
        </section>
      </div>
    );
  }
}

export default List;
