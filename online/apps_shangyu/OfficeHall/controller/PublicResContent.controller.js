var rescontentvue = new Vue({
	el: '#main',
	data: {
		items: []
	}
})

function getContentData(pagenum, columnid) {
	//	var data;
	var data = {
		//		columnid: columnid,
		//		infoid: infoid
	};
	document.getElementById('loading').style.display = 'block';
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
	
	myRequest({
		  url: "https://tzggfwresources.taizhou.gov.cn/v1/corporation/records/query",
          data: data,
          header:{
			'X-JDT': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmcmFaZm1IN0FKQ0JPUE5tMmEzRVFBIiwiZXhwIjoxNjI3NjU2Njk2LCJpYXQiOjE0NzIxMDQ2OTYsImFwcGlkIjoiRUUyREVGQTcxQ0RFNEFBNEE3MkU5Qzc5NkU3RDE1QTEiLCJkZXZpY2VpZCI6IkVFMkRFRkE3MUNERTRBQTRBNzJFOUM3OTZFN0QxNUExIn0.U4quQRf2taj22-iqpr_JgdMN7jSJu8F7Sw5KSW6Rn74'
		 },
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('main').style.display = 'block';
			data = {
				"publicname": "大陈镇龙溪上游区污水管网建设工程",
				"publicnum": "YW20162305",
				"jsdd": "义乌市大陈镇金山工业区块",
				"tzgs": "1144.52万元",
				"jsgm": "项目内容包含管沟开挖、管道基础铺设",
				"gczl": "符合国家验收合格标准",
				"gqyq": "60日历天",
				"zbfw": "大陈镇龙溪上游区块污水管网建设工程死标",
				"qyzz": "市政公用工程三级",
				"ryzw": "项目经理",
				"ryyq": "项目经理必须持有B证",
				"bmsj": "2016-8-31至2016-9-5",
				"zbwjlqsj": "每日上午九点至下午三点",
				"zbwjlqfs": "投标人请登录义乌市公共资源交易网下载招标文件",
				"zbdytjsj": "0:00前提交",
				"zbdytjfs": "通过义乌市公共资源交易网提交",
				"zbdylqfs": "投标人登录义乌市公共资源交易网下载",
				"zgscfs": "资格预审",
				"pbbf": "现场评分法",
				"styq": "报名资料必须按顺序装订成册，带原件核对，复印件加盖单位公章",
				"zbr": "2义乌市大陈镇人民政府",
				"lxr": "贾永强",
				"lxdh": "15896584562",
				"dljg": "浙江明达造价咨询有限公司",
				"dljglxr": "朱志远",
				"dljglxdh": "15896584562"
			};
			if(data != null) {
				rescontentvue.items.push({
					publicname: data.publicname,
					publicnum: data.publicnum,
					jsdd: data.jsdd,
					tzgs: data.tzgs,
					jsgm: data.jsgm,
					gczl: data.gczl,
					gqyq: data.gqyq,
					zbfw: data.zbfw,
					qyzz: data.qyzz,
					ryzw: data.ryzw,
					ryyq: data.ryyq,
					bmsj: data.bmsj,
					zbwjlqsj: data.zbwjlqsj,
					zbwjlqfs: data.zbwjlqfs,
					zbdytjsj: data.zbdytjsj,
					zbdytjfs: data.zbdytjfs,
					zbdylqfs: data.zbdylqfs,
					zgscfs: data.zgscfs,
					pbbf: data.pbbf,
					styq: data.styq,
					zbr: data.zbr,
					lxr: data.lxr,
					lxdh: data.lxdh,
					dljg: data.dljg,
					dljglxr: data.dljglxr,
					dljglxdh: data.dljglxdh
				});
			}
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			document.getElementById('main').style.display = 'none';
			mui.alert("加载失败");
          }
    });
}