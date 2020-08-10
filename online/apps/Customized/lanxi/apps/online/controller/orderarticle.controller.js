var storage = window.localStorage;
var userInfo;

//判断容器类型，浏览器还是APP
var container = containerT();
if(container == "web") { //微信
	userInfo = storage.wxuserInfo;
	userInfo = JSON.parse(userInfo);
} else { //app 0-0-op
	userInfo = storage.userInfo;
	userInfo = JSON.parse(userInfo);
}
//var jiajson = "{\"basicinfo\":{\"id\":\"14827\",\"name\":\"港、澳、台地区居民、华侨及外国人申请出具（无）婚姻登记记录证明\",\"type\":\"行政确认\",\"bljg\":\"江苏省民政厅婚姻登记处\",\"zrcs\":\"婚姻登记处\",\"zscs\":\"2\",\"zxdh\":\"025-84400150\",\"tsdh\":\"025-84510099\",\"fdqx\":\"10\",\"cnqx\":\"10\",\"sldd\":\"<p><font class=\\\"sldd\\\">江苏省玄武区省府路8号省行政中心2号楼&nbsp;<a class=\\\"tt\\\"><img src=\\\"http://www.zjzwfw.gov.cn/picture/8/1407251555488622879.gif\\\" width=\\\"64\\\" height=\\\"21\\\" zjzwapp=\\\"window.location.href='appscheme:{杭州市西湖区省府路8号省行政中心2号楼}'\\\" /><span class=\\\"tooltip\\\"><span class=\\\"top\\\"></span><span class=\\\"middle\\\">请到该地址的部门责任处（科）室的办公室办理。</span><span class=\\\"bottom\\\"></span></span></a></font>&nbsp;&nbsp;<font class=\\\"slsj\\\">&nbsp;&nbsp;夏季：上午8:30-12:00，下午14:30-18:00；冬季：上午8:30-12:00，下午14:00-17:30</font></p> \\n<p></p>\",\"fwdx\":\"个人，法人\",\"sfsf\":\"0\",\"sfyj\":\"\",\"sfxm\":\"\",\"rqdw\":\"1\",\"iscollect\":false,\"istable\":\"Y\",\"blcx\":\"\",\"bllct\":\"www.zjzwfw.gov.cn/picture/0/160127141510442988.jpg\",\"slsj\":\"\",\"originalAddress\":null,\"sysurl2\":\"http://fw.zjhrss.gov.cn/sungov/bjiteminfo.jspx?aga001=22450008&bod509=1\",\"qlly\":\"法定本级行使\",\"bjlx\":\"承诺件\",\"bz\":\"\",\"wscx\":\"\",\"sltj\":\"\",\"fdyj\":\"\",\"cjwt\":\"对不起，暂未提供常见问题解答，如果您有疑问，请点击首页的“我要咨询”。\"},\"material\":[{\"id\":\"1\",\"name\":\"江苏省企业职工特殊工种提前退休核准表   \"},{\"id\":\"2\",\"name\":\"职工从事特殊工种提前退休“公示”反馈表   \"},{\"id\":\"3\",\"name\":\"职工因病或非因工致残完全丧失劳动能力退休、退职的，应提供由省劳动鉴定委员会作出的职工完全丧失劳动能力\"},{\"id\":\"4\",\"name\":\"职工个人原始档案及有关材料\"},{\"id\":\"5\",\"name\":\"本人身份证\"}],\"bllc\":\"一、省本级参保单位职工；二、男年满55周岁，女年满45周岁；三、因病或非因工致残，完全丧失劳动能力\"}";

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

function requestOrderArticle() {
	var date;
	var requesturl;
	if(onlinetype == "01") { //网上预约 
		date = {
			itemcode: itemcode
		}
		requesturl = overallInterface + "getOrderArticle.do";
	} else { //网上办证（证明）
		date = {
			unid: itemcode
		}
		requesturl = overallInterface + "getServiceInfoByUnid.do";
	}
	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) {
			//			alert(JSON.stringify(data));
			document.getElementById('loading').style.display = 'none';
			fillDatainView(data);
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");
		}
	});
	//	$.ajax({
	//		data: date,
	//		type: "post",
	//		url: requesturl,
	//		timeout: 15000,
	//		async: true,
	//		success: function(data) { //请求成功
	//			document.getElementById('loading').style.display = 'none';
	//			fillDatainView(data);
	//		},
	//		error: function(e) { //请求失败
	//			document.getElementById('loading').style.display = 'none';
	//			mui.alert("加载失败");
	//
	//		}
	//	});
}

function fillDatainView(data) {
	//	var obj = JSON.parse(data);
	//	var basicinfo = obj.basicinfo;
	var obj = data;
	var basicinfo = data;
	var material = obj.materials; //新昌没有
	if((new RegExp("\\S+")).test(material)) {
		material = JSON.parse(material);
	}

	//	meterial = JSON.parse(material);
	var bllc = obj.bllct;
	//填充基本信息数据
	document.getElementById("itemname").innerHTML = basicinfo.name;
	document.getElementById("sxfl").innerHTML = basicinfo.type;
	document.getElementById("blbm").innerHTML = basicinfo.bljg;
	document.getElementById("fdqx").innerHTML = basicinfo.fdqx + "天";
	document.getElementById("cnqx").innerHTML = basicinfo.cnqx + "天";
	document.getElementById("lxdh").innerHTML = basicinfo.zxdh;
	document.getElementById("jddh").innerHTML = basicinfo.tsdh;
	var sfqk;

	if(basicinfo.sfsf.length > 0) { //不收费
		if(basicinfo.sfsf == '1') { //不收费
			sfqk = "收费";
		} else { //收费
			sfqk = "不收费";
		}

	} else { //收费
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
	if(basicinfo.fdyj.length) {
		document.getElementById("fdyj").innerHTML = basicinfo.fdyj;
	} else {
		document.getElementById("fdyj").innerHTML = "无";
	}
	localStorage.setItem("materialArray", JSON.stringify(material));
	//填充办理材料数据
	if(material.length > 0) { //有材料
		example.items = [];
		for(var i = 0; i < material.length; i++) {
			if(i % 3 == 0) {
				var col = "#6ec2ff"
			} else if(i % 3 == 1) {
				var col = "#ff7f71"
			} else if(i % 3 == 2) {
				var col = "#ffda78"
			}
			example.items.push({
				name: material[i].infoname,
				color: col,
			});
			if(i == 0) {
				document.getElementById("parent").style.display = "block";
			}
		}
		document.getElementById("nocontent").style.display = "none";
	} else { //无材料
		document.getElementById("nocontent").style.display = "block";
		document.getElementById("parent").style.display = "none";
	}

	//填充办理流程数据
	if(bllc.length > 0) {
		document.getElementById("material").innerHTML = bllc;
		document.getElementById("material").style.textAlign = "left";
	} else {
		document.getElementById("material").innerHTML = "暂无数据";
		document.getElementById("material").style.textAlign = "center";
	}

	document.getElementById("maincontent").style.display = "block";
}
//点击基本信息
function basicClicked() {
	document.getElementById("basicinfoTitle").style.color = "#333333";
	document.getElementById("basicinfoTitle").style.background = "white";
	document.getElementById("processTitle").style.color = "#333333";
	document.getElementById("processTitle").style.background = "white";
	document.getElementById("materialTitle").style.color = "#333333";
	document.getElementById("materialTitle").style.background = "#EAEAEA";

	document.getElementById("jiben").style.background = "#338dff";
	document.getElementById("banli").style.background = "#ffffff";

	document.getElementById("basicinfo").style.display = "block";
	document.getElementById("process").style.display = "none";
	document.getElementById("material").style.display = "none";

}
//点击办理材料
function processClicked() {
	document.getElementById("basicinfoTitle").style.color = "#333333";
	document.getElementById("basicinfoTitle").style.background = "white";
	document.getElementById("processTitle").style.color = "#333333";
	document.getElementById("processTitle").style.background = "white";
	document.getElementById("materialTitle").style.color = "#333333";
	document.getElementById("materialTitle").style.background = "#EAEAEA";

	document.getElementById("banli").style.background = "#338dff";
	document.getElementById("jiben").style.background = "#ffffff";

	document.getElementById("basicinfo").style.display = "none";
	document.getElementById("process").style.display = "block";
	document.getElementById("material").style.display = "none";

}
//点击办理流程
function materialClicked() {
	document.getElementById("basicinfoTitle").style.color = "#333333";
	document.getElementById("basicinfoTitle").style.background = "white";
	document.getElementById("processTitle").style.color = "#333333";
	document.getElementById("processTitle").style.background = "white";
	document.getElementById("materialTitle").style.color = "#FFFFFF";
	document.getElementById("materialTitle").style.background = "#338dff";

	document.getElementById("basicinfo").style.display = "none";
	document.getElementById("process").style.display = "none";
	document.getElementById("material").style.display = "block";

}

//-------------------------------------------------以下是handleorder.html中的方法 （因为handleorder.html中用到了sui的日历选择，如果引jQuery会冲突，因此方法写在这里了）
//var jiadate = "{\"resttime\":[\"20161124\",\"20161125\",\"20161128\",\"20161129\",\"20161130\",\"20161201\",\"20161202\",\"20161205\",\"20161206\",\"20161207\",\"20161208\",\"20161209\",\"20161220\",\"20161221\",\"20161222\",\"20161223\",\"20161224\",\"20161224\"]}";
var orderDate = "";
var orderTime = "";

//请求可预约时间
function requestTime() {
	var now = new Date();
	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	month = JSON.stringify(month);
	if(month.length == 1) {
		month = "0" + month;
	}

	var day = now.getDate(); //日
	day = JSON.stringify(day);
	if(day.length == 1) {
		day = "0" + day;
	}

	var minDate = year + "-" + month + "-" + day;
	var currentDate = year + "-" + month + "-" + day;
	var date = {
		time: currentDate
	}

	var json = {
		time: currentDate
	};

	myRequest({
		url: overallInterface + 'getOrderTime.do',
		data: json,
		header: '',
		success: function(data) {
			requestTiemSuccess(data);
		},
		fail: function(data) {}
	});
	//	
	//	$.ajax({
	//		data: date,
	//		type: "post",
	//		url: overallInterface + "getOrderTime.do",
	//		timeout: 15000,
	//		async: true,
	//		success: function(data) { //请求成功
	//			//			document.getElementById('loading').style.display = 'none';
	//			if(data) {
	//				var obj = JSON.parse(data);
	//				requestTiemSuccess(obj);
	//			} else {
	//				mui.alert("获取预约日期失败");
	//			}
	//		},
	//		error: function(e) { //请求失败
	//			//			document.getElementById('loading').style.display = 'none';
	//			mui.alert("获取预约日期失败");
	//		}
	//	});
}
var jiaInterval = "{\"alltime\":[\"9:00-9:30\",\"9:30-10:00\",\"10:00-10:30\",\"10:30-11:00\",\"11:00-11:30\"],\"validtime\":[\"9:00-9:30\",\"9:30-10:00\",\"10:30-11:00\",\"11:00-11:30\"]}";
//请求可预约时间段
function requestTimeInterval() {
	var requestDate;
	if(orderDate == "") {
		requestDate = "";
	} else {
		requestDate = orderDate.substr(0, 4) + "-" + orderDate.substr(4, 2) + "-" + orderDate.substr(6, 2);
	}
	var data = {
		itemcode: itemcode,
		date: requestDate
	}

	var json = {
		itemcode: itemcode,
		date: requestDate
	};

	myRequest({
		url: overallInterface + 'getOrderIntervalTime.do',
		data: json,
		header: '',
		success: function(data) {
			fillTimeIntervalData(data.alltime, data.validtime);
		},
		fail: function(data) {}
	});
	//	$.ajax({
	//		data: data,
	//		type: "post",
	//		url: overallInterface + "getOrderIntervalTime.do",
	//		timeout: 15000,
	//		async: true,
	//		success: function(data) { //请求成功
	//			if(data) {
	//				var obj = JSON.parse(data);
	//				fillTimeIntervalData(obj.alltime, obj.validtime);
	//			} else { //失败
	//
	//			}
	//		},
	//		error: function(e) { //请求失败
	//
	//		}
	//	});
}

var lihtml = "<li id=\"{{item.index}}\" class=\"col-50 timeli\" style=\"vertical-align:middle;height:40px;margin-bottom: 20px;background: #ffffff;width: 92%;\" onclick=\"clickTime('{{item.indexa}}')\"><div class=\"timediv\" id=\"div{{item.indexb}}\"  align=\"center\" style=\"color:#333333;height: 40px;line-height: 40px;text-align: center;\">{{item.time}}</div></li>";
var lihtmlNoValid = "<li id=\"{{item.index}}\" class=\"col-50\" style=\"vertical-align:middle;height:40px;margin-bottom: 20px;background: #ffffff;width: 92%;\"><div id=\"div{{item.indexb}}\"  align=\"center\" style=\"color:#CCCCCC;height: 40px;line-height: 40px;text-align: center;\">{{item.time}}</div></li>";

function fillTimeIntervalData(alltime, validtime) {
	var innerhtml = '';
	for(var i = 0; i < alltime.length; i++) {
		var isvalid = "no";
		for(var j = 0; j < validtime.length; j++) {
			if(alltime[i] == validtime[j]) {
				isvalid = "yes";

			} else {

			}
		}
		if(isvalid == "yes") {
			innerhtml = innerhtml + lihtml.replace(/{{item.index}}/, i + 1)
				.replace(/{{item.indexa}}/, i + 1)
				.replace(/{{item.indexb}}/, i + 1)
				.replace(/{{item.time}}/, alltime[i]);
		} else {
			innerhtml = innerhtml + lihtmlNoValid.replace(/{{item.index}}/, i + 1)
				.replace(/{{item.indexa}}/, i + 1)
				.replace(/{{item.indexb}}/, i + 1)
				.replace(/{{item.time}}/, alltime[i]);
		}

	}
	document.getElementById('parent').innerHTML = innerhtml;
}

function requestTiemSuccess(data) {
	var dateArray = data.resttime;
	//找到所有可预约日期中的最大日期和最小日期
	var minSelectDate = dateArray[0];
	//需要获取到最小一天的前一天（因为sui日历控件设置的minDate不包含那一天）
	minSelectDate = getPreDay(minSelectDate);
	var index = dateArray.length - 1;
	var maxSelectDate = dateArray[index];

	var minDate2 = minSelectDate.substring(0, 4) + "-" + minSelectDate.substring(4, 6) + "-" + minSelectDate.substring(6, 8);
	var maxDate2 = maxSelectDate.substring(0, 4) + "-" + maxSelectDate.substring(4, 6) + "-" + maxSelectDate.substring(6, 8);

	var riqi = JSON.stringify(data);

	document.getElementById("my-input").style.display = "none";
	$('#my-input2').fdatepicker({
		onRender: function(date) {

			return(riqi.indexOf(getNowFormatDate(date)) >= 0) ? '' : 'disabled';

		}
	}).on('changeDate', function(ev) {
		var newDate = new Date(ev.date)
		newDate.setDate(newDate.getDate());
		requestTimeInterval()

	}).data('datepicker');

	//	$("#my-input2").calendar({
	//		minDate: minDate2,
	//		maxDate: maxDate2,
	//		dateFormat: 'yyyymmdd',
	//		onChange: function(p, values, displayValues) {
	//			//判断选择的日期是否在可选范围内
	//			var isvalid = "no";
	//			for(var i = 0; i < dateArray.length; i++) {
	//				if(displayValues == dateArray[i]) {
	//					isvalid = "yes";
	//
	//				} else {
	//
	//				}
	//			}
	//			if(isvalid == "no") {
	//				mui.alert("抱歉，您所选的节假日不能预约");
	//				orderDate = "";
	//			} else {
	//				orderDate = displayValues[0];
	//				orderTime = "";
	//				//请求当天可预约时间段
	//				requestTimeInterval();
	//			}
	//		}
	//	});
}
//点击时间段的方法
function clickTime(index) {

	var timelis = document.getElementsByClassName("timeli");
	for(var i = 0; i < timelis.length; i++) {
		timelis[i].style.backgroundColor = "#FFFFFF";
		//		var div = timelis[i].childNodes[1];
		//		div.style.color = "#333333";
	}
	var timedivs = document.getElementsByClassName("timediv");
	for(var i = 0; i < timedivs.length; i++) {
		timedivs[i].style.color = "#333333";
	}

	document.getElementById(index).style.backgroundColor = "#338dff";

	var divid = "div" + index;
	var divselected = document.getElementById(divid);
	divselected.style.color = "#FFFFFF";
	orderTime = divselected.innerText;

}
//获取某个日期的前一天
function getPreDay(s) {
	var y = parseInt(s.substr(0, 4), 10);
	var m = parseInt(s.substr(4, 2), 10) - 1;
	var d = parseInt(s.substr(6, 2), 10);
	var dt = new Date(y, m, d - 1);
	y = dt.getFullYear();
	m = dt.getMonth() + 1;
	d = dt.getDate();
	m = m < 10 ? "0" + m : m;
	d = d < 10 ? "0" + d : d;
	return y + "" + m + "" + d;
}

//获取某个日期的前一天
function getNowFormatDate(da) {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = da.getMonth() + 1;
	var strDate = da.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = da.getFullYear() + month + strDate;
	return currentdate;
}

function getNowFormatDate1(da) {
	var date = new Date() + 2;
	var seperator1 = "-";
	var seperator2 = ":";
	var month = da.getMonth() + 1;
	var strDate = da.getDate() + 3;
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	//	var currentdate = da.getFullYear() + seperator1 + month + seperator1 + strDate;

	return strDate;
}

//点击确定办理--提交预约
function clickToOrder() {
	if(orderDate == "") {
		mui.alert("请选择有效的预约日期");
		return;
	} else if(orderTime == "") {
		mui.alert("请选择预约时间段");
		return;
	}
	var requestDateFormat = orderDate.substr(0, 4) + "-" + orderDate.substr(4, 2) + "-" + orderDate.substr(6, 2);
	var beginTime = requestDateFormat + " " + orderTime.substr(0, 5) + ":00";
	var endTime = requestDateFormat + " " + orderTime.substr(orderTime.length - 5, 5) + ":00";
	var date1 = {
		itemcode: itemcode,
		itemname: itemname,
		userid: userInfo.userid,
		username: userInfo.username,
		date: orderDate,
		time: orderTime,
		idcard: userInfo.idnum,
		phone: userInfo.mobile
	}
	//	var date1 = {
	//		qlsxbm: itemcode,
	//		qlsxbm: "D7A8BF5C2930EFF8346432E1B18C8535",
	//		startTime: beginTime,
	//		endTime: endTime,
	//		idcard: userInfo.idnum,
	//		phone: userInfo.mobile
	//
	//	}
	document.getElementById("loading1").style.display = "block";
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
	var target = document.getElementById('food1');
	var spinner = new Spinner(opts).spin(target);
	$.ajax({
		data: date1,
		type: "post",
		//		url: "http://192.168.139.105:8080/yiwu/ywzw/interface/" + "submitOrder.do",
		url: overallInterface + "submitOrder.do",
		timeout: 15000,
		async: true,
		success: function(data) { //请求成功
			document.getElementById('loading1').style.display = 'none';
			var obj = JSON.parse(data);
			if(obj.result == "0") { //预约成功
				window.location.href = "ordersuccess.html?type=01&ordernum=" + "" + "&time=" + "" + "&address=" + "";
			} else {
				mui.alert(obj.message);
			}
		},
		error: function(e) { //请求失败
			document.getElementById('loading1').style.display = 'none';
			mui.alert("提交失败");
		}
	});
}