import { 
  deleteForeCategory, 
  getCategoryMapping, 
  getAllForeCategory, 
  CategoryStatus, 
  searchAllFirstLevel, 
  listSecondByFirstId, 
  createOrUpdateForeCategory, 
  listAllBrand, 
  listAllLabel,
  listGoodsByCondition,
  getCategoryMsg,
  fuzzSearchCategory } from "api";
import router from 'umi/router';
export default {
  namespace: 'categoryModel',
  state: {
    unBindNum: 0,
    oneLevelList: [],
    firstLevelList: [],
    index_visible: false,
    setType: '1',
    editCateData: {},
    goodsList: []
  },
  reducers: {

    cate_createCid(state, {payload}){
      return { ...state, ...payload }
    },
    setData_list(state, {payload}){
      let resp ={}
      resp.firstLevelList = payload
      function fun(arr1) {
        arr1.forEach( (e,i) => {
          if(e.child) fun(e.child)
          if(e.contentList) {
            e.contentList.forEach(e=>e.info = true)
            e.child = e.contentList 
          }
        })
        return arr1
      }

      resp.navList = fun(payload)

      console.log('navList', resp)
      return { ...state, ...resp }
    },
    setData_BrandTag(state, {payload}){
      return { ...state, ...payload }
    },
    edit_checkDeploy(state, {payload}){
      return { ...state, ...payload }
    },
    dele_redio(state, {payload}){
      return { ...state, ...payload }
    },
    cate_editCategory(state, {payload}) {
      payload.editData = payload[0]
      return { ...state, ...payload }
    }
  },
  // 处理异步逻辑 put: 用于触发action 、call: 用于调用异步逻辑 、select: 用于获取state
  effects: {
    // tab 初始
    *getAllForeCategory({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(getAllForeCategory, payload)
      if (data.success) {
        yield put({
          type: 'setData_list',
          payload: data.data
        })
      } else {
        throw data
      }
    },
    // 新建、编辑类目 保存
    *createOrUpdateForeCategory({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(createOrUpdateForeCategory, payload)
      if (data.success) {
      } else {
        throw data
      }
    },
    // 类目删除
    *deleteForeCategory({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(deleteForeCategory, payload)
      if (data.success) {

      } else {
        throw data
      }
    },
    // 编辑前台类目返回信息
    *getCategoryMsg({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(getCategoryMsg, payload)
      if (data.success) {
        yield put({
          type: 'cate_editCategory',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },

    // 登录
    *isLogin({ payload }, { call, put }) {
      // yield 同步调用
      if(
        !window.sessionStorage.getItem('tokenUser') ||
        !window.sessionStorage.getItem('tokenPas') ||
        window.sessionStorage.getItem('tokenUser') !='刘广庆' ||
        window.sessionStorage.getItem('tokenPas') !='xiangjv0725'
        ){
        router.push('/navManage/category/loginPage')
      }
    },










    // tab 搜索
    *fuzzSearchCategory({ payload }, { call, put }){
      const data = yield call(fuzzSearchCategory, payload)
      if (data.code == 1000) {
        yield put({
          type: 'setData_list',
          payload: data.data
        })
      } else {
        throw data
      }
    },

    // 隐藏 / 显示
    *CategoryStatus({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(CategoryStatus, payload)
      if (data.code == 1000) {

      } else {
        throw data
      }
    },
    // 一级类目
    *searchAllFirstLevel({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(searchAllFirstLevel, payload)
      if (data.code == 1000) {
        yield put({
          type: 'setData_list',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },
    // 二级类目
    *listSecondByFirstId({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(listSecondByFirstId, payload)
      if (data.code == 1000) {
        yield put({
          type: 'setData_list',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },

    // 获取所有品牌
    *listAllBrand({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(listAllBrand, payload)
      if (data.code == 1000) {
        yield put({
          type: 'setData_BrandTag',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },
    // 获取所有标签
    *listAllLabel({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(listAllLabel, payload)
      if (data.code == 1000) {
        yield put({
          type: 'setData_BrandTag',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },
    // 根据条件查询商品列表
    *listGoodsByCondition({ payload }, { call, put }) {
      // yield 同步调用
      const data = yield call(listGoodsByCondition, payload)
      if (data.code == 1000) {
        yield put({
          type: 'cate_createCid',
          payload: data.data
        }) 
      } else {
        throw data
      }
    },

  },
};