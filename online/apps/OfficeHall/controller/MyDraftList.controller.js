var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var pagenum = 1;

var storage = window.localStorage;
var userInfo;

function requestListData() {
	//判断容器类型，浏览器还是APP
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
		siteid: vsiteid
	}
	myRequest({
		url: overallInterface + "ywzw/interface/getDraftList.do",
		data: date,
		header: '',
		success: function(data) {
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			if(obj.infoList.length > 0) { //有数据
				dataArray = [];
				dataArray = obj.infoList;
				document.getElementById('badmessage').style.display = 'none';
				document.getElementById('list').style.display = 'block';
			} else { //无数据
				dataArray = [];
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var d = new Date();
					d.setTime(dataArray[i].createtime);
					var convertTime1 = convertTime(d);
//					var vjson = dataArray[i].json;
//					var zjson = JSON.parse(vjson);
//					var validitykey = zjson.validitykey;
					example.items.push({
						index: i,
						itemid: dataArray[i].iid,
						itemname: dataArray[i].servicename,
						itemurl: dataArray[i].url,
//						itemjson: vjson,
//						validitykey: zjson.validitykey,
//						code: zjson.code,
//						deptid: zjson.deptid,
//						siteid: zjson.siteid,
//						bdcl: zjson.bdcl,
//						itemcodeid: zjson.itemcodeid,
						itemtime: convertTime1
					});
					if(i == 0) {
						document.getElementById("pullrefresh").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}
	});
}

function requestDeleteData(iid) {
	var date = {
		iid: iid
	}
	myRequest({
		url: overallInterface + "ywzw/interface/removeDraftInfo.do",
		data: date,
		header: '',
		success: function(data) {
			if(data.result == true) { //提交表单成功
//				alert("删除成功");
			} else {
//				alert("删除失败");
			}
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}
	});
}


function convertTime(now) {
	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var ss = now.getSeconds(); //秒

	var clock = year + "-";

	if(month < 10)
		clock += "0";

	clock += month + "-";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	if(hh < 10)
		clock += "0";

	clock += hh + ":";
	if(mm < 10) clock += '0';
	clock += mm + ":";

	if(ss < 10) clock += '0';
	clock += ss;
	return(clock);
}