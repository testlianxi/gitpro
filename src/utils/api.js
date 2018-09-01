const ENV = process.env.NODE_ENV === 'development';
const HOST = ENV ? 'http://api.mengziyou.com' : 'http://api.mengziyou.com';

// 登陆接口
const login = `${HOST}/user_login`;

// 退出接口
const userLoginOut = `${HOST}//user_login_out_get`;

// 获取今天月全部销售额
const companySaleStat = `${HOST}/company_sale_stat`;

// 首页机器列表
const companyDeviceList = `${HOST}/device_list`;

// 获取交易记录
const orderList = `${HOST}/order_list`;

// 退款接口
const refund = `${HOST}/refund`;

// 纸币记录
const paperOrderList = `${HOST}/paper_order_list`;

// 获取导航菜单
const menus = `${HOST}/get_menus`;

// 获取导航菜单
const saleAccountList = `${HOST}/sale_account_list`;
// 销售统计设备列表
const deviceListOnly = `${HOST}/device_list_only`;

const utils = {
  // 通过id获取图片
  getImageById :  `${HOST}/get_image_by_id`,

  // 上传图片
  uploadImage : `${HOST}/upload_image`,

  // 通过ID获取文件
  getFileById: `${HOST}/get_file_by_id`,

  // 上传文件
  uploadFile: `${HOST}/upload_apk`,

  // 保存
  getEditSoftware: `${HOST}/edit_software`,

  // 获取单个详情
  getSoftwareInfo: `${HOST}/get_software_info`,

  // 获取软件信息列表
  softwareList: `${HOST}/software_list`,
}

// 商品
const good = {
  // 获得商品信息
  list :  `${HOST}/goods_list`,

  // 编辑修改商品信息
  edit :  `${HOST}/edit_goods`,

  // 通过商品id获得商品信息
  get : `${HOST}/get_goods_info`,

  // 添加一个商品信息，返回商品的id
  create :  `${HOST}/create_goods`,

  // 通过商品的id，删除商品
  remove :  `${HOST}/remove_goods`,
}

// 公司
const company = {
  list : `${HOST}/company_list`,

  edit : `${HOST}/edit_company`,

  create: `${HOST}/create_company`,

  remove: `${HOST}/remove_company`
}

// 支付
const pay = {
  // 获取所有公司列表
  list :  `${HOST}/company_list`,

  // 编辑公司支付信息
  edit :  `${HOST}/edit_pay`,

  // 创建支付信息
  create :  `${HOST}/create_pay`,

  // 通过id获取支付信息
  getPayById: `${HOST}/get_pay_info`,

  // 通过id获取支付信息
  getPayState: `${HOST}/loop_look_pay_state`
}

// 设备
const device = {
  list :  `${HOST}/device_list`,

  // 编辑基本信息
  edit :  `${HOST}/edit_device_info`,

  // 创建基本信息
  create :  `${HOST}/create_device_info`,

  // 添加批量货道
  addaislelist :  `${HOST}/create_device_aisleinfo_batch`,

  // 添加货道信息
  createAisleinfo :  `${HOST}/create_device_baseinfo`,

  // 添加单个货道信息
  createItemAisleinfo :  `${HOST}/create_device_aisleinfo`,

  // 删除货道信息
  removeAisleinfo :  `${HOST}/remove_device_aisleinfo`,

  // 创建设备出厂信息，返回出厂信息id
  createDeviceBaseinfo:  `${HOST}/create_device_factinfo`,

  // 修改设备出厂信息
  editDeviceBaseinfo: `${HOST}/edit_device_factinfo`,

  // 删除设备出厂信息
  removeDeviceBaseinfo:  `${HOST}/remove_device_factinfo`,

  // 通过设备内部id获得设备信息
  getDeviceBaseinfoById:  `${HOST}/get_device_info`,
}

// 用户管理
const user = {
  list :  `${HOST}/user_list`,

  get: `${HOST}/get_user_info`,

  edit: `${HOST}/edit_user`,

  create :  `${HOST}/create_user`,

  // 添加用户管理的设备
  addDevice: `${HOST}/user_device`,

  // 重置用户名密码
  reset: `${HOST}/reset_psw`,

  // 获取人员设备列表
  deviceList: `${HOST}/user_device_list`,

  // 新增人员设备
  createDeviceList: `${HOST}/create_user_device`,
}

export default {
  login,
  companySaleStat,
  companyDeviceList,
  orderList,
  refund,
  paperOrderList,
  userLoginOut,
  menus,
  saleAccountList,
  deviceListOnly,
}

export {
  utils,
  good,
  company,
  pay,
  device,
  user,
  HOST
}
