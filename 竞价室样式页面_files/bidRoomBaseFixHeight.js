/**
 * 修正高度
 */
function fixFrameHeight(flag,isIframeJsp){
	var flag = flag||'0';
	var isIframeJsp = isIframeJsp||false;
	var v_clientHeight  = 
		isIframeJsp?parent.document.documentElement.clientHeight:document.documentElement.clientHeight;
	if(flag=='0'){
		if(v_clientHeight>=526){
			if(isIframeJsp){
				setTheDocumentHeightById("room_bidLists",(317+v_clientHeight-540-153));
			}else{
				setTheDocumentHeightById("room_packs_id",(202+v_clientHeight-540));
				setTheDocumentHeightById("bidRoomMain",(v_clientHeight-10));
				setTheDocumentHeightById("external",(v_clientHeight-50));
			}
		}else{
			if(isIframeJsp){
				setTheDocumentHeightById("room_bidLists",(317-153));
			}else{
				setTheDocumentHeightById("bidRoomMain",(v_clientHeight-10));
				setTheDocumentHeightById("external",(v_clientHeight-50));
			}
		}
	}else{
		if(v_clientHeight>=526){
			if(isIframeJsp){
				setTheDocumentHeightById("room_bidLists",(317+v_clientHeight-540-153));
			}else{
				setTheDocumentHeightById("room_packs_id",(200-75+(v_clientHeight-540)/2));
				setTheDocumentHeightById("room_packs_list_id",(200-108+(v_clientHeight-540)/2));
				setTheDocumentHeightById("room_signIn_inner_id",(240-75+(v_clientHeight-540)/2));
				setTheDocumentHeightById("room_signIn_inner_list_id",(240-108+(v_clientHeight-540)/2));
				setTheDocumentHeightById("bidRoomMain",(v_clientHeight-10));
				setTheDocumentHeightById("external",(v_clientHeight-50));
			}
		}else{
			if(isIframeJsp){
				setTheDocumentHeightById("room_bidLists",(317-153));
			}else{
				setTheDocumentHeightById("room_packs_id",(200-75));
				setTheDocumentHeightById("room_packs_list_id",(200-108));
				setTheDocumentHeightById("room_signIn_inner_id",(200-75));
				setTheDocumentHeightById("room_signIn_inner_list_id",(200-108));
				setTheDocumentHeightById("bidRoomMain",(v_clientHeight-10));
				setTheDocumentHeightById("external",(v_clientHeight-50));
			}
		}
	}
}
//判断ie6
function isIE6(){
	var userAgent = navigator.userAgent.toLowerCase();
    var browserId = userAgent.match(/(firefox|chrome|safari|opera|msie)/)[1];
    var browserVersion = (userAgent.match(new RegExp('.+(?:version)[\/: ]([\\d.]+)')) || userAgent.match(new RegExp('(?:'+browserId+')[\/: ]([\\d.]+)')) || [0,'0'])[1];
    return (browserId + browserVersion == "msie6.0");
}
//对dom高度赋值
function setTheDocumentHeightById(id,value){
	document.getElementById(id).style.height = value+"px";
}
//替换默认alert
var bidAlert = function(str){
	//通过父窗口dom判断是否父页面
	var isIFramePage = (document.getElementById("bidRoomMain")==null);
	//id
	var winId = "showMessageWinId";
	if(alertWinHasShow(winId,isIFramePage)){
		appendMessage(str,winId,isIFramePage);
	}else{
		//要显示的div
		var dom = showMessageWin(str,isIFramePage);
		dom.id=winId;
		//判断是否父页面
		if(isIFramePage){
			parent.document.body.appendChild(dom);
			parent.document.getElementById("errorSndId").src="sound/error.wav";
		}else{
			document.body.appendChild(dom);
			document.getElementById("errorSndId").src="sound/error.wav";
		}
	}
};
window.alert = function(str){
	bidAlert(str);
};
//弹出框
/**
<div style="width:300px;height:240px;display: block;position: absolute;top: 200px;left: 300px;border: 1px solid #c40000;background:white;">
<div style="width:100%;height: 30px;display:block;background-color:#c40000;color: #fff;line-height: 30px;font-size: 18px;text-indent: 10px;">错误提示：</div>
<div style="width:100%;height:175px;display: block;line-height: 20px;text-indent: 20px;font-size: 13px;overflow: hidden;border-bottom:1px dotted #333;margin-top: 5px;">错误内容提示，编号：01 的包件已经开启，祝您竞价成功编号：01 的包件已经开启，祝您竞价成功编号：01 的包件已经开启，祝您竞价成功编号：01 的包件已经开启，祝您竞价成功</div>
<div style="width:100%;height: 24px;text-align: center;margin-top: 3px"><input type="button" value="关闭"></div>
</div>
*/
var showMessageWin = function(str,isIFramePage){
	var str = str||"";
	var isIFramePage = isIFramePage||false;
	var v_clientWidth  = 
		isIFramePage?parent.document.documentElement.clientWidth:document.documentElement.clientWidth;
	var v_clientHeight  = 
		isIFramePage?parent.document.documentElement.clientHeight:document.documentElement.clientHeight;
	str = str.replace(/</g,"&lt").replace(/>/,"&gt");
	var dom = parent.document.createElement("div");
	dom.className = "messageAlertWinStyle";
	dom.style.left = (v_clientWidth-300)/2+"px";
	dom.style.top = (v_clientHeight-240)/2+"px";
	dom.innerHTML =
		'<div style="width:100%;height: 30px;display:block;background-color:#c40000;color: #fff;line-height: 30px;font-size: 18px;text-indent: 10px;">错误提示：</div>'+
		'<div style="width:100%;height:175px;display: block;line-height: 20px;font-size: 13px;overflow: auto;border-bottom:1px dotted #333;margin-top: 5px;"><ol><li>'+str+'</li></ol></div>'+
		'<div style="width:100%;height: 24px;text-align: center;margin-top: 3px"><input type="button" value="关闭" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode)"></div>';
	return dom;
};
//追加信息
var appendMessage = function(str,winId,isIFramePage){
	if(isIFramePage){
		parent.document.getElementById(winId).childNodes.item(1).childNodes.item(0).innerHTML += "<li>"+str+"</li>";
		parent.document.getElementById("errorSndId").src="sound/error.wav";
	}else{
		document.getElementById(winId).childNodes.item(1).childNodes.item(0).innerHTML += "<li>"+str+"</li>";
		document.getElementById("errorSndId").src="sound/error.wav";
	}
};
//alert是否显示
var alertWinHasShow = function(winId,isIFramePage){
	if(isIFramePage){
		return parent.document.getElementById(winId)!=null;
	}else{
		return document.getElementById(winId)!=null;
	}
};


