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