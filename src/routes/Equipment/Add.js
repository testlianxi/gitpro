import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import Title from '_c/topbar';
import service from '_s/device';
import { NavBar, Icon, Tabs, InputItem, List, Picker } from 'antd-mobile';
const tabs = [
  { title: '出厂信息' },
  { title: '基本信息'},
  { title: '货道信息' },
];

const GoodsItem = (props) => {
  return (
    <li className={styles.goods}>
      <div className={styles.goodsinfo}>
        <span>
          价格
          <br />
          100
        </span>
        <span>
          库存
          <br />
          100
        </span>
        <span>
          推货
          <br />
          <input type="number" placeholder="请输入" />
        </span>
        <span>点击更新</span>
      </div>
      <div className={styles.goodstatus}>
        <span>缺货</span>
        <span>卡货</span>
        <a href="javascript:;">添加商品</a>
      </div>
    </li>
  );
}

class Equipment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 机器id
      id: '',

      // 设备型号
      device_type: '',
      // 安卓型号
      android_type: '',
      // 主控型号
      control_type: '',
      // 运营公司
      factory_company: '',

      // 设备id
      device_id: '',
      // 设备登陆
      password: '',
      // 收款公司id
      company: ['a'],
      // 收款公司列表
      selectData: [
        {
          value: 'a',
          label: '大风'
        },
        {
          value: 'b',
          label: '法国人'
        }
      ],
      // 运营人员id
      operator: ['a'],
      // 运营人员列表
      yyryData: [
        {
          value: 'a',
          label: '别表1'
        },
        {
          value: 'b',
          label: '别表2'
        }
      ],
      // 点位地址
      address: '',
      // 设备名称
      device_name: '',
      // 客服电话
      service_tel: '',
      // 广告更新
      adFileName: '请选择文件',
      // 软件更新
      soft_info: '请选择文件',
    };
  }

  loadDeviceInnfo() {
    const { id } = this.state;
    service._getDeviceBaseinfoById({id})
      .then(res => {
        const data = res.data;
        console.log(data);
        console.log({...data.data.device_info});
        if (+data.status === 1) {
          this.setState({...data.data.device_info})
        } else {
          console.log('获取设备信息失败');
        }
      });
  }

  componentWillMount() {
    const { match } = this.props;
    const id = match.params.id;
    this.setState({id}, () => {
      if (id !== '-1') this.loadDeviceInnfo();
    });
  }

  render() {
    const { device_type, android_type, control_type, factory_company } = this.state;
    const { 
      device_id, password, selectData, company, address, device_name, service_tel,
      operator, yyryData, adFileName, soft_info
    } = this.state;
    const { history } = this.props
    return (
      <div className={styles.equadd}>
        <Title
          leftContent="返回"
          centerContent="添加设备"
          rightContent="保存"
          leftClick={() => {history.goBack()}}
          rightClick={alert}
        />
        <Tabs tabs={tabs}>

          <div className={styles.tabitem}>
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
                value={factory_company}
                clear
                placeholder="请输入运营公司"
                onChange={factory_company => {this.setState({factory_company})}}
              >运营公司</InputItem>
            </List>
          </div>

          <div className={styles.tabitem}>
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


            <div className={styles.skgs}>
              <div className={styles.label}>收款公司</div>
              <div className={styles.datasecect}>
                <Picker
                  data={selectData}
                  cols="1"
                  value={company}
                  cascade
                  onOk={v => {this.setState({company: v})}}
                >
                  <List.Item onClick={() => {}}></List.Item>
                </Picker>
              </div>
            </div>

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
                    onChange={e => {this.setState({adFileName: e.target.files[0].name})}}
                  />
                  <div className={adFileName === '请选择文件' ? styles.selectfile : null}>{adFileName}</div>
                </label>
              </div>
            </div>


            <div className={styles.skgs}>
              <div className={styles.label}>运营人员</div>
              <div className={styles.datasecect}>
                <Picker
                  data={yyryData}
                  cols="1"
                  value={operator}
                  cascade
                  onOk={operator => {this.setState({operator})}}
                >
                  <List.Item onClick={() => {}}></List.Item>
                </Picker>
              </div>
            </div>

          </div>

          <div className={styles.tabitem}>
            <div className={styles.tools}>
              <a href="javascript:;">新增货道</a>
              <a href="javascript:;">一键更新</a>
            </div>
            <ul>
              <GoodsItem />
              <GoodsItem />
              <GoodsItem />
            </ul>
          </div>
        </Tabs>
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Equipment,
});

export default connect(mapStateToProps)(Equipment);
