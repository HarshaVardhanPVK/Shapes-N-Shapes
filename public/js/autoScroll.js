var taskArray = [], time = 0, level = 1;

function autoScroll(){
  if(time>10) {
    var top = parseInt($(".inner").css("top").replace("px",""));
    var height = $(".outer").outerHeight();
    var innerHeight = $(".inner").outerHeight();
    //console.log("autoScroll: "+innerHeight)
    //console.log(top, height)

    if(top >=  height) {
      $(".inner").animate({"top": -innerHeight}, ((65 - (level * 5)) * 1000)/3, autoScroll)
    }
    else {
      $(".inner").css({"top": height});
      autoScroll();
    }
  }
}
