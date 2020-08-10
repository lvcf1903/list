new Vue({
    el:'#app',
    data:{
        issj:false,
        iskxdh:false
    },
    created:function(){
        let sqdmzmdjb = window.localStorage.sqdmzmdjb;
        if(sqdmzmdjb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("sqdmzmdjb")).wordform[0];
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
                if($(event.target).prop('id') == 'BYWX0015'){
                    this.iskxdh = false;
                    mui.alert('联系方式输入错误', '亲', function() {
                    });        
                }else{
                    this.issj = false;
                    mui.alert('手机号输入错误', '亲', function() {
                    });        
                }  
            }else{
                if($(event.target).prop('id') == 'BYWX0015'){
                    this.iskxdh = true
                }else{
                    this.issj = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#BYWX0001').val() || !$('#txt_czr').val() || !$('#ALAA0001').val() || !$('#txt_lxr').val() || !this.issj
                || !this.iskxdh || !$('#BYWX0003').val() || !$('#BYWX0009').val()){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['地名证明业务申请'];
            pramadic['BYWX0001'] = '[\"产权人",\"'+$('#BYWX0001').val()+'\"]';
            pramadic['txt_czr'] = '[\"承租人",\"'+$('#txt_czr').val()+'\"]';
            pramadic['ALAA0001'] = '[\"行政区划",\"'+$('#ALAA0001').val()+'\"]';
            pramadic['txt_lxr'] = '[\"联系人",\"'+$('#txt_lxr').val()+'\"]';
            pramadic['BYWX0015'] = '[\"联系电话",\"'+$('#BYWX0015').val()+'\"]';
            pramadic['txt_sj'] = '[\"手机",\"'+$('#txt_sj').val()+'\"]';
            pramadic['BYWX0003'] = '[\"原标准地名地址",\"'+$('#BYWX0003').val()+'\"]';
            pramadic['BYWX0009'] = '[\"现标准地名地址",\"'+$('#BYWX0009').val()+'\"]';
         
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);
            console.log(prama.wordform[0])
            window.localStorage.sqdmzmdjb = formXml;
            window.history.go(-1);
        }
    }
})