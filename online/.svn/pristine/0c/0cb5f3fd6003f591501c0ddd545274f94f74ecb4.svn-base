new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        issfz:false
    },
    created:function(){
        let zypxbtsqbgr = window.localStorage.zypxbtsqbgr;
        if(zypxbtsqbgr != undefined){
            let bdarray = JSON.parse(localStorage.getItem("zypxbtsqbgr")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_zslx" && key != "txt_pxsj"){
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
                this.issfz = false;
                mui.alert('身份证输入错误', '亲', function() {
				});        
            }else{
                this.issfz = true;
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_xm').val() || !this.issfz || !this.iskxdh || !$('#txt_hjdz').val() || !$('#txt_pxsjend').val()
                || !$('#txt_czdz').val() || !$('#txt_gzdw').val() || !$('#txt_jysj').val() || !$('#txt_khh').val() || !$('#txt_zh').val() || !$('#txt_pxsjbegin').val()
                || !$('#txt_pxgz').val() || !$('#txt_pxdj').val() || !$('#txt_pxjg').val() || !$('#txt_hzsj').val() || !$('#txt_zsbh').val() || !$('#txt_sqpxbtje').val()
                || !$('#txt_sqjnjdbtje').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_zypxbtsqbgr'];

            pramadic['txt_xm'] = '[\"姓名",\"'+$('#txt_xm').val()+'\"]';
            pramadic['txt_sfzh'] = '[\"身份证号",\"'+$('#txt_sfzh').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_hjdz'] = '[\"户籍地址",\"'+$('#txt_hjdz').val()+'\"]';
            pramadic['txt_czdz'] = '[\"常住地址",\"'+$('#txt_czdz').val()+'\"]';
            pramadic['txt_gzdw'] = '[\"工作单位",\"'+$('#txt_gzdw').val()+'\"]';
            pramadic['txt_jysj'] = '[\"就业时间",\"'+$('#txt_jysj').val()+'\"]';
            pramadic['txt_khh'] = '[\"开户行",\"'+$('#txt_khh').val()+'\"]';
            pramadic['txt_zh'] = '[\"帐号",\"'+$('#txt_zh').val()+'\"]';

            let pxsj = $("#txt_pxsjbegin").val() + '~' + $("#txt_pxsjend").val();
            pramadic['txt_pxsj'] = '[\"培训时间",\"'+pxsj+'\"]';

            pramadic['txt_pxgz'] = '[\"培训工种",\"'+$('#txt_pxgz').val()+'\"]';
            pramadic['txt_pxdj'] = '[\"培训等级",\"'+$('#txt_pxdj').val()+'\"]';
            pramadic['txt_pxjg'] = '[\"培训机构",\"'+$('#txt_pxjg').val()+'\"]';
            pramadic['txt_hzsj'] = '[\"获证时间",\"'+$('#txt_hzsj').val()+'\"]';
            pramadic['txt_zsbh'] = '[\"证书编号",\"'+$('#txt_zsbh').val()+'\"]';

            pramadic['txt_zslx'] = '[\"证书类型",\"'+$('#txt_zslx option').eq($('#txt_zslx').val()-1).text()+'\"]';

            pramadic['txt_sqpxbtje'] = '[\"申请培训补贴金额",\"'+$('#txt_sqpxbtje').val()+'\"]';
            pramadic['txt_sqjnjdbtje'] = '[\"申请技能鉴定补贴金额",\"'+$('#txt_sqjnjdbtje').val()+'\"]';
            
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.zypxbtsqbgr = formXml;
            window.history.go(-1);
        },
        jysj(){
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
                $("#txt_jysj").val(date); 
            })
        },
        hzsj(){
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
                $("#txt_hzsj").val(date); 
            })
        },
        begin(){
            var dtPicker = new mui.DtPicker({ type: 'month',
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
                var date = y + "-" + m ; 
                $("#txt_pxsjbegin").val(date); 
            })
        },
        end(){

            if(!$("#txt_pxsjbegin").val()){
                return
            }
            let begin = $("#txt_pxsjbegin").val().split('-');
            let year = begin[0];
            let month = begin[1];

            var dtPicker = new mui.DtPicker({ type: 'month',
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
                var date = y + "-" + m ; 
                $("#txt_pxsjend").val(date); 
            })
        },
    }
})