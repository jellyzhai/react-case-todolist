import React, {Component, Fragment} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../static/reactAnimation.css'

class ReactAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      list: []
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.addItem = this.addItem.bind(this)
  }

  render() {
    return (
      <Fragment>
        {/*
          in属性值为Boolean，单个属性，true:入场动画，false:出场动画
          classNames：表示自动加载类名的第一个(横杠-区分次序)单词
          timeout：标签和css中都要写时间
          unmountOnExit:在完成出场动画后 把元素从DOM中删除
          onEntered:钩子函数，如字面意思，在元素完成入场后执行的函数
          appear={true}：用于在页面初始加载时也出现入场动画，
          CSSTransition组件会自动添加fade-appear和fade-appear-active class类
        */}
        <CSSTransition
          in={this.state.show}
          classNames='fade'
          timeout={1000}
          unmountOnExit
          onEntered={(el) => el.style.color='red'}
          appear={true}
        >
          <div>hello</div>
        </CSSTransition>
        <button onClick={this.toggleShow}>toggle</button>
        <hr/>
        {/*设置多个元素样式*/}
        <TransitionGroup>
            {
              this.state.list.map((item,index) => {
                return (
                  <CSSTransition
                    classNames='fade'
                    timeout={1000}
                    unmountOnExit
                    appear={true}
                    key={index}
                  >
                    <div>{item}</div>
                  </CSSTransition>
                )
              })
            }
        </TransitionGroup>
        <button onClick={this.addItem}>add</button>

      </Fragment>
    )
  }

  toggleShow() {
    this.setState(() => ({
      show: this.state.show ? false : true
    }))
  }

  addItem() {
    this.setState((prevState) => ({
      list: [...prevState.list,'item']
    }))
  }
}

export default ReactAnimation;