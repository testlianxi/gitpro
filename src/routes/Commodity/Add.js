import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './style.scss';
import { NavBar, Icon, List, InputItem, ImagePicker, Button, WingBlank, Toast } from 'antd-mobile';

import { _getGoodById, _editGood, _createGood } from '_s/good';
import { HOST } from '_u/api';
import { _uploadImage } from '_s/utils';

class Commodity extends Component {
  state = {
    files: [],
    id: -1,
    name: '',
    price: '',
    image_id: '',
    image_url: ''
  }

  componentDidMount(){
    const { match } = this.props;
    const id = match.params.id;
    if(id == -1) return;
    _getGoodById({id})
    .then(res=>{
      const { name, price, image_url, image_id } = res;
      let files = [{
        url: `${HOST}/${image_url}`,
        id: image_id
      }]
      this.setState({ id, files, ...res })
    });
  }

  onChange = (files, type, index) => {
    if(files.length > 0){
      let temp = files[0].file;
      _uploadImage({files: temp })
      .then(res =>{
        this.setState(() => {
          return { ...res }
        })
      })
    }
    this.setState({
      files,
    });
  }

  save = () => {
    const { history } = this.props;
    const { id, name, price, image_id } = this.state;
    if(!name){
      Toast.fail('商品名不能为空', 1);
      return;
    }
    if(!price){
      Toast.fail('价格不能为空', 1);
      return;
    }
    if(!image_id){
      Toast.fail('图片不能为空', 1);
      return;
    }
    if(id == -1){
      _createGood({ name, price, image_id })
      .then(res => {
        if(res == 1){
          history.goBack()
        }
      })
    }else{
      _editGood({ id, name, price, image_id })
      .then(res =>{
        if(res == 1){
          history.goBack()
        }
      })
    }
  }

  render() {
    const { history, match } = this.props;
    const { files, id, price, name } = this.state;

    let title = id == -1 ? '添加商品' : '修改商品';
    return (
      <div >
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.goBack()}
        >
          {title}
        </NavBar>
        <div className={styles.addShoping}>
          <p>选择商品图片</p>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            selectable={files.length < 1}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
          <List>
            <InputItem
              clear
              placeholder="请输入名称"
              value={name}
              onChange={value=>this.setState({ name: value })}
            >名称</InputItem>
            <InputItem
              clear
              placeholder="请输入售价"
              value={price}
              onChange={value=>this.setState({ price: value })}
            >售价</InputItem>
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
  ...state.Commodity,
});

export default connect(mapStateToProps)(Commodity);
