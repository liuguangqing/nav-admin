import router from 'umi/router';
import React, { Component } from 'react'
import { connect } from 'dva'
import Mock from 'mockjs';
import styles from './index.less'
import { Input , message, Button, Icon } from 'antd'
const Search = Input.Search;
@connect(({ categoryModel }) => ({
  categoryModel
}))

class category extends Component {
  state = {
    user:''
  }
  onChange(e){
    console.log(e)
    this.setState({user:e.target.value})
  }
  submit(Val) {
    if(!this.state.user) return message.warning('请输入你的身份')
    if(!Val) return message.warning('输入入关验证码')
    if(this.state.user !='刘广庆') return message.error('身份识别失败')
    if(Val !='xiangjv0725') return message.error('验证码识别失败')
    sessionStorage.setItem('tokenUser',this.state.user)
    sessionStorage.setItem('tokenPas',Val)
    message.success('识别成功, 正在挑传')
    setTimeout(() => {
      router.push('/navManage/category/index')
    }, 600);
  }
  componentDidMount() {
    if(window.sessionStorage.getItem('tokenUser') && window.sessionStorage.getItem('tokenPas')){
      if(
        window.sessionStorage.getItem('tokenUser') =='刘广庆' &&
        window.sessionStorage.getItem('tokenPas') =='xiangjv0725'
        ){
        message.success('识别成功, 正在挑传')
        setTimeout(() => {
          router.push('/navManage/category/index')
        }, 600);
      }
    }
  }
  render() {
    return (
      <div className={styles.loginBox}>
        <div style={{marginBottom:60,fontSize:50}}>登录：</div>
        <Input  
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        size="large"  style={{marginBottom:20}} placeholder="输入你的身份" value={this.state.user} allowClear onChange={this.onChange.bind(this)} />
        <Search
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="输入入关"
          enterButton="登录"
          size="large"
          onSearch={this.submit.bind(this)}
        />
      </div>
    )
  }
}

export default category
