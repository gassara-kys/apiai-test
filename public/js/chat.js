
/**
 * Chatボックスの基本操作
 */
$(document).on('click', '.panel-heading span.icon_minim', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});

$(document).on('focus', '.panel-footer input.chat_input', function (e) {
    var $this = $(this);
    if ($('#minim_chat_window').hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideDown();
        $('#minim_chat_window').removeClass('panel-collapsed');
        $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '#new_chat', function (e) {
    var size = $( ".chat-window:last-child" ).css("margin-left");
     size_total = parseInt(size) + 400;
    alert(size_total);
    var clone = $( "#chat_window_1" ).clone().appendTo( ".container" );
    clone.css("margin-left", size_total);
});
$(document).on('click', '.icon_close', function (e) {
    $( "#chat_window_1" ).remove();
});


/**
 * チャットのイベントハンドリング
 */
const baseUrl = "http://localhost:8080/api/question";
$(document).ready(function() {
    $("#input-txt").keypress(function(event) {
        if (event.which == 13) {
            if($("#input-txt").val() === "") return;
            event.preventDefault();
            send();
        }
    });
});

/**
 * チャットの送受信
 */
function send() {
    var text = $("#input-txt").val();
    var elm  = document.createElement('div');
    elm.className = 'row msg_container base_sent';
    elm.innerHTML = 
        '<div class="col-md-10 col-xs-10"> \
            <div class="messages msg_sent"> \
                <p>' + text + '</p> \
            </div> \
        </div> \
        <div class="col-md-2 col-xs-2 avatar"> \
            <img src="/static/img/perkun.png" class=" img-responsive "> \
        </div>';

    $(".panel-body")[0].appendChild(elm);
    var scrollPosition = $("#chat_window_1").height() + ($(".msg_container_base").height() * $(".msg_container_base").children('div').length);
    $('#chat_window_1').find('.panel-body').animate({scrollTop: scrollPosition}, 'fast');
    $.ajax({
        type: "POST",
        url: baseUrl ,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ question: text }),
        success: function(data) {
            setResponse(data.answer);
        },
        error: function() {
            setResponse("Internal Server Error");
        }
    });
    //setResponse("Loading...");
}
function setResponse(answer) {
    var elm  = document.createElement('div');
    elm.className = 'row msg_container base_receive';
    elm.innerHTML = 
        '<div class="col-md-2 col-xs-2 avatar"> \
            <img src="/static/img/pernyan.png" class=" img-responsive "> \
        </div> \
        <div class="col-xs-10 col-md-10"> \
            <div class="messages msg_receive"> \
            <p>' + answer + '</p> \
            </div> \
        </div>';

    $("#input-txt").val('');
    $(".panel-body")[0].appendChild(elm);
    var scrollPosition = $("#chat_window_1").height() + ($(".msg_container_base").height() * $(".msg_container_base").children('div').length);
    $('#chat_window_1').find('.panel-body').animate({scrollTop: scrollPosition}, 'fast');
}
