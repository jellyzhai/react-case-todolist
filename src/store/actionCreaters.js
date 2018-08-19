import {INIT_LIST, CHANGE_INPUT_VALUE, UPDATE_LIST, DELETE_ITEM} from './actionTypes';
import axios from 'axios';

export const getChangeInputAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getUpdateListAction = () => ({
  type: UPDATE_LIST
})

export const getDeleteItemAction = (value) => ({
  type: DELETE_ITEM,
  value
})

export const initList = (data) => ({
  type: INIT_LIST,
  data
})

/* //redux-saga
export const getInitList = (data) => ({
  type: GET_INIT_LIST,
  data
})*/

//store中使用thunk中间件，作为action和store的中间件
// 升级dispatch函数，当action是函数时 则自动执行函数，并传入dispatch方法
export const getTodolist = () => {
  return (dispatch) => {
    axios.get('/list.json').then((res) => {
      const data = res.data;
      const action = initList(data);
      dispatch(action);
    })
  }
}

