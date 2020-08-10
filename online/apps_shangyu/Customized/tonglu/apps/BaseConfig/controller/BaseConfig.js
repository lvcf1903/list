/**
 * 接口地址
 */


//网络请求
function myRequest(option) {
	var async = false; //同步
	var type = "post";
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
	url = 'https://app.zjzwfw.gov.cn/open/interfaces/wxTransferPort.do?' + 'requestUrl=' + option.url + '&datas=' + dataa + '&heads=' + header;
	//url = 'http://192.168.88.36:8090/jmopen1.7.0/interfaces/wxTransferPort.do?' + 'requestUrl=' + option.url + '&datas=' + dataa + '&heads=' + header;

	url = url.replace(/{/g, "dhzkh");
	url = url.replace(/}/g, "dhykh");
	if(option.dataType == undefined) {
		option.dataType = 'json';
	}
	if(option.async == true) {
		async = true;
	}
	if(option.type == "get") {
		type = "get";
	}
	$.ajax({
		url: url,
		dataType: option.dataType, //服务器返回json格式数据
		type: type, //HTTP请求类型
		async: async,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			option.success(data);
		},
		error: function(e) {
			option.fail('requestcuowu' + JSON.stringify(e));
		}
	});
};