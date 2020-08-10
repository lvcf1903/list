/**
 * server端接口主域名
 */
//var jmpurl = "http://www.zjzwfw.gov.cn/";

//基本信息
function requestWorkContent1(itemcode, name, webid) {
	var date = {
		itemcode: itemcode,
		webid: webid,
		name: name
	}
	myRequest({
		  url: zjzwurl + "interface/showBasicInfo.do",
          data: date,
          header:'',
          success:function(data){ //请求成功
			document.getElementById('loading').style.display = 'none';
			if(!(new RegExp("\\S+")).test(data)) {
				document.getElementById('badmessage1').style.display = 'block';
				document.getElementById('basicinfodiv').style.display = 'none';
				return;
			}
			fillDatainView1(data);
          },
          fail:function(data){ //请求失败
			document.getElementById('loading').style.display = 'none';
          }
   });
}

function fillDatainView1(data) {
	var obj = data;

	//标题
	var name = obj.name;
	//实施机关
	var ssjg = obj.bljg;
	//办事对象
	var bsdx = obj.fwdx;
	//收费情况
	var sfsf = obj.sfsf;
	//受理地点/时间
	var sldd = obj.sldd;
	//办理程序
	var blcx = obj.blcx;
	//办理流程图
	var bllct = obj.bllct;
	//受理时间
	var slsj = obj.slsj;
	//常见问题
	var cjwt = obj.cjwt;
	//咨询电话
	var zxdh = obj.zxdh;
	//监督投诉电话电话
	var jdtsdh = obj.tsdh;
	//收费依据
	var sfyj = obj.sfyj;
	//收费项目
	var sfxm = obj.sfxm;
	//网上查询
	var wscx = obj.wscx;

	var vsf = '';
	if(sfsf == 0) {
		vsf = '不收费';
		document.getElementById("sfqk").style.color = '#222222';
	} else if(sfsf == 1) {
		vsf = '收费';
		document.getElementById("sfqk").style.color = '#199efd';
		$("#sfqk").click(function() {
			window.location.href = 'workchildContent4.html';
		});
	}
	//法定日期单位
	var rqdw = obj.rqdw;
	if(!(new RegExp("\\S+")).test(rqdw)) {
		rqdw = 6;
	}
	var fdqx = obj.fdqx;
	if((new RegExp("\\S+")).test(fdqx)) {
		if(rqdw < 0 || rqdw == 6) {
			fdqx = "无";
		} else if(rqdw == 0 || rqdw == 5) {
			fdqx = "即办";
		} else if(rqdw == 1) {
			fdqx = fdqx + "工作日";
		} else if(rqdw == 2) {
			fdqx = fdqx + "月";
		} else if(rqdw == 3) {
			fdqx = fdqx + "年";
		} else if(rqdw == 4) {
			fdqx = fdqx + "日";
		}
	}
	var cnqx = obj.cnqx;
	if((new RegExp("\\S+")).test(cnqx)) {
		if(cnqx == -1) {
			cnqx = "无";
		} else if(cnqx == 0) {
			cnqx = "即办";
		} else {
			cnqx = cnqx + "工作日";
		}
	} else {
		cnqx = "无";
	}

	var zrcs = obj.zrcs;
	var type = obj.type;
	var qlly = obj.qlly;
	var bjlx = obj.bjlx;
	var bz = obj.bz;

	if((new RegExp("\\S+")).test(bjlx)) {
		document.getElementById("bjlxtr").style.display = '';
		document.getElementById("bjlx").innerHTML = bjlx;
	} else {
		document.getElementById("bjlxtr").style.display = 'none';
	}
	if(!(new RegExp("\\S+")).test(bz) || bz == null) {
		document.getElementById("bztr").style.display = 'none';
	} else {
		document.getElementById("bztr").style.display = 'block';
		document.getElementById("bz").innerHTML = bz;
	}

	if((new RegExp("\\S+")).test(sldd)) {
		document.getElementById("content1").style.display = '';
	} else {
		document.getElementById("content1").style.display = 'none';
	}
	//	if((new RegExp("\\S+")).test(sldd)) {
	//		document.getElementById("content2").style.display = '';
	//	} else {
	//		document.getElementById("content2").style.display = 'none';
	//	}
	if((new RegExp("\\S+")).test(slsj)) {
		document.getElementById("content3").style.display = '';
	} else {
		document.getElementById("content3").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(zxdh)) {
		document.getElementById("content4").style.display = '';
	} else {
		document.getElementById("content4").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(jdtsdh)) {
		document.getElementById("content5").style.display = '';
	} else {
		document.getElementById("content5").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(wscx)) {
		document.getElementById("content6").style.display = '';
	} else {
		document.getElementById("content6").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(blcx)) {
		document.getElementById("content7").style.display = '';
	} else {
		document.getElementById("content7").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(bllct)) {
		document.getElementById("content8").style.display = '';
	} else {
		document.getElementById("content8").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(cjwt)) {
		document.getElementById("content9").style.display = '';
	} else {
		document.getElementById("content9").style.display = 'none';
	}

	$("#content6").click(function() {
		if(wscx.substring(0, 4) == 'http') {
			window.location.href = wscx;
		} else {
			window.location.href = "http://" + wscx;
		}
	});

	//填充基本信息数据
	document.getElementById("itemname").innerHTML = name;
//	document.getElementById("ssjg").innerHTML = ssjg;
//	document.getElementById("bsdx").innerHTML = bsdx;
//	document.getElementById("sfqk").innerHTML = vsf;
//	document.getElementById("fdqx").innerHTML = fdqx;
//	document.getElementById("cnqx").innerHTML = cnqx;
//	document.getElementById("qlsxlx").innerHTML = type;
	
	document.getElementById("qlly").innerHTML = qlly;
	document.getElementById("zxdh").innerHTML = zxdh.split('、')[0];
	document.getElementById("jdtsdh").innerHTML = jdtsdh.split('、')[0];

    if((new RegExp("\\S+")).test(ssjg)) {
		document.getElementById("ssjgtr").style.display = '';
		document.getElementById("ssjg").innerHTML = ssjg;
	} else {
		document.getElementById("ssjgtr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(bsdx)) {
		document.getElementById("bsdxtr").style.display = '';
		document.getElementById("bsdx").innerHTML = bsdx;
	} else {
		document.getElementById("bsdxtr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(vsf)) {
		document.getElementById("sfqktr").style.display = '';
		document.getElementById("sfqk").innerHTML = vsf;
	} else {
		document.getElementById("sfqktr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(fdqx)) {
		document.getElementById("fdqxtr").style.display = '';
		document.getElementById("fdqx").innerHTML = fdqx;
	} else {
		document.getElementById("fdqxtr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(cnqx)) {
		document.getElementById("cnqxtr").style.display = '';
		document.getElementById("cnqx").innerHTML = cnqx;
	} else {
		document.getElementById("cnqxtr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(type)) {
		document.getElementById("qlsxlxtr").style.display = '';
		document.getElementById("qlsxlx").innerHTML = type;
	} else {
		document.getElementById("qlsxlxtr").style.display = 'none';
	}
	if((new RegExp("\\S+")).test(zrcs)) {
		document.getElementById("zrcstr").style.display = '';
		document.getElementById("zrcs").innerHTML = zrcs;
	} else {
		document.getElementById("zrcstr").style.display = 'none';
	}

	var storage = window.localStorage;
	storage.sldd = sldd;
	storage.bllct = bllct;
	storage.cjwt = cjwt;
	storage.sfyj = sfyj;
	storage.sfxm = sfxm;
	storage.blcx = blcx;
	storage.slsj = slsj;

}

//受理条件
function requestWorkContent3(itemcode, name, webid) {
	var date = {
		itemcode: itemcode,
		webid: webid,
		name: name
	}
	myRequest({
		  url: zjzwurl + "interface/getBsznCondition.do",
          data: date,
          header:'',
          success:function(data){ //请求成功
			document.getElementById('loading').style.display = 'none';
			fillDatainView3(data);
          },
          fail:function(data){ //请求失败
			document.getElementById('loading').style.display = 'none';
          }
    });

}

function fillDatainView3(data) {
	if(!(new RegExp("\\S+")).test(data)) {
		document.getElementById('badmessage').style.display = 'block';
		return;
	}
	var obj = data;
	//标题
	var sqtj = obj.sqtj;
	sqtj = new Base64().decode(sqtj);
	//填充基本信息数据
	document.getElementById("material").innerHTML = sqtj;
	document.getElementById("material").style.display = 'block';
}

var example = new Vue({
	el: '#parent',
	data: {
		items: []
	}
})
var dataArray;

//申报材料
function requestWorkContent2(itemcode, name, webid) {
	var date = {
		itemcode: itemcode,
		webid: webid,
		name: name
	}
	myRequest({
		  url: zjzwurl + "interface/getBsznCailiaoList.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var list = '';
			if((new RegExp("\\S+")).test(data)) {
				list = data;
			} else {
				document.getElementById('badmessage0').style.display = 'block';
			}
			if((new RegExp("\\S+")).test(list)) { //有数据
				dataArray = [];
				var vcai = list.cailiao;
				//判断是否为数组
				if(isArray(vcai)) {
					dataArray = vcai;
				} else {
					document.getElementById('scroll2').innerHTML = "<div style='padding: 15px;font-size:18px;color: #222222;'>" + vcai + "</div>";
					return;
				}
			} else { //无数据
				dataArray = [];
			}

			if(dataArray.length > 0) { //有数据
				example.items = [];
				var innerhtml = '';
				for(var i = 0; i < dataArray.length; i++) {
					example.items.push({
						name: dataArray[i].name,
						id: dataArray[i].id
					});
					if(i == 0) {
						document.getElementById("parent").style.display = "block";
					}
				}
			}
          },
          fail:function(data){
			document.getElementById('badmessage0').style.display = 'block';
			document.getElementById('loading').style.display = 'none';
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
          }
    });

	//判断是否为数组
	function isArray(obj) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
}