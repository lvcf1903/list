//var jiajson = "{\"code\":0,\"path\":\"D:\\\\phpstudy\\\\WWW\\\\Uploads\\\\Attach\\\\2016-11-10\\\\1478742120735433.png\"}";
//var steurl = 'http://192.168.88.131:8080/zjtywssb/ywxw/interface/';

//获取事项相关信息
function requestMatter(itemcode) {
	myRequest({
		//$.ajax({
		url: overallInterface + 'ywzw/interface/queryMatterByItemcode.do',
		data: {
			itemcode: itemcode
		},
		type: "get",
		async: false,
		header: '',
		success: function(data) {
			if(data.result == false) {
				document.getElementById('loading').style.display = 'none';
				mui.alert(data.msg);
			} else {
				itemname = data.name;
				itemcodeid = data.itemid;
				webid = data.siteId;
				validitykey = data.validityKey;
				colid = data.colId;
				cityName1 = data.cityname;
				vsiteid = data.siteId;
				vbdcl = data.formtype;
				if(vsiteid==57){
					var str=location.href;
                    str=str.replace('/onlineoder/','/onlineorder-shangyu/');
					window.location.href =str;
				}else{
				document.getElementById("bodys").style.display = "block";
				}
				if(userInfo.authlevel == "1") { //未实名认证
					window.location.href = "http://puser.zjzwfw.gov.cn/sso/mobile.do?action=realname&servicecode";
				}
				if(userInfo.authlevel == "2" && data.userlevel == "1") { //初级实名认证，事项需要高级认证
					window.location.href = "http://puser.zjzwfw.gov.cn/sso/mobile.do?action=realname&servicecode";
				}
				requestWorkMaterial(itemcode, itemname, webid);
				if(vsiteid == 59 || vsiteid == 57 || vsiteid == 56 || vsiteid == 55) { //嵊州站点要填写联系地址
					document.getElementById("contactaddress").style.display = "block";
				}
				document.getElementById("contentArea").style.display = "block";
			}
		},
		fail: function(data) {}
	});
}

//提交时要用的参数
var token = "";
var deptunid = ""; //单位id
var legalman = ""; //法人代表
var serviceType = ""; //事项类型
var ss_orgcode = ""; //实施机构组织机构代码
var bljg = ""; //办理机构
var legalMancardid = ""; //法人代表sfz

var serviceid = "";
var vselectedindex;
var submitmobile = "";

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
//填充相关材料的数据
function fillMaterial() {
	var materialArray = material;
	example.items = [];
	for(var i = 0; i < materialArray.length; i++) {
		example.items.push({
			index: i + 1,
			name: materialArray[i].name,
			UNID: materialArray[i].material,
			necessity: dataArray[i].necessity
		});
		if(i == 0) {
			document.getElementById("parent").style.display = "block";
			document.getElementById("materialInfo").style.display = "block";
			document.getElementById("xiangguancailiao").style.display = "block";
		}

	}

}

//上传图片到服务器失败
function uploadImageFail(dd, imgsrc, index, i) {
	dd.innerHTML += "<div style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' > <img src='" + imgsrc + "' style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0; '/><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;border-width: 0px;'><img align='absmiddle' style='width: 20px;margin-top: -4px;' src='../source/images/uploadfail.png' />上传失败</div></div>";
}
////上传图片到服务器成功
//function uploadImageSuccess(obj, index, UNID, materialname) {
//	//将图片存到数组中，上传的时候用
//	var dic = {
//		"type": "附件上传",
//		"materialUNID": UNID,
//		"materialName": materialname,
//		"path": obj.path
//	};
//	filesArray.push(dic);
//}
//删除图片
function deleteImage(index1, cc, path) {
	//第1步：删除图片对应的HTML
	var aa = cc.parentElement;
	var photoindex = "photo" + index1;
	var dd = document.getElementById(photoindex);
	dd.removeChild(aa);
	//第2步：删除上传时需要的fileArray数组中的元素
	for(var i = 0; i < filesArray.length; i++) {
		if(path == filesArray[i].path) {
			for(var j = 0; j < filesArray.length; j++) {
				if(filesArray[j] == filesArray[i]) {
					filesArray.splice(j, 1);
					break;
				}
			}
		}
	}
	//第3步：请求删除图片接口
	var dates = {
		path: path
	};
	myRequest({
		url: overallInterface + 'ywzw/interface/deleteMaterial.do',
		data: dates,
		header: '',
		success: function(data) {},
		fail: function(data) {}
	});
}
var receivename = "";
var receivemobile = "";
var receiveaddress = "";
var postnum = "";
var isPost;
var postcode = "";
var detailAddress = "";
var provinceCode = "";
var provinceName = "";
var cityCode = "";
var cityName = "";
var regionCode = "";
var regionName = "";

var adressname;
var adressmobile;
var adressarea;

//提交草稿
function draftItem() {
	           var dic="";
							$('.classpds ').each(function() {
								 dic = $(this).text();
							filesArray.push(dic);
							})

	//留言正文
	var admsg = document.getElementById("advicecontent").value;
	var name;
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		name = document.getElementById("applyname").value;
		submitmobile = userInfo.mobile;
	} else { //法人
		name = document.getElementById("applyenterprise").value;
		submitmobile = document.getElementById("mobile").value;

	}

	var idcard = document.getElementById("idcard").value;
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人判空
		//先判空
		if(isManual) { //需要快递
			isPost = "Y";
			if(document.getElementById("parent1").style.display == "block") {
				//列表选择地址
				if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
					alert("您还未选择收件地址");
					return;
				}
			} else {
				//表单填写地址
				adressname = document.getElementById("addressname").value;
				adressmobile = document.getElementById("addressmobile").value;
				adressarea = document.getElementById("addressarea").value;
				postcode = document.getElementById("postcode").value;
				//先判空
				if(!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
					alert("请输入收件人");
					return;
				} else if(!(new RegExp("\\S+")).test(adressmobile)) {
					alert("请输入联系电话");
					return;
				} else if(!(checkPhone(adressmobile) || checkMobile(adressmobile))) {
					alert("请输入正确的联系电话");
					return;
				} else if(!(/^[1-9][0-9]{5}$/).test(postcode)) {
					mui.alert("请输入正确的邮政编码");
					return;
				} else if(!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
					alert("详细地址不少于5个字");
					return;
				}
				receivename = adressname;
				receivemobile = adressmobile;
				receiveaddress = adressarea;
				saveAddress();
			}
		} else {
			isPost = "N";
			receivename = "";
			receivemobile = "";
			receiveaddress = "";
			postcode = "";
			provinceCode = "";
			provinceName = "";
			cityCode = "";
			cityName = "";
			regionCode = "";
			regionName = "";
		}
	} else { //法人判空
		if(isManual) { //需要快递
			isPost = "Y";
			if(document.getElementById("parent1").style.display == "block") {
				//列表选择地址
				if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
					alert("您还未选择收件地址");
					return;
				}
			} else {
				//表单填写地址
				adressname = document.getElementById("addressname").value;
				adressmobile = document.getElementById("addressmobile").value;
				adressarea = document.getElementById("addressarea").value;
				postcode = document.getElementById("postcode").value;
				//先判空
				if(!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
					alert("请输入收件人");
					return;
				} else if(!(new RegExp("\\S+")).test(adressmobile)) {
					alert("请输入联系电话");
					return;
				} else if(!(checkPhone(mobile) || checkMobile(adressmobile))) {
					alert("请输入正确的联系电话");
					return;
				} else if(!(/^[1-9][0-9]{5}$/).test(postcode)) {
					mui.alert("请输入正确的邮政编码");
					return;
				} else if(!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
					alert("详细地址不少于5个字");
					return;
				}
				receivename = adressname;
				receivemobile = adressmobile;
				receiveaddress = adressarea;
				provinceCode = storage.provinceCode;
				provinceName = storage.province;
				cityCode = storage.cityCode;
				cityName = storage.city;
				regionCode = storage.countyCode;
				regionName = storage.county;
				saveAddress();
			}
		} else {
			isPost = "N";
			receivename = "";
			receivemobile = "";
			receiveaddress = "";
			postcode = "";
			provinceCode = "";
			provinceName = "";
			cityCode = "";
			cityName = "";
			regionCode = "";
			regionName = "";
		}
	}

	/*var haveSubmit = [];
	//判断是否有文件未上传
	for(var i = 0; i < material.length; i++) {
		for(var j = 0; j < filesArray.length; j++) {
			if(material[i].material == filesArray[j].materialUNID) {
				haveSubmit.push(material[i].material);
			}
		}
	}
	haveSubmit = unique(haveSubmit);*/
	if(document.getElementById("issure").checked == true) {} else {
		mui.alert("请遵守信用承诺!");
		return;
	}

	//开始提交
	var basicData = {
		"serviceid": serviceid, //申报的事项id
		"serviceCodeId": serviceCodeId, //权力事项基本码
		"servicename": itemname, //申报的事项名称
		"username": userInfo.username, //申报人姓名
		"mobile": userInfo.mobile, //申报人联系电话
		"idcard": userInfo.idnum, //申报人身份证号
		"idcard_type": "身份证", //证件类别
		"contactaddress": "", //申报人联系地址 
		"needPost": isPost, //是否快递  "Y":快递 "N":不快递
		"deptunid": deptunid, //单位id
		"legalman": document.getElementById("legalman").value, //法人代表
		"legalMancardid": document.getElementById("legalMancardid").value,
		"serviceType": serviceType, //事项类型
		"ss_orgcode": ss_orgcode, //实施机构组织机构代码
		"bljg": bljg, //办理机构
		"promiseday": cntime //承诺办结时间
	}

	var mail = {
		"receiveaddress": receiveaddress, //收件地址
		"receivemobile": receivemobile, //收件人手机
		"receivename": receivename, //收件人姓名
		"postcode": postcode, //邮政编码
		"provinceCode": provinceCode,
		"provinceName": provinceName,
		"cityCode": cityCode,
		"cityName": cityName,
		"regionCode": regionCode,
		"regionName": regionName
	}
	var prama = {
		"data": basicData,
		"files": filesArray,
		"mail": mail,
		"type": "0", //0 保存草稿  1提交
		"containertype": containerType, //0 微信 1 app
		"token": token,
		"siteid": vsiteid,
		"code": itemcode,
		"deptid": colid,
		"bdcl": vbdcl,
		"itemcodeid": itemcodeid,
		"userid": userInfo.userid, //申报人用户id
		"message": admsg,
		"validitykey": validitykey
	}
	var pramaData = {
		"infoStr": JSON.stringify(prama)
	}
	document.getElementById('loading').style.display = 'block';

	if((new RegExp("\\S+")).test(vbdcl)) {
		window.location.href = 'oderform.html?formid=' + vbdcl + "&validitykey=" + validitykey + "&siteid=" + vsiteid + "&prama=" + JSON.stringify(prama);
	} else {
		$("#draftbtn0").attr('disabled', true);
		$.ajax({
			type: "post",
			url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
			data: pramaData,
			dataType: 'json',
			success: function(data) {
				var obj = data;
				if(obj.result == true) {
					setTimeout(jump1, 1000);
				} else {
					alert(obj.message);
				}
			},
			error: function(data) {
				$("#draftbtn0").attr('disabled', false);
				document.getElementById("loading").style.display = "none";
				alert("草稿保存失败！");
			}
		});
	}
}

//提交办证接口
function submitItem() {
	//留言正文
	var admsg = document.getElementById("advicecontent").value;
	var submitusername;
	var submitidcard;
	var agentName = document.getElementById("agentName").value;
	var agentIdcard = document.getElementById("agentIdcard").value;
	var legalman = document.getElementById("legalman").value;
	var legalMancardid = document.getElementById("legalMancardid").value;
	var contactAddress = document.getElementById("contactAddress").value;
	var name;
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		name = document.getElementById("applyname").value;
		submitmobile = userInfo.mobile;
		submitusername = userInfo.username;
		submitidcard = userInfo.idnum;
	} else { //法人
		name = document.getElementById("applyenterprise").value;
		submitusername = userInfo.CompanyName;
		submitidcard = document.getElementById("enterprisecode").value;
		submitmobile = document.getElementById("mobile").value;
		if(submitmobile.indexOf("*") != -1) {
			submitmobile = userInfo.attnPhone;
		}
		if(agentName.indexOf("*") != -1) {
			agentName = userInfo.attnName;
		}
		if(agentIdcard.indexOf("*") != -1) {
			agentIdcard = userInfo.attnIDNo;
		}
		if(legalman.indexOf("*") != -1) {
			legalman = userInfo.CompanyLegRep;
		}

	}

	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人判空
		//先判空
		if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
			mui.alert("请输入申报人姓名");
			return;
		} else {
			if(isManual) { //需要快递
				isPost = "Y";
				if(document.getElementById("parent1").style.display == "block") {
					//列表选择地址
					if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
						mui.alert("您还未选择收件地址");
						return;
					}
				} else {
					//表单填写地址
					adressname = document.getElementById("addressname").value;
					adressmobile = document.getElementById("addressmobile").value;
					adressarea = document.getElementById("addressarea").value;
					postcode = document.getElementById("postcode").value;
					//先判空
					if(!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
						mui.alert("请输入收件人");
						return;
					} else if(!(new RegExp("\\S+")).test(adressmobile)) {
						mui.alert("请输入联系电话");
						return;
					} else if(!(checkPhone(adressmobile) || checkMobile(adressmobile))) {
						mui.alert("请输入正确的联系电话");
						return;
					} else if(!(/^[1-9][0-9]{5}$/).test(postcode)) {
						mui.mui.alert("请输入正确的邮政编码");
						return;
					} else if(!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
						mui.alert("详细地址不少于5个字");
						return;
					}
					receivename = adressname;
					receivemobile = adressmobile;
					receiveaddress = adressarea;
					provinceCode = storage.provinceCode;
					provinceName = storage.province;
					cityCode = storage.cityCode;
					cityName = storage.city;
					regionCode = storage.countyCode;
					regionName = storage.county;
					saveAddress();
				}

			} else {
				isPost = "N";
				receivename = "";
				receivemobile = "";
				receiveaddress = "";
				postcode = "";
				provinceCode = "";
				provinceName = "";
				cityCode = "";
				cityName = "";
				regionCode = "";
				regionName = "";
			}
		}
	} else { //法人判空
		var regs = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		//先判空
		if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
			mui.alert("请输入申报单位");
			return;
		} else if(!(new RegExp("\\S+")).test(document.getElementById("mobile").value)) {
			mui.alert("请输入联系电话");
			return;
		} else if(!(checkPhone(submitmobile) || checkMobile(submitmobile))) {
			mui.alert("请输入正确的联系电话");
			return;
		} else if(!(new RegExp("\\S+")).test(legalman)) { //判断字符串是否为空或都是空格
			mui.alert("请输入法人代表");
			return;
		} else if(!(new RegExp("\\S+")).test(legalMancardid)) { //判断字符串是否为空或都是空格
			mui.alert("请输入法人代表身份证号");
			return;
		} else if(regs.test(legalMancardid) == false) {
			mui.alert("身份证输入不合法");
			return;
		} else {
			if(isManual) { //需要快递
				isPost = "Y";
				if(document.getElementById("parent1").style.display == "block") {
					//列表选择地址
					if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
						mui.alert("您还未选择收件地址");
						return;
					}
				} else {
					//表单填写地址
					adressname = document.getElementById("addressname").value;
					adressmobile = document.getElementById("addressmobile").value;
					adressarea = document.getElementById("addressarea").value;
					postcode = document.getElementById("postcode").value;
					//先判空
					if(!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
						mui.alert("请输入收件人");
						return;
					} else if(!(new RegExp("\\S+")).test(adressmobile)) {
						mui.alert("请输入联系电话");
						return;
					} else if(!(checkPhone(mobile) || checkMobile(adressmobile))) {
						mui.alert("请输入正确的联系电话");
						return;
					} else if(!(/^[1-9][0-9]{5}$/).test(postcode)) {
						mui.alert("请输入正确的邮政编码");
						return;
					} else if(!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
						mui.alert("详细地址不少于5个字");
						return;
					}
					receivename = adressname;
					receivemobile = adressmobile;
					receiveaddress = adressarea;
					saveAddress();
				}

			} else {
				isPost = "N";
				receivename = "";
				receivemobile = "";
				receiveaddress = "";
				postcode = "";
				provinceCode = "";
				provinceName = "";
				cityCode = "";
				cityName = "";
				regionCode = "";
				regionName = "";
			}
		}
	}

	//判断是否空
	if((vsiteid == 59 || vsiteid == 57 || vsiteid == 56 || vsiteid == 55) && contactAddress == "") {
		mui.alert("请输入联系地址");
		return;
	}
	if(userInfo.appConEntName != "" && typeof(userInfo.appConEntName)!= "undefined") {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!(new RegExp("\\S+")).test(agentName)) { //判断字符串是否为空或都是空格
			mui.alert("请输入代理人姓名");
			return;
		} else if(!(new RegExp("\\S+")).test(agentIdcard)) {
			mui.alert("请输入代理人身份证");
			return;
		} else if(reg.test(agentIdcard) === false) {
			mui.alert("身份证输入不合法");
			return;
		}
	}
    var dic="";
							$('.classpds ').each(function() {
								 dic = $(this).text();
							filesArray.push(dic);
							})

	
	//判断是否有文件未上传
	var haveSubmit = [];
	var is=0;
	for(var i = 0; i < material.length; i++) {
		if(material[i].necessity==1){
			is++;
		}
		for(var j = 0; j < filesArray.length; j++) {
			if(material[i].material == filesArray[j].materialUNID && material[i].necessity==1) {
				haveSubmit.push(material[i].material);
			}
		}
	}
	haveSubmit = unique(haveSubmit);
	if(haveSubmit.length < is) { //有材料未上传的情况
		mui.alert("您还有材料未上传!");
		return;
	}

	if(document.getElementById("issure").checked == true) {
	} else {
		mui.alert("请遵守信用承诺!")
		return;
	}
	document.getElementById('loading').style.display = 'block';
	//开始提交
	var basicData = {
		"serviceid": serviceid, //申报的事项id
		"serviceCodeId": serviceCodeId, //权力事项基本码
		"servicename": itemname, //申报的事项名称
		"username": submitusername, //申报人姓名
		"mobile": submitmobile, //申报人联系电话
		"idcard": submitidcard, //申报人身份证号
		"idcard_type": idcard_type, //证件类别
		"contactaddress": "", //申报人联系地址 
		"needPost": isPost, //是否快递  "Y":快递 "N":不快递
		"deptunid": deptunid, //单位id
		"legalman": legalman, //法人代表
		"legalMancardid": legalMancardid,
		"serviceType": serviceType, //事项类型
		"ss_orgcode": ss_orgcode, //实施机构组织机构代码
		"bljg": bljg, //办理机构
		"promiseday": cntime, //承诺办结时间
		"agentName": agentName,
		"agentIdcard": agentIdcard,
		"address": contactAddress
	}

	var mail = {
		"receiveaddress": receiveaddress, //收件地址
		"receivemobile": receivemobile, //收件人手机
		"receivename": receivename, //收件人姓名
		"postcode": postcode, //邮政编码
		"provinceCode": provinceCode,
		"provinceName": provinceName,
		"cityCode": cityCode,
		"cityName": cityName,
		"regionCode": regionCode,
		"regionName": regionName
	}
	var prama = {
		"data": basicData,
		"files": filesArray,
		"mail": mail,
		"type": "1", //0 保存草稿  1提交
		"containertype": containerType, //0 微信 1 app
		"token": token,
		"siteid": vsiteid,
		"message": admsg,
		"code": itemcode,
		"deptid": colid,
		"bdcl": vbdcl,
		"itemcodeid": itemcodeid,
		"userid": userInfo.userid, //申报人用户id
		"validitykey": validitykey
	}
	var pramaData = {
		"infoStr": JSON.stringify(prama)
	}

	if((new RegExp("\\S+")).test(vbdcl)) {
		window.sessionStorage.prama = JSON.stringify(prama);
		window.location.href = 'oderform.html?formid=' + vbdcl + "&cityname=" + cityName1 + "&validitykey=" + validitykey + "&siteid=" + vsiteid;
	} else {
		$("#submitbtn0").attr('disabled', true);
		$.ajax({
			type: "post", // overallInterface + ywxw/interface
			url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
			data: pramaData,
			dataType: 'json',
			success: function(data) {
				var obj = data;
				if(obj.result == true) {
					setTimeout(jump, 1000);
				} else {
					alert(obj.message);
				}
			},
			error: function(data) {
				$("#submitbtn0").attr('disabled', false);
				document.getElementById("loading").style.display = "none";
				alert("提交失败");
				
			}
		});
	}
}

function jump() {
	
		window.location.href = "odersuccess.html?type=02&siteid=" + vsiteid + "&cityname=" + cityName1;

}

function jump1() {

		window.location.href = "odersuccess.html?type=03&siteid=" + vsiteid + "&cityname=" + cityName1;

}

var parent; //0-无上级区域编码，即省、直辖市上级区域编码
var level; //0-中国 1-省、直辖市、行政区 2-地市 3-区、县

//地区编码查询
function queryRegion(area, type) {
	var date;
	if(type == 0) {
		//省
		parent = 0;
		level = 1;
	} else if(type == 1) {
		//市
		parent = storage.provinceCode;
		level = 2;
	} else if(type == 2) {
		//区
		parent = storage.cityCode;
		level = 3;
	}
	date = {
		parent: parent,
		level: level
	}
	var requesturl = overallInterface + "ywzw/interface/region.do";
	myRequest({
		data: date,
		url: requesturl,
		header: '',
		success: function(data) { //成功
			var obj = data;
			if(obj.state == 200) {
				var content = obj.content;
				var parent = content.parent;
				var regions = content.regions;
				if(regions.length > 0) { //有数据
					for(var i = 0; i < regions.length; i++) {
						var id = regions[i].id;
						var name = regions[i].name;
						if(name == area) {
							if(type == 0) {
								storage.provinceCode = id;
								queryRegion(storage.city, 1);
							} else if(type == 1) {
								storage.cityCode = id;
								queryRegion(storage.county, 2);
							} else if(type == 2) {
								storage.countyCode = id;
							}
						}
					}
				}
			} else {}
		},
		fail: function(data) { //失败
		}
	});
}

function saveAddress() {
	//提交地址
	var date;
	var addressInfo;
	var requesturl;
	//	date = {
	//		siteid: vsiteid,
	//		userid: userInfo.userid,
	//		postName: adressname,
	//		postPhone: adressmobile,
	//		postAddress: adressarea
	//	}
	addressInfo = {
		"name": adressname,
		"phone": adressmobile,
		"provinceCode": window.localStorage.provinceCode,
		"provinceName": window.localStorage.province,
		"cityCode": window.localStorage.cityCode,
		"cityName": window.localStorage.city,
		"regionCode": window.localStorage.countyCode,
		"regionName": window.localStorage.county,
		"street": "",
		"address": adressarea,
		"postcode": postcode,
		"isDefault": 0, //是否默认地址：0-否 1-是
		"description": ""
	}
	var vuserType; //1-个人用户;2-法人用户
	if(foruser == "puser") { //个人
		vuserType = 1;
	} else {
		vuserType = 2;
	}

	date = {
		userType: vuserType,
		userId: userInfo.userid,
		addressInfo: JSON.stringify(addressInfo)
	}
	requesturl = overallInterface + "ywzw/interface/addAddr.do";

	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) { //成功
			var obj = data;
			if(obj.state == 200) {
				//				mui.alert("保存成功");
			} else {
				mui.alert(obj.message);
			}
		},
		fail: function(data) { //失败
			document.getElementById('loading').style.display = 'none';
			//			alert("保存失败");

		}
	});

}

//验证手机号是否合法
function checkPhone(str) {
	var re = /^1\d{10}$/
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}
//验证电话号码是否合法
function checkMobile(str) {
	var re = /^0\d{2,3}-?\d{7,8}$/;
	if(re.test(str)) {
		return true;
	} else {
		return false;
	}
}
//验证身份证是否合法
var aCity = {
	11: "北京",
	12: "天津",
	13: "河北",
	14: "山西",
	15: "内蒙古",
	21: "辽宁",
	22: "吉林",
	23: "黑龙江",
	31: "上海",
	32: "江苏",
	33: "浙江",
	34: "安徽",
	35: "福建",
	36: "江西",
	37: "山东",
	41: "河南",
	42: "湖北",
	43: "湖南",
	44: "广东",
	45: "广西",
	46: "海南",
	50: "重庆",
	51: "四川",
	52: "贵州",
	53: "云南",
	54: "西藏",
	61: "陕西",
	62: "甘肃",
	63: "青海",
	64: "宁夏",
	65: "新疆",
	71: "台湾",
	81: "香港",
	82: "澳门",
	91: "国外"
};

function isCardID(sId) {
	var iSum = 0;
	var info = "";
	if(!/^\d{17}(\d|x)$/i.test(sId)) return "您输入的身份证长度或格式错误";
	sId = sId.replace(/x$/i, "a");
	if(aCity[parseInt(sId.substr(0, 2))] == null) return "您的身份证地区非法";
	sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if(sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
	for(var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	//	if(iSum % 11 != 1) return "您输入的身份证号非法";
	//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
	return "合法";
}
//数组去除重复元素
function unique(arr) {
	// 遍历arr，把元素分别放入tmp数组(不存在才放)
	var tmp = new Array();
	for(var i in arr) {
		//该元素在tmp内部不存在才允许追加
		if(tmp.indexOf(arr[i]) == -1) {
			tmp.push(arr[i]);
		}
	}
	return tmp;
}

//申报材料
function requestWorkMaterial(itemcode, name, webid) {
	//alert(itemcode);

	var date = {
		itemcode: itemcode,
		webid: webid,
		name: name
	}
	//myRequest({

	$.ajax({
		//url: zjzwurl + "interface/getBsznCailiaoList.do",
		//url: "http://www.zjzwfw.gov.cn/zjzw/app/bmfw/getBsznAppCailiaoList.do",
		url: "https://app.zjzwfw.gov.cn/open/interfaces/shenbaocailiao.do",
		data: date,
		type: 'post',
		dataType: 'json',
		success: function(data) {
			//	data = JSON.parse(data);
			console.log(data)
			document.getElementById('loading').style.display = 'none';
			var list = '';
			if(!(new RegExp("\\S+")).test(data) || data == null) {
				return;
			} else {
				list = data;
			}
			if((new RegExp("\\S+")).test(list)) { //有数据
				dataArray = [];
				var vcai = list.cailiao;
				//判断是否为数组
				if(isArray(vcai)) {
					dataArray = vcai;
					material = dataArray;
				} else {
//					document.getElementById('parent').innerHTML = "<div style='padding: 15px;font-size:18px;color: #222222;'>" + vcai + "</div>";
					return;
				}
			} else { //无数据
				dataArray = [];
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i + 1,
						name: dataArray[i].name,
						UNID: dataArray[i].material,
						emptytable: dataArray[i].EMPTYTABLE,
						exampletable: dataArray[i].EXAMPLETABLE,
						necessity: dataArray[i].necessity
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			}
		},
		error: function(data) {
			
			document.getElementById('loading').style.display = 'none';
		}
	});

	//判断是否为数组
	function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
}

function word(table) {
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	var isAndroid = ua.indexOf('android') != -1;
	if(isWeixin && isAndroid) {
		sessionStorage.tabledoc = table;
		window.location.href = "tabledoc.html";
	} else {
		window.location.href = table;
	}
}

//因为列表样式调整，可以从列表直接点进申报页，因此要在申报页请求办事正文以拿到材料
function requestMaterial() {
	var date = {
		itemcode: itemcode
	}
	var requesturl;
	requesturl = overallInterface + "ywzw/interface/getOnlineHandleArticle.do";
	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) { //请求成功
			document.getElementById('loading').style.display = 'none';
			var obj = data;

			localStorage.setItem("materialArray", JSON.stringify(obj.material));
			material = obj.material;
			//填充材料
			fillMaterial();

			var basicinfo = obj.basicinfo;
			bljg = basicinfo.bljg;
		
			deptunid = basicinfo.deptunid;
			serviceType = basicinfo.serviceType;
			ss_orgcode = basicinfo.ss_orgcode;
			serviceid = basicinfo.id;
		},
		fail: function(data) { //请求失败
			document.getElementById('loading').style.display = 'none';
		}
	});
}

//请求收货地址
var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
})

function requestAddressList() {
	var date;
	date = {
		userId: userInfo.userid
	}
	myRequest({
		url: overallInterface + "ywzw/interface/addrList.do",
		data: date,
		header: '',
		success: function(data) { //成功
			var obj = data;
		
			if(obj == null) {
				//				document.getElementById("badmessage").style.display = "block";
				return;
			}
			if(obj.state == 200) {
				var content = obj.content;
				if(content == null) {
					return;
				}
				if(content.length > 0) { //有数据
					example1.items1 = [];
					for(var i = 0; i < content.length; i++) {
						var usernamebefore = content[i].name;
						var usernameshow = "";
						var length = usernamebefore.length - 1;
						if(length == 1) {
							usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "*");
						} else if(length == 2) {
							usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "**");
						} else {
							usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "***");
						}
						var mobilebefore = content[i].phone;
						var mobileshow = mobilebefore.replace(mobilebefore.substr(3, 4), "****");

						example1.items1.push({
							index: i,
							namebefore: usernamebefore,
							name: usernameshow,
							mobilebefore: mobilebefore,
							mobile: mobileshow,
							provinceCode: content[i].provinceCode,
							provinceName: content[i].provinceName,
							cityCode: content[i].cityCode,
							cityName: content[i].cityName,
							regionCode: content[i].regionCode,
							regionName: content[i].regionName,
							street: content[i].street,
							address: content[i].address,
							postcode: content[i].postcode,
							isDefault: content[i].isDefault,
							description: content[i].description
						});
						if(i == 0) {
							document.getElementById("parent1").style.display = "block";
						}
					}
					document.getElementById("nocontent").style.display = "none";
					setTimeout(setDefault, 10);
				} else {
					document.getElementById("nocontent").style.display = "block";
				}
			}
		},
		fail: function(data) { //失败
			alert("加载失败" + data);
			document.getElementById("nocontent").style.display = "block";
		}
	});
}

//地址列表渲染完成后将第一个地址设为默认的选中状态
function setDefault() {
	document.getElementById("img0").style.display = "block";
	//	if(isPost == "Y") {
	receivename = document.getElementById("name0").innerHTML;
	receivemobile = document.getElementById("mobile0").innerHTML;
	receiveaddress = document.getElementById("address0").innerHTML;

	postcode = document.getElementById("postcode0").innerHTML;
	detailAddress = document.getElementById("detailaddress0").innerHTML;
	provinceCode = document.getElementById("provinceCode0").innerHTML;
	provinceName = document.getElementById("provinceName0").innerHTML;
	cityCode = document.getElementById("cityCode0").innerHTML;
	cityName = document.getElementById("cityName0").innerHTML;
	regionCode = document.getElementById("regionCode0").innerHTML;
	regionName = document.getElementById("regionName0").innerHTML;
	//	}

}

function addressSelected(index) {
	var imgs = document.getElementsByClassName("imgs");
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		img.style.display = "none";
	}
	var id = "img" + index;
	document.getElementById(id).style.display = "block";

	var nameid = "name" + index;
	var mobileid = "mobile" + index;
	var addressid = "address" + index;
	receivename = document.getElementById(nameid).innerHTML;
	receivemobile = document.getElementById(mobileid).innerText;
	receiveaddress = document.getElementById(addressid).innerHTML;

	var postcodeid = "postcode" + index;
	var detailaddressid = "detailaddress" + index;
	var provinceCodeid = "provinceCode" + index;
	var provinceNameid = "provinceName" + index;
	var cityCodeid = "cityCode" + index;
	var cityNameid = "cityName" + index;
	var regionCodeid = "regionCode" + index;
	var regionNameid = "regionName" + index;

	postcode = document.getElementById(postcodeid).innerHTML;
	detailAddress = document.getElementById(detailaddressid).innerHTML;
	provinceCode = document.getElementById(provinceCodeid).innerHTML;
	provinceName = document.getElementById(provinceNameid).innerHTML;
	cityCode = document.getElementById(cityCodeid).innerHTML;
	cityName = document.getElementById(cityNameid).innerHTML;
	regionCode = document.getElementById(regionCodeid).innerHTML;
	regionName = document.getElementById(regionNameid).innerHTML;
}

var example3 = new Vue({
	el: '#licenselistul',
	data: {
		licenselist: []
	}
})
//证照列表*********
function getLicenseList(arg0, arg1, arg2) {
	if(vsiteid == "70"||vsiteid == 70) {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		vselectedindex = arg0;
		vmaterialUNID = arg1;
		vmaterialName = arg2;
		var comple = document.getElementById('done');
		comple.innerHTML = "完成";
		comple.classList.add("mui-disabled");
		document.getElementById('loading').style.display = 'block';
		document.getElementById('headtop').style.display = 'block';
		document.getElementById('pullrefresh').style.display = 'none';
		document.getElementById('contentArea').style.display = 'none';
		document.getElementById('sureBtn').style.display = 'none';
		document.getElementById("licenselist").style.display = "block";
		//	onefw(1);
		
			document.getElementById('btn-cancel').style.display = 'none';
		document.getElementById('loading').style.display = 'none';

		example3.licenselist = [{
			name: "居民身份证",
			code: "330781",
			type: "1"
		}, {
			name: "居民户口簿",
			code: "330781",
			type: "2"
		}, {
			name: "结婚登记证明",
			code: "330781",
			type: "3"
		}]
	} else {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
		vselectedindex = arg0;
		vmaterialUNID = arg1;
		vmaterialName = arg2;
		var comple = document.getElementById('done');
		comple.innerHTML = "完成";
		comple.classList.add("mui-disabled");
		document.getElementById('loading').style.display = 'block';
		document.getElementById('headtop').style.display = 'block';
		document.getElementById('pullrefresh').style.display = 'none';
		document.getElementById('contentArea').style.display = 'none';
		document.getElementById('sureBtn').style.display = 'none';
		document.getElementById("licenselist").style.display = "block";

		//根据站点选择不同证照库
		if(vsiteid == 64 || vsiteid == 67) {
			var date = {
				areaCode: "330700",
				deptNo: "790976269"
			}
			var requesturl;
			requesturl = overallInterface + "ywzw/interface/licenseList.do";
			setTimeout(function() {
				myRequest({
					url: requesturl,
					data: date,
					header: '',
					success: function(data) { //请求成功
						document.getElementById('loading').style.display = 'none';
						example3.licenselist = [];
						for(var i = 0; i < data.length; i++) {
							example3.licenselist.push({
								name: data[i].name,
								code: data[i].code,
								type: 1
							});
						}
					},
					fail: function(data) { //请求失败
						document.getElementById('loading').style.display = 'none';
					}
				});

			}, 100);
		} else {
			var requesturl;
			requesturl = overallInterface + "licence/common/licenceList.do";
			myRequest({
				url: requesturl,
				data: '',
				header: '',
				success: function(data) { //请求成功
					if(data.msgcode == 0) {
						document.getElementById('loading').style.display = 'none';
						document.getElementById("badmessage").style.display = "block";
					} else {
						var result = data.result;
						example3.licenselist = [];
						for(var i = 0; i < result.length; i++) {
							example3.licenselist.push({
								name: result[i].name,
								code: result[i].code,
								type: 0
							});
						};
						document.getElementById('loading').style.display = 'none';
					}

				},
				fail: function(data) { //请求失败
					document.getElementById('loading').style.display = 'none';
					document.getElementById("badmessage").style.display = "block";
				}
			});
		}
	}
}
var example2 = new Vue({
	el: '#parent2',
	data: {
		items2: []
	}
})
  var Threename ="";
	var Threecardid="";
	
//获取证照
function getlicense(code, type) {
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined"){
		    Threename =userInfo.username;
		    Threecardid=userInfo.idnum;
	}else{
		    Threename =userInfo.attnName;
	        Threecardid=userInfo.attnIDNo;
	}
	
	
	
	if(code == "330781" && type == "1") {
		Three();
		document.getElementById('loading').style.display = 'block';

	} else if(code == "330781" && type == "2") {
		Three1();
		document.getElementById('loading').style.display = 'block';

	} else if(code == "330781" && type == "3") {
		Three2();
		document.getElementById('loading').style.display = 'block';

	} else {

		document.getElementById("licenselist").style.display = "none";
		document.getElementById('loading').style.display = 'block';
		if(type == 0) {
			var data = {
				code: itemcode,
				name: userInfo.username,
				idcard: card
			}
			requesturl = overallInterface + "ywzw/interface/idcardLicence.do";
		} else {
			var data = {
				code: code,
				licenseNo: card
			}
			requesturl = overallInterface + "ywzw/interface/getlicense.do";
		}
		var heights1 = '';
		var requesturl;
		var innerhtml = '';

		$.ajax({
			type: "post",
			url: requesturl,
			data: data,
			dataType: 'json',
			success: function(data) { //请求成功
				example2.items2 = [];
				if(data != null && data != "") {
					example2.items2.push({
						height: heights * 2,
						index: 0,
						imageurl: overallInterface + data.realpath,
						showurl: overallInterface + data.showpath
					});
					document.getElementById('loading').style.display = 'none';
					document.getElementById('pullrefresh').style.display = 'block';
				} else {
					document.getElementById('loading').style.display = 'none';
					document.getElementById("badmessage").style.display = "block";
				}
			},
			error: function(data) { //请求失败
				document.getElementById('loading').style.display = 'none';
				document.getElementById("badmessage").style.display = "block";
			}
		});

	}
}
 


function Three1() { /*省公安厅居民户口簿（家庭）*/

	var data3 = {
		powerMatters: serviceCodeId,
		subPowerMatters: serviceCodeId,
		accesscardId: Threecardid,
		searchusername: Threename,
		additional: '0',
		searchdeptname: '县公安局'
	}
	$.ajax({
		url: overallInterface + "ywxw/interface/HebRdm7ddA4X21w2.do",
		data: data3,
		success: function(data) {
			console.log("data********"+data)
			if(data== "erorr") {
				alert("未获得证照")
				document.getElementById('loading').style.display = 'none';
			} else {
				data = JSON.parse(data)
				var info1 = document.getElementById("pdfxs1");
				var inner1 = "<br/><p style='display:none' id='pdfurl2'>" + data.url + "</p><div style=\"margin:-15px auto auto auto;\" id=\"pdfContent1\"><span id=\"pdf2\" style=\"margin-left:25%;\" onclick=\"pdfContent1('" + data.downurl + "','"+data.url+"')\">上传</span><span id=\"pdfq2\" style=\"margin-left:120px;\"onclick=\"pdfq2()\">取消</span><div class=\"pdfContent1\"></div></div>";
				info1.innerHTML = inner1;
				var pdfView = new Pdfh5('.pdfContent1', {
					pdfurl: data.downurl
				});
				document.getElementById('loading').style.display = 'none';

			}
		},
		fail: function(e) {
			document.getElementById('loading').style.display = 'none';
		}

	});
}

function Three2(code3) { /*结婚登记证明*/
	
	var data3 = {
		birthday: getBirthdayByID(Threecardid),
		powerMatters: serviceCodeId,
		subPowerMatters: serviceCodeId,
		accesscardId: Threecardid,
		searchusername: Threename,
		additional: '0',
		searchdeptname: '县公安局',
		sex: getSexByID(Threecardid),
	}
	$.ajax({
		url: overallInterface + "ywxw/interface/9NTbx9dQbia4Xa12.do",
		data: data3,
		success: function(data) {
			if(data == "erorr") {
				alert("未获得证照")
				document.getElementById('loading').style.display = 'none';
			} else {
				data = JSON.parse(data)

				var info2 = document.getElementById("pdfxs2");
				var inner2 = "<br/><p style='display:none' id='pdfurl3'>" + data.url + "</p><div style=\"margin:-15px auto auto auto;\" id=\"pdfContent2\"><span id=\"pdf3\" style=\"margin-left:25%;\"onclick=\"pdfContent2('" + data.downurl + "','"+data.url+"')\">上传</span><span id=\"pdfq3\" style=\"margin-left:120px;\"onclick=\"pdfq3()\">取消</span><div class=\"pdfContent2\"></div></div>";
				info2.innerHTML = inner2;
				var pdfView = new Pdfh5('.pdfContent2', {
					pdfurl: data.downurl

				});
				document.getElementById('loading').style.display = 'none';
			}
		},
		fail: function(e) {
			document.getElementById('loading').style.display = 'none';

		}

	});
}

function Three() { /*省公安厅居民身份证（新）*/

var data3 = {
		powerMatters: "000",
		subPowerMatters: "000",
		accesscardId: Threecardid,
		searchusername:Threename,
		additional: '0',
		searchdeptname: '县公安局'
	}
	$.ajax({
		url: overallInterface + "ywxw/interface/bn2Kdk59aC5524ic.do",
		data: data3,
		success: function(data) {
			console.log(data)
			if(data == "erorr") {
				alert("未获得证照")
				document.getElementById('loading').style.display = 'none';
			} else {
				data = JSON.parse(data)
				var info = document.getElementById("pdfxs");
				document.getElementById('loading').style.display = 'none';
				var inner = "<br/><p style='display:none' id='pdfurl1'>" + data.url + "</p><div style=\"margin:-15px auto auto auto;\" id=\"pdfContent\"><span id=\"pdf1\" style=\"margin-left:25%;\" onclick=\"pdfContent('" + data.downurl + "','"+data.url+"')\">上传</span><span id=\"pdfq1\" style=\"margin-left:120px;\" onclick=\"pdfq1()\">取消</span><div class=\"pdfContent\"></div></div>";
				info.innerHTML = inner;
				var pdfView = new Pdfh5('.pdfContent', {
					pdfurl: data.downurl
				});
				document.getElementById('loading').style.display = 'none';
			}
		},
		fail: function(e) {
			document.getElementById('loading').style.display = 'none';
		}

	});
}

function pdfContent(downurl,url) {
	console.log("vselectedindex=" + vselectedindex);
	var photoid = "photo" + vselectedindex;
	var dd = document.getElementById(photoid);
	document.getElementById('pdf1').style.background = "#338dff";
	var text={
	"type": "电子证照库",
	"materialUNID":vmaterialUNID,
	"materialName":vmaterialName,
	"path":url
}
	dd.innerHTML +="<p style=\"display:none\" class='classpds'>"+JSON.stringify(text)+"</p>"+"<div id=\"pdfxs1" + vselectedindex + "\" style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><div class='pdfCont" + vselectedindex + "'  style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;'></div><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + vselectedindex + "',this,'" + url + "','" + vmaterialUNID + "')\">删除</div></div>";
	var pdfView = new Pdfh5('.pdfCont' + vselectedindex, {
		pdfurl: '' + downurl + ''
	});

}

function pdfContent1(downurl,url) {
	console.log("vselectedindex=" + vselectedindex);
	var photoid = "photo" + vselectedindex;
	var dd = document.getElementById(photoid);
	document.getElementById('pdf2').style.background = "#338dff";
var text={
	"type": "电子证照库",
	"materialUNID":vmaterialUNID,
	"materialName":vmaterialName,
	"path":url
}
	dd.innerHTML += "<p style='display:none' class='classpds'>"+JSON.stringify(text)+"</p>"+"<div id=\"pdfxs2" + vselectedindex + "\" style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><div class='pdfConte" + vselectedindex + "'  style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;'></div><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + vselectedindex + "',this,'"+url+"','" + vmaterialUNID + "')\">删除</div></div>";
	var pdfView1 = new Pdfh5('.pdfConte' + vselectedindex, {
		pdfurl: '' + downurl + ''
	});
									
}

function pdfContent2(downurl,url) {
	var photoid = "photo" + vselectedindex;
	var dd = document.getElementById(photoid);
	document.getElementById('pdf3').style.background = "#338dff";
var text={
	"type": "电子证照库",
	"materialUNID":vmaterialUNID,
	"materialName":vmaterialName,
	"path":url
}
	dd.innerHTML += "<p style='display:none' class='classpds'>"+JSON.stringify(text)+"</p>"+"<div  id=\"pdfxs3" + vselectedindex + "\"style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><div class='pdfConten" + vselectedindex + "'  style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0;' ></div><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + vselectedindex + "',this,'"+url+"','" + vmaterialUNID + "')\">删除</div></div>";
	var pdfView2 = new Pdfh5('.pdfConten' + vselectedindex, {
		pdfurl: '' + downurl + ''
	});
}

function pdfq1() {
	var photoid1 = "pdfxs1" + vselectedindex;
	$("#" + photoid1 + "").remove();
	document.getElementById('pdf1').style.background = "";

}

function pdfq2() {
	var photoid2 = "pdfxs2" + vselectedindex;
	$("#" + photoid2 + "").remove();
	document.getElementById('pdf2').style.background = "";

}

function pdfq3() {
	var photoid3 = "pdfxs3" + vselectedindex;
	$("#" + photoid3 + "").remove();
	document.getElementById('pdf3').style.background = "";

}

 function getBirthdayByID(id){
 //	alert(id)
	
    var birthday;
if(id==undefined||id==null||id==""||id=="null"||id=="undefined"){
		
		 return "1900-01-01";
	}
    if(id.length == 15 ){
        birthday = id.charAt(6)+id.charAt(7);
        if(parseInt(birthday)<10){
            birthday = '20'+birthday;
        }
        else{
            birthday = '19'+birthday;
        }
        birthday=birthday+'-'+id.charAt(8)+id.charAt(9)+'-'+id.charAt(10)+id.charAt(11);
    }
    else if(id.length ==18 ){
        birthday=id.charAt(6)+id.charAt(7)+id.charAt(8)+id.charAt(9)+'-'+id.charAt(10)+id.charAt(11)+'-'+id.charAt(12)+id.charAt(13);
    }
    return birthday;
};
/**
 * 通过身份证获取性别
 * @param id 身份证号码
 * @returns 0 女 1 男
 */
function getSexByID(id){
    var sex;
if(id==undefined||id==null||id==""||id=="null"||id=="undefined"){
		
		 return "M";
	}
	
    if(id.length == 15 ){
        if(parseInt(id.charAt(14)/2)*2!=id.charAt(14)){
            sex="M";
        }
        else{
            sex="F";
        }
    }
    else if(id.length ==18 ){
        if(parseInt(id.charAt(16)/2)*2!=id.charAt(16)){
            sex="M";
        }
        else{
            sex="F";
        }
    }
    return sex;
};
