#### readyState 解释

#### MDN

| Value | State              | Description                                                  |
| :---- | :----------------- | :----------------------------------------------------------- |
| `0`   | `UNSENT`           | Client has been created. `open()` not called yet.            |
| `1`   | `OPENED`           | `open()` has been called.                                    |
| `2`   | `HEADERS_RECEIVED` | `send()` has been called, and headers and status are available. |
| `3`   | `LOADING`          | Downloading; `responseText` holds partial data.              |
| `4`   | `DONE`             | The operation is complete.                                   |

0 ~ 4 为不同的state

0. 请求未初始化 - (Uninitialized) the send( ) method has not yet been invoked. 
   * (未初始化)： (XMLHttpRequest)对象已经创建，但还没有调用open()方法。

1. 服务器连接已经建立 - (Loading) the send( ) method has been invoked, request in progress. 
   * (载入)：已经调用open() 方法，但尚未发送请求。
2. 请求已接受， 接收到响应头 -  (Loaded) the send( ) method has completed, entire response received.
   *  (载入完成)： 请求已经发送完成。
3. 请求处理中，正在下载响应体 - (Interactive) the response is being parsed. 
   *  (交互)：可以接收到部分响应数据。
4. 请求完成，相应已经就绪 -  (Completed) the response has been parsed, is ready for harvesting.
   *  (完成)：已经接收到了全部数据，并且连接已经关闭。



### Example

```javascript
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.readyState); // readyState will be 0

xhr.open('GET', '/api', true);
console.log('OPENED', xhr.readyState); // readyState will be 1

xhr.onprogress = function () {
    console.log('LOADING', xhr.readyState); // readyState will be 3
};

xhr.onload = function () {
    console.log('DONE', xhr.readyState); // readyState will be 4
};

xhr.send(null);
```



# onreadystatechange事件

| **属性**           | **描述**                                                     |
| ------------------ | ------------------------------------------------------------ |
| onreadystatechange | 存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。 |
| readyState         | 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。             |
| status             | example: 200: "OK"      404: 未找到页面                      |

# status 状态码

> 1XX   信息响应类，表示接收到请求并且继续处理

这些状态代码表示临时的响应。客户端在收到常规响应之前，应准备接收一个或多个 1xx 响应。

* 100 客户必须继续发出请求
* 101 客户要求服务器根据请求转换HTTP协议版本

> 2xx 处理成功响应类，表示动作被成功接收、理解和接受

- 200 成功
- 201 提示知道新文件的URL
- 202 接受和处理、但处理未完成
- 203 返回信息不确定或不完整
- 204 请求收到，但返回信息为空
- 205 服务器完成了请求，用户代理必须复位当前已经浏览过的文件
- 206 服务器已经完成了部分用户的GET请求

> 3xx 重定向响应类，为了完成指定的动作，必须接受进一步处理

- 300 请求的资源可在多处得到
- 301 删除请求数据
- 302 在其他地址发现了请求数据
- 303 建议客户访问其他URL或访问方式
- 304 客户端已经执行了GET，但文件未变化
- 305 请求的资源必须从服务器指定的地址得到
- 306 前一版本HTTP中使用的代码，现行版本中不再使用
- 307 申明请求的资源临时性删除

> 4xx 客户端错误，客户请求包含语法错误或者是不能正确执行

- 400 错误请求，如语法错误
- 401 请求授权失败
- 402 保留有效ChargeTo头响应
- 403 请求不允许
- 404 没有发现文件、查询或URl
- 405 用户在Request-Line字段定义的方法不允许
- 406 根据用户发送的Accept拖，请求资源不可访问
- 407 类似401，用户必须首先在代理服务器上得到授权
- 408 客户端没有在用户指定的饿时间内完成请求
- 409 对当前资源状态，请求不能完成
- 410 服务器上不再有此资源且无进一步的参考地址
- 411 服务器拒绝用户定义的Content-Length属性请求
- 412 一个或多个请求头字段在当前请求中错误
- 413 请求的资源大于服务器允许的大小
- 414 请求的资源URL长于服务器允许的长度
- 415 请求资源不支持请求项目格式
- 416 请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
- 417 服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求

> 5xx 服务器产生内部错误

- 500 服务器产生内部错误
- 501 服务器不支持请求的函数
- 502 服务器暂时不可用，有时是为了防止发生系统过载
- 503 服务器过载或暂停维修
- 504 关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
- 505 服务器不支持或拒绝支请求头中指定的HTTP版本