import React from 'react';
import {Input,Button,List} from 'antd';

//无状态组件：直接用一个含有props参数的函数 返回JSX语法
// 一个UI组件的类中 只有一个render函数时，可以写成无状态组件
//优点：性能高
const TodolistUI = (props) => {
  return (
    <div style={{margin: '10px'}}>
      <Input
        value={props.inputValue}
        placeholder='click input'
        style={{width: '300px',marginRight: '10px'}}
        onChange={props.changeInputValue}
      />
      <Button type='primary' onClick={props.updateList}>提交</Button>
      <List
        bordered
        dataSource={props.list}
        renderItem={(item,index) => (
          <List.Item
            onClick={props.deleteItem.bind(props.parent,index)}
          >{item}</List.Item>
        )}
        style={{width: '300px',marginTop: '10px'}}
      />
    </div>
  )
}

 export default TodolistUI