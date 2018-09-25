import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, InputItem, ImagePicker, Button, WingBlank, Picker } from 'antd-mobile';
import { Link } from 'dva/router';

import Search from '_c/search';
import Pagination from '_c/pagination';

import { _getUser, _getDeviceList, _createDeviceList } from '_s/user';

const LEVEL = [{
  value: '0',
  label: '无权限'
},{
  value: '2',
  label: '公司管理员'
},{
  value: '3',
  label: '职员'
}]

const Item = (props) => {
  const { data, select, index } = props;

  let color = data.relate ? '#d7d7d7' : '#108ee9';
  let str = data.relate ? '已选择' : '未选择';

  return (
    <li className={styles.item}>
      <a>
        <div className={styles.rightinfo}>
          <span>{data.version}<i className={styles.vifi}>wifi</i></span>
          <span className={styles.daymoney}>¥{data.sale_amount}</span>
        </div>
        <div className={styles.deviceindex}>
          NO:{data.machine_id}
          {+data.goods_status === 1 && (<span className={styles.taglack}>缺货</span>)}
          {+data.sign_status === 1 && (<span className={styles.tagerr}>故障</span>)}
        </div>
        <div className={styles.devicename}>{data.company}</div>
        <div className={styles.deviceaddr}>{data.adr}</div>

        <div className={styles.selectBox}>
          <p style={{ background : color}} onClick={() => {select(index)}}>{str}</p>
        </div>
      </a>
    </li>
  );
}

class Personnel extends Component {

  state = {
    user: {
      user_name: '',
      mobile: '',
      company: '',
      level: '0'
    },
    size: 10,
    offset: 1,
    search: '',
    totalPage: null,
    companyDeviceList: null,

    selector: [],
  }

  async componentDidMount (){
    const { match } = this.props;
    const id = match.params.id;
    if(id == -1) return;
    await _getUser({id})
    .then(res=>{
      this.setState({user: { id, ...res }})
      _getDeviceList({
        size: 10,
        offset: 0,
        search: '',
        user: res.user_name
      }).then(res => {
        const data = res.data;
        if (+data.status === 1) {
          let temp = data.data.result;
          let filter = temp.filter(item => item.relate != 0);
          let selector = [];
          if( filter instanceof Array && filter.length > 0){
            selector= filter.map(item => item.id);
          }
          this.setState({
            selector,
            companyDeviceList: temp,
            totalPage: data.data.total_page || null,
          })
        } else {
          console.log('获取公司设备失败');
        }
      });
    });
  }

  save =()=>{
    const { history, match } = this.props;
    const { companyDeviceList } = this.state;
    const user_id = match.params.id;

    const { selector, user } = this.state;

    let { user_name, level } = user;
    
    let changeId = {
      device_list: [],
      forbid_device_list: []
    }
    companyDeviceList.forEach(item => changeId[item.relate ? 'device_list' : 'forbid_device_list'].push(item.id));

    let device_list = changeId.device_list.join(',');
    let forbid_device_list = changeId.forbid_device_list.join(',');

    _createDeviceList({
      user_id,
      user_name,
      level,
      device_list,
      forbid_device_list
    }).then(res =>{
      if(res == 1){
        history.goBack()
      }
    })


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
    const { size, offset, search, user } = this.state;

    _getDeviceList({
      size,
      offset: (offset - 1) * size,
      search,
      user: user.user_name
    })
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          let temp = data.data.result;
          this.setState({
            companyDeviceList: temp,
            totalPage: data.data.total_page || null,
          })
        } else {
          console.log('获取公司设备失败');
        }
      });
  }

  select = (index) => {
    let {companyDeviceList} = this.state;
    let relate = companyDeviceList[index].relate;

    companyDeviceList[index].relate = relate ? 0 : 1;
    this.setState({companyDeviceList});
  }

  render() {

    const { chhild, history , match, children } = this.props;
    const { user, companyDeviceList, size, offset, search, totalPage, selector } = this.state;
    let tempLevel = LEVEL.find((two) => two.value == user.level);
    tempLevel = tempLevel ? tempLevel.label : '';

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<a onClick={this.save}>保存</a>}
        >
          人员/添加设备
        </NavBar>
        <section className={styles.people}>
          <p>登录名：{user.user_name}</p>
          <p>联系方式：{user.mobile}</p>
          <p>所属单位：{user.company}</p>
          <p>权限：{ tempLevel }</p>
        </section>

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
              companyDeviceList.map((item, i) => {
                return (
                  <Item key={item.id} data={item} index={i} select={this.select} />
                )
              })
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
  ...state.Personnel,
});

export default connect(mapStateToProps)(Personnel);
