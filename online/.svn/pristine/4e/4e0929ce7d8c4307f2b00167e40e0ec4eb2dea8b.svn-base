//-------------------------------------------------以下是handleorder.html中的方法 （因为handleorder.html中用到了sui的日历选择，如果引jQuery会冲突，因此方法写在这里了）
//var jiadate = "{\"resttime\":[\"20161124\",\"20161125\",\"20161128\",\"20161129\",\"20161130\",\"20161201\",\"20161202\",\"20161205\",\"20161206\",\"20161207\",\"20161208\",\"20161209\",\"20161220\",\"20161221\",\"20161222\",\"20161223\",\"20161224\",\"20161224\"]}";
var orderDate = "";
var orderTime = "";
var storage = window.localStorage;
var userInfo;
var container = containerT();
if(container == "web") { //微信
	userInfo = storage.wxuserInfo;
	userInfo = JSON.parse(userInfo);
} else { //app 0-0-op
	userInfo = storage.userInfo;
	userInfo = JSON.parse(userInfo);
}
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
		siteid: vsiteid,
		time: currentDate
	};

	myRequest({
		url: overallInterface + 'ywzw/interface/getOrderTime.do',
		data: json,
		header: '',
		success: function(data) {
			//			alert(JSON.stringify(data));
			requestTiemSuccess(data);

		},
		fail: function(data) {
			//			document.getElementById('loading').style.display = 'none';
			mui.alert("获取预约日期失败");
		}
	});
	//	
	//	$.ajax({
	//		data: date,
	//		type: "post",
	//		url: overallInterface + "ywzw/interface/getOrderTime.do",
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

	var json = {
		siteid: vsiteid,
		itemcode: itemcode,
		date: requestDate
	};

	myRequest({
		url: overallInterface + 'ywzw/interface/getOrderIntervalTime.do',
		data: json,
		header: '',
		success: function(data) {

			fillTimeIntervalData(data.alltime, data.validtime);
		},
		fail: function(data) {

		}
	});
	//	$.ajax({
	//		data: data,
	//		type: "post",
	//		url: overallInterface + "ywzw/interface/getOrderIntervalTime.do",
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

var lihtml = "<li id=\"{{item.index}}\" class=\"col-50 timeli\" style=\"vertical-align:middle;height:40px;margin-bottom: 20px;background: #e9e9e9;width: 44%;\" onclick=\"clickTime('{{item.indexa}}')\"><div class=\"timediv\" id=\"div{{item.indexb}}\"  align=\"center\" style=\"color:#333333;height: 40px;line-height: 40px;\">{{item.time}}</div></li>";
var lihtmlNoValid = "<li id=\"{{item.index}}\" class=\"col-50\" style=\"vertical-align:middle;height:40px;margin-bottom: 20px;background: #e9e9e9;width: 44%;\"><div id=\"div{{item.indexb}}\"  align=\"center\" style=\"color:#CCCCCC;height: 40px;line-height: 40px;\">{{item.time}}</div></li>";

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
	orderDate = minSelectDate;
	var vdate = minSelectDate.substring(0, 4) + "-" + minSelectDate.substring(4, 6) + "-" + minSelectDate.substring(6, 8);
	document.getElementById("my-input2").dataset.date = vdate;
	//需要获取到最小一天的前一天（因为sui日历控件设置的minDate不包含那一天）
	minSelectDate = getPreDay(minSelectDate);
	var index = dateArray.length - 1;
	var maxSelectDate = dateArray[index];

	var minDate2 = minSelectDate.substring(0, 4) + "-" + minSelectDate.substring(4, 6) + "-" + minSelectDate.substring(6, 8);
	var maxDate2 = maxSelectDate.substring(0, 4) + "-" + maxSelectDate.substring(4, 6) + "-" + maxSelectDate.substring(6, 8);

	var riqi = JSON.stringify(data);

	$('#my-input2').fdatepicker({
		leftArrow: '<i class="fa fa-pencil fa-fw">keyboard_arrow_left</i>',
		rightArrow: '<i class="fa fa-pencil fa-fw">keyboard_arrow_right</i>',
		onRender: function(date) {

			return(riqi.indexOf(getNowFormatDate(date)) >= 0) ? '' : 'disabled';
		}
	}).on('changeDate', function(ev) {
		var newDate = new Date(ev.date)
		newDate.setDate(newDate.getDate());
		orderDate = getNowFormatDate(newDate);
		requestTimeInterval();
		//		alert(orderDate);

	}).data('datepicker');

}
//点击时间段的方法
function clickTime(index) {

	var timelis = document.getElementsByClassName("timeli");
	for(var i = 0; i < timelis.length; i++) {
		timelis[i].style.backgroundColor = "#e9e9e9";
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
	var currentdate = da.getFullYear() + "" + month + strDate;
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
function clickToOrder(token) {
	if(orderDate == "") {
		mui.alert("请选择有效的预约日期");
		return;
	} else if(orderTime == "") {
		mui.alert("请选择预约时间段");
		return;
	}
	document.getElementById('loading1').style.display = 'block';

	$("#submitbtn0").attr('disabled', true);
	var requestDateFormat = orderDate.substr(0, 4) + "-" + orderDate.substr(4, 2) + "-" + orderDate.substr(6, 2);
	var beginTime = requestDateFormat + " " + orderTime.substr(0, 5) + ":00";
	var endTime = requestDateFormat + " " + orderTime.substr(orderTime.length - 5, 5) + ":00";
	var json = {
		itemcode: itemcode,
		itemname: itemname,
		userid: userInfo.userid,
		username: userInfo.username,
		date: orderDate,
		time: orderTime,
		siteid: vsiteid,
		phone: userInfo.mobile,
		deptid: colid
	};
	myRequest({
		url: overallInterface + "ywzw/interface/submitOrder.do",
		data: json,
		header: '',
		success: function(data) { //请求成功
			document.getElementById('loading1').style.display = 'none';
			var obj = data;

			storage.orderWindowName = obj.address;
			storage.orderNumber = obj.ordernum;
			if(obj.result == "true") {
				window.location.href = "odersuccess.html?type=01&ordernum=" + obj.ordernum + "&time=" + obj.time + "&address=" + obj.address + "&siteid=" + vsiteid + "&cityname=" + cityName;
			} else {
				$("#submitbtn0").attr('disabled', false);
				mui.alert(obj.message);
			}
		},
		fail: function(data) {
			$("#submitbtn0").attr('disabled', false);
			document.getElementById("loading1").style.display = "none";
		}
	});
}