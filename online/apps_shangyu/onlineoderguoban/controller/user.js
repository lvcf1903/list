
//获得用户信息
function onGetUserInfo() {
	getUserInfo({
		success: function(data) {
			console.log(data);
			if(data == '未登录') {
				onGetUserticket();
			} else {
				change(data);
			}
		},
		fail: function(data) {
			alert(data);
		}
	});

};

function change(data) {
	data = JSON.parse(data);
	var datajson = {
		"userid": data.loginNo,
		"username": data.userName,
		"mobile": data.userMobile,
		"idnum": data.certNo
	};
	var userstr = JSON.stringify(datajson);
	localStorage.wxuserInfo = userstr;
	localStorage.userInfo = userstr;
}

function onGetUserticket() {
	lightAppJssdk.user.getTicket({
		success: function(data) {
			if(data == '未登录') {
				onLoginApp();
			} else {
				var jsonObj = JSON.parse(data);
				if(jsonObj.type == "1") {
					getGrUserInfo(jsonObj.ticket);
				} else {
					getFrUserInfo(jsonObj.ticket);
				}

			}
		},
		fail: function(data) {
			alert(data);
		}
	});

};

function getGrUserInfo(ticketSNO) {

	var data = {
		ticketSNO: ticketSNO
	};
	lightAppJssdk.request.request({
		type: "get",
		url: "http://112.35.18.165:8084/fwmhapp/userlogin/getUserWithTicket.do",
		data: data,
		async: false,
		dataType: 'jsonp',
		header: '',
		success: function(data) {
			alert(data.user.userName);
		},
		fail: function(data) {
			document.getElementById("loading").style.display = "none";
			document.getElementById("no_data_view").style.display = "block";
		}
	});
}

function getFrUserInfo(ticketSNO) {

	var data = {
		ticketSNO: ticketSNO
	};
	lightAppJssdk.request.request({
		type: "get",
		url: "http://112.35.18.165:8084/fwmhapp/corplogin/getCorpWithTicket.do",
		data: data,
		async: false,
		dataType: 'jsonp',
		header: '',
		success: function(data) {
			alert(data.user.userName);
		},
		fail: function(data) {
			document.getElementById("loading").style.display = "none";
			document.getElementById("no_data_view").style.display = "block";
		}
	});
}

//登录
function onLoginApp() {
	try {
		lightAppJssdk.user.loginapp({
			success: function(data) {
				if(data == '未登录') {
					//					oncloseWindow();
				} else {
					var jsonObj = JSON.parse(data);
					if(jsonObj.type == "1") {
						getGrUserInfo(jsonObj.ticket);
					} else {
						getFrUserInfo(jsonObj.ticket);
					}

				}
			},
			fail: function(data) {
				oncloseWindow();
			}
		});
	} catch(e) {
		alert(e)
	}

};

function oncloseWindow() {
	lightAppJssdk.navigation.close({
		success: function(data) {
			alert(data);

		},
		fail: function(data) {}
	});
};