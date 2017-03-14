(function($){

  var vm = initVue()
  fetchImages()

  function initGrid(){
    setTimeout(function(){
      var $grid = $('#items').masonry({
        itemSelector: '.item',
        percentPosition: true
      });
      $(".loading").fadeOut(100)
      setTimeout(function(){
        $(".item").css("opacity",1)
      },100)
    },1000)
  }

  /**
   *  initVue
   *  Vue.jsを初期化
   *
   *  @return { object } vm
   */
  function initVue(){
    var vm = new Vue({
      el: "#items",
      data: {
        images: []
      }
    })

    return vm
  }

  /**
   *  fetchImages
   *  APIで画像一覧を取得
   */
  function fetchImages(){
    $.ajax({
      url: "/api/past",
      type: "GET"
    })
    .done(function(data){
      var images = data.images.filter(function(x,i,self){
        return self.indexOf(x) == i;
      })
      update(images)
    })
  }

  /**
   *  update
   *  Vue.jsを更新
   *
   *  @param { array } array
   */
  function update(array){
    Vue.nextTick(function(){
      vm.images = array
    })
    initGrid()
  }

})(jQuery);