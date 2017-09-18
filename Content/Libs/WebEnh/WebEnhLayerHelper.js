var layer2;
if (layer.open) {
    layer2 = layer;
} else {//解决，manage/main/index layer被替换的BUG，如果index页面需要使用 layer ，可以用 layer1代替。
    layer2 = layer1;
}

function WebEnh_open($url, $DisplayBottomButton,$Area) {
    /// <summary>从Layer打开内页层页面，如果需要使用系统的 window.open 请使用 window.$open 或 $open 方法。---------------- 不检查当前 layer 页面表单元素值是否更改的方法：在layer页面中定义js变量 var layer$form$change$closeding$check = false;就可以了。</summary>
    /// <param name="$url" type="string">要打开的内页网址，可以是相对路径</param>
    /// <param name="$DisplayBottomButton" type="boolean">是否显示保存和返回按钮，默认值为：显示(true)。如传入 false 则不显示。</param>
    
    //--------------------------------------------------- closeding START ------------------------------------------------------------
    function closeding(index, layero) {
        /// <summary>关闭打开的内页时，调用本方法检查是否存在未保存的更改 ---------------- 不检查当前 layer 页面表单元素值是否更改的方法：在layer页面中定义js变量 var layer$form$change$closeding$check = false; 就可以了。</summary>
        try {
            function formIsDirty(form) {
                /// <summary>检查表单内容是否已更改</summary>
                try {
                    var flag = false;
                    for (var i = 0; i < form.elements.length; i++) {
                        var element = form.elements[i];
                        var type = element.type;
                        if (type == "checkbox" || type == "radio") {
                            if (element.checked != element.defaultChecked) {
                                flag = true;
                            }
                        }
                        else if (type == "hidden" || type == "password" || type == "text" || type == "textarea" || type == "number" || type == "tel") {
                            if (element.value != element.defaultValue) {
                                try {
                                    $(element).css("background-color", "yellow");
                                    flag = true;
                                    //return true;
                                } catch (e) {
                                    flag = true;
                                }
                            }
                        }
                        else if (type == "select-one" || type == "select-multiple") {
                            for (var j = 0; j < element.options.length; j++) {
                                if (element.options[j].selected != element.options[j].defaultSelected) {
                                    flag = true;
                                }
                            }
                        }
                    }
                    return flag;
                } catch (e) {
                    console.log(e);
                    console.trace();
                    return false;//出错则返回未更改表单
                }
            }
            var iframeWin = window[layero.find('iframe')[0]['name']];
            try {
                //检查当前页面，是否存在 js变量 var layer$form$change$closeding$check = false; 的值的变量，如果存在，则不检查当前layer页面。
                if (typeof (iframeWin.layer$form$change$closeding$check) == "boolean") {
                    if (iframeWin.layer$form$change$closeding$check == false) {
                        return true;//返回可以关闭层，不进行后面的检查
                    }
                }
            } catch (e) {
                console.log(e);
                console.trace();
            }
            var form1 = iframeWin.document.forms[0];
            var flag = formIsDirty(form1);
            if (flag) {
                layer2.confirm("您好，页面数据已做修改，尚<strong style='color:red;'>未保存</strong>，确定要放弃保存数据离开本页面？", { icon: 3, title: "提示", skin: "layui-layer-molv layui-layer-rim",/*绿色样式*//*skin: "layui-layer-rim", //加上边框*/ }, function (index1) {
                    layer2.close(index1);
                    layer2.close(index);
                });
                return false;
            }
            return true;
        } catch (e) {
            return true;//出错则可以关闭层
        }
    }
    //--------------------------------------------------- closeding END --------------------------------------------------------------
    
    function $btn1CallBack(index, layero) {
        try {
            //按钮【按钮一】的回调
            //layer2.alert("酷毙了", { icon: 1 });
            var $iframeWin = window[layero.find('iframe')[0]['name']];
            $iframeWin.$("button[type='submit']").click();
            //得到当前页静态URL，用于重新加载
            var $current_ajax_url_data_urlformat = $(".pagination").attr("data-urlformat");
            var $current_ajax_url_id = $(".pagination > li.active > a").html();
            var $current_ajax_url = $current_ajax_url_data_urlformat.replace("__id__", $current_ajax_url_id);
            //console.log($current_ajax_url);
            //重新加载当前ajax页面的url文档html内容到指定id选择器中的div中
            $("#data-lists").load($current_ajax_url);
            //$("#data-lists").load(location.href);
        } catch (e) {
            console.log(e);
            console.trace();
        }
        return false;
    }
    function $btn2CallBack(index, layero) {
        //按钮【按钮二】的回调  ------------  返回按钮的回调
        //alert("关闭成功。");
        return closeding(index, layero);
    }

    var btns = ["保存", "返回"];
    try {
        //检查方法是否存在传入参数：$DisplayBottomButton 如果传入，则做对应处理。
        if (typeof $DisplayBottomButton == "boolean") {
            if ($DisplayBottomButton == false) {
                btns = [];
            } else {
                console.trace();
            }
        } else {
            console.trace();
        }
    } catch (e) {
        console.log(e);
    }

    layer2.open({
        type: 2,//Page层类型
        title: "操作窗口 <i class='icon-spinner icon-spin white bigger-125'></i> 加载中 ... ...",
        content: [$url, "yes"],
        area: ($Area == null ? ["90%", "98%"] : $Area),
        moveOut: true,
        move: ".layui-layer-title",
        shade: 0.11, shadeClose: false, //开启遮罩点击关闭
        closeBtn: 1,
        maxmin: true, //开启最大化最小化按钮
        fixed: true,
        scrollbar: false,
        anim: 2, //0-6的动画形式，-1不开启
        //skin: "layui-layer-molv layui-layer-rim",/*绿色样式*/
        skin: "layui-layer-rim", //加上边框

        btn: btns,
        btn1: $btn1CallBack,
        btn2: $btn2CallBack,
        success: function (layero, index) {
            //console.log(layero, index);
            //可以在这里得到iframe中的标题传给layer的标题
            var $html = layer2.getChildFrame('html', index);
            var $iframeTitle = $html.find('title').html();
            //alert($iframeTitle);
            layer2.title($iframeTitle, index);
        },
        moveEnd: function () {
            //moveEnd - 拖动完毕后的回调方法
        },
        end: function (index) {
            //location.reload(true);
        },
        cancel: function (index, layero) {
            return closeding(index, layero);
        }
    });
}

function WebEnh_alert($message, $icon, $callback) {
    /// <summary>消息提示框____简单示例：【 alert("消息示例",2, function (){ alert("这是点确认后回调执行的代码！"); });】</summary>
    /// <param name="$message" type="string">消息内容</param>
    /// <param name="$icon" type="int">图标，可选项，可以为“""”默认图标为：！，0:！1:√,2:×,3:?,4:锁,5:哭脸,6:笑脸</param>
    /// <param name="$callback" type="function">回调方法，回调时使用 callback();， alert("消息示例",2, function (){ alert("这是点确认后回调执行的代码！"); });</param>
    layer2.alert(
            $message,
            {
                icon: $icon,
                //skin: "layui-layer-molv layui-layer-rim",/*绿色样式*/
                skin: "layui-layer-rim",/*绿色样式*/
                cancel: function (index) {
                    if (typeof $callback == "function") {
                        $callback();
                    }
                    layer2.close(index);
                }
            },
            function (index) {
                if (typeof $callback == "function") {
                    $callback();
                }
                layer2.close(index);
            } //这时如果你也还想执行yes回调，可以放在第三个参数中。
        );
}

function WebEnh_prompt($message, $default, $width_px, $height_px, $callback) {
    /// <summary>弹出输入消息框，可以指定$callback进行回调____简单示例：【prompt("标题", "默认值", "", "", function (resultValue) { alert("这里是得到的值1：" + resultValue); });】</summary>
    /// <param name="$message" type="string">消息标题</param>
    /// <param name="$default" type="string">输入框的默认值</param>
    /// <param name="$width_px" type="string">消息框宽度____可以为空：【""】</param>
    /// <param name="$height_px" type="string">消息框高度____可以为空：【""】</param>
    /// <param name="$callback" type="function">回调方法，回调时使用 callback(value);，其中value为输入的值，也可以用 prompt("标题", "默认值", "", "", function (resultValue) { alert("这里是得到的值1：" + resultValue); });</param>
    layer2.prompt({
        //skin: "layui-layer-molv layui-layer-rim",/*绿色样式*/
        skin: "layui-layer-rim",/*绿色样式*/
        formType: 2,
        value: $default,
        title: $message,
        area: [$width_px, $height_px] //自定义文本域宽高
    }, function (value, index, elem) {
        if (typeof $callback == "function") {
            $callback(value);
        }
        //alert(value); //得到value
        layer2.close(index);
    });
}
function WebEnh_close() {
    /// <summary>弹出的iframe中调用 window.close() 方法时，关闭自身 iframe窗口。</summary>
    try {
        //假设这是iframe页
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
        $close();
    } catch (e) {
        console.log(e);
    }
}

function WebEnh_confirm($message, $callback) {
    /// <summary>询问框 弹出layer型式的confirm窗口，用户确认后回调指定方法。</summary>
    /// <param name="$message" type="string">提示用户的消息内容</param>
    /// <param name="$callback" type="function">点击确认后需要执行的回调方法，回调时使用示例：confirm("这是一个提示", function () { alert("你选择了确认"); });</param>

    //询问框
    layer2.confirm($message, {
        //skin: "layui-layer-molv layui-layer-rim",/*绿色样式*/
        skin: "layui-layer-rim",/*绿色样式*/
        btn: ['确认', '取消'] //按钮
    }, function (index) {//按钮1事件，确认
        if (typeof $callback == "function") {
            $callback();
        }
        //alert(value); //得到value
        layer2.close(index);
    }, function (index) {//按钮2事件，取消
        layer2.close(index);
    });
}

function WebEnh_msg($message) {
    layer2.msg($message);
}

//http://layer.layui.com/

//先保存一下window的原始方法
var $open = window.open;
var $close = window.close;
var $alert = window.alert;
var $prompt = window.prompt;

var $confirm = window.confirm;


window.open = WebEnh_open;//替换浏览器自带的 window.open方法
window.close = WebEnh_close;//替换浏览器自带的 window.close方法
window.alert = WebEnh_alert;//替换浏览器自带的 window.alert方法
window.prompt = WebEnh_prompt;//替换浏览器自带的 window.prompt方法

window.confirm = WebEnh_confirm;//替换浏览器自带的 window.confirm

window.msg = WebEnh_msg;