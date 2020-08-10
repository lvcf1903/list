var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var startpage = 0;

function requestMyMessage(requesttype) {
	if(requesttype == 0) {
		startpage = 0;
	} else {
		startpage++;
	}
	var date = {
		//			pagenum: "1",
		startpage: startpage,
		pagesize: "10",
		webid: "1"
	}
	
	document.getElementById('loading').style.display = 'block';
	
	myRequest({
		  url: zjzwurl + "app/interface/new/getInfoList.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var obj;
			if(requesttype == 0) { //刷新
				if(data != null) {//有数据
					obj = data;
					dataArray = [];
					dataArray = obj.infolist;
				} else { //无数据
					dataArray = [];
					mui.alert("暂无数据");
				}
				startpage = 0;
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				if(data.length > 0) {//有数据
					obj = JSON.parse(data);
					dataArray = dataArray.concat(obj.infolist);
				} else {
					
				}
				
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var d = new Date()
					d.setTime(dataArray[i].time);
					var convertTime1 = convertTime(d).split(" ")[0];
					example.items.push({
						index:i,
						infoid: dataArray[i].infoid,
						columnid: dataArray[i].columnId,
						webid:obj.webid,
						title: dataArray[i].title,
						source: dataArray[i].source,
						time: convertTime1
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
			//				document.getElementById('loading').style.display = 'none';
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			} else { //加载更多
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(data.length == 0); //参数为true代表没有更多数据了。
			}
			mui.alert("加载失败");
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