$(document).ready(function () {
    // console.log(group);
    //localStorage.removeItem("punchTime")
    //localStorage.clear()
    login()  // 登录弹窗
    runTree(group) // 渲染列表

    checkStorage()
})


var user = {
    // 临时变量 把用户操作的变量都存这里 间接存储 不污染变量
    userName: null, // 用于存储用户名
    password: null, // 用于存储密码
    punchTime: 0,  //打卡时间（小时）
    hitOk: 0, // 是否可打卡
    DayHitCount: 0, // 连续打卡天数

    getDat: null,
    getMont: null,
    str: null,

    inner: null, // 用于存储所点击试题列表的选项
    TestArr: [], // 用于存储获取的全部试题数组

    timer: null, // 用于试题计时器
    min: 19, // 试题计时器分钟
    sen: 59, // 试题计时器秒钟

    findArr: [], // 用于收藏集 错题集匹配题目存储 可用于输入框匹配搜索

}




$(".hit").on("click", function () {
    punch() // 打卡函数
})

function addDayHit() {

    // 修改连续打卡天数 存入本地

    /**
     * 获取本地打卡天数数据
     * 如果不存在 则天数为0 并自增 否则直接自增
     * 存入浏览器数据
     */
    var DayHitCount = storageFn("DayHitCount");

    if (!DayHitCount) {

        // 如果是第一次打卡 则把默认的打卡天数存进去 作为初始化
        DayHitCount = user.DayHitCount; // DayHitCount = 0
        DayHitCount++;
        storageFn("DayHitCount", DayHitCount, true)

        $(".dayHit-nums").html(DayHitCount)
    } else {
        DayHitCount++;
        storageFn("DayHitCount", DayHitCount, true)
        $(".dayHit-nums").html(DayHitCount)
    }
}

function getlastDate() {

    // 获取当前日期
    var date = new Date();
    user.getDat = date.getDate(); // 获取日
    user.getMont = date.getMonth() + 1; // 获取月
    user.str = "";
    user.str += user.getDat + "," + user.getMont // 当前时间 日 月
    user.punchTime = user.str;
}

function punch() {

    // 打卡函数
    /**
     * 获取当前打卡时间，小时 存入本地
     * 每次加载页面 获取一次本地存储的数据 
     * 如果不存在或是小于当前时间 
     * 则又可以愉快地进行打卡了
     */

    getlastDate() // 获取当前日期
    var punchTime = storageFn("punchTime"); // 读取上次存储的打卡时间

    if (punchTime == null) {

        // 第一次打开 punchTime是空的 将当前时间存进去 
        $(".hit").addClass("active").html("已打卡")
        storageFn("punchTime", user.punchTime, true) // 把当前时间存到本地浏览器
        storageFn("hitOk", 1, true) // 用于检测 1 表示已经打卡
        addDayHit()
    } else {
        // 第n次打开
        punchTime = punchTime.split(",")

        if (user.getDat > punchTime[0] || user.getMont > punchTime[1]) {

            // 第二次打开该页面 如果符合打卡的条件则 打开打卡开关
            $(".hit").addClass("active").html("已打卡")
            storageFn("punchTime", user.punchTime, true) // 第二次打卡 存入第二次打卡的时间
            storageFn("hitOk", 1, true) // 用于检测 1 表示已经打卡
            addDayHit()

        }
    }
}
function login() {

    // 登录弹框  登录验证
    $(".submit").on("click", function () {
        user.userName = $("input.username").val()
        user.passWord = $("input.password").val()
        if (user.userName == "" || user.passWord == "") {
            $(".notic").css("display", "block");
        } else {
            $(".notic").css("display", "none");
            storageFn("userName", user.userName, true)
            storageFn("passWord", user.passWord, true)
            $(".logindiv").css("display", "none")
        }
        
        // 将账户名读取出来 放入用户界面
        $(".username-title").html(storageFn("userName", false))

    })
}
function checkStorage() {

    // 校验本地存储数据 

    checkUser() // 校验用户是否存在 
    checkHitOk() // 校验打卡天数
    errorTest() // 初始化错题集
    collectTest() // 初始化收藏集
}

function checkHitOk() {

    /**
     * 校验打卡天数
     */
    var DayHitCount = storageFn("DayHitCount") // 获取打卡天数

    // 获取当前日期
    getlastDate()
    var punchTime = storageFn("punchTime"); // 读取上次存储的打卡时间
    try {
        if (user.getDat > punchTime[0] || user.getMont > punchTime[1]) {
            storageFn("hitOk", 0, true) // 用于检测， 0 表示到了可以打卡的那天
        }
    } catch (error) {

    };

    if (storageFn("hitOk")) {

        // 如果打卡时间未到 则不能打卡
        $(".hit").addClass("active").html("已打卡")
    } else {
        $(".hit").removeClass("active").html("打卡")
    }

    if (DayHitCount) {
        // 登录时校验 如果存在数据 则写入

        $(".dayHit-nums").html(DayHitCount)
    }
}
function checkUser() {

    /**
     * 校验用户是否存在
     */
    var userName = storageFn("userName") // 获取账号
    var passWord = storageFn("passWord") // 获取密码
    if (userName && passWord) {

        // 如果已经存在用户名和密码 则不需要登录
        $(".logindiv").css("display", "none")
    }
}
function storageFn(Name, Value, Bool) {

    // 封装一个存取本地数据的函数
    // Name, Value, Bool 名 值 存取
    // bool true 存
    // bool false 取
    if (Bool) {
        // 存
        localStorage.setItem(Name, Value);
    } else {
        // 取
        return localStorage.getItem(Name)
    }
}
function runTree(group) {

    // 根据数据生成节点树
    var str = "";
    var headStr = ""; // 存储头
    var childStr = null; // 存储子
    var len = null;
    var i = 1;
    group.forEach(function (ele, index) {
        childStr = "";
        // 生成头 把所有头菜单都渲染出来
        headStr = '<li class="nav">\
                        <a href="#">\
                            <i class="iconfont icon-all"></i>'+ ele.nav + '</a>\
                        <span class="iconfont icon-moreunfold"></span>\
                    </li>\
                    <ul class="ul-child-'+ i + '">'

        for (var prop in ele.content) {
            // 生成子列表 把所有字列表渲染出来
            childStr += '<li>' + prop + '</li>';
        }
        childStr += "</ul>'";

        str += headStr + childStr;
        $(".wrapper-ul").html(str);
        i++;

        $("ul[class^='ul-child']").on("click", "li", function (e) {

            /**
             * 获取所点击的列表 存入临时变量
             * 进入测试函数 
             * 测试该列表内容的试题是否足量
             * */
            user.inner = $(e.target).html();

            // 测试函数
            checkTestOK(user.inner)

        })
    });

    navClick()
}

function navClick() {
    $(".nav").on("click", function () {

        // 实现二级菜单收放与小尖角变化
        var index = $(".nav").index(this); // index 为 0 1 2 3  
        var span = $(".nav").eq(index).find("span");
        if (span.hasClass("icon-less")) {
            span.removeClass("icon-less").addClass("icon-moreunfold")
        } else {
            span.removeClass("icon-moreunfold").addClass("icon-less")
        }
        $(".ul-child-" + ++index).slideToggle();
    })

}





$(".result-go").on("click", function () {
    $(".from-answer").css("display", "block")
    $(".checkSub").css("display", "block");
    $(".result").css("display", "none");
    $(".submitTestDiv").css("display", "none");
})


$(".result-exit, .checkSub-no").on("click", function (e) {

    // 将提示是否提交试卷的按钮显示 试卷答案恢复默认隐藏状态，同时隐藏该底层遮罩层 
    $(".checkSub").css("display", "block");
    $(".result").css("display", "none");
    $(".submitTestDiv").css("display", "none");
})
$(".checkSub-yes").on("click", function () {

    /**
     * 点击确定提交试卷按钮
     * 隐藏询问是否提交试卷的对话框
     * 显示考试结果的对话框
     */


    errorTest() // 修改错题集
    collectTest() // 修改收藏集
    clearInterval(user.timer) // 清除试题计时器
    $(".checkSub").css("display", "none"); // 隐藏 提示是否提交试卷 对话框
    $(".result").css("display", "block") // 显示考试结果

})

$("span.home").on("click", function (e) {

    // 点击返回首页 隐藏无关元素 隐藏试题组 考试结果

    clearInterval(user.timer) // 清除试题计时器
    $(".test-group").css("display", "none");
    $(".submitTestDiv").css("display", "none");

    fl = 1; // 恢复滑屏默认值
})

function cancelBobble(dom, type) {

    // 取消冒泡函数
    dom.on(type, function (e) {
        return false;
    })

}

cancelBobble($(".test-group, .submitTestDiv, .overDiv"), 'touchmove')
cancelBobble($(".bouns"), 'click')
cancelBobble($(".logindiv, .check-list"), 'touchmove')


function cancelScroll(dom) {
    dom.scroll(function () {
        return false;
    })
}

var fl = 1; // 用于记录滑屏数
var marDom = null; // 用于记录前后传进来的dom是否为同一个对象
swape($(".wraper"), 2)
swape($(".testHere"), 10)
function swape(dom, pages) {

    // 封装一个滑动函数

    //左右滑动翻页
    dom.on('touchstart', function (e) {

        //touchstart事件
        var startX = e.touches[0].clientX, // 手指触碰屏幕的x坐标
            pullDeltaX = 0;
        dom.on('touchmove', function (e) {

            //touchmove事件
            var x = e.touches[0].clientX; // 手指移动后所在的坐标

            pullDeltaX = x - startX; // 移动后的位移
            if (!pullDeltaX) {
                return; // 如果坐标是0 结束事件
            }
        });

        dom.on('touchend', function (e) {

            //touchend事件
            dom.off('touchmove touchend');

            // 解除touchmove和touchend事件

            // 判断移动距离是否大于30像素
            if (pullDeltaX > 30) {
                if (fl != 1) {
                    before(dom)
                }

                // 右滑，往前翻所执行的代码
            } else if (pullDeltaX < -30) {
                if (fl != pages) {
                    after(dom)
                }
            }
        });
    })
}
function before(ele) {

    // 向前滑动
    if (!ele.is(":animated")) {
        ele.stop(false, true).animate({ left: "+=" + 100 + "vw" }, 300);
        fl--;
        console.log(ele)
        $(".navnum").html(fl + "/10")
        if (fl == 9) {

            $(".submitTest").css("display", "none")
            $(".bouns-next").css("display", "inline-block")
        }
    }
}
function after(ele) {

    /**
     * 试题往后滑动的函数
     * 如果不在进行动画中 则点击时进行下一页切换
     * 修改页面索引fl
     * 如果到了第十页
     * 修改“下一页”按钮的文字内容 并且重置类名用于绑定点击
     * 
     * 给新类名绑定点击事件 显示提交提示遮罩层
     */
    if (!ele.is(":animated")) {
        ele.stop().animate({ left: "-=" + 100 + "vw" }, 300);
        fl++;

        console.log(ele)
        $(".navnum").html(fl + "/10")

        if (fl == 10) {

            $(".bouns-next").css("display", "none")
            $(".submitTest").css("display", "inline-block")


            // $(".submitTest").attr("class","bouns-next")
        }
    }
}
$(".submitTest").on("click", function () {


    $(".submitTestDiv").css("display", "block");

})
dobutton($(".bouns-prev"))
dobutton($(".bouns-next"))
function dobutton(dom) {

    // 点击上一题 下一题的事件效果
    dom.on("click", function (e) {

        if ($(this).attr("class") == "bouns-prev") {
            if (fl != 1) {
                before($(".testHere"))
            }
        } else {
            if (fl != 10) {
                after($(".testHere"))
            }
        }

    })
}






// 点击收藏题目
$(".testHere").on("click", ".Collection", function () {
    if ($(this).hasClass("icon-favorite")) {

        // 显示已收藏按钮 执行收藏函数
        $(this).removeClass("icon-favorite").addClass("icon-favoritesfilling")
        var num = $(this).attr("testnum") // 获取题目编号
        collectTest(num, true, "collectNum") // 题目编号 存入 存入的key
    } else {

        // 显示未收藏按钮 执行移除收藏操作
        $(this).removeClass("icon-favoritesfilling").addClass("icon-favorite")
        var num = $(this).attr("testnum") // 获取题目编号
        collectTest(num, false, "collectNum") // 题目编号 删除 删除的key
    }

})

function collectTest(num, flag, storAttr) {

    // 用于操作收藏题目
    /**
     * 思路：根据在收藏按钮绑定的题目标号testNum 收藏相对应的题目索引
     * 将收藏的编号存入本地数据
     * 封装两个数组方法 删除数组内的某一个值
     */

    // 操作该数组 num：题目编号 flag：true/false 存入/删除 storAttr：storageKey
    dealStorageArr(num, flag, storAttr)
    collectTest() // 收藏集处理函数


}

function dealStorageArr(num, flag, storAttr) {

    // 封装一个用于处理本地数据数组类型的函数
    // 可用于某个数据数组的存入和删除
    var getLocalNum = storageFn(storAttr) // 获取已经存储的值的数组
    if (flag) {

        // true 存入值
        var newNum = num + ",";

        if (getLocalNum == null) {

            storageFn(storAttr, newNum, true)
        } else {
            getLocalNum += newNum;
            storageFn(storAttr, getLocalNum, true)
        }
    } else {

        // false 删除值
        if (getLocalNum != null) {

            var removArr = getLocalNum.split(",");
            removArr.remove(num);
            storageFn(storAttr, removArr.join(","), true)
        }

    }


}



// 封装两个数组方法 用于删除数组里面的某一个值
// 思路：先获取该值的索引 再通过数组提供的splice方法删除该值
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


function checkItem() {

    /**
     * 点击选项 
     * 点击一个选项 所点击选项的兄弟节点都移除ischecked类名
     * 同时给自身加上ischecked类名
     * 
     * 利用绑定的数据 判断所点击的选项是不是正确的
     * 如果不是正确的 获取该题目所在当前父元素的索引 则在试题结果对应的索引显示红色
     */
    var key1 = 1, // 初始开关 用于点击
        key2 = 1,
        itemsType = null; // 用于判断前后两次点击的是否是一个对象
    $(".checkdiv").on("click", ".checkItem", function (e) {

        $(this).find(".checkBtn").addClass("ischecked")
        $(this).siblings().find(".checkBtn").removeClass("ischecked")

        var ans = $(this).attr("data-result") // 获取选项答案
        var data_num = $(this).attr("data-num") - 1 // 获取选项页面索引 eq索引从0开始

        if ($(this).parent().attr("testnum") != itemsType) {

            // 如果两次点击的对象都不是同一个 则恢复初始开关
            key1 = 1
            key2 = 1
        }
        itemsType = $(this).parent().attr("testnum")
        // 如果点击了选项，则获取该题目的标号 传入错题集函数 
        var data_testNum = $(".checkdiv").eq(data_num).attr("testNum")  // 获取题目编号

        if (ans == "false") {

            // 如果选了错误的答案 就渲染到试题结果
            $(".resultBtn").eq(data_num).removeClass("istrue")
            $(".resultBtn").eq(data_num).addClass("isfalse")



            // 操作该数组 num：题目编号 flag：true/false 存入/删除 storAttr：storageKey
            if (key1) {
                key1 = 0;
                key2 = 1;
                dealStorageArr(data_testNum, true, "errorNum")
            }

        } else {
            if (key2) {
                key2 = 0
                key1 = 1
                dealStorageArr(data_testNum, false, "errorNum")
            }

            $(".resultBtn").eq(data_num).removeClass("isfalse")
            $(".resultBtn").eq(data_num).addClass("istrue")
        }
    })

}


function collectTest() {

    /**
     * 收藏集收集函数 可用于初始化收藏集
     * 根据存入本地的题目编号 搜索对应数据 并渲染出题目
     */

    var len = splitAndDrawing("collectNum") // 分割并渲染错题集

    $(".collect span").html(len) // 存入
}


function errorTest() {

    /**
     * 错题集收集函数 可用于初始化错题集
     * 根据存入本地的题目编号 搜索对应数据 并渲染出题目
     */
    var len = splitAndDrawing("errorNum") // 分割并渲染错题集

    $(".error span").html(len) // 存入
}
function splitAndDrawing(storageKey) {

    // 通过调用匹配题目标号的函数，封装一个分割并且渲染数据的函数
    user.findArr = [];
    var stor = storageFn(storageKey)
    var len = 0;
    try {
        stor = stor.split(",")
        console.log(stor)
        for (var i = 0; i < stor.length - 1; i++) { // 因stor的最后一位是空字符串 所以还要-1
            user.findArr.push(findTest(stor[i]))
        }
        len = stor.length - 1;
    } catch (error) {
        console.log(stor + "获取为空")
    }

    runDraw(user.findArr)

    return len
}

function runDraw(arr) {

    // 渲染列表
    var str = "";
    arr.forEach(function (ele, index) {
        str += '<div class="check-search-items" data-num=' + ele.testNum + '>\
                    <p class="search-items">'+ ele.test.title + '</p>\
                    <div class="items-type">\
                        <span class="items-parent">'+ ele.type + '</span>\
                        <span class="items-child">'+ ele.about + '</span>\
                    </div>\
                </div>'
    })

    $(".check-search").html(str)
    $(".check-search-items").on("click", function () {

        // 绑定列表点击
        var theNum = $(this).attr("data-num")
        errorDiv(theNum) // 调用查看错题函数
        $(".check-error-over").css("display", "block");
    })
}

function findTest(str) {

    // 封装查找匹配标号的题目的函数 
    // 返回匹配的错题
    var obj = null;
    group.forEach(function (ele, index) {
        var newobj = ele.content;
        for (var prop in newobj) {
            if (newobj.hasOwnProperty(prop)) {
                var newArr = newobj[prop].questionBank;
                newArr.forEach(function (el, inde) {
                    if (el.testNum == str) {
                        //  console.log(el)
                        obj = el
                    }
                })
            }
        };
    })
    return obj;
}

console.log(findTest("jq_000"))

function testIsNull(inner) {

    /**
     * 修改弹框内容 将进入正常测试的按钮隐藏 替换成重新测试的按钮
     * 显示遮罩层
     * 绑定重新测试的点击事件
     * 遍历保存下来的所有试题
     * 标记属性全部置0
     * 隐藏遮罩层提示框
     */

    $(".prompt-text").html("您已完成所有测试，是否重新开始？");
    $(".prompt-yes").css("display", "none")
    $(".prompt-again").css("display", "inline-block")
    $(".overDiv").css("display", "block");

    $(".prompt-again").on("click", function () {

        // 把所有题目的标志属性都重置 0表示未进行测试
        for (var prop in user.TestArr) {
            user.TestArr[prop].exist = 0;

        }
        $(".resultBtnDiv span").attr("class","resultBtn isfalse") // 题库答案全部重置 
        localStorage.removeItem("errorNum")// 把存储的错题都清空
        //localStorage.removeItem("errorNum")// 把存储的错题都清空
        $(".overDiv").css("display", "none");
        /// $(".test-group").css("display", "block")
    })
}

// 遮罩层点击事件
$(".prompt-no").on("click", function () {

    /**
     * 点击关闭 隐藏遮罩层
     */
    $(".overDiv").css("display", "none");
})
$(".prompt-yes").on("click", function () {

    /**
     * 点击开始正常测试的按钮 隐藏遮罩层提示框
     * 显示试题组 开始计时
     */
    $(".overDiv").css("display", "none");

    $(".navtime").html("00:20:00") // 初始化时间
    setTime()
    $(".test-group").css("display", "block")
})


function setTime() {

    /**
     * 倒计时二十分钟 00:20:00
     * 设置分 秒 
     * 如果规定的时间内完成所有答题 则关闭定时器
     * 若规定时间内没有完成所有答题 则弹出提示框 强制显示答题结果
     */
    var min = user.min,
        sen = user.sen;

    var that = this;
    user.timer = setInterval(function () {

        var timego = "00:" + min + ":" + sen
        $(".navtime").html(timego)
        sen--;

        if (sen < 0) {
            sen = 59;
            min--;
            if (min < 10) {
                min = "0" + min;
            }
        }

        if (sen < 10) {
            sen = "0" + sen;
        }
        if (min == 0 && sen == 0) {
            var timego = "00:" + min + ":" + sen
            $(".navtime").html(timego)

            $(".result p").html("时间到！以下是你的考试成绩，请再接再厉哦是！")
            $(".submitTestDiv").css("display", "block") // 显示考试结果
            $(".checkSub").css("display", "none")
            $(".result").css("display", "block")
            clearInterval(user.timer)
        }
    }, 1000)
}
function checkTestOK(test) {

    // 用于检测该试题数目 是否足够 
    group.forEach(function (ele, index) {

        /**
         * 遍历group数组索引对象
         * 若所点击的列表传过来的值存在该数组对象中
         * 则将所选列表的所有题目存入临时数组中 
         * 用于随机生成试题
         * */

        if (ele.content[test]) {

            // 将该选项题库的所有题目存入一个临时数组
            user.TestArr = ele.content[test].questionBank

        }
    })


    var count = 0; // 计数器 用于计算未测试过的题目是否足量
    var len = user.TestArr.length; // 数组长度 用于随机生成数组索引 渲染试题
    for (var i = 0; i < len; i++) {

        // 计算是否还有足够的未测试过的题目
        if (user.TestArr[i].exist == 0) {
            count++;
        }
    }
    if (count >= 10) {
        /**
         * 题目量足够 生成题目之前清空原来的题目
         * 动态修改对话框内容 提示是否进入该测试
         * 显示遮罩层 显示提交按钮 隐藏重置按钮
         * 将旧试题内容置空
         * 生成试题
         */

        $(".prompt-text").html("是否立即进入" + user.inner + "测试？");
        $(".overDiv").css("display", "block");

        $(".prompt-yes").css("display", "inline-block")
        $(".prompt-again").css("display", "none")
        $(".testHere").html("")

        createTest(); // 生成试题函数


    } else {

        /**
         * 如果题目不足量 弹框提示是否重新开始考试
         */

        testIsNull(test) // 弹出提示框重新开始函数
    }
}
function createTest() {


    // test是所点击按钮的文字内容
    // 生成试题 存入数组 渲染试题列表

    // 生成试题之前 先初始化界面数据
    fl = 1;
    $(".testHere").attr("style", "left:0")
    $(".navnum").html(fl + "/10")
    $(".bouns-next").css("display", "inline-block")
    var testNum = 10;
    var strTest = "";


    var len = user.TestArr.length;
    while (testNum) {
        var i = Math.floor(Math.random() * len);
        if (!user.TestArr[i].exist) {
            testNum--;

            user.TestArr[i].exist = 1;

            // 把已经生成的题目存入本地 
            //storageFn("", , true)

            /**
             * data-num: 绑定的数据索引 用于关联答案
             * data-result：答案是否正确
             */
            var test = user.TestArr[i].test;
            var thisArr = user.TestArr[i];
            strTest = '<div class="question">\
                        <span class="Collection iconfont icon-favorite" testNum='+ thisArr.testNum + '></span>\
                        <p class="test-title">'+ test.title + '</p>\
                        <div class="checkdiv" testNum='+ thisArr.testNum + '>\
                            <div class="checkItem" data-num="'+ (10 - testNum) + '" data-result="' + test.check.A[1] + '">\
                                <span class="checkBtn">A</span>\
                                <span class="checkText">'+ test.check.A[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+ (10 - testNum) + '" data-result="' + test.check.B[1] + '">\
                                <span class="checkBtn">B</span>\
                                <span class="checkText">'+ test.check.B[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+ (10 - testNum) + '" data-result="' + test.check.C[1] + '">\
                                <span class="checkBtn">C</span>\
                                <span class="checkText">'+ test.check.C[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+ (10 - testNum) + '" data-result="' + test.check.D[1] + '">\
                                <span class="checkBtn">D</span>\
                                <span class="checkText">'+ test.check.D[0] + '</span>\
                            </div>\
                        </div>\
                        <div class="from-answer">\
                            <div class="form">'+ thisArr.from + '</div>\
                            <div class="answer-div">\
                                <p class="about">'+ thisArr.about + '</p>\
                                <p class="answer">'+ thisArr.answer + '</p>\
                            </div>\
                        </div>\
                    </div>';

            $(".testHere").append(strTest)
            // $(".from-answer").css("display","none")
        }
    }
    checkItem() // 绑定点击事件

}

// 个人页面
$(".collect").on("click", function () {
    $(".check-search").html("")
    collectTest()
    leftBan()
})
$(".error").on("click", function () {

    /**
     * 点击错题集
     * 显示错题集div
     * 动画滑动过来 同时个人页面隐藏的半透明遮罩显示 并逐渐变为半透明
     * 
     */
    $(".check-search").html("")
    errorTest()
    leftBan()
})

function leftBan() {

    // 承载错题集和收藏集的div动画
    $(".check-list").css("display", "block")
    if (!$(".check-list").is(":animated")) {
        $(".check-list").animate({ "left": 0 }, 250)

    }
    $(".icon-bussinessman").on("click", function () {
        if (!$(".check-list").is(":animated")) {
            $(".check-list").animate({ "left": -100 + "vw" }, 250)
        }
    })
}

function errorDiv(num) {

    var obj = findTest(num) // 传入错题标号 返回匹配试题组
    var str = "";
    console.log(obj)
    str = '<div class="error-div">\
                    <div class="error-top">我的错题</div>\
                    <p class="error-test-title">'+ obj.test.title + '</p>\
                    <div class="error-checkdiv">\
                        <div class="error-checkItem">\
                            <span class="error-checkBtn">A</span>\
                            <span class="error-checkText">'+ obj.test.check.A[0] + '</span>\
                        </div>\
                        <div class="error-checkItem">\
                            <span class="error-checkBtn">B</span>\
                            <span class="error-checkText">'+ obj.test.check.B[0] + '</span>\
                        </div>\
                        <div class="error-checkItem">\
                            <span class="error-checkBtn">C</span>\
                            <span class="error-checkText">'+ obj.test.check.C[0] + '</span>\
                        </div>\
                        <div class="error-checkItem">\
                            <span class="error-checkBtn">D</span>\
                            <span class="error-checkText">'+ obj.test.check.D[0] + '</span>\
                        </div>\
                    </div>\
                    <div class="error-show">答案及解析</div>\
                    <div class="error-from-answer">\
                        <div class="form">'+ obj.from + '</div>\
                        <div class="answer-div">\
                            <p class="about">'+ obj.about + '</p>\
                            <p class="answer">'+ obj.answer + '</p>\
                        </div>\
                    </div>\
                    <div class="error-btn">\
                        <button class="error-close">关闭</button>\
                        <button class="error-remove">从错题集删除</button>\
                    </div>\
                </div>'

    $(".check-error-over").html(str)
    $(".error-close").on("click", function () {
        $(".check-error-over").css("display", "none");
    })
    $(".error-show").on("click", function () {
        $(".error-from-answer").toggle()
    })
}


var searchTime = null;
$(".search-div input").on("input", function () {
    var that = this;
    searchTime = setTimeout(function () {
        runDraw(filterText(that.value, user.findArr)) 
        // 当点击收藏集 错题集 user.findArr 都会刷新一遍 所以可直接用此全局变量
    }, 1200)
})
function filterText(text, arr) { // 自定义一个filter方法
    return arr.filter(function (ele, index) { // arr调用filter方法
        if (ele.test.title.indexOf(text) !== -1) { // indexOf(text) 用于判断输入值value与该name是否有相同的值
            return true; // 符合条件的列表 返回
        }
    })
}
