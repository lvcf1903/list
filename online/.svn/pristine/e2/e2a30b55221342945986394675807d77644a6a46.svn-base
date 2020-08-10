var classfy1 = document.getElementById("classfy1")
var classfy2 = document.getElementById("classfy2")
var obj = [];

function getclassfy() {
	$.ajax({
		url: "http://jmpotal.hanweb.com/quzhou/ywzw/interface/getMattercol.do",
		type: "get",
		asasync: true,
		timeout: 20000,
		success: function(data) {
			if(data.length > 0) {
				obj = JSON.parse(data);
				for(var i = 0; i < obj.length; i++) {
					if(i == 0) {
						classfy1.innerHTML = obj[0].name;
						getMatterWindow(obj[0].iid,obj[0].name)
						
					} else if(i ==1) {
						classfy2.innerHTML = obj[1].name;
						getMatterWindow(obj[1].iid,obj[1].name)
					}

				}

			} else {
				mui.alert("请求失败");

			}

		},
		error: function(e) {

		}

	});
}
var example1 = new Vue({
	el: '#parent1',
	data: {
		items1: []
	}
});
var example2 = new Vue({
	el:'#parent2',
	data:{
		items2: []
	}
})
function getMatterWindow(iid,name){
	var param={
		pid:iid
	}
	$.ajax({
		type:"get",
		url:"http://jmpotal.hanweb.com/quzhou/ywzw/interface/getMatterWindow.do?",
//	    url:"http://192.168.89.107:8080/yiwu/ywzw/interface/getMatterWindow.do?pid=2",
	async:true,
		data:param,
		success:function(data){
			var arrlength=JSON.parse(data);
			if(name=="法人办事"){
				for(var i = 0; i < arrlength.length; i++) {
					example1.items1.push({
						index: arrlength[i].iid,
						title: arrlength[i].name,
						imageurl: arrlength[i].imageurl,
					});
				}
			}else if (name=="个人办事"){
				for(var i = 0; i < arrlength.length; i++) {
					example2.items2.push({
						index: arrlength[i].iid,
						title: arrlength[i].name,
						imageurl: arrlength[i].imageurl,
					});
				}
				
				
			}
		},
		error:function(e){
			
		}
	});
	
}

function next(id){
    window.location.href="../../onlineorder/view/orderlist.html?id="+id;
}
