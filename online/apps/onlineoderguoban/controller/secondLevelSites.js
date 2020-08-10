var second = new Vue({
	el: "#content",
	data: {
		lists: []
	}
});
var dataArray;
var obj;
var date;
function getSecondLevelSites(siteid) {
	myRequest({
		async: true,
		url: overallInterface + "ywzw/interface/secondLevelSites.do",
		data: {
			siteId: siteid
		},
		header: "",
		success: function(data) {
			if((new RegExp("\\S+")).test(data)) {
				dataArray = [];
				dataArray = data;
				second.lists = [];
				for(var i = 0; i < dataArray.length; i++) {
					second.lists.push({
						index: i,
						colname: dataArray[i].name,
						colid: dataArray[i].iid,
						colopenState: dataArray[i].openState,
					})
				}
			}
		},
		fail: function(data) {
			alert("加载失败")
		}
	})
};