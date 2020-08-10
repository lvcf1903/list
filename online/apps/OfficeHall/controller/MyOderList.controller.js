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

function requestListData(requesttype, state) {
	dealstate = state;
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

	if(requesttype == 0) {
		pagenum = 1;
	} else {
		pagenum++;
	}
	var date = {
		userid: userid,
		//				userid: '8afac0cc558fd69001559ef65d546038',
		pagenum: pagenum,
		pagesize: 10,
		dealstate:dealstate
	}
	myRequest({
		url: overallInterface + "ywzw/interface/getMyOrderList.do",
		data: date,
		header: '',
		success: function(data) {
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				if(obj.length > 0) { //有数据
					dataArray = [];
					dataArray = obj;
					document.getElementById('badmessage').style.display = 'none';
					document.getElementById('list').style.display = 'block';
				} else { //无数据
					dataArray = [];
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
				}
				pagenum = 1;
			} else { //加载更多
				if(obj.length > 0) { //有数据
					dataArray = dataArray.concat(obj);
				} else {}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i,
						itemid: dataArray[i].orderid,
						itemname: dataArray[i].ordername,
						windowname: dataArray[i].windowname,
						ordernum: dataArray[i].ordernum,
						ordertime: dataArray[i].ordertime,
						time: dataArray[i].time
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
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
		}
	});
}