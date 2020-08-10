new Vue({
    el:'#app',
    data:{
        issfz:false,
        iskxdh:false,
        isfzrdh:false,
    },
    created:function(){
        let qggycpscxkzsqb = window.localStorage.qggycpscxkzsqb;
        if(qggycpscxkzsqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("qggycpscxkzsqb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_sqlb"){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        sfzyz(){
            let sfz = $(event.target).val();
            if(!isCardNo(sfz)){
                this.issfz = false;
                mui.alert('身份证输入错误', '亲', function() {
				});        
            }else{
                this.issfz = true;
            }
        },
        sjyz(){
            let sj = $(event.target).val();
            if(!validatePhone(sj)){
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = false;
                    mui.alert('联系人联系方式输入错误', '亲', function() {
                    });        
                }else{
                    this.isfzrdh = false;
                    mui.alert('设计负责人联系电话', '亲', function() {
                    });        
                }  
            }else{
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = true
                }else{
                    this.isfzrdh = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_qymc').val() || !$('#txt_tyshxydm').val() || !$('#txt_zs').val() || !$('#txt_scdz').val()
                || !$('#txt_fddbr').val() || !this.issfz || !this.iskxdh || !$('#txt_lxr').val() || !this.isfzrdh
                || !$('#txt_clrq').val() || !$('#txt_jyqx').val() || !$('#txt_zczj').val() || !$('#txt_nczz').val() || !$('#txt_yscxkzbh').val() 
                || !$('#txt_yscxkzyxq').val() || !$('#txt_sqcpfw').val() || !$('#txt_sqbgsx').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_qggycpscxkzsqb'];

            pramadic['txt_qymc'] = '[\"企业名称",\"'+$('#txt_qymc').val()+'\"]';
            pramadic['txt_tyshxydm'] = '[\"统一社会信用代码",\"'+$('#txt_tyshxydm').val()+'\"]';
            pramadic['txt_zs'] = '[\"住所",\"'+$('#txt_zs').val()+'\"]';
            pramadic['txt_scdz'] = '[\"生产地址",\"'+$('#txt_scdz').val()+'\"]';
            pramadic['txt_fddbr'] = '[\"法定代表人",\"'+$('#txt_fddbr').val()+'\"]';
            pramadic['txt_sfzhm'] = '[\"身份证号码",\"'+$('#txt_sfzhm').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_laxlxdh'] = '[\"联系人联系电话",\"'+$('#txt_laxlxdh').val()+'\"]';
            pramadic['txt_clrq'] = '[\"成立日期",\"'+$('#txt_clrq').val()+'\"]';
            pramadic['txt_jyqx'] = '[\"经营期限",\"'+$('#txt_jyqx').val()+'\"]';
            pramadic['txt_zczj'] = '[\"注册资金（万元）",\"'+$('#txt_zczj').val()+'\"]';
            pramadic['txt_nczz'] = '[\"年总产值",\"'+$('#txt_nczz').val()+'\"]';
            pramadic['txt_yscxkzbh'] = '[\"原生产许可证编号",\"'+$('#txt_yscxkzbh').val()+'\"]';
            pramadic['txt_yscxkzyxq'] = '[\"原生产许可证有效期",\"'+$('#txt_yscxkzyxq').val()+'\"]';
            pramadic['txt_sqlb'] = '[\"申请类别",\"'+$('#txt_sqlb option').eq($('#txt_sqlb').val()-1).text()+'\"]';
            pramadic['txt_sqcpfw'] = '[\"申请产品范围",\"'+$('#txt_sqcpfw').val()+'\"]';
            pramadic['txt_sqbgsx'] = '[\"申请变更事项",\"'+$('#txt_sqbgsx').val()+'\"]';
           
            
            if($('#txt_qtssmsx').val()){
                pramadic['txt_qtssmsx'] = '[\"其他情况说明",\"'+$('#txt_qtssmsx').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.qggycpscxkzsqb = formXml;
            window.history.go(-1);
        },
        clrq(){
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
                $("#txt_clrq").val(date); 
            })
        },
    }
})