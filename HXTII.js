function isIntersection(arr1, arr2) {
    return (arrList2(arr1).intersection(arrList2(arr2))).length == 0 ? false : true;
}


function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    //如果要插入的目标元素是其父元素的最后一个元素节点，直接插入该元素
    //否则，在目标元素的下一个兄弟元素之前插入
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function insertQian(newElement, targetElement) {
    var parent = targetElement.parentNode;
    parent.insertBefore(newElement, targetElement);
}

function removeChildren(targetElement) {
    var parent = targetElement.parentNode;
    parent.removeChild(targetElement);
}


//二维数组排序 升序 
function orderArrA1(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j][0] > arr[j + 1][0]) {
                var tran = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tran;
            }
        }
    }
    return arr;
}
//合并一个二维数组 前提是升序排好的 与orderArrA1合用
function orderArrA2(arr) {

    var temp = orderArrA1(arr);
    temp = arrList2(temp);
    temp = temp.duplicateRemoval();
    temp = listArr2(temp);
    return temp;


}
//一个一维数组除了第一个元素其他的胺降序排列
function orderArrA3(arr) {
    if (arr.length == 1) {
        return arr;
    }
    var ti = arr.shift();
    arr.sort(function(a, b) {
        return b - a
    });
    arr.unshift(ti);
    return arr;
}

//console.log(orderArrA3([2,5,6]))
//console.log(orderArrA2(orderArrA1([[2,5],[1,2]])))

//自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
function factorial(m, n) {
    var num = 1;
    var count = 0;
    for (var i = m; i > 0; i--) {
        if (count == n) { //当循环次数等于指定的相乘个数时，即跳出for循环
            break;
        }
        num = num * i;
        count++;
    }
    return num;
}
//自定义组合函数(就是数学排列组合里的C)
function combination(m, n) {
    return factorial(m, n) / factorial(n, n); //就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
}
//自定义排列函数(就是数学排列组合里的A)
function array(m, n) {
    return factorial(m, n); //就是数学里的Amn,上面是n，下面是m
}
//确定某n个元素的数组全组合后，特定有num个元素的全组合产物在temp的位置(0为起点)
function whereAll(num, n) {
    return res = [all(num - 1, n), all(num, n) - 1];

}
//n全排列到num有多少种
function all(num, n) {
    var res = 0;
    for (var i = 0; i < num; i++) {
        res += combination(n, num - i);
    }
    return res;
}

//颜色合并必须
function lazyTrans1(obj) {
    var res = [];
    for (var val in obj) {
        res.push([val, obj[val]])
    }
    return res;
}

function lazyTrans2(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        res[arr[i][0]] = arr[i][1];
    }
    return res;
}

function lazyTrans3(arr) {
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][1].length == 0) {
            continue;
        } else {
            res.push(arr[i])
        }
    }
    return res;
}

function colorMerge(colorlist, arr, color) {
    return lazyTrans2(lazyTrans3(cML1(lazyTrans1(colorlist), arr, color)))
}

function cML1(colorlist, arr, color) {
    var pushlist = [];
    var poplist = [];

    if (colorlist.length == 0) {
        colorlist.push([color, [arr]]);
    } else {
        for (var i = 0; i < colorlist.length; i++) {
            var temp = [i];
            var tempop = [i];
            for (var j = 0; j < colorlist[i][1].length; j++) {
                // alert("处理"+colorlist[i][1][j]);
                if (colorlist[i][1][j][1] > arr[0] && colorlist[i][1][j][0] < arr[1]) {

                    //优先区域在原区域内
                    if (arr[0] >= colorlist[i][1][j][0] && arr[1] <= colorlist[i][1][j][1]) {
                        //alert(1);
                        if (arr[0] > colorlist[i][1][j][0]) {
                            temp.push([colorlist[i][1][j][0], arr[0] - 1]);
                        }
                        if (arr[1] < colorlist[i][1][j][1]) {
                            temp.push([arr[1] + 1, colorlist[i][1][j][1]]);
                        }

                        tempop.push(j);
                        //colorlist[i][1].splice(j,1);
                        continue;
                    }

                    //原区域在优先区域内          
                    if (arr[0] <= colorlist[i][1][j][0] && arr[1] >= colorlist[i][1][j][1]) {
                        //colorlist[i][1].splice(j,1);
                        tempop.push(j);
                        //  alert(2);
                        continue;
                    }
                    //优先区与原区域左相交
                    if (arr[0] < colorlist[i][1][j][0] && arr[1] > colorlist[i][1][j][0] && arr[1] < colorlist[i][1][j][1]) {
                        //  alert(3);
                        colorlist[i][1][j][0] = arr[1] + 1;
                        continue;
                    }
                    //优先区与原区域右相交
                    if (arr[0] < colorlist[i][1][j][1] && arr[0] > colorlist[i][1][j][0] && arr[1] > colorlist[i][1][j][1]) {
                        //  alert(4);
                        colorlist[i][1][j][1] = arr[0] - 1;
                        continue;

                    }

                }

            }
            // alert(tempop+"fjdoifhdih");
            pushlist.push(temp);
            //alert(orderArrA3(tempop)+"fjdoifhdih");
            poplist.push(orderArrA3(tempop));
        }
        //alert(poplist);
        //console.log(pushlist);
        //alert(colorlist);    
        for (var i = 0; i < poplist.length; i++) {
            for (var j = 0; j < poplist[i].length - 1; j++) {
                //  console.log(poplist[i][0] + "碱" + colorlist[poplist[i][0]][1][poplist[i][j + 1]]);
                colorlist[poplist[i][0]][1].splice(poplist[i][j + 1], 1);
            }
        }
        for (var i = 0; i < pushlist.length; i++) {

            for (var j = 0; j < pushlist[i].length - 1; j++) {
                //  console.log(poplist[i][0] + "加" + pushlist[i][j + 1]);
                colorlist[pushlist[i][0]][1].push(pushlist[i][j + 1]);
            }
        }

        function isHasColor(color) {
            for (var i = 0; i < colorlist.length; i++) {
                if (colorlist[i][0] == color) {
                    colorlist[i][1].push(arr);
                    return true;
                    break;
                }
            }
            return false;

        }

        if (!isHasColor(color)) {

            colorlist.push([color, [arr]]);
        }
    }
    return colorlist;
}

//colorMerge(color0, [1, 100], "color_7ec7f4");



//生成一个连续的数组已准备取交集
function arrList2(arr) {
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        for (var j = arr[i][0]; j <= arr[i][1]; j++) {
            array.push(j);
        }
    }
    return array;
}
//console.log(arrList2(tap["sup"]))
//生成一个连续的数组的反函数
//[3, 4, 6, 7, 8] => [[3,4],[6,8]];
function listArr2(arr) {
    if (arr.length == 1) {
        return array = [
            [arr[0], arr[0]]
        ];
    }
    var array = [];
    var arrayChild = [];
    arrayChild.push(arr[0]);
    for (var i = 0; i < arr.length - 1; i++) {
        arrayChild.push(arr[i + 1]);
        if (arr[i + 1] - 1 == arr[i]) {
            if (i != arr.length - 2) {
                arrayChild.pop();
            } else {
                array.push(arrayChild);
            }

        }
        if (arr[i + 1] - 1 != arr[i]) {
            arrayChild.pop();
            arrayChild.push(arr[i]);
            array.push(arrayChild);
            arrayChild = [];
            if (i != arr.length - 2) {
                arrayChild.push(arr[i + 1]);

            } else {
                arrayChild.push(arr[i + 1]);
                arrayChild.push(arr[i + 1]);
                array.push(arrayChild);
            }

        }
    }

    return array;
}

//给定一个数组对其内容进行全排列 并以二维数组的形式进行返回
function getGroup(data, index = 0, group = []) {
    var need_apply = [];
    need_apply.push([data[index]]);
    for (var i = 0; i < group.length; i++) {
        var tm = [];
        tm.push.apply(tm, group[i]);
        tm.push(data[index]);
        need_apply.push(tm);
    }
    group.push.apply(group, need_apply);

    if (index + 1 >= data.length) return group;
    else return getGroup(data, index + 1, group);
}

function arrSum(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function isNumber(val) {

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }

}

function isElement(obj) {
    return (typeof HTMLElement === 'object') ?
        (obj instanceof HTMLElement) :
        !!(obj && typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 9) && typeof obj.nodeName === 'string');
}

function myError(option) {
    console.log("error" + option.type + " : " + option.reason);
}




function HXT(option) {
    var that = this;
    this.content = option.content;
    this.parent = $$(option.id)
    this.id = option.id;
    this.HXTconst = {
        MB: ["word", "pic", "conp", "div"],
        MBD: { word: "p", pic: "img", conp: "div", div: "div" },
        SPCLASS: {
            link: ["normal", "anchor", "file", "reference", "vocabulary"],
            tap: ["sup", "sub", "udl", "ita", "bod"],
            textal: ["text-align-l", "text-align-c", "text-align-r", "text-align-j"]
        }

    };
    this.hxtconplist = [];
    //渲染后才出来
    this.referencelist = {};

    this.records = {
        parts: 0,
        HXTE: [],
        // HXTL: [],
        titleGrade: [],
        topData: []
    };
    this.init = () => {
        tools.importCssStylsheet("lib/HXTII/HXTII-core_interface.css");
        tools.importCssStylsheet("lib/HXTII/HXTII-font_theme.css");
        tools.importCssStylsheet("lib/HXTII/HXTII-btn_theme.css");
        window.hxt2Conponent = {};
        for (var i = 0; i < this.HXTconst.MB.length; i++) {
            this.records[this.HXTconst.MB[i] + "E"] = [];
        }
    }
    this.plugin = {
        init: () => {
            this.pluginList = {}
            for (var i = 0; i < option.plugin.length; i++) {
                this.pluginList[option.plugin[i]] = this.hxtPluginList[option.plugin[i]].main;
            }
        },
        work: () => {
            for (var val in this.pluginList) {
                this.pluginList[val](this)
            }

        },
    };

    this.countMB = (obj) => {
        var count = 0;
        for (var prop in obj) {
            if (this.HXTconst.MB.indexOf(prop) != -1) {
                count += obj[prop].length;
            }
        }
        return count;
    };
    this.word = (cont, obj) => {
        that = this;
        cont.innerHTML = obj.char;
        var taps = {};
        addClass(cont, "word");


        function hastal(cont) {
            var cl = classList(cont)
            for (var i = 0; i < cl.length; i++) {
                if (that.HXTconst.SPCLASS.textal.indexOf(cl[i]) != -1) {
                    return [true, cl[i]]
                }
            }
            return [false, null];
        }


        if (obj.hasOwnProperty("st")) {
            if (hastal(cont)[0]) {
                removeClass(cont, hastal(cont)[1])
            }
            for (var i = 0; i < obj.st.length; i++) {
                addClass(cont, obj.st[i])
            }

        }



        if (obj.hasOwnProperty("tap")) {
            taps.tap = obj.tap;
        }
        if (obj.hasOwnProperty("color")) {
            taps.color = obj.color;
        }
        if (obj.hasOwnProperty("link")) {
            taps.link = obj.link;
        }

        if (Object.keys(taps).length != 0) {
            this.tapProductor(taps, cont);
        }

        //console.log(cont);
        return cont;
    };
    this.pic = (cont, obj) => {

        function hasmaxst(cont) {
            var cl = classList(cont)
            for (var i = 0; i < cl.length; i++) {
                if (cl[i].substring(0, 3) == "max") {
                    return [true, cl[i]]
                }
            }
            return [false, null];
        }

        cont.src = obj.ad;


        //二次修改专用
        //alert(hasmaxst(cont))
        if (hasmaxst(cont)[0]) {
            removeClass(cont, hasmaxst(cont)[1])
        }
        //二次修改专用

        if (obj.hasOwnProperty("st")) {

            addClass(cont, obj.st);
        }
        var data = { cont: cont, state: "loading" }
        this.records.picE.push(data);
        cont.onload = function() {
            data.state = "OK";
        }
        addClass(cont, "pic");
        return cont;
    };

    this.conp = (cont, obj) => {
        var that = this;
        //初始化函数
        function initcomp() {
            that.hxtconplist.push(new window.hxt2Conponent[obj.conpID]({
                cont: cont,
                data: obj.data
            }))
        }

        if (!window.hxt2Conponent.hasOwnProperty(obj.conpID)) {
            tools.loadScript("lib/HXTII/component/" + obj.conpID + "/" + obj.conpID + ".js", initcomp)
        } else {
            initcomp()
        }
        return cont;
    };

    this.div = (cont, obj) => {
        cont.setAttribute("id", obj.id)

        if (obj.dependence.length != 0) {
            var count = 0;
            //加载依赖脚本
            function loadone() {
                tools.loadScript(obj.dependence[count], function() {
                    // console.log(count + "ok");
                    if (count == obj.dependence.length - 1) {
                        obj.act(cont);
                        return;
                    }
                    count++;
                    loadone()
                })
            }
            loadone()

        } else {
            obj.act(cont);
        }

        return cont;
    };

    function getOutBlock() {
        return $$(option.id).getElementsByClassName("outerBlock");
    }
    this.titleGrading = (obj) => {
        if (obj.hasOwnProperty("pos") && (obj.pos != "blank") && (obj.pos.substring(0, 8) != "maintext")) {
            var num = parseInt(obj.pos.substring(1));
            return num
            // this.records.titleGrade.push();
        }
        if (!obj.hasOwnProperty("pos") || obj.pos == "blank") {
            return "blank"
            // this.records.titleGrade.push("blank");
        }

        if (obj.hasOwnProperty("pos") && obj.pos.substring(0, 8) == "maintext") {
            return "m" + obj.pos.substring(8);
            //this.records.titleGrade.push("m" + obj.pos.substring(8));
        }

    };
    this.selectionProductor = (obj) => {
        var that = this;

        function selDir() {
            var sel = document.getSelection();
            var range = sel.getRangeAt(0);
            //如果在同一个节点的话 看偏移量
            if (range.endContainer == range.startContainer) {
                if (range.startOffset == sel.focusOffset) {
                    if (range.startOffset == range.endOffset) {
                        return "none";
                    } else {
                        return "left";
                    }
                } else {
                    return "right";
                }
            }
            //不在同一节点看 节点
            else {
                if (range.startContainer == sel.focusNode) {
                    return "left";
                } else {
                    return "right";
                }
            }
        }

        function getEachNodeLenT(el) {
            var temp = [];
            var nn = 0;
            for (var i = 0; i < el.childNodes.length; i++) {
                if (el.childNodes[i].nodeType == 3) {
                    temp.push([0, el.childNodes[i].data.length]);
                    continue;
                } else {
                    temp.push([1, el.childNodes[i].innerText.length]);
                }
            }
            //console.log(temp);
            return temp;
        }

        function intersectionState(el) {
            //true是相交就算 false要全相交
            if (window.getSelection().containsNode(el, false)) {
                return 3;
            }

            if (window.getSelection().containsNode(el, true)) {
                return 2;
            }

            return 1;
            //3 全相交 ，2半相交 ，1不相交
        }

        function selectPosition(el) {
            //相交区间版本
            var cNA = getEachNodeLenT(el);
            var ran = document.getSelection().getRangeAt(0);
            // console.log(el.childNodes);

            function countFront(num) {
                var sum = 0;
                for (var i = 0; i < (num + 1); i++) {
                    sum += cNA[i][1];
                }
                return sum;

            }
            var range = [];
            var startNum;
            var endNum;
            var hasStart = 0;
            //粗略寻找 开始节点和结束节点 而且开始节点是准确的
            for (var i = 0; i < cNA.length; i++) {
                //if(textND["p"+paraNow][i][0]==1){}
                if (intersectionState(el.childNodes[i]) != 1) {
                    if (hasStart == 0) {
                        hasStart = 1;
                        //alert("ddd");
                        range.push(i);
                        continue;
                    }
                }
                if (intersectionState(el.childNodes[i]) == 1) {
                    if (hasStart == 1) {
                        range.push(i);

                        break;
                    }
                }

            }

            var leftD = ran.startOffset;
            var rightD = ran.endOffset;

            if (range > 0) {
                startNum = countFront(range[0] - 1) + leftD;
            } else {
                startNum = countFront(range[0] - 1) + leftD;
            }

            if (range.length == 1) {
                //光标到最后一个词了了
                endNum = countFront(cNA.length - 2) + rightD;
            } else {
                endNum = countFront(range[1] - 2) + rightD;
            }
            //console.log(range);
            return [startNum + 1, endNum];
            //原则来说左边不加1，为了人好看而已，对准字符而不是间隙
        }
        this.HXTSelection = {};
        this.HXTSelectionf = {};
        this.HXTSelection.selRange = [];
        this.HXTSelection.selRangePos = "none";

        function seletionMDF() {
            that.HXTSelection.selRange = [];
            that.HXTSelection.selRange[0] = obj.index[0];
            that.HXTSelection.selStratChildIndex = obj.index[1];
            that.HXTSelection.selStratDom = obj.cont;
            that.HXTSelection.selStratIndex = obj.index[0];
        }

        function seletionMUF() {
            that.HXTSelection.selRange[1] = obj.index[0];
            that.HXTSelection.selEndDom = obj.cont;
            that.HXTSelection.selEndIndex = obj.index[0];
            that.HXTSelection.selEndChildIndex = obj.index[1];
            that.HXTSelection.selDir = selDir();
            that.HXTSelection.selRangeA = [Math.min.apply(null, that.HXTSelection.selRange), Math.max.apply(null, that.HXTSelection.selRange)];
            that.HXTSelection.isLinkIn = false;

            if (that.HXTSelection.selRange[0] == that.HXTSelection.selRange[1] && that.HXTSelection.selStratChildIndex == that.HXTSelection.selEndChildIndex) {
                that.HXTSelection.selRangePos = selectPosition(obj.cont);
                that.HXTSelection.selLength = that.HXTSelection.selRangePos[1] - that.HXTSelection.selRangePos[0] + 1;
                that.HXTSelection.selRPR = that.getItem(obj.index[0], obj.index[1] + 1)
                that.HXTSelection.selRPRindex = [obj.index[0], obj.index[1] + 1]
                var selfCont = that.HXTSelection.selRPR;
                if (selfCont.hasOwnProperty("link")) {
                    for (var i = 0; i < selfCont.link.length; i++) {
                        if (isIntersection([selfCont.link[i][1]], [that.HXTSelection.selRangePos])) {
                            that.HXTSelection.isLinkIn = true;
                            break;
                        }
                    }
                }

            } else {
                that.HXTSelection.selRangePos = "none";
                that.HXTSelection.selLength = 0;
                that.HXTSelection.selRPR = "none"
                that.HXTSelection.selRPRindex = "none"
            }


            if (that.pluginList.hasOwnProperty("mouseMenu")) {
                // console.log(that.pluginList)
                if (that.HXTSelection.selLength != 0 && that.HXTSelection.selRangePos != "none") {
                    try {
                        that.mouseMenu.show();
                    } catch (err) {
                        console.log("菜单插件没加载好呢")
                        console.log(err);
                    }
                }

            }

            if (that.pluginList.hasOwnProperty("HXTIIeditor")) {
                // console.log(that.pluginList)
                if (that.HXTSelection.selRangePos != "none") {
                    try {

                        that.HXTIIeditor.toolsBtn();

                    } catch (err) {
                        console.log("编辑器选区插件没加载好呢")
                        console.log(err);
                    }
                }

            }



            console.log(that.HXTSelection);
        }

        this.HXTSelectionf.seletionUnbondAll = () => {
            console.log(0);
            for (var i = 0; i < $C$("cellBlock").length; i++) {
                this.HXTSelectionf.seletionUnbond($($C$("cellBlock")[i]));
            }
        }


        this.HXTSelectionf.seletionUnbond = function(el) {
            el.unbind();

        }

        $(obj.cont).bind("mousedown", seletionMDF);
        $(obj.cont).bind("mouseup", seletionMUF);
    };

    this.tapProductor = (cont, dom) => {


        //最后全怼给tap 所以tap是必须的变量 默认直接 tap={}
        var tap = {};
        if (cont.hasOwnProperty("tap")) {
            tap = tools.cloneObj(cont.tap);
        }
        if (cont.hasOwnProperty("color")) {
            var color = tools.cloneObj(cont.color);
        }
        if (cont.hasOwnProperty("link")) {
            var link = tools.cloneObj(cont.link);
        }
        //默认不相交
        // var color = cont.color;
        //他是链接他牛逼 没办法得给她腾地方
        //var link = cont.link;


        var temp = [];
        //[["sup","sub"],[[0,0]],//反应容器
        //一 处理每个标签的数组以保证正确性 此处要换到对象自己体内
        for (var val in tap) {
            tap[val] = orderArrA2(orderArrA1(tap[val]));
        }


        if (cont.hasOwnProperty("color")) {
            //~~ ~颜色特有  ~//
            for (var val in color) {
                color[val] = orderArrA2(orderArrA1(color[val]));
            }
            //~~ ~颜色特有  ~//
        }


        if (cont.hasOwnProperty("link")) {
            //~~ ~链接特有  ~//
            //他是链接他牛逼 没办法得给她腾地方
            var ShieldingArea = [];
            //顺便给他装个狗牌link
            for (var i = 0; i < link.length; i++) {
                link[i][0].unshift("link")
                ShieldingArea.push(link[i][1]);
                //没有意义应付下边的函数而已
                link[i][1] = [link[i][1]];
            }
            //~~ ~链接特有  ~//
        }
        if (cont.hasOwnProperty("color")) {
            //~~ ~颜色特有  ~//
            //颜色在这里插入
            tap["color"] = [];
            for (var val in color) {
                tap["color"].push.apply(tap["color"], color[val]);
            }
            //合并过来的颜色没有顺序，要排序才能处理
            tap["color"] = orderArrA1(tap["color"])
            //~~ ~颜色特有  ~//
        }

        if (cont.hasOwnProperty("link")) {
            //~~ ~链接特有  ~//
            //吧不该占的位置(链接等东西的位置)都扣除去 一起扣了
            for (var val in tap) {
                tap[val] = listArr2(arrList2(tap[val]).diff(arrList2(ShieldingArea)))
                //如果某数组都空了就弄掉要不后边计算量会增加的特别严重
                if (tap[val].length == 0) {
                    delete tap[val];
                }
            }
            //~~ ~链接特有  ~//

        }

        //console.log(tap)
        //console.log(tap["color"]);
        //生成一个包含处理内容的变量

        var data = [];
        for (var val in tap) {
            data.push(val);
        }

        if (data.length != 0) {


            //获得全排列数组
            var comb = getGroup(data);
            //对全排列数组进行排序，后期要根据规律算index

            for (var i = 0; i < comb.length; i++) {
                for (var j = 0; j < comb.length - i - 1; j++) {
                    if (comb[j].length > comb[j + 1].length) {
                        var t = comb[j];
                        comb[j] = comb[j + 1];
                        comb[j + 1] = t;
                    }

                }

            }
            // console.log(comb);
            //为temp反应容器填充东西
            for (var i = 0; i < comb.length; i++) {
                var tcm = [];
                tcm.push(comb[i]);
                temp.push(tcm);
            }
            //  console.log(temp);
        } else {
            temp = [];
        }

        //最后的混合函数 循环过于猛烈。。
        function arrDiff(obj, temp) {
            var obl = Object.keys(obj).length;
            if (obl == 0) {
                return obj = [];
            }
            // console.log(temp);
            for (var i = obl; i > 0; i--) {
                //console.log(i + "个的")
                //去temp中找要取交集的变量 用 whereall定位
                for (var j = whereAll(i, obl)[0]; j <= whereAll(i, obl)[1]; j++) {
                    //取第一个元素以用来取交集(需要展开后在处理)
                    var its = arrList2(obj[temp[j][0][0]]);
                    //遍历元素依次相交 循环之后出相交的结果its 【intersection】
                    for (var k = 1; k < i; k++) {
                        its = its.intersection(arrList2(obj[temp[j][0][k]]));
                    }
                    temp[j].push(listArr2(its));
                    if (i == 1) {
                        continue;
                    }
                    for (var m = 0; m < i; m++) {

                        obj[temp[j][0][m]] = listArr2(arrList2(obj[temp[j][0][m]]).diff(its));
                        //console.log(arrList2(obj[temp[j][0][m]]));

                        //console.log(its);
                    }
                    //  console.log(listArr2(its));
                }
                //外层循环后，需要对最初的obj中的单变量再次进行取高一级交集才能低一级的继续交集
                //eg. 4->3->2->1 为了分开各css分开的情况

            }
        }
        //提供数据源tap和排好序的反应容器temp进行处理
        arrDiff(tap, temp);
        //直接处理 

        //化简去0
        function abbr(arr) {
            var sm = [];
            if (arr.length == 0) {
                return sm;
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][1].length != 0) {

                    sm.push(arr[i]);
                }
            }
            return sm;
        }
        var smpl = abbr(temp);
        if (cont.hasOwnProperty("color")) {
            //~~ ~颜色特有  ~//
            //插入颜色
            function colorIn(arr, color) {
                var breakColor = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][0].indexOf("color") != -1) {
                        for (val in color) {
                            if (arrList2(arr[i][1]).intersection(arrList2(color[val])).length != 0) {
                                var tm = JSON.parse(JSON.stringify(arr[i]));
                                tm[0][tm[0].indexOf("color")] = val;
                                tm[1] = listArr2(arrList2(arr[i][1]).intersection(arrList2(color[val])));
                                breakColor.push(tm);
                            }
                        }
                        arr[i][1] = [];
                    }

                }
                //console.log(breakColor); 需要颜色拆分，拆分的结果，需要在插入回去，要把原来的删除
                arr.push.apply(arr, breakColor);
                return arr;
            }

            //此时有多颜色异常的状态
            //把多出来的再次划分就可以了 这里不用担心颜色中间再次空档，因为这里之前取了交集，颜色肯定是填满的状态，如果一个数组有与其他便签共存的多种颜色，一定是连个颜色连一起了，分别于颜色数据取交集就行了就可以分开
            //单独的颜色标签，也是一样，与单独颜色取交集就行，不用担心太多
            //ColorIn函数中已经做好了

            smpl = colorIn(smpl, color);
            var smpl = abbr(smpl);
            // console.log(smpl); 颜色再次分
            //~~ ~颜色特有  ~//
        }

        if (cont.hasOwnProperty("link")) {
            //~~ ~链接特有  ~//
            //把牛逼哄哄的链接怼进去
            for (var i = 0; i < link.length; i++) {
                smpl.push(link[i]);
            }
            //~~ ~链接特有  ~//
        }

        function replaceTagText(txt, tags, arr) {

            var tempStr1 = txt.substring(0, arr[0] - 1);
            var selectedText = txt.substring(arr[0] - 1, arr[1]);
            var tempStr2 = txt.substring(arr[1]);
            var cssText = "";
            var classText = "";
            if (tags[0] == "link") {
                classText = tags[1];
                if (classText == "reference") {
                    //console.log(tags[2][0])
                    //console.log(that)

                    that.referencelist[tags[2][0]] = tags[2][1]
                    return tempStr1 + "<a href=\"#" + tags[2][0] + "\" class=\"" + classText + " hxt-link\" style=\"" + cssText + "\" data-lid=\"" + tags[3] + "\">" + selectedText + "</a>" + tempStr2;
                }
                return tempStr1 + "<a target=\"_blank\" href=\"" + tags[2] + "\" class=\"" + classText + " hxt-link\" style=\"" + cssText + "\" data-lid=\"" + tags[3] + "\">" + selectedText + "</a>" + tempStr2;
            }
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].indexOf("color") != -1) {
                    cssText += "color: #" + tags[i].slice(6);
                    classText += ("hxt_color ");
                } else {
                    classText += (tags[i] + " ");
                }
            }
            return tempStr1 + "<font class=\"" + classText + "\" style=\"" + cssText + "\">" + selectedText + "</font>" + tempStr2;
        }
        //输出渲染队列
        function renderList(arr) {
            var res = [];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr[i][1].length; j++) {
                    res.push([arr[i][0], arr[i][1][j]])
                }
            }

            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < res.length - i - 1; j++) {
                    if (res[j][1][0] < res[j + 1][1][0]) {
                        var t = res[j];
                        res[j] = res[j + 1];
                        res[j + 1] = t;
                    }

                }

            }
            return res;
        }
        var rdl = renderList(smpl);
        console.log(rdl)

        function tagFinal(dom, arr) {
            var txt = dom.innerText;
            for (var i = 0; i < arr.length; i++) {
                txt = replaceTagText(txt, arr[i][0], arr[i][1]);
            }
            dom.innerHTML = txt;
        }

        tagFinal(dom, rdl);
    };
    this.wellProductor = (obj) => {
        if (obj.cont.hasOwnProperty("sRatio") && (obj.cont.sRatio.length == this.countMB(obj.cont))) {
            obj.obj.style.width = (obj.cont.sRatio[obj.index] / arrSum(obj.cont.sRatio)) * 100 + "%";
        } else {
            obj.obj.style.width = (1 / this.countMB(obj.cont)) * 100 + "%";
        }
        addClass(obj.obj, "wellBlock")
        return obj.obj;
    };
    this.cellProductor = (obj) => {
        for (var prop in obj.cont) {
            if (this.HXTconst.MB.indexOf(prop) != -1) {
                for (var i = 0; i < obj.cont[prop].length; i++) {
                    if (obj.index == ((obj.cont[prop][i].hasOwnProperty("index")) ? obj.cont[prop][i].index : 1)) {
                        var cont = document.createElement(this.HXTconst.MBD[prop]);
                        addClass(cont, "cellBlock")
                        return [this[prop](cont, obj.cont[prop][i]), prop];
                    }
                }
            }
        }
    };
    this.checkPicState = () => {
        var res = 0;
        for (var i = 0; i < this.records.picE.length; i++) {
            if (this.records.picE[i].state == "OK") {
                res++;
            }
        }
        return res;

    }
    this.countHeight = () => {
        var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        var topData = [];

        function getTopData(el) {
            var rect = el.getBoundingClientRect();
            //获取元素相对窗口的top值，此处应加上窗口本身的偏移
            var top = rect.top;
            return top;
        }
        for (var i = 0; i < this.records.HXTE.length; i++) {
            topData.push(parseInt(getTopData(this.records.HXTE[i].cont) + scrolltop));
        }
        this.records.topData = topData;
        console.log(topData);
    };
    this.program = () => {
        var rate = 0;
        var that = this;
        var timer = setInterval(function() {
            if (that.records.picE.length == 0) {
                clearInterval(timer);
                return;
            }
            rate = parseInt(that.checkPicState() * 100 / that.records.picE.length);
            console.log(rate);
            if (rate == 100) {
                that.countHeight();
                clearInterval(timer);
            }
        }, 200);
    };
    this.getItem = (index1, index2) => {

        var obj = this.content[index1]
        for (var prop in obj) {
            if (this.HXTconst.MB.indexOf(prop) != -1) {
                for (var i = 0; i < obj[prop].length; i++) {
                    if (index2 == ((obj[prop][i].hasOwnProperty("index")) ? obj[prop][i].index : 1)) {
                        return obj[prop][i];
                    }
                }
            }
        }
    }
    this.getBelong = (index1, index2) => {
        var obj = content[index1]
        for (var prop in obj) {
            if (this.HXTconst.MB.indexOf(prop) != -1) {
                for (var i = 0; i < obj[prop].length; i++) {
                    if (index2 == ((obj[prop][i].hasOwnProperty("index")) ? obj[prop][i].index : 1)) {
                        return [prop, i]
                    }
                }
            }
        }
    }
    //obj.cont[prop][i].index
    this.reRender = (index1, index2) => {
        var cont = this.records.HXTE[index1].child[index2 - 1].cont;
        var obj = this.getItem(index1, index2);
        cont.innerHTML = "";
        console.log(obj);
        this[this.getBelong(index1, index2)[0]](cont, obj);
    }
    this.resetSection = () => {
        console.log(this.records.HXTE[0])
        for (var i = 0; i < getOutBlock().length; i++) {
            for (var j = 0; j < this.records.HXTE[i].child.length; j++) {
                this.selectionProductor({ cont: this.records.HXTE[i].child[j].cont, index: [i, j] });
                if (i == 0) {
                    console.log(j)
                }

            }


        }

    }
    this.renderOne = (obj) => {
        var cont = document.createElement("div");
        //this.records.HXTL.push(cont);
        var hxte = { cont: cont, index: obj.index }
        // this.records.HXTE.push({ cont: cont, index: obj.index });
        addClass(cont, "outerBlock")
        //放在记录里统一管理

        var tG = this.titleGrading(obj.obj);
        //模块最外层标识
        addClass(cont, (obj.obj.hasOwnProperty("pos")) ? obj.obj.pos : "blank");
        if (obj.obj.hasOwnProperty("pos") && obj.obj.pos.substring(0, 8) == "maintext") {
            addClass(cont, "maintext");
        }
        //检测内容一对一，单模块【section】字段可选且默认为一，复模块【section】为必有项，此处发生错误直接跳过不进行文本的渲染
        if (this.countMB(obj.obj) != ((obj.obj.hasOwnProperty("section")) ? obj.obj.section : 1)) {
            cont.innerHTML = "主模块错误";
            myError({ type: 2, reason: "主模块错误" });
            return cont;
        }
        hxte.child = [];
        //this.records.HXTE[obj.index].child = [];
        //复模块的处理，进行内部填充
        if (obj.obj.hasOwnProperty("section") && obj.obj.section != 1) {
            //this.records.HXTE[obj.index].section = obj.obj.section;
            hxte.section = obj.obj.section;
            for (var j = 0; j < obj.obj.section; j++) {
                var childCont = document.createElement("div");
                cont.appendChild(childCont);
                //复模块比例分配，仅仅在最外层处理style.width
                childCont = this.wellProductor({ cont: obj.obj, obj: childCont, index: j });
                //真对于主块进行针对性填充内部元素
                var getCell = this.cellProductor({ cont: obj.obj, index: (j + 1) });
                var cellCont = getCell[0];

                //this.records.HXTE[obj.index].child.push({ cont: cellCont, type: getCell[1] });
                hxte.child.push({ cont: cellCont, type: getCell[1] });
                //选区行为绑定在最底层
                this.selectionProductor({ cont: cellCont, index: [obj.index, j] });
                childCont.appendChild(cellCont);
            }
        } else {
            //单模块直接填充子元素
            //this.records.HXTE[obj.index].section = 1;
            hxte.section = 1;
            var getCell = this.cellProductor({ cont: obj.obj, index: 1 });
            var cellCont = getCell[0];
            hxte.child.push({ cont: cellCont, type: getCell[1] });
            //this.records.HXTE[obj.index].child.push({ cont: cellCont, type: getCell[1] });
            this.selectionProductor({ cont: cellCont, index: [obj.index, 0] });
            cont.appendChild(cellCont);

        }
        return { cont: cont, tG: tG, hxte: hxte };
    }

    this.render = () => {

        //利用renderOne生成函数生成一个outerBLock 然后插到HXT上 

        if (option.content.length != 0) {
            for (var i = 0; i < option.content.length; i++) {
                var temp = this.renderOne({ obj: option.content[i], index: i })
                $$(option.id).appendChild(temp.cont);
                this.records.titleGrade.push(temp.tG)
                this.records.parts++;
                this.records.HXTE.push(temp.hxte)
            }

        } else {
            myError({ type: 1, reason: "错误内容为空" });
        }

    }
    this.init();
    this.plugin.init();
    this.program();
    this.render();
    this.plugin.work();
}
HXT.prototype.hxtPluginList = {}
HXT.prototype.hxt = function() {
    console.log(this)
}