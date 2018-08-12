import { pay } from '_u/api';
import request from '_u/request';


const {
  list,
  edit,
  create,
  getPayById
} = pay;


const _getPayById = (params) =>{
  return request(getPayById,{
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

// 获取支付列表
const _getPayList = (params) =>{
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

// 编辑支付信息
const _editPay= (params) =>{
  return request(edit,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  });
}

// 创建支付信息
const _createPay = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    return res.data.status
  });
}


export {
  _createPay,
  _editPay,
  _getPayList,
  _getPayById
}
