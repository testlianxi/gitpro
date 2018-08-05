import Title from '_c/topbar';
import styles from './style.scss';
import { Link } from 'dva/router';
const Header = (props) => {
	const { closeYayout } = props;
	const move = e => {
		if (e.currentTarget === e.target) closeYayout();
	}
  return (
    <section className={styles.layout} onTouchMove={move} onClick={move}>
    	<div className={styles.inner}>
    		<Title
    			leftContent="返回"
    			centerContent="功能菜单"
    			leftClick={closeYayout}
    	  />
	    	<ul className={styles.list}>
	    		<li><Link to="Commodity">商品管理</Link></li>
					<li><Link to="Payment">支付管理</Link></li>
					<li><Link to="Equipment">设备管理</Link></li>
					<li><Link to="Personnel">人员管理</Link></li>
	    	</ul>
    	</div>
    </section>
  );
}

export default Header;
