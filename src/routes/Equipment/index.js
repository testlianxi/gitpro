import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon } from 'antd-mobile';
import Search from '_c/search';
import Pagination from '_c/pagination';
import { Link } from 'dva/router';
import service from '_s/Index';

const Item = (props) => {
  const { data, match } = props;
  return (
    <li className={styles.item}>
      <Link to={`${props.match.path}/add/${data.id}`}>
        <div className={styles.rightinfo}>
          <span>{data.version}<i className={styles.vifi}>wifi</i></span>
          <span className={styles.daymoney}>¥{data.sale_amount}</span>
        </div>
        <div className={styles.deviceindex}>
          NO:{data.id}
          {+data.goods_status === 1 && (<span className={styles.taglack}>缺货</span>)}
          {+data.sign_status === 1 && (<span className={styles.tagerr}>故障</span>)}
        </div>
        <div className={styles.devicename}>{data.company}</div>
        <div className={styles.deviceaddr}>{data.adr}</div>
      </Link>
    </li>
  );
}

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 10,
      offset: 1,
      search: '',

      totalPage: null,

      type: 0,

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

  changeType = (type) => {
    this.setState({type, offset: 1}, this.loadCompanyDeviceList);
  }

  scrollTo() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  loadCompanyDeviceList() {
    const { getCompanyDeviceList } = service;
    const { size, offset, search, type } = this.state;

    getCompanyDeviceList({
      size,
      offset: (offset - 1) * size,
      search,
      type,
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          this.setState({
            companyDeviceList: data.data.result.length ? data.data.result : null,
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
    const { history, match } = this.props;
    const { offset, totalPage, companyDeviceList, type } = this.state;
    return (
      <div className={styles.equipment}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<Link to={`${ match.path }/add/-1`}>添加</Link>}
        >
          设备管理
        </NavBar>
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
          >故障设备</a>
          <a
            className={type === 1 ? styles.active : null}
            href="javascript:;"
            onClick={() => {this.changeType(1)}}
          >缺货设备</a>
        </div>
        <section className={styles.fninfo}>
          <ul>
            {
              companyDeviceList
              &&
              companyDeviceList.length
              ?
              companyDeviceList.map(item => (<Item key={item.id} match={match} data={item} />)) : null
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
// 绑定model
const mapStateToProps = state => ({
  ...state.Equipment,
});

export default connect(mapStateToProps)(Equipment);
