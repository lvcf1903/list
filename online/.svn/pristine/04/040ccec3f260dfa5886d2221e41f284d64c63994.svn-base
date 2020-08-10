var example = new Vue({
	el: '#parent',
	data: {
		items: [],
		infoprojid: "",
		servicename: "",
		projid: "",
		projpwd: "",
		applyname: "",
		receive_deptname: "",
		receive_time: "",
		promiseday: "",
		transact_time: "",
		handlestate: ""
	}
})

//获取我的办件列表
function requestDosListData() {
	var userInfo = window.localStorage.wxuserInfo;
	userInfo = JSON.parse(userInfo);
	//判断容器类型，浏览器还是APP
	$.ajax({
		url: overallInterface + "interface/ningbo/requestMyInfo.do",
		data: {
			userId: userInfo.userid
		},
		type: "post",
		dataType: "json",
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			//接口返回失败
			if(data.result == "01") {
				mui.alert(data.resultmsg);
				return;
			}
			//接口返回成功
			var dataArray = data.resultdata;
			if(dataArray != undefined && dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var color;
					if(dataArray[i].handlestate == "办结") {
						color = "blue";
					} else if(dataArray[i].handlestate == "补齐补正") {
						color = "red";
					} else {
						color = "";
					}
					example.items.push({
						index: i,
						projid: dataArray[i].projid,
						itemname: dataArray[i].servicename,
						handlestate: dataArray[i].handlestate,
						color: color,
						time: dataArray[i].receive_time
					});
					document.getElementById('badmessage').style.display = 'none';
					document.getElementById('list').style.display = 'block';
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}
		},
		error: function(e) {
			document.getElementById('loading').style.display = 'none';
			document.getElementById('list').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
		}
	});
}

function requestDosPic(projid) {

	$.ajax({
		url: overallInterface + "interface/ningbo/requestMyInfoDetail.do",
		data: {
			projid: projid
		},
		type: "post",
		dataType: "json",
		success: function(data) { //请求成功			
			//接口返回失败
			if(data.result == "01") {
				mui.alert(data.resultmsg);
				return;
			}
			//接口返回成功
			var baseInfo = data.baseInfoData;
			example.infoprojid = baseInfo.infoprojid;
			example.servicename = baseInfo.servicename;
			example.projid = baseInfo.projid;
			example.projpwd = baseInfo.projpwd;
			example.applyname = baseInfo.applyname;
			example.receive_deptname = baseInfo.receive_deptname;
			example.receive_time = baseInfo.receive_time;
			example.promiseday = baseInfo.promiseday;
			example.transact_time = baseInfo.transact_time;
			example.handlestate = baseInfo.handlestate;
			document.getElementById('cont').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
		},
		error: function(e) { //请求失败
			document.getElementById('loading').style.display = 'none';
		}
	});
}