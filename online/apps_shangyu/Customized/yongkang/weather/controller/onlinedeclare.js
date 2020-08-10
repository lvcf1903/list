//var jiajson = "{\"code\":0,\"path\":\"D:\\\\phpstudy\\\\WWW\\\\Uploads\\\\Attach\\\\2016-11-10\\\\1478742120735433.png\"}";
//提交时要用的参数
var token = "";
var deptunid = ""; //单位id
var legalman = ""; //法人代表
var serviceType = ""; //事项类型
var ss_orgcode = ""; //实施机构组织机构代码
var bljg = ""; //办理机构

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

//提交办证接口
function submitItem() {
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
		if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
			alert("请输入申报人姓名");
			return;
		} else {
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
		}
	} else { //法人判空
		//先判空
		if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
			alert("请输入申报单位");
			return;
		} else if(!(new RegExp("\\S+")).test(document.getElementById("mobile").value)) {
			alert("请输入联系电话");
			return;
		} else if(!(checkPhone(document.getElementById("mobile").value) || checkMobile(document.getElementById("mobile").value))) {
			alert("请输入正确的联系电话");
			return;
		} else {
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
	}

	//判断是否空
	var agentName = document.getElementById("agentName").value;
	var agentIdcard = document.getElementById("agentIdcard").value;
	if(foruser == "2" || foruser == "3" || foruser == "6") {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(!(new RegExp("\\S+")).test(agentName)) { //判断字符串是否为空或都是空格
			alert("请输入代理人姓名");
			return;
		} else if(!(new RegExp("\\S+")).test(agentIdcard)) {
			alert("请输入代理人身份证");
			return;
		} else if(reg.test(agentIdcard) === false) {
			alert("身份证输入不合法");
			return;
		}
	}

	var haveSubmit = [];
	//判断是否有文件未上传
	var flag;
	$('.necessity').each(function() {
		if($(this).siblings('.photos').html().length <= 0) {
			alert("您还有材料未上传!");
			flag = true;
			return false;
		}
	})
	if(flag) {
		return;
	}

	document.getElementById('loading').style.display = 'block';
	//开始提交
	var basicData = {
		"serviceid": serviceid, //申报的事项id
		"servicename": itemname, //申报的事项名称
		"username": userInfo.username, //申报人姓名
		"mobile": userInfo.mobile, //申报人联系电话
		"idcard": userInfo.idnum, //申报人身份证号
		"idcard_type": "身份证", //证件类别
		"contactaddress": "", //申报人联系地址 
		"needPost": isPost, //是否快递  "Y":快递 "N":不快递
		"deptunid": deptunid, //单位id
		"legalman": document.getElementById("legalman").value, //法人代表
		"serviceType": serviceType, //事项类型
		"ss_orgcode": ss_orgcode, //实施机构组织机构代码
		"bljg": bljg, //办理机构
		"promiseday": cntime, //承诺办结时间
		"agentName": agentName,
		"agentIdcard": agentIdcard
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
		"itemcodeid": itemcodeid,
		"userid": userInfo.userid, //申报人用户id
		"validitykey": validitykey
	}
	var pramaData = {
		"infoStr": JSON.stringify(prama)
	}

	window.location.href = 'oderform.html?' + "?cityname=" + cityName1 + "&validitykey=" + validitykey + "&siteid=" + vsiteid + "&prama=" + JSON.stringify(prama);

}

function jump() {
	window.location.href = "odersuccess.html?type=02&siteid=" + vsiteid + "&cityname=" + cityName1;
}

function jump1() {
	//草稿
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
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
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
	var date = {
		itemcode: itemcode,
		webid: webid,
		name: name
	}
	myRequest({
		//		url: zjzwurl + "interface/getBsznCailiaoList.do",
		url: "http://www.zjzwfw.gov.cn/zjzw/app/bmfw/getBsznAppCailiaoList.do",
		data: date,
		header: '',
		success: function(data) {
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
				var j=1;
				for(var i = 0; i < dataArray.length; i++) {
					if(dataArray[i].name.indexOf("气象灾害证明申请表") == -1) {
						example.items.push({
							index: j,
							name: dataArray[i].name,
							UNID: dataArray[i].material,
							necessity: dataArray[i].necessity
						});
						j++;
					}
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			}
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
		}
	});

	//判断是否为数组
	function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
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
//证照列表
function getLicenseList(arg0, arg1, arg2) {
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
							code: data[i].code
						});
					}
				},
				fail: function(data) { //请求失败
					document.getElementById('loading').style.display = 'none';
				}
			});

		}, 100);
	} else {
		document.getElementById('loading').style.display = 'none';
		example3.licenselist = [];
		example3.licenselist.push({
			name: "身份证",
			code: "0"
		});
	}
}

var example2 = new Vue({
	el: '#parent2',
	data: {
		items2: []
	}
})

//获取证照
function getlicense(code) {
	document.getElementById("licenselist").style.display = "none";
	document.getElementById('loading').style.display = 'block';
	if(code == "0") { //身份证
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
			//licenseNo: "330726199908182510"
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

	//	myRequest({
	//		url: requesturl,
	//		data: data,
	//		header: '',
	//		success: function(data) { //请求成功
	//			example2.items2 = [];
	//			if(data != null && data != "") {
	//				example2.items2.push({
	//					height: heights * 2,
	//					index: 0,
	//					imageurl: overallInterface + data.realpath,
	//					showurl: overallInterface + data.showpath
	//				});
	//				document.getElementById('loading').style.display = 'none';
	//				document.getElementById('pullrefresh').style.display = 'block';
	//			} else {
	//				document.getElementById('loading').style.display = 'none';
	//				document.getElementById("badmessage").style.display = "block";
	//			}
	//		},
	//		fail: function(data) { //请求失败
	//			document.getElementById('loading').style.display = 'none';
	//			document.getElementById("badmessage").style.display = "block";
	//		}
	//	});

}