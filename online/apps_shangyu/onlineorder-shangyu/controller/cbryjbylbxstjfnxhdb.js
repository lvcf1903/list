new Vue({
    el:'#app',
    data:{
        gzjlNum:1,
        noshuju:[''],
    },
    created:function(){
        let cbryjbylbxstjfnxhdb = window.localStorage.cbryjbylbxstjfnxhdb;
        if(cbryjbylbxstjfnxhdb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("cbryjbylbxstjfnxhdb")).wordform[0];
            for(let  key in bdarray){
                if(key != "txt_title" && key != "arr_gzjl" && key != "txt_ylbxjfnx" && key != "txt_stjfnx" ){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        saveGo(){

            if(!$('.chengruo input').prop('checked') || !$('#txt_xm').val() || !$('#txt_xb').val() || !$('#txt_sfzcssj').val() || !$('#txt_shbzh').val()
                || !$('#txt_dazzjzcssj').val() || !$('#txt_gzdw').val() || !$('#txt_cjgzsj').val() || !$('#txt_ylbxjfnxn').val()
                || !$('#txt_ylbxjfnxy').val() || !$('#txt_stjfnxn').val() || !$('#txt_stjfnxy').val() || !$('#txt_ggsjend0').val() 
                || !$('#txt_ggsjbegin0').val() || !$('#txt_zhdhdw0').val() || !$('#txt_bdyy0').val() || !$('#txt_rhz0').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }

            let gzjl = []; 

            for(let i = 0; i < this.gzjlNum; i++){
                let gzjlxx = {};
                let ggsj = $('#txt_ggsjbegin'+i).val()+'~'+$('#txt_ggsjend'+i).val()
                
                gzjlxx['txt_ggsj'+i] = ggsj;
                gzjlxx['txt_zhdhdw'+i] = $('#txt_zhdhdw'+i).val();
                gzjlxx['txt_bdyy'+i] = $('#txt_bdyy'+i).val();
                gzjlxx['txt_rhz'+i] = $('#txt_rhz'+i).val();
                if($('#txt_ggsjbegin'+i).val() == '' || $('#txt_ggsjend'+i).val() == '' || gzjlxx['txt_zhdhdw'+i] == '' || gzjlxx['txt_bdyy'+i] == '' ||  gzjlxx['txt_rhz'+i] == ''){
                    continue;
                }


                gzjl.push(gzjlxx);
            }

            let pramadic = {};
            let prama = {};
            let jsonArray = [];


            pramadic["txt_title"] = ['form_cbryjbylbxstjfnxhdb'];

            let ylbxjfnx = $('#txt_ylbxjfnxn').val()+'年'+$('#txt_ylbxjfnxy').val()+'个月'
            let stjfnx = $('#txt_stjfnxn').val()+'年'+$('#txt_stjfnxy').val()+'个月'

            pramadic['txt_xm'] = '[\"姓名",\"'+$('#txt_xm').val()+'\"]';
            pramadic['txt_xb'] = '[\"性别",\"'+$('#txt_xb').val()+'\"]';
            pramadic['txt_sfzcssj'] = '[\"身份证出生时间",\"'+$('#txt_sfzcssj').val()+'\"]';
            pramadic['txt_shbzh'] = '[\"社会保障号",\"'+$('#txt_shbzh').val()+'\"]';
            pramadic['txt_dazzjzcssj'] = '[\"档案最早记载出生时间",\"'+$('#txt_dazzjzcssj').val()+'\"]';
            pramadic['txt_gzdw'] = '[\"工作单位",\"'+$('#txt_gzdw').val()+'\"]';
            pramadic['txt_cjgzsj'] = '[\"参加工作时间",\"'+$('#txt_cjgzsj').val()+'\"]';
            pramadic['txt_ylbxjfnx'] = '[\"养老保险缴费年限",\"'+ylbxjfnx+'\"]';
            pramadic['txt_stjfnxn'] = '[\"视同缴费年限",\"'+stjfnx+'\"]';
            pramadic['arr_gzjl'] = ['工作简历',gzjl];
           
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.cbryjbylbxstjfnxhdb = formXml;
            window.history.go(-1);
        },
        zjgzjl(){
            let num = this.gzjlNum -1;
            if(!$('#txt_ggsjbegin'+num).val() || !$('#txt_ggsjend'+num).val() || !$('#txt_zhdhdw'+num).val() || !$('#txt_bdyy'+num).val() || !$('#txt_rhz'+num).val()){
                return
            }
            this.gzjlNum++;
            this.noshuju.push('');
        },
        cjgzsj(){
            let id = $(event.target).prop('id');
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
                $('#'+id).val(date); 
            })
        },
        sfzcssj(){
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
                $("#txt_sfzcssj").val(date); 
            })
        },
        dazzjzcssj(){
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
                $("#txt_dazzjzcssj").val(date); 
            })

        },
        begin(){
            let num = this.gzjlNum-1;
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
                $("#txt_ggsjbegin"+num).val(date); 
            })
        },
        end(){
            let num = this.gzjlNum-1;

            if(!$("#txt_ggsjbegin"+num).val()){
                return
            }
            let begin = $("#txt_ggsjbegin"+num).val().split('-');
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
                $("#txt_ggsjend"+num).val(date); 
            })
        }
    }
})