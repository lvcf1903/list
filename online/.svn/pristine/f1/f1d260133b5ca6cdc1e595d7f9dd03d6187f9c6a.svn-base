var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

//function getWindows() {
//	var requesturl = "https://tlzwfwzx.com/TL_HALL/rest/hall/statistic/itemType";
//	var date = "";
//	myRequest({
//		url: requesturl,
//		data: "",
//		header: '',
//		success: function(data) { //请求成功
//			document.getElementById('loading').style.display = 'none';
//			document.getElementById('listcontent').style.display = 'block';
//			var imgurl = '../source/images/classify_default_icon.png';
//			var dataArray = [];
//			dataArray = data;
//			if(dataArray.length > 0) {
//				for(var i = 0; i < dataArray.length; i++) {
//					example.items.push({
//						index: i,
//						num: dataArray[i].站点编号,
//						name: dataArray[i].站点名称,
//					});
//				}
//
//			}
//		},
//		fail: function(data) { //请求失败
//
//		}
//	});
//}

function getWindows() {
	var url = mainurl+"/interfaces/yuyue/getBMMC.do?yuyuegn=true";
	myRequest({
		    header: '',
			url: url,
			data: "", //这行不能省略，如果没有数据向后台提交也要写成data:{}的形式 
			success: function(data) {
				document.getElementById('loading').style.display = 'none';
				document.getElementById('listcontent').style.display = 'block';
				mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				var imgurl = '../source/images/classify_default_icon.png';
				var dataArray = [];
				dataArray = JSON.parse(data);
				if(data.length > 0) {
					for(var i = 0; i < dataArray.length; i++) {
						example.items.push({
							index: i,
							num: dataArray[i].部门编号,
							name: dataArray[i].部门名称,
						});
					}

				}
			},
			fail: function(data) {
				document.getElementById('loading').style.display = 'none';
				mui.alert("获取失败，请检查网络环境！")
                    }
			});
	}