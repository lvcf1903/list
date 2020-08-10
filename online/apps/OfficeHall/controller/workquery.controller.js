/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

var grbmvue = new Vue({
	el: '#grbm',
	data: {
		items1: []
	}
})

var frbmvue = new Vue({
	el: '#frbm',
	data: {
		items2: []
	}
})

var grztvue = new Vue({
	el: '#grzt',
	data: {
		items3: []
	}
})

var frztvue = new Vue({
	el: '#frzt',
	data: {
		items4: []
	}
})

function getGRZTData() {
	//个人主题列表
	var data;
	myRequest({
		  url: zjzwurl + "app/interface/new/getGrThems.do",
          data: '',
          header:'',
          success:function(data){
			if(data != null) {
				var grztlist = data;
				for(var i = 0; i < grztlist.length; i++) {
					grztvue.items3.push({
						index: i,
						name: grztlist[i].name,
						id: grztlist[i].id
					});
				}
			}
          },
          fail:function(data){
          }
    });

}


function getFRZTData() {
	//法人主题列表
	var data;
	myRequest({
		  url: zjzwurl + "app/interface/new/getFrThems.do",
          data: '',
          header:'',
          success:function(data){
			if(data != null) {
				var frztlist = data;
				for(var i = 0; i < frztlist.length; i++) {
					frztvue.items4.push({
						index: i,
						name: frztlist[i].name,
						id: frztlist[i].id
					});
				}
			}
          },
          fail:function(data){
          }
   });
}

function getDeptData(type) {
	//部门列表：type=1个人；type=2法人
	var data = {
		webid: 66,
		type: type
	};
	myRequest({
		  url: zjzwurl + "app/interface/showDepts.do",
          data: data,
          header:'',
          success:function(data){
			if(data != null) {
				var deptlist = data;
				if(type == 1) {
					//个人部门列表
					for(var i = 0; i < deptlist.length; i++) {
						grbmvue.items1.push({
							index: i,
							name: deptlist[i].name,
							id: deptlist[i].id
						});
					}
				} else if(type == 2) {
					//法人部门列表
					for(var i = 0; i < deptlist.length; i++) {
						frbmvue.items2.push({
							index: i,
							name: deptlist[i].name,
							id: deptlist[i].id
						});
					}
				}
			}
          },
          fail:function(data){
          }
    });
}