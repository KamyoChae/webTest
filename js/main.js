$(document).ready(function () {
    // console.log(group);
    //localStorage.removeItem("punchTime")
    // localStorage.clear()
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

            //成功获取列表里面的值 并渲染到提示框
            user.inner = $(e.target).html();
            $(".prompt-text").html("是否立即进入" + user.inner + "测试？");
            $(".overDiv").css("display", "block");


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


$("span.home").on("click", function (e) {

    // 点击返回首页 隐藏无关元素
    console.log(e.target)
    console.log(11111111111111)
    $(".test-group").css("display", "none");
})

function cancelBobble(dom) {

    // 取消冒泡函数
    dom.on('touchmove', function (e) {
        return false;
    })

}
cancelBobble($(".test-group"))


swape($(".wraper"), 2)
swape($(".testHere"), 10)
function swape(dom, pages) {

    // 封装一个滑动函数
    var flag = 1;

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
                if (flag != 1) {
                    dom.stop().animate({ left: "+=" + 100 + "vw" }, 300);

                    flag--;
                    $(".navnum").html(flag + "/10")
                }

                // 右滑，往前翻所执行的代码
            } else if (pullDeltaX < -30) {

                if (flag != pages) {
                    dom.stop().animate({ left: "-=" + 100 + "vw" }, 300);

                    flag++;
                    $(".navnum").html(flag + "/10")
                }
            }
        });
    })
}


// 遮罩层点击事件
$(".prompt-no").on("click", function () {
    $(".overDiv").css("display", "none");
})
$(".prompt-yes").on("click", function () {
    $(".overDiv").css("display", "none");
    createTest(user.inner)
    $(".test-group").css("display", "block")
})

// 点击收藏题目
$(".testHere").on("click", ".Collection", function () {
    if ($(this).hasClass("icon-favorite")) {

        // 显示已收藏按钮 执行收藏函数
        $(this).removeClass("icon-favorite").addClass("icon-favoritesfilling")
        
    } else {

        // 显示未收藏按钮 执行移除收藏操作
        $(this).removeClass("icon-favoritesfilling").addClass("icon-favorite")
    }

})


function createTest(test) {

    // 生成试题 存入数组 渲染试题列表
    user.TestArr = [];
    group.forEach(function (ele, index) {
        //console.log(ele.content[test])
        if (ele.content[test]) {

            //    console.log(ele.content[test].questionBank[0])
            user.TestArr = ele.content[test].questionBank

        }
        
    })
    var len = user.TestArr.length;
    var testNum = 10;
    var strTest = "";
    
    while(testNum){
        var i = Math.floor(Math.random()*len);
        if(!user.TestArr[i].exist){
            testNum --;
            user.TestArr[i].exist = 1;
            var test = user.TestArr[i].test;
            var thisArr = user.TestArr[i];
            strTest = '<div class="question">\
                    <span class="Collection iconfont icon-favorite"></span>\
                    <p class="test-title">'+test.title+'</p>\
                    <div class="checkdiv">\
                        <div class="checkItem">\
                            <span class="checkBtn">A</span>\
                            <span class="checkText">'+test.check.A[0]+'</span>\
                        </div>\
                        <div class="checkItem">\
                            <span class="checkBtn">B</span>\
                            <span class="checkText">'+test.check.B[0]+'</span>\
                        </div>\
                        <div class="checkItem">\
                            <span class="checkBtn">C</span>\
                            <span class="checkText">'+test.check.C[0]+'</span>\
                        </div>\
                        <div class="checkItem">\
                            <span class="checkBtn">D</span>\
                            <span class="checkText">'+test.check.D[0]+'</span>\
                        </div>\
                    </div>\
                    <div class="from-answer">\
                        <div class="form">'+thisArr.from+'</div>\
                        <div class="answer-div">\
                            <p class="about">'+thisArr.about+'</p>\
                            <p class="answer">'+thisArr.answer+'</p>\
                        </div>\
                    </div>\
                </div>';
            $(".testHere").append(strTest)
        }
    }

}
