import router from 'umi/router';
import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Mock from 'mockjs';
import { Form, Input, Upload, Radio, Button, Icon, message, Modal } from 'antd'
const RadioGroup = Radio.Group;
import RadioForm from './component/RadioForm'
import NavBread from './component/NavBread'
import styles from './index.less'
@connect(({ categoryModel }) => ({
  categoryModel
}))

class categoryEdit extends Component {
    state = {
        loadIngModal: false,
        defaultVal: 2,
        checkedVal: '三级类目',
        setType: '1',
        editCid: '',
        loading: false,
        previewVisible: false,
        previewImage:'',

        checkBox: {},
        cateName: '',
        cateSort: '',
        fileList: [],
        cateStat: 'menu',
    }
    // 接收子组件 选中
    checkVal(e){
        console.log(e)
        this.setState({ checkedVal: e }, ()=> {
            if(this.state.checkedVal == '三级类目') {
                this.setState({cateStat: 'menu'})
            }
        })
    }
    // 接收子组件 数据
    checkItemFn(params){
        console.log(params)
        this.setState({ ...params }) 
    }

    // 上传图片 校验, { validator: this.upImgValidate.bind(this), }
    upImgValidate(rule, value, callback) {
        if (this.state.fileList.length > 0) {
            callback();
        }else {
            callback('必须上传图片');
        }
        callback();
    }
    // 图片上传
    handleChange = (info) => {
        console.log('图片上传', info)
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        fileList = fileList.map((file) => {
          if (file.response) {
            file.url = file.response.location;
          }
          return file;
        });
        this.setState({ fileList });
    }
    // 上传图片 预览弹窗
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    // 表单提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let sendParams = values
                sendParams.level = this.state.checkedVal
                if(this.state.editCid) sendParams.foreId = this.state.editCid
                switch (this.state.checkedVal) {
                    case '一级类目':
                        sendParams.parentId = 0
                        sendParams.level = 1
                        break;
                    case '二级类目':
                        sendParams.parentId = this.state.first
                        sendParams.level = 2
                        if(sendParams.cateStat == 'menu'){
                            if(this.state.fileList[0]){
                                sendParams.imgUrl = this.state.fileList[0].url
                            } 
                        } 
                        break;
                    case '三级类目':
                        sendParams.parentId = this.state.second
                        sendParams.level = 3
                        if(this.state.fileList[0]){
                            sendParams.imgUrl = this.state.fileList[0].url
                        }
                        // if(!this.state.first) return message.warning('请先选择一级类目') 
                        // if(!this.state.second) return message.warning('请先选择二级类目') 

                        break;
                }
                this.createOrUpdateForeCategory(sendParams)
            }
        });
    }
    // 新建、编辑 保存
    createOrUpdateForeCategory(params) {
        const{ dispatch } = this.props, _this = this
        console.log(params)
        dispatch({
            type: 'categoryModel/createOrUpdateForeCategory',
            payload:  params
        }).then( res => {
            message.success('保存成功')
            setTimeout(() => {
                _this.backHome()
            }, 400);
        })
    }
    // 编辑还是新增
    pageStatus() {
        this.setState({ editCid: this.props.location.query.rid }, ()=> {
            if(this.state.editCid){
                const { dispatch } = this.props
                // 设置id
                dispatch({
                    type: 'categoryModel/cate_createCid',
                    payload: {
                        editCid: this.state.editCid
                    }
                })
                // 请求参数
                dispatch({
                    type: 'categoryModel/getCategoryMsg',
                    payload: {
                        foreId: this.state.editCid
                    }
                }).then(()=>{
                    const { editData } = this.props.categoryModel
                    this.setState({ editData, loadIngModal: true, needradio:false}, ()=>{this.editAssign() })
                })
            }else {
                this.setState({ loadIngModal:true ,needradio:true})
            }
        })
    }
    // 编辑赋初始值
    editAssign() {
        const { editData } = this.state
        
        let fileList = []
        if(editData.icon){
            fileList.push({
                uid: '-1',
                name: editData.icon.split('/')[editData.icon.split('/').length-1],
                status: 'done',
                url: editData.icon,
                thumbUrl: editData.icon,
            })
        }
        this.setState({ 
            cateName: editData.title,
            cateStat: editData.parent_id?'menu':'nav',
            link: editData.link,
            content: editData.content,
            class: editData.icon,
            fileList,


            cateSort: editData.sort,
            cateImge: editData.imgUrl,
        })
    }
    changstate(e) {
        console.log(e)
        this.setState({cateStat:e.target.value})
    }
    componentDidMount() {
        // 编辑初始化
        this.pageStatus()
    }
    // 组件卸载 数据清空
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'categoryModel/cate_createCid',
            payload: {
                editCid: ''
            }
        })
        dispatch({
            type: 'categoryModel/cate_editCategory',
            payload: {}
        })
    }
    // 返回
    backHome() {
        router.push('/navManage/category')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        // 面包屑
        const navList = [
            { title:'前端类目管理', linkTo:'' },
            { title:'新建类目', activity: true, linkTo:'' },
        ];
        const editShow  = { show: false }
        // 编辑还是新增
        if(this.state.editCid){
            navList[1].title = '编辑类目'
            editShow.show = true
        }
        // 图片上传
        const sendProps = {
            action: `${location.host.split('.').length == 3?'':'/api'}/admin/uploadimg` ,
            name: 'file',
            listType: 'picture',
            fileList: this.state.fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange,
        };
        return (
            <div className={styles.categoryEdit}>
                <Form  onSubmit={this.handleSubmit}>
                    <div className={styles.editBox}>
                        <div className={styles.navBox}>
                            <NavBread navList={navList} editShow={editShow}></NavBread>
                        </div>
                        <Form.Item
                            label='类目名称'>
                            {getFieldDecorator('name', {
                                initialValue: this.state.cateName,
                                rules: [{
                                required: true, message: '请输入类目名称, 并至少2位', min: 2,
                                }],
                            })(
                                <Input placeholder="请输入类目名称"/>
                            )}
                        </Form.Item>
                        {this.state.needradio &&  this.state.loadIngModal && <RadioForm checkVal={this.checkVal.bind(this)}  checkItemFn={this.checkItemFn.bind(this)}></RadioForm> }
                        {(this.state.checkedVal == '二级类目' || this.state.cateStat == 'menu' ) && 
                        <Form.Item
                            label='导航菜单'>
                            {getFieldDecorator('state', {
                                initialValue: this.state.cateStat,
                                rules: [{
                                required: true,
                                message: '状态必选'
                                }],
                            })(
                                <RadioGroup onChange={this.changstate.bind(this)} disabled={!this.state.needradio}>
                                    <Radio value="nav">导航</Radio>
                                    <Radio value="menu">菜单</Radio>
                                </RadioGroup>
                            )}
                        </Form.Item>
                        }
                        {this.state.checkedVal != '一级类目' && this.state.cateStat == 'menu' && (
                            <Form.Item
                                label="类目小图"
                                extra="">
                                {getFieldDecorator('imgUrl', {
                                    initialValue: this.state.fileList,
                                    rules: [{
                                        required: true,
                                        message: '必须上传图片'
                                    }],
                                })(
                                    <Upload name="logo"  {...sendProps}>
                                        <Button>
                                            <Icon type="upload" /> 上传文件
                                        </Button>
                                    </Upload>
                                )}
                            </Form.Item>
                        
                        )}
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>

                        {(this.state.checkedVal == '一级类目' ||  this.state.cateStat == 'nav') && 
                            <Form.Item
                                label='icon&emsp;&emsp;' style={{marginTop:24}}>
                                {getFieldDecorator('class', {
                                    initialValue: this.state.class,
                                    rules: [{
                                    required: true, message: '请输入icon',
                                    }],
                                })(
                                    <Input placeholder="请输入icon" />
                                )}
                            </Form.Item>
                        }
                        {this.state.cateStat == 'menu' && this.state.checkedVal != '一级类目'  && 
                    
                            <Form.Item
                                label='内容&emsp;&emsp;' style={{marginTop:24}}>
                                {getFieldDecorator('content', {
                                    initialValue: this.state.content,
                                    rules: [{
                                    required: true, message: '请输入内容, 并至少2位',
                                    }],
                                })(
                                    <Input placeholder="请输入内容" />
                                )}
                            </Form.Item>
                        }
                        {this.state.cateStat == 'menu' && this.state.checkedVal != '一级类目'  && 
                        
                            <Form.Item
                                label='链接&emsp;&emsp;' style={{marginTop:24}}>
                                {getFieldDecorator('link', {
                                    initialValue: this.state.link,
                                    rules: [{
                                    required: true, message: '请输入链接',
                                    }],
                                })(
                                    <Input placeholder="请输入链接" />
                                )}
                            </Form.Item>
                        }
                    </div>

                    <div className={styles.sureBox}>
                        <Button style={{marginRight:10}} onClick={this.backHome.bind(this)}>取消</Button>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'categoryEdit' })(categoryEdit);
export default WrappedRegistrationForm
