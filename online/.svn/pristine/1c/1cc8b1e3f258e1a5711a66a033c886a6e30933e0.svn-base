new Vue({
    el:'#app',
    data:{
        iskxdh:false,
    },
    created:function(){
        let czjyxkbgsqb = window.localStorage.czjyxkbgsqb;
        if(czjyxkbgsqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("czjyxkbgsqb")).wordform[0];
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
                || !$('#txt_jylb').val() || !$('#txt_jyfs').val() || !$('#txt_jyqy').val() || !$('#txt_zczb').val() || !$('#txt_yycs').val() || !$('#txt_jsry').val()
                || !$('#txt_xys').val() || !$('#txt_jyry').val() || !$('#txt_cqs').val() || !$('#txt_dwgk').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_czjyxkbgsqb'];

            pramadic['txt_sqdwhgr'] = '[\"申请单位或个人",\"'+$('#txt_sqdwhgr').val()+'\"]';
            pramadic['txt_fddbr'] = '[\"法定代表人",\"'+$('#txt_fddbr').val()+'\"]';
            pramadic['txt_zcdz'] = '[\"注册地址",\"'+$('#txt_zcdz').val()+'\"]';
            pramadic['txt_dh'] = '[\"电话",\"'+$('#txt_dh').val()+'\"]';
            pramadic['txt_jylb'] = '[\"经营类别",\"'+$('#txt_jylb').val()+'\"]';
            pramadic['txt_jyfs'] = '[\"经营方式",\"'+$('#txt_jyfs').val()+'\"]';
            pramadic['txt_jyqy'] = '[\"经营区域",\"'+$('#txt_jyqy').val()+'\"]';
            pramadic['txt_zczb'] = '[\"注册资本",\"'+$('#txt_zczb').val()+'\"]';
            pramadic['txt_yycs'] = '[\"营业场所",\"'+$('#txt_yycs').val()+'\"]';
            pramadic['txt_jsry'] = '[\"技术人员",\"'+$('#txt_jsry').val()+'\"]';
            pramadic['txt_xys'] = '[\"检验室",\"'+$('#txt_xys').val()+'\"]';
            pramadic['txt_jyry'] = '[\"检验人员",\"'+$('#txt_jyry').val()+'\"]';
            pramadic['txt_cqs'] = '[\"催青室",\"'+$('#txt_cqs').val()+'\"]';
            pramadic['txt_dwgk'] = '[\"单位概况",\"'+$('#txt_dwgk').val()+'\"]';
            

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.czjyxkbgsqb = formXml;
            window.history.go(-1);
        },
    }
})
