//sub-menu 등장
$(function () {
  $(".gnb-main li").hover(function () {
    $(this).find(".gnb-sub").stop().fadeToggle(200);
  });
});

//main
function slide() {
  var wid = 0;
  var i = 0;
  var slide_length = 0;
  var $indiLi = $(".main-indi>li");
  var $mainPanel = $(".img-panel");
  var $panelLi = $mainPanel.children("li");

  //초기화
  function inti() {
    wid = $(".main-slide").width();
    i = $(".main-indi>li.main-indi-on").index();
    slide_length = $(".main-indi>li").length;
  }

  //event(실행되는속성들): 인디케이터, next, prev
  function slideEvent() {
    $indiLi.click(function () {
      i = $(this).index();
      slideMove();
    });
    $(".main-next").click(function () {
      nextPlay();
    });
    $(".main-prev").click(function () {
      prevPlay();
    });
    //자동함수
    autoPlay();
    autoPlayStop();
    autoPlayRestart();
  }

  //next(함수)
  function nextPlay() {
    if (i == slide_length - 1) {
      i = 0;
    } else {
      i++;
    }
    slideMove();
  }

  //prev(함수)
  function prevPlay() {
    if (i == 0) {
      i = slide_length - 1;
    } else {
      i--;
    }
    slideMove();
  }

  //슬라이드이동(함수)
  function slideMove() {
    $(".img-panel")
      .stop()
      .animate({ "margin-left": -wid * i });
    $(".main-indi>li").removeClass("main-indi-on");
    $(".main-indi>li").eq(i).addClass("main-indi-on");
  }

  //자동함수
  function autoPlay() {
    auto = setInterval(function () {
      nextPlay();
    }, 5000);
  }
  function autoPlayStop() {
    $panelLi.mouseenter(function () {
      clearInterval(auto);
    });
  }
  function autoPlayRestart() {
    $panelLi.mouseleave(function () {
      auto = setInterval(function () {
        nextPlay();
      }, 5000);
    });
  }

  function resize() {
    $(window).resize(function () {
      inti();
      $(".img-panel").animate({ "margin-left": -wid * i });
    });
  }

  inti();
  slideEvent();
  resize();
}
$(document).ready(function () {
  slide();
});
