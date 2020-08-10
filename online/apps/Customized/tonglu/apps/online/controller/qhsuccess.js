//定义全局变量
var listHtml = "";
var tluserinfo = localStorage.getItem("tluserinfo");
tluserinfo = JSON.parse(tluserinfo);
var telephone = tluserinfo.mobile;
var sfz = tluserinfo.idnum;
$(function() {
	var url = location.search;
	var theRequest = new Object();
	var str = url.substr(1);
	strs = str.split("&");
	for(var i = 0; i < strs.length; i++) {
		theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	}
	var ctrllerid = decodeURI(theRequest.num);
	var groupno = decodeURI(theRequest.groupno);
	var groupname = decodeURI(theRequest.groupname);
	requesturl = "https://tlzwfwzx.com/TL_HALL/rest/hall/statistic/qh";
	$.ajax({
		type: "get",
		url: requesturl,
		data: {
			ctrllerid: ctrllerid,
			groupno: groupno,
			telephone: telephone,
			sfzh: sfz
		},
		dataType: "json",
		success: function(data) {
			if(data.length == 0) {
				document.getElementById("badmessage").style.display = "block";
			} else {
				dataArrayrel = [];
				dataArrayrel = data;
				var qno = data[0].qno;
				myRequest({
					data: {
						groupno: groupno,
						telephone: telephone,
						sfz: sfz
					},
					header: '',
					url: "http://60.191.18.50/tonglu/tonglu/yuyue/queryImmdBystg.do",
					success: function(data) {
						if(data.length == 0) {
							myRequest({
								data: {
									groupno: groupno,
									groupname: groupname,
									telephone: telephone,
									sfz: sfz,
									number: qno
								},
								header: '',
								url: "http://60.191.18.50/tonglu/tonglu/yuyue/insertimmd.do",
								success: function(data) {
									if(data.success == true) {
										var successy = "<strong style='color: #199efd;'>" + dataArrayrel[0].remark + "</strong>"
										$("#haveSuccess").html(successy);
										listHtml += "<div  style='display: inline-block; border: 2px solid #F5F5F5;height: auto; width: 90%;margin-bottom: 15px;'>" +
											"<table border='0' cellspacing='0' cellpadding='0' width='100%' style='margin-top: 10px;margin-bottom: 10px; color: #00558e;'>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>事项名称</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].groupname == undefined) {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].groupname + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>取号码</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].qno == undefined) {
											listHtml += "<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].qno + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>等待人数</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].waitnum == undefined) {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].waitnum + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"</table>" +
											"</div>"
										$("#btn").html(listHtml);
									} else {
										document.getElementById("badmessage").style.display = "block";
									}
								},
								fail: function(data) { //请求失败
									$('#loaddiv').hide();
									document.getElementById("badmessage").style.display = "block";
									mui.alert("请检查网络，稍后再试！");
								}
							});
						} else {
							dataArray = [];
							dataArray = data;
							var iid = dataArray[0].iid;

							myRequest({
								data: {
									iid: iid,
									number: qno
								},
								header: '',
								url: "http://60.191.18.50/tonglu/tonglu/yuyue/updateJsqh.do",
								success: function(data) {
									if(data.success == true) {
										var successy = "<strong style='color: #199efd;'>" + dataArrayrel[0].remark + "</strong>"
										$("#haveSuccess").html(successy);
										listHtml += "<div  style='display: inline-block; border: 2px solid #F5F5F5;height: auto; width: 90%;margin-bottom: 15px;'>" +
											"<table border='0' cellspacing='0' cellpadding='0' width='100%' style='margin-top: 10px;margin-bottom: 10px; color: #00558e;'>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>事项名称</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].groupname == undefined) {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].groupname + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>取号码</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].qno == undefined) {
											listHtml += "<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].qno + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"<tr>" +
											"<td width='2%'></td>" +
											"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>等待人数</td>" +
											"<td width='2%'></td>";
										if(dataArrayrel[0].waitnum == undefined) {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
										} else {
											listHtml += "<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>" + dataArrayrel[0].waitnum + "</td>";
										}
										listHtml += "<td width='2%'></td>" +
											"</tr>" +
											"</table>" +
											"</div>"
										$("#btn").html(listHtml);
									} else {
										document.getElementById("badmessage").style.display = "block";
									}
								},
								fail: function(data) { //请求失败
									$('#loaddiv').hide();
									document.getElementById("badmessage").style.display = "block";
									mui.alert("请检查网络，稍后再试！");
								}
							});
						}
					},
					fail: function(data) { //请求失败
						$('#loaddiv').hide();
						document.getElementById("badmessage").style.display = "block";
						mui.alert("请检查网络，稍后再试！");
					}
				});

			}
		},

		fail: function(data) {
			$('#loaddiv').hide();
			document.getElementById("badmessage").style.display = "block";
		}
	});
});