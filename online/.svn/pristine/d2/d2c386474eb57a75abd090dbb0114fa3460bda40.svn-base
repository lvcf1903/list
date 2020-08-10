var storage = window.localStorage;
var userInfo;
var userid;
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
	//判断容器类型，浏览器还是APP
	var container = containerT();
	if(container == "web") {
		var wxuserInfo = storage.wxuserInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	} else { //app 使用jssdk获取用户信息
		var wxuserInfo = storage.userInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	}
	var userType; //1-个人用户;2-法人用户

	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		userType = 1;
	} else {
		userType = 2;
	}

	var name = document.getElementById("name").value;
	var mobile = document.getElementById("mobile").value;
	var area = document.getElementById("area").value;

	var province = document.getElementById("showCityPicker3").value;
	var postcode = document.getElementById("postcode").value;

	//先判空
	if(!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
		mui.alert("请输入收件人");
		return;
	} else if(!(new RegExp("\\S+")).test(mobile)) {
		mui.alert("请输入联系电话");
		return;
	} else if(!(checkPhone(mobile) || checkMobile(mobile))) {
		mui.alert("请输入正确的联系电话");
		return;
	} else if(!(new RegExp("\\S+")).test(province)) {
		mui.alert("请选择省市区");
		return;
	} else if(!(/^[1-9][0-9]{5}$/).test(postcode)) {
		mui.alert("请输入正确的邮政编码");
		return;
	} else if(!(new RegExp("\\S+")).test(area) || area.length < 5) {
		mui.alert("详细地址不少于5个字");
		return;
	}
	var queryBtn = document.getElementById("queryBtn");
	queryBtn.disabled = true;
	document.getElementById('loading').style.display = 'block';
	var opts = {
		//参数列表    
		lines: 10, // loading小块的数量
		length: 10, // 小块的长度
		width: 4, // 小块的宽度
		radius: 8, // 整个圆形的半径
		corners: 1, // 小块的圆角，越大则越圆
		rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
		color: '#ddd', // 颜色
		speed: 1, // 变换速度
		trail: 60, // 余晖的百分比
		shadow: false, // 是否渲染出阴影
		hwaccel: false, // 是否启用硬件加速
		className: 'spinner', // 给loading添加的css样式名
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('food');
	var spinner = new Spinner(opts).spin(target);
	//提交地址
	var date;
	var addressInfo;
	var requesturl;
	if(isfrom == "edit") { //编辑地址
		addressInfo = {
			"name": name,
			"phone": mobile,
			"provinceCode": parseInt(window.localStorage.provinceCode),
			"provinceName": window.localStorage.province,
			"cityCode": parseInt(window.localStorage.cityCode),
			"cityName": window.localStorage.city,
			"regionCode": parseInt(window.localStorage.countyCode),
			"regionName": window.localStorage.county,
			"street": "",
			"address": area,
			"postcode": postcode,
			"isDefault": parseInt(storage.isdefault), //是否默认地址：0-否 1-是
			"description": ""
		}
		date = {
			id: iid,
			userId: userid,
			addressInfo: JSON.stringify(addressInfo)
		}
		requesturl = overallInterface + "ywzw/interface/modifyAddr.do";
	} else {//新增地址
		addressInfo = {
			"name": name,
			"phone": mobile,
			"provinceCode": parseInt(window.localStorage.provinceCode),
			"provinceName": window.localStorage.province,
			"cityCode": parseInt(window.localStorage.cityCode),
			"cityName": window.localStorage.city,
			"regionCode": parseInt(window.localStorage.countyCode),
			"regionName": window.localStorage.county,
			"street": "",
			"address": area,
			"postcode": postcode,
			"isDefault": 0, //是否默认地址：0-否 1-是
			"description": ""
		}
		date = {
			userType: userType,
			userId: userid,
			addressInfo: JSON.stringify(addressInfo)
		}
		requesturl = overallInterface + "ywzw/interface/addAddr.do";
	}

	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) { //成功
			queryBtn.disabled = false;

			document.getElementById('loading').style.display = 'none';
			var obj = data;
			if(obj.state == 200) {
				window.location.href = "addresslist.html";
				mui.alert("保存成功");
			} else {
				mui.alert(obj.message);
			}
		},
		fail: function(data) { //失败
			queryBtn.disabled = false;

			document.getElementById('loading').style.display = 'none';
			mui.alert("保存失败");
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