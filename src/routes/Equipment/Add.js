import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import Title from '_c/topbar';
import service from '_s/device';
import { HOST } from '_u/api';
import { NavBar, Icon, Tabs, InputItem, List, Picker, Toast } from 'antd-mobile';
import { _getPayList } from '_s/pay';
import {
  _createDevice, _createItemAisleinfo,
  _editDevice, _addaislelist
} from '_s/device';
import { _getGoodList } from '_s/good';
import Shoping from '_c/Shoping';

const tabs = [
  { title: '出厂信息' },
  { title: '基本信息'},
  { title: '货道信息' },
];

const GoodsItem = (props) => {
  const {
    index,
    data, changeInput,
    upDate, addGoods
  } = props;
  return (
    <li className={styles.goods}>
      <div className={styles.goodsinfo}>
        <div className={styles.img}><img src={data.image_url} alt="请选择商品" /></div>
        <div className={styles.goodsitem}>
          <span className={styles.gdstitle}>货道编号：</span>
          <input type="number" onChange={e => {changeInput(index, 'aisle_id', e.target.value)}} value={data.aisle_id} placeholder="请输入" />
        </div>
        <div className={styles.goodsitem}>
          <span className={styles.gdstitle}>价格：</span>
          <input type="number" onChange={e => {changeInput(index, 'price', e.target.value)}} value={data.price} placeholder="请输入" />
        </div>
        <div className={styles.goodsitem}>
          <span className={styles.gdstitle}>库存：</span>
          <input type="number" onChange={e => {changeInput(index, 'inventory', e.target.value)}} value={data.inventory} placeholder="请输入" />
        </div>
        <a className={styles.update} href="javascript:;" onClick={() => addGoods(index)}>添加商品</a>
        <div className={styles.goodstatus}>
        <a href="javascript:;" className={styles.addbtn} onClick={() => upDate(index)}>点击更新</a>
          <span>缺货</span>
          <span>卡货</span>
        </div>
      </div>
    </li>
  );
}

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 商品列表
      goodList: null,
      showGoods: false,
      // 当前操作货道的序号
      currentIndex: '',
      // 回传的货道列表
      aisle_info_list: [],
      // 机器id
      id: '',

      // 设备型号
      device_type: '',
      // 安卓型号
      android_type: '',
      // 主控型号
      control_type: '',
      // 运营公司
      operator_company: '',

      // 设备id
      device_id: '',
      // 设备登陆
      password: '',
      // 收款公司id
      company_id: [],
      // 收款公司列表
      payList: null,
      // 运营人员id
      operator: [],
      // 点位地址
      address: '',
      // 设备名称
      device_name: '',
      // 客服电话
      service_tel: '',
      // 广告更新
      adv_info: '请选择文件',
      // 软件更新
      soft_info: '请选择文件',

      level: localStorage.level,
    };
  }

  loadDeviceInnfo() {
    const { id } = this.state;
    service._getDeviceBaseinfoById({id})
      .then(res => {
        const data = res.data;
        const { device_info, aisle_info_list } = data.data;
        console.log(aisle_info_list);
        if (+data.status === 1) {
          this.setState({
            ...device_info,
            aisle_info_list,
            company_id: device_info.company_id ? [device_info.company_id] : []
          });
        } else {
          console.log('获取设备信息失败');
        }
      });
  }

  loadGoodList() {

    _getGoodList({
      size: 50,
      offset: 0,
      search: '',
    })
    .then(res => {
      this.setState({
        goodList: res.result,
      })
    });
  }

  loadCompany = () => {
    _getPayList({
      size: 50,
      offset: 0,
      search: '',
    })
    .then(payList => {
      this.setState({
        payList: payList.result.map(item => ({value: item.id, label: item.name})),
      })
    });
  }

  createDeviceInfo(type) {
    const {
      id,
      device_type,
      android_type,
      control_type,
      operator_company,
      device_id,
      password,
      company_id,
      address,
      device_name,
      service_tel,
      soft_info,
      adv_info,
    } = this.state;

    const send = type === 'upDate' ? _editDevice : _createDevice;
    send({
      id,
      device_type,
      android_type,
      control_type,
      operator_company,
      device_id,
      password,
      company_id: company_id[0],
      address,
      device_name,
      service_tel,
      soft_info,
      adv_info,
    })
      .then(res => {
        if (res.data.status === '1') {
          this.props.history.goBack();
        } else {
          alert('保存失败');
        }
      })
      .catch(res => {
        alert('操作失败');
      })
  }

  addAisle = () => {
    const { aisle_info_list, id } = this.state;
    aisle_info_list.push({
      id: id,
      goods_id: '',
      price: '',
      inventory: '',
      image_url: '',
      aisle_id: aisle_info_list.length + 1
    });
    this.setState({aisle_info_list});
  }

  upDateAll = () => {
    const { aisle_info_list } = this.state;
    _addaislelist({data: JSON.stringify(aisle_info_list)})
      .then(res => {
        if (res.data.status === '1') {
           Toast.success('保存成功', 1);
        } else {
          alert('保存失败');
        }
      })
      .catch(res => {
        alert('操作失败');
      })
  }

  changeDeviceInfo() {
    const { aisle_info_list } = this.state;
    this.createDeviceInfo('upDate');

    if (!aisle_info_list.length) return;
    var isEmpty = aisle_info_list.find(item => item.goods_id === '');
    if (isEmpty) return alert('请给货道添加商品');
    this.upDateAll();
  }

  savaData = () => {
    const { match } = this.props;
    const id = match.params.id;
    if (id === '-1') this.createDeviceInfo();
    else this.changeDeviceInfo();
  }

  changeInput = (index, type, value) => {
    const { aisle_info_list } = this.state;
    aisle_info_list[index][type] = value;
    this.setState({aisle_info_list});
  }

  upDate = (index) => {
    const { aisle_info_list } = this.state;
    const item = aisle_info_list[index];
    if (!item.goods_id) return Toast.fail('请添加一个商品', 1);
    _createItemAisleinfo({...item})
      .then(res => {
        if (res.data.status === '1') {
          Toast.success('更新成功', 1);
        } else {
          alert('操作失败');
        }
      })
      .catch(res => {
        alert('操作失败');
      })
  }

  addGoods = (currentIndex) => {
    this.setState({currentIndex, showGoods: true});
  }

  setGoodsId = (id, image_url) => {
    const { aisle_info_list, currentIndex } = this.state;
    const url = HOST + image_url;

    aisle_info_list[currentIndex].goods_id = id;
    aisle_info_list[currentIndex].image_url = url;
    this.setState({aisle_info_list, showGoods: false});
  }

  TabsChildren = () => {
    const { device_type, android_type, control_type, operator_company, device_id } = this.state;
    const { 
      id, password, payList, company_id, address, device_name, service_tel,
      operator, yyryData, adv_info, soft_info,
      goodList, showGoods, aisle_info_list,
      level,
    } = this.state;
    const { history } = this.props

    var isEdit = +level === 1;
    var domArr = [
      (
        <div className={styles.tabitem + (isEdit ? '' : ' ' + styles.noedit)}>
          <List>
            <InputItem
              value={device_type}
              clear
              placeholder="请输入设备型号"
              onChange={device_type => {this.setState({device_type})}}
            >设备型号</InputItem>
          </List>
          <List>
            <InputItem
              value={android_type}
              clear
              placeholder="请输入安卓型号"
              onChange={android_type => {this.setState({android_type})}}
            >安卓型号</InputItem>
          </List>
          <List>
            <InputItem
              value={control_type}
              clear
              placeholder="请输入主控型号"
              onChange={control_type => {this.setState({control_type})}}
            >主控型号</InputItem>
          </List>
          <List>
            <InputItem
              value={operator_company}
              clear
              placeholder="请输入运营公司"
              onChange={operator_company => {this.setState({operator_company})}}
            >运营公司</InputItem>
          </List>
            <List>
              <InputItem
                value={device_id}
                clear
                placeholder="安卓的芯片地址（手动填写）"
                onChange={device_id => {this.setState({device_id})}}
              >设备ID</InputItem>
            </List>

            <List>
              <InputItem
                value={password}
                clear
                placeholder="设备登录使用的手机号码（手动填写）"
                onChange={password => {this.setState({password})}}
              >设备登录</InputItem>
            </List>



            <List>
              <InputItem
                value={address}
                clear
                placeholder="请输入"
                onChange={address => {this.setState({address})}}
              >点位地址</InputItem> 
            </List>

            <List>
              <InputItem
                value={device_name}
                clear
                placeholder="请输入"
                onChange={device_name => {this.setState({device_name})}}
              >设备名称</InputItem>
            </List>

            <List>
              <InputItem
                value={service_tel}
                clear
                placeholder="请输入"
                onChange={service_tel => {this.setState({service_tel})}}
              >客服电话</InputItem>
            </List>
        </div>
      ),
    ];

    if (+level !== 3) {
      domArr.push(
        (
          <div className={styles.tabitem + (isEdit ? '' : ' ' + styles.noedit)}>

            <div className={styles.skgs}>
              <div className={styles.label}>收款公司</div>
              <div className={styles.datasecect}>
                <Picker
                  data={payList}
                  cols="1"
                  value={company_id}
                  cascade
                  onOk={v => {this.setState({company_id: v})}}
                >
                  <List.Item onClick={() => {}}></List.Item>
                </Picker>
              </div>
            </div>

            
            <div className={styles.skgs}>
              <div className={styles.label}>软件更新</div>
              <div className={styles.datasecect}>
                <label>
                  <input
                    className={styles.fileup}
                    ref={el => (this.softEl = el)}
                    type="file"
                    onChange={e => {this.setState({soft_info: e.target.files[0].name})}}
                  />
                  <div className={soft_info === '请选择文件' ? styles.selectfile : null}>{soft_info}</div>
                </label>
              </div>
            </div>


            <div className={styles.skgs}>
              <div className={styles.label}>广告更新</div>
              <div className={styles.datasecect}>
                <label>
                  <input
                    className={styles.fileup}
                    ref={el => (this.adEl = el)}
                    type="file"
                    onChange={e => {this.setState({adv_info: e.target.files[0].name})}}
                  />
                  <div className={adv_info === '请选择文件' ? styles.selectfile : null}>{adv_info}</div>
                </label>
              </div>
            </div>


            <div className={styles.skgs + ' ' + styles.taglist}>
              <div className={styles.label}>运营人员</div>
              <div className={styles.datasecect}>
                {
                  operator
                  &&
                  operator.length
                  ?
                  operator.map(item => (<span>{item}</span>)) : null
                }
              </div>
            </div>
          </div>
        )
      )
    }

    if (id !== '-1') {
      domArr.push(
        (
          <div className={styles.tabitem}>
            <div className={styles.tools}>
              {+level !== 3 && <a href="javascript:;" onClick={this.addAisle}>新增货道</a>}
              <a href="javascript:;" onClick={this.upDateAll}>一键更新</a>
            </div>
            <ul>
              {
                aisle_info_list && aisle_info_list.length ?
                aisle_info_list.map((item, index) => (
                  <GoodsItem
                    index={index}
                    key={item.aisle_id}
                    data={item}
                    changeInput={this.changeInput}
                    upDate={this.upDate}
                    addGoods={this.addGoods}
                  />)
                ) : null
              }
            </ul>
          </div>
        )
      )

    }
    return domArr;
  }

  componentWillMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.loadCompany();
    this.loadGoodList();
    this.setState({id}, () => {
      if (id !== '-1') this.loadDeviceInnfo();
    });
  }

  render() {
    const { device_type, android_type, control_type, operator_company, device_id } = this.state;
    const { 
      id, password, payList, company_id, address, device_name, service_tel,
      operator, yyryData, adv_info, soft_info,
      goodList, showGoods, aisle_info_list,
      level,
    } = this.state;
    const { history } = this.props
    var tabTitle = id === '-1' ? tabs.slice(0, 2) : tabs;
    if (+level === 3 && id !== '-1') {
      tabTitle = [
        { title: '出厂信息' },
        { title: '货道信息' },
      ]
    }
    return (
      <div className={styles.equadd}>
        <Title
          leftContent="返回"
          centerContent="添加设备"
          rightContent={+level === 1 ? '保存' : null}
          leftClick={() => {history.goBack()}}
          rightClick={+level === 1 ? this.savaData : null}
        />
        <Tabs tabs={tabTitle}>
          {this.TabsChildren()}
        </Tabs>
        {
          <ul style={{display: showGoods ? 'block' : 'none'}} className={styles.selectGoods}>
            <li className={styles.goodstitle}>请选择要添加的商品</li>
            {
              goodList
              &&
              goodList.map((item,i)=>{
                return (
                  <Shoping money={item.price} name={item.name} url={item.image_url} key={i}>
                    <a href="javascript:;" onClick={() => this.setGoodsId(item.id, item.image_url)}>选择</a>
                  </Shoping>
                )
              })
            }
          </ul>
        }
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Equipment,
});

export default connect(mapStateToProps)(Equipment);
