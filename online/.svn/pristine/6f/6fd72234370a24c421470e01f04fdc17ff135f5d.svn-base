/**
 * server端接口主域名
 */
//var jmpurl = "http://122.226.66.205:8080/jmportal";

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
})

var example2 = new Vue({
	el: '#parent2',
	data: {
		items2: []
	}
})

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

//政务资讯分类栏目
function getClassifyData() {
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		cateid: governid
	}
	
	myRequest({
		url: wmhurl + "interfaces/cates.do",
          data: date,
          header:'',
          success:function(data){
          	
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(obj.length > 0) {
				dataArray = [];
				dataArray = obj.resource;
				for(var i = 0; i < dataArray.length; i++) {
					var resname = dataArray[i].resourcename;
					var resid = dataArray[i].resourceid;
				}
			} else { //无数据
				dataArray = [];
				mui.alert("暂无数据");
			}
		
          },
          fail:function(data){
          }
    });
}

//综合栏目id--33
function requestListData(requesttype) {
	if(requesttype == 0) {
		type = 1;
		startpage = 0;
	} else {
		type = 2;
		startpage++;
	}
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		resourceid: resid1,
		topid: topid,
		orderid: orderid,
		time: '',
		flag: '',
		type: type,
		page: "10"
	}
	
	myRequest({
		 url: wmhurl + "interfaces/infolist.do",
          data: date,
          header:'',
          success:function(data){
          	
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				mui('#scroll1').pullRefresh().endPulldownToRefresh(); //refresh completed
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray = [];
					dataArray = obj.resource[0].resourcetitle;
					if(dataArray.length > 0) {
						document.getElementById('badmessage1').style.display = 'none';
						document.getElementById('scroll1').style.display = 'block';
					} else {
						document.getElementById('scroll1').style.display = 'none';
						document.getElementById('badmessage1').style.display = 'block';
					}
					resourceid = obj.resource[0].resourceid;
				} else { //无数据
					dataArray = [];
					document.getElementById('scroll1').style.display = 'none';
					document.getElementById('badmessage1').style.display = 'block';
				}
				startpage = 0;
			} else { //加载更多
				if((new RegExp("\\S+")).test(obj)) { //有数据
					var aar = obj.resource[0].resourcetitle;
					dataArray = dataArray.concat(aar);
					resourceid = obj.resource[0].resourceid;
				} else {}
				mui('#scroll1').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var d = new Date();
					d.setTime(dataArray[i].time);
					var convertTime1 = convertTime(d);
					topid = dataArray[dataArray.length - 1].topid;
					orderid = dataArray[dataArray.length - 1].orderid;
					example.items.push({
						index: i,
						infoid: dataArray[i].titleid,
						resourceid: resourceid,
						title: dataArray[i].titletext,
						source: dataArray[i].source,
						time: convertTime1
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById('badmessage1').style.display = 'block';
				document.getElementById('scroll1').style.display = 'none';
			}
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('scroll1').style.display = 'none';
			document.getElementById('badmessage1').style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll1').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#scroll1').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
          }
    });

}

//通知公告栏目id--34
function requestListData1(requesttype) {
	if(requesttype == 0) {
		startpage1 = 0;
		type1 = 1;
	} else {
		startpage1++;
		type1 = 2;
	}
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		resourceid: resid2,
		topid: topid1,
		orderid: orderid1,
		time: '',
		flag: '',
		type: type1,
		page: "10"
	}
	
	myRequest({
		  url: wmhurl + "interfaces/infolist.do",
          data: date,
          header:'',
          success:function(data){
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray1 = [];
					dataArray1 = obj.resource[0].resourcetitle;
					if(dataArray1.length > 0) {
						document.getElementById('badmessage2').style.display = 'none';
						document.getElementById('scroll2').style.display = 'block';
					} else {
						document.getElementById('scroll2').style.display = 'none';
						document.getElementById('badmessage2').style.display = 'block';
					}
				} else { //无数据
					dataArray1 = [];
					document.getElementById('scroll2').style.display = 'none';
					document.getElementById('badmessage2').style.display = 'block';
				}
				startpage1 = 0;
			} else { //加载更多
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray1 = dataArray1.concat(obj.resource[0].resourcetitle);
				} else {}
				mui('#scroll2').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray1.length > 0) { //有数据
				example1.items1 = [];
				for(var i = 0; i < dataArray1.length; i++) {
					var d = new Date();
					d.setTime(dataArray1[i].time);
					var convertTime1 = convertTime(d);
					topid1 = dataArray1[dataArray1.length - 1].topid;
					orderid1 = dataArray1[dataArray1.length - 1].orderid;
					example1.items1.push({
						index: i,
						infoid: dataArray1[i].titleid,
						columnid: dataArray1[i].columnId,
						title: dataArray1[i].titletext,
						source: dataArray1[i].source,
						time: convertTime1
					});
					if(i == 0) {
						document.getElementById("parent1").style.display = "block";
					}
				}
			} else { //无数据

			}
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('scroll2').style.display = 'none';
			document.getElementById('badmessage2').style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll2').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#scroll2').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
			}
          }
    });
}

//新闻栏目id--35
function requestListData2(requesttype) {
	if(requesttype == 0) {
		startpage2 = 0;
		type2 = 1;
	} else {
		startpage2++;
		type2 = 2;
	}
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		resourceid: resid3,
		topid: topid2,
		orderid: orderid2,
		time: '',
		flag: '',
		type: type2,
		page: "10"
	}
	
	myRequest({
		  url: wmhurl + "interfaces/infolist.do",
          data: date,
          header:'',
          success:function(data){
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				if((new RegExp("\\S+")).test(obj)) { //有数据
					obj = data;
					dataArray2 = [];
					dataArray2 = obj.resource[0].resourcetitle;
					document.getElementById('scroll2').style.display = 'block';
					document.getElementById('badmessage2').style.display = 'none';
				} else { //无数据
					dataArray2 = [];
					document.getElementById('scroll2').style.display = 'none';
					document.getElementById('badmessage2').style.display = 'block';
				}
				startpage2 = 0;
			} else { //加载更多
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray2 = dataArray2.concat(obj.resource[0].resourcetitle);
				} else {
				}
				mui('#scroll3').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray2.length > 0) { //有数据
				example2.items2 = [];
				for(var i = 0; i < dataArray2.length; i++) {
					var d = new Date();
					//					d.setTime(dataArray2[i].time).split(" ")[0];
					d.setTime(dataArray2[i].time);
					var convertTime1 = convertTime(d);
					topid2 = dataArray2[dataArray2.length - 1].topid;
					orderid2 = dataArray2[dataArray2.length - 1].orderid;
					example2.items2.push({
						index: i,
						infoid: dataArray2[i].titleid,
						columnid: dataArray2[i].columnId,
						title: dataArray2[i].titletext,
						source: dataArray2[i].source,
						time: convertTime1
					});
					if(i == 0) {
						document.getElementById("parent1").style.display = "block";
					}
				}
			} else { //无数据

			}
		
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('scroll3').style.display = 'none';
			//			mui.alert("加载失败");
			document.getElementById('badmessage3').style.display = 'block';
			if(requesttype == 0) { //刷新
				mui('#scroll3').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#scroll3').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
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