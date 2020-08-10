var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var startpage = 0;
var storage = window.localStorage;
//个人登录
function requestGrLogin() {
	//	document.getElementById('logingrbtn').disabled = true; /////true禁用，false可用
	var username = document.getElementById('grname').value;
	var userpwd = document.getElementById('grpwd').value;
	//	alert(Encrypt("zj13585105811"));

	if(!(new RegExp("\\S+")).test(document.getElementById('grname').value)) {
		alert('请输入您的账户名');
		//		document.getElementById('logingrbtn').disabled = false; /////true禁用，false可用
		return;
	}
	if(!(new RegExp("\\S+")).test(document.getElementById('grpwd').value)) {
		alert('请输入密码');
		//		document.getElementById('logingrbtn').disabled = false; /////true禁用，false可用
		return;
	}

	var now = new Date();
	//	var nowtime = 1900 + now.getYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "-" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	var nowtime = now.getTime();
	var tokenuuid = hex_md5(nowtime + "318qwe" + '863151027391249');
	var usernames = Encrypt(username, GRKEY, GRIV);
	var userpwds = Encrypt(userpwd, GRKEY, GRIV);

	var date = {
		loginname: usernames,
		password: userpwds,
		siteid: 1,
		clienttype: 2,
		version: 312,
		uuid: '863151027391249',
		uniquecode: nowtime,
		tokenuuid: tokenuuid
	}
	//	var requesturl = "http://www.zjzwfw.gov.cn/zjzw/app/interface/new/loginpersonal.do";
	var requesturl = overallInterface + "ywzw/interface/loginperson.do";
	myRequest({
		url: requesturl,
		data: date,
		dataType: 'text',
		header: '',
		success: function(data) { //去掉回车换行
			data = data.toString().replace(/[\r\n]/g, "");
			data = Decrypt(data, GRKEY, GRIV);
			data = decodeURIComponent(data);
			var obj = JSON.parse(data);
			if(obj.result == 0) { //有数据 
				//第一步：将法人用户的字段整合进来
				var addFRData = {
					"realLevel": "",
					"appConEntName": "",
					"appConRegNo": "",
					"appConEntUniCode": "",
					"orgType": "",
					"appConEntType": "",
					"appConLoc": "",
					"uniscid": "",
					"nbxh": "",
					"appConMgrScope": "",
					"xzqh": ""
				}
				var addFRDataJson = JSON.stringify(addFRData);
				addFRDataJson = addFRDataJson.substring(1, addFRDataJson.length);
				data = data.substring(0, data.length - 1);
				data = data + "," + addFRDataJson;
				//第二步：用户信息存本地
				storage.wxuserInfo = data;
				storage.wxuserType = "GR";
				storage.wxpassword = userpwd;
				//isFrom:01 网上预约  02网上办证  3网上证明
				if(isFrom == "01") { //网上预约
					window.location.href = "../../onlineoder/view/oderlist.html?type=01";
					//					history.go(-1);
				} else if(isFrom == "02") { //网上办证
					window.location.href = "../../onlineoder/view/oderlist.html?type=02";
					//					history.go(-1);
				} else if(isFrom == "03") { //网上证明
					//					window.location.href = "../../onlineoder/view/oderlist.html?type=03";
					history.go(-1);
				} else {
					window.location.href = "../../mycenter/view/personalcenter.html";
				}

			} else { //无数据
				alert(obj.errmsg);
			}
		},
		fail: function(data) {
			alert("加载失败");
		}
	});
}

function requestFrLogin() {
	//	document.getElementById('logingrbtn').disabled = true; /////true禁用，false可用
	var username = document.getElementById('frname').value;
	var userpwd = document.getElementById('frpwd').value;

	if(!(new RegExp("\\S+")).test(document.getElementById('frname').value)) {
		alert('请输入您的账户名');
		//		document.getElementById('logingrbtn').disabled = false; /////true禁用，false可用
		return;
	}
	if(!(new RegExp("\\S+")).test(document.getElementById('frpwd').value)) {
		alert('请输入密码');
		//		document.getElementById('logingrbtn').disabled = false; /////true禁用，false可用
		return;
	}
	var json = '{"username":"' + username + '","password":"' + userpwd + '"}';
	var jsons = Encrypt(json, FRKEY, FRIV);
	var data1 = {
		jsons: jsons
	};
	var requesturl = overallInterface + "ywzw/interface/frlogin.do";
	myRequest({
		url: requesturl,
		data: data1,
		dataType: 'text',
		header:'',
		success: function(data) {
			//去掉回车换行
			var sa = data.toString().replace(/[\r\n]/g, "");
			var sdad = Decrypt(sa, FRKEY, FRIV);
			sdad = JSON.parse(sdad);
			if(sdad.retcode == 0) { //有数据

				var userDic = sdad.userBasicInfo;
				var appDic = sdad.appBasicInfo;
				//第一步：将个人用户的字段整合进来
				var FROBJ = {
					"officefax": "",
					"mobile": "",
					"birthday": "",
					"sex": "",
					"telephone2": "",
					"idtype": "",
					"officialtype": "",
					"servicecontent": "",
					"city": "",
					"officerlicense": "",
					"useable": "",
					"province": "",
					"official": "",
					"permitlicense": "",
					"companypro": "",
					"companysize": "",
					"companydesc": "",
					"homephone": "",
					"companyalias": "",
					"authlevel": userDic.realLevel,
					"firmname": "",
					"companytype": "",
					"orgcoding": "",
					"mobile2": "",
					"officeaddress": "",
					"idnum": "",
					"companyname": "",
					"telephone": "",
					"nation": "",
					"country": "",
					"officenum": "",
					"driverlicense": "",
					"homeaddress": "",
					"orderby": "",
					"headpicture": "",
					"totalcount": "",
					"email": "",
					"virtualnum": "",
					"postcode": "",
					"city": "",
					"loginname": userDic.username,
					"userid": userDic.userid,
					"orgType": userDic.orgType,
					"username": userDic.username,
					"email": "",
					"realLevel": userDic.realLevel,
					"headpicture": "",
					"appConEntName": appDic.appConEntName,
					"appConRegNo": appDic.appConRegNo,
					"appConEntUniCode": appDic.appConEntUniCode,
					"appConEntType": appDic.appConEntType,
					"appConLoc": appDic.appConLoc,
					"uniscid": appDic.uniscid,
					"nbxh": appDic.nbxh,
					"appConMgrScope": appDic.appConMgrScope,
					"xzqh": appDic.xzqh
				}
				//第二步：用户信息存本地
				var FRUserInfo = JSON.stringify(FROBJ);
				storage.wxuserInfo = FRUserInfo;
				storage.wxuserType = "FR";
				//isFrom:01 网上预约  02网上办证  3网上证明
				if(isFrom == "01") { //网上预约
					window.location.href = "../../onlineoder/view/oderlist.html?type=01";
					//					history.go(-1);
				} else if(isFrom == "02") { //网上办证
					window.location.href = "../../onlineoder/view/oderlist.html?type=02";
					//					history.go(-1);
				} else if(isFrom == "03") { //网上证明
					//					window.location.href = "../../onlineoderorder/view/oderlist.html?type=03";
					history.go(-1);
				} else {
					window.location.href = "../../mycenter/view/personalcenter.html";
				}

			} else { //无数据
				alert(sdad.retmsg);
			}
		},
		fail: function(data) {
			alert("加载失败")
		}
	});
}