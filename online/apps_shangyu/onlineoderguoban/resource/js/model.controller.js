var modeldiv = document.getElementById('modeldiv');
var modelbottomdiv = document.getElementById('bottom_fixdiv');
var totalpage = 0;
var resultlist = [];
var totalpagelist = [];
var wrapper = document.querySelector('.list');
var els;
var defaultIndex = 0;
var curIndex = 0;

function toNext() {
	if(curIndex >= els.length - 1) {
		return
	}
	curIndex++;
	change();
}

function toPre() {
	if(curIndex <= 0) {
		return
	}
	curIndex--;
	change();
}

function change() {
	var translateX = -(curIndex - defaultIndex) * 99 + '%';
	wrapper.style.transform = 'translate(' + translateX + ', 0)';
	wrapper.webkitTransform = 'translate(' + translateX + ', 0)';
	els[curIndex].className = 'current';
	if(curIndex !== els.length - 1) {
		els[curIndex + 1].className = 'next';
	}
	if(curIndex !== 0) {
		els[curIndex - 1].className = 'pre';
	}
}

//上一页
function previousstep() {
	toPre();
	if(curIndex == 0) { //第一页
		document.getElementById('submdiv').style.display = 'none';
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtnnone.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtn.png)";
	} else if(curIndex == els.length - 1) { //最后一页
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtn.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtnnone.png)";
		document.getElementById('submdiv').style.display = 'block';
	} else { //其他页面
		document.getElementById('submdiv').style.display = 'none';
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtn.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtn.png)";
	}
}

//下一页
function nextstep() {
	toNext();
	if(curIndex == 0) { //第一页
		document.getElementById('submdiv').style.display = 'none';
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtnnone.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtn.png)";
	} else if(curIndex == els.length - 1) { //最后一页
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtn.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtnnone.png)";
		document.getElementById('submdiv').style.display = 'block';
	} else { //其他页面
		document.getElementById('submdiv').style.display = 'none';
		document.getElementById('onebuttonid').style.backgroundImage = "url(../resource/img/prebtn.png)";
		document.getElementById('twobuttonid').style.backgroundImage = "url(../resource/img/nxtbtn.png)";
	}
}

window.onload = function() {
	changeviewheigt();
	requestTotalPage();
};

//根据屏幕大小适配翻页高度
function changeviewheigt() {
	var oDiv = document.getElementById('modeldiv');
	var wheigt = document.documentElement.clientHeight - 120;
	oDiv.style.height = wheigt + 'px';
}
var contextPath;
//根据事项id获取总page
function requestTotalPage() {
	var Request = new Object();
	Request = GetRequest();
	var scenescode = Request.itemids;
	contextPath = Request.contextPath;
//	scenescode = "1";
	var data = {
		scenescode: scenescode
	};
	mui.ajax(contextPath+'/interfaces/getpagebyscenescode.do', {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get',
		async: true,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if(data.result == "true" && data.formPageList.length > 0) {
				totalpage = data.formPageList.length;
				resultlist = data.formPageList;
				requestPage(resultlist[0].iid);
			} else {

			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
		}
	});
}

//获取页面详细
function requestPage(pageId) {
	var data = {
		pageid: pageId
	};
	mui.ajax(contextPath+'/interfaces/previewHtmlPage.do', {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'get',
		async: true,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			totalpagelist = totalpagelist.concat(data.formControlList);
			var str = "<li>";
			if(data.result == "true") {
				for(var i = 0; i < data.formControlList.length; i++) { //有如下这些控件
					str += data.formControlList[i].htmlCode;
				}
				modeldiv.innerHTML += str + "</li>";
				totalpage--;
				if(totalpage > 0) {
					resultlist = resultlist.slice(0);
					resultlist.shift();
					requestPage(resultlist[0].iid);
				}
				els = wrapper.querySelectorAll('li');
				for(var i = 0; i < els.length; i++) {
					els[i].style.left = (0 + (i - defaultIndex) * 99) + '%';
					if(i === defaultIndex) {
						els[i].className = 'current';
					} else if(i === defaultIndex - 1) {
						els[i].className = 'pre';
					} else if(i === defaultIndex + 1) {
						els[i].className = 'next';
					}
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
		if(totalpagelist[i].controlDateType == "file") { //附件
			var _srcbase64 = [];
			$("#"+controlid).each(function() {
				$(".mult-pics-item").each(function() {
					_srcbase64.push($(this).attr("src"));
				});
			});
			params.push({
				'pagename': totalpagelist[i].pageName,
				'controlvalue': _srcbase64,
				'controlName': totalpagelist[i].controlName,
				'controlType': totalpagelist[i].controlDateType
			});
		} else {
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
				'controlName': totalpagelist[i].controlName,
				'controlType': totalpagelist[i].controlDateType
			});
		}
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
				controlvalue: dataArray[i].controlvalue,
				controlType:dataArray[i].controlType
			});
			temp[pagename] = tempArray;
		} else {
			temp_pagename.push({
				controlName: dataArray[i].controlName,
				controlvalue: dataArray[i].controlvalue,
				controlType:dataArray[i].controlType
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
	var obj = document.getElementsByName(radioid);
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