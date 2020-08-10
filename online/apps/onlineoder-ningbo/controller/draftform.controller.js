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
		"siteid": vsiteid,
		"formid": formid
	}
	var requesturl = overallInterface + 'ywzw/interface/getForm.do';
	myRequest({
		url: requesturl,
		data: pramaData,
		header: '',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			var obj;
			if(data) {
				var dic = data;
				dataArray = []; //存放所有的中文名称的数组
				dataArray = data;
				//对dataArray排序
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						name: dataArray[i].name,
						code: dataArray[i].code,
						type: dataArray[i].type
					})
					if(i == 0) {
						document.getElementById("content").style.display = "block";
					}
				}
				setTimeout(function() {
					for(var i = 0; i < forms.length; i++) {
						for(var j = 0; j < dataArray.length; j++) {
							if(forms[i].name == dataArray[j].name) {
								document.getElementById(dataArray[j].code).value = forms[i].value;
							}
						}
					}
				}, 1000);
			}
		},
		fail: function(data) {
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

//表单提交接口--草稿
function draftForm() {
	$("#draftBtn").attr('disabled', true);
	document.getElementById("loading").style.display = "block";
	var pramadic = {};
	for(var i = 0; i < dataArray.length; i++) {
		var code = dataArray[i].code;
		var name = dataArray[i].name;
		var info = document.getElementById(code).value;
		pramadic[name] = info;
	}
	//	pramadic["formid"] = formid;
	var formInfo = JSON.stringify(pramadic);
	var pramaData = {
		siteid: vsiteid,
		state: 0, //0草稿；1提交
		validitykey: validitykey,
		form: formInfo
	}
	var requesturl = overallInterface + 'ywzw/interface/formsSubmit.do';
	myRequest({
		url: requesturl,
		data: pramaData,
		header: '',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			if(data.result == true) { //提交表单成功
				var xmlurl = data.url;
				var dirname = data.dirname;
				var filesArray = [];
				var dic = {
					"xmlurl": xmlurl
				};
				filesArray.push(dic);
				pramas = JSON.parse(prama);
				pramas["form"] = filesArray;
				pramas["dirname"] = dirname;
				pramas["type"] = '0';
				var pra = JSON.stringify(pramas);
				submit();
			} else {
				$("#draftBtn").attr('disabled', false);
				alert("提交失败");
			}
		},
		fail: function(data) {
			$("#draftBtn").attr('disabled', false);
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});
}

//表单提交接口
function submitForm() {
	var pramadic = {};
	for(var i = 0; i < dataArray.length; i++) {
		var code = dataArray[i].code;
		var name = dataArray[i].name;
		var type = dataArray[i].type;
		var info = document.getElementById(code).value;
		//		verify(info, type);
		if(!verify(info, type)) {
			return
		}
	}
	$("#submitBtn3").attr('disabled', true);
	document.getElementById("loading").style.display = "block";
	for(var i = 0; i < dataArray.length; i++) {
		var code = dataArray[i].code;
		var name = dataArray[i].name;
		var info = document.getElementById(code).value;
		pramadic[name] = info;
	}
	//	pramadic["formid"] = formid;
	var formInfo = JSON.stringify(pramadic);
	var pramaData = {
		siteid: vsiteid,
		state: 1, //0草稿；1提交
		form: formInfo,
		validitykey: validitykey
	}
	var requesturl = overallInterface + 'ywzw/interface/formsSubmit.do';
	myRequest({
		url: requesturl,
		data: pramaData,
		header: '',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			if(data.result == true) { //提交表单成功
				var xmlurl = data.url;
				var dirname = data.dirname;
				var filesArray = [];
				var dic = {
					"xmlurl": xmlurl
				};
				filesArray.push(dic);
				pramas = JSON.parse(prama);
				pramas["form"] = filesArray;
				pramas["dirname"] = dirname;
				pramas["type"] = '1';
				var pra = JSON.stringify(pramas);
				submit();
			} else {
				$("#submitBtn3").attr('disabled', false);
				alert("提交失败");
			}
		},
		fail: function(data) {
			$("#submitBtn3").attr('disabled', false);
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});
}

function submit() {
	var pramaData = {
		"infoStr": JSON.stringify(pramas)
	}
	myRequest({
		url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
		data: pramaData,
		header: '',
		success: function(data) {
			if(data.result == true) { //提交表单成功
				setTimeout(jump, 1000);
			} else {
				alert("提交失败");
			}
		},
		fail: function(data) {
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
			$("#submitBtn3").attr('disabled', false);
		}
	});
}

function jump() {
	window.location.href = "odersuccess.html?type=02&siteid=" + vsiteid;
}

//验证输入类型
function verify(str, type) {
	if(type == 0) {
		//普通文本
		return true;
	} else if(type == 1) {
		//移动电话
		if(!(/^1\d{10}$/).test(str)) {
			mui.alert("请输入正确的移动电话");
			return false;
		} else {
			return true;
		}
	} else if(type == 2) {
		//固定电话
		if(!(/\d{3}-\d{8}|\d{4}-\d{7}/).test(str)) {
			mui.alert("请输入正确的固定电话");
			return false;
		} else {
			return true;
		}
	} else if(type == 3) {
		//电子邮件
		if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(str)) {
			mui.alert("请输入正确的电子邮件");
			return false;
		} else {
			return true;
		}
	} else if(type == 4) {
		//身份证
		if(!(/\d{15}|\d{18}/).test(str)) {
			mui.alert("请输入正确的身份证");
			return false;
		} else {
			return true;
		}
	} else if(type == 5) {
		//其他
		return true;
	} else {
		return true;
	}
}