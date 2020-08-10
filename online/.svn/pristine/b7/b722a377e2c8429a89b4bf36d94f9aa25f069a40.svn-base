new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        isfzrdh:false,
        email:false
    },
    created:function(){
        let ypzdsxjwwbhdwxsfazynrbgspsqb = window.localStorage.ypzdsxjwwbhdwxsfazynrbgspsqb;
        if(ypzdsxjwwbhdwxsfazynrbgspsqb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("ypzdsxjwwbhdwxsfazynrbgspsqb")).wordform[0];
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
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = false;
                    mui.alert('联系人联系方式输入错误', '亲', function() {
                    });        
                }else{
                    this.isfzrdh = false;
                    mui.alert('设计负责人联系电话', '亲', function() {
                    });        
                }  
            }else{
                if($(event.target).prop('id') == 'txt_lxdh'){
                    this.iskxdh = true
                }else{
                    this.isfzrdh = true;
                }
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
                || !this.iskxdh || !$('#txt_txdz').val() || ! this.email || !$('#txt_sjdw').val() || !$('#txt_sjdwjgdm').val()
                || !$('#txt_sjfzr').val() || !this.isfzrdh || !$('#txt_txdz2').val() || !$('#txt_xmmc').val() || !$('#txt_ykcsjfagk').val()
                || !$('#txt_bgyy').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_ypzdsxjwwbhdwxsfazynrbgspsqb'];

            pramadic['txt_sqdwhgr'] = '[\"申请单位或个人",\"'+$('#txt_sqdwhgr').val()+'\"]';
            pramadic['txt_jgdm'] = '[\"机构代码",\"'+$('#txt_jgdm').val()+'\"]';
            pramadic['txt_frdb'] = '[\"法人代表",\"'+$('#txt_frdb').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_txdz'] = '[\"通讯地址",\"'+$('#txt_txdz').val()+'\"]';
            pramadic['txt_email'] = '[\"E-mail",\"'+$('#txt_email').val()+'\"]';
            pramadic['txt_sjdw'] = '[\"设计单位",\"'+$('#txt_sjdw').val()+'\"]';
            pramadic['txt_sjdwjgdm'] = '[\"设计单位机构代码",\"'+$('#txt_sjdwjgdm').val()+'\"]';
            pramadic['txt_sjfzr'] = '[\"设计负责人",\"'+$('#txt_sjfzr').val()+'\"]';
            pramadic['txt_sjfzrlxdh'] = '[\"设计负责人联系电话",\"'+$('#txt_sjfzrlxdh').val()+'\"]';
            pramadic['txt_txdz2'] = '[\"通讯地址",\"'+$('#txt_txdz2').val()+'\"]';
            pramadic['txt_xmmc'] = '[\"项目名称",\"'+$('#txt_xmmc').val()+'\"]';
            pramadic['txt_ykcsjfagk'] = '[\"原勘察设计方案概况",\"'+$('#txt_ykcsjfagk').val()+'\"]';
            pramadic['txt_bgyy'] = '[\"变更原因",\"'+$('#txt_bgyy').val()+'\"]';
           
            
            if($('#txt_xbcsmdqk').val()){
                pramadic['txt_xbcsmdqk'] = '[\"需补充说明的情况",\"'+$('#txt_xbcsmdqk').val()+'\"]';
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.ypzdsxjwwbhdwxsfazynrbgspsqb = formXml;
            window.history.go(-1);
        }
    }
})