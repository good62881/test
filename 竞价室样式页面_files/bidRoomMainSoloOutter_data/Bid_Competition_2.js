	var priceObj = [];		//报价对象
	var priceObj_prev = [];	//保留初始的报价对象
	var colorFlag = 1;		//样式标志
	var countInterval ;		//计时ID
	var currentUnit = 0;	//当前步长
	var countUnitClick = 1; //记录点击步长按钮次数
	var scurrentPrice = 0;	//当前最新价
	var quickClick = false;
	var bidFailed = false;
	var bidType = parent.currentProjBidType;//获取项目竞价类型(竞买/竞卖)
	var currentPackPayType = parent.currentPackPayType;
	var detailList_temp = null;
	var matrialNum = 0;
	function init(str_room_id,str_proj_id,str_pack_id,str_mode) {
		if(parent.loginUnitType == "03")
			$('menuTab2').style.display = "none";
		$('memo').innerHTML = parent.ale;
		dwr.engine.setActiveReverseAjax(true);
		bid.fInit(str_room_id,str_proj_id,str_pack_id,str_mode);
	}
	
	function errorPrompt (errorObj, isError){
		alert(isError);
		errorObj.style.color = "red";
		errorObj.select();
	}
	
	function playSound()
	{
		$(bgs).src="../../sound/msg.wav";
	}
	
	function updatePackage(Package) {
		var priceMode = $("Mode").value;
		
		$("countDown_counting").innerHTML = Package[0].sremainingtime;
		//$("countDown").innerHTML = Package[0].sremainingtime;
		$('currentPrice').innerHTML = Package[0].scurrentprice;
		scurrentPrice = Package[0].scurrentprice;
		//更新延时时间  延时次数
		updateBidPostPone(Package[0].bid_postpone,Package[0].postponecount);
		if(priceMode != 1)
		{
			//$('currentPrice_bidder').innerHTML = Package[0].scurrentprice_bidder;
		}
	}
		
	function updateDetails(Details) {
		var priceMode = $("Mode").value;
		if(priceMode !=1){
			for(var i=0;i<Details.length;i++){
				var detail = Details[i];
				var addUnit = detail.unitBid;
				var sid = detail.sid;
				$('addUnit'+sid).innerHTML = addUnit;
			}
			//初始化单条细目下的情况
			if(Details.length == 1){
				var currentPrice = $('currentPrice').innerHTML ;
				$('currentPrice').innerHTML = currentPrice +"/" + divfloat(parseFloat(currentPrice) , parseFloat(matrialNum));
			}
		}
		
	}
	function updateTotalPrice(){
		//testXH("updateTotalPrice-Strat");
		var priceMode = $("Mode").value;
		if(priceMode == 3){
			if(matrialNum != 0){
				//初始化单条细目下的情况
				var currentPrice_bidder = $('packSumPriceId').innerHTML;
				$('currentPrice_bidder').innerHTML = currentPrice_bidder + "/" + divfloat(parseFloat(currentPrice_bidder), parseFloat(matrialNum));
			}else{
				$('currentPrice_bidder').innerHTML = $('packSumPriceId').innerHTML;
			}
		}
		//testXH("updateTotalPrice-End");
	}
	function countDown() {
		countInterval = setInterval(function() {
			var countDown_Pack = $("countDown_counting");
			var countDown_Disp = $("countDown");
			var ss_Pack = countDown_Pack.innerHTML;
			if(ss_Pack > 60)
			{
				countDown_Disp.innerHTML = converseTime(ss_Pack - 1);
				countDown_Pack.innerHTML = ss_Pack - 1;
			}
			else if(ss_Pack > 30)
			{
				countDown_Disp.innerHTML = "<font>小于1分钟</font>";
				countDown_Pack.innerHTML = ss_Pack - 1;
			}
			else if(ss_Pack > 20)
			{
				countDown_Disp.innerHTML = "<font>小于30秒</font>";
				countDown_Pack.innerHTML = ss_Pack - 1;
			}
			else if(ss_Pack > 10)
			{
				countDown_Disp.innerHTML = "<font>小于20秒</font>";
				countDown_Pack.innerHTML = ss_Pack - 1;
			}
			else if(ss_Pack > 0)
			{
				countDown_Disp.innerHTML = "<font>小于10秒</font>";
				countDown_Pack.innerHTML = ss_Pack - 1;
			}
			else
			{
				countDown_Disp.innerHTML = "<font>关闭中...</font>";
				window.clearInterval(countInterval);
			}
		}, 1000);
	}

	function updateMessages(MessageTableName, Messages) {
		for ( var i = 0; i < Messages.length; i++) {
			var rowData = Messages[i];
			var row = $(MessageTableName).insertRow(1);
			//row.style.backgroundColor='#FFFFFF';
			if(colorFlag==1){
				row.setAttribute("className","a3");
				colorFlag = 0;
			}else{
				row.setAttribute("className","a4");
				colorFlag = 1;
			}
			//row.className = "a2";
			
			var cell = row.insertCell(0);
			cell.innerHTML = rowData.sbiddingdate;
			cell = row.insertCell(1);
			//cell.style.color = "red";
			cell.innerHTML = rowData.sdescription;
			}
		playSound();
		$("bid").disabled = false;
	}
	function updateFailedMessages(MessageTableName, Messages){
		var mss = $('messageList');
		var v = "";
		for(var i=0;i<Messages.length;i++){
			if(i%2==1)
				v += '<li class="listOdd">';
			else
				v += '<li class="listEven">';
			v += '<span class="col2">'+ converseTime(Messages[i].sbiddingdate) +'</span>'+
				 '<span class="col1">'+ Messages[i].sdescription+'</span></li>';
			alert(Messages[i].sdescription);
		}
		mss.innerHTML = v + mss.innerHTML ;
		$("bidBtnId").disabled = false;
		bidFailed = true;
		alert("报价失败，请查看报价信息");
		return ;
		//playSound();
	}
	
	function errorMessages(DetailTableName, MessageTableName, errorMessages) {
		var tableObj = $(DetailTableName);
		var priceMode = $("Mode").value;
		for ( var j = 0; j < errorMessages.length; j++) {
			var errorData = errorMessages[j];

			if(priceMode == 1)
			{
				errorPrompt($("tbPackage").rows[2].cells[4].children[0],errorData.description);
			}
			else
			{
				alert(errorData.description);
			}
			
			var mss = $('messageList');
			var v = '<li class="listEven"><span class="col2">'+converseTime(errorData.bidding_date) +'</span><span class="col0">'+errorData.description+'</span></li>';
			mss.innerHTML = v + mss.innerHTML ;
		}
		playSound();
		$("bidBtnId").disabled = false;
		bidFailed = true;
	}

	function sendPrices() {
		$("bidBtnId").disabled = true;
		var tableObj = $("packDetailTab");
		var bidType = parent.currentProjBidType;//获取项目竞价类型(竞买/竞卖)
		priceObj = [];			//初始化对象
		var priceMode = $("Mode").value;
		var total_money = 0;
		var scurrentPrice = $("currentPrice").innerHTML; 
		if(priceMode == 1)
		{//总价模式
			if(scurrentPrice!="0" && scurrentPrice!=""){
				scurrentPrice = scurrentPrice;
			}else{
				scurrentPrice = $("basePrice").innerHTML;
				scurrentPrice = scurrentPrice;
			}
			total_money = $("myPriceTxt").value;
			if(isYKG(total_money,"报价")==false){
				$("bidBtnId").disabled = false;
				return false;
			}
			if(parseFloat(total_money) == 0){
				alert("录入价格不能为0！");
				$("bidBtnId").disabled = false;
				return false;
			}
			priceObj.push({
				sid : "none",
				sprice : "none",
				smoney : total_money
			});
		}
		else if(priceMode == 2)
		{//明细报价模式
			//alert("明细报价模式");
			for ( var i = 1; i < tableObj.rows.length; i++) {
				var mx_money = tableObj.rows[i].cells[9].children[0].value;
				//alert("mx_money:"+mx_money);
				if(isYKG(mx_money,"报价")==false){
					$("bidBtnId").disabled = false;
					return false;
				}
				priceObj.push({
					sid : tableObj.rows[i].cells[1].innerHTML,
					sprice : tableObj.rows[i].cells[8].innerHTML,
					smoney : mx_money
				});
				mx_money = mx_money;
				//alert("mx_money:"+mx_money);
				//total_money = total_money+mx_money;
				total_money = parseFloat(total_money)+parseFloat(mx_money);
				//alert("报价："+total_money);
				tableObj.rows[i].cells[9].children[0].style.color = "#454545";
			}
			//testXH("明细模式正常结束");
		}
		else if(priceMode == 3)
		{//单价报价模式
			//alert("单价报价模式");
			if(scurrentPrice!="0" && scurrentPrice!="" && scurrentPrice.indexOf("0/0")<0){
				scurrentPrice = scurrentPrice;
			}else{
				scurrentPrice = parseFloat($('basePrice').innerHTML);
			}
			
			for ( var i = 0; i < detailList_temp.length; i++) {
				var dj_money = $('detail'+detailList_temp[i].sid).value;
				if(isYKG(dj_money,"报价")==false){
					$("bidBtnId").disabled = false;
					return false;
				}
				if(parseFloat(dj_money) == 0){
					alert("细目价格不能为0！");
					$("bidBtnId").disabled = false;
					return false;
				}
				var wz_num = detailList_temp[i].smaterialnum;
				wz_num = parseFloat(wz_num);
				dj_money = parseFloat(dj_money);
				var detail_total_price = mulfloat(wz_num , dj_money);
				priceObj.push({
					sname:detailList_temp[i].smaterialname,
					skilldesc:detailList_temp[i].sskilldesc,
					sid : detailList_temp[i].sid,
					sprice : dj_money,//细目单价
					smoney : detail_total_price//细目总价
				}); 
				total_money = addfloat(parseFloat(total_money), mulfloat(parseFloat(dj_money), parseFloat(wz_num)));
			}
		}
		if($("countDown").innerHTML == "关闭中..."){
			alert("包件正在关闭,报价无效");
			return false;
		}
		//竞买情况下，报价高于当前最低价时  返回
		if(bidType=='1' && parseFloat(total_money)>=parseFloat(scurrentPrice)){
			alert("报价必须低于当前最低价,您的报价无效.");
			$("bidBtnId").disabled = false;
			return false;
		}
		//竞卖情况下，报价低于当前最低价时  返回
		if(bidType=='2' && parseFloat(total_money)<=parseFloat(scurrentPrice)){
			alert("报价必须高于当前最低价,您的报价无效.");
			$("bidBtnId").disabled = false;
			return false;
		}
		
		//价格变动较大，显示校验框
		//if(scurrentPrice*0.3 < Math.abs(parseFloat(total_money)-parseFloat(scurrentPrice))){
		if(isOverPrice(scurrentPrice,total_money)){
			if(1 == priceMode){//总价模式，不需要计算单价细目的溢出情况
				showReInput(total_money);
			}else if(3 == priceMode){//单价模式，需要计算单价的溢出情况
				var priceObj_temp = [];//临时存储超过30%的细目信息
				var j=0;
				for(var i=0;i<priceObj.length;i++){
					if(isOverPrice(priceObj_prev[i].sprice,priceObj[i].sprice)){
						//priceObj_temp[j] = priceObj[i];
						priceObj_temp[j] = i;
						j++;
					}
				}
//				<%--显示超过30%的细目价格确认框--%>
				showReInput_detail(total_money,priceObj_temp,priceObj);
			}
			return false;
		}
		bid.fBid(priceObj, $("mCount").value,bidType,total_money);
	}
	
//	<%--判断录入价格是否大于之前价格30%--%>
	function isOverPrice(prevPrice,currentPrice){
//		alert("prevPrice:"+prevPrice+" currentPrice:"+currentPrice+" prevPrice*0.3="+prevPrice*0.3+"<Math.abs(parseFloat(prevPrice)-parseFloat(currentPrice))="+Math.abs(parseFloat(prevPrice)-parseFloat(currentPrice)));
		prevPrice = prevPrice + "";
//		alert(typeof(prevPrice));
		var re1 = prevPrice.indexOf("/");
		if(re1>=0){
			prevPrice = prevPrice.substr(0,parseInt(re1));
		}
		if(parseFloat(prevPrice)*0.3 < Math.abs(parseFloat(prevPrice)-parseFloat(currentPrice))){
		 	return true;
		}else{
			return false;
		}
	}
	
	function getAll(price)
	{
		//testXH("getAll-Strat"+price);
		
		updateBidUnit(price);
		bid.fSendAll($("mCount").value,
				function (map){
					updatePackage(map.Package);
					updateDetails(map.Details);
					var priceMode = $("Mode").value;
					if(priceMode !=3){
						updateBidQuickBid(price,map.Package[0].scurrentprice);
					}else{
						updateBidQuickBid_detail();
					}
					playSound();
					$("bidBtnId").disabled = false;
				}
			);
		priceObj_prev = priceObj;
		//testXH("getAll-End"+price);
	}
//未购买包件
function bidderNotBuyPack(){
	parent.document.getElementById("external").src = "jsp/bid_Competition/bid2.0/Testing.jsp?noBuyPack=y";
	parent.$('bidRoomContentsId').style.display = "none";
}
//未签到
function bidderNotHerePack(){
	parent.document.getElementById("external").src = "jsp/bid_Competition/bid2.0/Testing.jsp?noSign=y";
	parent.$('friendlyTipId').innerHTML = "您没有签到，不能参与该包件";
	parent.$('qdbj').style.display = 'none';
//	alert("您没有签到，不能参与！");
//	parent.$('bidRoomContentsId').style.display = "none";
}
function converseTime(mySecond){
	mySecond = parseInt(mySecond);
	var hour = Math.floor(mySecond/3600);
	mySecond = mySecond%3600;
	var minute = Math.floor(mySecond/60);
	mySecond = mySecond%60;
	
	var mytime = "";
	if(hour>0){
		if(hour<10){
			mytime = mytime+"<font>0"+hour+"</font>时";
		}else{
			mytime = mytime+"<font>"+hour+"</font>时";
		}
	}else{
		mytime = mytime+"<font>00</font>时";
	}
	if(minute>0){
		if(minute<10){
			mytime = mytime+"<font>0"+minute+"</font>分";
		}else{
			mytime = mytime+"<font>"+minute+"</font>分";
		}
	}else{
		mytime = mytime+"<font>00</font>分";
	}
	if(mySecond>0){
		if(mySecond<10){
			mytime = mytime+"<font>0"+mySecond+"</font>秒";
		}else{
			mytime = mytime+"<font>"+mySecond+"</font>秒";
		}
	}else if(mySecond==0){
		mytime = mytime+"<font>00</font>秒";
	}
	
	return mytime;
}
//验证重量KG,金额Y,
function isYKG(s,sname)
{
  //  var patrn=/^\d{1,13}([.]\d{0,2})?$/;
   var patrn=/(^[1-9]{1}\d{0,12}(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!patrn.exec(s))
	{
		alert("请输入正确的“ "+sname+" ”格式,不能录入非法字符，整数部分最多13位,小数部分最多两位");
        //eval("document.all."+fname+".focus()");
		return false;
	}
	return true;
}
//显示校验框--总价
function showReInput(price){
	price = Math.round(price*100)/100;
//	$('materprice1').value = price;
//	$('materprice2').value = "";
//	document.getElementById("inputdiv").style.display = "block";
	initPopInput(price);
//	$('materprice2').focus();
}

function showReInput_detail(price,priceObj_temp,priceObj){
	price = Math.round(price*100)/100;
	initPopInput_detail(price,priceObj_temp,priceObj);
}
//隐藏校验框
function hideReInput(){
	$('materprice1').value = "";
	$('materprice2').value = "";
	$("bidBtnId").disabled = false;
	document.getElementById("inputdiv").style.display = "none";
}
//校验两次输入
function checkme(id,price){
	if($('materprice2').value == $('materprice1').value){
		var totalMoney = $('materprice1').value;
		hideReInput();
		var bidType = parent.currentProjBidType;//获取项目竞价类型(竞买/竞卖)
		bid.fBid(priceObj, $("mCount").value,bidType,totalMoney);
	}else{
		hideReInput();
		alert("两次输入不一致，请重新提交输入价格");
		return false;
	}
}
//更新当前步长
function updateBidUnit(price){
	var priceMode = $("Mode").value;
	if(priceMode !=3){
		$('packUnit').innerHTML = price;
		countUnitClick = 1;
		if(price.indexOf('元')!=-1){
			currentUnit = price.substring(0,price.indexOf('元'));
		}else{
			currentUnit = 0;	
		}
	}
}
//更新快捷报价
function updateBidQuickBid(price,currentPrice){
	var priceMode = $("Mode").value;
	var quicksBid = $('quicksBidId');
	var res;
	if("步长未启用" == price){
		quicksBid.innerHTML = '<span class="noQuicks" >无步长，不提供快捷报价！</span>';
		return;
	}
	if(priceMode !=3){
		price = parseFloat(price);//当前步长 这个地方居然还带单位的 使用parseFloat是正确的，会消除“元”
		currentPrice = currentPrice;//当前最新价
		quickClick = false;
		var prices = new Array(6);
		var cont = "";
		for(var i=0;i<6;i++){
			var tempPrice = 0;
			if(bidType=='1'){		//竞买情况下，报价递减
				tempPrice = mulfloat(price,(3+i*2));//从三倍步长开始算起
				res = subfloat(currentPrice,tempPrice);
				if(res > 0){
					prices[i] =res; 
				}else{
					prices[i] = "";
				}
			}
			if(bidType=='2'){		//竞卖情况下，报价递增
				tempPrice = mulfloat(price,(3+i*2));//从三倍步长开始算起
				res = addfloat(currentPrice,tempPrice);
				if(res < 99999999999){
					prices[i] =res; 
				}else{
					prices[i] = "";
				}
			}
			if(prices[i]!="")
				cont += '<span class="quickPrice fl" onclick="quickBidAction(\''+prices[i]+'\')">'+prices[i]+'</span>';
		}
		quicksBid.innerHTML = cont;
	}else{//细目步长快捷报价
	
	
	}
}
function quickDetailBidAction(price,sid){
	$('detail'+sid).value = price;
	changeDetailPrice();
}
function quickBidAction(price){
	quickClick = true;
	countUnitClick = 0;
	$('myPriceTxt').value = price ;
}

//更新延时时间  延时次数
function updateBidPostPone(bid_postpone,postponecount){
	$('bid_postpone').innerHTML =  bid_postpone ;
	$('postponecount').innerHTML = postponecount ;
}
//初始化当前项目的基础信息
function initPackInfo(packList){
	$('packName').innerHTML = packList[0].spackname;
	var priceMode = $("Mode").value;
	if(priceMode != 3){
		$('basePrice').innerHTML = packList[0].sbaseprice;
	}else{
		$('currentPrice_bidder').innerHTML = packList[0].scurrentprice_bidder;
	}
	
	$('bidMode').innerHTML = currentPackPayType;
	$('currentPrice').innerHTML = packList[0].scurrentprice;
	$('countDown').innerHTML = packList[0].sremainingtime;
	$('countDown_counting').innerHTML = packList[0].sremainingtime;
	
	if(currentPackPayType=='总价'){
		$('myPriceTxt').value = packList[0].scurrentprice;
	}
}

function initPackDetailInfo(detailList){
	var priceMode = $("Mode").value;
	if(priceMode == 1){//总价 
		initPackDetailTable();
		var styl = null;
		for(var i=0;i<detailList.length;i++){
			if(i%2==1){//
				styl = "tbOdd";
			}else{
				styl = "tbEven";
			}
			addPackDetailToTable(detailList[i],styl);
		}	
	}else if(priceMode == 3){//单价
		var totalPrice_temp = 0;				
		for(var i=0;i<detailList.length;i++){
			if(i%2==1){//
				styl = "tbOdd";
			}else{
				styl = "tbEven";
			}
			priceObj_prev.push({
				sname:detailList[i].smaterialname,
				skilldesc:detailList[i].sskilldesc,
				sid:detailList[i].sid,
				sprice:detailList[i].squotedprice,
				smoney:detailList[i].ssumprice
				
			});
			initPackDetailTable();
			addPackDetailToTable(detailList[i],styl);
			addSingleDetailInfo(detailList[i],styl+"2",detailList);
			if($('currentPrice').innerHTML == 0){
				var wz_num = detailList_temp[i].smaterialnum;
				var wz_simplePrice = detailList_temp[i].sbaseprice;
				totalPrice_temp =addfloat(totalPrice_temp,mulfloat(wz_simplePrice,wz_num));
			}
		}
		/*
		if($('currentPrice').innerHTML == 0){
			$('currentPrice').innerHTML = totalPrice_temp;
		}
		*/
		//初始化单条细目下的情况
		if(detailList.length == 1){
			var wz_num = detailList[0].smaterialnum;
			matrialNum = wz_num;
			var currentPrice = $('currentPrice').innerHTML ;
			var currentPrice_bidder = $('currentPrice_bidder').innerHTML ;
			
			var var1 = parseFloat(currentPrice)/parseFloat(wz_num);
			var var2 = parseFloat(currentPrice_bidder)/parseFloat(wz_num);
			$('currentPrice').innerHTML = currentPrice +"/" + Math.round(var1*100)/100;
			$('currentPrice_bidder').innerHTML = currentPrice_bidder + "/" + Math.round(var2*100)/100;
			dl = detailList[0];
		}
	}
}
//初始化细目表
function initPackDetailTable(){
	var row = $("packDetailTab").insertRow();
	row.setAttribute("className","tbHead");
	var n = 0;
	var cell = row.insertCell(n++);
	cell.style.display="none";
	var cell = row.insertCell(n++);//物资名称
	cell.setAttribute("width","4%") ;
	cell.innerHTML = '物资名称';
	var cell = row.insertCell(n++);//规格型号
	cell.innerHTML = '规格型号';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//计量单位
	cell.innerHTML = '计量单位';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//物资数量
	cell.innerHTML = '物资数量';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//交货地点
	cell.innerHTML = '交货地点';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//交货条件
	cell.innerHTML = '交货条件';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//交货期限
	cell.innerHTML = '交货期限';
	cell.setAttribute("width","4%") ;
	
}
function addPackDetailToTable(data,styleClass){
	var row = $("packDetailTab").insertRow();
	row.setAttribute("className",styleClass);
	row.setAttribute("id",""+data.sid+"Row");
	var n = 0;
	var cell = row.insertCell(n++);
	cell.style.display="none";
	cell.innerHTML = data.sid;
	var cell = row.insertCell(n++);//物资名称
	cell.innerHTML = data.smaterialname;
	var cell = row.insertCell(n++);//规格型号
	cell.innerHTML = data.sskilldesc;
	var cell = row.insertCell(n++);//计量单位
	cell.innerHTML = data.smeasureunit;
	var cell = row.insertCell(n++);//物资数量
	cell.innerHTML = data.smaterialnum;
	var cell = row.insertCell(n++);//交货地点
	cell.innerHTML = data.sdeliverypoint;
	var cell = row.insertCell(n++);//交货条件
	cell.innerHTML = data.sdeliveryterms;
	var cell = row.insertCell(n++);//交货期限
	cell.innerHTML = data.sdeliverydate;
}

//添加单价模式包件细目信息
function addSingleDetailInfo(data,styleClass,detailList){
	var row = $("packDetailTab").insertRow();
	row.setAttribute("className","tbHead2");
	var n = 0;
	var cell = row.insertCell(n++);
	cell.style.display="none";
	var cell = row.insertCell(n++);//起拍单价
	cell.setAttribute("width","4%") ;
	cell.innerHTML = '起拍单价';
	var cell = row.insertCell(n++);//当前步长
	cell.innerHTML = '当前步长';
	cell.setAttribute("width","4%") ;
	var cell = row.insertCell(n++);//快捷报价
	cell.setAttribute("colSpan","4");
	cell.innerHTML = '快捷输入';
	cell.setAttribute("width","20%") ;
	var cell = row.insertCell(n++);//输入报价
	cell.innerHTML = '输入报价';
	cell.setAttribute("width","4%") ;
	
/*************************************************	*/

	var row = $("packDetailTab").insertRow();
	row.setAttribute("className",styleClass);
	row.setAttribute("id",""+data.sid+"Row2");
	var n = 0;
	var cell = row.insertCell(n++);
	cell.style.display="none";
	var cell = row.insertCell(n++);//起拍价
	cell.innerHTML = data.sbaseprice;
	var cell = row.insertCell(n++);//当前步长
	cell.setAttribute("id","addUnit"+data.sid);
	cell.innerHTML = data.unitBid;
	var cell1 = row.insertCell(n++);//快捷报价
	cell1.setAttribute("id","quickBid"+data.sid);
	cell1.setAttribute("colSpan","4");
	//var qb = updateBidQuickBid(data.unitBid,data);
	//cell1.innerHTML = qb;
	var cell2 = row.insertCell(n++);//输入报价
	detailList_temp = detailList;
	cell2.innerHTML = '<div><input type="text" id="detail'+data.sid+'"'+
					 ' value="'+data.squotedprice+'" class="TB_priceInput" onkeyup="changeDetailPrice();" onChange="changeDetailPrice();"></div>';
	var qb = initBidQuickBid_detail_oneByone(data.unitBid,data);					 
	cell1.innerHTML = qb;						 
}
/*
	price:当前细目步长；
	currentPrice:当前细目
*/
function initBidQuickBid_detail_oneByone(price,currentPrice){
	if("步长未启动" == price) 
		return "无";
	price = parseFloat(price);//当前步长
	var scurrentPrice = $('detail'+currentPrice.sid).value;
	if(scurrentPrice=='0'||scurrentPrice==''){
		scurrentPrice = currentPrice.sbaseprice;
	}
	var currPrice = parseFloat(scurrentPrice);//当前最新价
	var prices = new Array(6);
	var cont = "";
	for(var i=0;i<6;i++){
		var tempPrice = 0;
		if(bidType=='1'){		//竞买情况下，报价递减
			tempPrice = mulfloat(price, (i+1));//从三倍步长开始算起
			res = subfloat(currPrice , tempPrice) ;
			if(res > 0){
				prices[i] =res; 
			}else{
				prices[i] = "";
			}
		}
		if(bidType=='2'){		//竞卖情况下，报价递增
			tempPrice = mulfloat(price, (i+1));//从三倍步长开始算起
			res = addfloat(currPrice , tempPrice) ;
			if(res < 99999999999){
				prices[i] =res; 
			}else{
				prices[i] = "";
			}
		}
		if(prices[i]!="")
			cont += '<span class="TB_quickPrice "  onclick="quickDetailBidAction(\''+prices[i]+'\',\''+currentPrice.sid+'\')">'+prices[i]+'  </span>';
	}
	return cont;
}
function updateBidQuickBid_detail(){
	var detailList = detailList_temp;
	for(var i=0;i<detailList.length;i++){
		var addUnit = $('addUnit'+detailList[i].sid).innerHTML;//步长
		if(addUnit.indexOf('元')!=-1){
			addUnit = addUnit.substring(0,addUnit.indexOf('元'));
		}
		addUnit = parseFloat(addUnit);
		if(matrialNum !=0){
			//一条细目
			var currentPrice = $('currentPrice').innerHTML ;
			var singlePrice = divfloat(parseFloat(currentPrice) , parseFloat(matrialNum));//单价
		}else{
			var singlePrice = $('detail'+detailList[i].sid).value;//单价
		}
		singlePrice = parseFloat(singlePrice);
		var prices = new Array(6);
		var cont = "";
		for(var j=0;j<6;j++){
			var tempPrice = 0;
			if(bidType=='1'){		//竞买情况下，报价递减
				tempPrice = mulfloat(addUnit ,(j+1));
				res = subfloat(singlePrice , tempPrice) ;
				if(res > 0){
					prices[j] =res; 
				}else{
					prices[j] = "";
				}
			}
			if(bidType=='2'){		//竞卖情况下，报价递增
				tempPrice = mulfloat(addUnit, (j+1));//从三倍步长开始算起
				res = addfloat(singlePrice , tempPrice) ;
				if(res < 99999999999){
					prices[j] =res; 
				}else{
					prices[j] = "";
				}
			}
			if(prices[j]!="")
				cont += '<span class="TB_quickPrice" onclick="quickDetailBidAction(\''+prices[j]+'\',\''+detailList[i].sid+'\')">'+prices[j]+'  </span>';
		}
		$('quickBid'+detailList[i].sid).innerHTML = cont;
		if(matrialNum !=0){
			return;
		}
	}
}
function updateSumPrice(sumPrice){
	$('packSumPriceId').innerHTML  = sumPrice;
}
function initPackBasePrice4DJ(basePrice){
	$('basePrice').innerHTML  = basePrice;
}
//变更包件细目单价
function changeDetailPrice(){
	var sumPrice = 0;
	for(var i=0; i<detailList_temp.length; i++){
		var num = detailList_temp[i].smaterialnum;//数量
		var price = $('detail'+detailList_temp[i].sid).value;
		if(isYKG(price,"细目单价价格录入")==false){
			return false;
		}
		sumPrice = addfloat(sumPrice,mulfloat(num, price));
	}
	updateSumPrice(sumPrice);
}
//初始化报价信息
function initMessageInfo(data){
	var mss = $('messageList');
	var v = "";
	for(var i=0;i<data.length;i++){
		if(i%2==1)
			v += '<li class="listOdd">';
		else
			v += '<li class="listEven">';
		v += '<span class="col2">'+converseTime(data[i].sbiddingdate) +'</span><span class="col1">'+data[i].sdescription+'</span></li>';
	}
	mss.innerHTML = v;
}
//按步长报价
function getPriceByUnit(){
	scurrentPrice = $("currentPrice").innerHTML;
	if(scurrentPrice!="0" && scurrentPrice!=""){
		scurrentPrice = scurrentPrice;
	}else{
		scurrentPrice = $("basePrice").innerHTML;
		scurrentPrice = scurrentPrice;
	}
	var myPrice = $("myPriceTxt").value;
	
	//竞买情况下，报价递减
	if(bidType=='1'){
		if(myPrice<scurrentPrice)
			scurrentPrice = myPrice;
		//最新价-步长*点击次数
		var Temp_price = subfloat(scurrentPrice,currentUnit);
		//Temp_price = Math.round(Temp_price*100)/100;
		if(Temp_price>0){
			$('myPriceTxt').value = Temp_price ;
		}
	}
	//竞卖情况下，报价递增
	if(bidType=='2'){
		if(myPrice>scurrentPrice)
			scurrentPrice = myPrice;
		//最新价+步长*点击次数
//		var Temp_price = scurrentPrice + currentUnit*countUnitClick ;
		var Temp_price = addfloat(scurrentPrice,currentUnit);
		//Temp_price = Math.round(Temp_price*100)/100;
		if(Temp_price>0){
			$('myPriceTxt').value = Temp_price ;
//			countUnitClick += 1;
		}
	}
}
