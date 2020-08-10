/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var startpage = 1;

var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
})
var dataArray1;
var startpage1 = 1;
var storage = window.localStorage;
var userid
//快递单号
var mailNum;

function requestListData(requesttype) {
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
		startpage = 1;
	} else {
		startpage++;
	}

	var date = {
		userid: userid,
		//		userid: '8afacaeb4ecf2528014ed3d162990c03',
		count: 500,
		state: 1,
		page: startpage,
		pageSize: 10
	}

	myRequest({
		url: overallInterface + "ywzw/interface/getDosList.do",
		data: date,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				mui('#scroll1').pullRefresh().endPulldownToRefresh(); //refresh completed
				if(obj.length > 0) { //有数据
					dataArray = [];
					dataArray = obj;
					document.getElementById('scroll1').style.display = 'block';
					document.getElementById('badmessage1').style.display = 'none';
				} else { //无数据
					dataArray = [];
					document.getElementById('badmessage1').style.display = 'block';
					document.getElementById('scroll1').style.display = 'none';
				}
				startpage = 1;
			} else { //加载更多
				if(obj.length > 0) { //有数据
					dataArray = dataArray.concat(obj);
				} else {}
				mui('#scroll1').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i,
						itemid: dataArray[i].projid,
						itemname: dataArray[i].projectName,
						time: dataArray[i].createTime.substring(0, 10)
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById('badmessage1').style.display = 'block';
				document.getElementById('scroll1').style.display = 'none';
			}
			document.getElementById('slider').style.display = 'block';
		},
		fail: function(data) {
			document.getElementById('slider').style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll1').pullRefresh().endPulldownToRefresh(); //refresh completed
				document.getElementById('loading').style.display = 'none';
				document.getElementById('scroll1').style.display = 'none';
				//			mui.alert("加载失败");
				document.getElementById('badmessage1').style.display = 'block';
			} else { //加载更多
				mui('#scroll1').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
				alert("没有更多办件了！");
			}

		}
	});
}

function requestListData1(requesttype) {
	if(requesttype == 0) {
		startpage1 = 1;
	} else {
		startpage1++;
	}
	var date = {
		userid: userid,
		//		userid: '8afacaeb4ecf2528014ed3d162990c03',
		count: 500,
		state: 2,
		page: startpage1,
		pageSize: 10
	}
	myRequest({
		url: overallInterface + "ywzw/interface/getDosList.do",
		data: date,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				if(obj.length > 0) { //有数据
					dataArray1 = [];
					dataArray1 = obj;
					document.getElementById('scroll2').style.display = 'block';
					document.getElementById('badmessage2').style.display = 'none';
				} else { //无数据
					dataArray1 = [];
					document.getElementById('scroll2').style.display = 'none';
					document.getElementById('badmessage2').style.display = 'block';
				}
				startpage = 1;
			} else { //加载更多
				if(obj.length > 0) { //有数据
					dataArray1 = dataArray1.concat(obj);
				} else {}
				mui('#scroll2').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray1.length > 0) { //有数据
				example1.items1 = [];
				for(var i = 0; i < dataArray1.length; i++) {
					example1.items1.push({
						index: i,
						itemid: dataArray1[i].projid,
						itemname: dataArray1[i].projectName,
						time: dataArray1[i].createTime.substring(0, 10)
					});
					if(i == 0) {
						document.getElementById("parent1").style.display = "block";
					}
				}
			} else { //无数据

			}
			document.getElementById('slider').style.display = 'block';
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('scroll2').style.display = 'none';
			document.getElementById('slider').style.display = 'block';
			//			mui.alert("加载失败");
			document.getElementById('badmessage2').style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll2').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#scroll2').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
		}
	});
}

function requestDoContent(doid) {
	var date = {
		doid: doid
	}
	myRequest({
		url: overallInterface + "ywzw/interface/getDoDetail.do",
		data: date,
		header: '',
		success: function(data) { //请求成功
			document.getElementById('loading').style.display = 'none';
			fillDatainView(data);
		},
		fail: function(data) { //请求失败
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");

		}
	});

}

function fillDatainView(data) {
	document.getElementById('cont').style.display = 'block';
	if(!(new RegExp("\\S+")).test(data)) {
		return
	}
	var obj = data;
	var dataArray = [];
	dataArray = obj.info;

	//服务事项
	var fwsx = dataArray[0].serviceName;
	//申报时间
	var sbsj = dataArray[0].createTime;
	//处理部门
	var clbm = dataArray[0].deptName;
	//查询编号
	var cxbh = dataArray[0].projId;
	//办件状态
	var bjzt = dataArray[0].handleState;
	//快递单号
	mailNum = dataArray[0].mailNum;
	//办件所属人（先转化为unicode再md5加密）
	name = dataArray[0].applyName;
	var data = name;
	var str = '';
	for(var i = 0; i < data.length; i++) {
		str += "\\u" + parseInt(data[i].charCodeAt(0), 10).toString(16);
	}
	name = hex_md5(str);

	//身份证（md5加密）
	ident = dataArray[0].applyCardNumber;
	ident = hex_md5(ident);
	//填充基本信息数据
	document.getElementById("fwsx").innerHTML = fwsx;
	document.getElementById("sbsj").innerHTML = sbsj;
	document.getElementById("clbm").innerHTML = clbm;
	document.getElementById("cxbh").innerHTML = cxbh;
	document.getElementById("bjzt").innerHTML = bjzt;
}