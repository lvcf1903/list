/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

var dataArray;

function getWorkDetailData(itemcode, name, clid) {
	var date = {
		webid: 66,
		itemcode: itemcode,
		name: name,
		clid: clid
	};
	myRequest({
		  url: zjzwurl + "interface/getBsznCailiaoDetail.do",
          data: date,
          header:'',
          success:function(data){
			var list = '';
			if(data!= null && data != '') { //有数据
				list = data;
				dataArray = [];
				dataArray = list.detail;
			} else { //无数据
				dataArray = [];
				mui.alert("暂无数据");
			}

			var clxs = dataArray.clxs;
			var clxxyq = dataArray.clxxyq;
			var byxjms = dataArray.byxjms;
			var bz = dataArray.bz;
			var hrefblank = dataArray.hrefblank;
			var hrefexamle = dataArray.hrefexamle;
			if((new RegExp("\\S+")).test(hrefblank)) {
//				document.getElementById("href1").style.display = 'block';
			} else {
				document.getElementById("href1").style.display = 'none';
			}
			if((new RegExp("\\S+")).test(hrefexamle)) {
//				document.getElementById("href2").style.display = 'block';
			} else {
				document.getElementById("href2").style.display = 'none';
			}
			document.getElementById("td1").innerHTML = clxs;
			document.getElementById("td2").innerHTML = clxxyq;
			document.getElementById("td3").innerHTML = byxjms;
			document.getElementById("td4").innerHTML = bz;
			
			$("#href1").click(function(){
				window.location.href = loadurl + hrefblank;
			});
			$("#href2").click(function(){
				window.location.href = loadurl + hrefexamle;
			});
          },
          fail:function(data){
          }
   });
}