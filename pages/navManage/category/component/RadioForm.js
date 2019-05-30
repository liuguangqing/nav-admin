import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Mock from 'mockjs';
import style from '../index.less'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
@connect(({ categoryModel }) => ({
  categoryModel
}))

// 选择类目组件
class RadioForm extends Component {
    state = {
        DefaultValTit: '三级类目',
        defaultValFirst: '',
        defaultValSecond: '',
        moveFirst: '',
        moveSecond: '',
        sendParams: {}
    }
    // 单选框选择
    onChangeTit(e) {
        this.setState({ DefaultValTit: e.target.value });
        this.props.checkVal(e.target.value)
    }
    // 单选框选择
    changeLeimu(status, e ) {
        const checkId = e.target.value.split('!!-/')[1]
        const checkName = e.target.value.split('!!-/')[0]
        if (status == 1){
            let checkParams = this.state.checkParams
            this.setState({ 
                defaultValFirst: e.target.value, 
                moveFirst: checkName, 
                moveSecond: '', 
                checkParams:{ ...this.state.checkParams, first: checkId, second: '' }
            })
            this.searchAllFirstLevel(checkId)
        }else if (status == 2) {
            this.setState({ 
                defaultValSecond: e.target.value, 
                moveSecond: checkName,
                checkParams:{ ...this.state.checkParams, second: checkId }
            });
        }
        this.sendParent()
    }
    // 父组件发送
    sendParent() {
        setTimeout(() => {
            this.props.checkItemFn(this.state.checkParams)
        }, 0);
    }
    // 查询一、二级类目
    searchAllFirstLevel(rid) {
        const { dispatch } = this.props
        if(!rid){
            dispatch({
                type: `categoryModel/getAllForeCategory`,
                payload: {},
            })
        }else {
            const { categoryModel } = this.props
            const { firstLevelList } = categoryModel
            console.log(firstLevelList)
            firstLevelList.forEach( ele => {
                if(ele.nav_id == rid && ele.contentList == null) {
                    console.log(ele.contentList)
                    this.setState({
                        secondLevelList: ele.child
                    })
                }
            });
        }
    }
    // 组件卸载
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: `categoryModel/dele_redio`,
            payload: {secondLevelList:[]},
        })
    }
    componentDidMount() {
        this.searchAllFirstLevel()

        const { categoryModel } = this.props
        const { editCateData, editCid } = categoryModel
        // 编辑初始
        if( editCid ) {
            this.setState({
                editCateData, 
                DefaultValTit: editCateData.currentInd, 
                defaultValFirst: editCateData.firstLevelName +'!!-/'+ editCateData.firstLevelId, 
                defaultValSecond: editCateData.secondLevelName +'!!-/'+ editCateData.secondLevelId, 
                moveFirst: editCateData.firstLevelName,
                moveSecond: editCateData.secondLevelName,
                checkParams:{ first: editCateData.firstLevelId, second: editCateData.secondLevelId }

            }, () => {
                // 获取二级类目
                editCateData.level == 3 && this.searchAllFirstLevel(editCateData.firstLevelId)
                // 父组件发送类目title
                this.props.checkVal(editCateData.currentInd)
                // 父组件发送类目
                this.sendParent()
            })
        }
    }

    render(){
        const options = [
            { label: '一级类目', value: '一级类目' },
            { label: '二级类目', value: '二级类目' },
            { label: '三级类目', value: '三级类目' },
        ];
        const { categoryModel } = this.props
        const { firstLevelList,  editCateData, editCid } = categoryModel
        return (
            <Fragment>
            { editCateData.level != 1 &&  (
            <div className={style.checkBox}>
                <div className={style.title}>选择类目</div>
                <div className={style.inputBox}>
                    { !editCid? 
                        <RadioGroup options={options} onChange={this.onChangeTit.bind(this)} value={this.state.DefaultValTit} /> :
                        (
                            <div className={style.moveTo}>
                                <span>移动至：</span>
                                <span>{this.state.moveFirst} {this.state.moveSecond && ' / '+ this.state.moveSecond}</span>
                            </div>
                        )
                    }
                </div>
                {(this.state.DefaultValTit == '二级类目' || this.state.DefaultValTit == '三级类目') && (
                <div className={style.checkItem}>
                    <div>
                        <div className={style.itemTit}>一级类目</div>
                        <RadioGroup onChange={this.changeLeimu.bind(this, 1)} value={this.state.defaultValFirst} >
                        {firstLevelList.map(( e, i )=>
                            (<Radio key={i} value={e.title + '!!-/' + e.nav_id}>{e.title}</Radio>)
                        )}
                        </RadioGroup>
                    </div>
                    {this.state.DefaultValTit == '三级类目' && (                    
                    <div>
                        <div className={style.itemTit}>二级类目</div>
                        <RadioGroup onChange={this.changeLeimu.bind(this, 2)} value={this.state.defaultValSecond} >
                        {this.state.secondLevelList && this.state.secondLevelList.map(( e, i )=>
                            (<Radio key={i} value={e.title + '!!-/' + e.nav_id}>{e.title}</Radio>)
                        )}
                        </RadioGroup>
                    </div>
                    )}
                </div>
                )}
                
            </div>
            )}
            </Fragment>
        )
    }
}
export default RadioForm