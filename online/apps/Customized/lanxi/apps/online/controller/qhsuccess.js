//定义全局变量
var listHtml = "";
var tluserinfo=localStorage.getItem("tluserinfo");
tluserinfo=JSON.parse(tluserinfo);
var telephone=tluserinfo.mobile;
var sfz=tluserinfo.idnum;
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
	requesturl="https://tlzwfwzx.com/TL_HALL/rest/hall/statistic/qh";
	$.ajax({
		type: "get",  
		url: requesturl,
		data:{
			    ctrllerid:ctrllerid,
				groupno:groupno,
				telephone:telephone,
				sfzh:sfz
		   }, 
		dataType: "json", 
		success: function(data) {
			if(data.length==0){
				document.getElementById("badmessage").style.display = "block";
			}else{
           var successy="<strong style='color: #199efd;'>"+data[0].remark+"</strong>"	
           	$("#haveSuccess").html(successy);
		    listHtml +="<div  style='display: inline-block; border: 2px solid #F5F5F5;height: auto; width: 90%;margin-bottom: 15px;'>"+
		            "<table border='0' cellspacing='0' cellpadding='0' width='100%' style='margin-top: 10px;margin-bottom: 10px; color: #00558e;'>"+
				    "<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>事项名称</td>"+
					"<td width='2%'></td>";
					if(data[0].groupname==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data[0].groupname+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>取号码</td>"+
					"<td width='2%'></td>";
					if(data[0].qno==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data[0].qno+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>等待人数</td>"+
					"<td width='2%'></td>";
					if(data[0].waitnum==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data[0].waitnum+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
			"</table>"+
			"</div>"
			}
				$("#btn").html(listHtml);
		},

		fail: function(data) {
		$('.loaddiv').hide();
		document.getElementById("badmessage").style.display = "block";
	}
});
});