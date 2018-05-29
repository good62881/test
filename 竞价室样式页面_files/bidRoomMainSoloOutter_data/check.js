/**
 * js公共校验方法集 and javascript部分公共方法
 * 整理&编写 by yang
 * 
 * 说明：校验参数以 校验值，校验名称和控件的name组成。
 * 其中，控件的name可为空，当不为空时，校验出错后页面提示后
 * 会把焦点放在name对应的控件上；为空时，校验出错后只提示不
 * 做其他处理。
 * 若不需要焦点控制，则对name传参0或者传参null
 */

/**
 * 判断是否由字母或数字组成
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:符合规范 false:不符合规范
 */
function isNormalNum(value,notes,name)
{
	patrn=/^[A-Za-z0-9]+$/;
	return checkPatrnString(patrn,value,notes,
				"是由字母或数字组成。请重新输入",name);
}



/**
 * 计算给定字符串的长度  一个汉字占2个字符
 * @param stringInfo
 * @returns
 */
function computeChinese(arg) { 
	var len=0;
    for(i = 0; i < arg.length; i++){
    	if(arg.charCodeAt(i) > 128){
    		len=len+2;
    	}else{
    		len=len+1;
    	}
    } 
    return len;
   }


/**
 * IP地址校验
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是ip false:不是ip
 */
function isIP(value,notes,name)
{
    var patrn=/^(([2][0-5][0-5]|[1]?[0-9]?[0-9])[.]){3}([2][0-5][0-5]|[1]?[0-9]?[0-9])$/;
   	return checkPatrnString(patrn,value,notes,
				"的格式不正确。请重新输入",name);
}
/**
 * 校验是否为非负整数
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是非负整数 false:不是非负整数
 */
function isNoneNeInt(value,notes,name)
{
    var patrn=/^\d+$/;
    return checkPatrnString(patrn,value,notes,
				"的格式只能为非负整数。请重新输入",name);
}
/**
 * 校验是否为正整数
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是正整数 false:不是正整数
 */
function isPositiveInt(value,notes,name)
{
    var patrn=/^[0-9]*[1-9]+[0-9]*$/;
    return checkPatrnString(patrn,value,notes,
				"的格式只能为正整数。请重新输入",name);
}
/**
 * 是否长度为length的数字字符串
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @param length 字符的长度
 * @return {Boolean} true:是长度为length的数字字符串 
 * 					false:不是长度为length的数字字符串
 */
function isCode(value,notes,name,length)
{
    var patrn=  eval("/^[0-9]{"+length+"}$/ig");
    return checkPatrnString(patrn,value,notes,
				"的格式只能为长度为"+length+"的数字字符串。请重新输入",name);
}
/**
 * 校验是否为字母字符串
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是字母 false:不是字母
 */
function isLetter(value,notes,name)
{
    var patrn=/^[a-zA-Z]+$/;
     return checkPatrnString(patrn,value,notes,
				"的格式必须都为字母。请重新输入",name);
}
/**
 * 校验用户名是否为符合要求
 * 【长度6~18，只能由字母，数字和下划线组成，而且下划线不能在开始和结尾
 * 用户名不能以数字开头】
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:符合要求 false:不符合要求
 */
function isUser(value,notes,name)
{
    var patrn=/^[a-zA-Z][a-zA-Z0-9_]{4,16}[a-zA-Z0-9]$/;
    return checkPatrnString(patrn,value,notes,
				"的格式不符合要求，请确认输入的用户名由字母，数字和下划线组成，长度大于6小于18，且用户名首字符只能为字母。请重新输入",name);
}
/**
 * 登陆用户名是否规范
 * @param {} value
 * @param {} notes
 * @param {} name
 * @return {}
 */
function isloadUser(value,notes,name)
{
    var patrn=/^[a-zA-Z][a-zA-Z0-9_]{4,16}[a-zA-Z0-9]$/;
    return checkPatrnString(patrn,value,notes,
				"不能为空或格式不对。请重新输入",name);
}
/**
 * 校验是否为非负浮点数（适用于重量，金额等）
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是非负浮点数 false:不是非负浮点数
 */
function isNoneNeFloat(value,notes,name)
{
    var patrn=/^\d+(\.\d+)?$/;
    return checkPatrnString(patrn,value,notes,
				"的格式为非负浮点数。请重新输入",name);
}
/**
 * 校验是否为日期 如2010-07-07 或10-07-10 但不能判断10-02-31的正确性
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是日期 false:不是日期
 */
function isDate(value,notes,name)
{
    var patrn=/^(d{2}|d{4})-?((0([1-9]{1}))|(1[1|2]))-?(([0-2]([1-9]{1}))|(3[0|1])|([1|2]0))$/;
    return checkPatrnString(patrn,value,notes,
				"的格式为日期，例：2008-08-08 。请重新输入",name);
}
/**
 * 校验电话号码（固话，非铁路内网）：(0xxx-)xxxxxxxx(-xxx)
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:固话符合要求 false:不符合要求
 */
function isTelNormal(value,notes,name)
{
    var patrn=/^((0\d{2,3})-)(\d{5,8})(-\d{2,})*$/;
    return checkPatrnString(patrn,value,notes,
				"的格式为固定电话格式，区号，号码和分机号要以-分开,如028-1234567,028-1234567-210。请重新输入",name);
}
function isTelFormat(value,notes,name)
{
	 var patrn=/^[+]*(\d|-)+$/;
	 return checkPatrnString(patrn,value,notes,
			"的格式应该为数字，区号，号码和分机号要以-分开。请重新输入",name);
}
/**
 * 校验电话号码（固话，铁路内网五位）：xxxxx
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:固话符合要求 false:不符合要求
 */
function isTelRailway(value,notes,name)
{
    var patrn=/^\d{5}$/;
    return checkPatrnString(patrn,value,notes,
				"的格式为铁路内网电话格式，为5位数字。请重新输入",name);
}
/**
 * 校验手机号码 1开头的11位数字字符，10000000000也可以通过
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:手机号码符合要求 false:手机号码不符合要求
 */
function isMobil(value,notes,name)
{
    var patrn=/^[1]\d{10}$/ ;
    return checkPatrnString(patrn,value,notes,
				"的格式为长度为11位的手机格式,如13888888888。请重新输入",name);
}
/**
 * 校验是否是电子邮箱地址
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:符合email要求 false:不符合email要求
 */
function isEmail(value,notes,name)
{
	var patrn=/^[A-Za-z0-9]\w*@[A-Za-z0-9]+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return checkPatrnString(patrn,value,notes,
				"的格式为邮箱格式，如mrlin@126.com。请重新输入",name);
} 
/**
 * 校验是否是中文字符（unicode编码）
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是中文字符 false:不是中文字符
 */
function isChinese(value,notes,name)
{
	var patrn=/^[\u4e00-\u9fa5]+$/;
	return checkPatrnString(patrn,value,notes,
				"的格式为中文字符，请规避非常用字符。请重新输入",name);
}
/**
 * 校验是否是邮政编码
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是邮政编码 false:不是邮政编码
 */
function isPostalCode(value,notes,name)
{
	var patrn=/^[0-9]{6}$/;
	return checkPatrnString(patrn,value,notes,
				"的格式为6位数字。请重新输入",name);
}
/**
 * 校验是否为非负浮点数,特定小数点后长度为length（适用于重量，金额等）
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:是非负浮点数 false:不是非负浮点数
 */
function isNoneNeFloat(value,notes,name,length){
	var patrn=eval("/^\d+(\.\d{1,"+length+"})?$/ig");
    return checkPatrnString(patrn,value,notes,
				"的格式为非负浮点数,且小数点后数字长度为"+length+",请重新输入",name);
}
/**
 * 校验是否为一般金额，小数点后最多两位小数
 * @param {} value
 * @param {} notes
 * @param {} name
 */
function isNormalPrice(value,notes,name){
	var patrn=/^\d+(\.\d{1,2})?$/;
    return checkPatrnString(patrn,value,notes,
				"的格式为金额,小数点后数字长度最多为2,请重新输入",name);
}

function isOrgCodeSimply(value,notes,name){
	var patrn=/^[0-9A-Za-z]{8}-[0-9Xx]$/;
	return checkPatrnString(patrn,value,notes,
				"的格式为连续八位数字+英文横杠+数字或x,例66666666-x,请重新输入",name);
}
/**
 * 校验是否为空(去除空格后)
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:不为空 false:为空
 */
function isNULL(value,notes,name)
{
	if(value==null||trim(value).length <= 0)
	{
		$error("对不起，"+notes+"不能为空，请重新输入");
		if(name != null && name != 0)
			focusMe(name);
		return false;
	}
	return true;
}
/**
 * 校验是否为空(去除空格后)
 * @param Value 值
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:不为空 false:为空
 */
function isNULL_a(value)
{
	if(value==null||trim(value).length <= 0){
		return true;
	}
	return false;
}
/**
 * 验证是否有特殊字符
 * @param {} value
 * @param {} notes
 * @param {} name
 * @return {}
 */
function isNormalStr(value,notes,name)
{
	var patrn=/^[\D\d]*[\'\"\~!@#\$%\^&*\[\]\(\)\-\+\=\|\\\/]+[\D\d]*$/;
	return checkPatrnStringDiff(patrn,value,notes,
				"的格式不能为特殊字符,请重新输入",name);
}

/**
 * 验证公告正文的【字符长度】是否比最大允许的长度小
 * @param inputStr
 */
function isNoticeNotOverSize(inputStr){
	return isStringNotOverSize(40000);
}

/**
 * 验证输入字符的【字节长度】是否比最大允许的长度小
 * @param inputStr
 */
function isStringNotOverSize(inputStr,maxLength){
	return getStringByteLength(inputStr)<=maxLength;
}

/**
 * 校验是否为空(去除空格后)
 * @param notes 名称
 * @param name 控件的name
 * @return {Boolean} true:不为空 false:为空
 */
function isNULL_b(notes,name)
{
	var value="";
	if($("[name='"+name+"']")){
		value = $("[name='"+name+"']").val();
	}else{
		value = $(name).value;
	}
	if(trim(value).length <= 0 || value==null )
	{
		$error("对不起，"+notes+"不能为空，请重新输入");
		if(name != null && name != 0)
			focusMe(name);
		return true;
	}
	return false;
}
/**
 * 校验和判断方法(与patrn一致为正确)
 * @param {} patrn 正则表达式
 * @param {} value 校验值
 * @param {} note1 待校验的值名称
 * @param {} note2 校验说明
 * @param {} name  控件的name
 * @return {Boolean}
 */
function checkPatrnString(patrn,value,note1,note2,name){
	if($("[name='"+name+"']")){
		var nameObj = $("[name='"+name+"']");
		nameObj.val(trim(nameObj.val()));
		if (!patrn.exec(trim(value)))
		{
			$error("对不起，"+note1+note2);
			if(name != null && name != 0)
				nameObj.focus();
			return false;
		}else
			return true;
	}else{
		$(name).value = trim($(name).value);
		if (!patrn.exec(trim(value)))
		{
			$error("对不起，"+note1+note2);
			if(name != null && name != 0)
				eval($(name).focus());
			return false;
		}else
			return true;
	}
	
}

/**
 * 校验和判断方法(与patrn不一致为正确)
 * @param {} patrn 正则表达式
 * @param {} value 校验值
 * @param {} note1 待校验的值名称
 * @param {} note2 校验说明
 * @param {} name  控件的name
 * @return {Boolean}
 */
function checkPatrnStringDiff(patrn,value,note1,note2,name){
	if (patrn.exec(trim(value)))
	{
		$error("对不起，"+note1+note2);
		if(name != null && name != 0)
			focusMe(name);
		return false;
	}else
		return true;
}
//根据不同的js控件判断焦点集中的方式
function focusMe(name){
	if($("[name='"+name+"']")){//jQuery
		$("[name='"+name+"']").focus();
	}else{//protoType
		eval($(name).focus());
	}
}

/*
限制只你能输入数字(style="ime-mode:disabled"屏蔽输入法onpaste="return false;"禁止粘贴)
8：退格键
46：delete
37-40： 方向键
48-57：小键盘区的数字
96-105：主键盘区的数字
110、190：小键盘区和主键盘区的小数点
189、109：小键盘区和主键盘区的负号
13：回车
9： Tab 
*/
function myIntKeyDown()
{
    var k=window.event.keyCode;   
    if ((k==46) || (k==8) || (k>=48 && k<=57) || (k>=96 && k<=105) || (k>=37 && k<=40)) 
    {}
    else if(k==13 || k==9)
	{
       window.event.keyCode = 9;
	}
    else
	{
       window.event.returnValue = false;
	}
}
/*
限制不能输入汉字(style="ime-mode:disabled"屏蔽输入法onpaste="return false;"禁止粘贴)
8：退格键
46：delete
37-40： 方向键
48-57：小键盘区的数字
96-105：主键盘区的数字
110、190：小键盘区和主键盘区的小数点
189、109：小键盘区和主键盘区的负号
13：回车
9： Tab 
*/
function mychineseKeyDown()
{
    var k=window.event.keyCode;   
    if ((k==46) || (k==8) || (k>=48 && k<=57) || (k>=96 && k<=105) || (k>=37 && k<=40) || (k>=65 && k<=90) || (k>=97 && k<=122)) 
    {}
    else if(k==13 || k==9)
	{
       window.event.keyCode = 9;
	}
    else
	{
       window.event.returnValue = false;
	}
}
/*
限制只你能输入数字和小数点(style="ime-mode:disabled"屏蔽输入法onpaste="return false;"禁止粘贴)
8：退格键
46：delete
37-40： 方向键
48-57：小键盘区的数字
96-105：主键盘区的数字
110、190：小键盘区和主键盘区的小数点
189、109：小键盘区和主键盘区的负号
13：回车
9： Tab 
*/
function myFloatKeyDown()
{
    var k=window.event.keyCode;   
    if ((k==46)||(k==8)||(k==190)||(k==110)|| (k>=48 && k<=57)||(k>=96 && k<=105)||(k>=37 && k<=40)) 
    {}
    else if(k==13 || k==9)
	{
       window.event.keyCode = 9;
	}
    else
	{
       window.event.returnValue = false;
	}
}
/*
	回车效果同Tab
*/
function EnterToTab()  
{  
      var element = event.srcElement;  
      if(event.keyCode=='13')  
      {  
          if(element.tagName=='INPUT'&&(element.type=='text' || element.type=='image'))  
          {  
              event.keyCode='9';  
          }  
		  else if(element.tagName=='SELECT')
		  {
              event.keyCode='9'; 
          }
      } 
}  

/*
 * 进入iframe子页面
 */
var displaymode=0;
function jumpto(inputurl){
	if (document.getElementById&&displaymode==0)
		document.getElementById("external").src=inputurl;
	else if (document.all&&displaymode==0)
		document.all.external.src=inputurl;
	else{
		if (!window.win2||win2.closed)
			win2=window.open(inputurl);
		//else if win2 already exists
		else{
			win2.location=inputurl;
			win2.focus();
		}
	}
}

/**
 * 整个表格拷贝到EXCEL中
 * @param {} tableid
 */
function saveTableById(tableid) {  
  
    var curTbl = document.getElementById(tableid);    
    var oXL = new ActiveXObject("Excel.Application");      
    var oWB = oXL.Workbooks.Add();    
    var xlsheet = oWB.Worksheets(1);      
    var sel = document.body.createTextRange();    
    sel.moveToElementText(curTbl);    
    sel.select();       
    sel.execCommand("Copy");         
    xlsheet.Paste();          
    oXL.Visible = true;       
  
    try{   
        var fname = oXL.Application.GetSaveAsFilename("save.xls", "Excel Spreadsheets (*.xls), *.xls");   
        if(fname){   
            oWB.SaveAs(fname);   
        }          
    }catch(e){  
    	alert("保存失败，请重新保存。失败原因为："+e);
    }finally{   
        oWB.Close(savechanges=false);   
        oXL.Quit();   
        oXL=null;   
        idTmr = window.setInterval("CleanUpTable();",1);   
    }   
}    
function CleanUpTable() {   
    window.clearInterval(idTmr);   
    CollectGarbage();   
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
 * 比较两个值的大小
 * @param a
 * @param b
 */
function isBigger(a,b){
	var aVal = $(a).value;
	var bVal = $(b).value;
	if(aVal>bVal) return true;//a>b
	else	return false;
}
  
//验证重量KG,金额Y,
function isYKG(s,sname,fname)
{
    var patrn=/^\d+[.]?\d*$/;
    if (!patrn.exec(s))
	{
		alert("请输入正确的“ "+sname+" ”格式");
		eval($(fname).select());
		return false;
	}
	return true;
}

/**
 *  单条数据交换
 * 	select-->select数据交互(单条)
 * 	调用方法：javascript:selectAddOnly('select名1','select名2')  （左到右）
 * 	javascript:selectAddOnly('select名2','select名1')  （右到左）
*/
function selectAddOnly(select1,select2)
{
	var checkstr = "";
		var checklen = document.getElementById(select2).options.length;
		if(checklen != 0){
			for(var temp = 0;temp<checklen;temp++){
				checkstr += document.getElementById(select2).options[temp].value+",";
			}
		}
	if(document.getElementById(select1).value!="")
	{
		var i=document.getElementById(select1).selectedIndex;
		document.getElementById(select1).options[i].selected=true;
		var v=document.getElementById(select1).options[i].value;
		var txt=document.getElementById(select1).options[i].text;
		if(trim(v)!="")
		{
			if(checkstr.indexOf(v) < 0){
				document.getElementById(select2).options[document.getElementById(select2).options.length]=new Option(txt,v);
				document.getElementById(select1).options.remove(i);
			}else{
				document.getElementById(select1).options.remove(i);
			}
		}
	}
	else
	{
		alert("请选择有效数据");
	}
}

/**
 * 数据交换
 * @author yang
 * @param {} select1   from
 * @param {} select2   to	
 */
function selectAddMuch(select1,select2)
{
	if(document.getElementById(select1).value!=""){
		var checkstr = "";
		var checklen = document.getElementById(select2).options.length;
		if(checklen != 0){
			for(var temp = 0;temp<checklen;temp++){
				checkstr += document.getElementById(select2).options[temp].value+",";
			}
		}
		if(checklen == 0)//当置入选择栏为空时
			while(document.getElementById(select1).value!="")
			{
				var i=document.getElementById(select1).selectedIndex;
				var v=document.getElementById(select1).options[i].value;
				var txt=document.getElementById(select1).options[i].text;
				document.getElementById(select2).options[document.getElementById(select2).options.length]=new Option(txt,v);
				document.getElementById(select1).options.remove(i);
				txt = null;
				v   = null;
				i   = null;
			}
		else
			while(document.getElementById(select1).value!="")
			{
				var i=document.getElementById(select1).selectedIndex;
				var v=document.getElementById(select1).options[i].value;
				var txt=document.getElementById(select1).options[i].text;
				if(checkstr.indexOf(v) < 0){
					document.getElementById(select2).options[document.getElementById(select2).options.length]=new Option(txt,v);
					document.getElementById(select1).options.remove(i);
				}else{
					document.getElementById(select1).options.remove(i);
				}
				txt = null;
				v   = null;
				i   = null;
			}
		checkstr = null;
	}else
	{
		alert("请选择有效数据");
	}
}
//屏蔽错误信息
/*
window.onerror   =   function   Nopop(){   
  return   true;   
  };
*/
function ltrim(s)
{ 
return s.replace( /^\s*/, ""); 
}  
function rtrim(s)
{ 
return s.replace( /\s*$/, ""); 
} 
/**
 * 去除空格字符
 * @param {} s 待处理字符串
 * @return 处理后字符串
 */
function trim(s)
{ 
return rtrim(ltrim(s)); 
}
/**
 * 页面text表单去空格
 */
function formatText() {
	var vect = document.body.getElementsByTagName("input");
	for(var i=0;i<vect.length;i++)
	{
	   if(vect[i].type == "text"){//去掉所有text类型左右两端的空格
	    vect[i].value = trim(vect[i].value);
	   }
	}
}
/**
 * 格式化表单（加校验）
 */
function formatForm(){
	formatText();//去除空格
}

/**
 * 判断输入的内容是否超长
 * @param id:控件ID
 * @param maxL：最大长度
 */
function checkTextAreaMaxLength(id,maxL){
	var lengthVar = document.getElementById(id).value.toString().length;
	if(lengthVar>maxL){
		//长度超长
		return true;
	}
	return false;
}

/**
 * 为兼容jquery库，用$id()代替之前prototype的$()
 * 优先级：
 * id>name(只取第一个对象)>protoType对象（id+name）
 */
var $id = function(id){
	if(document.getElementById(id)){
		return document.getElementById(id);
	}else
		if(document.getElementsByName(id)){
			return document.getElementsByName(id)[0];
		}else{
			//prototype源码
			var elements = new Array();
			for (var i = 0; i < arguments.length; i++) {
			    var element = arguments[i];
			    if (typeof element == 'string')
			      element = document.getElementById(element);
			    if (arguments.length == 1)
			      return element;
			    elements.push(element);
			}
  			return elements;
		}
};
/**
 * 计算给定字符的字节长度
 * @param stringInfo
 * @returns
 */
var getStringByteLength = function(stringInfo){
	return stringInfo.replace(/[^x00-xFF]/g,'**').length;
};


/**
 * 显示消息,页面需要有id为commonInfoArea的div用于显示
 * @param infoTxt
 * @returns
 */
var $info = function(infoTxt){
	document.getElementById("commonInfoArea").innerHTML = infoTxt;
};
/**
 * 错误提示的方法
 */
var $error = function(errorInfo){
	if(document.getElementById("commonInfoArea")){
		$info("<a style=\"color:red\">"+errorInfo+"</a>");
	}else{
		alert(errorInfo);
	}
};

function ColumnLength(name,nameVal,len){
		var strLenth = getStringByteLength($("#"+name).val());
		if(strLenth>=len){
			$error("对不起，"+nameVal+"字符长度过大，请重新输入");
			$("#"+name).focus();
			return false;
		}
		return true;
}