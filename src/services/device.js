import { device } from '_u/api';
import request from '_u/request';

const {
  list,
  edit,
  create,
  createAisleinfo,
  removeAisleinfo,
  createDeviceBaseinfo,
  editDeviceBaseinfo,
  removeDeviceBaseinfo,
  getDeviceBaseinfoById,
} = device;

// 获取设备列表
const _getDeviceList = (params) =>{
  return request(list,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 编辑设备基本信息
const _editDevice= (params) =>{
  return request(edit,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 创建设备基本信息
const _createDevice = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 添加设备货道信息
const _createAisleinfo = (params) =>{
  return request(createAisleinfo,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 删除设备货道信息
const _removeAisleinfo = (params) =>{
  return request(removeAisleinfo,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 创建设备出厂信息
const _createDeviceBaseinfo = (params) =>{
  return request(createDeviceBaseinfo,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}
// 修改设备出厂信息
const _editDeviceBaseinfo = (params) =>{
  return request(editDeviceBaseinfo,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}
// 删除设备出厂信息
const _removeDeviceBaseinfo = (params) =>{
  return request(removeDeviceBaseinfo,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}
// 通过设备内部id获得设备信息
const _getDeviceBaseinfoById = (params) =>{
  return request(getDeviceBaseinfoById,{
    method: "GET",
    body: params
  })
}

export default {
   _getDeviceList,
   _editDevice,
   _createDevice,
   _createAisleinfo,
   _removeAisleinfo,
   _createDeviceBaseinfo,
   _editDeviceBaseinfo,
   _removeDeviceBaseinfo,
   _getDeviceBaseinfoById,
};
