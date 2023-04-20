function expose(li) {
    if (li.value == 0) {
        var l = document.getElementById(li.id).querySelector("[class^=list]");
        var i = document.getElementById(li.id).querySelector("img");
        var f = document.getElementsByClassName(l.className);
        $(i).hide(1000);
        $(f.item(0)).show(1500);
        li.value = 1;
        if ((f.item(0).childElementCount / 24) < 1) {
            document.getElementById(li.id).style.minHeight = "500px";
        } else if (((f.item(0).childElementCount / 24) > 1) && ((f.item(0).childElementCount / 24) <= 3)) {
            console.log(f.item(0).getAttribute("class"))
            if (f.item(0).getAttribute("class").includes("list35")) {
                document.getElementById(li.id).style.minHeight = "700px";
            } else {
                document.getElementById(li.id).style.aspectRatio = "0";
                document.getElementById(li.id).style.minHeight = "calc(1000px + 40px)";
                document.getElementById(li.id).style.gridRow = "span 2";
            }
        } else if (((f.item(0).childElementCount / 24) > 3) && ((f.item(0).childElementCount / 24) <= 4)) {
            document.getElementById(li.id).style.aspectRatio = "0";
            document.getElementById(li.id).style.minHeight = "calc(2000px + 120px)";
            document.getElementById(li.id).style.gridRow = "span 3";
        }
    } else {
        var l = document.getElementById(li.id).querySelector("[class^=list]");
        var i = document.getElementById(li.id).querySelector("img");
        var f = document.getElementsByClassName(l.className);
        document.getElementById(li.id).style.aspectRatio = "5/11";
                document.getElementById(li.id).style.minHeight = "auto";
                document.getElementById(li.id).style.gridRow = "span 1";
        $(i).show(1000);
        $(f.item(0)).hide(1500);
        li.value = 0;
    }
}
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        document.getElementById("b").appendChild(a);
        var rect = document.getElementById("sb").getBoundingClientRect();
        let re = document.getElementById(this.id + "autocomplete-list");
        re.style.position = "absolute";
        let n = rect.left +24;
        re.style.left = n + 'px';
        re.style.top = rect.bottom + 'px';
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    send(this.getElementsByTagName("input")[0].value);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    function send(st){
        let a = document.querySelectorAll('a');
        for(let i=0;i<a.length;i++){
            let txt = a[i].innerHTML;
            let res = txt.includes(st);
            if(res){
                window.open(a[i].href,"_blank")
            }
        }
    }
}