var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
//证照图片地址
var imgurl;
var dataArray;
var storage = window.localStorage;
var userInfo;

function requestDosListData() {
	//判断容器类型，浏览器还是APP
	var container = containerT();
	if(container == "web") { //微信
		userInfo = storage.wxuserInfo;
		userInfo = JSON.parse(userInfo);
	} else { //app 
		userInfo = storage.userInfo;
		userInfo = JSON.parse(userInfo);
	}
	var idcard = userInfo.idnum;
	var date = {
		idcard: idcard
	}
	myRequest({
		  url: overallInterface + "ywzw/interface/getAllMyInfo.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if(obj.length > 0) { //有数据
				dataArray = [];
				dataArray = obj;
				document.getElementById('badmessage').style.display = 'none';
				document.getElementById('list').style.display = 'block';
			} else { //无数据
				dataArray = [];
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					var color;
					if(dataArray[i].handlestate == "办结"){
						color = "blue";
					}else if(dataArray[i].handlestate == "补齐补正"){
						color = "red";
					}else{
						color = "";
					}
					example.items.push({
						index: i,
						itemid: dataArray[i].projid,
						itemname: dataArray[i].projectname,
						deptname: dataArray[i].deptname,
						servicename: dataArray[i].servicename,
						projpwd: dataArray[i].projpwd,
						transact_time: dataArray[i].transact_time,
						create_time: dataArray[i].create_time,
						accept_time: dataArray[i].accept_time,
						handlestate: dataArray[i].handlestate,
						color: color,
						time: dataArray[i].create_time
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}
	
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('list').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
	
          }
    });

}

function requestDosPic(projid, pwd) {
	var date = {
		projid: projid,
		pwd: pwd
//		projid: '330782551602251000001',
//		pwd: '923767'
	}
	myRequest({
		  url: overallInterface + "ywzw/interface/getMyInfo.do",
          data: date,
          header:'',
          success:function(data){ //请求成功
			if(!(new RegExp("\\S+")).test(data)) {
				return
			}
			var obj = data;
			//办件证照
			imgurl = obj.imgurl;
			if(!(new RegExp("\\S+")).test(imgurl)) {
				return
			}
			document.getElementById("zzpic").style.display = '';
			document.getElementById("zzpic").src = "http://ywszwfw.yw.gov.cn/" + imgurl;
	
          },
          fail:function(data){
          }
    });

}

function funzzpic() {
	window.location.href = 'MyDosPic.html?pic=' + "http://ywszwfw.yw.gov.cn/" + imgurl;
}