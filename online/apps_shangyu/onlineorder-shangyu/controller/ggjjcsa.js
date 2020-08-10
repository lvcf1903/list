new Vue({
    el: '#app',
    data: {
        iskxdh: false,
        email: false,
        picker: null,
        pick: null,/*  */
        intext: null,
        flag: null,
        nowtext: "请选择",
        ma: null,
        mb: null,
        mc: null,
        md: null,
        me: null,
        mf: null,
        mg: null,
        mh: null,
        sszt: "请选择",
        mu: null,
        mp: null,
        mk: null,
        zzpx: "请选择",
        kesd: null,
    },
    created: function () {
        this.initMui()
        sessionStorage.getItem('zjlx') ? $('#txt_gbhsyq').text(sessionStorage.getItem('zjlx')) : null;
        let ggjjcsa = window.localStorage.ggjjcsa;
        if (ggjjcsa != undefined) {
            let bdarray = JSON.parse(localStorage.getItem("ggjjcsa")).wordform[0];
            for (var key in bdarray) {
                if (key != "txt_title") {
                    $("#" + key).val(JSON.parse(bdarray[key])[1]);

                }
            }
        }
    },

    methods: {
        initMui() {
            mui.init();
            this.picker = new mui.PopPicker();
            this.pick = new mui.PopPicker();
            this.picker.setData([
                {
                    value: "1",
                    text: "公共娱乐场所"
                },
                {
                    value: "2",
                    text: "影剧院、录像厅、礼堂等演出、放映场所"
                },
                {
                    value: "3",
                    text: "舞厅、卡拉ＯＫ厅等歌舞娱乐场所"
                },
                {
                    value: "4",
                    text: "具有娱乐功能的夜总会、音乐茶座和餐饮场所"
                },
                {
                    value: "5",
                    text: "游艺、游乐场所"
                },
                {
                    value: "6",
                    text: "保龄球馆、旱冰场、桑拿浴室等营业性健身、休闲场所"
                },
                {
                    value: "7",
                    text: "其他"
                },
                {
                    value: "8",
                    text: "宾馆、饭店"
                },
                {
                    value: "9",
                    text: "商场"
                },
                {
                    value: "10",
                    text: "集贸市场"
                },
                {
                    value: "11",
                    text: "客运车站候车室"
                },
                {
                    value: "12",
                    text: "客运码头候船厅"
                },
                {
                    value: "13",
                    text: "民用机场航站楼"
                },
                {
                    value: "14",
                    text: "体育场馆"
                },
                {
                    value: "15",
                    text: "会堂"
                }

            ]),
                this.pick.setData([
                    {
                        value: '1',
                        text: "依法通过消防验收   "
                    },
                    {
                        value: "2",
                        text: "依法进行竣工验收消防备案"
                    },
                    {
                        value: "3",
                        text: "其他情况"
                    }
                ])
        },
        sjyz() {
            let sj = $(event.target).val();
            if (!validatePhone(sj)) {
                this.iskxdh = false;
                mui.alert('联系电话输入错误', '亲', function () {
                });
            } else {
                this.iskxdh = true
            }
        },
        show() {
            let _this = this
            _this.picker.show(function (selectItems) {
                console.log(selectItems[0].text);
                console.log(selectItems[0].value);
                _this.sszt = selectItems[0].text;
            })
        },
        btn() {
            let _this = this;
            _this.pick.show(function (selectItems) {
                console.log(selectItems)
                console.log(selectItems[0].text);
                console.log(selectItems[0].value);
                _this.nowtext = selectItems[0].text;
                console.log(selectItems[0].value);
                _this.flag = selectItems[0].value;

            })
        },
        saveGo() {

            var data = $('input:checkbox[name="radiocheck"]:checked').map(function () {
                return $(this).val();
            }).get().join(" ");
            console.log(data)

            console.log($('.chengruo input').prop('checked'))
            console.log($('#txt_sqdwhgr').val())
            console.log($('#txt_jgdm').val())



            //     if(this.nowtext =='其他情况'){
            //       if(!$('.chengruo input').prop('checked') || !$('#txt_sqdwhgr').val() || !$('#txt_jgdm').val() || !$('#txt_frdb').val() || !$('#txt_lxr').val()
            //       || !this.iskxdh || !$('#txt_lxdh').val() ||!$('#txt_txdz').val() || !$('#txt_email').val()
            //       || !$('#txt_bkydwwdz').html() || !$('#txt_bkydwwjbqkjs').val() || !$('#txt_yysyq').html()||!$("input[type='checkbox']").attr('value') || !$('#txt_qtqksm').val() ){
            //         mui.alert('信息未填写完整', '亲', function () {

            //         });
            //         return;
            //       }
            //     }


            let pramadic = {};
            let prama = {};
            let jsonArray = [];

            pramadic["txt_title"] = ['form_ggjjcsa'];

            pramadic['txt_sqdwhgr'] = '[\"场所名称",\"' + $('#txt_sqdwhgr').val().trim() + '\"]';
            pramadic['txt_jgdm'] = '[\"法定代表人/主要负责人",\"' + $('#txt_jgdm').val().trim() + '\"]';
            pramadic['txt_frdb'] = '[\"地址",\"' + $('#txt_frdb').val().trim() + '\"]';
            pramadic['txt_lxr'] = '[\"建筑结构",\"' + $('#txt_lxr').val().trim() + '\"]';
            pramadic['txt_lxdh'] = '[\"场所建筑面积",\"' + $('#txt_lxdh').val().trim() + '\"]';
            pramadic['txt_txdz'] = '[\"使用层数(地上地下)",\"' + $('#txt_txdz').val().trim() + '\"]';
            pramadic['txt_email'] = '[\"联系人",\"' + $('#txt_email').val().trim() + '\"]';
            pramadic['txt_bkydwwmc'] = '[\"联系电话",\"' + $('#txt_bkydwwmc').val().trim() + '\"]';

            pramadic['txt_bkydwwdz'] = '[\"场所性质",\"' + $('#txt_bkydwwdz').html().trim() + '\"]';
            pramadic['txt_bkydwwjbqkjs'] = '[\"建筑高度",\"' + $('#txt_bkydwwjbqkjs').val().trim() + '\"]';
            pramadic['txt_yysyq'] = '[\"消防验收/备案情况",\"' + $('#txt_yysyq').html().trim() + '\"]';
            //pramadic['txt_sqdwhgg'] = '[\"文案",\"' + $('#txt_sqdwhgg').val().trim() + '\"]';
            // pramadic['txt_sq'] = '[\"备案号",\"' + $('#txt_sq').val() + '\"]';

            //    $("input[name='item']:checked").val() $("input[type='checkbox']").val().trim()

            pramadic['txt_gbhsyq'] = '[\"现有消防措施",\"' + data.trim() + '\"]';
            //  pramadic['txt_zryy'] = '[\"转让、抵押或改变用途的原因",\"' + $('#txt_zryy').val() + '\"]';


            if ($('#txt_qtqksm').val()) {
                pramadic['txt_qtqksm'] = ['其他情况说明', $('#txt_qtqksm').val().trim()];
            }

            jsonArray.push(pramadic);
            prama["wordform"] = jsonArray
            let formXml = JSON.stringify(prama);
            //debugger
            console.log(prama.wordform[0])
            window.localStorage.ggjjcsa = formXml;
            window.history.go(-1);
        }
    }
})