var dataArray;
var startpage = 0;
var type;
var topid = '';
var orderid = '';
var obj;

var now = new Date();
var nowtime = now.getTime();
var tokenuuid = hex_md5(nowtime + "318qwe" + '863151027391249');

//首页banner图
function getBannerData(resourceid) {
	var date = {
		siteid: wmhsiteid,
		clienttype: '3',
		uuid: '863151027391249',
		version: '1.0',
		resourceid: resourceid,
		topid: '',
		orderid: '',
		time: '',
		flag: '',
		type: '1',
		page: '6',
		uniquecode: nowtime,
		tokenuuid: tokenuuid
	}
	myRequest({
		  url: wmhurl + "interfaces/infolist.do",
          data: date,
          header:'',
          success:function(data){
			var innerhtml01 = '';
			var innerhtml02 = '';
			var innerhtml1 = '';
			var innerhtml2 = '';
			if(data != null) {
					obj = data;
					dataArray = [];
					var resourceid = obj.resource[0].resourceid;
					dataArray = obj.resource[0].resourcetitle;
					var imgurl = '';
					for(var i = 0; i < dataArray.length; i++) {
						//						imgurl = dataArray[i].imageurl;
						//						var imgurl1 = imgurl.split(',')[0];
						var titleid = dataArray[i].titleid;
						innerhtml01 += "<div class='mui-slider-item'><a href='" + "GovernContent.html?resourceid=" + resourceid + "&titleid=" + titleid + "' ><div style=' background-image:url(" + dataArray[i].imageurl.split(',')[0] + ");background-size: cover;background-position: 50% 50%;background-repeat: no-repeat no-repeat;width:100%;height:180px;'></div></a></div>";

					}
					for(var i = 0; i < dataArray.length - 1; i++) {
						innerhtml02 += "<div class='mui-indicator'></div>";
					}
					innerhtml1 = "<div class='mui-slider-item mui-slider-item-duplicate'><a href='" + "00" + "'><div style=' background-image:url(" + dataArray[dataArray.length - 1].imageurl.split(',')[0] + ");background-size: cover;background-position: 50% 50%;background-repeat: no-repeat no-repeat;width:100%;height:180px;'></div></a></div>" +
						innerhtml01 + "<div class='mui-slider-item mui-slider-item-duplicate'><a href='" + "11" + "'><div style=' background-image:url(" + dataArray[0].imageurl.split(',')[0] + ");background-size: cover;background-position: 50% 50%;background-repeat: no-repeat no-repeat;width:100%;height:180px;'></div></a></div>";
					innerhtml2 = "<div class='mui-indicator mui-active'></div>" + innerhtml02;

				document.getElementById('slider1').innerHTML = innerhtml1;
				document.getElementById('slider2').innerHTML = innerhtml2;

				var slider = mui("#slider");
				slider.slider({
					interval: 3000
				});
			}
          },
          fail:function(data){
          }
    });

	//	getOfficeClassifyData();
}

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

//首页分类栏目
function getClassifyData() {
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 863151027391249,
		version: 1.0,
		cateid: officehallid,
		uniquecode: nowtime,
		tokenuuid: tokenuuid
	}
	myRequest({
		  url: wmhurl + "interfaces/cates.do",
          data: date,
          header:'',
          success:function(data){
			//			document.getElementById('loading').style.display = 'none';
			if(data != null) {
				obj = data;
				dataArray = [];
				dataArray = obj.resource;
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i,
						columnname: dataArray[i].resourcename,
						imgurl: dataArray[i].cateimgurl,
						imgurl: dataArray[i].cateimgurl,
						lightappurl: dataArray[i].lightappurl,
						columnid: dataArray[i].resourceid
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				dataArray = [];
				mui.alert("暂无数据");
			}
          },
          fail:function(data){
          }
    });
}

var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
})

//首页热点应用
function getHotApplyData() {
	//个人主题列表
	var date = {
		webid: 66
	};
	myRequest({
		  url: zjzwurl + "app/interface/new/getHotApplylist.do",
          data: date,
          header:'',
          success:function(data){
			data = "{\"webid\":\"66\",\"flag\":\"0\",\"resource\":[{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"26\",\"title\":\"天气预报\",\"orderid\":\"-24\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/sfb6b689fc8e24556a302f29a04abc8c7.png\",\"opentype\":\"1\",\"openurl\":\"http://zjtqyb.yyhj.zjzwfw.gov.cn\",\"jrtype\":null,\"categoryid\":\"10\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"36\",\"title\":\"诊疗挂号\",\"orderid\":\"-40\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/sa207c27a593448dda409672b54258350.png\",\"opentype\":\"1\",\"openurl\":\"http://zjghyy.yyhj.zjzwfw.gov.cn/#/home\",\"jrtype\":\"0\",\"categoryid\":\"2\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"24\",\"title\":\"水电气缴费\",\"orderid\":\"-21\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/s88866359cc3448658813920a3b1bdeae.png\",\"opentype\":\"1\",\"openurl\":\"http://www.zjzwfw.gov.cn/col/col64944/index.html\",\"jrtype\":null,\"categoryid\":\"3\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"27\",\"title\":\"交通违法缴款\",\"orderid\":\"-33\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/s4ad59a533b404714b2b007da19334df7.png\",\"opentype\":\"1\",\"openurl\":\"http://mpay.zjzwfw.gov.cn/jtwfjk/jjlist.html?PAYSOURCE=004\",\"jrtype\":null,\"categoryid\":\"0\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"30\",\"title\":\"新生儿重名\",\"orderid\":\"-27\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/s95628bdce6c447ddbeb42aa631273aaa.png\",\"opentype\":\"1\",\"openurl\":\"http://zjxsrcm.yyhj.zjzwfw.gov.cn\",\"jrtype\":null,\"categoryid\":\"7\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"28\",\"title\":\"空气质量\",\"orderid\":\"-19\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/s0a17ca19341f46d88b0257af969f37f3.png\",\"opentype\":\"1\",\"openurl\":\"http://app.zjzwfw.gov.cn/zjjssdk/tqyb/weather.jsp?citycode=101210101&123\",\"jrtype\":null,\"categoryid\":\"10\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"18\",\"title\":\"高速实时路况\",\"orderid\":\"-14\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/seeee5937afa84bee8b2da7971b8d479d.png\",\"opentype\":\"1\",\"openurl\":\"http://zjgssslk.yyhj.zjzwfw.gov.cn\",\"jrtype\":null,\"categoryid\":\"0\"},{\"cataid\":null,\"tablename\":null,\"webid\":\"1\",\"flag\":\"0\",\"resourceid\":\"11\",\"title\":\"查汽车票\",\"orderid\":\"-3\",\"imageurl\":\"http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/saa1b8b0c64e94a66b8a4e16b383fd86d.png\",\"opentype\":\"1\",\"openurl\":\"http://zjqcp.yyhj.zjzwfw.gov.cn\",\"jrtype\":null,\"categoryid\":\"0\"}]}";
			if(data != null) {
				example1.items1 = [];
				var grztlist = JSON.parse(data);
				var dataArray = [];
				dataArray = grztlist.resource;
				var arrlength = 8;
				if(dataArray.length < 8) {
					arrlength = dataArray.length;
				}
				for(var i = 0; i < arrlength; i++) {
					example1.items1.push({
						index: i,
						title: dataArray[i].title,
						imageurl: dataArray[i].imageurl,
						openurl: dataArray[i].openurl
					});
				}
			}
          },
          fail:function(data){
          }
    });
}

var example2 = new Vue({
	el: '#parent2',
	data: {
		items2: []
	}
})

//政务资讯
function requestInfoListData() {
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 863151027391249,
		version: 1.0,
		resourceid: resid1,
		topid: '',
		orderid: '',
		time: '',
		flag: '',
		type: 1,
		page: 3,
		uniquecode: nowtime,
		tokenuuid: tokenuuid
	}
	myRequest({
		  url: wmhurl + "interfaces/infolist.do",
          data: date,
          header:'',
          success:function(data){
			//refresh completed
			//			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); 

			var obj;
			if(data != null) { //有数据
				obj = data;
				dataArray = [];
				dataArray = obj.resource[0].resourcetitle;
				resourceid = obj.resource[0].resourceid;
			} else { //无数据
				dataArray = [];
				mui.alert("暂无数据");
			}

			if(dataArray.length > 0) { //有数据
				example2.items2 = [];
				for(var i = 0; i < dataArray.length; i++) {
					var d = new Date();
					d.setTime(dataArray[i].time);
					var convertTime1 = convertTime(d);
					example2.items2.push({
						index: i,
						infoid: dataArray[i].titleid,
						resourceid: resourceid,
						title: dataArray[i].titletext,
						source: dataArray[i].source,
						time: convertTime1
					});
					if(i == 0) {
						//						document.getElementById("parent2").style.display = "block";
					}
				}
			} else { //无数据

			}
          },
          fail:function(data){
          }
   });

}

function convertTime(now) {
	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日

	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var ss = now.getSeconds(); //秒

	var clock = year + "-";

	if(month < 10)
		clock += "0";

	clock += month + "-";

	if(day < 10)
		clock += "0";

	clock += day + " ";

	//	if(hh < 10)
	//		clock += "0";
	//
	//	clock += hh + ":";
	//	if(mm < 10) clock += '0';
	//	clock += mm + ":";
	//
	//	if(ss < 10) clock += '0';
	//	clock += ss;
	return(clock);
}