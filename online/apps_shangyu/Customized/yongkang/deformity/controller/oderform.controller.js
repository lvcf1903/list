
var pramas = {};
//表单提交接口
function submitForm() {

	var flag;
	$('.necessity').each(function() {
		if($(this).val() == "") {
			mui.alert("请完善必填项!");
			flag = true;
			return false;
		}
	})
	if(flag) {
		return;
	}
	if(document.getElementById("issure").checked != true) {
		mui.alert("请遵守信用承诺!")
		return;
	}
	var deformity_type = document.getElementById("deformity_type").value;
	var apply_name = document.getElementById("name").value;
	var apply_sex = $("input[name='sex']:checked").val();
	var nation = document.getElementById("nation").value;
	var marriage = $("input[name='marriage']:checked").val();
	var birthday = document.getElementById("birthday").value;
	var address = document.getElementById("address").value;
	var postcode = document.getElementById("postcode").value;
	var apply_phone = document.getElementById("phone").value;
	var housetype = $("input[name='housetype']:checked").val();
	var guardian_name = document.getElementById("guardian_name").value;
	var guardian_relation = document.getElementById("guardian_relation").value;
	var guardian_phone = document.getElementById("guardian_phone").value;
	var guardian_idcard = document.getElementById("guardian_idcard").value;
	var apply_type = document.getElementById("apply_type").value;
	if(apply_phone != "" && !(/^1\d{10}$/).test(apply_phone)) {
		mui.alert("请输入正确的联系电话");
		return;
	}
	if(guardian_phone != "" && !(/^1\d{10}$/).test(guardian_phone)) {
		mui.alert("请输入正确的联系电话");
		return;
	}
	if(!(/\d{15}|\d{18}/).test(guardian_idcard)) {
		mui.alert("请输入正确的身份证");
		return;
	}
	$("#submitBtn3").attr('disabled', true);
	document.getElementById("loading").style.display = "block";

	var form = new Object();
	form.formName = "中华人民共和国残疾人证申请表";
	form.item = [];
	form.item.push({
		name: "deformity_type",
		name_cn: "残疾类型",
		value: deformity_type
	}, {
		name: "apply_name",
		name_cn: "申请人姓名",
		value: apply_name
	}, {
		name: "apply_sex",
		name_cn: "申请人性别",
		value: apply_sex
	}, {
		name: "nation",
		name_cn: "民族",
		value: nation
	}, {
		name: "marriage",
		name_cn: "婚否",
		value: marriage
	}, {
		name: "birthday",
		name_cn: "出生年月",
		value: birthday
	}, {
		name: "address",
		name_cn: "居住地址",
		value: address
	}, {
		name: "postcode",
		name_cn: "邮编",
		value: postcode
	}, {
		name: "apply_phone",
		name_cn: "申请人联系电话",
		value: apply_phone
	}, {
		name: "housetype",
		name_cn: "户口类别",
		value: housetype
	}, {
		name: "guardian_name",
		name_cn: "监护人姓名",
		value: guardian_name
	}, {
		name: "guardian_relation",
		name_cn: "与其关系",
		value: guardian_relation
	}, {
		name: "guardian_phone",
		name_cn: "监护人联系电话",
		value: guardian_phone
	}, {
		name: "guardian_idcard",
		name_cn: "监护人身份证号",
		value: guardian_idcard
	}, {
		name: "apply_type",
		name_cn: "申请类型",
		value: apply_type
	});

	var formInfo = JSON.stringify(form);
	var pramaData = {
		siteid: vsiteid,
		form: formInfo,
		validitykey: validitykey
	}
	var requesturl = overallInterface + 'ywzw/interface/customized/formsSubmit.do';
	myRequest({
		url: requesturl,
		data: pramaData,
		header: '',
		success: function(data) {
			document.getElementById("loading").style.display = "none";
			if(data.result == true) { //提交表单成功
				var xmlurl = data.url;
				var dirname = data.dirname;
				var filesArray = [];
				var dic = {
					"xmlurl": xmlurl
				};
				filesArray.push(dic);
				pramas = JSON.parse(prama);
				pramas["form"] = filesArray;
				pramas["dirname"] = dirname;
				pramas["type"] = '1';
				var pra = JSON.stringify(pramas);
				submit();
			} else {
				$("#submitBtn3").attr('disabled', false);
				alert("提交失败");
			}
		},
		fail: function(data) {
			$("#submitBtn3").attr('disabled', false);
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
		}
	});
}

function submit() {
	var pramaData = {
		"infoStr": JSON.stringify(pramas)
	}
	myRequest({
		url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
		data: pramaData,
		header: '',
		success: function(data) {
			if(data.result == true) { //提交表单成功
				setTimeout(jump, 1000);
			} else {
				alert("提交失败");
			}
		},
		fail: function(data) {
			document.getElementById("loading").style.display = "none";
			alert("提交失败");
			$("#submitBtn3").attr('disabled', false);
		}
	});
}

function jump() {
	window.location.href = "../../../../onlineoder/view/odersuccess.html?type=02&siteid=" + vsiteid + "&cityname=" + cityName1;
}

//验证输入类型
function verify(str, type) {
	if(type == 0) {
		//普通文本
		return true;
	} else if(type == 1) {
		//移动电话
		if(!(/^1\d{10}$/).test(str)) {
			mui.alert("请输入正确的移动电话");
			return false;
		} else {
			return true;
		}
	} else if(type == 2) {
		//固定电话
		if(!(/\d{3}-\d{8}|\d{4}-\d{7}/).test(str)) {
			mui.alert("请输入正确的固定电话");
			return false;
		} else {
			return true;
		}
	} else if(type == 3) {
		//电子邮件
		if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(str)) {
			mui.alert("请输入正确的电子邮件");
			return false;
		} else {
			return true;
		}
	} else if(type == 4) {
		//身份证
		if(!(/\d{15}|\d{18}/).test(str)) {
			mui.alert("请输入正确的身份证");
			return false;
		} else {
			return true;
		}
	} else if(type == 5) {
		//其他
		return true;
	} else {
		return true;
	}
}