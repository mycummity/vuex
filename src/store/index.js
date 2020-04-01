import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  // 所有的任务列表
	  list: [],
	  // 文本框的内容
	  inputValue: 'aaa',
	  // 下一个id
	  nextId: 5,
	  viewKey: 'all'
  },
  mutations: {
	  initList(state,list){
		  state.list = list
	  },
	  // 为store中的inputValue赋值
	  setInputValue(state,val){
		  state.inputValue = val
	  },
	  // 添加列表项
	  addItem(state){
		  const obj = {
			  id: state.nextId,
			  info: state.inputValue.trim(),
			  done: false
		  }
		  state.list.push(obj)
		  state.nextId++
		  state.inputValue = ''
	  },
	  // 根据id删除对应的任务事项
	  removeItem(state,id){
		  // 根据id查找对应项的索引
		  const i = state.list.findIndex(item => item.id === id)
		  // 根据索引删除对应的元素
		  if(i !== -1){
			  state.list.splice(i,1)
		  }
	  },
	  // 修改复选框选中状态
	  changeStatus(state,params){
		  const i = state.list.findIndex(item => item.id === params.id)
		  if(i !== -1){
		  	state.list[i].done = params.status
		  }
	  },
	  // 清除已完成的任务
	  cleanDone(state){
		  state.list = state.list.filter(item => item.done === false)
	  },
	  // 修改选项卡关键字进行选项卡切换
	  changeViewKey(state,key){
		  state.viewKey = key
	  }
  },
  actions: {
	  getList(context){
		  axios.get('/list.json').then(({data}) => {
			  // console.log(data)  
			  // console.log(typeof data)
			  context.commit('initList',data)
		  })
	  }
  },
  getters: {
	  // 统计未完成的任务条数
	  unDoneLength(state){
		  return state.list.filter(item => item.done === false).length
	  },
	  infoList(state){
		  if(state.viewKey === 'all'){
			  return state.list
		  }else if(state.viewKey === 'done'){
			  return state.list.filter(item => item.done)
		  }else if(state.viewKey === 'undone'){
			  return state.list.filter(item => !item.done)
		  }else{
			  return state.list
		  }
	  }
  },
  modules: {
  }
})
