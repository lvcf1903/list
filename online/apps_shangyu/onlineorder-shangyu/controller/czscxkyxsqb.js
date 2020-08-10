new Vue({
    el:'#app',
    data:{
        iskxdh:false,
    },
    created:function(){
        let czscxkyxsqb = window.localStorage.czscxkyxsqb;
        if(czscxkyxsqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("czscxkyxsqb")).wordform[0];
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
                mui.alert('电话输入错误', '亲', function() {
                });   
            }else{
                this.iskxdh = true
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_sqdwhgr').val() || !$('#txt_fddbr').val() || !$('#txt_zcdz').val() || !this.iskxdh
                || !$('#txt_scdd').val() || !$('#txt_sclb').val() || !$('#txt_scgm').val() || !$('#txt_zczb').val() || !$('#txt_cs').val() || !$('#txt_jsry').val()
                || !$('#txt_cqs').val() || !$('#txt_jyry').val() || !$('#txt_dws').val() || !$('#txt_symj').val() || !$('#txt_bhs').val() || !$('#txt_css').val() 
                || !$('#txt_jys').val() || !$('#txt_lckf').val() || !$('#txt_dwgk').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_czscxkyxsqb'];

            pramadic['txt_sqdwhgr'] = '[\"申请单位或个人",\"'+$('#txt_sqdwhgr').val()+'\"]';
            pramadic['txt_fddbr'] = '[\"法定代表人",\"'+$('#txt_fddbr').val()+'\"]';
            pramadic['txt_zcdz'] = '[\"注册地址",\"'+$('#txt_zcdz').val()+'\"]';
            pramadic['txt_dh'] = '[\"电话",\"'+$('#txt_dh').val()+'\"]';
            pramadic['txt_scdd'] = '[\"生产地点",\"'+$('#txt_scdd').val()+'\"]';
            pramadic['txt_sclb'] = '[\"生产类别",\"'+$('#txt_sclb').val()+'\"]';
            pramadic['txt_scgm'] = '[\"生产规模",\"'+$('#txt_scgm').val()+'\"]';
            pramadic['txt_zczb'] = '[\"注册资本",\"'+$('#txt_zczb').val()+'\"]';
            pramadic['txt_cs'] = '[\"蚕（蔟）室",\"'+$('#txt_cs').val()+'\"]';
            pramadic['txt_jsry'] = '[\"技术人员",\"'+$('#txt_jsry').val()+'\"]';
            pramadic['txt_cqs'] = '[\"催青室",\"'+$('#txt_cqs').val()+'\"]';
            pramadic['txt_jyry'] = '[\"检验人员",\"'+$('#txt_jyry').val()+'\"]';
            pramadic['txt_dws'] = '[\"低温室",\"'+$('#txt_dws').val()+'\"]';
            pramadic['txt_symj'] = '[\"桑园面积",\"'+$('#txt_symj').val()+'\"]';
            pramadic['txt_bhs'] = '[\"保护室",\"'+$('#txt_bhs').val()+'\"]';
            pramadic['txt_css'] = '[\"贮桑室",\"'+$('#txt_css').val()+'\"]';
            pramadic['txt_jys'] = '[\"检验室",\"'+$('#txt_jys').val()+'\"]';
            pramadic['txt_lckf'] = '[\"冷藏库房",\"'+$('#txt_lckf').val()+'\"]';
            pramadic['txt_dwgk'] = '[\"单位概况",\"'+$('#txt_dwgk').val()+'\"]';
            
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.czscxkyxsqb = formXml;
            window.history.go(-1);
        },
    }
})