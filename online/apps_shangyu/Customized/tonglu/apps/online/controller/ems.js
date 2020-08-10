var x = new Date();
var y = x.getFullYear();
var m = x.getMonth() + 1;
if(m >= 1 && m <= 9) {
	m = "0" + m;
}
var d = x.getDate();
if(d >= 1 && d <= 9) {
	d = "0" + d;
}
var h = x.getHours();
if(h >= 1 && h <= 9) {
	h = "0" + h;
}
var mm = x.getMinutes();
if(mm >= 1 && mm <= 9) {
	mm = "0" + mm;
}
var s = x.getSeconds();
if(s >= 1 && s <= 9) {
	s = "0" + s;
}
var currentTime = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
//根据projid获得mailnumber
function requestMailNum() {
	//	http://10.10.10.167:8090/zhongzhuan/zz/interface/getMailnumbyProjid.do
	$.ajax({
		type: "get",
		url: overallInterface + "getMailnumbyProjid.do",
		data: {
			projid: projid
		},
		timeout: 15000, //超时时间设置，单位毫秒
		async: true,

		success: function(data) {

			if(data) {
				var obj = JSON.parse(data);
				obj = JSON.parse(obj);
				if(obj.result == "true") {
					requestEmsState(obj.mailnum);
				} else {
					document.getElementById('loading').style.display = 'none';
//					暂时注释，没有调通
					//alert("获取物流信息失败");
				}
			} else {
				document.getElementById('loading').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}

		},
		error: function(err) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
			//alert("获取物流信息失败");
		}
	});

}

//根据mailnumber获取EMS状态
function requestEmsState(mailNum) {
	$.ajax({
		type: "get",
		url: overallInterface + "getems.do",
		data: {
			mailNum: mailNum,
			userId: userInfo.userid
		},
		timeout: 15000, //超时时间设置，单位毫秒
		async: true,

		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			data = "{\"state\":200,\"content\":{\"mailNum\":\"9700264462100\",\"step\":3,\"traces\":[{\"time\":\"2017-03-15 15:57:27\",\"location\":\"衢州市\",\"context\":\"北仑速递分公司新矸经营部已收件（揽投员姓名：董永,联系电话:18969400888）\"},{\"time\":\"2017-03-15 18:41:00\",\"location\":\"衢州市\",\"context\":\"离开北仑区 发往衢州邮区中心局邮件处理中心\"},{\"time\":\"2017-03-15 19:59:00\",\"location\":\"衢州市\",\"context\":\"到达衢州邮区中心局邮件处理中心\"},{\"time\":\"2017-03-15 20:14:00\",\"location\":\"衢州柯城区\",\"context\":\"投递并签收，签收人：本人收\"}]}}";
			var obj = JSON.parse(data);

			if(obj.state == 200) { //请求成功
				var content = obj.content;
				var mailNum = content.mailNum;
				document.getElementById("mailNum").innerHTML = mailNum;
				var tracesArray = content.traces;
				tracesArray = tracesArray.reverse();
				for(var i = 0; i < tracesArray.length; i++) {
					example.items.push({
						time: tracesArray[i].time,
						location: tracesArray[i].location,
						context: tracesArray[i].context

					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";

					}
				}
			} else { //请求失败
				//alert("获取物流信息失败");
			}

			
		},
		error: function(err) {
			document.getElementById('loading').style.display = 'none';
			//			alert("加载失败");
			//alert("获取物流信息失败");
		}
	});
};