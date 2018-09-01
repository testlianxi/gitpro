import { utils } from '_u/api';
import request from '_u/request';
import fetch from 'dva/fetch';

const {
  getImageById,
  uploadImage,
  getFileById,
  uploadFile,
  getEditSoftware,
  getSoftwareInfo,
  softwareList,
} = utils;

// 通过id获取图片
const _getImageById = (params) =>{
  return request(getImageById,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 上传图片
const _uploadImage = (params) =>{
  let { files } = params;
  const formData = new FormData();
  formData.append('files', files);

  return  fetch(uploadImage , {
    method: 'POST',
    body: formData,
  }).then(res =>{
    let temp = res.json();
    return temp;
  }).then(res =>{
    if(res.status == 1){
      return {
        image_id: res.data.id,
        image_url: res.data.url
      };
    }else{
      console.log('上传错误');
    }
  })
}

// 通过id获取文件
const _getFileById = (params) =>{
  return request(getFileById,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

// 保存
const _editSoftware = (params) =>{
  return request(getEditSoftware,{
    method: "GET",
    body: params
  })
}

// 获取单个列表信息
const _getSoftwareInfo = (params) =>{
  return request(getSoftwareInfo,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data;
  })
}

// 获取软件信息列表
const _getSoftwareList = (params) =>{
  return request(softwareList,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data;
  })
}

// 上传文件
const _uploadFile = (params) =>{
  let { files } = params;
  const formData = new FormData();
  formData.append('files', files);

  return fetch(uploadFile,{
    method: "POST",
    body: formData,
    credentials: 'include',
    headers: {
      'X-Requested-with': 'XMLHttpRequest',
    },
  }).then(res =>{
    let temp = res.json();
    return temp;
  }).then(res =>{
    if(res.status == 1){
      return res.data.id;
    }else{
      console.log('上传错误');
    }
  })
}

export {
  _getImageById,
  _uploadImage,
  _getFileById,
  _uploadFile,
  _editSoftware,
  _getSoftwareInfo,
  _getSoftwareList,
}
