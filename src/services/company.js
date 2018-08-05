import { company } from '_u/api';
import request from '_u/request';
const {
  list,
  edit,
  create,
  remove
} = company;

// 获取公司列表
const _getCompanyList = (params) =>{
  return request(list,{
    method: "GET",
    body: params
  }).then(res =>{
    return res
  })
}

// 编辑公司
const _editCompany= (params) =>{
  return request(edit,{
    method: "GET",
    body: params
  }).then(res =>{
    return res
  })
}

// 创建公司
const _createCompany = (params) =>{
  return request(create,{
    method: "GET",
    body: params
  }).then(res =>{
    return res
  })
}

// 删除公司
const _removeCompany = (params) =>{
  return request(remove,{
    method: "GET",
    body: params
  }).then(res =>{
    return res
  })
}

export {
   _removeCompany,
   _createCompany,
   _editCompany,
   _getCompanyList
}
