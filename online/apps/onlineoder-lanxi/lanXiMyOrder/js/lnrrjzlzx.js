/**
 * 获取url中"?"符后的字串
 */
function GetRequest() {
	var url = window.location.search;
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

var detail = new Vue({
	el: "#div",
	data: {
		lists: []
	}
});

var dataArray = [];

function getdataInfo(idCard) {
	//http://xzfw.dongyang.gov.cn:8083/dongyang/yuyue/GetOrderQueue.do
	//http://172.24.144.66/egov/dhDisburse.action
	var requesturl = "http://220.191.228.153:9090/lanxi/interfaces/alipay.do";
	var arr = {
		idcard: idCard
	}
	//	$.ajax({
	//		url: requesturl,
	//		data:arr,
	//		type : 'get',
	myRequest({
		url: requesturl,
		data: arr,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			//			var obj = JSON.parse(data);
			var obj = data;
			if(obj.State == "0") {
				dataArray = obj.value;
				if(dataArray.length > 0) {
					detail.lists = [];
					for(var i = 0; i < dataArray.length; i++) {
						detail.lists.push({
							iditem: i,
							servicename: dataArray[i].servicename,
							receive_deptname: dataArray[i].receive_deptname,
							payState: dataArray[i].payState == 'IN_PAY' ? "需支付" : '',
							handlestate: dataArray[i].handlestate,
							noticeno: dataArray[i].noticeno,
						});
					}
				} else {
					console.log('error');
					$("#badmessage").show();
				}
			} else {
				$("#badmessage").show();
			}
		},
		error: function(data) {
			//			console.log(data);
			$("#badmessage").show();
		}
	});
}

function pushZhifu(index, phone) {
	var obj = detail.lists[index];
	var jkdh = obj.noticeno;
	if(jkdh.length > 0) {
		//测试环境：http://115.29.2.5:8080/fswap
		//正式环境：http://mpay.zjzwfw.gov.cn
		window.location.href = 'http://115.29.2.5:8080/fswap/jkdhzf.html?jkdh=' + jkdh + "id=30&tel" + phone;
	}

}