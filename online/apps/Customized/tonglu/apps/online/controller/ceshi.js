function requestTiemSuccess(data) {
	var dateArray = data.resttime;
	//找到所有可预约日期中的最大日期和最小日期
	var minSelectDate = dateArray[0];
	//需要获取到最小一天的前一天（因为sui日历控件设置的minDate不包含那一天）
	minSelectDate = getPreDay(minSelectDate);
	var index = dateArray.length - 1;
	var maxSelectDate = dateArray[index];

	var minDate2 = minSelectDate.substring(0, 4) + "-" + minSelectDate.substring(4, 6) + "-" + minSelectDate.substring(6, 8);
	var maxDate2 = maxSelectDate.substring(0, 4) + "-" + maxSelectDate.substring(4, 6) + "-" + maxSelectDate.substring(6, 8);

	document.getElementById("my-input").style.display = "none";
	$("#my-input2").calendar({
		minDate: minDate2,
		maxDate: maxDate2,
		dateFormat: 'yyyymmdd',
		onChange: function(p, values, displayValues) {
			//判断选择的日期是否在可选范围内
			var isvalid = "no";
			for(var i = 0; i < dateArray.length; i++) {
				if(displayValues == dateArray[i]) {
					isvalid = "yes";

				} else {

				}
			}
			if(isvalid == "no") {
				mui.alert("抱歉，您所选的节假日不能预约");
				orderDate = "";
			} else {
				orderDate = displayValues[0];
				orderTime = "";
				//请求当天可预约时间段
				requestTimeInterval();
			}
		}
	});
}