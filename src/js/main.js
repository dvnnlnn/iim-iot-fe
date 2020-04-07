

// 側邊欄

var sb_status = 0 ;
var wd_status = 0 ;
var sr_status = 0 ;
var speed = "500" ;
var timer ;
$(".darken").hide();
$(".window").hide();
$(".voicedark").hide();
$(".siri.tiny").hide();


$(".menu").click(function(){
	if (sb_status == 0){
		sb_status = 1 ;
		$(".darken").show();
		$(".sidebar").animate({left:'+=380px'},speed);
  		$(".darken").animate({opacity:'1'},speed);
	}
	else if (sb_status == 1){
		sb_status = 0 ;
		$(".sidebar").animate({left:'-=380px'},speed);
  		$(".darken").animate({opacity:'0'},speed);
  		setTimeout(function(){ $(".darken").hide(); }, speed);
	}
});

$(".darken").click(function(){
	if (sb_status == 1){
		sb_status = 0 ;
		$(".sidebar").animate({left:'-=380px'},speed);
  		$(".darken").animate({opacity:'0'},speed);
  		setTimeout(function(){ $(".darken").hide(); }, speed);
	}
	if (wd_status == 1){
		wd_status = 0 ;
  		$(".darken").animate({opacity:'0'},speed);
		$(".window").animate({top:'+=5px',opacity:'0'},speed);
  		setTimeout(function(){
  			$(".darken").hide();
  			$(".window").hide();
  			$(".window").empty();
  		}, speed);
	}
});


// 開始使用

$("#startuse").click(function(){
	sb_status = 1 ;
	$(".darken").show();
	$(".sidebar").animate({left:'+=380px'},speed);
  	$(".darken").animate({opacity:'1'},speed);
});


// 按下卡片

$(".card").mouseup(function(){
	var cardstatus = $(this).css("background-color");
	console.log(cardstatus);
	if ( cardstatus.match("114, 240, 201") ) {
		$(this).css("box-shadow","0px 0px 0px 2px rgba(255, 255, 255, 0.7)");
		$(this).css("background","transparent");
		$(this).children("p").css("color","rgba(255, 255, 255, 0.9)");
		$(this).children("p").css("font-weight","100");
	}
	else {
		$(this).css("box-shadow","0px 0px 0px 2px rgba(114, 240, 201, 1)");
		$(this).css("background","rgba(114, 240, 201, 1)");
		$(this).children("p").css("color","rgba(0, 0, 0, 1)");
		$(this).children("p").css("font-weight","500");
	}
});


// 下拉式選單

$(".options").click(function(){
	if (wd_status == 0){
		wd_status = 1 ;
		$(".darken").show();
		$(".window").show();
		for ( i = 18 ; i <= 22 ; i ++ ) {
			$(".window").append( "<a class='option'>"+i+":00</a><br>" );
		}
		$(".window").css("top", ($(window).height()-$(".window").height())/2);
		$(".window").animate({top:'-=5px',opacity:'1'},speed);
  		$(".darken").animate({opacity:'1'},speed);
	}
	else if (wd_status == 1){
		wd_status = 0 ;
  		$(".darken").animate({opacity:'0'},speed);
		$(".window").animate({top:'+=5px',opacity:'0'},speed);
  		setTimeout(function(){
  			$(".darken").hide();
  			$(".window").hide();
  			$(".window").empty();
  		}, speed);
	}
});


// 調整照片

function adjustpic() {
	var height = $(".photo").prop("height");
	var width = $(".photo").prop("width");
	var length = $(".photoarea").css("width").replace("px", "");
	var half = length/2 ;
	var move = 0 ;
	if (width > height) {
		$(".photo").css("height",length);
		$(".photo").css("width","auto");
		width = $(".photo").attr("width");
		move = half - width/2;
		$(".photo").css("margin-left",move);
	}
	else {
		$(".photo").css("width",length);
		$(".photo").css("height","auto");
		height = $(".photo").attr("height");
		move = half - height/2;
		$(".photo").css("margin-top",move);
	}
}


// 監控進度

function watchprogress() {
	$(window).scroll(function() {
		var now = $(document).scrollTop() + $(window).height();
		var full = $(document).height();
	    if ( now >= full - 60) {
			$(".nextico").fadeOut(speed);
	    }
	    else {
			$(".nextico").fadeIn(speed);
	    }
	});
}


// 側邊欄

$("#toapply").click(function(){
	location.assign("apply.html");
});

$("#torecord").click(function(){
	location.assign("record.html");
});

$("#tocontrol").click(function(){
	location.assign("verify.html");
});

$("#touser").click(function(){
	location.assign("user.html");
});


// 啟動語音

$(".voicebtn").mousedown(function(){
	if (sr_status == 0) {
		timer = setTimeout("siri()",speed);
		$(".voicebtn").mouseup(function(){
			clearTimeout(timer);
		});
	}
	else if (sr_status == 1) {
		siri();
	}
});

function siri() {
	if (sr_status == 0) {
		sr_status = 1;
		$(".upper").fadeOut(speed);
		$(".voicedark").fadeIn(speed*2);
		setTimeout(function(){
			$(".siri.tiny").fadeIn(speed*1.5);
  		}, speed*1.8);
		$(".voicebtn").attr("class","voicebtn pressed");
	}
	else if (sr_status == 1) {
		sr_status = 0;
		$(".voicedark").fadeOut(speed);
		$(".siri.tiny").fadeOut(speed);
		$(".upper").fadeIn(speed*2);
		$(".voicebtn.pressed").attr("class","voicebtn");
	}
}

