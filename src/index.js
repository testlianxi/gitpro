import dva from 'dva';
import '_u/Date'
import './index.scss';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Shell'));
app.model(require('./models/Index'));
app.model(require('./models/Commodity'));
app.model(require('./models/Equipment'));
app.model(require('./models/Payment'));
app.model(require('./models/Personnel'));
app.model(require('./models/Record'));
app.model(require('./models/SaleCount'));
app.model(require('./models/BankNotes'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


const changeTitle = () => {
	if (location.hash.indexOf('login') > -1) {
		document.title = '商户登陆';
	} else {
		document.title = '后台管理';
	}
};
window.onhashchange = changeTitle;
changeTitle();


