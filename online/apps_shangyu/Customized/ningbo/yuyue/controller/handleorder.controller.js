var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
});
var userInfo = localStorage.userInfo;
userInfo = JSON.parse(userInfo);
//预约日期
var orderDate = "";
//预约时间段
var orderTime = "";
//时段唯一标识
var orderTimeid = "";
//预约时间段类型
var orderTimetype = "";
//事项基本信息
var itemInfo;
var sitename;
// 请求可预约时间
function requestTime() {
	document.getElementById('loading').style.display = 'block';
	$.ajax({
		url: overallInterface + "interface/ningbo/requestOrderTime.do",
		data: {
			serviceid: itemcode
		},
		dataType: "json",
		success: function(data) {
			document.getElementById('parent').style.display = 'block';
			if(data.result == "01") {
				requestTiemSuccess(data);
				requestTimeInterval(data);
				requestItemInfo();
			} else {
				mui.alert(data.resultmsg);
			};
			document.getElementById('loading').style.display = 'none';
		},
		error: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui.alert("获取预约日期失败");
		}
	});

};

//设置预约日期
function requestTiemSuccess(data) {
	//预约配置信息
	var configdata = data.bookConfigData;
	var now = new Date();
	//可预约最早时间	
	now.setDate(now.getDate() + parseInt(configdata.AHEAD_DAY));
	orderDate = getNowFormatDate(now);
	document.getElementById("my-input2").dataset.date = formatTime(now);
	var riqi = [];
	riqi.push(formatTime(now));
	//可预约天数
	for(var i = 1; i < parseInt(configdata.BOOKING_DAY); i++) {
		now.setDate(now.getDate() + 1)
		riqi.push(formatTime(now));
	}
	$('#my-input2').fdatepicker({
		onRender: function(date) {
			return(riqi.indexOf(getNowFormatDate(date)) >= 0) ? '' : 'disabled';
		}
	}).on('changeDate', function(ev) {
		var newDate = new Date(ev.date)
		newDate.setDate(newDate.getDate());
		orderDate = getNowFormatDate(newDate);
	}).data('datepicker');
};

// 可预约时间段
function requestTimeInterval(data) {
	var timeData = data.bookTimeData;
	example.items = [];
	for(var i = 0; i < timeData.length; i++) {
		example.items.push({
			index: i + 1,
			timeid: timeData[i].TIME_ID,
			timetype: timeData[i].TIME_TYPE,
			time: timeData[i].START_TIME + "-" + timeData[i].END_TIME
		})
	}
};

//获取事项相关信息
function requestItemInfo() {
	myRequest({
		url: overallInterface + "ywzw/interface/requestItemInfo.do",
		data: {
			itemcode: itemcode
		},
		header: '',
		success: function(data) {
			if(data.result == 1) {
				itemInfo = data;
				siteid = itemInfo.siteid;
				itemname = itemInfo.itemname;
				sitename = itemInfo.sitename;
				document.getElementById("itemname").innerHTML = "预约事项：  " + itemname;
			} else {
				mui.alert(data.msg);
			};
		}
	})
};

// 点击时间段的方法
function clickTime(index, timeid, timetype) {
	var timelis = document.getElementsByClassName("timeli");
	for(var i = 0; i < timelis.length; i++) {
		timelis[i].style.backgroundColor = "#e9e9e9";
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
	orderTimeid = timeid;
	orderTimetype = timetype;
	if(orderTimetype == 1) {
		document.getElementById("necessary").style.display = "block";
	} else {
		document.getElementById("necessary").style.display = "none";
		document.getElementById("cause").value = "";
	}
};

// 获取某个日期的前一天
function getNowFormatDate(da) {
	var month = da.getMonth() + 1;
	var strDate = da.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = da.getFullYear() + "-" + month + "-" + strDate;
	return currentdate;
};

//时间格式化
function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1,
		month = month < 10 ? '0' + month : month;
	var day = date.getDate(),
		day = day < 10 ? '0' + day : day;
	return year + "-" + month + "-" + day;
};

// 点击确定办理--提交预约
function clickToOrder(token) {
	var cause = document.getElementById("cause").value;
	if(orderDate == "") {
		mui.alert("请选择有效的预约日期");
		return;
	} else if(orderTime == "") {
		mui.alert("请选择预约时间段");
		return;
	} else if(orderTimetype == 1 && cause == "") {
		mui.alert("请填写非预约时间段原因");
		return;
	}
	$("#submitbtn0").attr('disabled', true);
	document.getElementById('loading').style.display = 'block';
	var bookInfo = {
		USERID: userInfo.userid,
		USER_NAME: userInfo.username,
		SERVICEID: itemcode,
		SERVICE_BASE_CODE: itemInfo.basecode,
		SERVICE_NAME: itemname,
		DEPT_NO: itemInfo.orgcode,
		DEPT_NAME: itemInfo.groupname,
		APPLY_NAME: userInfo.username,
		APPLY_CARD: userInfo.idnum,
		APPLY_PHONE: userInfo.mobile,
		APPLY_REASON: cause,
		BOOK_TYPE: orderTimetype,
		BOOK_DATE: orderDate,
		BOOK_TIME: orderTime,
		TIME_ID: orderTimeid,
		REMARK: ""
	};
	bookInfo = JSON.stringify(bookInfo);
	$.ajax({
		url: overallInterface + "interface/ningbo/requestOrderSubmit.do",
		data: {
			serviceid: itemcode,
			bookDate: orderDate,
			bookTime: orderTime,
			bookInfo: bookInfo
		},
		dataType: "json",
		success: function(data) {
			if(data.result == "01") {
				window.location.href = "odersuccess.html?bookno=" + data.bookno + "&siteid=" + siteid + "&sitename=" + sitename;
			} else {
				document.getElementById('loading').style.display = 'none';
				mui.alert(data.resultmsg);
			};
			$("#submitbtn0").attr('disabled', false);
		},
		error: function(data) {
			mui.alert("预约失败");
		}
	})
};

window.addEventListener('resize', function() {
	if(document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
		window.setTimeout(function() {
			document.activeElement.scrollIntoViewIfNeeded()
		}, 0)
	}
});