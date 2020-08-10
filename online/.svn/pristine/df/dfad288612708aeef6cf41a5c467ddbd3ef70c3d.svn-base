new Vue({
    el:'#app',
    data:{
        iskxdh:false
    },
    created:function(){
        let zypxbtsqbpxjg = window.localStorage.zypxbtsqbpxjg;
        if(zypxbtsqbpxjg != undefined){
            let bdarray = JSON.parse(localStorage.getItem("zypxbtsqbpxjg")).wordform[0];
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
                mui.alert('联系方式输入错误', '亲', function() {
                });   
            }else{
                this.iskxdh = true
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_dwmc').val() || !$('#txt_tyshxydm').val() || !$('#txt_lxr').val() || !this.iskxdh
                || !$('#txt_khm').val() || !$('#txt_khh').val() || !$('#txt_zh').val() || !$('#txt_sqpxbt').val() || !$('#txt_sqpxbtje').val() || !$('#txt_sqjnjdbt').val()
                || !$('#txt_sqjnjdbtje').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_zypxbtsqbpxjg'];

            pramadic['txt_dwmc'] = '[\"单位名称",\"'+$('#txt_dwmc').val()+'\"]';
            pramadic['txt_tyshxydm'] = '[\"统一社会信用代码",\"'+$('#txt_tyshxydm').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_khm'] = '[\"开户名",\"'+$('#txt_khm').val()+'\"]';
            pramadic['txt_khh'] = '[\"开户行",\"'+$('#txt_khh').val()+'\"]';
            pramadic['txt_zh'] = '[\"帐号",\"'+$('#txt_zh').val()+'\"]';
            pramadic['txt_sqpxbt'] = '[\"申请培训补贴",\"'+$('#txt_sqpxbt').val()+'\"]';
            pramadic['txt_sqpxbtje'] = '[\"申请培训补贴金额",\"'+$('#txt_sqpxbtje').val()+'\"]';
            pramadic['txt_sqjnjdbt'] = '[\"申请技能鉴定补贴",\"'+$('#txt_sqjnjdbt').val()+'\"]';
            pramadic['txt_sqjnjdbtje'] = '[\"申请技能鉴定补贴金额",\"'+$('#txt_sqjnjdbtje').val()+'\"]';
           

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.zypxbtsqbpxjg = formXml;
            window.history.go(-1);
        }
    }
})