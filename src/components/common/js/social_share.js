function share_social(social, url, id) {
    // Get the message content
    var content = encodeURIComponent($.trim($("#message_text" + id).text()));

    // Get the message author's image
    var image = encodeURIComponent($("#message" + id).find('img').attr('src'));

    // Clean the content
    var content = content.substr(0, 350);

    if (social == 'facebook') {
        typeof window !== 'undefined' && window.open("https://www.facebook.com/sharer/sharer.php?u=" + url, "", "width=500, height=250");
    } else if (social == 'twitter') {
        typeof window !== 'undefined' && window.open("https://twitter.com/intent/tweet?text=" + content + "&url=" + url, "", "width=500, height=250");
    } else if (social == 'gplus') {
        typeof window !== 'undefined' && window.open("https://plus.google.com/share?url=" + url, "", "width=500, height=250");
    } else if (social == 'pinterest') {
        typeof window !== 'undefined' && window.open("https://pinterest.com/pin/create/button/?url=" + url + "&description=" + content + "&media=" + image, "", "width=500, height=250");
    } else if (social == 'tumblr') {
        typeof window !== 'undefined' && window.open("https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + url, "", "width=500, height=250");
    } else if (social == 'email') {
        typeof window !== 'undefined' && window.open("mailto:?body=" + content + " - " + url, "_self");
    } else if (social == 'vkontakte') {
        typeof window !== 'undefined' && window.open("http://vkontakte.ru/share.php?url=" + url + "&description=" + content + "&image=" + image + "&noparse=true", "", "width=500, height=500");
    } else if (social == 'reddit') {
        typeof window !== 'undefined' && window.open("https://www.reddit.com/submit?url=" + url, "", "width=850, height=500");
    } else if (social == 'linkedin') {
        typeof window !== 'undefined' && window.open("https://www.linkedin.com/cws/share?url=" + url, "", "width=500, height=350");
    } else if (social == 'whatsapp') {
        typeof window !== 'undefined' && window.open("whatsapp://send?text=" + content + " - " + url, "", "width=500, height=350");
    } else if (social == 'viber') {
        typeof window !== 'undefined' && window.open("viber://forward?text=" + content + " - " + url, "", "width=500, height=350");
    } else if (social == 'digg') {
        typeof window !== 'undefined' && window.open("http://digg.com/submit?phase=&url=" + url, "", "width=500, height=350");
    } else if (social == 'delicious') {
        typeof window !== 'undefined' && window.open("https://delicious.com/save?v=5&noui&jump=close&url=" + url, "", "width=500, height=350");
    } else if (social == 'evernote') {
        typeof window !== 'undefined' && window.open("https://www.evernote.com/clip.action?url=" + url, "", "width=850, height=450");
    } else if (social == 'yahoo') {
        typeof window !== 'undefined' && window.open("http://compose.mail.yahoo.com/?body=" + content + " - " + url, "", "width=850, height=450");
    } else if (social == 'gmail') {
        typeof window !== 'undefined' && window.open("https://mail.google.com/mail/u/0/?view=cm&fs=1&su=&body=" + content + " - " + url + "&ui=2&tf=1", "", "width=650, height=450");
    }
}