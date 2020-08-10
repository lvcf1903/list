window.onload = function requestArticle() {
	var date = {
		//			pagenum: "1",
		webid: webid,
		columnId: columnid,
		infoid: infoid
	}
	document.getElementById('loading').style.display = 'block';
	myRequest({
		  url: zjzwurl +"app/interface/new/getInfoArticle.do",
          data: date,
          header:'',
          success:function(data){
			document.getElementById('loading').style.display = 'none';
			var obj = data;
			var d = new Date();
			d.setTime(obj.deploytime);
			var convertTime1 = convertTime(d).split(" ")[0];
			document.getElementById("title").innerHTML = obj.title;
			document.getElementById("time").innerHTML =convertTime1 + "&nbsp&nbsp&nbsp&nbsp"+ source;
			document.getElementById("content").innerHTML = obj.content;
          },
          fail:function(data){
			document.getElementById('loading').style.display = 'none';
			mui.alert("加载失败");
          }
   });
}
