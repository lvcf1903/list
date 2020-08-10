var storage = window.localStorage;
var userInfo;
var userid;

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

function requestAddressList() {
	//判断容器类型，浏览器还是APP

	if(container == "web") {
		var wxuserInfo = storage.wxuserInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	} else { //app 使用jssdk获取用户信息
		var wxuserInfo = storage.userInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	}

	var date;
	date = {
		userId: userid
	}

	document.getElementById('loading').style.display = 'block';

	myRequest({
		url: overallInterface + "ywzw/interface/addrList.do",
		data: date,
		header: '',
		success: function(data) { //成功
			document.getElementById('loading').style.display = 'none';
			var obj = data;
			if(obj.content == null) {
				document.getElementById("badmessage").style.display = "block";
				document.getElementById("parent").style.display = "none";
				return;
			}
			if(obj.state == 200) {
				var content = obj.content;
				if(content == null) {
					return;
				}
				if(content.length > 0) { //有数据
					example.items = [];
					for(var i = 0; i < content.length; i++) {
						var username = content[i].name;
						var length = username.length - 1;
						if(length == 1) {
							username = username.replace(username.substr(0, length), "*");
						} else if(length == 2) {
							username = username.replace(username.substr(0, length), "**");
						} else {
							username = username.replace(username.substr(0, length), "***");
						}
						var mobilebefore = content[i].phone;
						var mobileshow = mobilebefore.replace(mobilebefore.substr(3, 4), "****");

						example.items.push({
							iid: content[i].id,
							name: username,
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
							document.getElementById("parent").style.display = "block";
						}
					}
					setTimeout(function() {
						defaultImgSetted(content);
					}, 5);
				} else {
					document.getElementById("badmessage").style.display = "block";
				}
			} else {
				document.getElementById("badmessage").style.display = "block";
			}
		},
		fail: function(data) { //失败
			document.getElementById('loading').style.display = 'none';
			document.getElementById("badmessage").style.display = "block";
			alert("加载失败");
		}
	});
}
//默认地址的图片
function defaultImgSetted(dataArray) {
	for(var i = 0; i < dataArray.length; i++) {
		if(dataArray[i].isDefault == "1") { //是默认地址
			var index = "default" + dataArray[i].id;
			document.getElementById(index).innerHTML = "<img src=\"../source/images/default_selected.png\" width=\"18px\" style=\"vertical-align: middle;margin-top: -4px;\"> 默认地址";
		}
	}
}

//设为默认
function makeDefault(iid) {
	var date;
	date = {
		userId: userid,
		id: iid
	}

	document.getElementById('loading').style.display = 'block';
	var requesturl = overallInterface + "ywzw/interface/modifyDefault.do";
	myRequest({
		data: date,
		url: requesturl,
		header: '',
		success: function(data) { //成功
			document.getElementById('loading').style.display = 'none';
			var obj = data;
			if(obj.state == 200) {
				var defaults = document.getElementsByClassName("default");
				for(var i = 0; i < defaults.length; i++) {
					defaults[i].innerHTML = "<img src=\"../source/images/default_unselected.png\" width=\"18px\" style=\"vertical-align: middle;margin-top: -4px;\"> 设为默认";
				}
				var index = "default" + iid;
				document.getElementById(index).innerHTML = "<img src=\"../source/images/default_selected.png\" width=\"18px\" style=\"vertical-align: middle;margin-top: -4px;\"> 默认地址";
			} else {
				alert("设置失败");
			}
		},
		fail: function(data) { //失败
			document.getElementById('loading').style.display = 'none';
			alert("设置失败");
		}
	});
}
//编辑地址
function editAddress(iid, name, mobile, address, provinceName, cityName, regionName, provinceCode, cityCode, regionCode, postcode, isdefault) {
	storage.province = provinceName;
	storage.city = cityName;
	storage.county = regionName;

	storage.provinceCode = provinceCode;
	storage.cityCode = cityCode;
	storage.countyCode = regionCode;
	storage.isdefault = isdefault;

	window.location.href = "addAddres.html?isfrom=edit&iid=" + iid + "&name=" + name + "&mobile=" + mobile + "&address=" + address + "&postcode=" + postcode;

}

//删除地址
function deleteAddress(iid) {
	if(window.confirm('确定要删除该地址吗？')) {
		var date;
		date = {
			userId: userid,
			id: iid
		}
		document.getElementById('loading').style.display = 'block';
		var requesturl = overallInterface + "ywzw/interface/removeAddr.do";
		myRequest({
			url: requesturl,
			data: date,
			header: '',
			success: function(data) { //成功
				document.getElementById('loading').style.display = 'none';
				var obj = data;
				if(obj.state == 200) {
					requestAddressList();
				} else {
					alert("删除失败");
				}
			},
			fail: function(data) { //失败
				document.getElementById('loading').style.display = 'none';
				alert("删除失败");
			}
		});
		return true;
	} else {

		return false;
	}
}