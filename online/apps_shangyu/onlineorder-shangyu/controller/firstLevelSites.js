var example = new Vue({
	el: "#nav_bar",
	data: {
		items: []
	}
});
var dataArray;
var obj;
var date;
function getFistsiteid() {
	myRequest({
		url: overallInterface + "ywzw/interface/findFirstSitePid.do",
		data: {
			siteId: vsiteid
		},
		header: "",
		success: function(data) {
			document.getElementById("container").style.display = "block";
			document.getElementById("loading").style.display = "none";
			vsiteid = data.iid
		}
	})
}

function getFirstLevelSites() {
	myRequest({
		url: overallInterface + "ywzw/interface/firstLevelSites.do",
		data: {},
		header: "",
		success: function(data) {
			dataArray = [];
			dataArray = data;
			example.items = [];
			for(var i = 0; i < dataArray.length; i++) {
				example.items.push({
					index: i,
					colname: dataArray[i].name,
					colid: dataArray[i].iid,
				})
			}
		},
		fail: function(data) {
			alert("加载失败")
		}
	})
};