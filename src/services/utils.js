import { utils } from '_u/api';
import request from '_u/request';
import fetch from 'dva/fetch';

const {
  getImageById,
  uploadImage,
  getFileById,
  uploadFile
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

// 上传文件
const _uploadFile = (params) =>{
  let { files } = params;
  const formData = new FormData();
  formData.append('files', files);

  return request(uploadFile,{
    method: "POST",
    body: formData
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
  _uploadFile
}
