/**
 * server端接口主域名
 */
//var jmpurl = "http://122.226.66.205:8080/jmportal";

//var example = new Vue({
//	el: '#parent',
//	data: {
//		items: []
//	}
//})
//
//var example1 = new Vue({
//	el: '#parent1',
//	data: {
//		items1: []
//	}
//})
//
//var example2 = new Vue({
//	el: '#parent2',
//	data: {
//		items2: []
//	}
//})

var dataArray;
var startpage = 0;
var type;
var topid = '';
var orderid = '';

var dataArray1;
var startpage1 = 0;
var type1;
var topid1 = '';
var orderid1 = '';

var dataArray2;
var startpage2 = 0;
var type2;
var topid2 = '';
var orderid2 = '';

//窗口向导--桌面接口
function getDeskData() {
	var requesturl = wmhhttp + "interfaces/first.do";
	var date = {
		siteid: vsiteid,
		clienttype: 3,
		version: 1.0,
		uuid: 867376024506525
	}

	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) {
			var obj = '';
			var dataArray;
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			dataArray = [];
			dataArray = obj.channels;
			for(var i = 0; i < dataArray.length; i++) {
				var resid = dataArray[i].id;
				if(i == 0) {
					getAllcolUrl(resid);
				}
			}
		},
		fail: function(data) {}
	});
}

//窗口向导--频道下栏目接口
function getAllcolUrl(channelid) {
	var requesturl = wmhhttp + "interfaces/chancates.do";
	var date = {
		siteid: vsiteid,
		clienttype: 3,
		version: 1.0,
		uuid: 867376024506525,
		channelid: channelid
	}

	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) {
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			var dataArray;
			dataArray = [];
			var vhtml = '';
			var vhtml0 = '';
			var vhtml1 = '';
			var vhtml2 = '';
			dataArray = obj.resource;
			for(var i = 0; i < dataArray.length; i++) {
				var resid = dataArray[i].resourceid;
				var resname = dataArray[i].resourcename;
				if(i == 0) {
					vhtml = "<a class=\"mui-control-item mui-active\" href=\"" + "#itemmobile" + i + "\">" + resname + "</a>";
					vhtml2 = '<div id="itemmobile' + i + '" class="mui-slider-item mui-control-content mui-active"><div id="scroll' + i + '" class="mui-scroll-wrapper"><div class="mui-scroll"><ul class="mui-table-view" id="parent' + i + '"></ul></div></div><div id="badmessage' + i + '" class="msgbad" style="display:none"><img style="width:160px;height:160px" src="../source/images/yw_message_bad.png"><p style="width:160px;margin:0;line-height:25px;font-size:14px;text-align:center">暂无数据</p></div></div>';

				} else {
					vhtml = "<a class=\"mui-control-item\" href=\"" + "#itemmobile" + i + "\">" + resname + "</a>";
					vhtml2 = '<div id="itemmobile' + i + '" class="mui-slider-item mui-control-content"><div id="scroll' + i + '" class="mui-scroll-wrapper"><div class="mui-scroll"><ul class="mui-table-view" id="parent' + i + '"></ul></div></div><div id="badmessage' + i + '" class="msgbad" style="display:none"><img style="width:160px;height:160px" src="../source/images/yw_message_bad.png"><p style="width:160px;margin:0;line-height:25px;font-size:14px;text-align:center">暂无数据</p></div></div>';

				}
				document.getElementById("sliderSegmentedControl").innerHTML += vhtml;
				document.getElementById("divlist").innerHTML  += vhtml2;
				requestListData(0, resid, i);
			}
		},
		fail: function(data) {}
	});
}

//综合栏目id--33
function requestListData(requesttype, resid, index) {
	if(requesttype == 0) {
		type = 1;
		startpage = 0;
	} else {
		type = 2;
		startpage++;
	}
	var topid = '';
	var orderid = '';

	var date = {
		siteid: vsiteid,
		clienttype: '3',
		uuid: '867376024506525',
		version: '1.0',
		resourceid: resid,
		topid: topid,
		orderid: orderid,
		time: '',
		flag: '',
		type: type,
		page: "10"
	}

	myRequest({
		url: wmhhttp + "interfaces/infolist.do",
		data: date,
		header: '',
		success: function(data) {
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			var vscroll = 'scroll' + index;
			var vbadmessage = 'badmessage' + index;
			var vparent = 'parent' + index;
			
			if(requesttype == 0) { //刷新
				mui('#scroll' + index).pullRefresh().endPulldownToRefresh(); //refresh completed
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray = [];
					dataArray = obj.resource[0].resourcetitle;
					if(dataArray.length > 0) {
						document.getElementById(vbadmessage).style.display = 'none';
						document.getElementById(vscroll).style.display = 'block';
					} else {
						document.getElementById(vscroll).style.display = 'none';
						document.getElementById(vbadmessage).style.display = 'block';
					}
					resourceid = obj.resource[0].resourceid;
				} else { //无数据
					dataArray = [];
					document.getElementById(vscroll).style.display = 'none';
					document.getElementById(vbadmessage).style.display = 'block';
				}
				startpage = 0;
			} else { //加载更多
				if((new RegExp("\\S+")).test(obj)) { //有数据
					var aar = obj.resource[0].resourcetitle;
					dataArray = dataArray.concat(aar);
					resourceid = obj.resource[0].resourceid;
				} else {}
				mui('#' + vscroll).pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}
			if(dataArray.length > 0) { //有数据
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					var d = new Date();
					d.setTime(dataArray[i].time);
					var convertTime1 = convertTime(d);
					topid = dataArray[dataArray.length - 1].topid;
					orderid = dataArray[dataArray.length - 1].orderid;
					var infoid = dataArray[i].titleid;
					var title = dataArray[i].titletext;
					var titlesubtext = dataArray[i].titlesubtext;
					titlesubtext = '';
					var listtype = dataArray[i].listtype;
					if(listtype == 101) {
						//无正文
						innerhtml += '<li class="mui-table-view-cell" id="' + i + '"><div id="main"><div id="listtype' + index + i + '" style="display:none">' + listtype + '</div><div id="infoid' + index + i + '" style="display:none">' + infoid + '</div><div id="resourceid' + index + i + '" style="display:none">' + resourceid + '</div><div class="nr"><p class="zh">' + title + '</p><span class="sj" style="float:left">' + titlesubtext + '</span></div></div></li>';
					} else {
						//有正文
						innerhtml += '<li class="mui-table-view-cell" id="' + i + '"><div id="main" class="itemdiv"><div id="listtype' + index + i + '" style="display:none">' + listtype + '</div><div id="infoid' + index + i + '" style="display:none">' + infoid + '</div><div id="resourceid' + index + i + '" style="display:none">' + resourceid + '</div><div class="nr"><p class="zh">' + title + '</p><span class="sj" style="float:left">' + titlesubtext + '</span></div></div></li>';
					}
					document.getElementById(vparent).innerHTML = innerhtml;
					if(i == 0) {
						document.getElementById(vparent).style.display = "block";
						document.getElementById("divlist").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById(vbadmessage).style.display = 'block';
				document.getElementById(vscroll).style.display = 'none';
			}
//			alert(document.getElementById('divlist').innerHTML);
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById(vscroll).style.display = 'none';
			document.getElementById(vbadmessage).style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll' + index).pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#scroll' + index).pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
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

	//	if(hh < 10)
	//		clock += "0";
	//
	//	clock += hh + ":";
	//	if(mm < 10) clock += '0';
	//	clock += mm + ":";
	//
	//	if(ss < 10) clock += '0';
	//	clock += ss;
	return(clock);
}