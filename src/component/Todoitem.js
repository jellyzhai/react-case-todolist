import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Todoitem extends Component{
  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this)
  }

  // 第一次挂载之后 数据再次更新后 更新DOM前执行
  componentWillUpdate(){
    // console.log('子组件更新前执行: componentWillUpdate')
  }

  // 第一次挂载之后 数据再次更新后 完成更新DOM后执行
  componentDidUpdate(){
    // console.log('子组件更新后执行: componentDidUpdate')
  }

  //组件中内容被删除前（页面关闭前）执行
  componentWillUnmount(){
    //console.log('组件中内容被删除前执行: componentWillUnmount')
  }

  /* 这是自动执行的生命周期更新函数；
  * 默认情况下，父组件render函数执行时，
  * 无论子组件接受的值是否变化 都自动执行render函数（生成虚拟DOM 做比对）
  * 这样浪费性能，所以要根据props的变化，判断是否需要执行render函数
  * */
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.content !== this.props.content){
      return true
    }else{
      return false
    }
  }

  render(){
    //console.log('子组件更新中：render')
    //在this.props上获取父组件传过来的值
    const {content, test} = this.props;
    return (
      <li
        style={{background: 'pink'}}
        onClick={this.handleDelete}
        dangerouslySetInnerHTML = {{__html: `${test} ${content}`}}
      ></li>
    )
  }

  handleDelete(){
    const { deleteItem, index } = this.props;
    deleteItem(index)
  }

}

/*
* 引入的PropTypes 用于对Todoitem子组件接受的传值类型 进行校验
* 对于自己组件要求必传 且规定数据类型的值如test，父组件必须按要求传入
* 如果没有传递 可以在在子组件中设置defaultProps默认属性
* */

Todoitem.propTypes = {
  test: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),//符合类型中的一个
  index: PropTypes.number,
  deleteItem: PropTypes.func
}

Todoitem.defaultProps = {
  test: 'hello'
}

export default Todoitem