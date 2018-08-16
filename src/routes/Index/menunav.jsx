import Title from '_c/topbar';
import styles from './style.scss';
import { Link } from 'dva/router';
const Header = (props) => {
	const { closeYayout, menus } = props;
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
	    		{
	    			menus && menus.length ?
	    			menus.map(item => {<li key={item.id}><Link to={item.url}>{item.title}</Link></li>}) : null
	    		}
	    	</ul>
    	</div>
    </section>
  );
}

export default Header;
