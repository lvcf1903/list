/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

var worklistvue = new Vue({
	el: '#worklist',
	data: {
		items: []
	}
})

var dataArray;

function getChildWorkListData(itemId, mainCode, deptId, type, itemType) {
	var date = {
		webId: 66,
		itemId: itemId,
		mainCode: mainCode,
		deptId: deptId,
		isoline: 0,
		type: type,
		itemType: itemType
	};
	myRequest({
		  url: zjzwurl + "app/interface/new/getChildrenItems.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var list = '';
			if((new RegExp("\\S+")).test(data)) {
				list = data;
			}
			if(list.length > 0) { //有数据
				dataArray = [];
				dataArray = list;
				document.getElementById('badmessage').style.display = 'none';
				document.getElementById('list').style.display = 'block';
			} else { //无数据
				dataArray = [];
				document.getElementById('list').style.display = 'none';
				document.getElementById('badmessage').style.display = 'block';
			}

			if(dataArray.length > 0) { //有数据
				worklistvue.items = [];
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					worklistvue.items.push({
						index: i,
						name: dataArray[i].name,
						id: dataArray[i].id,
						deptallname: dataArray[i].deptallname
					});
					if(i == 0) {
						document.getElementById("worklist").style.display = "block";
					}
				}
			}
			document.getElementById("worklist").style.display = "block";
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('badmessage').style.display = 'block';
          }
    });

}