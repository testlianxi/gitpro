import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import Shell from './routes/Shell';

  // 首页
import Index from './routes/Index';
// 商品
import Commodity from './routes/Commodity';
import CommodityAdd from './routes/Commodity/Add';
// 设备
import Equipment from './routes/Equipment';
import EquipmentAdd from './routes/Equipment/Add';

// 支付
import Payment from './routes/Payment';
import PaymentAdd from './routes/Payment/Add';

// 软件
import Software from './routes/Software';
import SoftwareAdd from './routes/Software/Add';

// 人员
import Personnel from './routes/Personnel';
import PersonnelAdd from './routes/Personnel/Add';
import AddEquipment from './routes/Personnel/AddEquipment';

// 交易记录
import Record from './routes/Record';

// 销售统计
import SaleCount from './routes/SaleCount';

// 纸币记录
import BankNotes from './routes/BankNotes';

function RouterConfig({ history, app }) {

  return (<Router history={history}>
    <Switch>
      <Shell>
        <Route path="/" exact component={Index} />
        <Route path="/Commodity" exact component={Commodity} />
        <Route path="/Commodity/Add/:id" exact component={CommodityAdd} />
        <Route path="/Equipment" exact component={Equipment} />
        <Route path="/Equipment/Add/:id" exact component={EquipmentAdd} />
        <Route path="/Payment" exact component={Payment} />
        <Route path="/Payment/Add/:id" exact component={PaymentAdd} />
        <Route path="/Software" exact component={Software} />
        <Route path="/Software/Add/:id" exact component={SoftwareAdd} />        
        <Route path="/Personnel" exact component={Personnel} />
        <Route path="/Personnel/Add/:id" exact component={PersonnelAdd} />
        <Route path="/Personnel/AddEquipment/:id" exact component={AddEquipment} />
        <Route path="/Record" exact component={Record} />
        <Route path="/SaleCount" exact component={SaleCount} />
        <Route path="/BankNotes" exact component={BankNotes} />
      </Shell>
    </Switch>
  </Router>);
}
export default RouterConfig;
