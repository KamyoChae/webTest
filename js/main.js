$(document).ready(function () {
    // console.log(group);
    //localStorage.removeItem("punchTime")
    localStorage.clear()
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
    console.log(DayHitCount)
    if (!DayHitCount) {

        // 如果是第一次打卡 则把默认的打卡天数存进去 作为初始化
        DayHitCount = user.DayHitCount; // DayHitCount = 0
        DayHitCount++;
        storageFn("DayHitCount", DayHitCount, true)
        console.log(DayHitCount + "存入本地")
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
        console.log("第二次打开，进行上次存储的数据分割" + punchTime)
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
    })
}
function checkStorage() {

    // 校验本地存储数据 
    var userName = storageFn("userName")
    var passWord = storageFn("passWord")
    var DayHitCount = storageFn("DayHitCount")

    // 获取当前日期
    getlastDate()
    var punchTime = storageFn("punchTime"); // 读取上次存储的打卡时间
    console.log(punchTime)
    try {
        if (user.getDat > punchTime[0] || user.getMont > punchTime[1]) {
            storageFn("hitOk", 0, true) // 用于检测， 0 表示到了可以打卡的那天
        }
    } catch (error) {
        console.log(11)
    };


    if (userName && passWord) {

        // 如果已经存在用户名和密码 则不需要登录
        $(".logindiv").css("display", "none")
    }

    if (storageFn("hitOk")) {

        // 如果打卡时间未到 则不能打卡
        $(".hit").addClass("active").html("已打卡")
    } else {
        $(".hit").removeClass("active").html("打卡")
    }

    if (DayHitCount) {
        // 登录时校验 如果存在数据 则写入
        console.log(555)
        $(".dayHit-nums").html(DayHitCount)
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











$(".result-go").on("click", function(){
    $(".from-answer").css("display","block")
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
    $(".checkSub").css("display", "none"); // 隐藏 提示是否提交试卷 对话框
    $(".result").css("display", "block") // 显示考试结果
})

$("span.home").on("click", function (e) {

    // 点击返回首页 隐藏无关元素 隐藏试题组 考试结果
    console.log(e.target)
    $(".test-group").css("display", "none");
    $(".submitTestDiv").css("display", "none");
})

function cancelBobble(dom, type) {

    // 取消冒泡函数
    dom.on(type, function (e) {
        return false;
    })

}
cancelBobble($(".test-group"), 'touchmove')
cancelBobble($(".bouns"), 'click')
cancelBobble($(".logindiv"), 'touchmove')


var fl = 1; // 用于记录滑屏数
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
                return;
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
        console.log("按钮的flag：" + fl)
        $(".navnum").html(fl + "/10")

        if (fl == 10) {
 
            console.log("执行到371的操作了")
            $(".bouns-next").css("display", "none")
            $(".submitTest").css("display", "inline-block")


            // $(".submitTest").attr("class","bouns-next")
        }
    }
}
$(".submitTest").on("click", function () {


    console.log("点击了提交试卷按钮")
    console.log(fl)
    $(".submitTestDiv").css("display", "block");

})
dobutton($(".bouns-prev"))
dobutton($(".bouns-next"))
function dobutton(dom) {

    // 点击上一题 下一题的事件效果
    dom.on("click", function (e) {
        console.log($(this).attr("class"))
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
        var num = $(this).attr("testnum")
        collectTest(num, true)
    } else {

        // 显示未收藏按钮 执行移除收藏操作
        $(this).removeClass("icon-favoritesfilling").addClass("icon-favorite")
        var num = $(this).attr("testnum")
        collectTest(num, false)
    }

})

function collectTest(num, flag) {

    // 用于操作收藏题目
    /**
     * 思路：根据在收藏按钮绑定的题目标号testNum 收藏相对应的题目索引
     * 将收藏的编号存入本地数据
     * 封装两个数组方法 删除数组内的某一个值
     */

    var getLocalNum = storageFn("collectNum") // 获取已经存储的值
    if (flag) {
        var newNum = num + ",";
        console.log(newNum)
        if (getLocalNum == null) {

            console.log("第一次存储收藏的题目编号")
            storageFn("collectNum", newNum, true)
        } else {
            getLocalNum += newNum;
            storageFn("collectNum", getLocalNum, true)
        }
    } else {
        var removArr = getLocalNum.split(",");
        removArr.remove(num);
        storageFn("collectNum", removArr.join(","), true)
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

    $(".checkdiv").on("click",".checkItem", function(e){
        console.log(this)
        $(this).find(".checkBtn").addClass("ischecked")
        $(this).siblings().find(".checkBtn").removeClass("ischecked")

        var ans = $(this).attr("data-result") // 获取选项答案
        var data_num = $(this).attr("data-num")-1 // 获取选项页面索引 eq索引从0开始
        console.log(ans)
        if(ans == "false"){

            // 如果选了错误的答案 就渲染到试题结果
           
           console.log(data_num)

           $(".resultBtn").eq(data_num).removeClass("istrue")
           $(".resultBtn").eq(data_num).addClass("isfalse")
        }else{
            $(".resultBtn").eq(data_num).removeClass("isfalse")
            $(".resultBtn").eq(data_num).addClass("istrue")
        }
    })

}




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
        console.log(user.TestArr)
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
     * 显示试题组
     */
    $(".overDiv").css("display", "none");
    // createTest()

    $(".test-group").css("display", "block")
})

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
        console.log("生成了试题")

    } else {

        /**
         * 如果题目不足量 弹框提示是否重新开始考试
         */
        console.log("没有题目了")
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
    console.log(user.TestArr)

    var len = user.TestArr.length;
    while (testNum) {
        var i = Math.floor(Math.random() * len);
        if (!user.TestArr[i].exist) {
            testNum--;
            console.log(testNum)
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
                        <div class="checkdiv">\
                            <div class="checkItem" data-num="'+(10-testNum)+'" data-result="'+ test.check.A[1] + '">\
                                <span class="checkBtn">A</span>\
                                <span class="checkText">'+ test.check.A[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+(10-testNum)+'" data-result="'+ test.check.B[1] + '">\
                                <span class="checkBtn">B</span>\
                                <span class="checkText">'+ test.check.B[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+(10-testNum)+'" data-result="'+ test.check.C[1] + '">\
                                <span class="checkBtn">C</span>\
                                <span class="checkText">'+ test.check.C[0] + '</span>\
                            </div>\
                            <div class="checkItem" data-num="'+(10-testNum)+'" data-result="'+ test.check.D[1] + '">\
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

