var classify = new Vue({
	el: '#parent',
	data: {
		sitename: "",
		items: []
	}
});
//获取站点分类
function getsiteclassify(siteid, cityname) {
	var requesturl;
	if(cityname == "") {
		requesturl = overallInterface + "interface/classify/firstlist.do";
	} else {
		requesturl = overallInterface + "interface/classify/secondlist.do";
	}
	myRequest({
		url: requesturl,
		data: {
			siteid: siteid
		},
		header: '',
		success: function(data) {
			var result = data.result;
			if(cityname == "") {
				classify.sitename = data.sitename;
			} else {
				classify.sitename = cityname;
			}
			if(result.length == 0) {
				document.getElementById("list").style.display = "none";
				document.getElementById("notOpen").style.display = "block";
				return;
			}
			classify.items = [];
			if(siteid != 1) {
				classify.items.push({
					name: "省本级网上办事",
					url: "https://app.zjzwfw.gov.cn/zjwssb/zj/apps/onlineoder/view/oderclassify.html?type=02&cityname=%E7%9C%81%E7%BA%A7&siteid=1"
				});
			};
			for(var i = 0; i < result.length; i++) {
				classify.items.push({
					name: result[i].name,
					url: result[i].url
				});
			};
			document.getElementById("parent").style.display = "block";
			document.getElementById("sourceApp").style.display = "block";

		}
	});
};

function linkurl(linkurl) {
	var hanweb = linkurl.match(/hanweb=uuid/i) == "hanweb=uuid";
	if(hanweb) {
		sessionStorage.linkurl = decodeURI(linkurl);
		window.location.href = "https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=zjzwfwsb&isfrom=app"
	} else {
		window.location.href = linkurl;
	}
}