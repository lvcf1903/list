new Vue({
    el:'#app',
    data:{
    },
    created:function(){
        let whdwwwbhdwdbkydwwxsxksqb = window.localStorage.whdwwwbhdwdbkydwwxsxksqb;
        if(whdwwwbhdwdbkydwwxsxksqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("whdwwwbhdwdbkydwwxsxksqb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title"){
                    $("#"+key).val(JSON.parse(bdarray[key])[1]);
                }
            }
        }
    },
    methods:{
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_bkydwwmc').val() || !$('#txt_nd').val() || !$('#txt_gbpc').val() || !$('#txt_dz').val()
                || !$('#txt_gcmc').val() || !$('#txt_gclx').val() || !$('#txt_gcyzdw').val() || !$('#txt_sjzgbm').val() || !$('#txt_zdmj').val()
                || !$('#txt_jzmj').val() || !$('#txt_jfgs').val() || !$('#txt_xsbyxcs').val() || !$('#txt_gcfwjnr').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_whdwwwbhdwdbkydwwxsxksqb'];

            pramadic['txt_bkydwwmc'] = '[\"不可移动文物名称",\"'+$('#txt_bkydwwmc').val()+'\"]';
            pramadic['txt_nd'] = '[\"年代",\"'+$('#txt_nd').val()+'\"]';
            pramadic['txt_gbpc'] = '[\"公布批次",\"'+$('#txt_gbpc').val()+'\"]';
            pramadic['txt_dz'] = '[\"地址",\"'+$('#txt_dz').val()+'\"]';
            pramadic['txt_gcmc'] = '[\"工程名称",\"'+$('#txt_gcmc').val()+'\"]';
            pramadic['txt_gclx'] = '[\"工程类型",\"'+$('#txt_gclx').val()+'\"]';
            pramadic['txt_gcyzdw'] = '[\"工程业主单位",\"'+$('#txt_gcyzdw').val()+'\"]';
            pramadic['txt_sjzgbm'] = '[\"上级主管部门",\"'+$('#txt_sjzgbm').val()+'\"]';
            pramadic['txt_zdmj'] = '[\"占地面积",\"'+$('#txt_zdmj').val()+'\"]';
            pramadic['txt_jzmj'] = '[\"建筑面积",\"'+$('#txt_jzmj').val()+'\"]';
            pramadic['txt_jfgs'] = '[\"经费估算（万元）",\"'+$('#txt_jfgs').val()+'\"]';
            pramadic['txt_xsbyxcs'] = '[\"修缮必要性阐述",\"'+$('#txt_xsbyxcs').val()+'\"]';
            pramadic['txt_gcfwjnr'] = '[\"工程范围及内容",\"'+$('#txt_gcfwjnr').val()+'\"]';
            
            if($('#txt_bz').val()){
                pramadic['txt_bz'] = '[\"备注",\"'+$('#txt_bz').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.whdwwwbhdwdbkydwwxsxksqb = formXml;
            window.history.go(-1);
        }
    }
})