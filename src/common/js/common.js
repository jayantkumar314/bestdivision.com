$('#menu').on('click', function (e) {
    $('#leftNav').toggle();
    $('.tent').toggleClass('visible');
    e.stopPropagation();
});

$('#bd_main').on('click', function () {
    $('#leftNav').css('display', 'none');
    $('.tent').removeClass('visible');
});

$(document).ready(function () {
    $("#single_blog_body a[target='_blank']").each(function () {
        $(this).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Open In New Tab</title><path d="M14.016 3h6.984v6.984h-2.016v-3.563l-9.797 9.797-1.406-1.406 9.797-9.797h-3.563v-2.016zM18.984 18.984v-6.984h2.016v6.984q0 0.797-0.609 1.406t-1.406 0.609h-13.969q-0.844 0-1.43-0.586t-0.586-1.43v-13.969q0-0.844 0.586-1.43t1.43-0.586h6.984v2.016h-6.984v13.969h13.969z"></path></svg>');
    });
});

// 	$(document).ready(function(){
// 	    $('.jk-image-gallery').lightGallery();
// 	});

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
            url: window.location.origin + 'ajax/get_single_chat',
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


function getNotifications(args) {
    
    // if (!args) {
    //     args = {};
    // }
    // var notfications_count = $("ul.notfi-dropdown");

    // defparams = {
    //     type: false,
    //     sa:false
    // }

    // options = Object.assign(defparams,args);
    // data    = {'hash':$('.main_session').val()};

    // if (options['type']) {
    //     data['t'] = options['type'];
    // }

    // if (options['sa']) {
    //     data['sa'] = options['sa'];
    //     notfi_set.find('i.spin').removeClass('hidden');
    // }

    // $.ajax({
    //     url: '{{ LINK aj/ get_notifications}}',
    //     type: 'GET',
    //     dataType: 'json',
    //     data:data
    // })
    // .done(function(data) {
    //     if (data.status == 200) {
    //         if (data.new) {
    //     $("span#new-notifications").html($('<b>', {
    //         text: data.new
    //     }));
    //         }
    //         else{
    //     notfi_set.find('b').text(data.len);
    //             notfi_set.find('ul').html(data.html);
    //         }
    //     }
    //     else if(data.status == 304 && options['sa']){
    //     notfi_set.find('b').text(0);
    //         notfi_set.find('ul').html($("<li>",{
    //     class:'no-notifications',
    //             text: "{{ LANG no_notifications }}"
    //         }));
    //     }

    //     if (data.count_messages > 0) {
    //         $('#new-messages').html('<b>' + data.count_messages + '</b>');
    //     } else {
    //         $('#new-messages').html('');
    //     }

    //     if (options['sa']) {notfi_set.find('i.spin').addClass('hidden');}

    // })
    // .fail(function() {
    //         console.log("error");
    // });
}

$('document').ready(function () {
    $('#notifications').on('click', (function (event) {
        //event.preventDefault();
        var button = $(this) // Button that triggered the modal
        // var user_id = button.data('user_id') // Extract info from data-* attributes

        // // $('.jk-product-image').attr("src", img_src);
        // // var productId = $('#product-id').val();

        // var formData = {
        //     'user_id':user_id
        // };
        var Loading =
            '<div className="page-loading-container in"><div className="page-loading-animation-box"><div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>';
        var success =
            '<div className="page-loading-container-two in"><div className="page-loading-animation-box"><svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div></div>';
        var html = 
        `<li className="notifications_single">
            <a href="http://localhost/boroktv.com/@deepak" className="fluid" style="display: block;">
                <div className="notifications_avatar">
                    <img src="http://localhost/boroktv.com/upload/photos/d-avatar.jpg" alt="Avatar" className="full-size">
                </div>
                <div className="notifications_info">
                    <p>
                        <span className="username">Jayant</span>
                        <span>added you as his friend</span>
                        <span></span>
                    </p>
                    <time>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                        12 months ago
                    </time>
                </div>
            </a>
        </li>`;

        
        //notifications = getNotifications();
        $('.notifications_list').html(html);
        // if ($('.notifications_list').html() {
        //     var notfi_cont = $("ul.notfi-dropdown");

        //     if ($("span#new-notifications").html() != '') {
        // $(this).find('span#new-notifications').empty();
        //     }

        //     pt_get_notifications({sa:1});
        // }
        // setInterval(function(){
        //     getNotifications({ type: 'new' });
        // }, 6000);
        $.ajax({
            type: 'POST',
            url: window.location.origin + 'ajax/get_notifications',
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

$('.jk-like').on('click', function (e) {
    e.preventDefault();
    var postId = $(this).attr('data-post_id');
    $(this).toggleClass('jk-like-color');

});

$('#right-sidebar-dragger').on('click', function (e) {
    e.preventDefault();
    $('#right_side_bar').toggleClass('open');

});

/////////////////////////////Search ////////////////////////////////


$("#search").on("keyup", function (e) {
    var searchText = $(this).val();
    $.ajax({
        type: "POST",
        data: {
            'search': searchText
        },
        url: window.location.origin + "/ajax/search",
        success: function (result) {
            result = JSON.parse(result);

            if (result.success) {
                result = result.data;
                var rows = [];
                Object.keys(result).forEach(function (key) {
                    rows.push(result[key].title);
                    // console.log(result[key].title); 
                });
                autocomplete(document.getElementById("search"), rows)
            }

        },
        error: function (e) {
            console.log(e)
        }

    });

    if (e.which == 13) {
        // if (window.location.href.indexOf(window.location.origin + "/search?q=") > -1) {
        //     window.history.pushState("", "", "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+"));
        // } else {
        //     window.location.href = window.location.origin + "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+");
        // }

        window.location.href = window.location.origin + "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+");
            
        // window.history.pushState("", "", "/search?q=" + encodeURIComponent(searchText).replace(/%20/g, "+"));
        // $.ajax({
        //     type: "GET",
        //     url: window.location.origin + "/ajax/search_result?search="+searchText,
        //     success: function (result) {
        //         result = JSON.parse(result);
        //         if (result.success) {
        //             searchResult = result.data;
        //             var html = '';
        //             Object.keys(searchResult).forEach(function (key) {
        //                 html += '<div className="search_container"><h3 className="search_title"><a href="' + window.location.origin + '/' + searchResult[key].slug + '" >' + searchResult[key].title + '</a></h3><div className="search_url"><a href="' + window.location.origin + '/' + searchResult[key].slug + '">' + window.location.origin + '/' + searchResult[key].slug + '</a></div><div className="search_description">' + searchResult[key].short_description + '</div></div>';
        //                 // console.log(result[key].title); 
        //             });
        //             $('#search_result').html(html);
        //         }
        //     },
        //     error: function (e) {
        //         console.log(e)
        //     }

        // });

    }
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //     .then(response => response.json())
    //     .then(result => {
    //         var rows = [];
    //         debugger;
    //         Object.keys(result).forEach(function(key) {
    //             rows.push(result[key].title);
    //             console.log(result[key].title); 
    //         });
    //         autocomplete(document.getElementById("search_input"), rows)
    //     })
});