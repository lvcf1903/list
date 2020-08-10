new Vue({
    el:'#app',
    data:{
        userInfo:'',
        issfz1:false,
        issfz2:false,
        issj:false
    },
    created:function(){
        this.userInfo = window.localStorage.wxuserInfo;
        if(this.userInfo) {
            this.userInfo = JSON.parse(this.userInfo);
        }
        let ydswryyhyjhhspb = window.localStorage.ydswryyhyjhhspb;
        if(ydswryyhyjhhspb != undefined){
            let bdarray = JSON.parse(localStorage.getItem("ydswryyhyjhhspb")).wordform[0];
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
                this.issj = false;
                mui.alert('联系电话输入错误', '亲', function() {
				});        
            }else{
                this.issj = true;
            }
        },
        sfzyz(){
            let sfz = $(event.target).val();
            if(!isCardNo(sfz)){
                let id = $(event.target).prop('id');
                if(id == 'BGAE0003'){
                    this.issfz1 = false;
                }else{
                    this.issfz2 = false;
                }
                mui.alert('身份证输入错误', '亲', function() {
				});        
            }else{
                let id = $(event.target).prop('id');
                if(id == 'BGAE0003'){
                    this.issfz1 = true;
                }else{
                    this.issfz2 = true;
                }
            }
        },
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#BGAE0002').val() || !$('#BGAE0004').val() || !$('#BGAE0005').val()
                || !$('#BGAE0006').val() || !$('#BGAE0007').val() || !$('#BGAE0008').val() || !$('#BGAE00010').val()
                || !this.issj || !$('#BGAE00012').val() || !$('#txt_ysmdd').val() || !this.issfz1 || !this.issfz2){
                    mui.alert('信息未填写完整', '亲', function() {
                    });  
                    return;
            }

            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['异地死亡人员运回原籍火花的审批'];
            
            pramadic['BGAE0002'] = '[\"死者姓名",\"'+$('#BGAE0002').val()+'\"]';
            pramadic['BGAE0003'] = '[\"身份证号码",\"'+$('#BGAE0003').val()+'\"]';
            pramadic['BGAE0004'] = '[\"户籍所在地",\"'+$('#BGAE0004').val()+'\"]';
            pramadic['BGAE0005'] = '[\"死亡地点",\"'+$('#BGAE0005').val()+'\"]';
            pramadic['BGAE0006'] = '[\"死亡原因",\"'+$('#BGAE0006').val()+'\"]';
            pramadic['BGAE0007'] = '[\"死亡证明出具单位",\"'+$('#BGAE0007').val()+'\"]';
            pramadic['BGAE0008'] = '[\"姓名",\"'+$('#BGAE0008').val()+'\"]';
            pramadic['BGAE0009'] = '[\"身份证号码",\"'+$('#BGAE0009').val()+'\"]';
            pramadic['BGAE00010'] = '[\"与死者关系",\"'+$('#BGAE00010').val()+'\"]';
            pramadic['BGAE00011'] = '[\"联系电话",\"'+$('#BGAE00011').val()+'\"]';
            pramadic['BGAE00012'] = '[\"联系地址",\"'+$('#BGAE00012').val()+'\"]';
            pramadic['txt_ysmdd'] = '[\"运送目的地",\"'+$('#txt_ysmdd').val()+'\"]';
           
            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);


            console.log(prama.wordform[0])


            window.localStorage.ydswryyhyjhhspb = formXml;
            window.history.go(-1);
        }
    }
})