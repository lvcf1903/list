new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        email:false
    },
    created:function(){
        let sxjwwbhdwqyfaxksqb = window.localStorage.sxjwwbhdwqyfaxksqb;
        if(sxjwwbhdwqyfaxksqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("sxjwwbhdwqyfaxksqb")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_fasffhwwbhgcsjfabzsdyq"){
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
                || !this.iskxdh || !this.email || !$('#txt_email').val() || !$('#txt_nqydwwbhdwmc').val() || !$('#txt_nqydwwbhdwxz').val()
                || !$('#txt_qyxmxkwjph').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_sxjwwbhdwqyfaxksqb'];

            pramadic['txt_sqdwhgr'] = '[\"申请单位或个人",\"'+$('#txt_sqdwhgr').val()+'\"]';
            pramadic['txt_jgdm'] = '[\"机构代码",\"'+$('#txt_jgdm').val()+'\"]';
            pramadic['txt_frdb'] = '[\"法人代表",\"'+$('#txt_frdb').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_txdz'] = '[\"通讯地址",\"'+$('#txt_txdz').val()+'\"]';
            pramadic['txt_email'] = '[\"E-mail",\"'+$('#txt_email').val()+'\"]';
            pramadic['txt_nqydwwbhdwmc'] = '[\"拟迁移的文物保护单位名称",\"'+$('#txt_nqydwwbhdwmc').val()+'\"]';
            pramadic['txt_nqydwwbhdwxz'] = '[\"拟迁移的文物保护单位现状",\"'+$('#txt_nqydwwbhdwxz').val()+'\"]';
            pramadic['txt_qyxmxkwjph'] = '[\"迁移项目许可文件批号",\"'+$('#txt_qyxmxkwjph').val()+'\"]';
            pramadic['txt_fasffhwwbhgcsjfabzsdyq'] = '[\"方案是否符合《文物保护工程设计方案编制深度要求》",\"'+$('#txt_fasffhwwbhgcsjfabzsdyq option').eq($('#txt_fasffhwwbhgcsjfabzsdyq').val()-1).text()+'\"]';
           
            if($('#txt_xbcsmdqk').val()){
                pramadic['txt_xbcsmdqk'] = '[\"需补充说明的情况",\"'+$('#txt_xbcsmdqk').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.sxjwwbhdwqyfaxksqb = formXml;
            window.history.go(-1);
        }
    }
})