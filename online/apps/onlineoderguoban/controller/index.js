var urldomain = "app.zjzwfw.gov.cn/open";

function containerType() {
	var a = navigator.userAgent.toLowerCase();
	a.match(/ipad/i);
	a.match(/iphone os/i);
	a.match(/midp/i);
	a.match(/rv:1.2.3.4/i);
	a.match(/ucweb/i);
	a.match(/android/i);
	a.match(/windows ce/i);
	a.match(/windows mobile/i);
	var b = -1 < a.indexOf("hanweb"),
		c = -1 < a.indexOf("micromessenger"),
		a = -1 < a.indexOf("alipayclient");
	return b ? "hanweb" : c ? "wechat" : a ? "Alipay" : "web"
}
var container = containerType(),
	tmpTag = "https:" == document.location.protocol ? !0 : !1;
"hanweb" == container ? 1 == tmpTag ? ("undefined" == typeof $ && document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/index.js">\x3c/script>'), document.write('<script data-main="https://' + urldomain + '/jssdk/jmportal_SDK.js" src="https://' + urldomain + '/jssdk/require.js">\x3c/script>')) : ("undefined" == typeof $ && document.write('<script type="text/javascript" src="http://' +
	urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/js/index.js">\x3c/script>'), document.write('<script data-main="http://' + urldomain + '/jssdk/jmportal_SDK.js" src=" http://' + urldomain + '/jssdk/require.js">\x3c/script>')) : "wechat" == container ? 1 == tmpTag ? ("undefined" == typeof $ && document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js">\x3c/script>'),
	document.write('<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/wechatjs/sha1.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/alipayjs/md5.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/alipayjs/aes.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' +
		urldomain + '/jssdk/alipayjs/pad-nopadding.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/wechatjs/index.js">\x3c/script>')) : ("undefined" == typeof $ && document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry">\x3c/script>'), document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js">\x3c/script>'),
	document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/wechatjs/sha1.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/md5.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/aes.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/pad-nopadding.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' +
		urldomain + '/jssdk/wechatjs/index.js">\x3c/script>')) : "Alipay" == container && (1 == tmpTag ? ("undefined" == typeof $ && document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/alipayjs/aes.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' +
	urldomain + '/jssdk/alipayjs/md5.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/alipayjs/pad-nopadding.js">\x3c/script>'), document.write('<script type="text/javascript" src="https://' + urldomain + '/jssdk/alipayjs/index.js">\x3c/script>')) : ("undefined" == typeof $ && document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/js/jquery-1.8.3.min.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=xOWZlWcTZPK84VcK3Ixzqq9wQ6arTUry">\x3c/script>'),
	document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/aes.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/md5.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/pad-nopadding.js">\x3c/script>'), document.write('<script type="text/javascript" src="http://' + urldomain + '/jssdk/alipayjs/index.js">\x3c/script>')));