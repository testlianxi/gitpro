import { Link } from 'dva/router'
import styles from './style.scss';

const Header = (props) => {
  const { todayNum, monthNum, allNum } = props;
  return (
    <section className={styles.total}>
    	<div>今天销售额<strong className={styles.todayNum}>¥{todayNum}</strong></div>
    	<div style={{marginTop: '25px'}}>
    		<span>本月: <strong className={styles.num}>¥{monthNum}</strong></span>
    		<span className={styles.all}>总额: <strong className={styles.num}>¥{allNum}</strong></span>
    	</div>
    	<div style={{marginTop: '25px'}}>
    		<Link to="/Record" className={styles.link}>交易记录</Link>
    		<Link to="/SaleCount" className={styles.link}>销售统计</Link>
    	</div>
    </section>
  );
}

export default Header;
