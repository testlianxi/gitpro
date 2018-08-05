import styles from './style.scss';

const Total = (props) => {
	const {
		leftContent,
		centerContent,
		rightContent,
		leftClick,
		rightClick,
	} = props;
  return (
  	<div className={styles.title}>
  		{
  			leftContent 
  			&& 
  			<span onClick={leftClick} className={styles.return}>{leftContent}</span>
  		}
  		<span>{centerContent}</span>
  		{
  			rightContent
  			&&
  			<span onClick={rightClick} className={styles.menu}>{rightContent}</span>
  		}
  	</div>
  );
}

export default Total;
