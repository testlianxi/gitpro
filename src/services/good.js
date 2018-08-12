import { good } from '_u/api';
import request from '_u/request';
import { _getImageById } from '_s/utils'
const {
  list,
  edit,
  create,
  remove,
  get
} = good;

// 通过ID获取商品信息
const _getGoodById = (params) =>{
  return request(get,{
    method: "GET",
    body: params
  }).then(res =>{
    try{
      let temp = res.data;
      let { status, data } = temp;
      if(status == 1){
        return data.result;
      }else{
        throw new Error('返回错误')
      }
    }catch(e){
      console.log(e);
    }
  })
}

// 获取商品列表
const _getGoodList = (params) =>{
  return request(list,{
    method: "GET",
    body: params
  }).then(res =>{
    try{
      let temp = res.data;
      let { status, data } = temp;
      if(status == 1){
        return data
      }else{
        throw new Error('返回错误')
      }
    }catch(e){
      console.log(e);
    }
  })
}

// 编辑商品信息
const _editGood= (params) =>{
  return request(edit,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  })
}

// 创建商品信息
const _createGood = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  })
}

// 删除商品信息
const _removeGood = (params) =>{
  return request(remove,{
    method: "GET",
    body: params
  }).then(res =>{
    console.log(res);
  })
}

export {
   _removeGood,
   _createGood,
   _editGood,
   _getGoodList,
   _getGoodById
}
