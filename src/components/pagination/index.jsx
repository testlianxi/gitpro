import styles from './style.scss';

const Pagination = (props) => {
  const { currentPage, maxPage, pageChange } = props;

  const inputChange = (val) => {
    var n = parseInt(val);
    if (val !== '') {
      if (!n) return alert('输入不合法');
      if (n < 1 || n > maxPage) return alert('输入超过范围');
    }
    pageChange(n || '');
  }

  const throttle = function (fn, delay, atleast) {
    var timer = null;
    var previous = null;
 
    return function (e) {
      var now = +new Date();
      var value = e.target.value;
      if ( !previous ) previous = now;
      if ( atleast && now - previous > atleast ) {
        fn(value);
        // 重置上一次开始时间为本次结束时间
        previous = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn(value);
          previous = null;
        }, delay);
      }
    }
  }

  const pageDown = () => {
    if (currentPage === 1) return;
    inputChange(+currentPage - 1);
  }

  const pageUp = () => {
    if (currentPage === maxPage) return;
    inputChange(+currentPage + 1);
  }

  return (
  	<div className={styles.pagination}>
      <a href="javascript:;" className={currentPage === 1 ? styles.nocur : null} onClick={pageDown}>上一页</a>
      <span>
        <input value={currentPage} onChange={throttle(inputChange, 100)} type="number" /> / {maxPage}
      </span>
      <a href="javascript:;" className={currentPage === maxPage ? styles.nocur : null} onClick={pageUp}>下一页</a>
  	</div>
  );
}

export default Pagination;
