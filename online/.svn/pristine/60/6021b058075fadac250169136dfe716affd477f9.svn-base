var sj = new Array
var zhengzhao = ""
var busiCode
    //先获取用户信息
function getuserinfo() {
    userName = userInfo.username;
    cardnum = userInfo.idnum;
    document.getElementById('username').innerText = "并确保     " + userName + "     本人操作";
    document.getElementById('headtop').style.display = 'none';
}



//同意人脸识别服务条款
function agreeprop() {
    var pic3 = document.getElementById('agreepic3');
    if (pic3.getAttribute('src') == '../images/rd_check.png') {
        pic3.setAttribute('src', '../images/rd_checked.png');
        sessionStorage.setItem('sxhbcxrlsb_tkty', 1)
    } else {
        pic3.setAttribute('src', '../images/rd_check.png');
        sessionStorage.setItem('sxhbcxrlsb_tkty', 0)
    }
}

//点击下一步进行人脸识别
function torenlianshibie() {
    // console.log(cardnum);
    // if (sessionStorage.getItem('sxhbcxrlsb_tkty') == 1) {
    //     if (navigator.userAgent.match(/MicroMessenger/i) == 'MicroMessenger') { //微信
    //     } else {
    //         dd.biz.user.realAuthentication({ //客户端
    //             appId: '0000PMTicd1', //应用ID
    //             certNo: cardnum, //身份证号，默认为当前登录账号的身份证号码
    //             certName: userName, //姓，默认为当前登录账号的名字
    //             extraData: '', //业务数据
    //             onSuccess: function(data) {
    //                 alert(JSON.stringify(data))
    //                 if (data.pass == true) {
    document.getElementById('loading').style.display = 'none';
    // document.getElementById('headtop').style.display = 'none';
    document.getElementById('pullrefresh').style.display = 'none';
    document.getElementById('contentArea').style.display = 'none';
    document.getElementById('sureBtn').style.display = 'none';
    document.getElementById("licenselist").style.display = "none";
    // document.getElementById('btn-cancel').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('listdiv').style.display = 'none';
    document.getElementById('rlsb').style.display = 'none';
    document.getElementById('licenselistull').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    new Vue({
        el: '#myZz',
        data: {
            cerNo: cardnum,
            cerName: userName,
            permissionCode: sessionStorage.getItem('sxcode'), //'95b83828-83ae-4f71-9c2d-786c0460fa11'
            // permissionCode: '95b83828-83ae-4f71-9c2d-786c0460fa11',
            // itemcode: '5d027ac1-6d52-439d-91b6-c1797501ef35 ',
            itemcode: '100287500000257713713330601',
            list: [],
            code: '',
            show: false
        },
        created() {
            this.randomNum();

        },
        methods: {
            randomNum() {
                let outTradeNo = "";
                var arr = ['a', 'b', '0', 'c', 'd', '1', 'e', 'f', '2', 'g', 'h', '3', 'i', 'j', '4', 'k', 'l', '5', 'm', 'n', '6', 'o', 'p', '7', 'q', 'r', '8', 's', 't', '9', 'u', 'v', 'w', 'x', 'y', 'z'];
                for (var i = 0; i < 19; i++) {
                    outTradeNo += arr[Math.floor(Math.random() * 36)];
                }
                busiCode = new Date().getTime() + outTradeNo
                console.log(busiCode)
                this.getList()

            },
            getList() {
                console.log(this.permissionCode)
                $.ajax({
                    type: 'get',
                    url: 'http://syydb.syzjjgw.com:8180/jimsy/feixian/permissionCode.do',
                    data: {
                        // busiCode: busiCode,
                        permissionCode: this.permissionCode,
                        situationCode: this.permissionCode
                    },

                    dataType: 'json',
                    success: (res) => {

                        console.log(res, 11111)

                        if (res && res.result && res.result.length > 0) {
                            this.list = res.result
                            this.code = res.result[0].certCode //默认选中第一个
                        } else {
                            mui.alert('未获取到相关证照信息,请选择拍照上传!', function() {
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
                            })

                        }
                    }
                })

            },
            a(code) {
                this.code = code

            },
            wc() {
                this.show = true
                $.ajax({
                    type: 'get',
                    url: 'http://syydb.syzjjgw.com:8180/jimsy/feixian/file.do',
                    data: {
                        cerNo: this.cerNo,
                        cerName: this.cerName,
                        permissionCode: this.permissionCode,
                        certCode: this.code,
                        areaCode: this.areaCode,
                        situationCode: this.itemcode
                    },
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.show = false
                        if (res.returnCode == 1) {
                            mui.alert(res.returnMessage, function() {
                                document.getElementById('headtop').style.display = 'none';
                                document.getElementById('pullrefresh').style.display = 'none';
                                document.getElementById('contentArea').style.display = 'none';
                                document.getElementById('sureBtn').style.display = 'none';
                                document.getElementById("licenselist").style.display = "none";
                                document.getElementById('btn-cancel').style.display = 'none';
                                document.getElementById('listdiv').style.display = 'none';
                                document.getElementById('rlsb').style.display = 'none';
                                // document.getElementById('img1').style.display = 'none';
                                document.getElementById('licenselistull').style.display = 'block';
                                document.getElementById('footer').style.display = 'block';
                                return
                            })

                        } else if (res.returnCode == 0) {

                            this.getJpg()
                            this.getPdf()
                        }
                    }
                })
            },
            getJpg() {

                this.show = true
                $.ajax({
                    type: 'get',
                    url: 'http://syydb.syzjjgw.com:8180/jimsy/feixian/returnPicture.do',
                    data: {
                        cerNo: this.cerNo,
                        certCode: this.code
                    },
                    dataType: 'json',
                    success: (res) => {
                        console.log(res)
                        this.show = false
                        if (res.returnCode == 0) {
                            console.log(localStorage.getItem('item'), res.result)
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
                            document.getElementById('img' + localStorage.getItem('item')).src = 'data:image/jpeg;base64,' + res.result;

                            document.getElementById('delateimg' + localStorage.getItem('item')).style.display = 'block';
                            document.getElementById('delateimg' + localStorage.getItem('item')).src = '../images/delate.jpg';
                            // console.log($('#img1'));
                        } else {
                            mui.alert("未获取到相关证照,请选择拍照上传!");
                            return
                        }
                    }
                })
            },
            getPdf() {
                this.show = true
                $.ajax({
                    type: 'get',
                    url: 'http://syydb.syzjjgw.com:8180/jimsy/feixian/returnFile.do',
                    data: {
                        cerNo: this.cerNo,
                        certCode: this.code
                    },
                    dataType: 'json',
                    success: (res) => {
                        this.show = false
                        console.log(res)
                        zhengzhao = this.code
                        sj.push(zhengzhao)
                        sessionStorage.setItem('sj', JSON.stringify(sj))
                        console.log(sj)
                    }
                })
            }
        }
    })
}
//                 },
//                 onFail: function(fail) {
//                     mui.alert(err.errorDetail);
//                 }
//             })

//         }
//     } else {
//         mui.alert("请先查看人脸识别协议并同意!");
//     }
// }