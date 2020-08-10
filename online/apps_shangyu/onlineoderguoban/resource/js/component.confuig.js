function uploadPhoto(uploadid, ulcontentid) {
	//	上传图片以及预览操作
	var picsV = new Vue({
		el: "#" + ulcontentid,
		data: {
			items: []
		}
	});
	var upload = document.getElementById(uploadid);
	upload.addEventListener('change', function() {
		var files = upload.files;
		for(var i = 0; i < files.length; i++) {
			var fileItem = files[i];
			var reader = new FileReader();
			reader.readAsDataURL(fileItem);
			reader.onload = function(data) {
				if(this.result != undefined && this.result != null) {
					upload.value = '';
					var _src = this.result;
					document.getElementById(ulcontentid).style.display = 'block';
					picsV.items.push({
						pic: _src
					});
				} else {
					mui.alert("图片选择失败！");
					return;
				}
			};
		}

	}, false);
}

//关闭图片方法
function closePic(_this) {
	$(_this).parent('div').hide();
    $(_this).prev(".mult-pics-item").remove();
}

//单行输入框失去焦点时对输入的内容进行判断
function checkNumberType(singleid, singletslableid) {
	var texttitle = document.getElementById(singleid).title;
	var texttxt = document.getElementById(singleid).value;
	if(texttitle.match("身份证")) { //身份证检验
		if(!isIdCard(texttxt) && texttxt != '') {
			document.getElementById(singletslableid).style.display = "block";
		} else {
			document.getElementById(singletslableid).style.display = "none";
		}
	} else if(texttitle.match("邮箱")) { //邮箱校验
		if(!isEmail(texttxt) && texttxt != '') {
			document.getElementById(singletslableid).style.display = "block";
		} else {
			document.getElementById(singletslableid).style.display = "none";
		}
	} else if(texttitle.match("手机")) { //手机号校验
		if(!isMobil(texttxt) && texttxt != '') {
			document.getElementById(singletslableid).style.display = "block";
		} else {
			document.getElementById(singletslableid).style.display = "none";
		}
	} else {

	}
}