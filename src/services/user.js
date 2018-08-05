import { user } from '_u/api';
import request from '_u/request';

const {
  list,
  addDevice,
  create,
  reset,
  get
} = user;

// 获取用户列表
const _getUserList = (params) =>{
  return request(list,{
    method: "GET",
    body: params
  }).then(res =>{
    try{
      let temp = res.data;
      let { status, data } = temp;
      if(status == 1){
        return data.result
      }else{
        throw new Error('返回错误')
      }
    }catch(e){
      console.log(e);
    }
  })
}

// 获取用户列表
const _getUser = (params) =>{
  return request(get,{
    method: "GET",
    body: params
  }).then(res =>{
    try{
      let temp = res.data;
      let { status, data } = temp;
      if(status == 1){
        return data.result
      }else{
        throw new Error('返回错误')
      }
    }catch(e){
      console.log(e);
    }
  })
}

// 为用户添加设备
const _addDevice= (params) =>{
  return request(addDevice,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 创建用户
const _createUser = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  })
}

// 重置密码
const _reset = (params) =>{
  return request(reset,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

export {
  _addDevice,
  _createUser,
  _reset,
  _getUserList,
  _getUser
}
