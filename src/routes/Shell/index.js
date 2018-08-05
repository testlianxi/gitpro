import React, { Component } from 'react';
import { connect } from 'dva';

class Shell extends Component {
  render() {
    const { children } = this.props;
    return (
        <section>
          { children }
        </section>
    );
  }
}

// 绑定model
const mapStateToProps = (state) => {
  return { ...state.Shell };
};

export default connect(mapStateToProps)(Shell);
