/**
* var params = $.extend({},def,options);
* 当准备用自定义函数覆盖目标参数对象的函数时时，要注意名称一样的方法、参数保持一致否则会报错
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
