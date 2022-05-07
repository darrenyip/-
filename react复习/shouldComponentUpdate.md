## 前言:

对于React组件，props和state是必不可少的，我们可以在props和state中存放任何类型的数据,并通过改变props和state去控制整个组件的状态。

## 组件的重新渲染

当组件的props或state发生变化时，React会构建新的virtual DOM（虚拟DOM），然后通过diff算法把新旧的virtual DOM进行比较，如果新旧virtual DOM树不等则会重新渲染，否则不重新渲染。

## 不必要的重新渲染

由于DOM操作的非常耗时的，因此要提高组件的性能就应该尽可能地减少组件的重新渲染。如果某个props或state改变了并不影响组件的渲染，那么这个时候是不需要重新渲染组件的。



## 阻止组件重新渲染

1. **shouldComponentUpdate**：这是React组件的钩子函数之一，该函数会在组件重新渲染之前调用，由函数的返回的bool值决定是否重新渲染组件。

```javascript
class CounterButton extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {count: 1};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) { 	
            // 比较新旧props，决定是否重新渲染组件
            return true;
        }
        if (this.state.count !== nextState.count) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({count: state.count + 					1}))}
            >
                Count: {this.state.count}
            </button>
        );
    }
}
```

2. Pure Component: 如果一个组件只和props和state有关系，给定相同的props和state机会渲染相同的结果，那么这个组件就叫作**纯组件**。
   1. *注：大部分情况下，可以使用React.Component来代替手写shouldComponentUpdate，由于只是浅比较，对于数据结构足够复杂（比如对象或数组，修改其中某一个项的值或push一个值并不会触发更新），当然这种情况可以通过对props和state的正确使用来避免，使用concat或赋值一个新对象来触发重新渲染。*

## 总结

1. 通过shouldComponentUpdate钩子函数来自定义重新渲染的条件。
2. 通过继承React官方提供的React.PureComponent类，根据浅比较的规则，组件会自动判断是否重新渲染。



[^https://zhuanlan.zhihu.com/p/164749684]: 来源

