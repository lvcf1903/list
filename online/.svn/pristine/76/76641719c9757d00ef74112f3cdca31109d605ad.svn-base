new Vue({
    el:'#app',
    data:{
        isFunction:1,
        issj:false,
        iskxdh:false
    },
    created:function(){
        let syryszbzjhfxjslb = window.localStorage.syryszbzjhfxjslb;
        if(syryszbzjhfxjslb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("syryszbzjhfxjslb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title"){
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
            if(!$('.chengruo input').prop('checked') || !$('#txt_syryxm').val() || !$('#txt_jycyzbh').val() || !$('#txt_swzmcjdw').val() || !$('#txt_swsj').val()
                || !$('#txt_shbzhm').val() || !$('#txt_yhzh').val() || !$('#txt_khyh').val() || !$('#txt_hm').val() || !$('#txt_slrxm').val() || !$('#txt_ysyrygx').val()
                || !this.iskxdh || !$('#txt_shbzhm2').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_syryszbzjhfxjslb'];
            pramadic['txt_syryxm'] = '[\"失业人员姓名",\"'+$('#txt_syryxm').val()+'\"]';
            pramadic['txt_jycyzbh'] = '[\"就业创业证编号",\"'+$('#txt_jycyzbh').val()+'\"]';
            pramadic['txt_swzmcjdw'] = '[\"死亡证明出具单位",\"'+$('#txt_swzmcjdw').val()+'\"]';
            pramadic['txt_swsj'] = '[\"死亡时间",\"'+$('#txt_swsj').val()+'\"]';
            pramadic['txt_shbzhm'] = '[\"社会保障号码",\"'+$('#txt_shbzhm').val()+'\"]';
            pramadic['txt_yhzh'] = '[\"银行账号",\"'+$('#txt_yhzh').val()+'\"]';
            pramadic['txt_khyh'] = '[\"开户银行",\"'+$('#txt_khyh').val()+'\"]';
            pramadic['txt_hm'] = '[\"户名",\"'+$('#txt_hm').val()+'\"]';
            pramadic['txt_slrxm'] = '[\"申领人姓名",\"'+$('#txt_slrxm').val()+'\"]';
            pramadic['txt_ysyrygx'] = '[\"与失业人员关系",\"'+$('#txt_ysyrygx').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_shbzhm2'] = '[\"社会保障号码",\"'+$('#txt_shbzhm2').val()+'\"]';
           
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
                pramadic['txt_jggzfs'] = '[\"纸质邮寄",\"'+$('#txt_jggzfs').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.syryszbzjhfxjslb = formXml;
            window.history.go(-1);
        },
        changeFunction(){
            this.isFunction = $('.selectStyle').val()
        },
        deadTime(){
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
                $("#txt_swsj").val(date); 
            })
        }
    }
})