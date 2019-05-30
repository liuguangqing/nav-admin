import router from 'umi/router';
import React, { Component } from 'react'
import { connect } from 'dva'
import Mock from 'mockjs';

import { Modal, message, Button } from 'antd'
const confirm = Modal.confirm;
import IndexTable from './component/indexTable'
import styles from './index.less'
@connect(({ categoryModel }) => ({
  categoryModel
}))

class category extends Component {
  state = {
    allVisible: false,
    allTitle: '后台类目全局映射',
    visible: false,
    firstLevelList: [],
    inpVal: '',
  }


  // 类目新建、编辑
  createCategory(e) {
    if(e.nav_id){
      router.push(`/navManage/category/categoryEdit?rid=${e.nav_id}`)
    }else {
      router.push('/navManage/category/categoryEdit')
    }
  }
  // 隐藏提示
  hideSure(item) {
    const { dispatch } = this.props , _this = this
    confirm({
      title: `${ item.is_show == 'Y'?`确定隐藏吗？`:`确定显示吗？` }`,
      content: `${ item.is_show == 'Y'?`隐藏之后应用内不再显示`:` ` }`,
      onOk() {
        dispatch({
          type: `categoryModel/CategoryStatus`,
          payload: {
            foreId: item.rid,
            isShow: item.is_show == 'Y'?'N':'Y'
          },
        }).then(res => {
          message.success('隐藏成功')
          _this.initCategory()
        })
      },
      onCancel() {},
    });
  }
  // 删除提示
  deleSure(item) {
    const { dispatch } = this.props , _this = this
    confirm({
      title: '确定删除吗 ?',
      content: '删除之后应用内不再显示',
      onOk() {
        dispatch({
          type: `categoryModel/deleteForeCategory`,
          payload: {
            foreId: item.nav_id
          },
        }).then(res => {
          message.success('删除成功')
          _this.initCategory()
        })
      },
      onCancel() {},
    });
  }
  // 表格初始
  initCategory(){
    const { dispatch } = this.props
    dispatch({
      type: `categoryModel/getAllForeCategory`,
      payload: {},
    }).then(() =>{
      const { categoryModel } = this.props
      const { navList } = categoryModel
      this.setState({firstLevelList:navList})
    })
    // 判断登录
    dispatch({
      type: `categoryModel/isLogin`,
      payload: {},
    })
  }
  componentDidMount() {
    this.initCategory()
  }
  render() {

    // 面包屑
    const navList = [
      { title:'前端类目管理', linkTo:'' },
      { title:'新建类目', activity:true, linkTo:'' },
    ]
    return (
      <div className={styles.cateGoryParent}>
        <div className={styles.cateGoryBox}>
          <div style={{marginBottom:20,textAlign:'right'}}>
            <Button type="primary"  onClick={this.createCategory}>新建</Button>
          </div>
          <div>
            <IndexTable 
              dataSource={this.state.firstLevelList}
              childrenColumnName={'child'}
              rowKey={'nav_id'}
              createCategory={this.createCategory.bind(this)}
              hideSure={this.hideSure.bind(this)}
              deleSure={this.deleSure.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default category
