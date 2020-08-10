new Vue({
    el:'#app',
    data:{
        gzjlNum:1,
        noshuju:[''],
        iskxdh:false
    },
    created:function(){
        let daxzxksqs = window.localStorage.daxzxksqs;
        if(daxzxksqs != undefined){
            let bdarray = JSON.parse(localStorage.getItem("daxzxksqs")).wordform[0];
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
                this.iskxdh = false;
                mui.alert('联系电话输入错误', '亲', function() {
                });   
            }else{
                this.iskxdh = true
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_grsqrxm').val() || !$('#txt_xb').val() || !$('#txt_csny').val() || !$('#txt_dwsqrmc').val()
                || !$('#txt_fddbr').val() || !$('#txt_lxr').val() || !$('#txt_zz').val() || !$('#txt_yzbm').val() || !this.iskxdh
                || !$('#txt_sdfs').val() || !$('#txt_sqsx').val() || !$('#txt_dahdafzjmc').val() || !$('#txt_nr').val() || !$('#txt_gg').val() 
                || !$('#txt_sl').val() || !$('#txt_cjfshsy').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let gzjl = []; 
            for(let i = 0; i < this.gzjlNum; i++){
                let gzjlxx = {};
                let qzrq = $('#txt_qzrqbegin'+i).val()+'~'+$('#txt_qzrqend'+i).val()
                gzjlxx['txt_qzrq'+i] = qzrq
                gzjlxx['txt_xh'+i] = $('#txt_xh'+i).val();
                gzjlxx['txt_dh'+i] = $('#txt_dh'+i).val();
                gzjlxx['txt_lddw'+i] = $('#txt_lddw'+i).val();
                gzjlxx['txt_ajtm'+i] = $('#txt_ajtm'+i).val();
                gzjlxx['txt_ys'+i] = $('#txt_ys'+i).val();
                gzjlxx['txt_bgqx'+i] = $('#txt_bgqx'+i).val();
                gzjlxx['txt_cjfshsy'+i] = $('#txt_cjfshsy'+i).val();

                if($('#txt_qzrqbegin'+i).val() == '' || $('#txt_qzrqend'+i).val() == '' ||gzjlxx['txt_xh'+i] == '' ||gzjlxx['txt_dh'+i] == '' ||
                    gzjlxx['txt_lddw'+i] == '' || gzjlxx['txt_ajtm'+i] == '' || gzjlxx['txt_ys'+i] == '' ||  gzjlxx['txt_bgqx'+i] == '' ||  gzjlxx['txt_cjfshsy'+i] == ''){
                    continue;
                }
                gzjl.push(gzjlxx);
            }

            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_daxzxksqs'];

            pramadic['txt_grsqrxm'] = '[\"个人申请人姓名",\"'+$('#txt_grsqrxm').val()+'\"]';
            pramadic['txt_xb'] = '[\"性别",\"'+$('#txt_xb').val()+'\"]';
            pramadic['txt_csny'] = '[\"出生年月",\"'+$('#txt_csny').val()+'\"]';
            pramadic['txt_dwsqrmc'] = '[\"单位申请人名称",\"'+$('#txt_dwsqrmc').val()+'\"]';
            pramadic['txt_fddbr'] = '[\"法定代表人",\"'+$('#txt_fddbr').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_zz'] = '[\"住址",\"'+$('#txt_zz').val()+'\"]';
            pramadic['txt_yzbm'] = '[\"邮政编码",\"'+$('#txt_yzbm').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_sdfs'] = '[\"送达方式",\"'+$('#txt_sdfs').val()+'\"]';
            pramadic['txt_sqsx'] = '[\"申请事项",\"'+$('#txt_sqsx').val()+'\"]';
            pramadic['txt_dahdafzjmc'] = '[\"档案或档案复制件名称",\"'+$('#txt_dahdafzjmc').val()+'\"]';
            pramadic['txt_nr'] = '[\"内容",\"'+$('#txt_nr').val()+'\"]';
            pramadic['txt_gg'] = '[\"规格",\"'+$('#txt_gg').val()+'\"]';
            pramadic['txt_sl'] = '[\"数量",\"'+$('#txt_sl').val()+'\"]';
            pramadic['txt_cjfshsy'] = '[\"出境方式和事由",\"'+$('#txt_cjfshsy').val()+'\"]';
    
            pramadic['txt_sqclml'] = ['申请材料目录',gzjl];
            
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.daxzxksqs = formXml;
            window.history.go(-1);
        },
        csny(){
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
                // var d = selectItems.d.text;  //获取选择的日
                // var date = y + "-" + m + "-" + d ; 
                var date = y + "-" + m
                $("#txt_csny").val(date); 
            })
        },
        qzrqbegin(){
            let id = $(event.target).prop('id');
            let num = id.replace(/[^\d]/g,'');
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
                // var d = selectItems.d.text;  //获取选择的日
                // var date = y + "-" + m + "-" + d ; 
                var date = y + "-" + m
                $("#txt_qzrqbegin"+num).val(date); 
            })
        },
        qzrqend(){
            let id = $(event.target).prop('id');
            let num = id.replace(/[^\d]/g,'');

            if(!$("#txt_qzrqbegin"+num).val()){
                return
            }
            let begin = $("#txt_qzrqbegin"+num).val().split('-');
            let year = begin[0];
            let month = begin[1];

            let dtPicker = new mui.DtPicker({ type: 'month',
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
                // var d = selectItems.d.text;  //获取选择的日
                // var date = y + "-" + m + "-" + d ; 
                var date = y + "-" + m
                $("#txt_qzrqend"+num).val(date); 
            })
        },
        zjgzjl(){
            let num = this.gzjlNum -1;
            if(!$('#txt_xh'+num).val() || !$('#txt_dh'+num).val() || !$('#txt_lddw'+num).val() || !$('#txt_ajtm'+num).val() || !$('#txt_qzrqbegin'+num).val()
            || !$('#txt_qzrqend'+num).val() || !$('#txt_ys'+num).val() || !$('#txt_bgqx'+num).val() || !$('#txt_cjfshsy'+num).val()){
                return
            }
            this.gzjlNum++;
            this.noshuju.push('');
        },
    }
})