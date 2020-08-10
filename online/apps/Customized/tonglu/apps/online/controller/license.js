var storage = window.localStorage;
var userInfo;
var userid;

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

function requestLicenseList() {
	var requestURL;
	var holderCode;
	var holderName;

	//判断容器类型，浏览器还是APP

	if(container == "web") {
		var wxuserInfo = storage.wxuserInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	} else { //app 使用jssdk获取用户信息
		var wxuserInfo = storage.userInfo;
		userInfo = JSON.parse(wxuserInfo);
		userid = userInfo.userid;
	}

	//判断是个人还是法人
	//判断个人还是法人  
	if(userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
		holderCode = userInfo.idnum;
		holderName = userInfo.username;
		requestURL = overallInterface + "getPersonalLicense.do";
	} else { //法人
		holderCode = userInfo.uniscid;
		holderName = userInfo.appConEntName;
		requestURL = overallInterface + "getLegalPersonLicense.do";
	}

	var prama = {
		holderCode: holderCode,
		holderName: holderName,
		page: "",
		size: "",
		state: "1"

		//		holderCode: "330821199208254222",
		//		holderName: "钱莉莉",
		//		page: "",
		//		size: "",
		//		state: "1"
		//		access_token:"4b2c8d34-af49-4ffd-b04e-1b56676c53a0"
	}

	//	http://10.27.14.65/license-api-release/license/getPersonalLicense?holderCode=330821199208254222&holderName=钱莉莉&page=&size=&state=1&access_token=4b2c8d34-af49-4ffd-b04e-1b56676c53a0
	$.ajax({
		type: 'get',
		url: requestURL,
		data: prama,
		async: true,
		dataType: 'json',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			if(data.head.status == 0) {
				var obj = data.data.data;

				for(var i = 0; i < obj.length; i++) {
					example.items.push({
						licenseName: obj[i].licenseName,
						fileNumber: obj[i].metadata.abstractCode
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
				if(obj.length <= 0){
					document.getElementById("badmessage").style.display = "block";
				}

			} else {
				alert("获取证照信息失败");
			}

		},
		error: function(err) {
			document.getElementById('loading').style.display = 'none';
			alert("获取证照信息失败");
		}
	});
}