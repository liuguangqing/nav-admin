
const postApiPre = 'POST'
const path = '/navSystem'
const setUrl = url => {
  return `${postApiPre} ${path}${url}`
}

let api = {}
// 导航预览
api.getAllForeCategory = setUrl(`/navhead`)

// 新建/编辑类目保存
api.createOrUpdateForeCategory = setUrl(`/updataVal`)

// 删除前台类目
api.deleteForeCategory = setUrl(`/deleRid`)

// 编辑前台类目返回信息
api.getCategoryMsg = setUrl(`/editNav`)









// 新增可视化组
const beforeUrl = '/category/'
// 类目全局
api.getCategoryMapping = setUrl(`${beforeUrl}getCategoryMapping`)



// 批量导入商品
api.uploadGoodsIds = setUrl(`${beforeUrl}uploadGoodsIds`)

// 文件上传
// api.uploadFile = setUrl(`/upload/uploadFile`)

// 批量删除三级类目关联商品
api.batchDeleteGoods = setUrl(`${beforeUrl}batchDeleteGoodsFromForeBackBind`)


// 显示/隐藏前台类目
api.CategoryStatus = setUrl(`${beforeUrl}updateForeCategoryStatus`)

// 查询所有一级前台类目
api.searchAllFirstLevel = setUrl(`${beforeUrl}listFirstLevelForeCategory`)

// 根据一级前台类目id查询所有二级类目
api.listSecondByFirstId = setUrl(`${beforeUrl}listSecondLevelForeCategoryByFirstId`)

// 查询所有前台类目信息
// api.getAllForeCategory = setUrl(`${beforeUrl}getAllForeCategory`)

// 查询所有前台类目信息
api.fuzzSearchCategory = setUrl(`${beforeUrl}fuzzSearchCategory`)

// 查询所有品牌
api.listAllBrand = setUrl(`${beforeUrl}listAllBrand`)

// 查询所有标签
api.listAllLabel = setUrl(`${beforeUrl}listAllLabel`)



// 根据条件查询商品列表
api.listGoodsByCondition = setUrl(`${beforeUrl}listGoodsByCondition`)

export default api
