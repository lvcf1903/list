
var overallInterface = "https://zwfw.zjxc.gov.cn/xcwsbs/ywzw/interface/";

//var overallInterface = "http://118.178.118.120:8080/zhongzhuan/zz/interface/
var wmhurl = "http://www.jjxzfwzx.com:8090/jmportal/interfaces/";

//网络请求
function myRequest(option) {
	var dataa;
	var header;
	if(option.data == '') {
		dataa = option.data;
		dataa = dataa.replace("+", "%2B");
	} else {
		dataa = JSON.stringify(option.data);
		dataa = dataa.replace("+", "%2B");
	}
	if(option.header == '') {
		header = option.header;
	} else {
		header = JSON.stringify(option.header);
	}

	var url = 'https://app.zjzwfw.gov.cn/open/interfaces/wxTransferPort.do?' + 'requestUrl=' + option.url + '&datas=' + dataa + '&heads=' + header;
//	var url = 'http://192.168.89.235:8090/jmopen1.7.0/interfaces/wxTransferPort.do?' + 'requestUrl=' + option.url + '&datas=' + dataa + '&heads=' + header;
	
	url = url.replace(/{/g, "dhzkh");
	url = url.replace(/}/g, "dhykh");
	if(option.dataType == undefined) {
		option.dataType = 'json';
	}
	$.ajax({
		url: url,
		dataType: option.dataType, //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false, //同步
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			option.success(data);
		},
		error: function(e) {
			option.fail('requestcuowu' + JSON.stringify(e));
		}
	});
};