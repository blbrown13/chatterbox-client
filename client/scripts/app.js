$( document ).ready(function() {
  app.init();
});

var app = {

  server : 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',

  init : () => {
    app.fetch();
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
    var $username = $(`<p class="username">${message.user}</p>`);
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

