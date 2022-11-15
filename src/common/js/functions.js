function closeAllLists(inp, elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete_items");
    for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
        }
    }
}
function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete_list");
        a.setAttribute("class", "autocomplete_items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            b = document.createElement("DIV");
            b.setAttribute("class", "autocomplete_item");
            if (val.length > 0) {
                var source = arr[i];
                var searchregexp = new RegExp(val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "gi");
                var output = source.replace(searchregexp, "<strong>$&</strong>");
                b.innerHTML = output;
                b.innerHTML += "<input class='autocomplete_input' type='hidden' value='" + arr[i] + "'>";
                a.appendChild(b);
            }
        }

    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete_list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i]?.classList?.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete_items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
   
}
function autocomplete1(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete_list");
        a.setAttribute("class", "autocomplete_items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                b.setAttribute("class", "autocomplete_item")
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input class='autocomplete_input' type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                // b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    // var searchText = this.getElementsByTagName("input")[0].value;
                    // inp.value = searchText;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    //closeAllLists();
                    // var results = getSearchResult(selectedText);
                    // window.history.pushState("", "", "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+"));
                    // window.location.href = window.location.origin + "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+");
                    // $.ajax({
                    //     type: "GET",
                    //     url: window.location.origin + "/ajax/search_result?search=" + encodeURIComponent(searchText),
                    //     success: function (result) {
                    //         result = JSON.parse(result);
                    //         if (result.success) {
                    //             searchResult = result.data;
                    //             var html = '';
                    //             Object.keys(searchResult).forEach(function (key) {
                    //                 html += '<div className="search_container"><h3 className="search_title"><a href="' + window.location.origin + '/' + searchResult[key].slug + '" >' + searchResult[key].title + '</a></h3><div className="search_url"><a href="' + window.location.origin + '/' + searchResult[key].slug + '">' + window.location.origin + '/' + searchResult[key].slug + '</a></div><div className="search_description">' + searchResult[key].short_description + '</div></div>';
                    //             });
                    //             $('#search_result').html(html);
                    //         }
                    //     },
                    //     error: function (e) {
                    //         console.log(e)
                    //     }

                    // });
                    

                // });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete_list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i]?.classList?.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete_items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
   
}
// function getSearchResult(text) {
    // $.ajax({
    //     type: "POST",
    //     data: {
    //         'search': text
    //     },
    //     url: window.location.origin + "/ajax/search_result",
    //     success: function (result) {
    //         result = JSON.parse(result);
    //         debugger;
    //         if (result.success) {
    //             console.log(result.data);
    //             return result = result.data;
    //         }
    //     },
    //     error: function (e) {
    //         console.log(e)
    //     }

    // });
// }