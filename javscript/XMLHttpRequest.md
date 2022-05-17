# XMLHttpRequest

分为Level 1 和Level 2

Level 1 有以下缺点

* 受[同源策略](https://so.csdn.net/so/search?q=同源策略&spm=1001.2101.3001.7020)的限制，不能发送跨域请求；CORS
* 不能发送[二进制](https://so.csdn.net/so/search?q=二进制&spm=1001.2101.3001.7020)文件（如图片、视频、音频等），只能发送纯文本数据；pure string data
* 在发送和获取数据的过程中，无法实时获取进度信息，只能判断是否完成；no progress

Level 2 改进

* 可以发送跨域请求，在服务端允许的情况下；
* 支持发送和接收二进制数据；
* 新增formData对象，支持发送表单数据；
* 发送和获取数据时，可以获取进度信息；
* 可以设置请求的超时时间；

#### formdata

`var formdata = new FormData()`





## 方法和属性

| 方法和属性                                                   | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Open（String method,String url,Boolean ansynch,String username,String password） | 指定和服务器端交互的HTTP方法，URL地址及其他请求信息。其中method表示HTTP请求方法。支持所有HTTP的方法，一般使用“GET”，“POST”url表示请求的服务器的地址Asynch表示是否采取异步方式，true表示异步，false表示同步后两个参数可以不指定，username和password分别表示用户名和密码，提供http认证机制需要的用户名和密码 |
| Send(content)                                                | 向服务器发出请求，如果采用异步方式，该方法会立即返回。 Content可以不指定或者指定为null表示不发送数据其内容可以使DOM对象，输入流或是字符串 |
| setRequestHeader(String header,String value)                 | 设置HTTP请求中的指定头部header的值为value。此方法需在open方法以后调用 |
| getAllReponseHeader()                                        | 返回包含HTTP的所有响应头包括Content-Length，Date，URI等内容。返回值是一个字符串，包含所有头信息，其中每一个键名和键值用冒号分开，每一组键之间用CR和LF（回车加换行符）来分隔 |
| GetResponseHeader(String header)                             | 返回HTTP响应头中指定的键名header对应的值                     |
| Abort()                                                      | 停止当前http请求，对应的XMLHttpRequest对象会复位到未初始化的状态 |
| responseText                                                 | 服务器响应的文本内容                                         |
| ResponseXML                                                  | 服务器响应的[XML](https://so.csdn.net/so/search?q=XML&spm=1001.2101.3001.7020)内容对应的DOM对象 |
| Status                                                       | 服务器返回的http状态码                                       |
| statusText                                                   | 服务器返回状态码的文本信息                                   |
| readyState                                                   | 表示XMLHttpRequest对象的状态 0 - 4                           |
| Onreadystatechage                                            | 请求状态改变的时间触发器（readyState变化时会调用这个属性上注册的javascript函数） |







# xhr相关事件



1. `XMLHttpRequestEventTarget`接口定义了7个事件：
   - `onloadstart`
   - `onprogress`
   - `onabort`
   - `ontimeout`
   - `onerror`
   - `onload`
   - `onloadend`
2. 每一个`XMLHttpRequest`里面都有一个`upload`属性，而`upload`是一个`XMLHttpRequestUpload`对象
3. `XMLHttpRequest`和`XMLHttpRequestUpload`都继承了同一个`XMLHttpRequestEventTarget`接口，所以`xhr`和`xhr.upload`都有第一条列举的7个事件
4. `onreadystatechange`是`XMLHttpRequest`独有的事件

所以这么一看就很清晰了：
`xhr`一共有8个相关事件：7个`XMLHttpRequestEventTarget`事件+1个独有的`onreadystatechange`事件；而`xhr.upload`只有7个`XMLHttpRequestEventTarget`事件。



## 事件触发条件

| 事件                 | 触发条件                                                     |
| :------------------- | :----------------------------------------------------------- |
| `onreadystatechange` | 每当`xhr.readyState`改变时触发；但`xhr.readyState`由非`0`值变为`0`时不触发。 |
| `onloadstart`        | 调用`xhr.send()`方法后立即触发，若`xhr.send()`未被调用则不会触发此事件。 |
| `onprogress`         | `xhr.upload.onprogress`在上传阶段(即`xhr.send()`之后，`xhr.readystate=2`之前)触发，每50ms触发一次；`xhr.onprogress`在下载阶段（即`xhr.readystate=3`时）触发，每50ms触发一次。 |
| `onload`             | 当请求成功完成时触发，此时`xhr.readystate=4`                 |
| `onloadend`          | 当请求结束（包括请求成功和请求失败）时触发                   |
| `onabort`            | 当调用`xhr.abort()`后触发                                    |
| `ontimeout`          | `xhr.timeout`不等于0，由请求开始即`onloadstart`开始算起，当到达`xhr.timeout`所设置时间请求还未结束即`onloadend`，则触发此事件。 |
| `onerror`            | 在请求过程中，若发生`Network error`则会触发此事件（若发生`Network error`时，上传还没有结束，则会先触发`xhr.upload.onerror`，再触发`xhr.onerror`；若发生`Network error`时，上传已经结束，则只会触发`xhr.onerror`）。**注意**，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的`xhr.statusCode`是`4xx`时，并不属于`Network error`，所以不会触发`onerror`事件，而是会触发`onload`事件。 |

## 事件触发顺序

当请求一切正常时，相关的事件触发顺序如下：

1. 触发`xhr.onreadystatechange`(之后每次`readyState`变化时，都会触发一次)
2. 触发`xhr.onloadstart`
   //上传阶段开始：
3. 触发`xhr.upload.onloadstart`
4. 触发`xhr.upload.onprogress`
5. 触发`xhr.upload.onload`
6. 触发`xhr.upload.onloadend`
   //上传结束，下载阶段开始：
7. 触发`xhr.onprogress`
8. 触发`xhr.onload`
9. 触发`xhr.onloadend`



## 发生`abort`/`timeout`/`error`异常的处理

在请求的过程中，有可能发生 `abort`/`timeout`/`error`这3种异常。那么一旦发生这些异常，`xhr`后续会进行哪些处理呢？后续处理如下：

1. 一旦发生`abort`或`timeout`或`error`异常，先立即中止当前请求
2. 将 `readystate` 置为`4`，并触发 `xhr.onreadystatechange`事件
3. 如果上传阶段还没有结束，则依次触发以下事件：
   - `xhr.upload.onprogress`
   - `xhr.upload.[onabort或ontimeout或onerror]`
   - `xhr.upload.onloadend`
4. 触发 `xhr.onprogress`事件
5. 触发 `xhr.[onabort或ontimeout或onerror]`事件
6. 触发`xhr.onloadend` 事件

## 在哪个`xhr`事件中注册成功回调？

从上面介绍的事件中，可以知道若`xhr`请求成功，就会触发`xhr.onreadystatechange`和`xhr.onload`两个事件。 那么我们到底要将成功回调注册在哪个事件中呢？我倾向于 `xhr.onload`事件，因为`xhr.onreadystatechange`是每次`xhr.readyState`变化时都会触发，而不是`xhr.readyState=4`时才触发。

```javascript

xhr.onload = function () {
    //如果请求成功
    if(xhr.status == 200){
      //do successCallback
    }
}

```

上面的示例代码是很常见的写法：先判断`http`状态码是否是`200`，如果是，则认为请求是成功的，接着执行成功回调。这样的判断是有坑儿的，比如当返回的`http`状态码不是`200`，而是`201`时，请求虽然也是成功的，但并没有执行成功回调逻辑。所以更靠谱的判断方法应该是：当`http`状态码为`2xx`或`304`时才认为成功。

```javascript

  xhr.onload = function () {
    //如果请求成功
    if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
      //do successCallback
    }

```







## XMLHttpRequest的使用步骤



### 指定响应处理函数

IE: 

```js
var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
```

other:

```js
var xmlHttp = new XMLHttpRequest(); 
```

综上写一个实例化

```js
//实例化XMLHttpRequest对象  
var xmlHttp;
function createXMLHttpRequest(){  
    if(window.XMLHttpRequest){  
        xmlHttp = new XMLHttpRequest();   
    }else if(window.ActiveXObject){  
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }  
}
```

### 指定响应处理函数

 接下来就要指定当服务器返回信息时客户端的处理方式。只需将相应的处理函数名称赋给XMLHttpRequest对象的onreadystatechange属性即可，比如：

```js
xmlHttp.onreadystatechange = callBack;  
// 需要说明的是，这个函数名称不加括号，不带参数；也可以使用JavaScript即时定义函数的方式定义响应函数，比如：
xmlHttp.onreadystatechange = function(){  
         // Do something...  
}  
```

### 发送HTTP请求

指定响应处理函数后，就可以向服务器发出HTTP请求了。这需要调用XMLHttpRequest对象的open()和send()方法。

```js
xmlHttp.open("get/Post","URL",true/false);  
xmlHttp.send(null);
```

>  open()方法详解 

```js
//XMLHttpRequest对象的open()方法原型  
void open(string method, string URL , boolean asynch, string username, string password); 
```

open()方法表示会建立对服务器的调用，这是初始化一个请求的纯脚本方法。

它有2个必要的参数，还有3个可选的参数。method表示向服务器发送信息的方式，可以为Get或Post；URL表示所调用的服务器资源的URL；asynch是一个布尔值，指示这个调用时异步还是同步，默认为true；username和password允许我们指定一个特定的用户名和口令。 一般使用时只取前三个参数即可。

> send()方法详解

send()方法具体向服务器发送请求。如果请求声明为异步的，这个方法就会立即返回，否则它会等待，知道接收到响应为止。参数**content**是可选的，可以是一个DOM对象的实例、一个输入流或一个串。传入的内容会作为请求体的一部分发送。

### 处理服务器返回的信息

在第二步中我们为XMLHttpRequest指定了响应处理函数，响应处理函数检查XMLHttpRequest对象的readyState属性值的变化，如果**readyState值为4**时，代表服务器已经传回所有信息，可以开始**处理信息**并**更新页面内容**了。

```js
function callBack(){  
    if(xmlHttp.readyState==4){  
        if(xmlHttp.status==200){  
            //do something with xmlHttp.responseText;
            //text 属性表示服务器的文本响应，其处理结果以字符串形式返回。
            xmlHttp.responseText; 
            //xml 属性表示服务器响应，其结果将格式化为XML Document对象。
            xmlHttp.responseXML;
        }     
    }  
}  
```

### 完整xmlrequest代码

```js
var xmlHttp;  

  
function AjaxFunction(){  
    createXMLHttpRequest();  
    if(xmlHttp!=null){  
        
        //设置xhr请求的超时时间
        xhr.timeout = 3000;
        
        //设置期望的返回数据类型 json, text , document ...
        xhr.responseType = '';
        
        //创建一个 post 请求，采用异步
        xmlHttp.open("get/Post","URL",true/false); 
        
		//注册相关事件回调处理函数
        xhr.onload = e => {
            if(this.status == 200||this.status == 304){
                alert(this.responseText);
            }
        };
        //注册相关事件回调处理函数 -> 或者是
        xmlHttp.onreadystatechange = callBack;  
        
        // 请求结束
        xhr.onloadend = e => {
            console.log('request loadend');
        };
        // 请求出错
        xhr.onerror = e => {
            console.log('request error')
        };
        // 请求超时
        xhr.ontimeout = e => {
            console.log('request timeout');
        };
        
        
        xmlHttp.send(null);  
    }     
}     
  
//实例化XMLHttpRequest对象  
function createXMLHttpRequest(){  
    if(window.XMLHttpRequest){  
        xmlHttp = new XMLHttpRequest();   
    }else if(window.ActiveXObject){  
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
    }  
}  
  
//指定响应函数  
function callBack(){  
    if(xmlHttp.readyState==4){  
        if(xmlHttp.status==200){  
            //do something with xmlHttp.responseText;  
            xmlHttp.responseText;  
        }     
    }  
} 
```

有些人可能会有疑问，为什么不用jQuery中的ajaxt方法呢？

这是因为jQuery中的ajax方法需要jquery文件的依赖，如果是想要依靠原生的js不想导入jQuery文件的情况下是不能使用的，针对于这些场景所以XMLHttpRequest还是相当受欢迎的。



## 如何设置request header

在发送`Ajax`请求（实质是一个[HTTP](https://link.segmentfault.com/?enc=bfbxt55J0STu0DZYPPmdcA%3D%3D.1mzF%2BA8HAJylIm9Nm5QcH0%2B%2BjIYTyQ%2BpMSGKeIqwa%2BiyngAOv8xICnreeSHkQnuDxMlEmTeLlAzJNxIHTNhTlw%3D%3D)请求）时，我们可能需要设置一些请求头部信息，比如`content-type`、`connection`、`cookie`、`accept-xxx`等。`xhr`提供了`setRequestHeader`来允许我们修改请求 header。

> ```js
> void setRequestHeader(DOMString header, DOMString value);
> ```

**重点**

- 方法的第一个参数 header 大小写不敏感，即可以写成`content-type`，也可以写成`Content-Type`，甚至写成`content-Type`;
- `Content-Type`的默认值与具体发送的数据类型有关，请参考下文**可以发送什么类型的数据**一节；
- `setRequestHeader`必须在`open()`方法之后，`send()`方法之前调用，否则会抛错；
- `setRequestHeader`可以调用多次，最终的值不会采用覆盖`override`的方式，而是采用追加`append`的方式。下面是一个示例代码：

```javascript
var client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequestHeader('X-Test', 'one');
client.setRequestHeader('X-Test', 'two');
// 最终request header中"X-Test"为: one, two
client.send();
```

## 如何获取response header

`xhr`提供了2个用来获取响应头部的方法：`getAllResponseHeaders`和`getResponseHeader`。前者是获取 response 中的所有header 字段，后者只是获取某个指定 header 字段的值。另外，`getResponseHeader(header)`的`header`参数不区分大小写。

> ```javascript
> DOMString getAllResponseHeaders();
> DOMString getResponseHeader(DOMString header);
> ```

*这2个方法看起来简单，但却处处是坑儿。*

1. 使用`getAllResponseHeaders()`看到的所有`response header`与实际在控制台 `Network` 中看到的 `response header` 不一样
2. 使用`getResponseHeader()`获取某个 `header` 的值时，浏览器抛错`Refused to get unsafe header "XXX"`

经过一番寻找最终在 [Stack Overflow找到了答案](https://link.segmentfault.com/?enc=0fLF%2BX1pihRxnLTgk73llw%3D%3D.legDZ9iSqwux97AfMnCzn%2BalOT9ycrhEBz4ZMj0F6XZc4q9o5C7AWXB9cM%2BoOkdJK9H%2BD6nLZkho%2FZ9RUQ7fh0q4y%2Bp5y4mzAT0%2BeOgnjiP1exf59vdX8hwkUKOD%2FR%2Fj)。

- 原因1：[W3C的 xhr 标准中做了限制](https://link.segmentfault.com/?enc=kK0rGUYPj3aSciXJZ%2Fvqtg%3D%3D.8JKCNNFmhn6maxk0XytxBEuEmBYeRVPO37pDIxaG18%2Bv5wDQJc0Z%2FpeK8K8x8l8C)，规定客户端无法获取 response 中的 `Set-Cookie`、`Set-Cookie2`这2个字段，无论是同域还是跨域请求；
- 原因2：[W3C 的 cors 标准对于跨域请求也做了限制](https://link.segmentfault.com/?enc=8qwp44iDTzZ8W6o7j3Nn0g%3D%3D.QaXAGLh902wr4fW%2FJV8F%2Fp7a305%2BFc6mZmuJoRleT%2FLLyRvVygrYHTyh7gK8t%2FJA4my3LIhhk1qd2jKEQNlvICopwRMn7BYMxWJwCwb5xgU%3D)，规定对于跨域请求，客户端允许获取的response header字段只限于“`simple response header`”和“`Access-Control-Expose-Headers`” （两个名词的解释见下方）。

> "`simple response header`"包括的 header 字段有：`Cache-Control`,`Content-Language`,`Content-Type`,`Expires`,`Last-Modified`,`Pragma`;
> "`Access-Control-Expose-Headers`"：首先得注意是"`Access-Control-Expose-Headers`"进行**跨域请求**时响应头部中的一个字段，对于同域请求，响应头部是没有这个字段的。这个字段中列举的 header 字段就是服务器允许暴露给客户端访问的字段。

所以`getAllResponseHeaders()`只能拿到***限制以外\***（即被视为`safe`）的header字段，而不是全部字段；而调用`getResponseHeader(header)`方法时，`header`参数必须是***限制以外\***的header字段，否则调用就会报`Refused to get unsafe header`的错误。

## 如何指定`xhr.response`的数

有些时候我们希望`xhr.response`返回的就是我们想要的数据类型。比如：响应返回的数据是纯JSON字符串，但我们期望最终通过`xhr.response`拿到的直接就是一个 js 对象，我们该怎么实现呢？
有2种方法可以实现，一个是`level 1`就提供的`overrideMimeType()`方法，另一个是`level 2`才提供的`xhr.responseType`属性。

### xhr.overrideMimeType()

`overrideMimeType`是`xhr level 1`就有的方法，所以浏览器兼容性良好。这个方法的作用就是用来重写`response`的`content-type`，这样做有什么意义呢？比如：server 端给客户端返回了一份`document`或者是 `xml`文档，我们希望最终通过`xhr.response`拿到的就是一个`DOM`对象，那么就可以用`xhr.overrideMimeType('text/xml; charset = utf-8')`来实现。

```javascript
var xhr = new XMLHttpRequest();
//向 server 端获取一张图片
xhr.open('GET', '/path/to/image.png', true);

// 这行是关键！
//将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined');

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    //通过 responseText 来获取图片文件对应的二进制字符串
    var binStr = this.responseText;
    //然后自己再想方法将逐个字节还原为二进制数据
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);
      //String.fromCharCode(c & 0xff);
      var byte = c & 0xff; 
    }
  }
};

xhr.send();
```

### xhr.responseType

`responseType`是`xhr level 2`新增的属性，用来指定`xhr.response`的数据类型，目前还存在些兼容性问题，可以参考本文的【`XMLHttpRequest`的兼容性】这一小节。那么`responseType`可以设置为哪些格式呢，我简单做了一个表，如下：

| 值              | `xhr.response` 数据类型 | 说明                             |
| --------------- | ----------------------- | -------------------------------- |
| `""`            | `String`字符串          | 默认值(在不设置`responseType`时) |
| `"text"`        | `String`字符串          |                                  |
| `"document"`    | `Document`对象          | 希望返回 `XML` 格式数据时使用    |
| `"json"`        | `javascript` 对象       | 存在兼容性问题，IE10/IE11不支持  |
| `"blob"`        | `Blob`对象              |                                  |
| `"arrayBuffer"` | `ArrayBuffer`对象       |                                  |

```javascript
var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png', true);
//可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
//xhr.responseType = 'arrayBuffer';
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    ...
  }
};

xhr.send();
```

虽然在`xhr level 2`中，2者是共同存在的。但其实不难发现，`xhr.responseType`就是用来取代`xhr.overrideMimeType()`的，`xhr.responseType`功能强大的多，`xhr.overrideMimeType()`能做到的`xhr.responseType`都能做到。所以我们现在完全可以摒弃使用`xhr.overrideMimeType()`了。

## 如何获取response数据

xhr提供了3个属性来获取请求返回的数据，分别是：xhr.response、xhr.responseText、xhr.responseXML

- `xhr.response`
  - 默认值：空字符串`""`
  - 当请求完成时，此属性才有正确的值
  - 请求未完成时，此属性的值可能是`""`或者 `null`，具体与 `xhr.responseType`有关：当`responseType`为`""`或`"text"`时，值为`""`；`responseType`为其他值时，值为 `null`
- `xhr.responseText`
  - 默认值为空字符串`""`
  - 只有当 `responseType` 为`"text"`、`""`时，`xhr`对象上才有此属性，此时才能调用`xhr.responseText`，否则抛错
  - 只有当请求成功时，才能拿到正确值。以下2种情况下值都为空字符串`""`：请求未完成、请求失败
- `xhr.responseXML`
  - 默认值为 `null`
  - 只有当 `responseType` 为`"text"`、`""`、`"document"`时，`xhr`对象上才有此属性，此时才能调用`xhr.responseXML`，否则抛错
  - 只有当请求成功且返回数据被正确解析时，才能拿到正确值。以下3种情况下值都为`null`：请求未完成、请求失败、请求成功但返回数据无法被正确解析时

## 如何追踪`ajax`请求的当前状态

在发一个`ajax`请求后，如果想追踪请求当前处于哪种状态，该怎么做呢？

用`xhr.readyState`这个属性即可追踪到。这个属性是只读属性，总共有5种可能值，分别对应`xhr`不同的不同阶段。**每次`xhr.readyState`的值发生变化时，都会触发`xhr.onreadystatechange`事件**，我们可以在这个事件中进行相关状态判断。



```javascript
xhr.onreadystatechange = function () {
    switch(xhr.readyState){
      case 1://OPENED
        //do something
            break;
      case 2://HEADERS_RECEIVED
        //do something
        break;
      case 3://LOADING
        //do something
        break;
      case 4://DONE
        //do something
        break;
    }
```

## 如何设置请求的超时时间

如果请求过了很久还没有成功，为了不会白白占用的网络资源，我们一般会主动终止请求。`XMLHttpRequest`提供了`timeout`属性来允许设置请求的超时时间。

> `xhr.timeout`
> 单位：milliseconds 毫秒
> 默认值：`0`，即不设置超时



很多同学都知道：从**请求开始**算起，若超过 `timeout` 时间请求还没有结束（包括成功/失败），则会触发**ontimeout**事件，主动结束该请求。

【那么到底什么时候才算是**请求开始**？】
——`xhr.onloadstart`事件触发的时候，也就是你调用`xhr.send()`方法的时候。
因为`xhr.open()`只是创建了一个连接，但并没有真正开始数据的传输，而`xhr.send()`才是真正开始了数据的传输过程。只有调用了`xhr.send()`，才会触发`xhr.onloadstart` 。

【那么什么时候才算是**请求结束** ？】
—— `xhr.loadend`事件触发的时候。

另外，还有2个需要注意的坑儿：

1. 可以在 `send()`之后再设置此`xhr.timeout`，但计时起始点仍为调用`xhr.send()`方法的时刻。
2. 当`xhr`为一个`sync`**同步请求**时，`xhr.timeout`必须置为`0`，否则会抛错。原因可以参考本文的【如何发一个同步请求】一节。

## 如何发一个同步请求

`xhr`默认发的是异步请求，但也支持发同步请求（当然实际开发中应该尽量避免使用）。到底是异步还是同步请求，由`xhr.open（）`传入的`async`参数决定。

>  open(method, url [, async = true [, username = null [, password = null]]])

- `method`: 请求的方式，如`GET/POST/HEADER`等，这个参数不区分大小写
- `url`: 请求的地址，可以是相对地址如`example.php`，这个**相对**是相对于当前网页的`url`路径；也可以是绝对地址如`http://www.example.com/example.php`
- `async`: 默认值为`true`，即为异步请求，若`async=false`，则为**同步请求**

当`xhr`为同步请求时，有如下限制：

- `xhr.timeout`必须为`0`
- `xhr.withCredentials`必须为 `false`
- `xhr.responseType`必须为`""`（注意置为`"text"`也不允许）

之前说过页面中应该尽量避免使用`sync`同步请求，为什么呢？
因为我们无法设置请求超时时间（`xhr.timeout`为`0`，即不限时）。在不限制超时的情况下，有可能同步请求一直处于`pending`状态，服务端迟迟不返回响应，**这样整个页面就会一直阻塞**，无法响应用户的其他交互。

另外，标准中并没有提及同步请求时事件触发的限制，但实际开发中我确实遇到过部分应该触发的事件并没有触发的现象。如在 chrome中，当`xhr`为同步请求时，在`xhr.readyState`由`2`变成`3`时，并不会触发 `onreadystatechange`事件，`xhr.upload.onprogress`和 `xhr.onprogress`事件也不会触发

## 如何获取上传、下载的进度

在上传或者下载比较大的文件时，实时显示当前的上传、下载进度是很普遍的产品需求。
我们可以通过`onprogress`事件来实时显示进度，默认情况下这个事件每50ms触发一次。需要注意的是，上传过程和下载过程触发的是不同对象的`onprogress`事件：

- 上传触发的是`xhr.upload`对象的 `onprogress`事件

- 下载触发的是`xhr`对象的`onprogress`事件

  ```javascript
  xhr.onprogress = updateProgress;
  xhr.upload.onprogress = updateProgress;
  function updateProgress(event) {
    if (event.lengthComputable) {
      var completedPercent = event.loaded / event.total;
    }
   }
  ```

## 可以发送什么类型的数据

>  void send(data);

`xhr.send(data)`的参数data可以是以下几种类型：

- `ArrayBuffer`
- `Blob`
- `Document`
- `DOMString`
- `FormData`
- `null`

如果是 GET/HEAD请求，`send()`方法一般不传参或传 `null`。不过即使你真传入了参数，参数也最终被忽略，`xhr.send(data)`中的data会被置为 `null`.

`xhr.send(data)`中data参数的数据类型会影响请求头部`content-type`的默认值：

- 如果`data`是 `Document` 类型，同时也是`HTML Document`类型，则`content-type`默认值为`text/html;charset=UTF-8`;否则为`application/xml;charset=UTF-8`；
- 如果`data`是 `DOMString` 类型，`content-type`默认值为`text/plain;charset=UTF-8`；
- 如果`data`是 `FormData` 类型，`content-type`默认值为`multipart/form-data; boundary=[xxx]`
- 如果`data`是其他类型，则不会设置`content-type`的默认值

当然这些只是`content-type`的默认值，但如果用`xhr.setRequestHeader()`手动设置了中`content-type`的值，以上默认值就会被覆盖。

当然这些只是`content-type`的默认值，但如果用`xhr.setRequestHeader()`手动设置了中`content-type`的值，以上默认值就会被覆盖。

```javascript
try{
    xhr.send(data)
  }catch(e) {
    //doSomething...
  };
```

## `xhr.withCredentials`与 `CORS` 什么关系

我们都知道，在发同域请求时，浏览器会将`cookie`自动加在`request header`中。但大家是否遇到过这样的场景：在发送跨域请求时，`cookie`并没有自动加在`request header`中。
造成这个问题的原因是：在`CORS`标准中做了规定，默认情况下，浏览器在发送跨域请求时，不能发送任何认证信息（`credentials`）如"`cookies`"和"`HTTP authentication schemes`"。除非`xhr.withCredentials`为`true`（`xhr`对象有一个属性叫`withCredentials`，默认值为`false`）

所以根本原因是`cookies`也是一种认证信息，在跨域请求中，`client`端必须手动设置**xhr.withCredentials=true**，且`server`端也必须允许`request`能携带认证信息（即`response header中包含`**Access-Control-Allow-Credentials:true**），这样浏览器才会自动将`cookie`加在`request header`中。

另外，要特别注意一点，一旦跨域`request`能够携带认证信息，`server`端一定不能将`Access-Control-Allow-Origin`设置为`*`，而必须设置为请求页面的域名。
