import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import service from '_s/Index';

import Header from './header';
import MenuNav from './menunav';
import Total from './total';
import List from './list';

import styles from './style.scss';

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false,

      day_amount: '00.00',
      month_amount: '00.00',
      total_amount: '00.00',
      
      name: '',
		};
	}

	backClick = () => {
    const { dispatch } = this.props;
    service.userLogot()
      .then(res => {
        const data = res.data;
        if (+data.status === 1) {
          dispatch(routerRedux.push('/login'));
        }
      })
  }

	menuClick = () => {
		this.setState({showMenu: true})
	}

	closeYayout = () => {
		this.setState({showMenu: false});
	}

  loadCompanySaleStat() {
    const { getCompanySaleStat } = service;

    getCompanySaleStat()
      .then(res => {
        const data = res.data;
        if (!data) return;
        if (+data.status === 1) {
          const { day_amount, month_amount, total_amount, name } = data.data.data;
          this.setState({
            day_amount,
            month_amount,
            total_amount,
            name,
          })
        } else {
          console.log('获取今天本月全部销售额失败');
        }
      });
  }

  componentWillMount() {
    const { dispatch } = this.props;

    // dispatch({
    //   type: 'Index/login'
    // })
    //   .then(data => {
    //     if (data.data.status === '1') console.log('登陆成功');
    //     else console.log('登陆失败');
    //   });

    this.loadCompanySaleStat();
  }

  render() {
  	const { showMenu } = this.state;
  	const { day_amount, month_amount, total_amount, name } = this.state;
    return (
      <div className={styles.main}>
        <Header
        	userName={name}
        	backClick={this.backClick}
        	menuClick={this.menuClick}
        />
        { showMenu && <MenuNav closeYayout={this.closeYayout} /> }
        <Total
        	todayNum={day_amount}
        	monthNum={month_amount}
        	allNum={total_amount}
        />
        <List />
      </div>
    );
  }
}
// 绑定model
const mapStateToProps = state => ({
  ...state.Index,
});

export default connect(mapStateToProps)(Index);
