import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, Accordion, InputItem, TextareaItem, WingBlank, Button, Toast } from 'antd-mobile';
import { _uploadFile, _editSoftware, _getSoftwareInfo } from '_s/utils';

class Payment extends Component {
  state = {
    id: -1,
    channel_id: '', // 渠道编码
    channel_name: '', // 渠道名称
    version: '', // 软件版本
    version_code: null, // 软件CODE
  }

  componentDidMount(){
    const { match } = this.props;
    const id = match.params.id;
    if(id == -1) return;
    this.setState({id});
    _getSoftwareInfo({id})
      .then(res=>{
        this.setState({...res.data.result})
      });
  }

  save =()=>{
    const { history } = this.props;
    // history.goBack()
    const {
      id, channel_id, channel_name,
      version, version_code
    } = this.state;
    if (id < 0) return alert('请添加一个APK');
    _editSoftware({
      id, channel_id, channel_name,
      version, version_code
    })
      .then(res => {
        if (res.data.status !== "1") {
          throw new Error('err')
          return;
        }
        Toast.success('保存成功', 1);
        setTimeout(() => {
          history.goBack();
        }, 1000);
      }).catch((res) => {
        Toast.fail('保存失败', 1);
      });
  }

  upLoad =()=>{
    this._upFile.click()
  }

  setUp = async (e) =>{
    let temp = e.target;
    let file = temp.files[0];
    Toast.loading('APK上传中....', 30);
    await _uploadFile({files: file}).then(res => {
      Toast.hide();
      this.setState({ id: res })
      Toast.success('APK上传成功', 1);
    }).catch(() => {
      Toast.hide();
      Toast.fail('APK上传失败', 1);
    });
    
  }

  render() {
    const { history , match } = this.props;
    const {
      id,
      channel_id, // 微信appid
      channel_name, // 微信商铺ID
      version, // 微信API密钥
      version_code, // 微信证书
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
                value={channel_id}
                placeholder="渠道编码"
                onChange={value=>this.setState({ channel_id: value })}
              >
                渠道编码
              </InputItem>
              <InputItem
                clear
                placeholder="渠道名称"
                value={channel_name}
                onChange={value=>this.setState({ channel_name: value })}
              >
                渠道名称
              </InputItem>
              <InputItem
                clear
                value={version}
                placeholder="软件版本"
                onChange={value=>this.setState({ version: value })}
              >
                软件版本
              </InputItem>
              <InputItem
                clear
                placeholder="软件CODE"
                value={version_code}
                onChange={value=>this.setState({ version_code: value })}
              >
                软件CODE
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
