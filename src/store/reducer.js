import {GET_INIT_LIST, INIT_LIST, CHANGE_INPUT_VALUE, UPDATE_LIST, DELETE_ITEM} from './actionTypes';
const defaultState = {
  inputValue: '',
  list: []
};

//不能改变state原数据
//输出函数要是纯函数：输入相同的值必定返回相同的结果
export default (state = defaultState, action) => {

  if(action.type === INIT_LIST){
    const newState = {...state};
    newState.list = action.data;
    return newState;
  }

  if(action.type === GET_INIT_LIST){
    const newState = {...state};
    newState.list = action.data;
    return newState;
  }

  if(action.type === CHANGE_INPUT_VALUE){
    const newState = {...state};
    newState.inputValue = action.value;
    return newState;
  }

  if(action.type === UPDATE_LIST){
    const newState = {...state};
    newState.list.push(newState.inputValue);
    newState.inputValue = ''
    return newState;
  }

  if(action.type === DELETE_ITEM){
    const newState = {...state};
    newState.list.splice(action.value,1);
    return newState
  }
  return state;
}