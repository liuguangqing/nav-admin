import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Mock from 'mockjs';
import { Breadcrumb } from 'antd'
import styles from '../index.less'
@connect(({ categoryModel }) => ({
    categoryModel
}))
  
// 面包屑组件
class NavBread extends Component {
    state = {}
    render() {
        const navData = this.props
        const { categoryModel } = this.props
        const { editCateData } = categoryModel
        
        return (
            <div>
                <Breadcrumb>
                    {navData.navList.map((e,i)=>{
                    return(
                        <Breadcrumb.Item key={i}>
                            {!e.activity?<a href={e.linkTo}>{e.title}</a>:e.title }
                        </Breadcrumb.Item>   
                    )
                    })}
                </Breadcrumb>
                {navData.editShow && navData.editShow.show && (
                    <div className={styles.navCon}>
                        <div>当前类目信息</div>
                        <ul>
                            <li>
                                <div>{editCateData.currentInd + '名称：'}</div>
                                <div>
                                { editCateData.currentVal}
                                </div>
                            </li>
                            <li>
                                <div>当前属于：</div>
                                <div>
                                    {editCateData.firstLevelName}
                                    {editCateData.secondLevelName? ' / ' + editCateData.secondLevelName:'' }
                                    {editCateData.thirdLevelName? ' / ' + editCateData.thirdLevelName:'' }
                                </div>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}
export default NavBread 