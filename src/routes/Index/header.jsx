import { Icon } from 'antd-mobile';
import styles from './style.scss';

const Header = (props) => {
	const { userName, backClick, menuClick } = props;
  return (
    <div className={styles.header}>
    	<span onClick={backClick} className={styles.back}>退出</span>
    	<strong>{userName}</strong>
    	<span onClick={menuClick} className={styles.menu}><Icon key="1" type="ellipsis" /></span>
    </div>
  );
}

export default Header;
