var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;
var tluserinfo = localStorage.getItem("tluserinfo");
tluserinfo = JSON.parse(tluserinfo);
var telephone = tluserinfo.mobile;
var sfz = tluserinfo.idnum;
//请求网上预约列表
function requestOrderList() {
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
	requesturl = "http://220.191.228.153:9090/lanxi/interfaces/yuyue/getYyxx.do"
	/*myRequest({*/
	myRequest({
		url: requesturl,
		data: {
			telephone: telephone
		},
		header: '',
		success: function(data) {
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
			dataArray = [];
			dataArray = data;
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
					var jsonstr = JSON.stringify(dataArray[i]);
					example.items.push({
						object: jsonstr,
						index: i,
						color: col,
						groupname: dataArray[i].队列名称,
						yyrq: dataArray[i].预约日期,
						number: dataArray[i].取号密码
					});
				}
				document.getElementById("parent").style.display = "block";
			} else {
				document.getElementById("badmessage").style.display = "block";
				document.getElementById("listcontent").style.display = "none";
			}
		},
		fail: function(data) {
			mui.alert("加载失败");
			document.getElementById("badmessage").style.display = "block";
			document.getElementById("listcontent").style.display = "none";
		}
	});
}

function qxyy(jsonStr) {

	var btnArray = ['取消', '确认'];
	mui.confirm('确认取消预约吗？', '提示', btnArray, function(e) {
		if(e.index == 1) {
			var number = jsonStr.取号密码;
			var ctrllerid = jsonStr.站点编号;
			var groupno = jsonStr.队列号;
			var yyrq = jsonStr.预约日期;
			var Cancelurl = "http://220.191.228.153:9090/lanxi/interfaces/yuyue/CancelTicketQno.do";
			myRequest({
				header: '',
				url: Cancelurl,
				data: {
					ctrllerid: ctrllerid,
					groupno: groupno,
					telephone: telephone,
					yyrq: yyrq,
					psd: number
				},
				success: function(data) {
					if(data == true) { //有数据
						mui.alert("取消预约成功！");
						requestOrderList();
						//var Cancelurl2 = "http://60.191.18.50/tonglu/tonglu/yuyue/cancalorder.do"
						/*myRequest({
							header: '',
							url: Cancelurl2,
							data: {
								iid: iid,
							},
							success: function(data) {
								if(data.success == true) { //有数据
									mui.alert("取消预约成功！");
									requestOrderList();
								} else {
									mui.alert("取消预约失败！");
								}
							},
							fail: function(data) {
								mui.alert("请求失败,请检查您的网络环境！");

							}
						});*/

					} else {
						mui.alert("取消预约失败！");
					}
				},
				fail: function(data) {
					mui.alert("请求失败,请检查您的网络环境！");

				}
			});
		} else {

		}
	})

}