$(document).ready(function() {
  app.init();

  var userName = 'Default';
  var messageText;

  $('#choose-user-form').submit(function(cactus) {
    cactus.preventDefault();
    var capturedText = $('#choose-user-form :input').serializeArray();
    userName = capturedText[0].value;
    console.log( userName );
    console.log("we are inside the choose user click handler!")
  });

  $('#user-input-form').submit(function(cactus) {
    cactus.preventDefault();
    var capturedText = $('#user-input-form :input').serializeArray();
    messageText = capturedText[0].value;
    console.log( messageText );
    console.log("we are inside the input click handler!")
    console.log("userName = ", userName)
    
    var message = {
      username: userName,
      text: messageText,
      roomname: 'Milwaukee, WI'
    };
  
    app.send(message);
  });


  return false;
});

var escObj = {
    '&': '&#38;',
    '<': '&#60;',
    '>': '&#62;',
    '\"': '&#34;',
    '\'': '&#39;',
    '`': '&#96;',
    ',': '&#44;',
    '!': '&#33;',
    '@': '&#64;',
    '$': '&#36;',
    '%': '&#37;',
    '(': '&#40;',
    ')': '&#41;',
    '=': '&#61;',
    '+': '&#43;',
    '{': '&#123;',
    '}': '&#125;',
    '[': '&#91;',
    ']': '&#93;'
};

var app = {

  server : 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  init : () => {
    context = app;

    // var message = {
    //   username: 'Donald Trump',
    //   text: 'It\'s just FAKE NEWS.',
    //   roomname: '\"Alternative Facts\"'
    // };
    
    // app.send(message);

    app.fetch();
    app.handleUsernameClick();
    app.handleSubmit();

    setInterval(function(){
      context.clearMessages();
      context.fetch();
      //context.send(message);
    }, 5000);
  },

  send : (message) => {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch : () => {
    $.ajax({
      url: app.server,
      type: 'GET',
      data: {order: "-createdAt"},
      success: function (data) {
        console.log('chatterbox: Message received', data);
        app.showChats(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  clearMessages : () => {
    $('#chats').children().remove();
  },

  renderMessage : (message) => {
    // cleanText(message.roomname)

    var $messageUser = $(`<p class="username">${app.cleanText(message.username)}</p>`);
    var $messageText = $(`<div class="msg">${app.cleanText(message.text)}</div>`);
    var $messageRoom = $(`<div class="room">${app.cleanText(message.roomname)}</div>`);
    var $message = $('<div class="message"></div>');
    $('.message').append($messageUser);
    $('.message').append($messageText);
    $('.message').append($messageRoom);
    $('#chats').append($message);
  },

  renderRoom : (roomName) => {
    // $('#roomSelect').append('<div class="room">' + roomName + '</div>');
    $('#roomSelect').append(`<div class="room">${roomName}</div>`);
  },

  handleUsernameClick : () => {
    return true;
  },

  handleSubmit : () => {
    return true;
  },

  showChats : (data) => {
    var dataLength = data.results.length;
    // data.results.forEach( function(current) { renderMessage(current); });
    for (var i = 0; i < dataLength; i++) {
      app.renderMessage(data.results[i]);
    }
  },
  
  cleanText : (inputString) => {

    if (!inputString) {
      return '';
    }

    inputString = inputString.split('');
    inputString.map(function(cur, idx, arr){
      if (escObj[cur]) {
        inputString[idx] = escObj[cur];
      }
    });
    return inputString.join('');
  }

};




// $('#chats').append('Hey Everyone!');

// var message = {
//   username: 'BOLT2612',
//   text: 'Brandon and Greg are Killin\' it.',
//   roomname: '6th Floor'
// };

// app.send(message);
// });



