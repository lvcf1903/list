new Vue({
    el:'#app',
    data:{
        iskxdh:false,
        isfzrdh:false,
        email:false
    },
    created:function(){
        let chxzxksqs = window.localStorage.chxzxksqs;
        if(chxzxksqs != undefined){
            let bdarray = JSON.parse(localStorage.getItem("chxzxksqs")).wordform[0];
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
                    mui.alert('联系电话输入错误', '亲', function() {
                    });        
                }else{
                    this.isfzrdh = false;
                    mui.alert('联系人联系方式错误', '亲', function() {
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
            if(!$('.chengruo input').prop('checked') || !$('#txt_sqr').val() || !$('#txt_zs').val() || !$('#txt_yzbm').val() || !$('#txt_yyzzbh').val()
                || !this.email  || !this.iskxdh || !$('#txt_sqchxzxksxmc').val() || !$('#txt_slh').val() || !$('#txt_lxr').val()
                || !this.isfzrdh || !$('#txt_sqnr').val() ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_chxzxksqs'];

            pramadic['txt_sqr'] = '[\"申请人",\"'+$('#txt_sqr').val()+'\"]';
            pramadic['txt_zs'] = '[\"住所",\"'+$('#txt_zs').val()+'\"]';
            pramadic['txt_yzbm'] = '[\"邮政编码",\"'+$('#txt_yzbm').val()+'\"]';
            pramadic['txt_yyzzbh'] = '[\"营业执照编号/统一社会信用代码",\"'+$('#txt_yyzzbh').val()+'\"]';
            pramadic['txt_email'] = '[\"E-mail",\"'+$('#txt_email').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_sqchxzxksxmc'] = '[\"申请撤回行政许可事项名称",\"'+$('#txt_sqchxzxksxmc').val()+'\"]';
            pramadic['txt_slh'] = '[\"受理号",\"'+$('#txt_slh').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['txt_lxfs'] = '[\"联系人联系方式",\"'+$('#txt_lxfs').val()+'\"]';
            pramadic['txt_sqnr'] = '[\"申请内容",\"'+$('#txt_sqnr').val()+'\"]';
           
            
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.chxzxksqs = formXml;
            window.history.go(-1);
        }
    }
})