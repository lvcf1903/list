new Vue({
    el:'#app',
    data:{
        noshuju:[''],
        ylgmNum:1,
        iskxdh:false
    },
    created:function(){
        let nhgtpthcysywjyxksqs = window.localStorage.nhgtpthcysywjyxksqs;
        if(nhgtpthcysywjyxksqs != undefined){
            let bdarray = JSON.parse(localStorage.getItem("nhgtpthcysywjyxksqs")).wordform[0];
            for(var  key in bdarray){
                if(key != "txt_title" && key != "txt_sqss" && key != "txt_zyaqglzd" && key != "txt_aqglcssfls" && key != "arr_ylgm"){
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
        saveGo(){
            if(!$('.chengruo input').prop('checked') || !$('#txt_xm').val() || !$('#txt_gmsfhm').val() || !$('#txt_jbr').val() || !this.iskxdh
                || !$('#txt_dz').val() || !$('#txt_yzbm').val() || !$('#txt_jjlx').val() || !$('#txt_shxydm').val() || !$('#txt_jyfw').val()
                || !$('#txt_num0').val() || !$('#txt_zds0').val() || !$('#txt_zzd0').val() || !$('#txt_bzx0').val()  ){
                    mui.alert('信息未填写完整', '亲', function() {
                    });
                    return;
            }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_nhgtpthcysywjyxksqs'];

            pramadic['txt_sqss'] = '[\"申请事项",\"'+$('#txt_sqss option').eq($('#txt_sqss').val()-1).text()+'\"]';
            pramadic['txt_xm'] = '[\"姓名",\"'+$('#txt_xm').val()+'\"]';
            pramadic['txt_gmsfhm'] = '[\"公民身份号码",\"'+$('#txt_gmsfhm').val()+'\"]';
            pramadic['txt_jbr'] = '[\"经办人",\"'+$('#txt_jbr').val()+'\"]';
            pramadic['txt_lxdh'] = '[\"联系电话",\"'+$('#txt_lxdh').val()+'\"]';
            pramadic['txt_dz'] = '[\"地址",\"'+$('#txt_dz').val()+'\"]';
            pramadic['txt_yzbm'] = '[\"邮政编码",\"'+$('#txt_yzbm').val()+'\"]';
            pramadic['txt_jjlx'] = '[\"经济类型",\"'+$('#txt_jjlx').val()+'\"]';
            pramadic['txt_shxydm'] = '[\"社会信用代码",\"'+$('#txt_shxydm').val()+'\"]';
            pramadic['txt_jyfw'] = '[\"经营范围",\"'+$('#txt_jyfw').val()+'\"]';
           
            let ylgm = []; 
            for(let i = 0; i < this.ylgmNum; i++){
                let ylgmxx = {};
                ylgmxx['txt_num'+i] = $('#txt_num'+i).val();
                ylgmxx['txt_zds'+i] = $('#txt_zds'+i).val();
                ylgmxx['txt_zzd'+i] = $('#txt_zzd'+i).val();
                ylgmxx['txt_bzx'+i] = $('#txt_bzx'+i).val();
                ylgmxx['txt_cbly'+i] = ['船舶来源',$('#txt_cbly'+i).find('option').eq($('#txt_cbly'+i).val()-1).text()]
                if(ylgmxx['txt_num'+i] == '' | ylgmxx['txt_zds'+i] == '' || ylgmxx['txt_zzd'+i] == '' ||  ylgmxx['txt_bzx'+i] == ''){
                    continue;
                }
                ylgm.push(ylgmxx);
            }
            pramadic['arr_ylgm'] = ['运力规模',ylgm];

            let arr = [];
            var shuju = $('input[name=zyaqglzd]')
            for(let i = 0; i < shuju.length; i++){
                if(shuju[i].checked){
                   arr.push($(shuju[i]).val())
                }
            }
            pramadic['txt_zyaqglzd'] = ['主要安全管理制度',arr];

            pramadic['txt_aqglcssfls'] = '[\"安全管理措施是否落实",\"'+$('#txt_aqglcssfls option').eq($('#txt_aqglcssfls').val()-1).text()+'\"]';


            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);

            console.log(prama.wordform[0])
            window.localStorage.nhgtpthcysywjyxksqs = formXml;
            window.history.go(-1);
        },
        zjylgm(){
            this.ylgmNum++;
            this.noshuju.push('');
        }
    }
})