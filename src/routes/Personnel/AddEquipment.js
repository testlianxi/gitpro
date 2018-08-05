import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, InputItem, ImagePicker, Button, WingBlank, Picker } from 'antd-mobile';

class Personnel extends Component {
  save =()=>{
    const { history } = this.props;
    history.goBack()
  }

  render() {
    const { chhild, history , match, children } = this.props;

    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
          rightContent={<a onClick={this.save}>保存</a>}
        >
          添加人员
        </NavBar>
        <section className={styles.people}>
          <p>登录名：hnbwy（30台）</p>
          <p>联系方式：138********</p>
          <p>所属单位：河南战旗-郑州动物园</p>
          <p>权限：工作人员</p>
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
