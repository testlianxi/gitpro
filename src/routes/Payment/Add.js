import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, Accordion, InputItem, TextareaItem, WingBlank, Button } from 'antd-mobile';
import er from './er.png'
import { _getPayById, _editPay, _createPay, _getPayState } from '_s/pay';
import { _uploadFile } from '_s/utils';
import QRCode from 'qrcode.react';

class Payment extends Component {
  state = {
    id: -1,
    wx_appid: '', // 微信appid
    wx_mchid: '', // 微信商铺ID
    wx_apikey: '', // 微信API密钥
    wx_ctr: null, // 微信证书
    wx_qr_image: null,
    zfb_appid: '', // 支付宝APPID
    zfb_pid: '', // 支付宝PID
    zfb_public_key: '', // 支付宝公钥
    zfb_private_key: '', // 用户私钥
    zfb_qr_image: null,
    payee: '', // 收款方姓名
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
    const {
      id,
      payee,// 收款公司名字
      wx_appid, // 微信appid
      wx_mchid, // 微信商铺ID
      wx_apikey, // 微信API密钥
      wx_ctr, // 微信证书
      zfb_appid, // 支付宝APPID
      zfb_pid, // 支付宝PID
      zfb_public_key, // 支付宝公钥
      zfb_private_key, // 用户私钥} = this.state;
    } = this.state;
    if(id == -1){
      _createPay({
        payee,
        wx_appid,
        wx_company_id: wx_mchid,
        wx_api_key: encodeURIComponent(wx_apikey),
        wx_ctr,
        zfb_appid,
        zfb_company_id: zfb_pid,
        zfb_public_key: encodeURIComponent(zfb_public_key),
        zfb_private_key: encodeURIComponent(zfb_private_key)
      })
      .then(res => {
        if(res == 1){
          history.goBack()
        }
      })
    }else{
      _editPay({
        id,
        payee,
        wx_appid,
        wx_company_id: wx_mchid,
        wx_api_key: encodeURIComponent(wx_apikey),
        wx_ctr,
        zfb_appid,
        zfb_company_id: zfb_pid,
        zfb_public_key: encodeURIComponent(zfb_public_key),
        zfb_private_key: encodeURIComponent(zfb_private_key)
      })
      .then(res =>{
        if(res == 1){
          history.goBack()
        }
      })
    }
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

  zgbImg = () =>{
    const {
      order_id
    } = this.state;
    _getPayState({orderId: order_id}) .then(res=>{
      console.log(res);
    })
  }

  wxImg = () =>{
    const {
      wx_appid,
      wx_mchid,
      wx_apikey,
      wx_ctr,
    } = this.state;

    let params = {
      wx_appid,
      wx_mchid,
      wx_apikey,
      wx_ctr,
    }
    console.log(params);
  }

  render() {
    const { history , match } = this.props;
    const {
      id,
      payee,// 收款公司名字
      wx_appid, // 微信appid
      wx_mchid, // 微信商铺ID
      wx_apikey, // 微信API密钥
      wx_ctr, // 微信证书
      wx_qr_image,
      zfb_appid, // 支付宝APPID
      zfb_pid, // 支付宝PID
      zfb_public_key, // 支付宝公钥
      zfb_private_key, // 用户私钥
      zfb_qr_image
    } = this.state;

    let title = id == -1 ? '添加支付' : '修改支付';

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
          <InputItem
            clear
            placeholder="请输入收款方名称"
            value={payee}
            onChange={value=>this.setState({ payee: value })}
          >
            收款方
          </InputItem>
        </div>
        <div className={styles.fenge}>
          <Accordion>
            <Accordion.Panel header="微信支付">
              <div className={styles.second}>
                <List>
                  <InputItem
                    clear
                    value={wx_appid}
                    placeholder="请输入AppId"
                    onChange={value=>this.setState({ wx_appid: value })}
                  >
                    AppId
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="请输入商户ID"
                    value={wx_mchid}
                    onChange={value=>this.setState({ wx_mchid: value })}
                  >
                    商户ID
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="请输入API密钥"
                    value={wx_apikey}
                    onChange={value=>this.setState({ wx_apikey: value })}
                  >
                    API密钥
                  </InputItem>
                </List>
                <List.Item arrow="horizontal" onClick={this.upLoad}>
                  CRT证书上传
                  <input
                  ref={ upFile => this._upFile = upFile }
                  type='file'
                  className={styles.files}
                  onChange={this.setUp}/>
                </List.Item>
                {
                  (id != -1) &&
                  <div className={styles.erweima}>
                    <div className={styles.img}>
                      {
                        wx_qr_image
                        &&
                        <QRCode value={wx_qr_image} />
                      }
                    </div>
                    <a onClick={this.zgbImg}>二维码测试</a>
                  </div>
                }
              </div>
            </Accordion.Panel>
          </Accordion>
        </div>
        <div className={styles.fenge}>
          <Accordion>
            <Accordion.Panel header="支付宝支付">
              <div className={styles.second}>
                <List>
                  <InputItem
                    clear
                    value={zfb_appid}
                    placeholder="请输入Appid"
                    onChange={value=>this.setState({ zfb_appid: value })}
                  >
                    Appid
                  </InputItem>
                  <InputItem
                    clear
                    value={zfb_pid}
                    placeholder="请输入PID"
                    onChange={value=>this.setState({ zfb_pid: value })}
                  >
                    PID
                  </InputItem>
                  <TextareaItem
                    title="支付宝公钥"
                    value={zfb_public_key}
                    placeholder="支付宝公钥"
                    onChange={value=>this.setState({ zfb_public_key: value })}
                    autoHeight
                  />
                  <TextareaItem
                    title="用户私钥"
                    value={zfb_private_key}
                    placeholder="用户私钥"
                    onChange={value=>this.setState({ zfb_private_key: value })}
                    autoHeight
                  />
                </List>
                {
                  (id != -1) &&
                  <div className={styles.erweima}>
                    <div className={styles.img}>
                      {
                        zfb_qr_image
                        &&
                        <QRCode value={zfb_qr_image} />
                      }
                    </div>
                    <a onClick={this.zgbImg}>二维码测试</a>
                  </div>
                }
              </div>
            </Accordion.Panel>
          </Accordion>
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
