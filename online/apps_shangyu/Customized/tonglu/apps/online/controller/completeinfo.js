/**
 * 获取url中"?"符后的字串
 */
function GetRequest() {
	var url = window.location.search;
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

var example11 = new Vue({
	el: '#parent11',
	data: {
		items: []
	}
})
//请求补齐补正需要的材料接口
function requestOrderList() {
	var Request = new Object();

	Request = GetRequest();
	var punid = Request.punid;
	//组织参数
	var data = {
		punid: punid
	};
	mui.ajax(overallInterface + 'getbqbz.do?', {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		async: false, //同步
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			material = data;
			if(data.length > 0) {
				for(var i = 0; i < data.length; i++) {
					//调用push方法动态添加数据
					example11.items.push({
						index: i + 1,
						name: data[i].name,
						id: data[i].id,
					});
					if(i == 0) {
						document.getElementById("parent11").style.display = "block";
						document.getElementById('loading').style.display = 'none';
					}
				}

			} else {
				document.getElementById('loading').style.display = 'none';
				//				alert("暂无数据");
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);

		}
	});
}

function submitMaterial() {
	//开始提交
	var basicData = {
		"punid":"7cd89ed42ab14646b1ee130fffcb38ed"
	}
	for(var i = 0; i < material.length; i++) {
		console.log();
		var index = i + 1;
		var photo = document.getElementById("photo"+ index ).innerHTML;
		if(photo == ""){
			alert("材料不全，请上传材料");
			return false;
		}
	}
	
	var prama = {
		"data": basicData,
		"files": filesArray,
		"type": "1", //0 保存草稿  1提交
		"containertype": "1", //0 微信 1 app（由于现在微信的图片也是url，因此不需要区分容器类型了，都写死成1）
		"token": ""
	}
	var pramaData = {
		"files": JSON.stringify(prama)
	}

	$.ajax({
		type: 'POST',
		url: overallInterface + 'submitbqbz.do',
		data: pramaData,
		async: true,
		dataType: 'json',
		success: function(data) {
			if(data.result == "true"){
				alert("提交成功");
			}else{
				alert("提交失败");
			}
		},
		error: function(err) {
//			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});
}