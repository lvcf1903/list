new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        issfz1:false,
        issfz2:false,
    },
    created:function(){
        let ldzhjdsqs = window.localStorage.ldzhjdsqs;
        if(ldzhjdsqs != undefined){
            let bdarray = JSON.parse(localStorage.getItem("ldzhjdsqs")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_tglzzmzlqk" ){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        sjyz(){
            let sj = $(event.target).val();
            if(!validatePhone(sj)){
                this.iskxdh = false;
                mui.alert('联系方式输入错误', '亲', function() {
                });   
            }else{
                this.iskxdh = true
            }
        },
        sfzyz(){
            let sfz = $(event.target).val();
            if(!isCardNo(sfz)){
                let id = $(event.target).prop('id');
                if(id == 'txt_sfzhfrdmzhm'){
                    this.issfz1 = false;
                }else{
                    this.issfz2 = false;
                }
                mui.alert('身份证输入错误', '亲', function() {
				});        
            }else{
                let id = $(event.target).prop('id');
                if(id == 'txt_sfzhfrdmzhm'){
                    this.issfz1 = true;
                }else{
                    this.issfz2 = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_sqrxmhsqdwmc').val() || !this.issfz1 || !$('#txt_dwfrxm').val() || !this.issfz2
                || !$('#txt_jddlzxcdz').val() || !$('#txt_sqrq').val() || !$('#txt_lxdz').val() || !$('#txt_lxr').val() || !this.iskxdh || !$('#txt_zjjjsszm').val()
                || !$('#txt_ldzhfsgchsgzkms').val() || !$('#txt_zcdzyjjsshryswqk').val() || !$('#txt_sqjddyy').val() || !$('#txt_ryswzm').val() || !$('#txt_qtcl').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_ldzhjdsqs'];

            pramadic['txt_sqrxmhsqdwmc'] = '[\"申请人姓名或申请单位名称",\"'+$('#txt_sqrxmhsqdwmc').val()+'\"]';
            pramadic['txt_sfzhfrdmzhm'] = '[\"身份证或法人代码证号码",\"'+$('#txt_sfzhfrdmzhm').val()+'\"]';
            pramadic['txt_dwfrxm'] = '[\"单位法人姓名",\"'+$('#txt_dwfrxm').val()+'\"]';
            pramadic['txt_frsfzhm'] = '[\"法人身份证号码",\"'+$('#txt_frsfzhm').val()+'\"]';
            pramadic['txt_jddlzxcdz'] = '[\"鉴定的雷灾现场地址",\"'+$('#txt_jddlzxcdz').val()+'\"]';
            pramadic['txt_sqrq'] = '[\"申请日期",\"'+$('#txt_sqrq').val()+'\"]';
            pramadic['txt_lxdz'] = '[\"联系地址",\"'+$('#txt_lxdz').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxfs'] = '[\"联系方式",\"'+$('#txt_lxfs').val()+'\"]';
            pramadic['txt_ldzhfsgchsgzkms'] = '[\"雷电灾害发生过程和事故状况描述",\"'+$('#txt_ldzhfsgchsgzkms').val()+'\"]';
            pramadic['txt_zcdzyjjsshryswqk'] = '[\"造成的主要经济损失和人员伤亡情况",\"'+$('#txt_zcdzyjjsshryswqk').val()+'\"]';
            
            let tglzzmzlqk = {};
            tglzzmzlqk['直接经济损失证明'] = $('#txt_zjjjsszm').val();
            tglzzmzlqk['人员伤亡证明'] = $('#txt_ryswzm').val();
            tglzzmzlqk['其它材料'] = $('#txt_qtcl').val();
            pramadic['txt_tglzzmzlqk'] = ['提供雷灾证明资料情况',tglzzmzlqk];

            pramadic['txt_sqjddyy'] = '[\"申请鉴定的原因",\"'+$('#txt_sqjddyy').val()+'\"]';
            if($('#txt_bz').val()){
                pramadic['txt_bz'] = '[\"备注",\"'+$('#txt_bz').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.ldzhjdsqs = formXml;
            window.history.go(-1);
        },
        sqrq(){
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
                $("#txt_sqrq").val(date); 
            })
        },
    }
})