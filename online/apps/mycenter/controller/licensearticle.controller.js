var jiajson = "{\"zzbh\":\"D233005136\",\"aptitudekindname\":\"建筑业\",\"tradetypename\":\"专业承包\",\"tradetypeboundname\":\"建筑装修装饰工程\",\"certlevelname\":\"贰级\",\"qymc\":\"浙江吴宇建设有限公司\",\"bzdw\":\"浙江省建设厅\",\"zcdz\":\"温岭市城东街道横湖中路159号2306室\",\"frdb\":\"吴新宇\",\"tyshxydm\":\"913310815803862959\",\"yxqqs\":\"2015年12月11日\",\"yxqjz\":\"2020年12月10日\",\"bzsj\":\"\",\"zczj\":\"5000\",\"jjxz\":\"有限责任公司\",\"zz_state\":\"\"}";
window.onload = function requestLicenseArticle() {
	var date = {
		fn: "getJzyqyzzDetail",
		zzbh: zzbh
	}
	document.getElementById('loading').style.display = 'block';
	
	myRequest({
          url: licenseInterface,
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			fillData(data);
		
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
//			mui.alert("加载失败");
         fillData(jiajson);
          }
    });

}
function  fillData (data) {
	var obj = data;
			document.getElementById("qymc").innerHTML = "&nbsp;&nbsp;" + obj.qymc;
			document.getElementById("zcdz").innerHTML = "&nbsp;&nbsp;" + obj.zcdz;
			document.getElementById("yyzz").innerHTML = obj.tyshxydm + "&nbsp;&nbsp;";
			document.getElementById("frdb").innerHTML = obj.frdb + "&nbsp;&nbsp;";
			document.getElementById("zczj").innerHTML = obj.zczj +"万元" + "&nbsp;&nbsp;";
		    document.getElementById("jjxz").innerHTML = obj.jjxz  + "&nbsp;&nbsp;";
		    document.getElementById("zzbh").innerHTML = obj.zzbh  + "&nbsp;&nbsp;";
		    document.getElementById("yxqjz").innerHTML = "至" + obj.yxqjz  + "&nbsp;&nbsp;";
		    document.getElementById("zzlbdj").innerHTML = obj.tradetypename +"&nbsp;"+ obj.certlevelname  + "&nbsp;&nbsp;";
			document.getElementById("bzdw").innerHTML = obj.bzdw  + "&nbsp;&nbsp;";
			document.getElementById("yxqqs").innerHTML = obj.yxqqs  + "&nbsp;&nbsp;";
			document.getElementById("contentbody").style.display = "block";
}