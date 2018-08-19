import React, { Component } from 'react';
import 'antd/dist/antd.css';
import store from '../store';
import TodolistUI from './TodolistUI';
import {getChangeInputAction, getUpdateListAction, getDeleteItemAction, getTodolist} from '../store/actionCreaters';

class AntdTodolist extends Component {

  constructor(props) {
    super(props);
    this.state = store.getState();
    this.updateState = this.updateState.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.updateList = this.updateList.bind(this);
    store.subscribe(this.updateState);
  }

  render() {
    return (
      <TodolistUI
        inputValue={this.state.inputValue}
        changeInputValue={this.changeInputValue}
        updateList={this.updateList}
        deleteItem={this.deleteItem}
        parent={this}
        list={this.state.list}
      ></TodolistUI>
    )
  }

  //store使用thunk中间件，store.dispatch(action)中的action函数会自动运行
  //把Ajax请求异步操作放在action中便于维护
  componentDidMount() {
    const action = getTodolist();
    store.dispatch(action);
  }
  
/* //redux-saga
  componentDidMount() {
    const action = getInitList();
    store.dispatch(action);
  }*/

  updateState() {
    this.setState(store.getState())
  }

  changeInputValue(e) {
    const value = e.target.value;
    if(value){
      const action = getChangeInputAction(value);
      store.dispatch(action)
    }
  }

  updateList() {
    if(this.state.inputValue){
      const action = getUpdateListAction();
      store.dispatch(action)
    }
  }

  deleteItem(index) {
    const action = getDeleteItemAction(index);
    store.dispatch(action)
  }
}

export default AntdTodolist
