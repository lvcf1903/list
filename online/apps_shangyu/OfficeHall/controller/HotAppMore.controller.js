var results = [];
var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var infoList = [];

function serviceMoreRequest() {
	//	var data = {
	//		webid: "1"
	//	}
	//	$.ajax({
	//		data: data,
	//		type: "post",
	//		url: zjzwurl + "app/interface/new/getHotApplyMoreList.do",
	//		timeout: 10000, //超时时间设置，单位毫秒
	//		async: true,
	//		success: function(data) {
	//			//信息栏目数组
	//			var obj = JSON.parse(data);
	//			infoList = obj.category;
	//			var nullArray = [];
	//			example.items = nullArray;
	//			for(var i = 0; i < infoList.length; i++) {
	//				example.items.push({
	//					head: infoList[i].categoryname,
	//					index: i
	//				});
	//				//继续解析第二层resource
	//				var secList = infoList[i].resource;
	//				var innerhtml = '';
	//				for(var x = 0; x < secList.length; x += 2) {
	//					var selfArr = [];
	//					var a = secList.length;
	//					if(secList[x] && secList[x + 1]) {
	//						var dic1 = secList[x];
	//						var dic2 = secList[x + 1];
	//						//先循环 2 个数据一组
	//						if(innerhtml == '') {
	//							innerhtml = "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + i + "," + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b' onclick=\"jumpfunction(\'" + i + "," + (x+1) + "\');\"><img class='image' src=" + dic2.imageurl + " />" + dic2.title + "</td></tr>";
	//						} else {
	//							innerhtml = innerhtml + "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + i + "," + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b' onclick=\"jumpfunction(\'" + i + "," + (x+1) + "\');\"><img class='image' src=" + dic2.imageurl + " />" + dic2.title + "</td></tr>";
	//						}
	//					}else if(secList[x] || secList[x + 1]){
	//						var dic1 = secList[x];
	//						var dic2 = secList[x + 1];
	//						 //先循环 2 个数据一组
	//						if(innerhtml == '') {
	//							innerhtml = "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + i + "," + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b'></td></tr>";
	//						} else {
	//							innerhtml = innerhtml + "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + i + "," + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b'></td></tr>";
	//						}
	//					}else{
	//						
	//					}
	//					selfArr[x/2] = innerhtml;
	//				}
	//				var str=selfArr.join("");
	//				results[i] = str;
	//			}
	//			setTimeout("fuzhi();",1)
	//		},
	//		error: function(e) {
	//			mui.alert("加载失败");
	//		}
	//	});

	//20170117修改
	infoList = HotInfo;
	var innerhtml = '';
	for(var x = 0; x < infoList.length; x += 2) {
		var selfArr = [];
		var a = infoList.length;
		if(infoList[x] && infoList[x + 1]) {
			var dic1 = infoList[x];
			var dic2 = infoList[x + 1];
			//先循环 2 个数据一组
			if(innerhtml == '') {
				innerhtml = "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b' onclick=\"jumpfunction(\'" + (x + 1) + "\');\"><img class='image' src=" + dic2.imageurl + " />" + dic2.title + "</td></tr>";
			} else {
				innerhtml = innerhtml + "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b' onclick=\"jumpfunction(\'" + (x + 1) + "\');\"><img class='image' src=" + dic2.imageurl + " />" + dic2.title + "</td></tr>";
			}
		} else if(infoList[x] || infoList[x + 1]) {
			var dic1 = infoList[x];
			var dic2 = infoList[x + 1];
			//先循环 2 个数据一组
			if(innerhtml == '') {
				innerhtml = "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b'></td></tr>";
			} else {
				innerhtml = innerhtml + "<tr style='padding: 0px;margin: 0px;border-bottom:solid 1px #EEEEEE;'><td class='div-a' onclick=\"jumpfunction(\'" + x + "\');\"><img class='image' src=" + dic1.imageurl + " />" + dic1.title + "</td><td class='div-b'></td></tr>";
			}
		} else {

		}
	}
	document.getElementById("infotable").innerHTML = innerhtml;
}

//function fuzhi() {
//	for(var i = 0; i < results.length; i++) {
//		var id = 'infotable' + i;
//		document.getElementById(id).innerHTML = results[i];
//	}
//}

function jumpfunction(x) {
	var info = infoList[x];
	var urlNew = info.openurl;
	window.location.href = urlNew;
	alert(urlNew);
//	//	i 格式是 0,0
//	var xy = i.split(","); // 在每个逗号(,)处进行分解。[0,0]
//	var info = infoList[xy[0]];
//	var newArr = info.resource;
//	var secArr = newArr[xy[1]];
//	var urlNew = secArr.openurl;
//	// alert(urlNew);
//	window.location.href = urlNew;
}