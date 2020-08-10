//申请人类型不同时，申请人基本情况做相应改变
$("#apply_type").change(function() {
	var apply_type = document.getElementById("apply_type").value;
	if(apply_type == "单位") {
		$(".company").css("display", "block");
		$("#applicant").attr("class", "mui-input-clear necessity");
		$("#legalman").attr("class", "mui-input-clear necessity");
		$("#idcard").attr("placeholder", "请输入法定代表人身份证号");
		$("#name").attr("placeholder", "请输入单位名称");
	} else {
		$(".company").css("display", "none");
		$("#applicant").attr("class", "");
		$("legalman").attr("class", "");
		$("#idcard").attr("placeholder", "请输入申请人身份证号");
		$("#name").attr("placeholder", "请输入姓名");
	}
});

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
	});
	if(flag) {
		return;
	};
	var incident_area = document.getElementById("area").value;
	if(incident_area == "") {
		incident_area = document.getElementById("areatext").value;
	};
	var case_array = new Array();
	$("input[name='case']:checked").each(function() {
		case_array.push($(this).val());
	});
	var cases = case_array.join(",");

	if(incident_area == "" || cases == "") {
		mui.alert("请完善必填项!");
		return;
	};

	if(document.getElementById("issure").checked != true) {
		mui.alert("请遵守信用承诺!")
		return;
	};

	var apply_type = document.getElementById("apply_type").value;
	var apply_name = document.getElementById("name").value;
	var applicant = document.getElementById("applicant").value;
	var legalman = document.getElementById("legalman").value;
	var idcard = document.getElementById("idcard").value;
	var phone = document.getElementById("phone").value;
	var address = document.getElementById("address").value;
	var insurance_company = document.getElementById("insurance_company").value;
	var casualty = document.getElementById("casualty").value;
	var damage = document.getElementById("damage").value;
	var count = document.getElementById("count").value;
	var direct_loss = document.getElementById("direct_loss").value;
	var indirect_loss = document.getElementById("indirect_loss").value;
	var explain = document.getElementById("explain").value;
	var apply_content = document.getElementById("apply_content").value;
	if(!(/\d{15}|\d{18}/).test(idcard)) {
		mui.alert("请输入正确的身份证");
		return;
	}
	if(!(/^1\d{10}$/).test(phone)) {
		mui.alert("请输入正确的联系电话");
		return;
	}
	$("#submitBtn3").attr('disabled', true);
	document.getElementById("loading").style.display = "block";

	var form = new Object();
	form.formName = "气象证明申请表";
	form.item = [];
	form.item.push({
		name: "apply_type",
		name_cn: "申请人类型",
		value: apply_type
	}, {
		name: "apply_name",
		name_cn: "名称",
		value: apply_name
	}, {
		name: "applicant",
		name_cn: "申办人",
		value: applicant
	}, {
		name: "legalman",
		name_cn: "法定代表人",
		value: legalman
	}, {
		name: "idcard",
		name_cn: "身份证号",
		value: idcard
	}, {
		name: "phone",
		name_cn: "手机号",
		value: phone
	}, {
		name: "address",
		name_cn: "通讯地址",
		value: address
	}, {
		name: "incident_area",
		name_cn: "事发地区",
		value: incident_area
	}, {
		name: "cases",
		name_cn: "申请事由",
		value: cases
	}, {
		name: "insurance_company",
		name_cn: "投保保险公司名称",
		value: insurance_company
	}, {
		name: "casualty",
		name_cn: "人员伤亡情况",
		value: casualty
	}, {
		name: "damage",
		name_cn: "受损物名称",
		value: damage
	}, {
		name: "count",
		name_cn: "数量",
		value: count
	}, {
		name: "direct_loss",
		name_cn: "直接损失（元）",
		value: direct_loss
	}, {
		name: "indirect_loss",
		name_cn: "间接损失（元）",
		value: indirect_loss
	}, {
		name: "explain",
		name_cn: "其他事由说明",
		value: explain
	}, {
		name: "apply_content",
		name_cn: "申请内容",
		value: apply_content
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