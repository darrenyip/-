#### DOMContentLoad 和onload时间区别和兼容

1. DomContentLoad
   1. 等初始html文档完全被加载和解析（dom完全解析）时触发。无需等待样式列表，图片，子框架加载完成
2. onload
   1. 等页面所有元素，图片，脚本等全部加载完成后触发



DOMContentLoad  比  onload 更早 触发



ie9 -- onreadystatechange



```javascript
document.attachEvent('onreadystatechange',function(){
	var span = document.querySelector('span');
    console.log(span,"onreadystatechange")

})
```

