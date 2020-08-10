var example1 = new Vue({
	el: '#parent',
	data: {
		matters: []
	}
})
var dataArray;
var pagenum = 1;
var foruser;

/*
 * 新增 foruser 字段  1.企业 2.个人 3.个人和企业
 * 
 */

//请求网上预约列表
function requestOrderList(requesttype, keyword) {

	if(requesttype == 0 || requesttype == 1) {
		pagenum = 1;
	} else {
		pagenum++;
	}
	var date;
	var requesturl;
	//判断是网上预约 还是网上办证（证明）
	if(onlinetype == "01") { //01网上预约
		date = {
			siteid: vsiteid,
			pagenum: pagenum,
//			usertype: usertype,
			//			colid: colid, //所属的分类id
			pagesize: "15", //此字段写死成15不能改，因为后台每页固定放15条数据，pagesize是几就取当前页的前几条数据
			keyword: keyword
		}
		requesturl = overallInterface + "ywzw/interface/searchOrderInfoList.do";
	} else if(onlinetype == "02") { //02 网上办证
		date = {
			pagenum: pagenum,
			pagesize: "15", //15的原因同上
//			usertype: usertype,
			//			colid: colid, //所属的分类id
			siteid: vsiteid,
			keyword: keyword
		}
		requesturl = overallInterface + "ywzw/interface/searchOnlineHandleInfoList.do";
	}
	document.getElementById('loading').style.display = 'block';
	//菊花
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

	myRequest({
		async: true,
		url: requesturl,
		data: date,
		header: '',
		success: function(data) { //成功
			document.getElementById('loading').style.display = 'none';
			var obj = data;
			if(requesttype == 0 || requesttype == 1) { //刷新
				//				if(requesttype == 1) {
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				//				}
				if(obj.length > 0) { //有数据

					dataArray = [];
					dataArray = obj;
				} else { //无数据
					dataArray = [];
					//					mui.alert("暂无数据");
				}
				pagenum = 1;
			} else { //加载更多
				if(obj.length > 0) { //有数据

					dataArray = dataArray.concat(obj);
				} else {

				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example1.matters = [];
				for(var i = 0; i < dataArray.length; i++) {
					if(onlinetype == "01") { //01网上预约
						example1.matters.push({
							index: i,
							name: dataArray[i].name,
							vid: dataArray[i].id,
							itemcode: dataArray[i].addType,
							webid: dataArray[i].webid,
							addType: dataArray[i].addType,
							department: dataArray[i].groupname,
							colId: dataArray[i].colId,
							foruser: dataArray[i].foruser
						});
					} else {
						//判断个人法人
						var userType;
						foruser = dataArray[i].foruser;
						if(foruser == "2") {
							userType = "法人用户";
						} else if(foruser == "1") {
							userType = "个人用户";
						} else if(foruser == "3") {
							userType = "民间组织";
						} else if(foruser == "4") {
							userType = "个人用户，法人用户";
						} else if(foruser == "6") {
							userType = "法人用户，民间组织";
						} else if(foruser == "5") {
							userType = "个人用户，民间组织";
						} else if(foruser == "7") {
							userType = "个人用户，法人用户，民间组织";
						} else {
							userType = "暂无";
						}
						var lxdh = dataArray[i].lxmobile.split("、")[0]; //取第一个电话
						var jddh = dataArray[i].jdmobile.split("、")[0]; //取第一个电话
						var vcntime = dataArray[i].cntime;
						if((new RegExp("\\S+")).test(vcntime) && vcntime != null && vcntime != -1) { //判断字符串是否为空或都是空格
							vcntime += '天';
						} else {
							vcntime = '无期限';
						}

						example1.matters.push({
							index: i,
							name: dataArray[i].name,
							vid: dataArray[i].id,
							department: dataArray[i].groupname,
							cntime: vcntime,
							lxmobile: lxdh,
							jdmobile: jddh,
							sfspyz: dataArray[i].sfspyz,
							bdcl: dataArray[i].bdcl,
							itemcode: dataArray[i].itemcode,
							webid: dataArray[i].webid,
							addType: dataArray[i].addType,
							sfly: dataArray[i].sfly,
							userType: userType,
							foruser:dataArray[i].foruser,
							appurl: dataArray[i].appurl,
							colId: dataArray[i].colId,
							validityKey: dataArray[i].validityKey
						});
					}

					if(i == 0) {
						document.getElementById("parent").style.display = "block";
						document.getElementById("badmessage").style.display = "none";
						document.getElementById("pullrefresh").style.display = "block";
						document.getElementById("listcontent").style.display = "block";
					}
				}
				setTimeout(hideDetailTable, 5);
			} else { //无数据
				document.getElementById("badmessage").style.display = "block";
				document.getElementById("parent").style.display = "none";
			}
		},
		fail: function(data) { //失败
			document.getElementById('loading').style.display = 'none';
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed

			} else { //加载更多
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
			mui.alert("加载失败");
			document.getElementById("badmessage").style.display = "block";
			document.getElementById("parent").style.display = "none";
		}
	});
}

function hideDetailTable() {
	//判断容器类型，浏览器还是APP
	var userInfo;
	if(container == "web") {
		//				requestToken();
		userInfo = storage.wxuserInfo;
		if(userInfo) {
			userInfo = JSON.parse(userInfo);
		}

	} else { //app 使用jssdk获取用户信息
		userInfo = storage.userInfo;
		if(userInfo) {
			userInfo = JSON.parse(userInfo);
		}

	}
	//onlinetype:01 网上预约  02网上办证  3网上证明
	if(onlinetype == "01") { //网上预约
		var submitBtns = document.getElementsByClassName("submitbtn");
		for(var i = 0; i < submitBtns.length; i++) {
			//			submitBtns[i].innerHTML = "我要预约";
		}
		var details = document.getElementsByClassName("detailTable");
		for(var i = 0; i < details.length; i++) {
			details[i].style.display = "none";
		}

		var onlinedeclares = document.getElementsByClassName("onlinedeclare");
		for(var i = 0; i < onlinedeclares.length; i++) {
			onlinedeclares[i].style.display = "none";
		}
		var onlineorders = document.getElementsByClassName("onlineorder");
		for(var i = 0; i < onlineorders.length; i++) {
			onlineorders[i].style.display = "block";
		}
	} else { //网上办证
		var submitBtns = document.getElementsByClassName("submitbtn");
		for(var i = 0; i < submitBtns.length; i++) {
			submitBtns[i].innerHTML = "在线办理";

			
		}
		var details = document.getElementsByClassName("detailTable");
		for(var i = 0; i < details.length; i++) {
			details[i].style.display = "block";
		}
		var onlinedeclares = document.getElementsByClassName("onlinedeclare");
		for(var i = 0; i < onlinedeclares.length; i++) {
			onlinedeclares[i].style.display = "block";
		}
		var onlineorders = document.getElementsByClassName("onlineorder");
		for(var i = 0; i < onlineorders.length; i++) {
			onlineorders[i].style.display = "none";
		}
	}
}