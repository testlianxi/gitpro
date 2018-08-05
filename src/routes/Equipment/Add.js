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
      sbxh: '',
      // 安卓型号
      azxh: '',
      // 主控型号
      zkxh: '',
      // 运营公司
      yygs: '',

      // 设备id
      sbid: '',
      // 设备登陆
      sbdl: '',
      // 收款公司id
      selectedValue: ['a'],
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
      yyryValue: ['a'],
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
      dwdz: '',
      // 设备名称
      sbmc: '',
      // 客服电话
      kfdh: '',
      // 广告更新
      adFileName: '请选择文件',
      // 软件更新
      softFileName: '请选择文件',
    };
  }

  loadDeviceInnfo() {
    const { id } = this.state;
    service._getDeviceBaseinfoById({id})
      .then(res => {
        const data = res.data;
        console.log(data);
        if (+data.status === 1) {
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
    const { sbxh, azxh, zkxh, yygs } = this.state;
    const { 
      sbid, sbdl, selectData, selectedValue, dwdz, sbmc, kfdh,
      yyryValue, yyryData, adFileName, softFileName
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
                value={sbxh}
                clear
                placeholder="请输入设备型号"
                onChange={sbxh => {this.setState({sbxh})}}
              >设备型号</InputItem>
            </List>
            <List>
              <InputItem
                value={azxh}
                clear
                placeholder="请输入安卓型号"
                onChange={azxh => {this.setState({azxh})}}
              >安卓型号</InputItem>
            </List>
            <List>
              <InputItem
                value={zkxh}
                clear
                placeholder="请输入主控型号"
                onChange={zkxh => {this.setState({zkxh})}}
              >主控型号</InputItem>
            </List>
            <List>
              <InputItem
                value={yygs}
                clear
                placeholder="请输入运营公司"
                onChange={yygs => {this.setState({yygs})}}
              >运营公司</InputItem>
            </List>
          </div>

          <div className={styles.tabitem}>
            <List>
              <InputItem
                value={sbid}
                clear
                placeholder="安卓的芯片地址（手动填写）"
                onChange={sbid => {this.setState({sbid})}}
              >设备ID</InputItem>
            </List>

            <List>
              <InputItem
                value={sbdl}
                clear
                placeholder="设备登录使用的手机号码（手动填写）"
                onChange={sbdl => {this.setState({sbdl})}}
              >设备登录</InputItem>
            </List>


            <div className={styles.skgs}>
              <div className={styles.label}>收款公司</div>
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

            <List>
              <InputItem
                value={dwdz}
                clear
                placeholder="请输入"
                onChange={dwdz => {this.setState({dwdz})}}
              >点位地址</InputItem> 
            </List>

            <List>
              <InputItem
                value={sbmc}
                clear
                placeholder="请输入"
                onChange={sbmc => {this.setState({sbmc})}}
              >设备名称</InputItem>
            </List>

            <List>
              <InputItem
                value={kfdh}
                clear
                placeholder="请输入"
                onChange={kfdh => {this.setState({kfdh})}}
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
                    onChange={e => {this.setState({softFileName: e.target.files[0].name})}}
                  />
                  <div className={softFileName === '请选择文件' ? styles.selectfile : null}>{softFileName}</div>
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
                  value={yyryValue}
                  cascade
                  onOk={v => {this.setState({yyryValue: v})}}
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
