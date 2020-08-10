var modeldiv = document.getElementById('modeldiv');
var modelbottomdiv = document.getElementById('bottom_fixdiv');
var totalpage = 0;
var resultlist = [];
var totalpagelist = [];

window.onload = function() {
	var Request = new Object();
	Request = GetRequest();
	var pageId = Request.pageid;
	totalpage = Request.totalpage;
	var resultliststr = Request.resultliststr;
	resultliststr = decodeURI(resultliststr);
	resultlist = JSON.parse(resultliststr);
	requestPage(pageId);
}

//下一页
function nextstep() {
	totalpage--;
	if(totalpage > 0) {
		resultlist = resultlist.slice(0);
		resultlist.shift();
		var restliststr = JSON.stringify(resultlist);
		window.location.href = "modelchild.html?pageid=" + resultlist[0].iid + "&totalpage=" + totalpage + "&resultliststr=" + encodeURI(restliststr);
	}
}

//上一页
function previousstep() {
	window.history.go(-1);
}

//获取页面详细
function requestPage(pageId) {
	var data = {
		pageid: pageId
	};
	mui.ajax('http://192.168.88.48:8180/complat3.2/interfaces/previewHtmlPage.do', {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get',
		async: true,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			totalpagelist = totalpagelist.concat(data.formControlList);
			var str;
			if(data.result == "true") {
				for(var i = 0; i < data.formControlList.length; i++) { //有如下这些控件
					str += data.formControlList[i].htmlCode;
					modeldiv.innerHTML += data.formControlList[i].htmlCode;
				}
				if(totalpage > 1) {
					document.getElementById('bottom_fixdiv').style.display = 'block';
				} else {
					document.getElementById('bottom_fixdiv').style.display = 'none';
				    modeldiv.innerHTML += '<div class="bottomdiv"><button type="button" class="buttonnxt" onclick="submitcontent()">提交</button></div>';
				}
			} else {

			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
		}
	});
}

//提交
function submitcontent() {
	var params = [];
	for(var i = 0; i < totalpagelist.length; i++) {
		var controlid = totalpagelist[i].htmlId;
		var controlvalue;
		if(totalpagelist[i].controlType == 1) { //单行文本框
			controlvalue = document.getElementById(controlid).innerText;
		} else if(totalpagelist[i].controlType == 2) { //多行文本框
			controlvalue = document.getElementById(controlid).innerText;
		} else if(totalpagelist[i].controlType == 3) { //下拉菜单
			controlvalue = getpulllistvalue(controlid);
		} else if(totalpagelist[i].controlType == 4) { //单选框
			controlvalue = getradiovalue(controlid);
		} else if(totalpagelist[i].controlType == 5) { //复选框
			controlvalue = getcheckvalue(controlid);
		} else {
			controlvalue = '';
		}
		params.push({
			'pagename': totalpagelist[i].pageName,
			'controlvalue': controlvalue,
			'controlName': totalpagelist[i].controlName
		});
	}
	var jsonstring = JSON.stringify(params);
	var dataArray = eval(params);
	var temp = new Object();
	for(var i = 0; i < dataArray.length; i++) {
		var pagename = dataArray[i].pagename;
		var controlName = dataArray[i].controlName;
		var controlvalue = dataArray[i].controlvalue;
		var temp_pagename = temp[pagename];
		if(temp_pagename == undefined) {
			var tempArray = new Array();
			tempArray.push({
				controlName: dataArray[i].controlName,
				controlvalue: dataArray[i].controlvalue
			});
			temp[pagename] = tempArray;
		} else {
			temp_pagename.push({
				controlName: dataArray[i].controlName,
				controlvalue: dataArray[i].controlvalue
			});
			temp[pagename] = temp_pagename;
		}
	}
	var finalArray = new Array();
	for(var key in temp) {
		finalArray.push({
			formName: key,
			list: temp[key]
		});
	}

	console.log(JSON.stringify(finalArray));
}

//获取多选框选中的值
function getcheckvalue(checkid) {
	var obj = document.getElementsByName(checkid);
	var check_val = [];
	for(k in obj) {
		if(obj[k].checked)
			check_val.push(obj[k].value);
	}
	return check_val.join(',');
}

//获取单选框选中的值
function getradiovalue(radioid) {
	var chkObjs = null;
	var obj = document.getElementsByName(radioid)
	for(var i = 0; i < obj.length; i++) { //遍历Radio 
		if(obj[i].checked) {
			chkObjs = obj[i].value;
		}
	}
	return chkObjs;
}

//获取下拉框选中的值
function getpulllistvalue(selectid) {
	var obj = document.getElementById(selectid); //定位id
	var index = obj.selectedIndex; // 选中索引
	var text = obj.options[index].text; // 选中文本
	var value = obj.options[index].value; // 选中值
	return value;
}