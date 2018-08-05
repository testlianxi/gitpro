import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';

class Login extends Component {
  render() {
    return (
      <div className={styles.login}>
        <span>登陆</span>
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.login,
});

export default connect(mapStateToProps)(Login);
