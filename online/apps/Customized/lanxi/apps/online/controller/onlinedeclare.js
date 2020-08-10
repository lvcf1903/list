//var jiajson = "{\"code\":0,\"path\":\"D:\\\\phpstudy\\\\WWW\\\\Uploads\\\\Attach\\\\2016-11-10\\\\1478742120735433.png\"}";
//提交时要用的参数
var token = "";
var deptunid = ""; //单位id
var legalman = ""; //法人代表
var serviceType = ""; //事项类型
var ss_orgcode = ""; //实施机构组织机构代码
var bljg = ""; //办理机构

var serviceid = "";

var submitmobile = "";
var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

//人脸识别要用的参数
var bizno;

//保存必传材料的数组
var mustMaterial = [];
//填充相关材料的数据
function fillMaterial() {

	var materialArray = material;
	example.items = [];
	for(var i = 0; i < materialArray.length; i++) {
		//判断材料是否必须上传 type：1 必须提交  2：非必须
		var displayName;
		var bitian;
		if(materialArray[i].type == "1") {
			//			displayName = "⭐   " + materialArray[i].infoname;
			displayName = materialArray[i].infoname;
			if(materialArray[i].isForm != "1") { //不是表单

				mustMaterial.push(materialArray[i]);
			}
			bitian = "*必要";
		} else {
			displayName = materialArray[i].infoname;
			bitian = "";
		}

		if(materialArray[i].isForm == "1") { //是表单
			displayName = "⭐   " + materialArray[i].infoname +
				'（若此处不上传，您可以点击下一步进行在线填表）';
			//			mustMaterial.remove(materialArray[i]);
		}

		example.items.push({
			index: i + 1,
			name: materialArray[i].infoname,
			UNID: materialArray[i].unid,
			displayName: displayName,
			bitian: bitian
		});
		if(i == 0) {
			document.getElementById("parent").style.display = "block";
			//			document.getElementById("materialInfo").style.display = "block";
			document.getElementById("xiangguancailiao").style.display = "inline-block";

		}

	}

}

function requestToken() {
	//提交时先请求微信的token
	//判断容器类型，浏览器还是APP
	var container = containerT();
	var containerType = "";
	if(container == "web") { //微信中 请求token
		//请求tokken
		var tokenData = {
			"grant_type": "client_credential",
			"appid": "wx3e107b60536d75e1",
			"secret": "aa769a511222cc5aa99764312d440bec"
		}
		$.ajax({
			type: 'GET',
			url: "https://api.weixin.qq.com/cgi-bin/token",
			data: tokenData,
			async: false,
			dataType: 'json',
			success: function(data) {
				//				alert(data);
				if(data.access_token) {
					token = data.access_token;
				}
			},
			error: function(err) {
				//				alert("获取票据信息失败");
			}
		});

	} else { //浙江app 使用jssdk获取用户信息

	}
}

//删除图片
function deleteImage(index1, cc, path, materialUNID) {

	//第1步：删除图片对应的HTML
	var aa = cc.parentElement;
	var photoindex = "photo" + index1;
	var dd = document.getElementById(photoindex);
	dd.removeChild(aa);
	//第2步：删除上传时需要的fileArray数组中的元素
	for(var i = 0; i < filesArray.length; i++) {
		if(path == filesArray[i].path && materialUNID == filesArray[i].materialUNID) {
			for(var j = 0; j < filesArray.length; j++) {
				if(filesArray[j] == filesArray[i]) {
					filesArray.splice(j, 1);
					break;
				}
			}
		}
	}
	//第3步：请求删除图片接口
	//	$.ajax({
	//		type: 'POST',
	//		url: overallInterface + 'deleteMaterial.do',
	//		data: {
	//			path: path
	//		},
	//		async: false,
	//		dataType: 'json',
	//		success: function(data) {
	//
	//		},
	//		error: function(err) {
	//
	//		}
	//	});
}
var receivename = "";
var receivemobile = "";
var receiveaddress = "";

var postcode = "";
var detailAddress = "";
var provinceCode = "";
var provinceName = "";
var cityCode = "";
var cityName = "";
var regionCode = "";
var regionName = "";

var isPost;
//提交办证接口
function submitItem(submittype) {
	var base64=new Base64();
	var submituserid;
	var name;
	var submitidcard;
	var subtype;
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		name = document.getElementById("applyname").value;
		submitmobile = userInfo.mobile;
		submituserid = userInfo.userid;
		submitidcard = userInfo.idnum;
		subtype = "0";
	} else { //法人
		submituserid = userInfo.uniscid;
		name = document.getElementById("applyenterprise").value;
		submitmobile = document.getElementById("mobile").value;
		submitidcard = userInfo.uniscid;
		subtype = "1";
	}

	var idcard = document.getElementById("idcard").value;
	var lxaddress = document.getElementById("lxdz").value;
	//	var address = document.getElementById("address").value;

	//	var receivename = document.getElementById("receivename").value;
	//	var receivemobile = document.getElementById("receivemobile").value;
	//	var receiveaddress = document.getElementById("receiveaddress").value;
	//	var postnum = document.getElementById("postnum").value;
	if(submittype == "face") {

	} else {
		if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人判空
			//先判空
			if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
				alert("请输入申报人姓名");
				return;
			} else if(!(new RegExp("\\S+")).test(lxaddress)) {
				alert("请输入联系地址");
				return;
			}
			//		else if(!(new RegExp("\\S+")).test(userInfo.idnum)) {
			//			alert("请输入身份证");
			//			return;
			//		} else if(!(isCardID(idcard) == "合法")) { //验证身份证是否合法
			//			alert(isCardID(idcard));
			//			return;
			//		}
			//		else if(!(new RegExp("\\S+")).test(mobile)) {
			//			alert("请输入联系电话");
			//			return;
			//		} 
			//		
			//		else if(!(checkPhone(mobile) || checkMobile(mobile))) {
			//			alert("请输入正确的联系电话");
			//			return;
			//		} 
			else {

				if(isManual) { //需要快递
					isPost = "Y";
					if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
						alert("您还未选择收件地址");
						return;
					}
					//				else if(!(new RegExp("\\S+")).test(receivemobile)) {
					//					alert("请输入收件人手机");
					//					return;
					//				} else if(!(checkPhone(receivemobile) || checkMobile(receivemobile))) {
					//					alert("请输入正确的收件电话");
					//					return;
					//				} else if(!(new RegExp("\\S+")).test(receiveaddress)) {
					//					alert("请输入收件人地址");
					//					return;
					//				} else if(!(new RegExp("\\S+")).test(postnum)) {
					//					alert("请输入邮政编码");
					//					return;
					//				}
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
			} else if(!(new RegExp("\\S+")).test(lxaddress)) {
				alert("请输入联系地址");
				return;
			} else {
				if(isManual) { //需要快递
					isPost = "Y";
					if(!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
						alert("您还未选择收件地址");
						return;
					}
					//				else if(!(new RegExp("\\S+")).test(receivemobile)) {
					//					alert("请输入收件人手机");
					//					return;
					//				} else if(!(checkPhone(receivemobile) || checkMobile(receivemobile))) {
					//					alert("请输入正确的收件电话");
					//					return;
					//				} else if(!(new RegExp("\\S+")).test(receiveaddress)) {
					//					alert("请输入收件人地址");
					//					return;
					//				} else if(!(new RegExp("\\S+")).test(postnum)) {
					//					alert("请输入邮政编码");
					//					return;
					//				}
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

		var haveSubmit = [];
		//判断是否有文件未上传
		for(var i = 0; typeof(material)!="undefined" && i < material.length; i++) {
			for(var j = 0; j < filesArray.length; j++) {
				if(material[i].unid == filesArray[j].materialUNID) {
					haveSubmit.push(material[i].unid);
				}
			}
		}

		var musthaveSubmit = [];
		//判断是否有必传文件未上传
		for(var i = 0; i < mustMaterial.length; i++) {
			for(var j = 0; j < filesArray.length; j++) {
				if(mustMaterial[i].unid == filesArray[j].materialUNID) {
					musthaveSubmit.push(material[i].unid);

				}
			}
		}
		//开始提交
		var basicData = {
			"serviceid": itemcode, //申报的事项id
			"servicename": itemname, //申报的事项名称
			"username": base64.encode(name), //申报人姓名
			"userid": submituserid, //申报人用户id
			"mobile": base64.encode(submitmobile), //申报人联系电话
			"idcard": base64.encode(submitidcard), //申报人身份证号
			"idcard_type": "身份证", //证件类别
			"contactaddress": "", //申报人联系地址 
			"needPost": isPost, //是否快递  "Y":快递 "N":不快递
			"deptunid": deptunid, //单位id
			"legalman": document.getElementById("legalman").value, //法人代表
			"serviceType": serviceType, //事项类型
			"ss_orgcode": ss_orgcode, //实施机构组织机构代码
			"bljg": bljg, //办理机构
			"address": lxaddress,
			"cnqx": cnqx,
			"applytype": subtype,
			"memo": "备注"
		}

		var mail = {
			"receiveaddress": base64.encode(detailAddress), //收件地址
			"receivemobile": base64.encode(receivemobile), //收件人手机
			"receivename": base64.encode(receivename), //收件人姓名
			"postcode": postcode, //邮政编码
			"provinceCode": parseInt(provinceCode),
			"provinceName": provinceName,
			"cityCode": parseInt(cityCode),
			"cityName": cityName,
			"regionCode": parseInt(regionCode),
			"regionName": regionName
		}
		//	filesArray = [{
		//		"materialUNID": "12EC90B2D4FF308E411622E31295AE5C",
		//		"materialName": "广告发布单位营业执照",
		//		"path": "http://pic78.huitu.com/res/20160604/1029007_20160604114552332126_1.jpg"
		//	}];
		var prama = {
			"data": basicData,
			"files": filesArray,
			"mail": mail,
			"type": "1", //0 保存草稿  1提交
			"containertype": "1", //0 微信 1 app（由于现在微信的图片也是url，因此不需要区分容器类型了，都写死成1）
			"token": token
		}

		var json = {
			"s": JSON.stringify(prama)
		};

		var pramaData = {
			"s": JSON.stringify(prama)
		}

		haveSubmit = unique(haveSubmit);
		musthaveSubmit = unique(musthaveSubmit);
		//判断是否有必传材料未上传，如果有 不给提交
		if(musthaveSubmit.length < mustMaterial.length) { //有材料未上传的情况
			alert("您还有必传材料未上传，请继续上传");
			document.getElementById("loading").style.display = "none";
			return;
		}
	}

	if(submittype == "face") {
		prama = JSON.parse(localStorage.getItem("s"));
		var json = {
			"s": JSON.stringify(prama)
		};

	} else {

		if(typeof(material)!="undefined" && haveSubmit.length < material.length) { //有材料未上传的情况
			if(container == "web") { //微信中
				//				alert("您还有材料未上传，请继续上传");
				//				return;
			} else {
//				if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
//					if(window.confirm('您还有材料未上传，是否确定进行人脸识别？')) {
//						localStorage.setItem("s", JSON.stringify(prama));
//						//window.location.href = "../view/init.html";
//						//						beginFace();
//						return;
//					} else {
//						return;
//					}
//				} else { //
//
//				}

			}

		}

	}
	document.getElementById('loading').style.display = 'block';

	myRequest({
		url: overallInterface + 'submitMatter.do',
		data: json,
		header: '',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			//			var data = JSON.parse(data);
			if(data.result == 0) {
//				if(container == "web") {
//					window.location.href = "draw.html";
//				} else {
					window.localStorage.punid = data.code;
					setTimeout(jump, 1000);
//				}

			} else {
				alert("提交失败");
			}
		},
		fail: function(data) {
			//			alert(data);
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});

	//	$.ajax({
	//		type: 'POST',
	//		url: overallInterface + 'submitMatter.do',
	//		data: pramaData,
	//		async: true,
	//		dataType: 'json',
	//		success: function(data) {
	//      var data = JSON.parse(data);
	//			if(data.result == 0) {
	//				window.localStorage.punid = data.code;
	//				setTimeout(jump, 1000);
	//			} else {
	//				alert("提交失败");
	//			}
	//
	//		},
	//		error: function(err) {
	//			document.getElementById("loading").style.display = "none";
	//			alert("提交失败");
	//		}
	//	});
}

function jump() {
	//判断是否有材料信息
//	var formJson = window.localStorage.formJson;
//
//	var obj;
//	if(formJson) {
//		obj = JSON.parse(formJson);
//	} else {
//		obj = [];
//	}
//	if(obj.length > 0) { //有表单信息 
//		window.location.href = "form.html?index=0";
//	} else { //无表单信息就提交
		window.location.href = "ordersuccess.html?type=02";
//	}
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

var example2 = new Vue({
	el: '#classifyParent',
	data: {
		items: []
	}
})
var classifymaterial;
//因为列表样式调整，可以从列表直接点进申报页，因此要在申报页请求办事正文以拿到材料
function requestMaterial() {
	var requesturl;
	requesturl = overallInterface + "getServiceMaterialByUnid.do";

	var json = {
		serviceid: itemcode,
	};

	myRequest({
		url: requesturl,
		data: json,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			var obj = data;
			//			var obj = JSON.parse(obj);
			//判断该事项是否是有分类的事项
			//			alert("1");

			var isclassify = obj.isclassify;
			//			if(isclassify == "0") { //无分类
			document.getElementById('isclassify').style.display = 'none';
			localStorage.setItem("materialArray", JSON.stringify(obj.material));
			material = obj.materials;
			if(typeof(material) !="undefined" && material.length > 0){
				//填充材料
				fillMaterial();
			}

			//			} else { //有分类
			//				document.getElementById('isclassify').style.display = 'block';
			//			    classifymaterial = obj.classifymaterial;
			//				if(classifymaterial.length > 0) { //有数据
			//					example2.items = [];
			//					for(var i = 0; i < classifymaterial.length; i++) {
			//						example2.items.push({
			//							index: i,
			//							classifyName: classifymaterial[i].name
			//
			//						});
			//						if(i == 0) {
			//							document.getElementById("classifyParent").style.display = "block";
			//						}
			//					}
			//
			//				}
			//			}

			//			var basicinfo = obj.basicinfo;
			//			bljg = basicinfo.bljg;
			//			deptunid = basicinfo.deptunid;
			//			serviceType = basicinfo.serviceType;
			//			ss_orgcode = basicinfo.ss_orgcode;
			//			serviceid = basicinfo.id;

			//			requestAllForm();
			document.getElementById("btn").innerHTML = "完成";
		},
		fail: function(data) {
			//			alert(data);
			document.getElementById('loading').style.display = 'none';

		}
	});

}

function changeRadio(index) {

	localStorage.setItem("materialArray", classifymaterial[index].material);
	material = classifymaterial[index].material;
	//填充材料
	fillMaterial();
}
//请求收货地址
var example1 = new Vue({
	el: '#parent1',
	data: {
		items: []
	}
})

function requestAddressList() {
	var date;
	date = {
		userid: userInfo.userid
	}

	myRequest({
		url: overallInterface + "findAddress.do",
		data: date,
		header: '',
		success: function(data) {
			var obj = data;
			if(obj.length > 0) { //有数据
				example1.items = [];
				for(var i = 0; i < obj.length; i++) {
					example1.items.push({
						index: i,
						name: obj[i].postName,
						mobile: obj[i].postPhone,
						address: obj[i].postAddress,
						provinceCode: obj[i].provinceCode,
						provinceName: obj[i].provinceName,
						cityCode: obj[i].cityCode,
						cityName: obj[i].cityName,
						regionCode: obj[i].regionCode,
						regionName: obj[i].regionName,
						postcode: obj[i].postcode
					});
					if(i == 0) {
						document.getElementById("parent1").style.display = "block";
					}
				}
				document.getElementById("nocontent").style.display = "none";
				document.getElementById("nocontent1").style.display = "none";
				setTimeout(setDefault, 10);

			} else {

				if(container == "web") {
					document.getElementById("nocontent").style.display = "block";
				} else { //app 
					document.getElementById("nocontent1").style.display = "block";
				}

			}
			requestMaterial();
		},
		fail: function(data) {
			if(container == "web") {
				document.getElementById("nocontent").style.display = "block";
			} else { //app 
				document.getElementById("nocontent1").style.display = "block";
			}
			requestMaterial();
		}
	});

	//	$.ajax({
	//		data: date,
	//		type: "post",
	//		url: overallInterface + "findAddress.do",
	//		timeout: 15000,
	//		async: true,
	//		success: function(data) { //成功
	//
	//			var obj = JSON.parse(data);
	//			if(obj.length > 0) { //有数据
	//				example1.items = [];
	//				for(var i = 0; i < obj.length; i++) {
	//					example1.items.push({
	//						index: i,
	//						name: obj[i].postName,
	//						mobile: obj[i].postPhone,
	//						address: obj[i].postAddress,
	//						provinceCode: obj[i].provinceCode,
	//						provinceName: obj[i].provinceName,
	//						cityCode: obj[i].cityCode,
	//						cityName: obj[i].cityName,
	//						regionCode: obj[i].regionCode,
	//						regionName: obj[i].regionName,
	//						postcode: obj[i].postcode
	//					});
	//					if(i == 0) {
	//						document.getElementById("parent1").style.display = "block";
	//					}
	//				}
	//				document.getElementById("nocontent").style.display = "none";
	//				document.getElementById("nocontent1").style.display = "none";
	//				setTimeout(setDefault, 10);
	//
	//			} else {
	//
	//				if(container == "web") {
	//					document.getElementById("nocontent").style.display = "block";
	//				} else { //app 
	//					document.getElementById("nocontent1").style.display = "block";
	//				}
	//
	//			}
	//			requestMaterial();
	//
	//		},
	//		error: function(e) { //失败
	//			//			mui.alert("加载失败");
	//			if(container == "web") {
	//				document.getElementById("nocontent").style.display = "block";
	//			} else { //app 
	//				document.getElementById("nocontent1").style.display = "block";
	//			}
	//			requestMaterial();
	//		}
	//	});
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
	receiveaddress = document.getElementById(addressid).innerHTML; //有省市区的全部地址

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

//请求事项对应表单接口
function requestAllForm() {

	var data = {
		id: serviceid
	}
	var requesturl;
	requesturl = overallInterface + "getForm.do?id=" + serviceid;
	$.ajax({
		data: null,
		type: "get",
		url: requesturl,
		timeout: 15000,
		async: true,
		success: function(data2) { //请求成功
			//			alert(data);
			var obj = JSON.parse(data2);
			window.localStorage.formJson = data2;
			if(obj.length > 0) { //有表单信息
				document.getElementById("btn").innerHTML = "下一步";

			} else { //无表单信息
				document.getElementById("btn").innerHTML = "完成";
			}

		},
		error: function(e) { //请求失败
			//			alert("获取相关材料失败");
			document.getElementById("btn").innerHTML = "完成";
		}
	});
}
var licenseArray = [];
var licenseLength;
//请求证照列表
function requestLicense() {

	var requestURL;
	var holderCode;
	var holderName;

	//判断是个人还是法人
	//判断个人还是法人  
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		holderCode = userInfo.idnum;
		holderName = userInfo.username;
		requestURL = overallInterface + "getPersonalLicense.do";
	} else { //法人
		holderCode = userInfo.uniscid;
		holderName = userInfo.appConEntName;
		requestURL = overallInterface + "getLegalPersonLicense.do";
	}

	var prama = {
		holderCode: holderCode,
		holderName: holderName,
		page: "",
		size: "",
		state: "1"

		//		holderCode: "330821199208254222",
		//		holderName: "钱莉莉",
		//		holderCode: "91330800MA28F5TE22",
		//		holderName: "",
		//		page: "",
		//		size: "",
		//		state: "1"
		//		access_token:"4b2c8d34-af49-4ffd-b04e-1b56676c53a0"
	}

	//	http://10.27.14.65/license-api-release/license/getPersonalLicense?holderCode=330821199208254222&holderName=钱莉莉&page=&size=&state=1&access_token=4b2c8d34-af49-4ffd-b04e-1b56676c53a0
	$.ajax({
		type: 'get',
		url: requestURL,
		data: prama,
		async: true,
		dataType: 'json',
		success: function(data) {
			if(data.head.status == 0) {
				var obj = data.data.data;

				if(obj.length > 0) {
					licenseLength = obj.length;
					for(var i = 0; i < obj.length; i++) { //请求证照详情
						var abstractCode = obj[i].metadata.abstractCode;

						requestLicenseDetailFile(abstractCode, obj[i].licenseName, i);
					}
				} else {
					setTimeout(addLicenseBtnEvent, 1000);

				}

			} else {
				//				alert("获取证照信息失败");
				setTimeout(addLicenseBtnEvent, 1000);
			}

		},
		error: function(err) {
			setTimeout(addLicenseBtnEvent, 1000);
			//			alert("失败");
		}
	});
}
//请求证照详情
function requestLicenseDetailFile(fileNumber, fileName, index) {
	//	document.getElementById("img").src = "data:image/png;base64," + "";
	var prama = {
		fileNumber: fileNumber
	}
	$.ajax({
		type: 'get',
		url: overallInterface + "getLicenseFileByDoc.do",
		data: prama,
		async: true,
		dataType: 'json',
		success: function(data) {
			if(data.result == "true") {
				//				document.getElementById("img").src = "data:image/png;base64," + data.imgurl;
				var dic = {
					value: data.imgurl,
					text: fileName
				}

				licenseArray.push(dic);
				if(index + 1 == licenseLength) {
					setTimeout(addLicenseBtnEvent, 1000);
				}

			} else {
				//				alert("获取失败");
				setTimeout(addLicenseBtnEvent, 1000);
			}

		},
		error: function(err) {
			//			alert("失败");
			setTimeout(addLicenseBtnEvent, 1000);
		}
	});

}

function addLicenseBtnEvent() {
	for(var i = 0; i < material.length; i++) {
		var index = i + 1;

		var id = "showUserPicker" + index;

		if(licenseArray.length == 0) {
			var obj = document.getElementById(id);

			obj.setAttribute("onclick", "JavaScript:alert('抱歉，暂无您的证照信息');");
		} else {

			(function($, doc) {
				$.init();
				$.ready(function() {
					//普通示例
					var userPicker = new $.PopPicker();

					userPicker.setData(licenseArray);

					var showUserPickerButton = doc.getElementById(id);

					showUserPickerButton.addEventListener('tap', function(event) {
						var iid = event.target.id;

						var index1 = iid.split("showUserPicker")[1];
						var index11 = parseInt(index1);
						userPicker.show(function(items) {

							var photoid = "photo" + index11;
							var dd = document.getElementById(photoid);

							var img = document.createElement("img");
							img.className = "images";
							img.src = items[0].value;

							var materialUNID = material[index11 - 1].id;
							var materialName = material[index11 - 1].name;

							dd.innerHTML += "<div style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><img src='" + img.src + "' style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0; '/><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + index11 + "',this,'" + img.src + "','" + materialUNID + "')\">删除</div></div>";
							//将图片存到数组中，上传的时候用

							var dic = {
								"materialUNID": materialUNID,
								"materialName": materialName,
								"path": img.src
							};
							filesArray.push(dic);

							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);

				});
			})(mui, document);
		}

	}

}

//人脸识别
function beginFace() {
	var data = {
		identitytype: "CERT_INFO",
		certtype: "IDENTITY_CARD",
		certname: userInfo.username,
		certno: userInfo.idnum
	};

	var json = {
		siteid: "1",
		resourceid: "1"
	};

	myRequest({
		url: overallInterface + 'getCustomerInit.do',
		data: data,
		header: '',
		success: function(data) {
			//			alert(data);
			//			alert(JSON.stringify(data));
			var json = eval(data);
			if(json.result == "true") {
				//				alert("1");
				bizno = json.bizno;
				var date = {
					bizno: bizno
				};

				myRequest({
					url: overallInterface + 'getCustomerCertify.do',
					data: date,
					header: '',
					success: function(data) {
						//						alert(data);
						//						alert(JSON.stringify(data)+"jiege");
						var json2 = eval(data);
						if(json2.result == "true") {
							window.location.href = json2.url;

							//									window.open(json2.url);
						}
					},
					fail: function(data) {
						alert(data);
					}
				});

				//				mui.ajax(overallInterface + 'getCustomerCertify.do?', {
				//					data: date,
				//					dataType: 'json', //服务器返回json格式数据
				//					type: 'get', //HTTP请求类型
				//					async: false, //同步
				//					timeout: 10000, //超时时间设置为10秒；
				//					success: function(data2) {
				//						var json2 = eval(data2);
				//						if(json2.result == "true") {
				//							window.location.href = json2.url;
				//
				//							//									window.open(json2.url);
				//						}
				//					},
				//					error: function(xhr, type, errorThrown) {
				//						//异常处理；
				//						console.log(type);
				//					}
				//				});
			} else {
				alert(json.message);
			}
		},
		fail: function(data) {
			//			alert(data);
		}
	});

	//	mui.ajax(overallInterface + 'getCustomerInit.do?', {
	//		data: data,
	//		dataType: 'json', //服务器返回json格式数据
	//		type: 'get', //HTTP请求类型
	//		async: false, //同步
	//		timeout: 10000, //超时时间设置为10秒；
	//		success: function(data) {
	//			var json = eval(data);
	//			if(json.result == "true") {
	//				bizno = json.bizno;
	//				var date = {
	//					bizno: bizno
	//				};
	//				mui.ajax(overallInterface + 'getCustomerCertify.do?', {
	//					data: date,
	//					dataType: 'json', //服务器返回json格式数据
	//					type: 'get', //HTTP请求类型
	//					async: false, //同步
	//					timeout: 10000, //超时时间设置为10秒；
	//					success: function(data2) {
	//						var json2 = eval(data2);
	//						if(json2.result == "true") {
	//							window.location.href = json2.url;
	//
	//							//									window.open(json2.url);
	//						}
	//					},
	//					error: function(xhr, type, errorThrown) {
	//						//异常处理；
	//						console.log(type);
	//					}
	//				});
	//			} else {
	//				alert(json.message);
	//			}
	//		},
	//		error: function(xhr, type, errorThrown) {
	//			//异常处理；
	//			console.log(type);
	//		}
	//	});
}