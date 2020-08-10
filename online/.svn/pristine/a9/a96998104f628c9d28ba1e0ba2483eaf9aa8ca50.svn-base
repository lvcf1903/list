//定义全局变量
var listHtml = "";
$(function() {
	$('.loaddiv').show();
	var url = location.search;
	var theRequest = new Object();
	var str = url.substr(1);
	strs = str.split("&");
	for(var i = 0; i < strs.length; i++) {
		theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
	}
	var ctrllerid = decodeURI(theRequest.num);
	var groupno = decodeURI(theRequest.groupno);
	requesturl="https://tlzwfwzx.com/TL_HALL/rest/hall/statistic/itemdesc";
	$.ajax({
		type: "get",  
		url: requesturl,
		data:{
			    ctrllerid:ctrllerid,
				groupno:groupno,
		   }, 
		dataType: "json", 
		success: function(data) {
			$('.loaddiv').hide();
			if(data.length==0){
				document.getElementById("badmessage").style.display = "block";
			}else{
			for(var i=0;i<data.length;i++){
		    listHtml +="<div  style='display: inline-block; border: 2px solid #F5F5F5;height: auto; width: 90%;'>"+
		            "<table border='0' cellspacing='0' cellpadding='0' width='100%' style='margin-top: 10px;margin-bottom: 10px; color: #00558e;'>"+
				    "<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>窗口号</td>"+
					"<td width='2%'></td>";
					if(data[i].roomno==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data[i].roomno+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>在办号</td>"+
					"<td width='2%'></td>";
					if(data[i].qno==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data[i].qno+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
			"</table>"+
			"</div>"
				}
			}
				$("#main").html(listHtml);
		},

		fail: function(data) {
		$('.loaddiv').hide();
		document.getElementById("badmessage").style.display = "block";
	}
});
});