/**
*
* 扩展其他插件/对象的方法
* var params = $.extend({},def,options);
* 当准备用自定义函数覆盖目标参数对象的函数时时，要注意名称一样的方法、参数保持一致否则会报错
*/
;(function($,window,document,undefined){
    //扩展layer的alert方法
    $.extend(layer,{alert:function(msg){
        //确认弹窗（仅有确定按钮）
        layer.confirm(msg, {
            skin: 'layer-confirm-dialog',
            btn: ['确定'] //按钮
        });
    }});
})(jQuery,window,document);
