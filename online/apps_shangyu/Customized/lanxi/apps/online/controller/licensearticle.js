function requestLicenseFile() {
//	document.getElementById("img").src = "data:image/png;base64," + "";
	var prama = {
		fileNumber: fileNumber
	}
	$.ajax({
		type: 'get',
		url: overallInterface + "getLicenseFileByDoc.do",
		data: prama,
		async: true,
		dataType: 'json',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			if (data.result == "true" ) {
				document.getElementById("img").src = data.imgurl;
				
			} else{
				alert("获取证照详情信息失败");
			}
			
		},
		error: function(err) {
			document.getElementById('loading').style.display = 'none';
			alert("获取证照详情信息失败");
		}
	});

}