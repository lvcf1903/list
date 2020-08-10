var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

function requestProgress() {
	
		var json = {
		"projid": projid,
		"pwd": pwd
	}
		

	myRequest({
		url: overallInterface+'getNodeInfoByProjId.do',
		data: json,
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			var obj = JSON.parse(data);
			for(var i = 0; i < obj.length; i++) {
				example.items.push({
					node_name: obj[i].node_name,
					author: obj[i].author,
					modified: obj[i].modified,
					body:obj[i].body
				});
				if(i == 0) {
					document.getElementById("parent").style.display = "block";
					

				}
			}
			if (obj.length > 0) {
				document.getElementById("badmessage").style.display = "none";
			} else{
				document.body.style.backgroundColor = "#FFFFFF";
				document.getElementById("badmessage").style.display = "block";
			}
		},
		fail: function(data) {
			document.getElementById('loading').style.display = 'none';
			//			alert("加载失败");
			document.body.style.backgroundColor = "#FFFFFF";
			document.getElementById("badmessage").style.display = "block";
		}
	});
	
	
	
//	var prama = {
////		"projid": "330881311610130000023",
////		"pwd": "241635"
//		"projid": projid,
//		"pwd": pwd
//	}
//	$.ajax({
//		type: 'POST',
//		url: overallInterface+'getNodeInfoByProjId.do',
//		data: prama,
//		async: false,
//		dataType: 'json',
//		success: function(data) {
//			document.getElementById('loading').style.display = 'none';
//			var obj = JSON.parse(data);
//			for(var i = 0; i < obj.length; i++) {
//				example.items.push({
//					node_name: obj[i].node_name,
//					author: obj[i].author,
//					modified: obj[i].modified,
//					body:obj[i].body
//				});
//				if(i == 0) {
//					document.getElementById("parent").style.display = "block";
//					
//
//				}
//			}
//			if (obj.length > 0) {
//				document.getElementById("badmessage").style.display = "none";
//			} else{
//				document.body.style.backgroundColor = "#FFFFFF";
//				document.getElementById("badmessage").style.display = "block";
//			}
//		},
//		error: function(err) {
//			document.getElementById('loading').style.display = 'none';
//			//			alert("加载失败");
//			document.body.style.backgroundColor = "#FFFFFF";
//			document.getElementById("badmessage").style.display = "block";
//		}
//	});

}

function openApproval () {
	window.location.href = "../../onlineorder/view/approval.html?projid="+projid +"&pwd="+pwd;
}
function openEMS() {
	window.location.href = "../../onlineorder/view/ems.html?projid="+projid +"&pwd="+pwd;
}
function completeinfo() {
	window.location.href = "../../onlineorder/view/completeinfo.html?punid="+unid;
}
