/**
 * 正则匹配url ?后面的参数值
 * @param {*} name 参数名
 * return 参数值
 */
function getParameter(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}

/**
 * 获取url中"?"符后的字串
 * 并对键值对解析，将对应的value存入到theRequest数组中
 * 下表为key，满足数组下标的唯一性
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
	//获得？之后的没改key=value中的所有value的集合
	return theRequest;
}

/*获取当前时间*/
function getCurDate() {
	var date = new Date(); //创建当前日期对象
	var year = date.getFullYear(); //显示当前年
	var month = date.getMonth() + 1; //获取当前月（0-11） + 1，显示正确年份
	var day = date.getDate(); //获取当前日

	if(month < 9) {
		month = '0' + month; //01-09月份的显示
	}
	if(day < 9) {
		day = '0' + day; //10，11，12月份显示
	}
	var dateFormat = year + "-" + month + "-" + day; //2018-01-01格式显示
	return dateFormat;
}

function getYesterDate() {
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate() - 1;

	if(month < 9) {
		month = '0' + month;
	}
	if(day < 9) {
		day = '0' + day;
	}
	var dateFormat = year + "-" + month + "-" + day;
	return dateFormat;
}

/*yyyy-mm-dd 比较大小*/
function compareDate(strDate1, strDate2) {

	if(strDate1 != "" && strDate2 != "") {
		var d1 = toDate(strDate1);
		var d2 = toDate(strDate2);
		return d1 < d2;
	} else {
		return true;
	}
}

function toDate(str) {
	var sd = str.split("-");
	//单纯的转换年月日，不包含，时分秒。
	return new Date(sd[0], sd[1], sd[2]);
}

//yyyy-mm-dd是否是一周
function isInAWeek(startDate, endDate) {
	var time1 = Date.parse(toDate(startDate));
	var time2 = Date.parse(toDate(endDate));
	//获取当前天数的差值
	var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
	console.log("time1===" + time1);
	console.log("time2===" + time2);
	console.log("time2 - time1 ===" + nDays);
	if(nDays > 7) {
		return false;
	} else {
		return true;
	}
}


function isFixedPhone(strs) {
	var reg = /^0\d{2,3}-?\d{7,8}$/;
	if(reg.test(strs)) {
		return true;
	} else {
		return false;
	}
}

/*本地图片上传到服务器*/
function uploadSXPS(fileObj, c) {
	if(fileObj == undefined || fileObj == null) return;
	var types = ["image/jpeg", "image/gif", "image/png"];
	if(types.indexOf(fileObj.type) > -1) {
		lrz(fileObj, {
			width: 800,
			done: function(res) {
				var dates = new FormData();
				fileObjs = res.origin;
				dates.append("myfile", fileObjs);
				$.ajax({
					url: RETURNPICUrl + "/uploadSXPS",
					type: 'POST',
					data: dates,
					async: false,
					cache: false,
					contentType: false, 
					processData: false, 
					success: c
				});
			}
		});
	}
}

//姓名脱敏
function encodeName(namePri) {
	if(namePri != null && namePri != undefined && namePri.length >= 2) {
		if(namePri.length > 4) {
			return namePri.substr(0, 1) + "**" + namePri.substr(namePri.length - 1);
		} else {
			var star = "";
			for(var i = 0; i < namePri.length - 1; i++) {
				star += "*";
			}
			return namePri.substr(0, 1) + star;
		}
	} else {
		return namePri;
	}
}

//身份证脱敏
function encodeSFZ(sfzPri) {
	if(sfzPri != null && sfzPri != undefined && sfzPri.length > 8) {
		var code = sfzPri.substr(5, 8);
		return "******" + code + "****";
	} else {
		return sfzpri;
	}
}

//手机号脱敏
function encodeTel(telPri) {
	if(telPri != null && telPri != undefined && telPri.length > 8) {
		var first = telPri.substr(0, 3);
		var end = telPri.substr(7);
		return first + "****" + end;
	} else {
		return telPri;
	}
}

//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”  
function isTel(s) {
	var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
	if(!patrn.exec(s)) return false
	return true
}

//校验手机号码：必须以数字开头，除数字外，可含有“-”  
function isMobil(s) {
	var patrn = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
	if(!patrn.exec(s)) return false
	return true
}

//校验邮政编码  
function isPostalCode(s) {
	var patrn = /^[a-zA-Z0-9 ]{3,12}$/;
	if(!patrn.exec(s)) return false
	return true
}

//校验邮箱 
function isEmail(s) {
	var patrn = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
	if(!patrn.exec(s)) return false
	return true
}

//校验身份证 
function isIdCard(s) {
	var patrn = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
	if(!patrn.exec(s)) return false
	return true
}

//设置input框只可以点击的
function setOnlyRead(value, id) {
	$(id).val(value);
	$(id).attr("readonly", "readonly");
	$(id).focus(function() {
		$(this).blur();
	});
}

//校验hanweb字段
function isHanweb() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	return sUserAgent.indexOf("hanweb") > -1;
}

/**
 * 	单独跳转，当前页面数据仍在
 * @param {Object} absoluteURL
 * @param {Object} titleName
 */
function stepWithData(absoluteURL, titleName) {
	lightAppJssdk.navigation.show({
		url: absoluteURL,
		title: titleName,
		isgoback: "0",
		success: function(data) {
			//成功回调
		},
		fail: function(data) {
			//错误返回
		}
	});
}
