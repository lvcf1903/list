var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})   
var dataArray;
var pagenum = 1;

//请求网上预约列表
function requestOrderList(num) {
	document.getElementById('loading').style.display = 'block';
	//菊花
	var opts = {
		//参数列表    
		lines: 10, // loading小块的数量
		length: 10, // 小块的长度
		width: 4, // 小块的宽度
		radius: 8, // 整个圆形的半径
		corners: 1, // 小块的圆角，越大则越圆
		rotate: 0, // loading动画的旋转度数，貌似没什么实际作用
		color: '#ddd', // 颜色
		speed: 1, // 变换速度
		trail: 60, // 余晖的百分比
		shadow: false, // 是否渲染出阴影
		hwaccel: false, // 是否启用硬件加速
		className: 'spinner', // 给loading添加的css样式名
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 'auto', // Top position relative to parent in px
		left: 'auto' // Left position relative to parent in px
	};
	var target = document.getElementById('food');
	var spinner = new Spinner(opts).spin(target);
    requesturl=mainurl+"/interfaces/yuyue/getGroupbyBmmc.do"
	myRequest({
		header: '',
		url: requesturl,
		data: {
			bmmc:name
		}, 
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			dataArray = [];
			dataArray = JSON.parse(data);
			if(dataArray.length > 0) { //有数据
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {

						if(i % 3 == 0) {
							var col = "#6ec2ff"
						} else if(i % 3 == 1) {
							var col = "#ff7f71"
						} else if(i % 3 == 2) {
							var col = "#ffda78"
						}
						/*var obj = {
							"groupno":dataArray[i].groupno,
							"groupname":dataArray[i].groupname
						};*/
						var jsonstr = JSON.stringify(dataArray[i]);
						example.items.push({
							object: jsonstr,
							index: i,
							groupno: dataArray[i].队列号,
							color: col,
							groupname: dataArray[i].队列名称,
							sitename: dataArray[i].站点编号,
						});
				}
				document.getElementById("parent").style.display = "block";
			} else { 
				document.getElementById("badmessage").style.display = "block";
				document.getElementById("listcontent").style.display = "none";
				document.getElementById("wodeyuyue").style.display = "none";
				
			}
		},
		fail: function(data) {
			mui.alert("加载失败");
			document.getElementById("badmessage").style.display = "block";
			document.getElementById("listcontent").style.display = "none";
			document.getElementById("wodeyuyue").style.display = "none";
		}
	});


}



function yyqhsuccess(jsonStr){
	
	var groupno = jsonStr.队列号;
	var groupname =jsonStr.队列名称
	var sitename =jsonStr.站点编号
	mui.openWindow({
		url: "handleorder.html?sitename=" + sitename + "&groupno=" + groupno+ "&groupname=" + groupname
			})
}

