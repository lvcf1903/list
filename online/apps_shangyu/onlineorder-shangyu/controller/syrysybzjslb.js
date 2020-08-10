new Vue({
    el:'#app',
    data:{
        isFunction:1,
        issj:false,
        iskxdh:false
    },
    created:function(){
        let syrysybzjslb = window.localStorage.syrysybzjslb;
        if(syrysybzjslb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("syrysybzjslb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_xssybxdyqx"){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        sjyz(){
            let sj = $(event.target).val();
            if(!validatePhone(sj)){
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = false;
                    mui.alert('联系方式输入错误', '亲', function() {
                    });        
                }else{
                    this.issj = false;
                    mui.alert('手机号输入错误', '亲', function() {
                    });        
                }  
            }else{
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = true
                }else{
                    this.issj = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_xm').val() || !$('#txt_xb').val() || !this.iskxdh || !$('#txt_shbzhm').val() || !$('#txt_jycyzbh').val() 
                || !$('#txt_xssybxdyqxbegin').val() || !$('#txt_xssybxdyqxend').val() || !$('#txt_sydjfwkbh').val() || !$('#txt_djjg').val() || !$('#txt_znxm').val() || !$('#txt_xb2').val()
                || !$('#txt_csrq').val() || !$('#txt_cszbh').val() || !$('#txt_qzjg').val() || !$('#txt_yhzh').val() || !$('#txt_khyh').val() || !$('#txt_hm').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_syrysybzjslb'];

            pramadic['txt_xm'] = '[\"姓名",\"'+$('#txt_xm').val()+'\"]';
            pramadic['txt_xb'] = '[\"性别",\"'+$('#txt_xb').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_shbzhm'] = '[\"社会保障号码",\"'+$('#txt_shbzhm').val()+'\"]';
            pramadic['txt_jycyzbh'] = '[\"就业创业证编号",\"'+$('#txt_jycyzbh').val()+'\"]';
            let xssybxdyqx = $('#txt_xssybxdyqxbegin').val() + '~' + $('#txt_xssybxdyqxend').val();
            pramadic['txt_xssybxdyqx'] = '[\"享受失业保险待遇期限",\"'+xssybxdyqx+'\"]';
            pramadic['txt_sydjfwkbh'] = '[\"生育登记服务卡编号",\"'+$('#txt_sydjfwkbh').val()+'\"]';
            pramadic['txt_djjg'] = '[\"登记机关",\"'+$('#txt_djjg').val()+'\"]';
            pramadic['txt_znxm'] = '[\"子女姓名",\"'+$('#txt_znxm').val()+'\"]';
            pramadic['txt_xb2'] = '[\"性别",\"'+$('#txt_xb2').val()+'\"]';
            pramadic['txt_csrq'] = '[\"出生日期",\"'+$('#txt_csrq').val()+'\"]';
            pramadic['txt_cszbh'] = '[\"出生证编号",\"'+$('#txt_cszbh').val()+'\"]';
            pramadic['txt_qzjg'] = '[\"签证机构",\"'+$('#txt_qzjg').val()+'\"]';
            pramadic['txt_yhzh'] = '[\"银行账号",\"'+$('#txt_yhzh').val()+'\"]';
            pramadic['txt_khyh'] = '[\"开户银行",\"'+$('#txt_khyh').val()+'\"]';
            pramadic['txt_hm'] = '[\"户名",\"'+$('#txt_hm').val()+'\"]';
           
            if(this.isFunction == 1){
                if(!this.issj){
                    mui.alert('手机号输入错误', '亲', function() {
                    }); 
                    return;
                }
                pramadic['txt_jggzfs'] = '[\"短信通知",\"'+$('#txt_jggzfs').val()+'\"]';
            }else{
                if(!$('#txt_jggzfs2').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
                }
                pramadic['txt_jggzfs2'] = '[\"纸质邮寄",\"'+$('#txt_jggzfs2').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0]) 
            window.localStorage.syrysybzjslb = formXml;
            window.history.go(-1);
        },
        changeFunction(){
            this.isFunction = $('.selectStyle').val()
        },
        begin(){
            var dtPicker = new mui.DtPicker({ type: 'date',
                beginDate: new Date(1920),//设置开始日期 
                // endDate: new Date(2016, 01, 01),
            });
                /*参数：'datetime'-完整日期视图(年月日时分)
                        'date'--年视图(年月日)
                        'time' --时间视图(时分)
                        'month'--月视图(年月)
                        'hour'--时视图(年月日时)
                */      
            dtPicker.show(function (selectItems) {
                var y = selectItems.y.text;  //获取选择的年
                var m = selectItems.m.text;  //获取选择的月
                var d = selectItems.d.text;  //获取选择的日
                var date = y + "-" + m + "-" + d ; 
                $("#txt_xssybxdyqxbegin").val(date); 
            })
        },
        end(){
            if(!$("#txt_xssybxdyqxbegin").val()){
                return
            }
            let begin = $("#txt_xssybxdyqxbegin").val().split('-');
            let year = begin[0];
            let month = begin[1];
            let day = begin[2];
            var dtPicker = new mui.DtPicker({ type: 'date',
                beginDate: new Date(year,month),//设置开始日期 
                // endDate: new Date(2016, 01, 01),
            });
                /*参数：'datetime'-完整日期视图(年月日时分)
                        'date'--年视图(年月日)
                        'time' --时间视图(时分)
                        'month'--月视图(年月)
                        'hour'--时视图(年月日时)
                */      
            dtPicker.show(function (selectItems) {
                var y = selectItems.y.text;  //获取选择的年
                var m = selectItems.m.text;  //获取选择的月
                var d = selectItems.d.text;  //获取选择的日
                var date = y + "-" + m + "-" + d ; 
                $("#txt_xssybxdyqxend").val(date); 
            })
        },
        csrq(){
            var dtPicker = new mui.DtPicker({ type: 'date',
                beginDate: new Date(1920),//设置开始日期 
                // endDate: new Date(2016, 01, 01),
            });
                /*参数：'datetime'-完整日期视图(年月日时分)
                        'date'--年视图(年月日)
                        'time' --时间视图(时分)
                        'month'--月视图(年月)
                        'hour'--时视图(年月日时)
                */      
            dtPicker.show(function (selectItems) {
                var y = selectItems.y.text;  //获取选择的年
                var m = selectItems.m.text;  //获取选择的月
                var d = selectItems.d.text;  //获取选择的日
                var date = y + "-" + m + "-" + d ; 
                $("#txt_csrq").val(date); 
            })
        }
    }
})