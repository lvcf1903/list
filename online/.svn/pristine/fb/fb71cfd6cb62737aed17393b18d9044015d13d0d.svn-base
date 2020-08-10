new Vue({
    el:'#app',
    data:{
    },
    created:function(){
        let cydzjzckbgspb = window.localStorage.cydzjzckbgspb;
        if(cydzjzckbgspb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("cydzjzckbgspb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title"){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_sqckcpzmc').val() || !$('#txt_sqr').val() || !$('#txt_ckgjhdq').val() || !$('#txt_cksj').val()
                || !$('#txt_zl').val() || !$('#txt_sl').val() || !$('#txt_xydj').val() || !$('#txt_sqlyjygqksm').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_cydzjzckbgspb'];

            pramadic['txt_sqckcpzmc'] = '[\"申请出口蚕品种名称",\"'+$('#txt_sqckcpzmc').val()+'\"]';
            pramadic['txt_sqr'] = '[\"申请人",\"'+$('#txt_sqr').val()+'\"]';
            pramadic['txt_ckgjhdq'] = '[\"出口国家或地区",\"'+$('#txt_ckgjhdq').val()+'\"]';
            pramadic['txt_cksj'] = '[\"出口时间",\"'+$('#txt_cksj').val()+'\"]';
            pramadic['txt_zl'] = '[\"质量（标准级别）",\"'+$('#txt_zl').val()+'\"]';
            pramadic['txt_sl'] = '[\"数量",\"'+$('#txt_sl').val()+'\"]';
            pramadic['txt_xydj'] = '[\"协议单价",\"'+$('#txt_xydj').val()+'\"]';
            pramadic['txt_sqlyjygqksm'] = '[\"申请理由及有关情况说明",\"'+$('#txt_sqlyjygqksm').val()+'\"]';
            
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.cydzjzckbgspb = formXml;
            window.history.go(-1);
        },
        cksj(){
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
                $("#txt_cksj").val(date); 
            })
        },
    }
})