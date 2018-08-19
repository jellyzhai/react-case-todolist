/*
//有问题一直发送网络请求
import { takeEvery,put } from 'redux-saga/effects';
import {GET_INIT_LIST} from './actionTypes';
import axios from 'axios';
import { getInitList} from './actionCreaters';

function* getList() {
  try{
    const res = yield axios.get('/list.json');
    const action = getInitList(res.data);
    yield put(action);
  } catch (e) {
    yield put({type: "GET_INIT_LIST", message: e.message});
  }
}

function* mySaga() {
  yield takeEvery(GET_INIT_LIST, getList);
}

export default mySaga;*/
