//请求表单详细信息接口
var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
});
var dataArray;

function requestForm() {
	var pramaData = {
		"content_id": formid,
		"type": type,
		"form_idcard": idcard
	}
	$.ajax({
		type: 'POST',
		url: overallInterface + 'getHistory.do',
		data: pramaData,
		async: true,
		dataType: 'json',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			var obj;
			if(data) {

				obj = JSON.parse(data);

				var dic = obj[0];

				dataArray = []; //存放所有的中文名称的数组
				for(var key in dic) { //拿出所有的key
					var value = dic[key];
					//				value.push("english",key);
					value['english'] = key;
					if(key == "form_idcard" || key == "punid" || key == "showcontent" || key == "formunid") {

					} else {
						dataArray.push(value);
					}

				}
				//对dataArray排序
				if(formid == "01BFCCC5E8098CA5954B5251B3CA3AA9") { //城市大型广告
					var newdataArray = new Array(11);
					for(var i = 0; i < dataArray.length; i++) {
						var dic = dataArray[i];
						var chinese = dic.chinese;
						if(chinese == "申请单位") {
							newdataArray.splice(0, 1, dic);
						}
						if(chinese == "地址") {
							newdataArray.splice(1, 1, dic);
						}
						if(chinese == "法定代表") {
							newdataArray.splice(2, 1, dic);
						}
						if(chinese == "联系电话") {
							newdataArray.splice(3, 1, dic);
						}
						if(chinese == "经办人") {
							newdataArray.splice(4, 1, dic);
						}
						if(chinese == "经办人_联系电话") {
							newdataArray.splice(5, 1, dic);
						}
						if(chinese == "设置名称") {
							newdataArray.splice(6, 1, dic);
						}
						if(chinese == "设置地点") {
							newdataArray.splice(7, 1, dic);
						}
						if(chinese == "设置规格长度") {
							newdataArray.splice(8, 1, dic);
						}
						if(chinese == "设置规格宽度") {
							newdataArray.splice(9, 1, dic);
						}
						if(chinese == "设置规格厚度") {
							newdataArray.splice(10, 1, dic);
						}
						if(chinese == "设置期限") {
							newdataArray.splice(11, 1, dic);
						}

					}

					dataArray = newdataArray;
				}
				if(formid == "235AA672DF20E68210EDCFC001E1F452") { //边境通行证
					//
					var newdataArray = new Array(11);
					for(var i = 0; i < dataArray.length; i++) {
						var dic = dataArray[i];
						var chinese = dic.chinese;
						if(chinese == "姓名") {
							newdataArray.splice(0, 1, dic);
						}
						if(chinese == "性别") {
							newdataArray.splice(1, 1, dic);
						}
						if(chinese == "出生日期") {
							newdataArray.splice(2, 1, dic);
						}
						if(chinese == "联系电话") {
							newdataArray.splice(3, 1, dic);
						}
						if(chinese == "身份证号码") {
							newdataArray.splice(4, 1, dic);
						}
						if(chinese == "工作单位") {
							newdataArray.splice(5, 1, dic);
						}
						if(chinese == "现住地址") {
							newdataArray.splice(6, 1, dic);
						}
						if(chinese == "前往地点") {
							newdataArray.splice(7, 1, dic);
						}
						if(chinese == "前往事由") {
							newdataArray.splice(8, 1, dic);
						}
						if(chinese == "边境通行－有效期起始") {
							newdataArray.splice(9, 1, dic);
						}
						if(chinese == "边境通行－有效期截止") {
							newdataArray.splice(10, 1, dic);
						}

					}

					dataArray = newdataArray;

				}
				if(formid == "B178EF5D80B682E39E818AE7A92ED6FD") { //专线通行证
					var newdataArray = new Array(10);
					for(var i = 0; i < dataArray.length; i++) {
						var dic = dataArray[i];
						var chinese = dic.chinese;
						if(chinese == "号牌") {
							newdataArray.splice(0, 1, dic);
						}
						if(chinese == "车辆所有人") {
							newdataArray.splice(1, 1, dic);
						}
						if(chinese == "证件编号") {
							newdataArray.splice(2, 1, dic);
						}
						if(chinese == "通行线路") {
							newdataArray.splice(3, 1, dic);
						}
						if(chinese == "有效期－起始年") {
							newdataArray.splice(4, 1, dic);
						}
						if(chinese == "有效期－起始月") {
							newdataArray.splice(5, 1, dic);
						}
						if(chinese == "有效期－起始日") {
							newdataArray.splice(6, 1, dic);
						}
						if(chinese == "有效期－截止年") {
							newdataArray.splice(7, 1, dic);
						}
						if(chinese == "有效期－截止月") {
							newdataArray.splice(8, 1, dic);
						}
						if(chinese == "有效期－截止日") {
							newdataArray.splice(9, 1, dic);
						}

					}

					dataArray = newdataArray;

				}

				example.items = [];

				for(var i = 0; i < dataArray.length; i++) {

					example.items.push({
						english: dataArray[i].english,
						chineseName: dataArray[i].chinese,
						historyValue: dataArray[i].historyValue
					})
					if(i == 0) {
						document.getElementById("content").style.display = "block";
					}
				}

				if(formid == "01BFCCC5E8098CA5954B5251B3CA3AA9") {
					setTimeout(showMi, 500);
				}

			}
		},
		error: function(err) {
			document.getElementById("loading").style.display = "none";
			//			alert("获取信息失败");
		}
	});
}
//显示 米·
function showMi() {
	var id = "mi" + "ggszgg_k";
	var id2 = "mi" + "ggszgg_h";
	var id3 = "mi" + "ggszgg_c";
	document.getElementById(id).style.display = "inline-block";
	document.getElementById(id).style.width = '';
	document.getElementById(id2).style.display = "inline-block";
	document.getElementById(id3).style.display = "inline-block";

}

//表单提交接口
function submitForm() {
	document.getElementById("submitBtn3").disabled = false;
	document.getElementById("loading").style.display = "block";
	var pramadic = {};
	for(var i = 0; i < dataArray.length; i++) {
		var english = dataArray[i].english;
		var info = document.getElementById(english).value;
		pramadic[english] = info;
	}
	pramadic["form_idcard"] = idcard;
	var formInfo = JSON.stringify(pramadic);
	var pramaData = {
		"key": "linewell", //密钥
		"punid": window.localStorage.punid, //办件id
		"contentId": formid, //表单id
		"formInfo": formInfo,
		"userid": userid
	}
	//	"http://10.10.10.165:8080/yiwu/ywzw/interface/"
	$.ajax({
		type: 'POST',
		url: overallInterface + 'getShowContent.do',
		data: pramaData,
		async: true,
		dataType: 'json',
		success: function(data) {
			console.log(data);
			document.getElementById("loading").style.display = "none";
			if(data.result == "0") { //提交表单成功
				var sign = data.submitresult;
				sign = JSON.parse(sign);
				if(sign == "") {
					alert("请您先登录浙江政务服务网，进入个人中心点击“我的签名”进行签名确认后再进行在线填表");
				} else {

					if(sign[0].result != "true") { //需要签章

						window.location.href = "draw.html?punid=" + window.localStorage.punid + "&formid=" + formid + "&index=" + index;

					} else { //不需要签章
						alert("将自动调用您签章库中的签章加盖在申请表上，并提交至后台审核");
						if(index + 1 == formArray.length) { //无表单信息 
							window.location.href = "ordersuccess.html?type=02";

						} else { //有表单信息继续跳转表单
							index++;
							window.location.href = "form.html?index=" + index;
						}
					}
				}
				//window.location.href = "draw.html?punid=" + window.localStorage.punid + "&formid=" + formid + "&index=" + index;

			} else {
				alert("申请表提交失败");
			}

		},
		error: function(err) {
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});

}