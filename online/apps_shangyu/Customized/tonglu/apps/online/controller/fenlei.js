var classfy1 = document.getElementById("classfy1")
var classfy2 = document.getElementById("classfy2")

var table = document.getElementsByTagName("table");
var tr = document.getElementById("tr");
var obj = [];
var example2 = new Vue({
	el: '#titleul',
	data: {
		items1: []
	}
});

function getclassfy() {

	var json = {

	};

	myRequest({
		url: overallInterface + "getMattercol.do",
		data: json,
		header: '',
		success: function(data) {
			//			alert(JSON.stringify(data));
			var newdate = JSON.stringify(data);
			var html = "";
			if(newdate.length > 0) {
				obj = JSON.parse(newdate);
				for(var i = 0; i < obj.length; i++) {
					var cell = tr.insertCell(-1);
					cell.innerHTML = obj[i].name;
					cell.innerHTML = "<div  onclick=\" this.color=\'#000000\';   getMatterWindow(" + obj[i].iid + "," + obj.length + "," + i + ")\"> <p>   " + obj[i].name + "</P> </div>"
					cell.setAttribute("id", obj[i].iid);
				}
				getMatterWindow(obj[0].iid, obj.length, 0)
					//				tr.innerHTML=html;

			} else {
				mui.alert("请求失败");

			}
			if(obj.length == 1) {
				document.getElementById("table").style.display = "none";
			}
		},
		fail: function(data) {

		}
	});

	//	$.ajax({
	//		url: overallInterface+"getMattercol.do",
	//		type: "get",
	//		asasync: true,
	//		timeout: 20000,
	//		success: function(data) {
	//			var html = "";
	//			if(data.length > 0) {
	//				obj = JSON.parse(data);
	//				for(var i = 0; i < obj.length; i++) {
	//					var cell = tr.insertCell(-1);
	//					cell.innerHTML = obj[i].name;
	//					cell.innerHTML = "<div  onclick=\"getMatterWindow(" + obj[i].iid + "," + obj.length+ "," + i +")\"> <p>   " + obj[i].name + "</P> </div>"
	//					cell.setAttribute("id", obj[i].iid);
	//				}
	//				getMatterWindow(obj[0].iid,obj.length,0)
	//				//				tr.innerHTML=html;
	//
	//			} else {
	//				mui.alert("请求失败");
	//
	//			}
	//			if(obj.length == 1) {
	//				document.getElementById("table").style.display = "none";
	//			}
	//
	//		},
	//		error: function(e) {
	//
	//		}
	//
	//	});
}
var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
});

function getMatterWindow(iid, length, a) {
//	alert("1");
	var table = document.getElementById("table");
	if(a == 0) {
		table.style.background = "url(../source/images/zuo.png)";
		table.style.backgroundRepeat = "no-repeat"
		table.style.backgroundSize = "100%  60px"
	} else {
		table.style.background = "url(../source/images/you.png)";
		table.style.backgroundRepeat = "no-repeat"
		table.style.backgroundSize = "100%  60px"
	}

	var tds = document.getElementsByTagName("td");
	for(var i = 0; i < length; i++) {
		tds[i].style.backgroundColor = "transparent";

		tds[i].style.color = "#000000";
	}

	var td = document.getElementById(iid);
	td.style.background = "transparent";

	td.style.color = "#ffffff";

	var json = {
		pid: iid
	};

	myRequest({
		url: overallInterface + "getMatterWindow.do",
		data: json,
		header: '',
		success: function(data) {

			var arrlength = data
//			example1.items1 = [];
			var innerhtml = '';
			if(a == 0) {

				//				alert(JSON.stringify(data));
				//			var arrlength = JSON.parse(data);

				for(var i = 0; i < arrlength.length; i += 2) {

					//				example1.items1.push({
					//					index: arrlength[i].iid,
					//					title: arrlength[i].name,
					//					imageurl: arrlength[i].imageurl,
					//				});
					if(arrlength[i] && arrlength[i + 1]) {
						var dic1 = arrlength[i];
						var dic2 = arrlength[i + 1];
						//先循环 2 个数据一组
						innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;'><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px'id='fenlei" + dic1.iid + "' onclick=\"next(\'" + dic1.iid + "\');\"><table><td align='absmiddle'><div style='font-size: 13px;margin-top: 10px;color: #333333;width: 100%;'>" + dic1.name + "</div><div style='font-size: 11px;color: #808080;margin-top: 5px;margin-bottom: 10px;'>"+dic1.count+"个事项</div></td><td style='width: 40px;height: 40px;'><img class='image'   style='width: 40px;height: 40px'  src=" + dic1.imageurl + " /></td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px'id='fenlei" + dic2.iid + "' onclick=\"next(\'" + dic2.iid + "\');\"><table><tr><td align='absmiddle'><div style='font-size: 13px;margin-top: 10px;color: #333333;width: 100%;'>" + dic2.name + "</div><div style='font-size: 11px;color: #808080;margin-top: 5px;margin-bottom: 10px;'>"+dic2.count+"个事项</div></td><td   style='width: 40px;height: 40px;' ><img class='image'    style='width: 40px;height: 40px;'  src=" + dic2.imageurl + " /></td></tr></table></td><td width='4%;'></td></tr></table>";
					} else if(arrlength[i] || arrlength[i + 1]) {
						var dic1 = arrlength[i];
						var dic2 = arrlength[i + 1];
						//先循环 2 个数据一组
						//					if(innerhtml == '') {
						//						innerhtml = "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//					} else {
						//						//innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//					innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle'>" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//
						//					}
						innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px' id='fenlei" + dic1.iid + "' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td align='absmiddle'><div style='font-size: 13px;margin-top: 10px;color: #333333;width: 100%;'>" + dic1.name + "</div><div style='font-size: 11px;color: #808080;margin-top: 5px;margin-bottom: 10px;'>"+dic1.count+"个事项</div></td><td style='width:20%;'><img class='image'       style='width: 40px;height: 40px;'    src=" + dic1.imageurl + " /></td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
					} else {

					}
				}

				document.getElementById("infotable").innerHTML = innerhtml;
			} else {

				for(var i = 0; i < arrlength.length; i += 2) {
					//				example1.items1.push({
					//					index: arrlength[i].iid,
					//					title: arrlength[i].name,
					//					imageurl: arrlength[i].imageurl,
					//				});
					if(arrlength[i] && arrlength[i + 1]) {
						var dic1 = arrlength[i];
						var dic2 = arrlength[i + 1];
						//先循环 2 个数据一组
						innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;'><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px'id='fenlei" + dic1.iid + "' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td style='width:20%;'><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle' style='font-size: 14px;'  >" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px' id='fenlei" + dic2.iid + "' onclick=\"next(\'" + dic2.iid + "\');\"><table><tr><td><img class='image' src=" + dic2.imageurl + " /></td><td align='absmiddle'   style='font-size: 14px;'>" + dic2.name + "</td></tr></table></td><td width='4%;'></td></tr></table>";
					} else if(arrlength[i] || arrlength[i + 1]) {
						var dic1 = arrlength[i];
						var dic2 = arrlength[i + 1];
						//先循环 2 个数据一组
						//					if(innerhtml == '') {
						//						innerhtml = "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//					} else {
						//						//innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//					innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle'>" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
						//
						//					}
						innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;height:60px;padding-bottom:0px' id='fenlei" + dic1.iid + "' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td style='width:20%;'><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle'  style='font-size: 14px;'>" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
					} else {

					}
				}

				document.getElementById("infotable").innerHTML = innerhtml;
			}

			//			
		},
		fail: function(data) {
			alert(data);
		}
	});

	//	
	//	var param = {
	//		pid: iid
	//	}
	//	$.ajax({
	//		type: "get",
	//		url: overallInterface+"getMatterWindow.do",
	//		//			    url:"http://192.168.89.107:8080/yiwu/ywzw/interface/getMatterWindow.do?pid=2",
	//		async: true,
	//		data: param,
	//		success: function(data) {
	//			var arrlength = JSON.parse(data);
	//			example1.items1 = [];
	//			var innerhtml = '';
	//			for(var i = 0; i < arrlength.length; i+= 2) {
	////				example1.items1.push({
	////					index: arrlength[i].iid,
	////					title: arrlength[i].name,
	////					imageurl: arrlength[i].imageurl,
	////				});
	//				if(arrlength[i] && arrlength[i + 1]) {
	//					var dic1 = arrlength[i];
	//					var dic2 = arrlength[i + 1];
	//					//先循环 2 个数据一组
	//					innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;'><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px'id='fenlei"+dic1.iid+"' onclick=\"next(\'"+dic1.iid+"\');\"><table><tr><td style='width:20%;'><img class='image' src="+dic1.imageurl+" /></td><td align='absmiddle'>"+dic1.name+"</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;height:60px;padding-bottom:0px' id='fenlei"+dic2.iid+"' onclick=\"next(\'"+dic2.iid+"\');\"><table><tr><td><img class='image' src=" + dic2.imageurl + " /></td><td align='absmiddle'>" + dic2.name + "</td></tr></table></td><td width='4%;'></td></tr></table>";
	//				} else if(arrlength[i] || arrlength[i + 1]) {
	//					var dic1 = arrlength[i];
	//					var dic2 = arrlength[i + 1];
	//					//先循环 2 个数据一组
	////					if(innerhtml == '') {
	////						innerhtml = "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
	////					} else {
	////						//innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.name + "</td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
	////					innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;border:1px solid #E8E8E8;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle'>" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
	////
	////					}
	//					innerhtml = innerhtml + "<table style='width:100%;margin-top:10px;' ><tr style='padding-top:10px;width:100%;'><td width='4%;'></td><td style='text-align:left;background-color:#FFFFFF;width:44%;vertical-align:middle;height:60px;padding-bottom:0px' id='fenlei"+dic1.iid+"' onclick=\"next(\'" + dic1.iid + "\');\"><table><tr><td style='width:20%;'><img class='image' src=" + dic1.imageurl + " /></td><td align='absmiddle'>" + dic1.name + "</td></tr></table></td><td width='4%;'></td><td style='background-color:#FFFFFF;width:44%;text-align:left;vertical-align:middle;border:0px solid #E8E8E8;height:60px;padding-bottom:0px'></td><td width='4%;'></td></tr></table>";
	//				} else{
	//					
	//				}
	//			}
	//			document.getElementById("infotable").innerHTML = innerhtml;
	//		},
	//		error: function(e) {
	//
	//		}
	//	});

}

function next(id) {
	window.location.href = "worklist.html?type=02&colid=" + id;

}