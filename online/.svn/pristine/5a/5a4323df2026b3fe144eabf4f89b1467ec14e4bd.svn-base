var result;

/**
 * 获取信息列表的json返回信息列表实体
 * @param {Object} url        
 * @param {Object} settings
 * @param {Object} type
 */
function GetGoodInfoListJson(url, settings, type) {
	var goodList = new Array();
	if(type != '') {
		result = get(url, settings, type);
	} else {
		result = getJson(url, settings);
	}
	result = [{
		"imgurl": "http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/1608261435153158670.jpg",
		"openurl": "http://mp.weixin.qq.com/s?__biz=MzIzMzEzOTc3MQ==&mid=2668056904&idx=1&sn=a91576ac1b0f17ff0c8cab40115cef17&scene=2&srcid=0826Oao3QuuxnusMHpvr2v3b&from=timeline&isappinstalled=0#wechat_redirect",
		"title": "买地铁票不用排队掏零钱了！用浙江政务服务网APP一键就搞定！"
	}, {
		"imgurl": "http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/1608241508077981955.jpg",
		"openurl": "http://mp.weixin.qq.com/s?__biz=MzIzMzEzOTc3MQ==&mid=2668056887&idx=1&sn=99e1267501b2e3413fdbaf2d7ff9f788&scene=2&srcid=0830r4KZtd9NdzqOGAaNsDah&from=timeline&isappinstalled=0#wechat_redirect",
		"title": "浙江的车主请注意！交通违法缴款网上支付已覆盖全省 手机操作更方便"
	}, {
		"imgurl": "http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/s1609261017381558234.jpg",
		"openurl": "http://www.zjzwfw.gov.cn/art/2016/9/21/art_1172277_475.html",
		"title": "浙江会计证申办全程电子化 已在全省10个设区市实现"
	}, {
		"imgurl": "http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/1609281521515874192.jpg",
		"openurl": "http://www.zjzwfw.gov.cn/art/2016/9/26/art_1172277_494.html",
		"title": "重磅应用 | 浙江开通“房屋权属证明”网上申请，可邮寄到家！"
	}, {
		"imgurl": "http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/picture/0/1610121541380536469.jpg",
		"openurl": "zjghyy.yyhj.zjzwfw.gov.cn/#/home",
		"title": "600万人的选择 浙江人看病 就是这么方便！"
	}];
	if(result != "") {
		if(result.length > 0) {
			for(var i = 0; i < result.goodslist.length; i++) {
				var goodinfo = new goodInfo(
					result[i].imgurl, result[i].imgurl,
					result[i].openurl, result[i].openurl,
					result[i].title, result[i].title
				);
				goodList[i] = goodinfo;
			}
		} else {
			goodList = '';
		}
	} else {
		goodList = '';
	}
	return goodList;
}