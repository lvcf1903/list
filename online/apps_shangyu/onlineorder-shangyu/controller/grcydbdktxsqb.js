new Vue({
    el:'#app',
    data:{
        rylb:1,
        isFunction:1,
        issj:false,
        iskxdh:false,
        issfz:false
    },
    created:function(){
        let grcydbdktxsqb = window.localStorage.grcydbdktxsqb;
        if(grcydbdktxsqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("grcydbdktxsqb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_rylb" && key != "txt_djzclx" && key != "txt_dkzl" && key != "txt_tqbl" && key != "txt_jggzfs"){
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
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_xm').val() || !this.iskxdh || !this.issfz || !$('#txt_yhzh').val()
                || !$('#txt_khyh').val() || !$('#txt_cystmc').val() || !$('#txt_zyjyxm').val() || !$('#txt_clrq').val() || !$('#txt_zgrs').val() || !$('#txt_tyshxydm').val()
                || !$('#txt_dkje').val() || !$('#txt_dknly').val() || !$('#txt_dkyh').val() || !$('#txt_dkhtbh').val() || !$('#txt_dbfs').val() || !$('#txt_tqqzrqbegin').val()
                || !$('#txt_jznly').val() || !$('#txt_sqtqdk').val() || !$('#txt_tqnly').val() || !$('#txt_sqzje').val() || !$('#txt_tqqzrqend').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];


            pramadic["txt_title"] = ['form_grcydbdktxsqb'];


            pramadic['txt_xm'] = '[\"姓名",\"'+$('#txt_xm').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_sfzhm'] = '[\"身份证号码",\"'+$('#txt_sfzhm').val()+'\"]';
            pramadic['txt_yhzh'] = '[\"银行账号",\"'+$('#txt_yhzh').val()+'\"]';
            pramadic['txt_khyh'] = '[\"开户银行",\"'+$('#txt_khyh').val()+'\"]';
           
            let rylbObj = {};
            let rylbStr = '';
            if(this.rylb == 1 && $('#txt_szyx').val() && $('#txt_zy').val()){
                rylbObj['txt_szyx'] = ['所在院校',$('#txt_szyx').val()];
                rylbObj['txt_zy'] = ['专业',$('#txt_zy').val()];
            }else if(this.rylb == 2 && $('#txt_byxy').val() && $('#txt_xl').val() && $('#txt_byny').val()){
                rylbObj['txt_byxy'] = ['毕业学校',$('#txt_byxy').val()];
                rylbObj['txt_xl'] = ['学历',$('#txt_xl').val()];
                rylbObj['txt_byny'] = ['毕业年月',$('#txt_byny').val()];
            }else if(this.rylb == 3 || this.rylb == 4 || this.rylb == 6 || this.rylb == 7){

            }else if(this.rylb == 8 && $('#txt_qt').val()){
                rylbObj['txt_qt'] = ['其他',$('#txt_qt').val()];
            }else{
                this.ejectPro();
                return;
            }
            
            rylbObj['txt_rylb'] = ['人员类别',$('select[name=rylb] option').eq(this.rylb-1).text()];
            pramadic['txt_rylb'] = ['人员类别',rylbObj]


            pramadic['txt_djzclx'] = '[\"登记注册类型",\"'+$('#txt_djzclx option').eq($('#txt_djzclx').val()-1).text()+'\"]';
            pramadic['txt_cystmc'] = '[\"创业实体名称",\"'+$('#txt_cystmc').val()+'\"]';
            pramadic['txt_zyjyxm'] = '[\"主要经营项目",\"'+$('#txt_zyjyxm').val()+'\"]';
            pramadic['txt_clrq'] = '[\"成立日期",\"'+$('#txt_clrq').val()+'\"]';
            pramadic['txt_zgrs'] = '[\"职工人数",\"'+$('#txt_zgrs').val()+'\"]';
            pramadic['txt_tyshxydm'] = '[\"统一社会信用代码",\"'+$('#txt_tyshxydm').val()+'\"]';
            pramadic['txt_dkzl'] = '[\"贷款种类",\"'+$('#txt_dkzl option').eq($('#txt_dkzl').val()-1).text()+'\"]';
            pramadic['txt_dkje'] = '[\"贷款金额（万元）",\"'+$('#txt_dkje').val()+'\"]';

            pramadic['txt_dknly'] = '[\"贷款年利率（%）",\"'+$('#txt_dknly').val()+'\"]';
            pramadic['txt_dkyh'] = '[\"贷款银行",\"'+$('#txt_dkyh').val()+'\"]';
            pramadic['txt_dkhtbh'] = '[\"贷款合同编号",\"'+$('#txt_dkhtbh').val()+'\"]';
            pramadic['txt_dbfs'] = '[\"担保方式",\"'+$('#txt_dbfs').val()+'\"]';
            pramadic['txt_tqbl'] = '[\"贴息比例",\"'+$('#txt_tqbl option').eq($('#txt_tqbl').val()-1).text()+'\"]';


            let tqqzrq = $('#txt_tqqzrqbegin').val()+'~'+$('#txt_tqqzrqend').val();

            pramadic['txt_tqqzrq'] = '[\"贴息起止日期",\"'+tqqzrq+'\"]';
            pramadic['txt_jznly'] = '[\"基准年利率（%）",\"'+$('#txt_jznly').val()+'\"]';
            pramadic['txt_sqtqdk'] = '[\"申请贴息贷款（万元）",\"'+$('#txt_sqtqdk').val()+'\"]';
            pramadic['txt_tqnly'] = '[\"贴息年利率（%）",\"'+$('#txt_tqnly').val()+'\"]';
            pramadic['txt_sqzje'] = '[\"申请贴息总额",\"'+$('#txt_sqzje').val()+'\"]';


            if(this.isFunction == 3){
                if(!this.issj){
                    mui.alert('手机号输入错误', '亲', function() {
                    }); 
                    return;
                }
                pramadic['txt_jggzfs'] = '[\"短信送达",\"'+$('#txt_jggzfs').val()+'\"]';
            }else if(this.isFunction == 4){
                if(!$('#txt_jggzfs2').val()){
                    mui.alert('地址输入错误', '亲', function() {
                    }); 
                    return;
                }
                pramadic['txt_jggzfs'] = '[\"邮寄送达",\"'+$('#txt_jggzfs2').val()+'\"]';
            }else{
                pramadic['txt_jggzfs'] = '[\"结果告知方式",\"'+$('#jggzfs option').eq($('#jggzfs').val()-1).text()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.grcydbdktxsqb = formXml;
            window.history.go(-1);
        },
        changerylb(){
            this.rylb = $('select[name=rylb]').val()
        },
        isFunctionChange(){
            this.isFunction = $('select[name=gaozhifangshi]').val()
        },
        byny(){
            let dtPicker = new mui.DtPicker({ type: 'month',
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
                let date = y + "-" + m ; 
                $("#txt_byny").val(date); 
            })
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
        tqqzrqbegin(){
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
                $("#txt_tqqzrqbegin").val(date); 
            })
        },
        tqqzrqend(){

            if(!$("#txt_tqqzrqbegin").val()){
                return
            }
            let begin = $("#txt_tqqzrqbegin").val().split('-');
            let year = begin[0];
            let month = begin[1];

            let dtPicker = new mui.DtPicker({ type: 'date',
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
                let y = selectItems.y.text;  //获取选择的年
                let m = selectItems.m.text;  //获取选择的月
                var d = selectItems.d.text;  //获取选择的日
                var date = y + "-" + m + "-" + d ; 
                $("#txt_tqqzrqend").val(date); 
            })
        },
    }
})