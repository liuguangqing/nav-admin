import React, { Component, Fragment } from 'react'
import Mock from 'mockjs';
import { Table, Button } from 'antd'
import styles from '../index.less'

// 灵活配置 select and button 组件
class indexTable extends Component {

    render() {
        const indexTable = this.props
            // 设置列
        const columns = [{
            title: '类目名称',
            dataIndex: 'title',
            key: 'title',
            width: '50%',
            render: (t,r,i) => (
            <Fragment>
                {( r.info) &&  <img style={{width:40,height:40,marginRight:10,backgroundColor:'#ccc'}}  src={r.icon} />  }
                <span>{t}</span>
            </Fragment>
            )
        }, {
            title: '前台类目ID',
            dataIndex: 'nav_id',
            key: 'nav_id',
            width: '10%',
        }, {
            title: '状态',
            dataIndex: 'is_show',
            key: 'is_show',
            width: '10%',
            render: (t,r,i) => (
            <Fragment>
                {t == 'Y' ?<span>已显示</span>:<span>已隐藏</span>  }
            </Fragment>
            )
        }, {
            title: '操作',
            dataIndex: 'handle',
            key: 'handle',
            render:
            (t, r, i) => (
                <span className={styles.tabBtn}>
                    <Button type="primary" onClick={indexTable.createCategory.bind(this, r)}>编辑</Button>&nbsp;&nbsp;
                    <Button type="primary" onClick={indexTable.hideSure.bind(this, r)}>
                        {r.is_show == 'Y' ?<span>隐藏</span> : <span>显示</span>  }
                    </Button>&nbsp;&nbsp;
                    {!r.child && <Button type="primary" onClick={indexTable.deleSure.bind(this, r)}>删除</Button> }
                </span>
            )
        }];
  
        // 设置分页
        const pagination = {
            size: "default",
            showQuickJumper: true,
            pageSize:10,
            total: indexTable.dataSource.length,
            showSizeChanger: true,
        };
        return (
            <Table
              size="small"
              bordered
              dataSource={indexTable.dataSource}
              columns={columns}
              rowKey={indexTable.rowKey}
              childrenColumnName={indexTable.childrenColumnName}
              pagination={pagination}
            />
        )
    }
}
export default indexTable