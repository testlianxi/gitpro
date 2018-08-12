import { user } from '_u/api';
import request from '_u/request';

const {
  list,
  addDevice,
  create,
  reset,
  get,
  edit,
  deviceList,
  createDeviceList
} = user;

const _createDeviceList = (params)=> {
  return request(createDeviceList, {
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  });
}

const _getDeviceList = (params)=> {
  return request(deviceList, {
    method: "GET",
    body: params
  });
}

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

// 创建用户
const _createUser = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  })
}

// 修改用户
const _editUser = (params) =>{
  return request(edit,{
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
  _createUser,
  _reset,
  _getUserList,
  _getUser,
  _editUser,
  _getDeviceList,
  _createDeviceList
}
