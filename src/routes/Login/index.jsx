import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

import styles from './style.scss';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
      errTip: '',
      uid: '',
      password: ''
		};
	}

  componentWillMount() {
  }

  login = () => {
    const { dispatch } = this.props;
    const { uid, password, errTip } = this.state;
    dispatch({
      type: 'Index/login',
      uid,
      password,
    })
      .then(data => {
        localStorage.level = data.data.data.level;
        if (data.data.status === '1') {
          dispatch(routerRedux.push('/'));
        } else {
          this.setState({errTip: data.data.error_msg});
        };
      });
  }

  render() {
    const { uid, password, errTip } = this.state;
    return (
      <div className={styles.login}>
        <div className={styles.userput}>
          <input onChange={(e) => { this.setState({uid: e.target.value, errTip: ''}) }} value={uid} type="text" placeholder="用户名" />
          <input onChange={(e) => { this.setState({password: e.target.value, errTip: ''}) }} value={password} type="password" placeholder="密码" />
          <a href="javascript:;" onClick={this.login}>登录</a>
          <p>{errTip}</p>
        </div>
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Index,
});

export default connect(mapStateToProps)(Index);
