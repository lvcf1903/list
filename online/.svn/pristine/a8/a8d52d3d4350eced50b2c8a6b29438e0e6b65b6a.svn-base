new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        email:false
    },
    created:function(){
        let sxjwwkhdwydzbhcsxksqb = window.localStorage.sxjwwkhdwydzbhcsxksqb;
        if(sxjwwkhdwydzbhcsxksqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("sxjwwkhdwydzbhcsxksqb")).wordform[0];
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
        yxyz(){
            let sj = $(event.target).val();
            if(!isEmail(sj)){
                this.email = false;
                mui.alert('E-mail输入错误', '亲', function() {
                });   
            }else{
                this.email = true
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_sqdwhgr').val() || !$('#txt_jgdm').val() || !$('#txt_frdb').val() || !$('#txt_lxr').val()
                || !this.iskxdh || !$('#txt_txdz').val() || !this.email || !$('#txt_xmmc').val() || !$('#txt_dd').val() || !$('#txt_xmgk').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_sxjwwkhdwydzbhcsxksqb'];

            pramadic['txt_sqdwhgr'] = '[\"申请单位或个人",\"'+$('#txt_sqdwhgr').val()+'\"]';
            pramadic['txt_jgdm'] = '[\"机构代码",\"'+$('#txt_jgdm').val()+'\"]';
            pramadic['txt_frdb'] = '[\"法人代表",\"'+$('#txt_frdb').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_txdz'] = '[\"通讯地址",\"'+$('#txt_txdz').val()+'\"]';
            pramadic['txt_email'] = '[\"E-mail",\"'+$('#txt_email').val()+'\"]';
            pramadic['txt_xmmc'] = '[\"项目名称",\"'+$('#txt_xmmc').val()+'\"]';
            pramadic['txt_dd'] = '[\"地点",\"'+$('#txt_dd').val()+'\"]';
            pramadic['txt_xmgk'] = '[\"项目概况",\"'+$('#txt_xmgk').val()+'\"]';
          
            if($('#txt_xbcsmdqk').val()){
                pramadic['txt_xbcsmdqk'] = '[\"需补充说明的情况",\"'+$('#txt_xbcsmdqk').val()+'\"]';
            }


            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.sxjwwkhdwydzbhcsxksqb = formXml;
            window.history.go(-1);
        }
    }
})