var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

var storage = window.localStorage;
var userInfo;

function requestOrderArticle(orderid) {
	if(dealstate == 0) {
		document.getElementById('submitBtn2').style.display = 'block';
	}
	var userid
	var container = containerT();
	if(container == "web") {
		userInfo = JSON.parse(localStorage.userInfo);
		userid = userInfo.userid;
	} else { //app 使用jssdk获取用户信息		
		userInfo = JSON.parse(localStorage.userInfo);
		userid = userInfo.userid;
	}
	var date = {
		userid: userid,
		//		userid: '8afac0cc558fd69001559ef65d546038',
		orderid: orderid
	}
	myRequest({
		url: overallInterface + "ywzw/interface/getMyOrderArticle.do",
		data: date,
		header: '',
		success: function(data) { //请求成功
			document.getElementById('loading').style.display = 'none';
			fillDatainView(data);

		},
		fail: function(data) { //请求失败
			document.getElementById('loading').style.display = 'none';
			//			mui.alert("加载失败");
			//			fillDatainView(jiajson);

		}
	});
}

function fillDatainView(data) {
	//var obj = JSON.parse(data);
	var obj = data;

	var basicinfo = obj.basicinfo;
	var material = obj.material;
	var bllc = obj.bllc;
	//填充基本信息数据
	document.getElementById("itemname").innerHTML = basicinfo.name;
	var type = basicinfo.type;
	if(type == 1) {
		document.getElementById("sxfl").innerHTML = "即办件";
	} else if(type == 2) {
		document.getElementById("sxfl").innerHTML = "承诺件";
	}
	document.getElementById("blbm").innerHTML = basicinfo.bljg;
	if((new RegExp("\\S+")).test(basicinfo.fdqx) && basicinfo.fdqx != null) {
		document.getElementById("fdqx").innerHTML = basicinfo.fdqx + '天';
	} else {
		document.getElementById("fdqx").innerHTML = '无';
	}
	if((new RegExp("\\S+")).test(basicinfo.cnqx) && basicinfo.cnqx != null) {
		document.getElementById("cnqx").innerHTML = basicinfo.cnqx + '天';
	} else {
		document.getElementById("cnqx").innerHTML = '无';
	}
	document.getElementById("lxdh").innerHTML = basicinfo.zxdh.split('、')[0];
	document.getElementById("jddh").innerHTML = basicinfo.tsdh.split('、')[0];
	var sfqk;
	if(basicinfo.sfsf == '1') { //收费
		sfqk = "收费";
	} else if(basicinfo.sfsf == '0') { //不收费
		sfqk = "不收费";
	} else {
		sfqk = "无";
	}

	document.getElementById("sfbz").innerHTML = sfqk;

	if(basicinfo.sldd.length > 0) {
		document.getElementById("bldd").innerHTML = basicinfo.sldd;
	} else {
		document.getElementById("bldd").innerHTML = "无";
	}
	if(basicinfo.sltj.length > 0) {
		document.getElementById("sltj").innerHTML = basicinfo.sltj;
	} else {
		document.getElementById("sltj").innerHTML = "无";
	}
	//	if(basicinfo.fdyj.length) {
	//		document.getElementById("fdyj").innerHTML = basicinfo.fdyj;
	//	} else {
	//		document.getElementById("fdyj").innerHTML = "无";
	//	}
	if(obj.yybh.length > 0) {
		document.getElementById("yybh").innerHTML = obj.yybh;
	} else {
		document.getElementById("yybh").innerHTML = "无";
	}

	//填充办理材料数据
	if(typeof(material) != "undefined" && material.length > 0) { //有材料
		example.items = [];
		for(var i = 0; i < material.length; i++) {
			example.items.push({
				index: i + 1,
				name: material[i]
			});
			if(i == 0) {
				document.getElementById("parent").style.display = "block";
			}
		}
		document.getElementById("nocontent").style.display = "none";
	} else { //无材料
		document.getElementById("nocontent").style.display = "block";
		document.getElementById("parent").style.display = "none";
		document.getElementById("process").style.display = "none";
	}
}

//点击取消预约
function clickCancelOrder(orderid) {
	var userid
	if(container == "web") {
		var wxuserInfo = storage.wxuserInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	} else { //app 使用jssdk获取用户信息
		var wxuserInfo = storage.userInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	}
	var date = {
		userid: userid,
		//		userid: '8afac0cc558fd69001559ef65d546038',
		orderid: orderid
	}

	myRequest({
		url: overallInterface + "ywzw/interface/cancelOrder.do",
		data: date,
		header: '',
		success: function(data) { //请求成功
			//			document.getElementById('loading').style.display = 'none';
			var obj = data;
			if(obj.result == "true") {				
				history.back();
			} else {
				mui.alert("取消预约失败");
			}

		},
		fail: function(data) {}
	});

}