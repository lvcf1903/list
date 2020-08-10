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
var startpage = 0;

var storage = window.localStorage;
var userInfo = JSON.parse(storage.wxuserInfo);
var userid = userInfo.userid;

function requestListData(requesttype) {
	if(requesttype == 0) {
		startpage = 0;
	} else {
		startpage++;
	}
	var date = {
		userid: userid,
		startpage: startpage,
		start: startpage * 10,
		size: 10
	}
	
	myRequest({
		  url: zjzwurl + "app/interface/collectList.do",
          data: date,
          header:'',
          success:function(data){
          	
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			var obj;
			if(requesttype == 0) { //刷新
				if(data.length > 0) { //有数据
					obj = data;
					dataArray = [];
					dataArray = obj;
				} else { //无数据
					dataArray = [];
					mui.alert("暂无数据");
				}
				startpage = 0;
			} else { //加载更多
				if(data.length > 0) { //有数据
					obj = data;
					dataArray = dataArray.concat(obj);
				} else {}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i,
						itemid: dataArray[i].itemid,
						itemname: dataArray[i].itemname,
						type: dataArray[i].type,
						time: dataArray[i].collectdate
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据

			}
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
          }
    });

}