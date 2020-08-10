/**
 * server端接口主域名
 */
//var jmpurl = "http://122.226.66.205:8080/jmportal/";

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})

var dataArray;
var obj;

//公共资源分类列表
function getClassifyData() {
	var date = {
		siteid: wmhsiteid,
		clienttype: 3,
		uuid: 867376024506525,
		version: 1.0,
		cateid: publicclassifyid
	}
	myRequest({
		  url: wmhurl + "interfaces/cates.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var obj = '';
			if((new RegExp("\\S+")).test(data)) {
				obj = data;
			}
			if((new RegExp("\\S+")).test(obj)) {
				//有数据
				dataArray = [];
				dataArray = obj.resource;
				if(dataArray.length > 0) {
					document.getElementById('badmessage').style.display = 'none';
					document.getElementById('list').style.display = 'block';
				} else {
					document.getElementById('list').style.display = 'none';
					document.getElementById('badmessage').style.display = 'block';
				}
				example.items = [];
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						index: i,
						columnname: dataArray[i].resourcename,
						columnid: dataArray[i].resourceid
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			} else { //无数据
				dataArray = [];
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
				//				mui.alert("暂无数据");
			}
          },
          fail:function(data){
			document.getElementById('list').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
			//			alert("加载失败");
          }
    });
}