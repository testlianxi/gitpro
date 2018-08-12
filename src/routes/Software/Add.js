import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, Accordion, InputItem, TextareaItem, WingBlank, Button } from 'antd-mobile';
import { _getPayById, _editPay, _createPay } from '_s/pay';
import { _uploadFile } from '_s/utils';

class Payment extends Component {
  state = {
    id: -1,
    wx_appid: '', // 微信appid
    wx_mchid: '', // 微信商铺ID
    wx_apikey: '', // 微信API密钥
    wx_ctr: null, // 微信证书
  }

  componentDidMount(){
    const { match } = this.props;
    const id = match.params.id;
    if(id == -1) return;
    _getPayById({id})
    .then(res=>{
      this.setState({...res})
    });
  }

  save =()=>{
    const { history } = this.props;
    history.goBack()
  }

  upLoad =()=>{
    this._upFile.click()
  }

  setUp =(e) =>{
    let temp = e.target;
    let file = temp.files[0];
    _uploadFile({files: file}).then(res => {
      this.setState({ wx_ctr: res })
    })
  }

  render() {
    const { history , match } = this.props;
    const {
      id,
      wx_appid, // 微信appid
      wx_mchid, // 微信商铺ID
      wx_apikey, // 微信API密钥
      wx_ctr, // 微信证书
    } = this.state;

    let title = id == -1 ? '添加软件更新' : '修改软件更新';

    return (
      <div className={styles.login}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<a onClick={this.save}>保存</a>}
        >
          {title}
        </NavBar>
        <div className={styles.fenge}>
          <div className={styles.second}>
            <List>
              <InputItem
                clear
                value={wx_appid}
                placeholder="渠道编码"
                onChange={value=>this.setState({ wx_appid: value })}
              >
                AppId
              </InputItem>
              <InputItem
                clear
                value={wx_appid}
                placeholder="软件版本"
                onChange={value=>this.setState({ wx_appid: value })}
              >
                AppId
              </InputItem>
              <InputItem
                clear
                placeholder="渠道名称"
                value={wx_mchid}
                onChange={value=>this.setState({ wx_mchid: value })}
              >
                商户ID
              </InputItem>
              <InputItem
                clear
                placeholder="软件CODE"
                value={wx_apikey}
                onChange={value=>this.setState({ wx_apikey: value })}
              >
                API密钥
              </InputItem>
            </List>
            <List.Item arrow="horizontal" onClick={this.upLoad}>
              APK上传
              <input
              ref={ upFile => this._upFile = upFile }
              type='file'
              className={styles.files}
              onChange={this.setUp}/>
            </List.Item>
          </div>
        </div>
        <WingBlank>
          <Button type="primary" onClick={this.save}>保存</Button>
        </WingBlank>
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Payment,
});

export default connect(mapStateToProps)(Payment);
