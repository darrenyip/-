# Ajax

### 什么是 ajax

Ajax：即异步 JavaScript 和 XML。Ajax 是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。而传统的网页(不使用 Ajax)如果需要更新内容，必需重载整个网页面。

### 同步和异步的区别

同步提交：当用户发送请求时，当前页面不可以使用，服务器响应页面到客户端，响应完成，用户才可以使用页面。

异步提交：当用户发送请求时，当前页面还可以继续使用，当异步请求的数据响应给页面，页面把数据显示出来 。

### ajax 工作原理

客户端发送请求，请求交给 xhr，xhr 把请求提交给服务器，服务器进行业务处理，服务器响应数据交给 xhr 对象，xhr 对象接收数据，由 javascript 把数据写到页面上，如下图所示：

### 实现 AJAX 的基本步骤

> 要完整实现一个 AJAX 异步调用和局部刷新,通常需要以下几个步骤:
>
> 1. 创建 XMLHttpRequest 对象,即创建一个异步调用对象.
> 2. 创建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息.
> 3. 设置响应 HTTP 请求状态变化的函数.
> 4. 发送 HTTP 请求.
> 5. 获取异步调用返回的数据.
> 6. 使用 JavaScript 和 DOM 实现局部刷新.

#### 1. 创建 XMLHttpRequest 对象

不同浏览器使用的异步调用对象有所不同，在 IE 浏览器中异步调用使用的是 XMLHTTP 组件中的 XMLHttpRequest 对象，而在 Netscape、Firefox 浏览器中则直接使用 XMLHttpRequest 组件。因此，在不同浏览器中创建 XMLHttpRequest 对象的方式都有所不同.

在 IE 浏览器中创建 XMLHttpRequest 对象的方式为:

```javascript
var xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
```

在 Netscape 浏览器中创建 XMLHttpRequest 对象的方式为:

```javascript
var xmlHttpRequest = new XMLHttpRequest();
```

> 由于无法确定用户使用的是什么浏览器,所以在创建 XMLHttpRequest 对象时,最好将以上两种方法都加上.如以下代码所示:

```javascript
var xmlHttpRequest; //定义变量
createXMLHttpRequest();
function createXMLHttpRequest() {
  if (window.ActiveXObject) {
    // 如果是IE浏览器
    xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    xmlHttpRequest = new XMLHttpRequest();
  }
}
```

> 其中 ActiveXOject 并不是 Windows 对象的标准属性,而是 IE 浏览器中专有的属性,可以用于判断浏览器是否支持 ActiveX 控件.通常只有 IE 浏览器或以 IE 浏览器为核心的浏览器才能支持 Active 控件.
> "else if(window.XMLHttpRequest)"是为了防止一些浏览器既不支持 ActiveX 控件,也不支持 XMLHttpRequest 组件而进行的判断.其中 XMLHttpRequest 也不是 window 对象的标准属性,但可以用来判断浏览器是否支持 XMLHttpRequest 组件.
> 如果浏览器既不支持 ActiveX 控件,也不支持 XMLHttpRequest 组件,那么就不会对 xmlHttpRequest 变量赋值.

#### 2.创建 HTTP 请求
