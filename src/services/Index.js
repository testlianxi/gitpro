import request from '_u/request';
import api from '_u/api';

const {
  login, companySaleStat, companyDeviceList,
  orderList, refund, paperOrderList, userLoginOut
} = api;
// 登陆
const userLogin = (params) => {
  return request(`${login}`, {
    method: "POST",
    body: params
  });
};

// 退出
const userLogot = (params) => {
  return request(`${userLoginOut}`, {
    method: "GET",
    body: params
  });
};

// 获取天月全部销售额
const getCompanySaleStat = (params) => {
  return request(`${companySaleStat}`, {
    method: "GET",
    body: params
  });
};

// 获取首页机器列表
const getCompanyDeviceList = (params) => {
  return request(`${companyDeviceList}`, {
    method: "GET",
    body: params
  });
};

// 获取首页机器列表
const getOrderList = (params) => {
  return request(`${orderList}`, {
    method: "GET",
    body: params
  });
};

// 退款接口
const getRefund = (params) => {
  return request(`${refund}`, {
    method: "GET",
    body: params
  });
};

// 纸币记录
const getPaperOrderList = (params) => {
  return request(`${paperOrderList}`, {
    method: "GET",
    body: params
  });
};


export default {
  userLogin,
  getCompanySaleStat,
  getCompanyDeviceList,
  getOrderList,
  getRefund,
  getPaperOrderList,
  userLogot,
}
