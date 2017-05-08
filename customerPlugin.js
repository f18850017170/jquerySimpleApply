;(function($,window,document,undefined){
    var DEF_CSS_CLASS = 'multiSelect-wrap';
    var BRAND_SELECT_UL = 'brandSelectDiv';
    var EXTEND_PACK_BTN = 'moreBrandBtn';
    var ALL_CHECK_BTN = 'allBrandCheckbox';
    var BRAND_SEARCH_NAME = 'brandIds';

    var pluginName = 'brandSearchPlugin';
    var BrandPlugin = function(ele,opt){
        this.element = ele,
            this.$element = $(ele),
            this.defaults = {
                url:'/brand/all',
                brandSelectUl:'#'+BRAND_SELECT_UL + new Date().getTime(),
                extendPackBtn:'#'+EXTEND_PACK_BTN + new Date().getTime(),
                allCheckBtn:'#'+ALL_CHECK_BTN + new Date().getTime(),
                brandSearchName:BRAND_SEARCH_NAME,
                isExtend:true,
                jsonReader:{
                    items:'datas.items',
                    code:'code',
                    msg:'msg'
                }
            },
            this.options = $.extend({},this.defaults,opt);
        this.init();
    };

    BrandPlugin.prototype = {
        //初始化
        init:function(){
            this.$element.append(BrandPlugin.prototype.buildDivContent(this.options));
            this.$element.addClass(DEF_CSS_CLASS);
            var _plugin = this;
            $.post(this.options.url,function(data){
                $.each(_plugin.options.jsonReader,function(i,item){
                    var keys = item.split('.');
                    if(keys.length>1){
                        var temp  = data;
                        for(var k=0; k<keys.length;k++){
                            temp = temp[keys[k]];
                        }
                        _plugin.options.jsonReader[i] = temp
                    }else {
                        _plugin.options.jsonReader[i] = data[item];
                    }
                });
                var result = $.extend({}, _plugin.options.jsonReader, data);
                if(result.code == 0){
                    var ul = $(_plugin.options.brandSelectUl);
                    $.each(result.items,function(i,item){
                        var liHtml = '<li>';
                        liHtml +='<label>';
                        liHtml +='<input type="checkbox" name="'+_plugin.options.brandSearchName+'" value="'+item.id+'"  class="fm-checkbox js-brandcheck">'+item.name;
                        liHtml +='</label>';
                        liHtml +='</li>';
                        ul.append(liHtml);
                    });
                }else{
                    layer.alert(result.msg);
                }
            });
            //[收起/更多] 按钮点击操作
            $(document).on('click',this.options.extendPackBtn,function(){
                if(_plugin.options.isExtend){
                    $(_plugin.options.brandSelectUl).css({"height":"auto"});
                    $(this).html('收起');
                }else {
                    $(_plugin.options.brandSelectUl).css({"height":"28px"});
                    $(this).html('更多');
                }
                _plugin.options.isExtend = !_plugin.options.isExtend;
            });
            //[全选]按钮
            $(document).on('change',this.options.allCheckBtn,function(e){
                $(_plugin.options.brandSelectUl).find(':checkbox').prop('checked',$(this).prop('checked'));
            });
            return this;
        },
        //构建html content
        buildDivContent:function(options){
            var html ='<label>品牌</label>';
            html +='<label class="selectAll">';
            html +='<input id="'+options.allCheckBtn.replace('#','')+'" type="checkbox" class="fm-checkbox" />全选';
            html +='</label>';
            html +='<ul id="'+options.brandSelectUl.replace('#','')+'" class="selectItem">';
            html +='</ul>';
            html +='<a href="javaScript:void(0);" id="'+options.extendPackBtn.replace('#','')+'" class="more icon">更多</a>';
            html +='<div class="f-clear"></div>';
            return html;
        },
        //获取选中的品牌ID对象
        getSelectedBrandIdsObj:function(){
            var brandCheckBox = $(this.options.brandSelectUl).find(':checkbox:checked');
            var brandIds ={};
            if(brandCheckBox.length>0){
                $.each(brandCheckBox,function(i,item){
                    brandIds[""+i]=$(item).val();
                });
                return brandIds;
            }
            return '';
        },
        getSelectedBrandIdsArray :function(){
            var brandIds = new Array();
            var brandCheckBox = $(this.options.brandSelectUl).find(':checkbox:checked');
            if(brandCheckBox.length>0){
                $.each(brandCheckBox,function(i,item){
                    brandIds.push($(item).val());
                });
            }
            return brandIds;
        },
        //类目查询clear
        brandSearchClear :function(){
            $(this.options.allCheckBtn).prop('checked',false);
            $(this.options.brandSelectUl).find(':checkbox').prop('checked',false);
        }
    };
    //插件命名空间
    $.fn.brandSearch = function(options){
        if(BrandPlugin.prototype[options]){
            if(this.length>1){
                alert('$.fn.brandSearch 暂不支持多元素方法调用');
                return false;
            };
            return BrandPlugin.prototype[options].apply($.data(this[0],pluginName),Array.prototype.slice.call(arguments,1));
        };
        return this.each(function(){
            if(!$.data(this,pluginName)){
                var brandPlugin = new BrandPlugin(this,options);
                $.data(this,pluginName,brandPlugin);
            }
        });
    };
})(jQuery,window,document);
