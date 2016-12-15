(function($){
$.extend({
DateSele: function (options) {
            var defaults = {
                yearSele: ".year",
                monthSele: ".month",
                daySele: ".day",
                firstText: "-",
                firstVal: 0
            };
            var opts = $.extend({}, defaults, options);
            var $YearSelector = $(opts.yearSele);
            var $MonthSelector = $(opts.monthSele);
            var $DaySelector = $(opts.daySele);
            var firstText = opts.firstText;
            var firstValue = opts.firstVal;
            //  \转义
            //  初始化  
            var str = "<option value=\"" + firstValue + "\">" + firstText + "</option>";
            $YearSelector.html(str);
            $MonthSelector.html(str);
            $DaySelector.html(str);

            // 年份列表
            var yearNow = new Date().getFullYear();
            console.log(yearNow);
			var yearSel = $YearSelector.attr("re");
            for (var i = yearNow; i >= 1970; i--) {
				var sed = yearSel==i?"selected":"";
				var yearStr = "<option value=\"" + i + "\" " + sed+">" + i + "</option>";
                $YearSelector.append(yearStr);
            }

            // 月份列表
			var monthSel = $MonthSelector.attr("re");
            for (var i = 1; i <= 12; i++) {
				var sed = monthSel==i?"selected":"";
                var monthStr = "<option value=\"" + i + "\" "+sed+">" + i + "</option>";
                $MonthSelector.append(monthStr);
            }

            // 日列表(当选择了年月的时候)
            function BuildDay() {
                if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) {
                    // 未选择年份或者月份
                    $DaySelector.html(str);
                } else {
                    $DaySelector.html(str);
                    var year = parseInt($YearSelector.val());
                    var month = parseInt($MonthSelector.val());
                    var dayCount = 0;
                    switch (month) {
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 8:
                        case 10:
                        case 12:
                            dayCount = 31;
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            dayCount = 30;
                            break;
                        case 2:
                            dayCount = 28;
                            //如果为闰年
                            if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
                                dayCount = 29;
                            }
                            break;
                        default:
                            break;
                    }
					
					var daySel = $DaySelector.attr("re");
                    for (var i = 1; i <= dayCount; i++) {
						var sed = daySel==i?"selected":"";
						var dayStr = "<option value=\"" + i + "\" "+sed+">" + i + "</option>";
                        $DaySelector.append(dayStr);
                    }
                }
            }
            $MonthSelector.change(function () {
                BuildDay();
            });
            $YearSelector.change(function () {
                BuildDay();
            });
			if($DaySelector.attr("re")!=""){
				BuildDay();
			}
        }
});
})(jQuery);