$(document).ready(function () {
    $("#single_blog_body a[target='_blank']").each(function () {
        $(this).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Open In New Tab</title><path d="M14.016 3h6.984v6.984h-2.016v-3.563l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563v-2.016zM18.984 18.984v-6.984h2.016v6.984q0 0.797-0.609 1.406t-1.406 0.609h-13.969q-0.844 0-1.43-0.586t-0.586-1.43v-13.969q0-0.844 0.586-1.43t1.43-0.586h6.984v2.016h-6.984v13.969h13.969z"></path></svg>');
    });
});

// 	$(document).ready(function(){
// 	    $('.jk-image-gallery').lightGallery();
// 	});

$(document).ready(function () {
    // var elements = $('#single_blog_body img');
    var elements = $('#single_blog_body figure.image img');
    // var elements = document.querySelectorAll( '.jk-single-image-view' );
    Intense(elements);
});

    // JavaScript Document
    $(document).ready(function () {
        if (!readCookie("hide_chat_box")) {
            $(".chat-box").show();
        }

        $('#chat_boxes_container').on('click', '.chat-user', function(e){

            var csrfName = "<?php echo $this->security->get_csrf_token_name(); ?>";
            var csrfHash = "<?php echo $this->security->get_csrf_hash(); ?>";
            // var csrfName = "hello";
            // var csrfHash = "hhi";


            var formData = {
                "[csrfName]": "csrfHash"
            };

            $.ajax({
                type: 'POST',
                url: globalBaseUrl + 'ajax/get_single_chat',
                data: formData,
                success: function (data) {
                    $('#chat_boxes_container').prepend(data);

                },
                error: function (data) {
                    console.log("error");
                    console.log(data);
                }
            });

        });

        $('#chat_boxes_container').on('click', '.remove-chat-box', function (e) {
            e.stopImmediatePropagation();
            var thisChatBox = $(this).closest('.chat-box');
            thisChatBox.remove();
        });

        $('#chat_boxes_container').on('click', '.hide-chat-box', function () {

            createCookie("hide_chat_box", true, 1);

            var thisChatHeader = $(this);
            var thisChatContent = $(this).siblings('.chat-content');
            var thisChatBox = $(this).closest('.chat-box');

            thisChatContent.slideToggle('', '', function () {

                if (thisChatContent.css('display') == 'none') {
                    thisChatHeader.find('.should-hide-on-slide-toggle').hide();
                    thisChatBox.width(200);
                } else {
                    thisChatHeader.find('.should-hide-on-slide-toggle').show();
                    thisChatBox.width(270);
                }

            });
        });

        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function eraseCookie(name) {
            createCookie(name, "", -1);
        }
    });





showHideOnMediaChange();

var width = $(window).width();
$(window).on('resize', showHideOnMediaChange);

function showHideOnMediaChange() {
    var jkNavUl = $("#jk_nav_ul");
    var jkNavUlWidth = jkNavUl.width();

    if ($(this).width() != width) {
        width = $(this).width();

        // Smart Phone  
        if (width <= 320) {
            $('.hide-on-smartphone').addClass("hide");
            $('.show-on-smartphone').addClass("show");
        } else {
            $('.hide-on-smartphone').removeClass("hide");
            $('.show-on-smartphone').removeClass("show");
        }
        // Small Tablet     
        if (width <= 481) {
            $('.hide-on-small_tablet').addClass("hide");
            $('.show-on-small_tablet').addClass("show");
        } else {
            $('.hide-on-small_tablet').removeClass("hide");
            $('.show-on-small_tablet').removeClass("show");
        }
        // Landscape    
        if (width <= 656) {
            $('.hide-on-landscape').addClass("hide");
            $('.show-on-landscape').addClass("show");
        } else {
            $('.hide-on-landscape').removeClass("hide");
            $('.show-on-landscape').removeClass("show");
        }
        //tablet
        if (width <= 961) {
            $('.hide-on-tablet').addClass("hide");
            $('.show-on-tablet').addClass("show");
        } else {
            $('.hide-on-tablet').removeClass("hide");
            $('.show-on-tablet').removeClass("show");
        }
        //laptop
        if (width <= 1025) {
            $('.hide-on-laptop').addClass("hide");
            $('.show-on-laptop').addClass("show");
        } else {
            $('.hide-on-laptop').removeClass("hide");
            $('.show-on-laptop').removeClass("show");
        }
        //Bit laptop
        if (width <= 1281) {
            $('.hide-on-big_laptop').addClass("hide");
            $('.show-on-big_laptop').addClass("show");
        } else {
            $('.hide-on-big_laptop').removeClass("hide");
            $('.show-on-big_laptop').removeClass("show");
        }
        //   if(width > 656){
        //             $('.show-on-laptop').addClass("show");
        //         }
        //         if(width > 1200){
        //             $('.hide-on-laptop').addClass("hide");
        //         }
        console.log(width);
    }
}

$(window).on('load', function () {
    $('.material-icons').css('opacity', '1');
});

$(document).ready(function () {
    var jkNavUl = $("#jk_nav_ul"),
        jkNavMore = $("jk_nav_more"),
        ww = $(window).width();
    // smw = more.outerWidth();
    // console.log(ww);
});

$(document).ready(function () {
    // $('#app').mouseover(function(){
    //  // $('.jk-top-side_bar').addClass('open');
    //  $('.jk-top-side_bar').css('top', '0px');
    //  // $('body').bind("mousewheel", function() {
    //  //     return false;
    //  // });
    // });
    // $('#app').mouseout(function(){
    //  // $('.jk-top-side_bar').removeClass('open');
    //  $('.jk-top-side_bar').css('top', '-500px');
    //  // $('body').bind("mousewheel", function() {
    //  //     return false;
    //  // });
    // });
    $('.owl-carousel').owlCarousel({
        autoplay: false,
        autoplayHoverPause: true,
        items: 4,
        nav: true,
        dots: true,
        loop: true
    });
});


// menu.children("li").each(function () {
//     var w = $(this).outerWidth();
//     if (w > smw) smw = w + 20;
//     return smw
// });
// more.css('width', smw);

// function contract() {
//     var w = 0,
//         outerWidth = parent.width() - smw - 50;
//     for (i = 0; i < menu.children("li").size(); i++) {
//         w += menu.children("li").eq(i).outerWidth();
//         if (w > outerWidth) {
//             menu.children("li").eq(i - 1).nextAll()
//                 .detach()
//                 .css('opacity', 0)
//                 .prependTo(".subfilter")
//                 .stop().animate({
//                 'opacity': 1
//             }, 300);
//             break;
//         }
//     }
// }

// function expand() {
//     var w = 0,
//         outerWidth = parent.width() - smw - 20;
//     menu.children("li").each(function () {
//         w += $(this).outerWidth();
//         return w;
//     });
//     for (i = 0; i < subMenu.children("li").size(); i++) {
//         w += subMenu.children("li").eq(i).outerWidth();
//         if (w > outerWidth) {
//             var a = 0;
//             while (a < i) {
//                 subMenu.children("li").eq(a)
//                     .css('opacity', 0)
//                     .detach()
//                     .appendTo("#nav-bar-filter")
//                     .stop().animate({
//                     'opacity': 1
//                 }, 300);
//                 a++;
//             }
//             break;
//         }
//     }
// }
// contract();

// $(window).on("resize", function (e) {
//     ($(window).width() > ww) ? expand() : contract();
//     ww = $(window).width();
// });

// });

$('document').ready(function () {
    $('#notifications').on('click', (function (event) {
        event.preventDefault();
        var button = $(this) // Button that triggered the modal
        // var user_id = button.data('user_id') // Extract info from data-* attributes

        // // $('.jk-product-image').attr("src", img_src);
        // // var productId = $('#product-id').val();

        // var formData = {
        //     'user_id':user_id
        // };
        $.ajax({
            type: 'POST',
            url: globalBaseUrl + 'ajax/get_notifications',
            // data:formData,
            success: function (data) {
                console.log(data);
                // $('#jk-all-data').html(data);
                // location.reload();
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }));

});

// $(document).ready(function(){
// $("button").click(function(){
//       $("p").toggle();
//     });
//   });


$('#menu').on('click', function () {
    // $('#slide-out').css('left', '-230px');
    $('#slide-out').toggle();

});

$('#section_content_container').on('click', function () {
    $('#slide-out').css('display', 'none');
    $('.search-form-wrapper').removeClass('open');
});


$('.collapsible-header').on('click', function (event) {
    var button = $(event.relatedTarget);
    // $(this).bind('click', '.collapsible-body');
    // $('#slide-out').css('left', '-230px');

    // $(document).ready(function(){
    //   $("p").toggle(
    //     function(){$("p").css({"color": "red"});},
    //     function(){$("p").css({"color": "blue"});},
    //     function(){$("p").css({"color": "green"});
    //   });
    // });
    // debugger;
    $(this).next(".collapsible-body").toggle();
    // $(this).children(".fas").css({"color":"#c00"});
    $(this).children(".fas").toggleClass('activate');
});

$(document).ready(function () {
    // $('#search_icon_mobile').on('click', function(){
    //     $('#jk_top').addClass('hide-with-animation');
    // });
    $('[data-toggle=search-form]').click(function () {
        $('.search-form-wrapper').toggleClass('open');
        $('.search-form-wrapper .search').focus();
        $('html').toggleClass('search-form-open');
    });
    $('[data-toggle=search-form-close]').click(function () {
        $('.search-form-wrapper').removeClass('open');
        $('html').removeClass('search-form-open');
    });
    $('.search-form-wrapper .search').keypress(function (event) {
        if ($(this).val() == "Search") $(this).val("");
    });

    $('.search-close').click(function (event) {
        $('.search-form-wrapper').removeClass('open');
        $('html').removeClass('search-form-open');
    });
});

// $( document ).ready(function() {

//   $('#search_icon_mobile').click(function(event) {
//         $('.search-form-wrapper').removeClass('open');
//         $('html').removeClass('search-form-open');
//   });

// });



























// https://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_filters_table&stacked=h
// $(document).ready(function(){
//   $("#myInput").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#myTable tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });



$('.jk-like').on('click', function (e) {
    e.preventDefault();
    var postId = $(this).attr('data-post_id');
    $(this).toggleClass('jk-like-color');

});



$('#right-sidebar-dragger').on('click', function (e) {
    e.preventDefault();
    $('#right_side_bar').toggleClass('open');

});



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
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
        var x = document.getElementsByClassName("autocomplete-items");
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

$('#leftSideSearch').on('click', function(){
        var inp = document.getElementById('leftSideSearch');
        var arr = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
        var currentFocus;

        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
            $('#side-menu').html("");
            if (!val) { return false;}
            currentFocus = -1;
            $('#side-menu').addClass("autocomplete-items");

            for (i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = '<li id="menu-item"></li>';
                    c = '<a className="collapsible-header waves-effect" href="https://bestdivision.com/blogs" ></a>';
                    d = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32"><title>All Blogs</title><path d="M12 0v3c2.296 0 4.522 0.449 6.616 1.335 2.024 0.856 3.842 2.082 5.405 3.644s2.788 3.381 3.645 5.405c0.886 2.094 1.335 4.32 1.335 6.616h3c0-11.046-8.954-20-20-20z"></path><path d="M12 6v3c2.938 0 5.701 1.144 7.778 3.222s3.222 4.84 3.222 7.778h3c0-7.732-6.268-14-14-14z"></path><path d="M15 12l-2 2-7 2-6 13 0.793 0.793 7.275-7.275c-0.044-0.165-0.068-0.339-0.068-0.518 0-1.105 0.895-2 2-2s2 0.895 2 2-0.895 2-2 2c-0.179 0-0.353-0.024-0.518-0.068l-7.275 7.275 0.793 0.793 13-6 2-7 2-2-5-5z"></path></svg>';
                    e = $(d).append("<strong>" + arr[i].substr(0, val.length) + "</strong>"+arr[i].substr(val.length)+"<input type='hidden' value='" + arr[i] + "'>");
        f = c.innerHTML = e;
        b.innerHTML = f;
                    // b.addEventListener("click", function(e) {
                //     inp.value = this.getElementsByTagName("input")[0].value;
                //     $('#side-menu').html("");
                // });
            }
                $('#side-menu').append(b);
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
            var x = document.getElementsByClassName("autocomplete-items");
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
    });
