//请求短信发送接口
function requestSendOrderMsg() {
	var storage = window.localStorage;

	var date;
	var requesturl;
	date = {
		phone: storage.orderPhone,
		orderNumber: storage.orderNumber,
		itemname: storage.orderItemname,
		date: storage.orderDate,
		timeslot: storage.orderTimeslot,
		windowName: storage.orderWindowName
	}
	requesturl = overallInterface + "ywzw/interface/sendOrderMsg.do";

	myRequest({
		url: requesturl,
		data: date,
		header: '',
		success: function(data) {},
		fail: function(data) {}
	});
}