var storage = window.localStorage;
//网络状态
function onNetworkType() {
	//    config('528e07d64902423fbe6e4d59019f7508','9d68a2e965e8ae2c5d284fe5e9f4e674');
	networkType({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//用户注册（浙江为例）
function onRegisterUser() {
	registerUser({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};

//找回密码（浙江为例）
function onModifyPassword() {
	modifyPassword({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//获得用户信息
function onGetUserInfo() {
	
	getUserInfo({
		success: function(data) {
			if(data == '未登录') {	
				onLoginApp();
			} else {
				getUserInfoSuccess(data);
			}
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//function onGetUserInfo() {
//	getUserInfo({
//		success: function(data) {
//			if(data == '未登录') {
//				onLoginApp();
//			} else {
//				getUserInfoSuccess(data);
//
//			}
//		},
//		fail: function(data) {
//			document.getElementById("nologin").style.display = "block";
//			mui.alert("加载失败");
//		}
//	});
//
//};
//获得用户票据
function onGetUserTicket() {
	getUserTicket({
		success: function(data) {
			
		},
		fail: function(data) {
			alert(data);
		}
	});
};

//登录
function onLoginApp() {
	loginApp({
		success: function(data) {
			if(data == "未登录") {

			} else {
				getUserInfoSuccess(data);
			}
		},
		fail: function(data) {
			alert("加载失败");
		}
	});

};
//function onLoginApp() {
//
//	loginApp({
//		success: function(data) {
//			document.getElementById("nologin").style.display = "none";
//			if(data == "未登录") {
//				document.getElementById("nologin").style.display = "block";
//			} else {
//				getUserInfoSuccess(data);
//			}
//		},
//		fail: function(data) {
//			document.getElementById("nologin").style.display = "block";
//			alert("加载失败");
//		}
//	});
//
//};

//注销
function onLogout() {

	logout({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};

//登录到qq
function onLoginQQ() {
	loginQQ({
		success: function(data) {
			if(typeof data === 'string' && data.constructor == String) {
				alert(data);
			} else {
				var userName = data.userName; //用户昵称
				var userIcon = data.userIcon; //用户头像的url
				var userId = data.userId; //用户id
				alert("用户昵称:" + userName + "\n用户头像url:" + userIcon + "\n用户ID:" + userId);
			}
		},
		fail: function(data) {
			alert(data);
		}
	});

};
//注销qq
function onLogoutQQ() {
	logoutQQ({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//登录到腾讯微博
function onLoginTencentWeibo() {
	loginTencentWeibo({
		success: function(data) {
			if(typeof data === 'string' && data.constructor == String) {
				alert(data);
			} else {
				var userName = data.userName; //用户昵称
				var userIcon = data.userIcon; //用户头像的url
				var userId = data.userId; //用户id
				alert("用户昵称:" + userName + "\n用户头像url:" + userIcon + "\n用户ID:" + userId);
			}

		},
		fail: function(data) {
			alert(data);
		}
	});
};
//注销腾讯微博
function onLogoutTencentWeibo() {
	logoutTencentWeibo({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//登录到新浪微博
function onLoginSinaWeibo() {

	loginSinaWeibo({
		success: function(data) {
			if(typeof data === 'string' && data.constructor == String) {
				alert(data);
			} else {
				var userName = data.userName; //用户昵称
				var userIcon = data.userIcon; //用户头像的url
				var userId = data.userId; //用户id
				alert("用户昵称:" + userName + "\n用户头像url:" + userIcon + "\n用户ID:" + userId);
			}

		},
		fail: function(data) {
			alert(data);
		}
	});
};
//注销新浪微博
function onLogoutSinaWeibo() {
	logoutSinaWeibo({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

//获得设备唯一标示
function onUUID() {
	getUUID({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

//计算距离
function onGetDistance(arg0) {
	getDistance({
		arg: arg0,
		success: function(data) {
			alert("距离:" + data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

//获得坐标
function onLocation() {
	getlocation({
		success: function(data) {
			if(typeof data === 'string' && data.constructor == String) {
				alert(data);
			} else {
				var cityName = data.cityName;
				var region = data.region;
				var detailAddress = data.detailAddress;
				var longitude = data.longitude;
				var latitude = data.latitude;
				alert("经度:" + longitude + "\n纬度:" + latitude + "\n城市名:" + cityName + "\n区域:" + region + "\n详细地址:" + detailAddress);
			}
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//选取图片
//你们自己定义的方法
function onChooseImage(arg0, arg1, arg2) {
//alert("22");
	//调用我们的方法
	try {
		chooseImage({
			arg: arg0,
			success: function(data) {
//alert("拍照"+data);
				var container = containerT();

				var index = arg0;
				var photoid = "photo" + index;
				var dd = document.getElementById(photoid);
				if(container == "web") { //微信
					if(data.result == "true") {
						var picArray = data.picPath;

						for(var i = 0; i < picArray.length; i++) {
							var img = document.createElement("img");
							img.className = "images";
							img.src = picArray[i];
							dd.innerHTML += "<div style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><img src='" + img.src + "' style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0; '/><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + index + "',this,'" + img.src + "','" + arg1 + "')\">删除</div></div>";

							//将图片存到数组中，上传的时候用

							var dic = {
								"materialUNID": arg1,
								"materialName": arg2,
								"path": img.src
							};

							filesArray.push(dic);

						}
					} else {
						alert("上传失败");
					}

				} else { //app中
					if(data.result == 'true') {

						//拿到数据之后自己处理
						for(var i = 0; i < data.picPath.length; i++) {

							var img = document.createElement("img");
							img.className = "images";
							img.src = data.picPath[i];

							dd.innerHTML += "<div style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' ><img src='" + img.src + "' style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0; '/><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;color: #ff0000;border-width: 0px;' onclick=\"deleteImage('" + index + "',this,'" + img.src + "','" + arg1 + "')\">删除</div></div>";

							//将图片存到数组中，上传的时候用

							var dic = {
								"materialUNID": arg1,
								"materialName": arg2,
								"path": img.src
							};
							filesArray.push(dic);

						}

					} else if (data.result == 'cancel') {
						
					} else {
						alert("上传失败");
					}
				}

			},
			fail: function(data) {
				alert("上传失败");
			}
		});

	} catch(e) {
		alert(e);

	}

};

//选取视频
function onChooseVideo() {
	chooseVideo({
		success: function(data) {
			if(data.result == 'true') {
				var videoStr = " <div><p class='btnInfo'>拍摄或从手机中选视频接口</p><button class='sbtn' onclick=onChooseVideo()>chooseVideo</button></div> <div align='center'><video src='" + data.videoPath + "'  width='100' height='200'" + "controls='controls'>" +
					"<source src='/i/movie.ogg' type='video/ogg'>" + "<source src='/i/movie.mp4' type='video/mp4'></video></div>"
				document.getElementById("videoBody").innerHTML = videoStr;
			} else {
				alert(data.message);
			}
		},
		fail: function(data) {
			alert(data.result);
		}
	});
};

function onChooseVideoAndPic() {

	chooseVideoAndPic({
		success: function(data) {
			if(data.result == 'true') {
				var pic = data.picPath;
				var video = data.videoPath;
				if(pic != '') {
					for(var i = 0; i < pic.length; i++) {
						var img = document.createElement("img");
						img.className = "images";
						img.src = pic[i];
						document.getElementById("cameraandvideoBody").appendChild(img);
						var link = document.createElement("link");
						link.setAttribute("rel", "stylesheet");
						link.setAttribute("type", "text/css");
						link.setAttribute("href", "../css/camera.css");
						document.getElementById("cameraandvideoBody").appendChild(link);
					}
				}
				if(video != '') {
					var videoStr = " <div><p class='btnInfo'>综合媒体接口</p> <button class='sbtn' onclick=onChooseVideoAndPic()>chooseImageandVideo</button></div> <div align='center'><video src='" + video + "'  width='100' height='200'" + "controls='controls'>" +
						"<source src='/i/movie.ogg' type='video/ogg'>" + "<source src='/i/movie.mp4' type='video/mp4'></video></div>"
					document.getElementById("cameraandvideoBody").innerHTML = videoStr;
				}
			} else {
				alert(data.message);
			}

		},
		fail: function(data) {
			alert(data);
		}
	});
}

//音频
var audio;

function onStartVoice() {

	startVoice({
		success: function(data) {

		},
		fail: function(data) {
			alert(data);
		}
	});

};

function onStopVoice() {
	stopVoice({
		success: function(data) {
			audio = data.audioPath;
			alert(audio);
		},
		fail: function(data) {

		}
	});

};

function onPlayVoice() {
	if(audio == null) {
		alert("请先使用startVoice接口录制一段声音");
	}
	playVoice({
		audio: audio,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

function onStopPlayVoice() {

	stopPlayVoice({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

//二维码
function onGetQRCode() {

	getQRCode({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//分享
function onShare() {
	//自定义分享内容
	var titleStr = "测试内容的标题"; //标题，如果没有赋空值
	var contentStr = "这是测试的分享内容"; //内容，如果没有赋空值
	var shareUrlStr = "http://www.baidu.com"; //分享的链接，如果没有赋空值
	var imageStr = "http://pic.nipic.com/2007-11-09/2007119122519868_2.jpg"; //图片的url地址,如果没有赋空值
	var dic = {
		"titleStr": titleStr,
		"contentStr": contentStr,
		"shareUrlStr": shareUrlStr,
		"imageStr": imageStr
	};
	share({
		arg: dic,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};
//支付
function onPay() {
	var keyy = document.getElementById("order_id").innerHTML; //传入订单号
	var valuee = document.getElementById("good_name").innerHTML; //传入商品名
	var keyy1 = document.getElementById("all_price").innerHTML; //传入价格
	var valuee1 = document.getElementById("time").innerHTML; //传入时间
	var type = '0';
	pay({
		orderNum: keyy,
		goodName: valuee,
		allPrice: keyy1,
		orderTime: valuee1,
		payType: type,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};
//保存数据
function onSetItem() {
	var keyy = document.getElementById("key").value; //传入要保存数据的key
	var valuee = document.getElementById("value").value; //传入要保存数据的value

	setItem({
		key: keyy,
		value: valuee,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

////读取数据
//function onGetItem(option) {
//	var keyy = "faceResult"; //传入需要读取数据的key值
//	alert(keyy);
//	getItem({
//		key: keyy,
//		success: function(data) {
//			option.success(data);
//		},
//		fail: function(data) {
//			option.fail(data);
//		}
//	});
//};
//删除数据
function onRemoveItem() {
	var keyy = "faceResult"; //传入要移除的数据的key值
	removeItem({
		key: keyy,
		success: function(data) {
			//			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};
//页面控制
function onShowOrHiddenNav(arg0, arg1, arg2, arg3) {
	showOrHiddenNav({
		key1: arg0,
		key2: arg1,
		key3: arg2,
		key4: arg3,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
};

function oncloseWindow() {
	closeWindow({
		success: function(data) {},
		fail: function(data) {}
	});
};
//提交
function onSubmit(arg0) {
	var content = document.getElementById("jmpinfo").value;
	var json = '{"content":' + '"' + content + '"' + '}';
	submit({
		url: arg0,
		key1: json,
		key2: videopath,
		key3: audiopath,
		key4: picPath,
		success: function(data) {
			alert(data);
			picPath = null;
			audiopath = null;
		},
		fail: function(data) {
			alert(data);
		}
	});

};

//打电话
function onCallPhone(arg0) {

	callPhone({
		phone: arg0,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
}; //发短信
function onSendMessage(arg0) {
	sendMessage({
		phone: arg0,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});
}; //发邮件
function onSendEmail(arg0) {
	sendEmail({
		email: arg0,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};
//实人认证
function onFaceID(arg0) {
	faceIdentification({
		userId: arg0,
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};

function onAlipayID() {
	alipayIdentification({
		success: function(data) {
			alert(data);
		},
		fail: function(data) {
			alert(data);
		}
	});

};
//获取用户信息成功后的方法
function getUserInfoSuccess(data) {
	document.getElementById("loading").display = "none";
	storage.userInfo = data;
	var obj = JSON.parse(data);
	if(obj.appConEntName == "" || typeof(obj.appConEntName) == "undefined") { //个人
		if(onlinetype == "01" || onlinetype == "04") { //网上预约--初级可预约
			if(obj.authlevel == "2" || obj.authlevel == "3") { //高级
				document.getElementById("pullrefresh").style.display = "block";
				document.getElementById("listcontent").style.display = "block";
			} else {
				window.location.href = "http://ywszwfw.yw.gov.cn/jmportal/resources/yw/apps/mycenter/view/sm.html";
			}
		} else {
			if(obj.authlevel == "3") { //高级
				document.getElementById("pullrefresh").style.display = "block";
				document.getElementById("listcontent").style.display = "block";
			} else {
				window.location.href = "http://puser.zjzwfw.gov.cn/sso/mobile.do?action=realname&servicecode";
			}
		}
	} else { //法人
		document.getElementById("pullrefresh").style.display = "block";
		document.getElementById("listcontent").style.display = "block";
	}

}