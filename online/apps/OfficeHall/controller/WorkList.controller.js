/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

var worklistvue = new Vue({
	el: '#worklist',
	data: {
		items: []
	}
})

var dataArray;
var pagenum = 0;

function getGrWorkListData(requesttype, themid, deptid, word) {
	if(requesttype == 0) {
		pagenum = 0;
	} else {
		pagenum++;
	}
	var date = {
		webid: 66,
		themid: themid,
		deptid: deptid,
		word: word,
		isoline: 0,
		start: pagenum * 10,
		end: 10
	};
	myRequest({
		  url: zjzwurl + "app/interface/new/getNewGrItems.do",
          data: date,
          header:'',
          success:function(data){
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			var list = '';
//			if("null".equals(data)){
//				return;
//			}
			if((new RegExp("\\S+")).test(data)) {
				list = data;
			}
			if(requesttype == 0) { //刷新
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
				if(list == null){
					dataArray = [];
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
					return;
				}
				if(list.length > 0) { //有数据
					dataArray = [];
					dataArray = list;
					document.getElementById('badmessage').style.display = 'none';
					document.getElementById('list').style.display = 'block';
				} else { //无数据
					dataArray = [];
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
				}
				pagenum = 0;
			} else {
				//加载更多
				if(list.length > 0) { //有数据
					dataArray = dataArray.concat(list);
				} else {
					alert("无更多数据");
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(list.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				worklistvue.items = [];
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					var vname = dataArray[i].name;
					var vdeptallname = dataArray[i].deptallname;
					var vtype = dataArray[i].type;
					var vid = dataArray[i].id;
					var ishave = dataArray[i].isHaveChildren;
					var vmainCode = dataArray[i].maincode;
					var vdeptid = dataArray[i].deptid;

					if(dataArray[i].isHaveChildren == 0) {
						innerhtml = innerhtml + "<li v-for='item in items' id='" + i +
							"' class='mui-table-view-cell' style='margin-bottom: 1px;' ><div class='mui-table'><div id='nr' class='mui-table-cell mui-col-xs-10'>" +
							"<p id='vname" + i + "' class='mui-ellipsis-2' style='color: #222222;font-size: 17px;'>" + vname +
							"</p><p id='vdeptallname" + i + "' class='mui-h6 mui-ellipsis-2' style='margin-top: 5px;color: #999999;font-size: 14px;'>" + vdeptallname +
							"</p><p id='vid" + i + "' style='display: none;'>" + vid +
							"</p><p id='ishave" + i + "' style='display: none;'>" + ishave +
							"</p><p id='vtype" + i + "' style='display: none;'>" + vtype +
							"</p><p id='vmainCode" + i + "' style='display: none;'>" + vmainCode +
							"</p><p id='vdeptid" + i + "' style='display: none;'>" + vdeptid +
							"</div></div></li>";
					} else {
						innerhtml = innerhtml + "<li v-for='item in items' id='" + i +
							"' class='mui-table-view-cell' style='margin-bottom: 1px;' ><div class='mui-table' id='itemdiv'><div id='nr' class='mui-table-cell mui-col-xs-10'>" +
							"<p id='vname" + i + "' class='mui-ellipsis-2' style='color: #222222;font-size: 17px;'>" + vname +
							"</p><p id='vdeptallname" + i + "' class='mui-h6 mui-ellipsis-2' style='margin-top: 5px;color: #999999;font-size: 14px;'>" + vdeptallname +
							"</p><p id='vid" + i + "' style='display: none;'>" + vid +
							"</p><p id='ishave" + i + "' style='display: none;'>" + ishave +
							"</p><p id='vtype" + i + "' style='display: none;'>" + vtype +
							"</p><p id='vmainCode" + i + "' style='display: none;'>" + vmainCode +
							"</p><p id='vdeptid" + i + "' style='display: none;'>" + vdeptid +
							"</div></div></li>";
					}
					document.getElementById('worklist').innerHTML = innerhtml;
					document.getElementById("worklist").style.display = "block";
				}
			}
          },
          fail:function(data){
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

function getFrWorkListData(requesttype, themid, deptid, word) {
	if(requesttype == 0) {
		pagenum = 0;
	} else {
		pagenum++;
	}
	var date = {
		webid: 66,
		themid: themid,
		deptid: deptid,
		word: word,
		isoline: 0,
		start: pagenum * 10,
		end: 10
	};
	myRequest({
		  url: zjzwurl + "app/interface/new/getNewFrItems.do",
          data: date,
          header:'',
          success:function(data){
			//refresh completed
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			var list = '';
			if((new RegExp("\\S+")).test(data)) {
				list = data;
			}
			if(requesttype == 0) { //刷新
				if(list == null){
					dataArray = [];
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
					return;
				}
				if(list.length > 0) { //有数据
					dataArray = [];
					dataArray = list;
					document.getElementById('badmessage').style.display = 'none';
				} else { //无数据
					dataArray = [];
					document.getElementById('badmessage').style.display = 'block';
				}
				pagenum = 0;
			} else {
				//加载更多
				if(list.length > 0) { //有数据
					dataArray = dataArray.concat(list);
				} else {
				}
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(list.length == 0); //参数为true代表没有更多数据了。
			}

			if(dataArray.length > 0) { //有数据
				worklistvue.items = [];
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					worklistvue.items.push({
						index: i,
						name: dataArray[i].name,
						deptallname: dataArray[i].deptallname
					});
					var vname = dataArray[i].name;
					var vdeptallname = dataArray[i].deptallname;
					var vtype = dataArray[i].type;
					var vid = dataArray[i].id;
					var ishave = dataArray[i].isHaveChildren;
					var vmainCode = dataArray[i].maincode;
					var vdeptid = dataArray[i].deptid;

					if(dataArray[i].isHaveChildren == 0) {
						innerhtml = innerhtml + "<li v-for='item in items' id='" + i +
							"' class='mui-table-view-cell' style='margin-bottom: 1px;' ><div class='mui-table'><div class='mui-table-cell mui-col-xs-10'>" +
							"<p id='vname" + i + "' class='mui-ellipsis-2' style='color: #222222;font-size: 17px;'>" + vname +
							"</p><p id='vdeptallname" + i + "' class='mui-h6 mui-ellipsis-2' style='margin-top: 5px;color: #999999;font-size: 14px;'>" + vdeptallname +
							"</p><p id='vid" + i + "' style='display: none;'>" + vid +
							"</p><p id='ishave" + i + "' style='display: none;'>" + ishave +
							"</p><p id='vtype" + i + "' style='display: none;'>" + vtype +
							"</p><p id='vmainCode" + i + "' style='display: none;'>" + vmainCode +
							"</p><p id='vdeptid" + i + "' style='display: none;'>" + vdeptid +
							"</div></div></li>";
					} else {
						innerhtml = innerhtml + "<li v-for='item in items' id='" + i +
							"' class='mui-table-view-cell' style='margin-bottom: 1px;' ><div class='mui-table' id='itemdiv'><div class='mui-table-cell mui-col-xs-10'>" +
							"<p id='vname" + i + "' class='mui-ellipsis-2' style='color: #222222;font-size: 17px;'>" + vname +
							"</p><p id='vdeptallname" + i + "' class='mui-h6 mui-ellipsis-2' style='margin-top: 5px;color: #999999;font-size: 14px;'>" + vdeptallname +
							"</p><p id='vid" + i + "' style='display: none;'>" + vid +
							"</p><p id='ishave" + i + "' style='display: none;'>" + ishave +
							"</p><p id='vtype" + i + "' style='display: none;'>" + vtype +
							"</p><p id='vmainCode" + i + "' style='display: none;'>" + vmainCode +
							"</p><p id='vdeptid" + i + "' style='display: none;'>" + vdeptid +
							"</div></div></li>";
					}
					document.getElementById('worklist').innerHTML = innerhtml;
					if(i == 0) {
						document.getElementById("worklist").style.display = "block";
					}
				}
			}
          },
          fail:function(data){
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