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

var dataArray = '';
var pagenum = 0;
var type;
var topid = '';
var orderid = '';

function getListData(requesttype, resourceid) {
	if(requesttype == 0) {
		pagenum = 0;
		type = 1;
	} else {
		pagenum++;
		type = 2;
	}
	var data = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		resourceid: resourceid,
		topid: topid,
		orderid: orderid,
		time: '',
		flag: '',
		type: type,
		page: "10"
	};
	myRequest({
		  url: wmhurl + "/interfaces/infolist.do",
          data: data,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray = [];
					dataArray = obj.resource[0].resourcetitle;
					if(dataArray.length > 0) {
						document.getElementById('badmessage').style.display = 'none';
						document.getElementById('list').style.display = 'block';
					} else {
						document.getElementById('list').style.display = 'none';
						document.getElementById('badmessage').style.display = 'block';
					}
					resourceid = obj.resource[0].resourceid;
				} else { //无数据
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
					dataArray = [];
					//					mui.alert("暂无数据");
				}
				pagenum = 0;
			} else {
				//加载更多
				if((new RegExp("\\S+")).test(obj)) { //有数据
					dataArray = dataArray.concat(obj.resource[0].resourcetitle);
					resourceid = obj.resource[0].resourceid;
				} else {
					//					mui.alert("无更多数据");
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(obj.length == 0); //参数为true代表没有更多数据了。
			}

			if(data != null) { //有数据
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
			}
          },
          fail:function(data){
			document.getElementById('badmessage').style.display = 'block';
			document.getElementById('list').style.display = 'none';
			document.getElementById('loading').style.display = 'none';
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
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