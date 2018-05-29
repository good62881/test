/**
 * 获取id标签
 * @param {} id
 * @return {}
 */
var $ID = function(id){
	return window.document.getElementById(id);
}
/**
 * 获取name标签数组
 * @param {} name
 * @return {}
 */
var $NAMES = function(name){
	return document.getElementsByName(name);
}
/**
 * 判断节点是否存在当前Class名称
 * @param {} ele
 * @param {} cls
 * @return {}
 */
function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
/**
 * 为当前节点增加class
 * @param {} ele
 * @param {} cls
 */
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
/**
 * 删除当前节点的class
 * @param {} ele
 * @param {} cls
 */
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
/**
 * 如果存在样式则删除，如果不存在则添加
 * @param {} ele
 * @param {} cls
 */
function toggleClass(ele,cls) {
    if(hasClass(ele,cls)){
        removeClass(ele,cls);
    }
    else
        addClass(ele,cls);
}
/**
 * 将新的和旧的样式置换
 * @param {} ele
 * @param {} oldcls
 * @param {} newcls
 */
function changeClass(ele,oldcls,newcls) {
    if (!hasClass(ele,newcls)) {
        if(hasClass(ele,oldcls)){
            removeClass(ele,oldcls);
        }
        addClass(ele,newcls);
    }
}
/**
 * 去除空格
 */
function trim(s){
	return s.replace( /\s*$/, "").replace( /^\s*/, ""); 
}
/**
 * 招标室切换报价tab样式
 * @param {} num
 */
function switchMenu(num,total){
	for(var i=1;i<=total;i++){
		if(num==i){
			removeClass($ID("tabContents"+i),"none");
			addClass($ID("menuTab"+i),"here");
		}else{
			addClass($ID("tabContents"+i),"none");
			removeClass($ID("menuTab"+i),"here");
		}
	}
}
/**
 * 初始化二次输入弹出确认框
 * @param {} value 需要确认的价格
 * @param {} arg1 可选参数-option
 * @param {} arg2 可选参数-option
 * @param {} arg3 可选参数-option
 */
function initPopInput(value,arg1,arg2,arg3){
	var top = document.body.clientHeight/2-80;
	var left = document.body.clientWidth/2-130;
	arg1=arg1||"";
	arg2=arg2||"";
	arg3=arg3||"";
	$ID("inputdiv").innerHTML="<table cellspacing='0'>" +
			"<tr><td><div class=\"title\">请再输入一次价格，以进行确认:</div>" +
			"<div class=\"close\"><a onClick=\"closePopInput();\">" +
			"<img alt=\"关闭\" src=\"images/commonUtil/delete0.gif\"></a></div>" +
			"<div class=\"clearAll\"></div></td></tr><tr><td class=\"inputFrame\">"+
			"<div>当前输入价格：<input id=\"materpriceTotal1\" name=\"materpriceTotal1\" value=\""+value+"\" class=\"inputCur\" readonly></div>"+
			"<div>重新输入价格：<input id=\"materpriceTotal2\" name=\"materpriceTotal2\" value=\"\" class=\"inputRe\"></div></td></tr>" +
			"<tr><td><div align=\"center\">"+
			"<input class=\"buttonOne\" type=\"button\" value=\"确认输入\" onClick=\"popMakeSure();\"> " +
			"<input class=\"buttonOne\" type=\"button\" value=\"取消\" onClick=\"closePopInput();\">" +
			"<input name=\"materpriceid\" class=\"button1\" type=\"hidden\" readonly>"+
			"<input id=\"popTempRrg1\"name=\"popTempRrg1\" type=\"hidden\" value=\""+arg1+"\">" +
			"<input id=\"popTempRrg2\"name=\"popTempRrg2\" type=\"hidden\" value=\""+arg2+"\">" +
			"<input id=\"popTempRrg3\"name=\"popTempRrg3\" type=\"hidden\" value=\""+arg3+"\"></div></td></tr></table>";
	$ID("inputdiv").style.top=top+"px";
	$ID("inputdiv").style.left=left+"px";
	removeClass($ID("inputdiv"),"none");	
}

function initPopInput_detail(price,priceObj_temp,priceObj){
	var top = document.body.clientHeight/2-100;
	var left = document.body.clientWidth/2-130;
	var detail = "<tr><td class=\"reConfirmPriceLists\"><div class=\"listDiv\"><table>";
//	for(var i=0;i<priceObj_temp.length;i++){
//		detail +="<tr>" +
//				"<td>当前输入价格：<input id=\"materprice"+i+"\" name=\"materprice"+i+"\" value=\""+priceObj_temp[i].sprice+"\" class=\"inputCur\" readonly></td>" +
//				"<td>重新输入价格：<input id=\"re_materprice"+i+"\" name=\"re_materprice"+i+"\" value=\"\" class=\"inputRe\" ></td>" +
//				"</tr>"; 
//	}
	var j = 0;
	if(priceObj.length>0){
		detail += "<tr class=\"listHead\">" +
				"<td class=\"col1\">物资</td>" +
				"<td class=\"col2\">报价</td>" +
				"<td class=\"col3\">确认</td></tr>";
	}
	for(var i=0;i<priceObj.length;i++){
		if(i == priceObj_temp[j]){
			//细目为超过30%
			detail +="<tr  class=\"listOdd\">" +
				"<td class=\"col1\">"+priceObj[i].sname+"</td>" +
				"<td class=\"col2\"><input id=\"materprice"+j+"\" name=\"materprice"+j+"\" value=\""+priceObj[i].sprice+"\" class=\"inputCur\" readonly></td>" +
				"<td class=\"col3\"><input id=\"re_materprice"+j+"\" name=\"re_materprice"+j+"\" value=\"\" class=\"inputRe\" ></td>" +
				"</tr>";
			++j;
		}else{
			detail +="<tr>" +
				"<td class=\"col1\">"+priceObj[i].sname+"</td>" +
				"<td colspan=2 class=\"col2\">"+priceObj[i].sprice+"</td>" +
				"</tr>";
		}
	}
	detail += "</table></div><td></tr>";
	
	$ID("inputdiv2").innerHTML="<table cellspacing='0'>" +
			"<tr><td><div class=\"title\">请再输入一次价格，以进行确认:</div>" +
				"</td></tr>" +
			"<tr><td class=\"inputFrame\">" +
			"<div style=\"line-height:30px;\">当前包件总价：<b><input id=\"materpriceTotal1\" name=\"materpriceTotal1\" size=\"15\"" +
			" value=\""+price+"\" readonly></b>明细确认价格如下：</div>"+
			"</td></tr>" +
			detail+
			"<tr><td colspan=4><div align=\"center\">"+
			"<input class=\"buttonOne\" type=\"button\" value=\"确认输入\" onClick=\"popMakeSure_detail("+priceObj_temp.length+");\"> " +
			"<input class=\"buttonOne\" type=\"button\" value=\"取消\" onClick=\"closePopInput();\">" +
			"<input name=\"materpriceid\" class=\"button1\" type=\"hidden\" readonly>"+
			"</div></td></tr></table>";
	$ID("inputdiv2").style.top=top+"px";
	$ID("inputdiv2").style.left=left+"px";
	removeClass($ID("inputdiv2"),"none");
	//removeClass($ID("inputdiv"),"none");	
}

/**
 * 初始化二次输入弹出确认框（多细目情况）
 * @param {} value 需要确认的价格
 * @param {} arg1 可选参数-option
 * @param {} arg2 可选参数-option
 * @param {} arg3 可选参数-option
 */
function initPopInput2(value,arg1,arg2,arg3){
	var top = document.body.clientHeight/2-80;
	var left = document.body.clientWidth/2-200;
	arg1=arg1||"";
	arg2=arg2||"";
	arg3=arg3||"";
	$ID("inputdiv2").innerHTML="<table cellspacing='0'>" +
			"<tr><td><div class=\"title\">请再输入一次价格，以进行确认。请再输入一次价格，以进行确认请再输入一次价格，以进行确认请再输入一次价格，以进行确认:</div>" +
			"</td></tr><tr><td class=\"inputFrame\">"+
			"<div style=\"line-height:30px;\">当前包件总价：<b>"+value+"</b>，明细确认价格如下：</div>"+
			"</td></tr><tr><td class=\"reConfirmPriceLists\"><div class=\"listDiv\"><table>" +
			"<tr class=\"listHead\"><td class=\"col1\">物资</td><td class=\"col2\">报价</td><td class=\"col3\">确认</td></tr>"+
			"<tr class=\"listOdd\"><td class=\"col1\">细目1</td><td class=\"col2\">1111</td><td class=\"col3\"><input type=\"text\" class=\"inputRe\"></td></tr>"+
			"<tr class=\"listEven\"><td class=\"col1\">细目2</td><td class=\"col2\">1111</td><td class=\"col3\"><input type=\"text\" class=\"inputRe\"></td></tr>"+
			"<tr class=\"listOdd\"><td class=\"col1\">细目3</td><td class=\"col2\">1111</td><td class=\"col3\"><input type=\"text\" class=\"inputRe\"></td></tr>"+
			"<tr class=\"listEven\"><td class=\"col1\">细目4</td><td class=\"col2\">1111</td><td class=\"col3\"><input type=\"text\" class=\"inputRe\"></td></tr>"+
			"</table></div><td></tr><tr><td><div align=\"center\">"+
			"<input class=\"buttonOne\" type=\"button\" value=\"确认输入\" onClick=\"popMakeSure();\">&nbsp;&nbsp;" +
			"<input class=\"buttonOne\" type=\"button\" value=\"取消\" >" +
			"<input name=\"materpriceid\" class=\"button1\" type=\"hidden\" readonly>"+
			"<input id=\"popTempRrg1\"name=\"popTempRrg1\" type=\"hidden\" value=\""+arg1+"\">" +
			"<input id=\"popTempRrg2\"name=\"popTempRrg2\" type=\"hidden\" value=\""+arg2+"\">" +
			"<input id=\"popTempRrg3\"name=\"popTempRrg3\" type=\"hidden\" value=\""+arg3+"\"></div></td></tr></table>";
	$ID("inputdiv2").style.top=top+"px";
	$ID("inputdiv2").style.left=left+"px";
	removeClass($ID("inputdiv2"),"none");	
}

/**
 * 关闭二次输入确认框
 */
function closePopInput(flag){
	flag = false||flag;
	addClass($ID("inputdiv"),"none");
	addClass($ID("inputdiv2"),"none");
//	if(flag&&typeof(returnPopResult)=="function"){
//		//可实现的接口方法,可通过 $ID("popTempRrg1").value, $ID("popTempRrg2").value, $ID("popTempRrg3").value 做辅助参数，即initPopInput方法的三个参数
//		returnPopResult($ID("popTempRrg1").value,$ID("popTempRrg2").value,$ID("popTempRrg3").value);
//	}
	if(flag){
		var bidType = parent.currentProjBidType;//获取项目竞价类型(竞买/竞卖)
		var totalMoney = $('materpriceTotal1').value;
		bid.fBid(priceObj, $("mCount").value,bidType,totalMoney);
	}
	$ID("inputdiv").innerHTML="";
	$ID("inputdiv2").innerHTML="";
	
	$ID("bidBtnId").disabled = false;
}
/**
 * 校验两次输入
 * @return {Boolean}
 */
function popMakeSure(){
	if(trim($ID("materpriceTotal1").value)==trim($ID("materpriceTotal2").value)){
		closePopInput(true);
		return true;
	}else{
		alert("对不起，两次输入的价格不一致，请重新输入价格。");
		return false;
	}
}

function popMakeSure_detail(l){
	for(var i=0;i<l;i++){
		if(trim($ID("materprice"+i).value)!=trim($ID("re_materprice"+i).value)){
			alert("对不起，两次输入的细目价格不一致，请重新输入价格。");
			return false;
		}
	}
	closePopInput(true);
	return true;
}


