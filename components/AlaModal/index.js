/**
 * Created by huangyilu on 2019/04/04.
 * 模态弹窗组件
 */

import React, { Component } from 'react'
import styles from './index.less'

class AlaModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <div className={styles.ala_modal_mask} />
        <div className={styles.ala_modal_wrap}>
          <div className={styles.ala_modal}>
            {/* {this.props.children} */}
            <div className={styles.ala_modal_content}>{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default AlaModal
