//{Component, Fragment}是es6的解构赋值={Component:React.Component,Fragment:React.Fragment}
import React, {Component, Fragment} from 'react';
import axios from 'axios';

import Todoitem from './Todoitem';
import '../static/todolist.css';
import AntdTodolist from './AntdTodolist';

import ReactAnimation from './ReactAnimation';


//定义一个react组件
class Todolist extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      inputValue: ''
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  //生命周期函数定义：在某一时刻自动执行的函数

  //在组件第一次将要被 挂载到页面时执行
  componentWillMount(){
    //console.log('第一次挂载开始前：componentWillMount')
  }

  //在组件第一次被 挂载到页面后执行
  componentDidMount(){
    //console.log('第一次挂载结束后：componentDidMount')
  }

  //第一次挂载之后 数据再次更新后 更新DOM前执行
  componentWillUpdate(){
    //console.log('父组件更新前执行: componentWillUpdate')
  }

  //第一次挂载之后 数据再次更新后 完成更新DOM后执行
  componentDidUpdate(){
    //console.log('父组件更新后执行: componentDidUpdate')
  }

  render() {
    // console.log('父组件更新中：render')
    return (
      // Frabment用于消除页面多余元素 外面只能包裹一个标签
      <Fragment>
        <div>
          <label htmlFor="name">姓名</label>
          <input
            id='name'
            type="text"
            value={this.state.inputValue}
            onChange={this.changeInput}
          />
          {/*react中定义类属性 要用className*/}
          <button
            className='red-btn'
            onClick={this.handleAdd}
          >add</button>
        </div>
        {/*标签的ref属性 用于获取DOM节点 便于不得已的DOM操作如动画，
        函数参数任意写，都代表当前节点；react不建议操作DOM*/}
        <ul
          ref={(ul)=>this.ul = ul}
        >{this.getToditem()}</ul>
        <hr/>
        <ReactAnimation></ReactAnimation>
        <hr/>
        {/*使用antd UI框架重新设计todolist*/}
        <AntdTodolist></AntdTodolist>
      </Fragment>
    );
  }

  /*
  *componentDidMount在页面加载完成时 只执行一次使用
  * 此时 适合用第三方库axios进行网络请求
  * */
  // eslint-disable-next-line
  componentDidMount(){

    //请求的json文件中数组中元素要用双引号，
    // 这样在请求数据时 字符串数组自动转换js数组
    axios.get('/api/todolist')
      .then((res)=> {

        //要把数据复制一份使用 防止原数据不小心修改 导致引用显示错误
        this.setState(() =>({list: [...res.data]}))
      })
      .catch(()=> console.log('request error'))
  }

  /*
  * JSX语法,括号最外层只能由一个标签包裹
  * 标签不用加引号
  * {}花括号内只能写JSX表达式，不能写判断等语句,只有跟标签混用的时候采用{}
  * react会自动把{}中的数组，循环展示
  * 函数的bind(this)方法，返回一个新的函数，this指向传入的参数
  * */
  getToditem(){
    return(
      this.state.list.map((item,index)=>{

        //通过自定义属性 响子组件传值;用括号(可不加)包裹 多行书写 更规范
        return (
          <Todoitem
            key={index}
            index={index}
            content={item}
            deleteItem={this.handleDelete}>
          </Todoitem>
        )
      })
    )
  }

  handleAdd() {
    //设置数据要用对象的setState()方法
    if(this.state.inputValue){

      /*
      * setState是异步函数，有2参数，第一个函数参数 内部参数prevState表示state对象的上一次状态
      * 第二个函数参数 是在第一个函数参数运行完之后运行
      * */
      this.setState((prevState)=>{
        return {
          list: [...prevState.list,prevState.inputValue],
          inputValue: ''
        }
      },()=>{  //对与DOM的操作一定要在 setState之后，等待DOM更新后操作；
        //console.log('ul长度：'+this.ul.querySelectorAll('li').length)
      })
    }
  }

  changeInput(e){
    //新版react推荐使用函数参数 返回state对象,提高性能
    const inputValue = e.target.value;
    this.setState( () => ({inputValue}) );
    /*this.setState({
      inputValue: e.target.value
    })*/
  }

  handleDelete(index){
    //由于数组也是引用类型，所以不能直接list = this.state.list；这样一个发生数据变化另一个也变化
    this.setState( (prevState) => {
      const list = [...prevState.list];
      list.splice(index,1);
      return {list}
    });
  }
}

export default Todolist;
