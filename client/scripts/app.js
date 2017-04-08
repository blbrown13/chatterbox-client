$( document ).ready(function() {
  app.init();
});

var app = {

  server : 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  init : () => {
    app.fetch();
    app.handleUsernameClick();
    app.handleSubmit();
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

  fetch : function () {
    $.ajax({
      url: app.server,
      type: 'GET',
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
    var $username = $(`<p class="username">${message.username}</p>`);
    var $messageText = $(`<div class="msg">${message.text}</div>`);
    var $message = $('<div class="message"></div>');
    $('.message').append($username);
    $('.message').append($messageText);
    $('#chats').append($message);
  },

  renderRoom : (roomName) => {
    // $('#roomSelect').append('<div class="room">' + roomName + '</div>');
    $('#roomSelect').append(`<div class="room">${roomName}</div>`);
  },

  handleUsernameClick : function() {
    return true;
  },

  handleSubmit : function() {
    return true;
  },

  showChats : function(data) {
    var dataLength = data.results.length;
    // data.results.forEach( function(current) { renderMessage(current); });
    for (var i = 0; i < 10; i++) {
      app.renderMessage(data.results[i]);
    }
  }

};

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

// $('#chats').append('Hey Everyone!');

// var message = {
//   username: 'BOLT2612',
//   text: 'Brandon and Greg are Killin\' it.',
//   roomname: '6th Floor'
// };

// app.send(message);
// });

