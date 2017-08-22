window.onload=function(){
	waterfall('main','box');
	var dataInt={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},
	{"src":'9.jpg'}]};
	window.onscroll=function(){
		if(checkScrollSlide){
			var oparent=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='box';
				oparent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','box');
		}
		
	}
}
function waterfall(parent,box){
	var oparent=document.getElementById(parent);
	var oBoxs=getByClass(oparent,box);
	//计算整个页面显示的列数（页面宽/box的宽）
	var oBoxW=oBoxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	//设置main的宽度
	oparent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
	var hArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hArr);
			var index=getMinhIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			//oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
}
//根据class获取元素
function getByClass(parent,clsName){
	var boxArr=new Array(),
	    oElements=parent.getElementsByTagName('*');
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);
		}
	}
	return boxArr;
}
function getMinhIndex(hArr,minH){
	for(var i in hArr){
		if(hArr[i]==minH){
			return i;
		}
	}
}

//检测是否具备了滚动加载数据的条件
function checkScrollSlide(){
	var oparent=document.getElementById('main');
	var oBoxs=getByClass(oparent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
	var height=document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}