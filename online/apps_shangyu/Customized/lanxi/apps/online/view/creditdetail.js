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
	var cardid = decodeURI(theRequest.cardid);
	var carno = decodeURI(theRequest.carno);
	var color = decodeURI(theRequest.color);
	var begindate = decodeURI(theRequest.begindate);
	var enddate = decodeURI(theRequest.enddate);
	lightAppJssdk.request.request({
		data:{
			    cardid:cardid,
				carno:carno,
				color:color,
				begindate:begindate,
				enddate:enddate
		    },       
		url: etcurl,
		header: '',
		success: function(data) {
			$('.loaddiv').hide();
			if(data.result.length==0){	
			}else{
			for(var i=0;i<data.result.length;i++){
					
		listHtml +="<div  style='display: inline-block; border: 2px solid #F5F5F5;height: auto; width: 90%;'>"+
		            "<table height='108px'border='0' cellspacing='0' cellpadding='0' width='100%' style='margin-top: 10px;margin-bottom: 10px; color: #00558e;'>"+
				    "<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>ETC卡号</td>"+
					"<td width='2%'></td>";
					if(data.result[i].cardid==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data.result[i].cardid+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>车牌号码</td>"+
					"<td width='2%'></td>";
					if(data.result[i].carno==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data.result[i].carno+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				 "<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>车牌颜色</td>"+
					"<td width='2%'></td>";
					if(data.result[i].color==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data.result[i].color+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>入站名称</td>"+
					"<td width='2%'></td>";
					if(data.result[i].inpoi==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data.result[i].inpoi+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>出站名称</td>"+
					"<td width='2%'></td>";
					if(data.result[i].outpoi==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data.result[i].outpoi+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='20%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>入站时间</td>"+
					"<td width='2%'></td>";
					if(data.result[i].starttime==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data.result[i].starttime+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>出站时间</td>"+
					"<td width='2%'></td>";
					if(data.result[i].endtime==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data.result[i].endtime+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='30%' style=' height:32px; text-align: right;padding-right: 8px; background-color: ;'>ETC卡消费金额</td>"+
					"<td width='2%'></td>";
					if(data.result[i].fee==undefined){
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='yue' width='60%' style='color: black;text-align: left;padding-left: 10px;'>"+data.result[i].fee+"</td>";
					}
					listHtml +="<td width='2%'></td>"+
				"</tr>"+
				"<tr>"+
					"<td width='2%'></td>"+
					"<td width='25%'  style=' height:32px;text-align: right;padding-right: 8px; background-color: #F5F5F5;'>ETC卡余额</td>"+
					"<td width='2%'></td>";
					if(data.result[i].balance==undefined){
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'></td>";
					}else{
				        listHtml +="<td id='kahao' width='60%' style='background-color: #F5F5F5;color: black;text-align: left;padding-left: 10px;'>"+data.result[i].balance+"</td>";
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
		alert("加载失败");
	}
});
});