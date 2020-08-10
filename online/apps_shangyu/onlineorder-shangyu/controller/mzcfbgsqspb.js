new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        isfzrdh:false,
    },
    created:function(){
        let mzcfbgsqspb = window.localStorage.mzcfbgsqspb;
        if(mzcfbgsqspb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("mzcfbgsqspb")).wordform[0];
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
                if($(event.target).prop('id') == 'txt_fqlxdh'){
                    this.iskxdh = false;
                    mui.alert('父亲联系电话输入错误', '亲', function() {
                    });        
                }else{
                    this.isfzrdh = false;
                    mui.alert('母亲联系电话输入错误', '亲', function() {
                    });        
                }  
            }else{
                if($(event.target).prop('id') == 'txt_fqlxdh'){
                    this.iskxdh = true
                }else{
                    this.isfzrdh = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_bgrxm').val() || !$('#txt_bgrxb').val() || !$('#txt_bgrcsnyr').val() || !$('#txt_ymzcf').val()
                || !$('#txt_sqbgmzcf').val() || !$('#txt_jtzz').val() || !$('#txt_hjszpcs').val() || !$('#txt_sqlyhyq').val() || !$('#txt_fqxm').val()
                || !$('#txt_fqmzcf').val() || !$('#txt_fqgzdw').val() || !this.iskxdh || !$('#txt_mqxm').val() || !$('#txt_mqmzcf').val()
                || !$('#txt_mqgzdw').val() || !this.isfzrdh ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_mzcfbgsqspb'];
            pramadic['txt_bgrxm'] = '[\"姓名",\"'+$('#txt_bgrxm').val()+'\"]';
            pramadic['txt_bgrxb'] = '[\"性别",\"'+$('#txt_bgrxb').val()+'\"]';
            pramadic['txt_bgrcsnyr'] = '[\"出生年月日",\"'+$('#txt_bgrcsnyr').val()+'\"]';
            pramadic['txt_ymzcf'] = '[\"原民族成份",\"'+$('#txt_ymzcf').val()+'\"]';
            pramadic['txt_sqbgmzcf'] = '[\"申请变更民族成份",\"'+$('#txt_sqbgmzcf').val()+'\"]';
            pramadic['txt_jtzz'] = '[\"家庭住址",\"'+$('#txt_jtzz').val()+'\"]';
            pramadic['txt_hjszpcs'] = '[\"户籍所在地派出所",\"'+$('#txt_hjszpcs').val()+'\"]';
            pramadic['txt_sqlyhyq'] = '[\"申请理由和要求",\"'+$('#txt_sqlyhyq').val()+'\"]';
            pramadic['txt_fqxm'] = '[\"父亲姓名",\"'+$('#txt_fqxm').val()+'\"]';
            pramadic['txt_fqmzcf'] = '[\"父亲民族成份",\"'+$('#txt_fqmzcf').val()+'\"]';
            pramadic['txt_fqgzdw'] = '[\"父亲工作单位",\"'+$('#txt_fqgzdw').val()+'\"]';
            pramadic['txt_fqlxdh'] = '[\"父亲联系电话",\"'+$('#txt_fqlxdh').val()+'\"]';
            pramadic['txt_mqxm'] = '[\"母亲姓名",\"'+$('#txt_mqxm').val()+'\"]';
            pramadic['txt_mqmzcf'] = '[\"母亲民族成份",\"'+$('#txt_mqmzcf').val()+'\"]';
            pramadic['txt_mqgzdw'] = '[\"母亲工作单位",\"'+$('#txt_mqgzdw').val()+'\"]';
            pramadic['txt_mqlxdh'] = '[\"母亲联系电话",\"'+$('#txt_mqlxdh').val()+'\"]';
          
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.mzcfbgsqspb = formXml;
            window.history.go(-1);
        },
        bgrcsnyr(){
            let dtPicker = new mui.DtPicker({ type: 'date',
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
                let y = selectItems.y.text;  //获取选择的年
                let m = selectItems.m.text;  //获取选择的月
                var d = selectItems.d.text;  //获取选择的日
                var date = y + "-" + m + "-" + d ; 
                $("#txt_bgrcsnyr").val(date); 
            })
        },
    }
})