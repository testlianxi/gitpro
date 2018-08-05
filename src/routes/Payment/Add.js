import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, Accordion, InputItem, TextareaItem, WingBlank, Button } from 'antd-mobile';
import er from './er.png'

class Payment extends Component {

  save =()=>{
    const { history } = this.props;
    history.goBack()
  }

  render() {
    const { history , match } = this.props;
    return (
      <div className={styles.login}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
        >
          添加支付
        </NavBar>
        <div className={styles.fenge}>
          <InputItem
            clear
            placeholder="请输入收款方名称"
            ref={el => this.inputRef = el}
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
                    placeholder="请输入AppId"
                    ref={el => this.inputRef = el}
                  >
                    AppId
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="请输入商户ID"
                    ref={el => this.inputRef = el}
                  >
                    商户ID
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="请输入API密钥"
                    ref={el => this.inputRef = el}
                  >
                    API密钥
                  </InputItem>
                </List>
                <List.Item arrow="horizontal">
                  CRT证书上传
                </List.Item>
                <div className={styles.erweima}>
                  <img src={er} />
                  <a>二维码测试</a>
                </div>
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
                    placeholder="请输入Appid"
                    ref={el => this.inputRef = el}
                  >
                    Appid
                  </InputItem>
                  <InputItem
                    clear
                    placeholder="请输入PID"
                    ref={el => this.inputRef = el}
                  >
                    PID
                  </InputItem>
                  <TextareaItem
                    title="支付宝公钥"
                    placeholder="支付宝公钥"
                    ref={el => this.autoFocusInst = el}
                    autoHeight
                  />
                  <TextareaItem
                    title="用户私钥"
                    placeholder="用户私钥"
                    ref={el => this.autoFocusInst = el}
                    autoHeight
                  />
                </List>
                <div className={styles.erweima}>
                  <img src={er} />
                  <a>二维码测试</a>
                </div>
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
