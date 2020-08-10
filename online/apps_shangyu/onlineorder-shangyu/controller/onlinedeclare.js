//var jiajson = "{\"code\":0,\"path\":\"D:\\\\phpstudy\\\\WWW\\\\Uploads\\\\Attach\\\\2016-11-10\\\\1478742120735433.png\"}";
var url = "http://192.168.0.9:5500/apps_shangyu/onlineorder-shangyu/view/onlinedeclare.html?dUserType=puser&dQlInnerCode=5d027ac1-6d52-439d-91b6-c1797501ef35&dQlBaseCode=%E5%85%B6%E4%BB%96%E8%A1%8C%E6%94%BF%E6%9D%83%E5%8A%9B-02459-000&dRegionCode=33060017&again="
var ss = []

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
//获取事项相关信息
function requestMatter(itemcode) {
    myRequest({
        url: overallInterface + 'ywzw/interface/queryMatterByItemcode.do',
        data: {
            itemcode: itemcode
        },
        header: '',
        success: function(data) {
            if (data.result == false) {
                document.getElementById('loading').style.display = 'none';
                mui.alert(data.msg);
            } else {
                itemname = data.name;
                itemcodeid = data.itemid;
                webid = data.siteId;
                validitykey = data.validityKey;
                colid = data.colId;
                cityName1 = data.cityname;
                vsiteid = data.siteId;
                vbdcl = data.formtype;
                if (userInfo.authlevel == "1") { //未实名认证
                    window.location.href = "http://puser.zjzwfw.gov.cn/sso/mobile.do?action=realname&servicecode";
                }
                if (userInfo.authlevel == "2" && data.userlevel == "1") { //初级实名认证，事项需要高级认证
                    window.location.href = "http://puser.zjzwfw.gov.cn/sso/mobile.do?action=realname&servicecode";
                }
                requestWorkMaterial(itemcodeid, itemname, webid);
                if (vsiteid == 59 || vsiteid == 57 || vsiteid == 56 || vsiteid == 55) { //嵊州站点要填写联系地址
                    document.getElementById("contactaddress").style.display = "block";
                }
                document.getElementById("contentArea").style.display = "block";
            }
        },
        fail: function(data) {}
    });
}

//提交时要用的参数
var token = "";
var deptunid = ""; //单位id
var legalman = ""; //法人代表
var serviceType = ""; //事项类型
var ss_orgcode = ""; //实施机构组织机构代码
var bljg = ""; //办理机构

var serviceid = "";
var vselectedindex;
var submitmobile = "";

var example = new Vue({
        el: '#parent',
        data: {
            items: [],
        }
    })
    //填充相关材料的数据
function fillMaterial() {
    var materialArray = material;
    example.items = [];
    for (var i = 0; i < materialArray.length; i++) {

        example.items.push({
            index: i + 1,
            name: materialArray[i].name,
            UNID: materialArray[i].material,
            necessity: dataArray[i].necessity
        });

        if (i == 0) {
            document.getElementById("parent").style.display = "block";
            document.getElementById("materialInfo").style.display = "block";
            document.getElementById("xiangguancailiao").style.display = "block";
        }

    }

}

//上传图片到服务器失败
function uploadImageFail(dd, imgsrc, index, i) {
    dd.innerHTML += "<div style='position:relative;float:left;width: 33.33%;margin: 10px 0px 10px 0px;height: 96px;' > <img src='" + imgsrc + "' style='width: 80px; height: 96px;margin: auto;position: absolute; top: 0; left: 0; bottom: 0; right: 0; '/><div style='width: 80px;height: 25px;line-height:25px;text-align: center;margin: auto;position: absolute;left: 0; bottom: 0; right: 0;color: #707070;font-size: 12px;background: rgba(230,230,230,0.7) ;border-width: 0px;'><img align='absmiddle' style='width: 20px;margin-top: -4px;' src='../source/images/uploadfail.png' />上传失败</div></div>";
}
////上传图片到服务器成功
//function uploadImageSuccess(obj, index, UNID, materialname) {
//	//将图片存到数组中，上传的时候用
//	var dic = {
//		"type": "附件上传",
//		"materialUNID": UNID,
//		"materialName": materialname,
//		"path": obj.path
//	};
//	filesArray.push(dic);
//}
//删除图片
function deleteImage(index1, cc, path) {
    //第1步：删除图片对应的HTML
    var aa = cc.parentElement;
    var photoindex = "photo" + index1;
    var dd = document.getElementById(photoindex);
    dd.removeChild(aa);
    //第2步：删除上传时需要的fileArray数组中的元素
    let number = 0;

    for (var i = 0; i < filesArray.length; i++) {
        // console.log(filesArray[i].materialName,'-----666')
        if (filesArray[i].materialName == '异地死亡人员运回原籍火化审批表') {
            number++;
        }
        if (path == filesArray[i].path) {
            for (var j = 0; j < filesArray.length; j++) {
                if (filesArray[j] == filesArray[i]) {
                    filesArray.splice(j, 1);
                    break;
                }
            }
        }

    }
    if (number == 1) {
        // 如果number == 1说明没有图片，可以正常进入表单填写
        window.localStorage.removeItem("ydswryyhyjhhspb1");
    }

    //第3步：请求删除图片接口
    var dates = {
        path: path
    };
    myRequest({
        url: overallInterface + 'ywzw/interface/deleteMaterial.do',
        data: dates,
        header: '',
        success: function(data) {},
        fail: function(data) {}
    });
}
var receivename = "";
var receivemobile = "";
var receiveaddress = "";
var postnum = "";
var isPost;
var postcode = "";
var detailAddress = "";
var provinceCode = "";
var provinceName = "";
var cityCode = "";
var cityName = "";
var regionCode = "";
var regionName = "";
var adressname;
var adressmobile;
var adressarea;

//提交草稿
function draftItem() {
    //留言正文
    var admsg = document.getElementById("advicecontent").value;

    var name;
    if (userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人
        name = document.getElementById("applyname").value;
        submitmobile = userInfo.mobile;
    } else { //法人
        name = document.getElementById("applyenterprise").value;
        submitmobile = document.getElementById("mobile").value;
    }

    var idcard = document.getElementById("idcard").value;
    if (userInfo.appConEntName == "" || typeof(userInfo.appConEntName) == "undefined") { //个人判空
        //先判空
        if (isManual) { //需要快递
            isPost = "Y";
            if (document.getElementById("parent1").style.display == "block") {
                //列表选择地址
                if (!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
                    alert("您还未选择收件地址");
                    return;
                }
            } else {
                //表单填写地址
                adressname = document.getElementById("addressname").value;
                adressmobile = document.getElementById("addressmobile").value;
                adressarea = document.getElementById("addressarea").value;
                postcode = document.getElementById("postcode").value;
                //先判空
                if (!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
                    alert("请输入收件人");
                    return;
                } else if (!(new RegExp("\\S+")).test(adressmobile)) {
                    alert("请输入联系电话");
                    return;
                } else if (!(checkPhone(adressmobile) || checkMobile(adressmobile))) {
                    alert("请输入正确的联系电话");
                    return;
                } else if (!(/^[1-9][0-9]{5}$/).test(postcode)) {
                    mui.alert("请输入正确的邮政编码");
                    return;
                } else if (!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
                    alert("详细地址不少于5个字");
                    return;
                }
                receivename = adressname;
                receivemobile = adressmobile;
                receiveaddress = adressarea;
                saveAddress();
            }
        } else {
            isPost = "N";
            receivename = "";
            receivemobile = "";
            receiveaddress = "";
            postcode = "";
            provinceCode = "";
            provinceName = "";
            cityCode = "";
            cityName = "";
            regionCode = "";
            regionName = "";
        }
    } else { //法人判空
        if (isManual) { //需要快递
            isPost = "Y";
            if (document.getElementById("parent1").style.display == "block") {
                //列表选择地址
                if (!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
                    alert("您还未选择收件地址");
                    return;
                }
            } else {
                //表单填写地址
                adressname = document.getElementById("addressname").value;
                adressmobile = document.getElementById("addressmobile").value;
                adressarea = document.getElementById("addressarea").value;
                postcode = document.getElementById("postcode").value;
                //先判空
                if (!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
                    alert("请输入收件人");
                    return;
                } else if (!(new RegExp("\\S+")).test(adressmobile)) {
                    alert("请输入联系电话");
                    return;
                } else if (!(checkPhone(mobile) || checkMobile(adressmobile))) {
                    alert("请输入正确的联系电话");
                    return;
                } else if (!(/^[1-9][0-9]{5}$/).test(postcode)) {
                    mui.alert("请输入正确的邮政编码");
                    return;
                } else if (!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
                    alert("详细地址不少于5个字");
                    return;
                }
                receivename = adressname;
                receivemobile = adressmobile;
                receiveaddress = adressarea;
                provinceCode = storage.provinceCode;
                provinceName = storage.province;
                cityCode = storage.cityCode;
                cityName = storage.city;
                regionCode = storage.countyCode;
                regionName = storage.county;
                saveAddress();
            }
        } else {
            isPost = "N";
            receivename = "";
            receivemobile = "";
            receiveaddress = "";
            postcode = "";
            provinceCode = "";
            provinceName = "";
            cityCode = "";
            cityName = "";
            regionCode = "";
            regionName = "";
        }
    }

    var haveSubmit = [];
    //判断是否有文件未上传
    for (var i = 0; i < material.length; i++) {
        console.log(material, 1111)
        for (var j = 0; j < filesArray.length; j++) {
            if (material[i].material == filesArray[j].materialUNID) {
                haveSubmit.push(material[i].material);
            }
        }
    }
    haveSubmit = unique(haveSubmit);
    if (document.getElementById("issure").checked == true) {} else {
        mui.alert("请遵守信用承诺!");
        return;
    }

    //开始提交
    var basicData = {
        "serviceid": serviceid, //申报的事项id
        "serviceCodeId": serviceCodeId, //权力事项基本码
        "servicename": itemname, //申报的事项名称
        "username": userInfo.username, //申报人姓名
        "mobile": userInfo.mobile, //申报人联系电话
        "idcard": userInfo.idnum, //申报人身份证号
        "idcard_type": "身份证", //证件类别
        "contactaddress": "", //申报人联系地址 
        "needPost": isPost, //是否快递  "Y":快递 "N":不快递
        "deptunid": deptunid, //单位id
        "legalman": document.getElementById("legalman").value, //法人代表
        "legalmansfz": document.getElementById("legalmansfz").value, //法人代表
        "serviceType": serviceType, //事项类型
        "ss_orgcode": ss_orgcode, //实施机构组织机构代码
        "bljg": bljg, //办理机构
        "promiseday": cntime, //承诺办结时间
    }

    var mail = {
        "receiveaddress": receiveaddress, //收件地址
        "receivemobile": receivemobile, //收件人手机
        "receivename": receivename, //收件人姓名
        "postcode": postcode, //邮政编码
        "provinceCode": provinceCode,
        "provinceName": provinceName,
        "cityCode": cityCode,
        "cityName": cityName,
        "regionCode": regionCode,
        "regionName": regionName
    }
    var prama = {
        "data": basicData,
        "files": filesArray,
        "mail": mail,
        "type": "0", //0 保存草稿  1提交
        "containertype": containerType, //0 微信 1 app
        "token": token,
        "siteid": vsiteid,
        "code": itemcode,
        "deptid": colid,
        "bdcl": vbdcl,
        "itemcodeid": itemcodeid,
        "userid": userInfo.userid, //申报人用户id
        "message": admsg,
        "validitykey": validitykey
    }
    var pramaData = {
        "infoStr": JSON.stringify(prama)
    }
    document.getElementById('loading').style.display = 'block';

    if ((new RegExp("\\S+")).test(vbdcl)) {
        window.location.href = 'oderform.html?formid=' + vbdcl + "&validitykey=" + validitykey + "&siteid=" + vsiteid + "&prama=" + JSON.stringify(prama);
    } else {
        $("#draftbtn0").attr('disabled', true);
        $.ajax({
            type: "post",
            url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
            data: pramaData,
            dataType: 'json',
            success: function(data) {
                var obj = data;
                if (obj.result == true) {
                    setTimeout(jump1, 1000);
                } else {
                    alert(obj.message);
                }
            },
            error: function(data) {
                document.getElementById("loading").style.display = "none";
                alert("提交失败");
                $("#draftbtn0").attr('disabled', false);
            }
        });
    }
}
var legalmansfz = "";

//提交办证接口
//提交办证接口
//——————————————————————————————————————
$(function() {
        var requestKey = "81cf663a9b2843628619acc03fd988b6";
        var requestSecret = "ec09c23959bea318240ea21220f9f09c";
        var time = new Date().getTime()
        var key = requestKey + requestSecret + time
        sign = hex_md5(key)
        console.log(sign)
        $.ajax({
            type: 'get',
            url: 'http://118.178.118.147/ycslapi/api/secret/getSecretByKey',
            data: {
                requestKey: '81cf663a9b2843628619acc03fd988b6',
                sign: sign,
                requestTime: time
            },
            dataType: 'json',
            success: (res) => {
                console.log(res)
                var token = res.resultmsg;
                localStorage.setItem('token', token)
            }
        })
        $.ajax({
            type: 'get',
            url: 'http://ag.sx.gov.cn/jimsx/interface/pusermessage.do',
            data: {
                GMSFZHM: userInfo.idnum
            },
            success: (res) => {

                var arr = JSON.parse(res)
                console.log(111, arr)
                var dz = arr.datas[0].qTZZ
                document.getElementById("contactAddress").value = dz
            }
        })
    })
    //————————————————————————————————————————————————————
function submitItem() {
    //留言正文
    var admsg = document.getElementById("advicecontent").value;
    var submitusername;
    var submitidcard;
    var agentName = document.getElementById("agentName").value;
    var agentIdcard = document.getElementById("agentIdcard").value;
    var legalman = document.getElementById("legalman").value;
    var contactAddress = document.getElementById("contactAddress").value;
    var name;
    if (foruser == "puser") { //个人
        name = document.getElementById("applyname").value;
        submitmobile = userInfo.mobile;
        submitusername = userInfo.username;
        submitidcard = userInfo.idnum;
    } else { //法人
        name = document.getElementById("applyenterprise").value;
        submitusername = userInfo.CompanyName;
        submitidcard = document.getElementById("enterprisecode").value;
        submitmobile = document.getElementById("mobile").value;
        legalmansfz = document.getElementById("legalmansfz").value
        if (submitmobile.indexOf("*") != -1) {
            submitmobile = userInfo.attnPhone;
        }
        if (agentName.indexOf("*") != -1) {
            agentName = userInfo.attnName;
        }
        if (agentIdcard.indexOf("*") != -1) {
            agentIdcard = userInfo.attnIDNo;
        }
        if (legalman.indexOf("*") != -1) {
            legalman = userInfo.CompanyLegRep;
        }

    }

    if (foruser == "puser") { //个人判空
        //先判空
        if (!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
            mui.alert("请输入申报人姓名");
            return;
        } else {
            if (isManual) { //需要快递
                isPost = "Y";
                if (document.getElementById("parent1").style.display == "block") {
                    //列表选择地址
                    if (!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
                        mui.alert("您还未选择收件地址");
                        return;
                    }
                } else {
                    //表单填写地址
                    adressname = document.getElementById("addressname").value;
                    adressmobile = document.getElementById("addressmobile").value;
                    adressarea = document.getElementById("addressarea").value;
                    postcode = document.getElementById("postcode").value;
                    //先判空
                    if (!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
                        mui.alert("请输入收件人");
                        return;
                    } else if (!(new RegExp("\\S+")).test(adressmobile)) {
                        mui.alert("请输入联系电话");
                        return;
                    } else if (!(checkPhone(adressmobile) || checkMobile(adressmobile))) {
                        mui.alert("请输入正确的联系电话");
                        return;
                    } else if (!(/^[1-9][0-9]{5}$/).test(postcode)) {
                        mui.alert("请输入正确的邮政编码");
                        return;
                    } else if (!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
                        mui.alert("详细地址不少于5个字");
                        return;
                    }
                    receivename = adressname;
                    receivemobile = adressmobile;
                    receiveaddress = adressarea;
                    provinceCode = storage.provinceCode;
                    provinceName = storage.province;
                    cityCode = storage.cityCode;
                    cityName = storage.city;
                    regionCode = storage.countyCode;
                    regionName = storage.county;
                    saveAddress();
                }

            } else {
                isPost = "N";
                receivename = "";
                receivemobile = "";
                receiveaddress = "";
                postcode = "";
                provinceCode = "";
                provinceName = "";
                cityCode = "";
                cityName = "";
                regionCode = "";
                regionName = "";
            }
        }
    } else { //法人判空
        var regs = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        //先判空
        if (!(new RegExp("\\S+")).test(name)) { //判断字符串是否为空或都是空格
            mui.alert("请输入申报单位");
            return;
        } else if (!(new RegExp("\\S+")).test(document.getElementById("mobile").value)) {
            mui.alert("请输入联系电话");
            return;
        } else if (!(checkPhone(submitmobile) || checkMobile(submitmobile))) {
            mui.alert("请输入正确的联系电话");
            return;
        } else if (!(new RegExp("\\S+")).test(legalman)) {
            mui.alert("请输入法人代表");
            return;
        } else if (!(new RegExp("\\S+")).test(legalmansfz)) {
            mui.alert("请输入法人代表身份证");
            return;
        } else if (regs.test(legalmansfz) === false) {
            mui.alert("身份证输入不合法");
            return;
        } else {
            if (isManual) { //需要快递
                isPost = "Y";
                if (document.getElementById("parent1").style.display == "block") {
                    //列表选择地址
                    if (!(new RegExp("\\S+")).test(receivename)) { //判断字符串是否为空或都是空格
                        mui.alert("您还未选择收件地址");
                        return;
                    }
                } else {
                    //表单填写地址
                    adressname = document.getElementById("addressname").value;
                    adressmobile = document.getElementById("addressmobile").value;
                    adressarea = document.getElementById("addressarea").value;
                    postcode = document.getElementById("postcode").value;
                    //先判空
                    if (!(new RegExp("\\S+")).test(adressname)) { //判断字符串是否为空或都是空格
                        mui.alert("请输入收件人");
                        return;
                    } else if (!(new RegExp("\\S+")).test(adressmobile)) {
                        mui.alert("请输入联系电话");
                        return;
                    } else if (!(checkPhone(mobile) || checkMobile(adressmobile))) {
                        mui.alert("请输入正确的联系电话");
                        return;
                    } else if (!(/^[1-9][0-9]{5}$/).test(postcode)) {
                        mui.alert("请输入正确的邮政编码");
                        return;
                    } else if (!(new RegExp("\\S+")).test(adressarea) || adressarea.length < 5) {
                        mui.alert("详细地址不少于5个字");
                        return;
                    }
                    receivename = adressname;
                    receivemobile = adressmobile;
                    receiveaddress = adressarea;
                    saveAddress();
                }

            } else {
                isPost = "N";
                receivename = "";
                receivemobile = "";
                receiveaddress = "";
                postcode = "";
                provinceCode = "";
                provinceName = "";
                cityCode = "";
                cityName = "";
                regionCode = "";
                regionName = "";
            }
        }
    }

    //判断是否空
    if ((vsiteid == 59 || vsiteid == 57 || vsiteid == 56 || vsiteid == 55) && contactAddress == "") {
        mui.alert("请输入联系地址");
        return;
    }
    if (foruser == "uuser") {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!(new RegExp("\\S+")).test(agentName)) { //判断字符串是否为空或都是空格
            mui.alert("请输入代理人姓名");
            return;
        } else if (!(new RegExp("\\S+")).test(agentIdcard)) {
            mui.alert("请输入代理人身份证");
            return;
        } else if (reg.test(agentIdcard) === false) {
            mui.alert("身份证输入不合法");
            return;
        }
    }
    //------------------------------------
    // var haveSubmit = [];
    //判断是否有文件未上传
    var flag;
    $('.necessity').each(function() {
        console.log(example.items.length)
        console.log($(this).siblings('.photos').html().length)
        if ($(this).siblings('.photos').html().length <= 400) {
            mui.alert("您还有材料未上传!");
            flag = true;
            return false;
        }

    })
    if (flag) {
        return;
    }
    //---------------------------------------------------
    if (document.getElementById("issure").checked == true) {

    } else {
        mui.alert("请遵守信用承诺!")
        return;
    }
    document.getElementById('loading').style.display = 'block';
    //开始提交
    var basicData = {
        "serviceid": serviceid, //申报的事项id
        "serviceCodeId": serviceCodeId, //权力事项基本码
        "servicename": itemname, //申报的事项名称
        "username": submitusername, //申报人姓名
        "mobile": submitmobile, //申报人联系电话
        "idcard": submitidcard, //申报人身份证号
        "idcard_type": idcard_type, //证件类别
        "contactaddress": "", //申报人联系地址 
        "needPost": isPost, //是否快递  "Y":快递 "N":不快递
        "deptunid": deptunid, //单位id
        "legalman": legalman, //	
        "legalmansfz": legalmansfz, //法人代表

        "serviceType": serviceType, //事项类型
        "ss_orgcode": ss_orgcode, //实施机构组织机构代码
        "bljg": bljg, //办理机构
        "promiseday": cntime, //承诺办结时间
        "agentName": agentName,
        "agentIdcard": agentIdcard,
        "address": contactAddress
    }

    var mail = {
        "receiveaddress": receiveaddress, //收件地址
        "receivemobile": receivemobile, //收件人手机
        "receivename": receivename, //收件人姓名
        "postcode": postcode, //邮政编码
        "provinceCode": provinceCode,
        "provinceName": provinceName,
        "cityCode": cityCode,
        "cityName": cityName,
        "regionCode": regionCode,
        "regionName": regionName
    }
    var prama = {
        "data": basicData,
        "files": filesArray,
        "mail": mail,
        "type": "1", //0 保存草稿  1提交
        "containertype": containerType, //0 微信 1 app
        "token": token,
        "siteid": vsiteid,
        "message": admsg,
        "code": itemcode,
        "deptid": colid,
        "bdcl": vbdcl,
        "itemcodeid": itemcodeid,
        "userid": userInfo.userid, //申报人用户id
        "validitykey": validitykey
    }
    var pramaData = {
        "infoStr": JSON.stringify(prama)
    }

    if ((new RegExp("\\S+")).test(vbdcl)) {
        window.sessionStorage.prama = JSON.stringify(prama);
        window.location.href = 'oderform.html?formid=' + vbdcl + "&cityname=" + cityName1 + "&validitykey=" + validitykey + "&siteid=" + vsiteid;
    } else {
        $("#submitbtn0").attr('disabled', true);
        $.ajax({
            type: "post",
            url: overallInterface + 'ywzw/interface/submitOnlineHandle.do',
            data: pramaData,
            dataType: 'json',
            success: function(data) {
                var obj = data;
                if (obj.result == true) {
                    console.log('1')
                    setTimeout(jump, 1000);
                } else {
                    alert(obj.message);
                }
            },
            error: function(data) {
                document.getElementById("loading").style.display = "none";
                alert("提交失败");
                $("#submitbtn0").attr('disabled', false);
            }
        });
    }


    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



    var apasPostXml;
    if (document.getElementById('addressInfo').style.display == "block") {
        var apasPost = {};
        apasPost.Receive_name = $("#addressname").val();

        apasPost.Receive_phone = $("#addressmobile").val();

        var Ssq = $("#showCityPicker3").val();

        var xxdz = $("#addressarea").val();

        apasPost.Receive_addr = Ssq + xxdz;
        apasPost.Receive_post = $("#postcode").val();

        apasPost.Products = '';
        apasPost.TAKE_POSTNO = '';
        apasPost.POST_UNITNAME = '';
        apasPost.Send_unitname = '';
        apasPost.Send_user = '';
        apasPost.Send_phone = '';
        apasPost.BELONGSYSTEM = '001008006007122001';
        apasPost.AREACODE = '330604';
        apasPost.EXTEND = '';
        apasPost.REMARK = '';
        apasPost.SYNC_STATUS = '';
        apasPost.DATAVERSION = '';
        var data = {
            "express": apasPost
        };
        var apasPostXml = JSON.stringify(data);
    }

    var container = containerT();
    var usercode = 0;
    if (container != "web") {} else { //微信
        var dataBasicInfoStr = window.localStorage.dataBasicInfo;
    }

    var baseInfo = {};
    var baseInfoXml = window.localStorage.baseInfoXml;
    var attrXml = window.localStorage.attrXml;
    var formXml;

    let ydswryyhyjhhspb = window.localStorage.ydswryyhyjhhspb;
    if (ydswryyhyjhhspb != undefined) {
        formXml = ydswryyhyjhhspb;
    }
    let sqdmzmdjb = window.localStorage.sqdmzmdjb;
    if (sqdmzmdjb != undefined) {
        formXml = sqdmzmdjb;
    }
    let syryszbzjhfxjslb = window.localStorage.syryszbzjhfxjslb;
    if (syryszbzjhfxjslb != undefined) {
        formXml = syryszbzjhfxjslb;
    }
    let syrysybzjslb = window.localStorage.syrysybzjslb;
    if (syrysybzjslb != undefined) {
        formXml = syrysybzjslb;
    }
    // let cbryjbylbxstjfnxhdb = window.localStorage.cbryjbylbxstjfnxhdb;
    // if(cbryjbylbxstjfnxhdb != undefined) {
    // 	formXml = cbryjbylbxstjfnxhdb;
    // }
    let grcydbdktxsqb = window.localStorage.grcydbdktxsqb;
    if (grcydbdktxsqb != undefined) {
        formXml = grcydbdktxsqb;
    }
    let zypxbtsqbgr = window.localStorage.zypxbtsqbgr;
    if (zypxbtsqbgr != undefined) {
        formXml = zypxbtsqbgr;
    }
    // let cydzjzckslspb = window.localStorage.cydzjzckslspb;
    // if(cydzjzckslspb != undefined) {
    // 	formXml = cydzjzckslspb;
    // }
    // let cydzjzckbgspb = window.localStorage.cydzjzckbgspb;
    // if(cydzjzckbgspb != undefined) {
    // 	formXml = cydzjzckbgspb;
    // }
    let czscxkslsqb = window.localStorage.czscxkslsqb;
    if (czscxkslsqb != undefined) {
        formXml = czscxkslsqb;
    }
    let czjyxkslsqb = window.localStorage.czjyxkslsqb;
    if (czjyxkslsqb != undefined) {
        formXml = czjyxkslsqb;
    }
    let czjyxkbgsqb = window.localStorage.czjyxkbgsqb;
    if (czjyxkbgsqb != undefined) {
        formXml = czjyxkbgsqb;
    }
    let czscxkyxsqb = window.localStorage.czscxkyxsqb;
    if (czscxkyxsqb != undefined) {
        formXml = czscxkyxsqb;
    }
    let czscxkbgsqb = window.localStorage.czscxkbgsqb;
    if (czscxkbgsqb != undefined) {
        formXml = czscxkbgsqb;
    }
    let sjwwkhdwydzbhcsxksqb = window.localStorage.sjwwkhdwydzbhcsxksqb;
    if (sjwwkhdwydzbhcsxksqb != undefined) {
        formXml = sjwwkhdwydzbhcsxksqb;
    }
    let sxjwwkhdwydzbhcsxksqb = window.localStorage.sxjwwkhdwydzbhcsxksqb;
    if (sxjwwkhdwydzbhcsxksqb != undefined) {
        formXml = sxjwwkhdwydzbhcsxksqb;
    }
    let sxjwwbhdwqyfaxksqb = window.localStorage.sxjwwbhdwqyfaxksqb;
    if (sxjwwbhdwqyfaxksqb != undefined) {
        formXml = sxjwwbhdwqyfaxksqb;
    }
    let ypzdsxjwwbhdwxsfazynrbgspsqb = window.localStorage.ypzdsxjwwbhdwxsfazynrbgspsqb;
    if (ypzdsxjwwbhdwxsfazynrbgspsqb != undefined) {
        formXml = ypzdsxjwwbhdwxsfazynrbgspsqb;
    }
    let sxjwwbhdwxsxksqb = window.localStorage.sxjwwbhdwxsxksqb;
    if (sxjwwbhdwxsxksqb != undefined) {
        formXml = sxjwwbhdwxsxksqb;
    }
    let whdwwwbhdwdbkydwwxsxksqb = window.localStorage.whdwwwbhdwdbkydwwxsxksqb;
    if (whdwwwbhdwdbkydwwxsxksqb != undefined) {
        formXml = whdwwwbhdwdbkydwwxsxksqb;
    }
    let ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb = window.localStorage.ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb;
    if (ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb != undefined) {
        formXml = ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb;
    }
    let fgysjwwbhdwzrdyhzgbytdbasqb = window.localStorage.fgysjwwbhdwzrdyhzgbytdbasqb;
    if (fgysjwwbhdwzrdyhzgbytdbasqb != undefined) {
        formXml = fgysjwwbhdwzrdyhzgbytdbasqb;
    }
    let basqb = window.localStorage.basqb;
    if (basqb != undefined) {
        formXml = basqb;
    }
    let sxjwwbhdwrcwhbygcbasqb = window.localStorage.sxjwwbhdwrcwhbygcbasqb;
    if (sxjwwbhdwrcwhbygcbasqb != undefined) {
        formXml = sxjwwbhdwrcwhbygcbasqb;
    }
    let qggycpscxkzsqb = window.localStorage.qggycpscxkzsqb;
    if (qggycpscxkzsqb != undefined) {
        formXml = qggycpscxkzsqb;
    }
    let chxzxksqs = window.localStorage.chxzxksqs;
    if (chxzxksqs != undefined) {
        formXml = chxzxksqs;
    }
    // let mzcfbgsqspb = window.localStorage.mzcfbgsqspb;
    // if(mzcfbgsqspb != undefined) {
    // 	formXml = mzcfbgsqspb;
    // }
    let daxzxksqs = window.localStorage.daxzxksqs;
    if (daxzxksqs != undefined) {
        formXml = daxzxksqs;
    }
    // let nhgtpthcysywjyxksqs = window.localStorage.nhgtpthcysywjyxksqs;
    // if(nhgtpthcysywjyxksqs != undefined) {
    // 	formXml = nhgtpthcysywjyxksqs;
    // }
    let ldzhjdsqs = window.localStorage.ldzhjdsqs;
    if (ldzhjdsqs != undefined) {
        formXml = ldzhjdsqs;
    }
    let ggjjcsa = window.localStorage.ggjjcsa;
    if (ggjjcsa != undefined) {
        formXml = ggjjcsa;
    }

    if (dataBasicInfoStr != undefined || itemcode != "") {
        myRequest({
            type: "post",
            url: "https://app.zjzwfw.gov.cn/zjwssb/ywzw/interface/matterDetail.do",
            data: {
                code: itemcode
            },
            dataType: 'json',
            success: function(data) {

                itemcode = data.itemcode;
                name = data.serviceName;
                serviceName = data.serviceName;
                webid = data.siteId;
                areaCode = data.areaCode;

                baseInfo.SERVICECODE = data.serviceCode;
                baseInfo.SERVICECODE_ID = data.baseCode;
                baseInfo.SERVICEVERSION = data.version;
                baseInfo.SERVICENAME = data.serviceName;
                baseInfo.PROJECTNAME = data.serviceName;
                baseInfo.INFOTYPE = '即办件';
                //baseInfo.INFOTYPE = window.localStorage.servicetype;
                //console.log(baseInfo.INFOTYPE );
                baseInfo.BUS_TYPE = "0";
                if (foruser == "puser") {
                    baseInfo.APPLYNAME = userInfo.username;
                } else {
                    baseInfo.APPLYNAME = userInfo.CompanyLegRep;
                }

                if (foruser == "puser") {
                    baseInfo.APPLY_CARDNUMBER = userInfo.idnum;
                } else {
                    baseInfo.APPLY_CARDNUMBER = userInfo.uniscid;
                }

                if (foruser == "puser") {
                    baseInfo.CONTACTMAN = userInfo.username;
                } else {
                    baseInfo.CONTACTMAN = userInfo.CompanyLegRep;
                }

                if (foruser == "puser") {
                    baseInfo.CONTACTMAN_CARDTYPE = "身份证";
                } else {
                    baseInfo.CONTACTMAN_CARDTYPE = "组织机构代码";
                }

                if (foruser == "puser") {
                    baseInfo.CONTACTMAN_CARDNUMBER = userInfo.idnum;
                } else {
                    baseInfo.CONTACTMAN_CARDNUMBER = userInfo.attnIDNo;
                }

                if (foruser == "puser") {
                    baseInfo.XK_FR_SFZH = "";
                } else {
                    baseInfo.XK_FR_SFZH = userInfo.uniscid;
                }


                if (foruser == "puser") {
                    baseInfo.TELPHONE = userInfo.mobile;
                } else {
                    baseInfo.TELPHONE = userInfo.attnPhone;
                }

                baseInfo.DEPTID = data.deptId;
                //baseInfo.DEPTNAME = dataBasicInfoObj.deptname;//部门名称
                baseInfo.DEPTNAME = '区人力社保局';
                //baseInfo.SS_ORGCODE = dataBasicInfoObj.ss_orgcode;//实施机构组织代码

                baseInfo.SS_ORGCODE = '71547240-7';

                baseInfo.RECEIVE_USEID = userInfo.userid;
                if (foruser == "puser") {
                    baseInfo.RECEIVE_NAME = userInfo.username;
                } else {
                    baseInfo.RECEIVE_NAME = userInfo.CompanyLegRep;
                }

                baseInfo.APPLYFROM = "1";
                baseInfo.APPROVE_TYPE = "01";
                baseInfo.APPLY_PROPERTIY = "99";
                //			baseInfo.RECEIVETIME = "";
                // baseInfo.AREACODE = data.areaCode;
                baseInfo.AREACODE = '330604';
                baseInfo.DATASTATE = "1";
                baseInfo.BELONGSYSTEM = "001008006007122001";
                baseInfo.SYNC_STATUS = "I";
                baseInfo.INTYPE = "3";
                baseInfo.DATAVERSION = 1;
                baseInfo.SERVICE_DEPTID = "";
                baseInfo.BUS_MODE = "";
                baseInfo.BUS_MODE_DESC = "";
                baseInfo.REL_BUS_ID = "";

                if (foruser == "puser") {
                    baseInfo.APPLY_CARDTYPE = "身份证";
                } else {
                    baseInfo.APPLY_CARDTYPE = "组织机构代码证";
                }

                baseInfo.POSTCODE = "";
                //baseInfo.ADDRESS = $("#txt_lxdz").val();
                if (typeof($("#contactAddress").val()) === undefined) {
                    baseInfo.ADDRESS = "";
                } else {
                    baseInfo.ADDRESS = $("#contactAddress").val();
                }
                baseInfo.LEGALMAN = "";
                baseInfo.BELONGTO = "";
                baseInfo.EXTEND = "";
                if (foruser == "puser") {
                    usercode;
                } else {
                    usercode = 1;
                }
                baseInfo.APPLY_TYPE = usercode;

            },
            error: function(data) {
                mui.alert("请求未获得预期结果")
            }
        });

        var data = {
            "data": baseInfo
        };
        var baseInfoXml = JSON.stringify(data);
        var file = [];
        var filenew = [];
        $.ajax({
            url: "https://app.zjzwfw.gov.cn/open/interfaces/shenbaocailiao.do",
            type: "post",
            async: false,
            data: {
                itemcode: itemcode,
                webid: webid,
                name: name
            },
            dataType: 'json',
            success: function(data) {
                console.log(data, 'aaa')

                // deptunid=data.service.servicejson.deptunid;
                // serviceCode=data.service.servicejson.unid;
                for (var i = 0; i < data.cailiao.length; i++) {
                    console.log(data.cailiao)
                    file[i] = {};
                    file[i].ATTRNAME = data.cailiao[i].name;
                    file[i].ATTRID = data.cailiao[i].material;

                    file[i].EPEX = '';
                    // -----------------------吕长峰-------
                    // file[i].TAKETYPE = "纸质收取";
                    //-----------------------吕长峰-------
                    file[i].TAKETYPE = "电子证照库";
                    // if (data.cailiao[i].EMPTYTABLE != '') {
                    //   file[i].EPEX = '表单填写';
                    //   file[i].TAKETYPE = "表单填写";
                    // } else {
                    //   file[i].EPEX = '';
                    //   file[i].TAKETYPE = "电子证照库";
                    // }

                    file[i].ISTAKE = "1"
                        //				file[i].TAKETIME = 
                    file[i].BELONGSYSTEM = "001008006007122001";
                    // file[i].Areacode = areaCode;
                    file[i].Areacode = '330604';
                    //				file[i].CREATE_TIME = 
                    file[i].SYNC_STATUS = "I";
                    file[i].DATAVERSION = 1;


                    var zjz = JSON.parse(sessionStorage.getItem("sj"))
                    file[i].FILEURL = new Array();
                    // var array = "[]";
                    file[i].FILEURL.push(zjz[i])
                    console.log(filesArray, 'file')
                    filesArray.forEach(keys => {
                            if (keys.materialName == data.cailiao[i].name) {
                                // console.log(keys,'000')
                                if (keys.materialUNID != null && keys.materialUNID != array) {
                                    if (keys.materialUNID[0].indexOf("http") == -1) {

                                        file[i].EPEX = ''
                                        file[i].TAKETYPE = "附件上传";
                                        // var fileurl = keys[1];
                                        file[i].FILEURL.push(keys.path);

                                    } else if (!keys.materialUNID[0].indexOf("http") == -1) {
                                        file[i].TAKETYPE = "纸质收取";
                                        file[i].FILEURL = keys;
                                    }
                                    // if (keys.materialUNID[0].indexOf("http") == -1) {

                                    //   file[i].TAKETYPE = "电子证照库";
                                    //   var fileurl = keys[1];
                                    //   file[i].FILEURL.push(fileurl);
                                    // } else  if(!keys.materialUNID[0].indexOf("http") == -1){
                                    //   file[i].TAKETYPE = "附件上传";
                                    //   file[i].FILEURL = keys;
                                    // }

                                    //								localStorage.removeItem(keys);
                                    //								alert("zgf"+file[i].TAKETYPE);
                                    //							file[i].FILEURL = ["https://open.zjzwfw.gov.cn/open/wxImg/5115603415ce4b23b2dfe6472a7e5a0d.jpeg","https://open.zjzwfw.gov.cn/open/wxImg/a689f538dfc94e2b9a5d0e3bb1e9f67c.jpeg"];
                                    //							alert(JSON.stringify(file[i].FILEURL));
                                } else {
                                    file[i].TAKETYPE = "纸质收取";
                                }

                                //								window.localStorage.removeItem(keys);
                            }
                        })
                        // for (var j = 0; j < example.items.length; j++) {

                    // 	if (example.items[j].EMPTYTABLE != "" && example.items[j].name == file[i].ATTRNAME) {
                    // 		file[i].EXPT = "";
                    // 		file[i].TAKETYPE = "表单填写";							
                    // 	} else if (example.items[j].EMPTYTABLE = "" && example.items[j].name == file[i].ATTRNAME) {
                    // 		file[i].TAKETYPE = "电子证照库";
                    // 	}
                    // }
                    if (file[i].FILEURL == "") {
                        file[i].FILEURL = [];
                    }

                    file[i].EXETEND = "";
                    file[i].MEMO = "";
                    file[i].AMOUNT = "";
                    file[i].SORTID = "";
                    filenew.push(file[i]);
                }
            },
            error: function(data) {
                mui.alert("请求未获得预期结果")
            }
        });

        var files = {
            "files": filenew
        };
        for (let i = 0; i < files.files.length; i++) {
            if (files.files[i].ATTRNAME == '异地死亡人员运回原籍火化审批表' && window.localStorage.ydswryyhyjhhspb != undefined) {
                files.files[i].EPEX = '表单填写';
                files.files[i].TAKETYPE = '附件上传';

            }
        }
        console.log(files, '----')

        var attrXml = JSON.stringify(files);
        window.localStorage.attrXml = attrXml;
        window.localStorage.baseInfoXml = baseInfoXml;
    }

    // var bdjson = {
    // 	"cydzjzckxksl": "97AC934074CF1DAD7DD42E414CF255FD",
    // 	"cydzjzckxkbg": "2F16B82BEB5741B75299EBA849EA1459",
    // 	"syzyzc": "CF4132195056782A67CAE2F2304D9EB0",
    // 	"czscxkzhfsl": "F4B99B26C867B8E8BD1745DEB5450E60",

    // 	"syjjzscjyxkzhfmzyzsl": "52871024DCBB8DF3DA94E4715F500D71",
    // 	"syjjzscjyxkzhfmzyzbg": "10AC12CCD13C02CE7E900AF66836C006",
    // 	"czscxkzhfbg": "2F16B82BEB5741B75299EBA849EA1459",
    // 	"bdcdjzlcxgr": "A6008C01E742A5B2BB219F3F6EEE9E2A",
    // }
    // for(var key in bdjson) {
    // 	var title = window.localStorage[key];
    // 	if(title != undefined) {
    // 		formXml = title;
    // 		window.localStorage.removeItem(key);
    // 		window.localStorage.removeItem("baseInfoXml");
    // 		window.localStorage.removeItem("attrXml");
    // 	}
    // }


    $.ajax({
        url: 'http://syydb.syzjjgw.com:8180/jimsy/interface/authentication.do',
        data: {
            requestKey: '81cf663a9b2843628619acc03fd988b6'
        },
        type: 'post',
        dataType: 'json',
        success: function(data) {

            var token = data.resultmsg;
            //			alert(token+"_token");
            var params = {};
            params.requestKey = "81cf663a9b2843628619acc03fd988b6";
            params.token = token;
            params.baseInfoXml = baseInfoXml;
            params.attrXml = attrXml;
            params.formXml = formXml;
            // console.log(attrXml, '材料列表1')
            var dQlInnerCode = getParameter('dQlInnerCode')
            if (dQlInnerCode == "5d027ac1-6d52-439d-91b6-c1797501ef35" || dQlInnerCode == "0A11173A892E6983ADB42AE68CB63B40") {
                files.EPEX = '';
            }

            $.ajax({
                url: 'http://syydb.syzjjgw.com:8180/jimsy/interface/consignee.do',
                //				url: 'http://192.168.1.108:8080/shaoxing/interface/consignee.do',
                type: 'post',
                //				data: params,
                data: {
                    requestKey: "81cf663a9b2843628619acc03fd988b6",
                    token: token,
                    baseInfoXml: baseInfoXml,
                    attrXml: attrXml,
                    formXml: formXml,
                    apasPostXml: apasPostXml
                },

                dataType: 'json',
                success: function(data) {
                    console.log(data.projid);
                    console.log(JSON.stringify(data) + "_aa");
                    if (data.result == "01") {
                        //删除申报材料缓存
                        var array = "[]";
                        for (var keys in window.localStorage) {
                            if (keys == "userInfo" || keys == "wxpassword" || keys == "wxuserInfo" || keys == "wxuserType") {
                                continue;
                            }
                            localStorage.removeItem(keys);
                        }
                        file = "";
                        files = "";
                        filenew = "";
                        attrXml = "";
                        window.localStorage.attrXml = "";

                        //删除表单缓存
                        window.localStorage.removeItem("ydswryyhyjhhspb");
                        window.localStorage.removeItem("ydswryyhyjhhspb1");
                        window.localStorage.removeItem("sqdmzmdjb");
                        window.localStorage.removeItem("syryszbzjhfxjslb");
                        window.localStorage.removeItem("syrysybzjslb");
                        window.localStorage.removeItem("cbryjbylbxstjfnxhdb");
                        window.localStorage.removeItem("grcydbdktxsqb");
                        window.localStorage.removeItem("zypxbtsqbgr");
                        window.localStorage.removeItem("cydzjzckslspb");
                        window.localStorage.removeItem("cydzjzckbgspb");
                        window.localStorage.removeItem("czscxkslsqb");
                        window.localStorage.removeItem("czjyxkslsqb");
                        window.localStorage.removeItem("czjyxkbgsqb");
                        window.localStorage.removeItem("czscxkyxsqb");
                        window.localStorage.removeItem("czscxkbgsqb");
                        window.localStorage.removeItem("sjwwkhdwydzbhcsxksqb");
                        window.localStorage.removeItem("sxjwwkhdwydzbhcsxksqb");
                        window.localStorage.removeItem("sxjwwbhdwqyfaxksqb");
                        window.localStorage.removeItem("ypzdsxjwwbhdwxsfazynrbgspsqb");
                        window.localStorage.removeItem("sxjwwbhdwxsxksqb");
                        window.localStorage.removeItem("whdwwwbhdwdbkydwwxsxksqb");
                        window.localStorage.removeItem("ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb");
                        window.localStorage.removeItem("fgysjwwbhdwzrdyhzgbytdbasqb");
                        window.localStorage.removeItem("basqb");
                        window.localStorage.removeItem("sxjwwbhdwrcwhbygcbasqb");
                        window.localStorage.removeItem("qggycpscxkzsqb");
                        window.localStorage.removeItem("chxzxksqs");
                        window.localStorage.removeItem("mzcfbgsqspb");
                        window.localStorage.removeItem("daxzxksqs");
                        window.localStorage.removeItem("nhgtpthcysywjyxksqs");
                        window.localStorage.removeItem("ldzhjdsqs");
                        window.localStorage.removeItem("ggjjcsa");
                        storage.removeItem("dataBasicInfo");
                        window.localStorage.removeItem("baseInfoXml");
                        window.localStorage.projid = data.projid;
                        window.localStorage.projpwd = data.projpwd;
                        // $.ajax({
                        // 	type: "post",
                        // 	url: "http://ag.sx.gov.cn/jimsx/interface/setInfo.do",
                        // 	data: {
                        // 		servicename: serviceName,
                        // 		unid: deptunid,
                        // 		procode: serviceCode,
                        // 		username: userInfo.username
                        // 	},
                        // 	success: function (data) {
                        // 		console.log(JSON.parse(data));
                        // 		window.location.href = "ordersuccess.html?type=02&itemname=" + itemname + "&mobile=" + submitmobile;
                        // 	}
                        // });
                        setTimeout(jump, 1000);
                    } else {
                        mui.alert("您的数据有误，请重新输入");
                        return false;
                    }
                },
                error: function(err) {
                    console.log(err)
                    document.getElementById("loading").style.display = "none";
                    //alert("服务器繁忙，请重试！");
                    mui.alert("服务器繁忙，系统将自动重新提交");
                    return false;
                }
            });
        },
        error: function(err) {
            console.log(err, '----11');
            document.getElementById("loading").style.display = "none";
            //alert("服务器繁忙，请重试！");
            mui.alert("服务器繁忙，系统将自动重新提交");
            return false;
        }
    });



    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // 谈嘉祺修改----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}

function jump() {
    window.location.href = "odersuccess.html?type=02&siteid=" + vsiteid + "&cityname=" + cityName1;
}

function jump1() {
    //草稿
    window.location.href = "odersuccess.html?type=03&siteid=" + vsiteid + "&cityname=" + cityName1;
}

var parent; //0-无上级区域编码，即省、直辖市上级区域编码
var level; //0-中国 1-省、直辖市、行政区 2-地市 3-区、县

//地区编码查询
function queryRegion(area, type) {
    var date;
    if (type == 0) {
        //省
        parent = 0;
        level = 1;
    } else if (type == 1) {
        //市
        parent = storage.provinceCode;
        level = 2;
    } else if (type == 2) {
        //区
        parent = storage.cityCode;
        level = 3;
    }
    date = {
        parent: parent,
        level: level
    }
    var requesturl = overallInterface + "ywzw/interface/region.do";
    myRequest({
        data: date,
        url: requesturl,
        header: '',
        success: function(data) { //成功
            var obj = data;
            if (obj.state == 200) {
                var content = obj.content;
                var parent = content.parent;
                var regions = content.regions;
                if (regions.length > 0) { //有数据
                    for (var i = 0; i < regions.length; i++) {
                        var id = regions[i].id;
                        var name = regions[i].name;
                        if (name == area) {
                            if (type == 0) {
                                storage.provinceCode = id;
                                queryRegion(storage.city, 1);
                            } else if (type == 1) {
                                storage.cityCode = id;
                                queryRegion(storage.county, 2);
                            } else if (type == 2) {
                                storage.countyCode = id;
                            }
                        }
                    }
                }
            } else {}
        },
        fail: function(data) { //失败
        }
    });
}

function saveAddress() {
    //提交地址
    var date;
    var addressInfo;
    var requesturl;
    //	date = {
    //		siteid: vsiteid,
    //		userid: userInfo.userid,
    //		postName: adressname,
    //		postPhone: adressmobile,
    //		postAddress: adressarea
    //	}
    addressInfo = {
        "name": adressname,
        "phone": adressmobile,
        "provinceCode": window.localStorage.provinceCode,
        "provinceName": window.localStorage.province,
        "cityCode": window.localStorage.cityCode,
        "cityName": window.localStorage.city,
        "regionCode": window.localStorage.countyCode,
        "regionName": window.localStorage.county,
        "street": "",
        "address": adressarea,
        "postcode": postcode,
        "isDefault": 0, //是否默认地址：0-否 1-是
        "description": ""
    }
    var vuserType; //1-个人用户;2-法人用户
    if (foruser == "puser") { //个人
        vuserType = 1;
    } else {
        vuserType = 2;
    }

    date = {
        userType: vuserType,
        userId: userInfo.userid,
        addressInfo: JSON.stringify(addressInfo)
    }
    requesturl = overallInterface + "ywzw/interface/addAddr.do";

    myRequest({
        url: requesturl,
        data: date,
        header: '',
        success: function(data) { //成功
            var obj = data;
            if (obj.state == 200) {
                //				mui.alert("保存成功");
            } else {
                mui.alert(obj.message);
            }
        },
        fail: function(data) { //失败
            document.getElementById('loading').style.display = 'none';
            //			alert("保存失败");

        }
    });

}

//验证手机号是否合法
function checkPhone(str) {
    var re = /^1\d{10}$/
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}
//验证电话号码是否合法
function checkMobile(str) {
    var re = /^0\d{2,3}-?\d{7,8}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}
//验证身份证是否合法
var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
};

function isCardID(sId) {
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "您输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "您的身份证地区非法";
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    //	if(iSum % 11 != 1) return "您输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return "合法";
}
//数组去除重复元素
function unique(arr) {
    // 遍历arr，把元素分别放入tmp数组(不存在才放)
    var tmp = new Array();
    for (var i in arr) {
        //该元素在tmp内部不存在才允许追加
        if (tmp.indexOf(arr[i]) == -1) {
            tmp.push(arr[i]);
        }
    }
    return tmp;
}

//申报材料
function requestWorkMaterial(itemcode, name, webid) {
    var date = {
        itemcode: itemcode,
        webid: webid,
        name: name
    }
    myRequest({
        //		url: zjzwurl + "interface/getBsznCailiaoList.do",
        url: "http://www.zjzwfw.gov.cn/zjzw/app/bmfw/getBsznAppCailiaoList.do",
        data: date,
        header: '',
        success: function(data) {
            document.getElementById('loading').style.display = 'none';
            var list = '';
            if (!(new RegExp("\\S+")).test(data) || data == null) {
                return;
            } else {
                list = data;
            }
            if ((new RegExp("\\S+")).test(list)) { //有数据
                dataArray = [];
                var vcai = list.cailiao;
                //判断是否为数组
                if (isArray(vcai)) {
                    dataArray = vcai;
                    material = dataArray;
                } else {
                    //					document.getElementById('parent').innerHTML = "<div style='padding: 15px;font-size:18px;color: #222222;'>" + vcai + "</div>";
                    return;
                }
            } else { //无数据
                dataArray = [];
            }

            if (dataArray.length > 0) { //有数据
                example.items = [];
                var innerhtml = '';
                for (var i = 0; i < dataArray.length; i++) {
                    example.items.push({
                        index: i + 1,
                        name: dataArray[i].name,
                        UNID: dataArray[i].material,
                        emptytable: dataArray[i].EMPTYTABLE,
                        exampletable: dataArray[i].EXAMPLETABLE,
                        necessity: dataArray[i].necessity
                    });
                    if (i == 0) {
                        document.getElementById("parent").style.display = "block";
                    }
                }
            }
        },
        fail: function(data) {
            document.getElementById('loading').style.display = 'none';
        }
    });

    //判断是否为数组
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}

function word(table) {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    var isAndroid = ua.indexOf('android') != -1;
    if (isWeixin && isAndroid) {
        sessionStorage.tabledoc = table;
        window.location.href = "tabledoc.html";
    } else {
        window.location.href = table;
    }
}

//因为列表样式调整，可以从列表直接点进申报页，因此要在申报页请求办事正文以拿到材料
function requestMaterial() {
    var date = {
        itemcode: itemcode
    }
    var requesturl;
    requesturl = overallInterface + "ywzw/interface/getOnlineHandleArticle.do";
    myRequest({
        url: requesturl,
        data: date,
        header: '',
        success: function(data) { //请求成功
            document.getElementById('loading').style.display = 'none';
            var obj = data;

            localStorage.setItem("materialArray", JSON.stringify(obj.material));
            material = obj.material;
            //填充材料
            fillMaterial();

            var basicinfo = obj.basicinfo;
            bljg = basicinfo.bljg;
            deptunid = basicinfo.deptunid;
            serviceType = basicinfo.serviceType;
            ss_orgcode = basicinfo.ss_orgcode;
            serviceid = basicinfo.id;
        },
        fail: function(data) { //请求失败
            document.getElementById('loading').style.display = 'none';
        }
    });
}

//请求收货地址
var example1 = new Vue({
    el: '#parent1',
    data: {
        items1: []
    }
})

function requestAddressList() {
    var date;
    date = {
        userId: userInfo.userid
    }
    myRequest({
        url: overallInterface + "ywzw/interface/addrList.do",
        data: date,
        header: '',
        success: function(data) { //成功
            var obj = data;
            if (obj == null) {
                //				document.getElementById("badmessage").style.display = "block";
                return;
            }
            if (obj.state == 200) {
                var content = obj.content;
                if (content == null) {
                    return;
                }
                if (content.length > 0) { //有数据
                    example1.items1 = [];
                    for (var i = 0; i < content.length; i++) {
                        var usernamebefore = content[i].name;
                        var usernameshow = "";
                        var length = usernamebefore.length - 1;
                        if (length == 1) {
                            usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "*");
                        } else if (length == 2) {
                            usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "**");
                        } else {
                            usernameshow = usernamebefore.replace(usernamebefore.substr(0, length), "***");
                        }
                        var mobilebefore = content[i].phone;
                        var mobileshow = mobilebefore.replace(mobilebefore.substr(3, 4), "****");

                        example1.items1.push({
                            index: i,
                            namebefore: usernamebefore,
                            name: usernameshow,
                            mobilebefore: mobilebefore,
                            mobile: mobileshow,
                            provinceCode: content[i].provinceCode,
                            provinceName: content[i].provinceName,
                            cityCode: content[i].cityCode,
                            cityName: content[i].cityName,
                            regionCode: content[i].regionCode,
                            regionName: content[i].regionName,
                            street: content[i].street,
                            address: content[i].address,
                            postcode: content[i].postcode,
                            isDefault: content[i].isDefault,
                            description: content[i].description
                        });
                        if (i == 0) {
                            document.getElementById("parent1").style.display = "block";
                        }
                    }
                    document.getElementById("nocontent").style.display = "none";
                    setTimeout(setDefault, 10);
                } else {
                    document.getElementById("nocontent").style.display = "block";
                }
            }
        },
        fail: function(data) { //失败
            //	alert("加载失败" + data);
            document.getElementById("nocontent").style.display = "block";
        }
    });
}

//地址列表渲染完成后将第一个地址设为默认的选中状态
function setDefault() {
    document.getElementById("img0").style.display = "block";
    //	if(isPost == "Y") {
    receivename = document.getElementById("name0").innerHTML;
    receivemobile = document.getElementById("mobile0").innerHTML;
    receiveaddress = document.getElementById("address0").innerHTML;

    postcode = document.getElementById("postcode0").innerHTML;
    detailAddress = document.getElementById("detailaddress0").innerHTML;
    provinceCode = document.getElementById("provinceCode0").innerHTML;
    provinceName = document.getElementById("provinceName0").innerHTML;
    cityCode = document.getElementById("cityCode0").innerHTML;
    cityName = document.getElementById("cityName0").innerHTML;
    regionCode = document.getElementById("regionCode0").innerHTML;
    regionName = document.getElementById("regionName0").innerHTML;
    //	}

}

function addressSelected(index) {
    var imgs = document.getElementsByClassName("imgs");
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        img.style.display = "none";
    }
    var id = "img" + index;
    document.getElementById(id).style.display = "block";

    var nameid = "name" + index;
    var mobileid = "mobile" + index;
    var addressid = "address" + index;
    receivename = document.getElementById(nameid).innerHTML;
    receivemobile = document.getElementById(mobileid).innerText;
    receiveaddress = document.getElementById(addressid).innerHTML;

    var postcodeid = "postcode" + index;
    var detailaddressid = "detailaddress" + index;
    var provinceCodeid = "provinceCode" + index;
    var provinceNameid = "provinceName" + index;
    var cityCodeid = "cityCode" + index;
    var cityNameid = "cityName" + index;
    var regionCodeid = "regionCode" + index;
    var regionNameid = "regionName" + index;

    postcode = document.getElementById(postcodeid).innerHTML;
    detailAddress = document.getElementById(detailaddressid).innerHTML;
    provinceCode = document.getElementById(provinceCodeid).innerHTML;
    provinceName = document.getElementById(provinceNameid).innerHTML;
    cityCode = document.getElementById(cityCodeid).innerHTML;
    cityName = document.getElementById(cityNameid).innerHTML;
    regionCode = document.getElementById(regionCodeid).innerHTML;
    regionName = document.getElementById(regionNameid).innerHTML;
}

var example3 = new Vue({
    el: '#licenselistul',
    data: {
        licenselist: []
    }
})

function qx() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('headtop').style.display = 'none';
    document.getElementById('pullrefresh').style.display = 'none';
    document.getElementById('contentArea').style.display = 'block';
    document.getElementById('sureBtn').style.display = 'block';
    document.getElementById("licenselist").style.display = "none";
    document.getElementById('btn-cancel').style.display = 'block';
    document.getElementById('listdiv').style.display = 'block';
    document.getElementById('rlsb').style.display = 'none';
    // document.getElementById('myZz').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('licenselistull').style.display = 'none';
    document.getElementById('img1').style.display = 'none';

}
//证照列表
function getLicenseList(arg0, arg1, arg2) {
    localStorage.setItem('item', arg0)
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    vselectedindex = arg0;
    vmaterialUNID = arg1;
    vmaterialName = arg2;
    var comple = document.getElementById('done');
    comple.innerHTML = "完成";
    comple.classList.add("mui-disabled");
    document.getElementById('loading').style.display = 'block';
    document.getElementById('headtop').style.display = 'block';
    document.getElementById('pullrefresh').style.display = 'none';
    document.getElementById('contentArea').style.display = 'none';
    document.getElementById('sureBtn').style.display = 'none';
    document.getElementById("licenselist").style.display = "block";
    document.getElementById('btn-cancel').style.display = 'none';
    document.getElementById('listdiv').style.display = 'none';
    document.getElementById('rlsb').style.display = 'block';
    document.getElementById('licenselistull').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    var href = location.href;
    var dQlInnerCode = href.split("dQlInnerCode=")[1].split("&")[0];
    console.log(dQlInnerCode)
    sessionStorage.setItem('sxcode', dQlInnerCode)
    console.log(111)
    getuserinfo()
        //f5d295ad-754c-4c31-9fdc-320e465cc7b1 护士执业延续
        //67a91a7e-e752-43a0-96af-eea9ff9140ff 护士执业注销
        //f46e40aa-cc4b-440a-acae-85f2b076e2de 护士执业变更
        //a13e4a07-e8af-4ce3-81bd-89da2d4d28c9 教师资格定期注册
        //76e07e99-a9b0-4994-8462-aee2927ac2b3 少数民族考生中考加分确认
        //7f1ee4c5-8445-4819-90b6-eaa485adddae 对未成年人送工读学校进行矫治和接受教育的批准
        //fd3df80a-f819-4bdb-843c-9395977a3f4c 毕（结）业证书遗失办理、学历证明确认
        //abe1e78a-9ea4-4775-b30c-67d29d1616e7 教师资格证书补发换发
        //24b08ca0-d946-4907-88c5-5dd8c18787e1 乡村医生执业注册（注销）
        //776729f0-f34f-409a-9c95-0e7bf0e3f537 乡村医生执业注册（变更注册）
        //df77e210-c8cb-43c3-80d0-f00fa0eb160a 母婴保健专项技术服务许可（人员注销）
        //af26196a-2681-4d16-aa18-a008579fc8f1 狩猎证年检
    if (itemcode == 'f5d295ad-754c-4c31-9fdc-320e465cc7b1') {
        getLiceseslist(itemcode);
    } else if (itemcode == '67a91a7e-e752-43a0-96af-eea9ff9140ff') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'f46e40aa-cc4b-440a-acae-85f2b076e2de') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'a13e4a07-e8af-4ce3-81bd-89da2d4d28c9') {
        getLiceseslist(itemcode);
    } else if (itemcode == '76e07e99-a9b0-4994-8462-aee2927ac2b3') {
        getLiceseslist(itemcode);
    } else if (itemcode == '7f1ee4c5-8445-4819-90b6-eaa485adddae') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'fd3df80a-f819-4bdb-843c-9395977a3f4c') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'abe1e78a-9ea4-4775-b30c-67d29d1616e7') {
        getLiceseslist(itemcode);
    } else if (itemcode == '24b08ca0-d946-4907-88c5-5dd8c18787e1') {
        getLiceseslist(itemcode);
    } else if (itemcode == '776729f0-f34f-409a-9c95-0e7bf0e3f537') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'df77e210-c8cb-43c3-80d0-f00fa0eb160a') {
        getLiceseslist(itemcode);
    } else if (itemcode == 'af26196a-2681-4d16-aa18-a008579fc8f1') {
        getLiceseslist(itemcode);
    } else if (itemcode == '5d027ac1-6d52-439d-91b6-c1797501ef35') {
        getLiceseslist(itemcode); //异地死亡人员
    }
}
//证照请求
function getLiceseslist(icode) {
    var requesturl;
    requesturl = "http://syydb.syzjjgw.com:8180/jimsy/feixian/permissionCode.do";
    myRequest({
        url: requesturl,
        data: {
            permissionCode: icode
        },
        header: '',
        success: function(data) { //请求成功
            if (data.returnCode == 0) {
                var result = data.result;
                example3.licenselist = [];
                for (var i = 0; i < result.length; i++) {
                    example3.licenselist.push({
                        name: result[i].certName,
                        code: result[i].certCode
                    });
                };
                document.getElementById('loading').style.display = 'none';
            } else {
                document.getElementById('loading').style.display = 'none';
                document.getElementById("badmessage").style.display = "block";
            }

        },
        fail: function(data) { //请求失败
            document.getElementById('loading').style.display = 'none';
            document.getElementById("badmessage").style.display = "block";
        }
    });
}
//var example2 = new Vue({
//	el: '#parent2',
//	data: {
//		items2: []
//	}
//})
//获取证照
function getlicense(certCode) {
    document.getElementById("licenselist").style.display = "none";
    document.getElementById('loading').style.display = 'block';
    var dUserType = href.split("dUserType=")[1].split("&")[0];
    var cerNo;
    var cerName;
    //	var imgArray = [];
    if (dUserType == "puser") {
        cerNo = userInfo.idnum;
        cerName = userInfo.username;
    } else {
        cerNo = userInfo.CompanyRegNumber;
        cerName = userInfo.CompanyName;
    }
    var data = {
        cerNo: cerNo, //身份证号
        cerName: cerName, //姓名
        certCode: certCode, //证件类型编码
        permissionCode: itemcode, //权利事项唯一码
        areaCode: "" //区县编码  非必填
    }
    myRequest({
        url: "http://syydb.syzjjgw.com:8180/jimsy/feixian/file.do",
        data: data,
        header: '',
        success: function(data) {
            var busiCode = data.busiCode;
            myRequest({
                url: "http://syydb.syzjjgw.com:8180/jimsy/feixian/returnPicture.do",
                async: true,
                data: {
                    cerNo: cerNo,
                    certCode: certCode
                },
                header: '',
                async: false,
                success: function(data) {
                    //						example2.items2 = [];
                    if (data.returnCode == 0) {
                        var imgshow = "data:image/jpeg;base64," + data.result;
                        $("#showimg").attr("src", imgshow);
                        //							imgArray.push(data.result);
                        //							example2.items2.push({
                        //								height: heights * 2,
                        //								index: 0,
                        //								showurl: "data:image/jpeg;base64," + data.result
                        //							});
                        document.getElementById('loading').style.display = 'none';
                        document.getElementById('pullrefresh').style.display = 'block';
                    } else {
                        document.getElementById('loading').style.display = 'none';
                        document.getElementById("badmessage").style.display = "block";
                    }
                    myRequest({
                        url: 'http://syydb.syzjjgw.com:8180/jimsy/feixian/returnFile.do',
                        data: {
                            cerNo: cerNo,
                            certCode: certCode
                        },
                        header: '',
                        async: false,
                        success: function(data) { //请求成功
                            //								example2.items2 = [];
                            if (data.returnCode == 0) {
                                var img = data.result;
                                $("#img").attr("src", img);
                                //									imgArray.push(data.result);
                                //									var imgArrayStr = JSON.stringify(imgArray); 
                                //									example2.items2.push({
                                //										index: 0,
                                //										imageurl: data.result
                                //									});
                                document.getElementById('loading').style.display = 'none';
                                //									document.getElementById('pullrefresh').style.display = 'block';
                            }
                        },
                        fail: function(data) { //请求失败
                            //								document.getElementById('loading').style.display = 'none';
                            //								document.getElementById("badmessage").style.display = "block";
                        }
                    });
                },
                fail: function(data) {

                }
            });
        },
        fail: function(data) {

        }
    });
}

function tiaozhuanbiaodan(arg0, arg1, arg2) {
    console.log(arg2)
    console.log(window.localStorage.ydswryyhyjhhspb1);
    if (arg2 == '异地死亡人员运回原籍火化审批表' && window.localStorage.ydswryyhyjhhspb1 == undefined) {
        window.location.href = 'ydswryyhyjhhspb.html';
    }
    //申请地名证明登记表
    if (arg2 == '申请地名证明登记表') {
        window.location.href = 'sqdmzmdjb.html';
    }
    if (arg2 == '失业人员丧葬补助金和抚恤金申领表') {
        window.location.href = 'syryszbzjhfxjslb.html';
    }
    if (arg2 == '《失业人员生育补助金申领表》原件一份') {
        window.location.href = 'syrysybzjslb.html';
    }
    //参保人员基本养老保险视同缴费年限核定表
    if (arg2 == '参保人员基本养老保险视同缴费年限核定表') {
        window.location.href = 'cbryjbylbxstjfnxhdb.html';
    }
    if (arg2 == '个人创业担保贷款贴息申请表') {
        window.location.href = 'grcydbdktxsqb.html';
    }
    if (arg2 == '《职业培训（技能鉴定）补贴申请表》原件一份') {
        window.location.href = 'zypxbtsqbgr.html';
    }
    //蚕一代杂交种出口（设立）审批表
    if (arg2 == '蚕一代杂交种出口（设立）审批表') {
        window.location.href = 'cydzjzckslspb.html';
    }
    //蚕一代杂交种出口（变更）审批表
    if (arg2 == '蚕一代杂交种出口（变更）审批表') {
        window.location.href = 'cydzjzckbgspb.html';
    }
    if (arg2 == '蚕种生产许可（设立）申请表') {
        window.location.href = 'czscxkslsqb.html';
    }
    if (arg2 == '蚕种经营许可（设立）申请表') {
        window.location.href = 'czjyxkslsqb.html';
    }
    if (arg2 == '蚕种经营许可（变更）申请表') {
        window.location.href = 'czjyxkbgsqb.html';
    }
    if (arg2 == '蚕种生产许可（延续）申请表') {
        window.location.href = 'czscxkyxsqb.html';
    }
    if (arg2 == '蚕种生产许可（变更）申请表') {
        window.location.href = 'czscxkbgsqb.html';
    }
    if (arg2 == '省级文物保护单位原址保护措施许可申请表') {
        window.location.href = 'sjwwkhdwydzbhcsxksqb.html';
    }
    if (arg2 == '市县级文物保护单位原址保护措施许可申请表') {
        window.location.href = 'sxjwwkhdwydzbhcsxksqb.html';
    }
    if (arg2 == '市县级文物保护单位（点）迁移方案许可申请表') {
        window.location.href = 'sxjwwbhdwqyfaxksqb.html';
    }
    if (arg2 == '已批准的市县级文物保护单位修缮方案重要内容变更审批表') {
        window.location.href = 'ypzdsxjwwbhdwxsfazynrbgspsqb.html';
    }
    if (arg2 == '市县级文物保护单位修缮许可申请表') {
        window.location.href = 'sxjwwbhdwxsxksqb.html';
    }
    if (arg2 == '未核定为文物保护单位的不可移动文物修缮许可申请表') {
        window.location.href = 'whdwwwbhdwdbkydwwxsxksqb.html';
    }
    if (arg2 == '已批准的未核定为文物保护单位的不可移动文物修缮方案重要内容变更审批表') {
        window.location.href = 'ypzdwhdwwwbhdwdbkydwwxsfazynrbgspsqb.html';
    }
    if (arg2 == '非国有省级文物保护单位改变用途备案申请表' || arg2 == '非国有省级文物保护单位抵押备案申请表' || arg2 == '非国有省级文物保护单位转让备案申请表') {
        window.location.href = 'fgysjwwbhdwzrdyhzgbytdbasqb.html';
    }
    if (arg2 == '非国有市县级文物保护单位改变用途备案申请表' || arg2 == '非国有市县级文物保护单位转让备案申请表' || arg2 == '非国有市县级文物保护单位抵押备案申请表') {
        window.location.href = 'basqb.html';
    }
    if (arg2 == '市县级文物保护单位日常维护保养工程备案申请表') {
        window.location.href = 'sxjwwbhdwrcwhbygcbasqb.html';
    }
    if (arg2 == '全国工业产品生产许可证申请单') {
        window.location.href = 'qggycpscxkzsqb.html';
    }
    if (arg2 == '撤回行政许可申请书') {
        window.location.href = 'chxzxksqs.html';
    }
    if (arg2 == '内河个体普通货船运输业务经营许可申请书') {
        window.location.href = 'nhgtpthcysywjyxksqs.html';
    }
    //消防
    if (arg2 == '1.消防安全检查申报表（公共娱乐场所是指，影剧院、礼堂等演出、放映场所，舞厅、卡拉OK厅等歌舞娱乐场所，具有娱乐功能的夜总会、音乐茶座和餐饮场所，游艺、游乐场所，保龄球馆、旱冰场、桑拿浴室等营业性健身休闲场所）。' || arg2 == '消防安全检查申报表' || arg2 == '1.消防安全检查申报表') {
        window.location.href = 'ggjjcsa.html';
    }

    //民族成份变更申请审批表
    if (arg2 == '民族成份变更申请审批表') {
        window.location.href = 'mzcfbgsqspb.html';
    }
    if (arg2 == '行政许可申请书') {
        window.location.href = 'daxzxksqs.html';
    }
    //内河个体普通货船运输业务经营许可申请书
    if (arg2 == '1..《内河个体普通货船运输业务经营许可申请书》原件') {
        window.location.href = 'nhgtpthcysywjyxksqs.html';
    }
    if (arg2 == '《雷电灾害调查鉴定申请表》原件一份') {
        window.location.href = 'ldzhjdsqs.html';
    }
}
// file:///Users/lvcf/Desktop/online/apps_shangyu/onlineorder-shangyu/view/onlinedeclare.html?dUserType=puser&dQlInnerCode=2B5C8B8F8E9AF20B54F2CE7B67ED729D&dQlBaseCode=公共服务-25001-000&dRegionCode=33060017&again=