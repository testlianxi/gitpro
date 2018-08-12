import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, InputItem, ImagePicker, Button, WingBlank, Picker, Toast } from 'antd-mobile';

import { _createUser, _getUser, _editUser } from '_s/user';

class Personnel extends Component {

  state = {
    data:[{
      value: '0',
      label: '无权限'
    },{
      value: '2',
      label: '公司管理员'
    },{
      value: '3',
      label: '职员'
    }],
    id: -1,
    asyncValue: ['1'],
    user_name: '',
    mobile: '',
    company: '',
    password: '',
    level: '',
    password: ''
  }

  componentDidMount(){
    const { match } = this.props;
    const id = match.params.id;
    if(id == -1) return;
    _getUser({id})
    .then(res=>{
      this.setState({ id, ...res })
    });
  }

  save = () => {
    const { history } = this.props;
    const { id, user_name, mobile, company, level, password } = this.state;
    if(user_name == ''){
      Toast.fail('用户名不能为空', 1);
      return;
    }
    if(mobile== ''){
      Toast.fail('联系方式不能为空', 1);
      return;
    }
    if(company == ''){
      Toast.fail('所属单位不能为空', 1);
      return;
    }
    if(password == ''){
      Toast.fail('密码不能为空', 1);
      return;
    }
    if(level == ''){
      Toast.fail('权限不能为空', 1);
      return;
    }

    if(id == -1){
      _createUser({ user_name, mobile, company, level, password })
      .then(res => {
        if(res == 1){
          history.goBack()
        }
      })
    }else{
      _editUser({ id, user_name, mobile, company, level, password })
      .then(res =>{
        if(res == 1){
          history.goBack()
        }
      })
    }
  }


  render() {
    const { chhild, history , match, children } = this.props;
    const { id, data, user_name, mobile, company, level, password } = this.state;

    let levelArr = [`${level}`];

    let title = id == -1 ? '添加人员' : '修改人员';
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
        >
          {title}
        </NavBar>
        <div className={styles.addShoping}>
          <List>
            <InputItem
              clear
              placeholder="登录名"
              value={user_name}
              onChange={value=>this.setState({ user_name: value })}
            >登录名</InputItem>
            <InputItem
              clear
              placeholder="联系方式"
              value={mobile}
              onChange={value=>this.setState({ mobile: value })}
            >联系方式</InputItem>
            <InputItem
              clear
              placeholder="所属单位"
              value={company}
              onChange={value=>this.setState({ company: value })}
            >所属单位</InputItem>
            <InputItem
              clear
              placeholder="密码"
              value={password}
              onChange={value=>this.setState({ password: value })}
            >密码</InputItem>
            <Picker
              data={data}
              cols={1}
              value={levelArr}
              onOk={value=>this.setState({ level: value })}
            >
              <List.Item arrow="horizontal">
                权限
              </List.Item>
            </Picker>
          </List>
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
  ...state.Personnel,
});

export default connect(mapStateToProps)(Personnel);
