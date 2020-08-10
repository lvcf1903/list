var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var obj;
var date;
var openState;
var flag;
//网上办事分类列表
function getClassifySeach(onlinetype, keyword, pid) {

	var requesturl;
	if(onlinetype == 01) {
		//预约
		requesturl = overallInterface + "ywzw/interface/getDept.do";
		date = {
			siteid: vsiteid,
			keyword: keyword
		}
	} else if(onlinetype == 02) {
		//办事
		requesturl = overallInterface + "ywzw/interface/getMatterCol.do";
		date = {
			siteid: vsiteid,
			keyword: keyword,
			pid: pid
		}
	}
	myRequest({
		async: true,
		url: requesturl,
		data: date,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if((new RegExp("\\S+")).test(obj)) {
				//有数据
				dataArray = [];
				dataArray = obj.infoList;
				//				dataArray = obj;
				if(dataArray.length > 0) {
					document.getElementById('badmessage').style.display = 'none';
					document.getElementById('listcontent').style.display = 'block';
				} else {
					document.getElementById('listcontent').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
				}
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var imgurl = '';
					if(!(new RegExp("\\S+")).test(dataArray[i].imgurl) || dataArray[i].imgurl == null) {
						imgurl = '../source/images/classify_default_icon.png';
					} else {
						imgurl = dataArray[i].imgurl;
					}
					example.items.push({
						index: i,
						colname: dataArray[i].name,
						colid: dataArray[i].id,
						colcount: dataArray[i].matternum,
						validitykey: dataArray[i].validitykey,
						coloutlink: dataArray[i].outlink,
						colimgurl: imgurl
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
						document.getElementById("listcontent").style.display = "block";
					}
				}
			} else { //无数据
				dataArray = [];
				document.getElementById('badmessage').style.display = 'block';
				document.getElementById("listcontent").style.display = "none";
				//				mui.alert("暂无数据");
			}
		},
		fail: function(data) {
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
			document.getElementById('badmessage').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
			document.getElementById("listcontent").style.display = "none";
			alert("加载失败");
		}
	});

}