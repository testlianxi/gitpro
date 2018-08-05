import styles from './style.scss';
import { HOST } from '_u/api';
const Shoping = (props) =>{
  const { children, money, name, url } = props;
  return (
    <li className={styles.shoping}>
      <img src={`${HOST}/${url}`} />
      <div className={styles.info}>
        <h3>{name}</h3>
        <p>售价：{ money }</p>
        { children }
      </div>
    </li>
  )
}

export default Shoping;
