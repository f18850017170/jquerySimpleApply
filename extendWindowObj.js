/**
* 自定义window对象，类似layer的调用方式
*/
;(function($,window,document,undefined){
  var extendLayer = {
    test:function:function(options){
      alert(options);
      console.log(options);
    }
  };
  window.extendLayer = extendLayer;//类似layer插件等在window上扩展对象
  /**
  *调用
  *
  */
  extendLayer.test('test');
})(jQuery,window,document);
