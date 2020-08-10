function getGovernContentData(resourceid, titleid) {
	var date = {
		siteid: vsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		resourceid: resourceid,
		titleid: titleid
	};
	myRequest({
		url: wmhhttp + "interfaces/infocontent.do",
		data: date,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			//			document.getElementById('main').style.display = 'block';
			if(data != null) {
				var obj = data;
				//赋值
				document.getElementById('title').innerHTML = obj.titletext;
				document.getElementById('date').innerHTML = format(parseInt(obj.time), 'yyyy-MM-dd') +
					"&nbsp&nbsp" + obj.source;
				document.getElementById("content").innerHTML = obj.titlecontent;
			}
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");
		}
	});

}