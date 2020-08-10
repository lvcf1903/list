//-------------------------------------------------以下是handleorder.html中的方法 （因为handleorder.html中用到了sui的日历选择，如果引jQuery会冲突，因此方法写在这里了）
//var jiadate = "{\"resttime\":[\"20161124\",\"20161125\",\"20161128\",\"20161129\",\"20161130\",\"20161201\",\"20161202\",\"20161205\",\"20161206\",\"20161207\",\"20161208\",\"20161209\",\"20161220\",\"20161221\",\"20161222\",\"20161223\",\"20161224\",\"20161224\"]}";
var orderDate = "";
var orderTime = "";

var url = location.search;
var theRequest = new Object();
var str = url.substr(1);
strs = str.split("&");
for(var i = 0; i < strs.length; i++) {
	theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
}
var num = decodeURI(theRequest.num);
var groupno = decodeURI(theRequest.groupno);
var groupname = decodeURI(theRequest.groupname);

var tluserinfo=localStorage.getItem("tluserinfo");
tluserinfo=JSON.parse(tluserinfo);
var telephone=tluserinfo.mobile;
var sfz=tluserinfo.idnum;

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
			//			alert(JSON.stringify(data));
			requestTiemSuccess(data);

		},
		fail: function(data) {
			//			document.getElementById('loading').style.display = 'none';
			mui.alert("获取预约日期失败");
		}
	});
	
}
var jiaInterval = "{\"alltime\":[\"9:00-9:30\",\"9:30-10:00\",\"10:00-10:30\",\"10:30-11:00\",\"11:00-11:30\"],\"validtime\":[\"9:00-9:30\",\"9:30-10:00\",\"10:30-11:00\",\"11:00-11:30\"]}";


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

			innerhtml = innerhtml + '<li id=\"' + (i + 1) + '\" class=\"col-50 timeli\" style=\"vertical-align:middle;height:40px;margin-bottom: 20px;background: #ffffff;width: 92%;\" onclick=\"clickTime(' + (i + 1) + ')\"><div class=\"timediv\" id=\"div' + (i + 1) + '\"  align=\"center\" style=\"color:#333333;height: 40px;line-height: 40px;text-align: center;\">' + (alltime[i]) + '</div></li>'
			//			innerhtml = innerhtml + lihtml.replace(/{{item.index}}/, i + 1)
			//				.replace(/{{item.indexa}}/, i + 1)
			//				.replace(/{{item.indexb}}/, i + 1)
			//				.replace(/{{item.time}}/, alltime[i]);
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
		onRender: function(date) {

			return(riqi.indexOf(getNowFormatDate(date)) >= 0) ? '' : 'disabled';
		}
	}).on('changeDate', function(ev) {
		var newDate = new Date(ev.date)
		newDate.setDate(newDate.getDate());
		orderDate = getNowFormatDate(newDate);
		//		alert(orderDate);

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
function clickToOrder() {
	if(orderDate == "") {
		mui.alert("请选择有效的预约日期");
		return;
	} else if(orderTime == "") {
		mui.alert("请选择预约时间段");
		return;
	}
	document.getElementById('loading1').style.display = 'block';

	var requestDateFormat = orderDate.substr(0, 4) + "-" + orderDate.substr(4, 2) + "-" + orderDate.substr(6, 2);
	var beginTime = requestDateFormat + " " + orderTime.substr(0, 5) + ":00";
	if(orderTime.substr(orderTime.length - 5, 1)=="-"){
	var endTime = requestDateFormat + " " + orderTime.substr(orderTime.length - 4, 5) + ":00";
	}else{
	var endTime = requestDateFormat + " " + orderTime.substr(orderTime.length - 5, 5) + ":00";	
	}
	console.log(endTime);
	var checkday = orderTime.substr(orderTime.length - 5, 2);
	var ampm = "";
	if(checkday == "9:") {
		ampm = 1;
	} else if(checkday < 12) {
		ampm = 1;
	} else {
		ampm = 2;
	}
	///
	myRequest({
		data: {
			ctrllerid: num,
			groupno: groupno,
			telephone:telephone,
			sfz: sfz,
			yyrq: requestDateFormat,
			timeslot: orderTime
		},
		header: '',
		url: "http://60.191.18.50/tonglu/tonglu/yuyue/check.do",
		success: function(data) {
			if(data.success == false) {
				$.ajax({
					data: {
						ctrllerid: num,
						groupno: groupno,
						telephone: telephone,
						yyrq: requestDateFormat,
						ampm: ampm,
						sfz:sfz
					},
					type: "get",
					url: "https://tlzwfwzx.com/TL_HALL/rest/hall/statistic/yyh2",
					dataType: "json",
					success: function(data) { //请求成功
						document.getElementById('loading1').style.display = 'none';
						if(data == undefined) {
							mui.alert("预约失败,请稍后再试！");
						} else if(data.length == 0) {
							mui.alert("预约失败,请稍后再试！");
						} else if(data[0].status == "预约成功") {
							var password = data[0].password;
							var message = data[0].message;
							myRequest({
								data: {
									ctrllerid: num,
									groupno: groupno,
									telephone: telephone,
									sfz: sfz,
									number: password,
									endtime: endTime,
									groupname: groupname,
									yyrq: requestDateFormat,
									timeslot: orderTime
								},
								header: '',
								url: "http://60.191.18.50/tonglu/tonglu/yuyue/insertyuyue.do",
								success: function(data) {
									if(data.success == true) {
										window.location.href = "appointmentsuccess.html?password=" + password + "&message=" + message
									} else {
										document.getElementById('loading1').style.display = 'none';
										mui.alert("预约失败,请稍后再试！");
									}
								},
								fail: function(data) { //请求失败
									document.getElementById('loading1').style.display = 'none';
									mui.alert("请检查网络，稍后再试！");
								}
							});

						} else {
							mui.alert(data[0].message);
						}
					},
					error: function(e) { //请求失败
						document.getElementById('loading1').style.display = 'none';
						mui.alert("请检查网络，稍后再试！");
					}
				});
			} else {
				document.getElementById('loading1').style.display = 'none';
				mui.alert("请勿在同一日期和时间段重复预约！");
			}
		},
		fail: function(data) { //请求失败
			document.getElementById('loading1').style.display = 'none';
			mui.alert("请检查网络，稍后再试！");
		}
	});
	///

}