//请求批文的base64
function requestApprovalFile() {
	var prama = {
//		"projid": "330881311610130000023",
//		"pwd": "241635"
		"projid": projid,
		"pwd": pwd
	}
	$.ajax({
		type: 'POST',
		url: overallInterface + 'getTransactFileByProjid.do',
		data: prama,
		async: true,
		dataType: 'json',
		success: function(data) {
			//			var obj = JSON.parse(data);
			document.getElementById("loading").style.display = "none";
			if(data) {

				document.getElementById("img").src = "data:image/png;base64," + data;
			} else {
				document.getElementById("badmessage").style.display = "block";
			}
		},
		error: function(err) {
			//			alert("加载失败");
			document.getElementById("loading").style.display = "none";
			document.getElementById("badmessage").style.display = "block";
		}
	});

}