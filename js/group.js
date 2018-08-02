

var jqQuest = [
    // 题库1 类数组好生成随机索引
    /*
    * 利用
    *
    *
    *
    */
    { // 试题组第一题
        "test": { // 试题
            "title": "以下不属于jq选择器的是",
            "check": {
                A: ["组群选择器：$('divspana')", true],
                B: ["标签选择器：$('p')", false],
                C: ["class选择器：$('.class')", false],
                D: ["后代选择器：$('ul li a')", false],
            },
        },

        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A：组群选择器：$('div, span, a')", // 存储答案 用于解析
        "about": "jq选择器", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下不属于jq过滤选择器的是",
            "check": {
                A: ["$('div:eve'): 选择奇数的div", true],
                B: ["$('div:first') : 所有div的第一个元素", false],
                C: ["$('div:last'): 所有div的最后一个元素", false],
                D: ["$('div:not(.selector)'): 选择除类名为selector的div", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A：$('div:even'): 选择奇数的div，选项少了个n", // 存储答案 用于解析
        "about": "jq选择器", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下不属于jq选择器的是",
            "check": {
                A: ["$('div:even'): 选择偶数的div", true],
                B: ["$(':focus') : 选择所有获得焦点的元素", false],
                C: ["$(':animated') : 选择正在执行动画的元素", false],
                D: ["$(':header') : 选择所有标题元素，即h1-h6", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A：$('div:odd'): 选择偶数的div, jq的索引是从0开始的", // 存储答案 用于解析
        "about": "jq选择器", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下说法正确的是",
            "check": {
                A: ["A.append(B) 把B插入A", true],
                B: ["A.appendTo(B) B插入到A", false],
                C: ["A.after(B) A插入到B后面", false],
                D: ["A.prepend(B) A插入到B前面", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。B:A.appendTo(B) A插入到B,C:A.after(B) B插入到A后面,D:A.prepend(B) B插入到A前面", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下操作不正确的是",
            "check": {
                A: ["$('ul li :eq(0)').html('')", true],
                B: ["$('ul li:eq(0)').remove()", false],
                C: ["$('ul li:eq(0)').detach()", false],
                D: ["$('ul li:eq(0)').empty()", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。多了个空格", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下操作不能包裹节点的是",
            "check": {
                A: ["A.wrapTo('<b></b>')", true],
                B: ["A.wrap('<b></b>')", false],
                C: ["A.wrapAll('<b></b>')", false],
                D: ["A.wrapInner('<b></b>')", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。没有wrapTo这个方法", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下操作不能操作属性的是",
            "check": {
                A: ["修改属性 html('data-log', '100')", true],
                B: ["设置属性 attr('data-log', '100')", false],
                C: ["删除属性 removeAttr('data-log')", false],
                D: ["获取属性 attr('data-log')", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。html()相当于innerHTML，不能html('data-log', '100')这么写", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下说法不正确的是",
            "check": {
                A: ["A.next() 匹配A后面紧邻的元素", true],
                B: ["A.prev() 匹配A前面紧邻的同辈元素", false],
                C: ["A.siblings() 匹配A前后所有的同辈元素", false],
                D: ["A.childen() 获取匹配A子元素的集合", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。A.next() 匹配A后面紧邻的同辈元素", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下说法不正确的是",
            "check": {
                A: ["A.closest() 从当前A位置往下查找匹配的元素", true],
                B: ["A.closest() 从当前A位置往上查找匹配的元素", false],
                C: ["parent() 获取匹配元素的父元素 ", false],
                D: ["parents() 返回该节点的所有祖先节点", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。A.closest() 从当前A位置往上查找匹配的元素", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },
    { // 试题组第一题
        "test": { // 试题
            "title": "以下写法不正确的是",
            "check": {
                A: ["css('background-Color', 'red')", true],
                B: ["css('backgroundColor', 'red')", false],
                C: ["$('p').offset().left", false],
                D: ["$('p').offset().right", false],
            },
        },


        "Collection": 0, // 记录是否收藏 用于收藏集
        "wrong": 0, // 记录是否答错 用于错题集
        "exist": 0, // 记录是否已生成 用于生成试卷
        "answered": 0, // 记录是否已回答 用于复习测试


        "from": "Y.J.林泉", // 存储出题人 用于追根刨地
        "answer": "A。多了个“-”", // 存储答案 用于解析
        "about": "dom操作", // 存储出题方向 考点
    },


]






























var group = [
    {
        nav: "专项训练",
        content: { // 选项列表头
            "JQuery": { // 子选项
                "questionBank": jqQuest,
            },
            "ajax": { // 子选项
                "questionBank": jqQuest,
            }
        },

    },
    {
        nav: "编程训练",
        content: {
            "你不知道的坑": { // 子选项
                "questionBank": jqQuest,
            },
            "占个位置": { // 子选项
                "questionBank": jqQuest,
            }
        },
    },
    {
        nav: "算法结构",
        content: {
            "二叉树": { // 子选项
                "questionBank": jqQuest,
            },
            "计算机原理": { // 子选项
                "questionBank": jqQuest,
            }
        },
    },
    {
        nav: "理论基础",
        content: {
            "操作系统": { // 子选项
                "questionBank": jqQuest,
            },
            "java": { // 子选项
                "questionBank": jqQuest,
            }
        },
    }

]
