//var jiajson = "[{\"zzbh\":\"D233005136\",\"tradetypename\":\"专业承包\",\"tradetypeboundname\":\"建筑装修装饰工程\",\"certlevelname\":\"贰级\",\"yxqqs\":\"2015年12月11日\",\"yxqjz\":\"2020年12月10日\",\"zz_state\":\"\"},{\"zzbh\":\"D333005133\",\"tradetypename\":\"专业承包\",\"tradetypeboundname\":\"地基基础工程\",\"certlevelname\":\"叁级\",\"yxqqs\":\"2016年03月23日\",\"yxqjz\":\"2021年03月23日\",\"zz_state\":\"\"},{\"zzbh\":\"DE160120067\",\"tradetypename\":\"施工总承包\",\"tradetypeboundname\":\"建筑工程\",\"certlevelname\":\"贰级\",\"yxqqs\":\"2016年11月07日\",\"yxqjz\":\"2019年11月06日\",\"zz_state\":\"1\"},{\"zzbh\":\"D333005133\",\"tradetypename\":\"专业承包\",\"tradetypeboundname\":\"起重设备安装工程\",\"certlevelname\":\"叁级\",\"yxqqs\":\"2016年03月23日\",\"yxqjz\":\"2021年03月23日\",\"zz_state\":\"\"}]";
var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

window.onload = function requestLicense() {
	var storage = window.localStorage;
	var userInfo = JSON.parse(storage.wxuserInfo);
	var date = {
		fn: "getJzyqyzzList",
		tyshxydm: userInfo.uniscid,
		shownum: "0",
		pageSize: "5",
		currentPage: "0",
		gszch: userInfo.appConRegNo
	}
	document.getElementById('loading').style.display = 'block';
	myRequest({
          url: licenseInterface,
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			if(data) {
				fillView(data);
			} else {
				mui.alert("暂无证照信息");
			}

		
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");
		
          }
    });

}

function fillView(data) {
	var obj = data;
	if(obj.length > 0) {
		example.items = [];
		for(var i = 0; i < obj.length; i++) {
			var name = obj[i].tradetypeboundname;

			var convertname;
			if(name.length > 10) {
				convertname = name.substring(0, 9) + "...";
			} else {
				convertname = name;
			}
			example.items.push({
					zzbh: obj[i].zzbh,
					tradetypeboundname: convertname
				})
				//					if(i == 0) {
				//						document.getElementById("parent").style.display = "block";
				//					}
		}
		//因为找不到Vue列表渲染完成后的事件，所以写个100秒的延时，等渲染完成后再执行以下方法
		setTimeout("document.getElementById('parent').style.display = 'block'", "100");
		setTimeout("$('.d1').height($('.d1').width()*4/3)", "100");
		$(".d1").height($(".d1").width() * 4 / 3);
	} else {
		mui.alert("暂无资质证书");
	}
}