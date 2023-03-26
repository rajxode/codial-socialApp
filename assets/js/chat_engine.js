// frontend of chating


// class for chatting frontend
class ChatEngine{
    // initialize id of chatbox and user's email
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // port for chatting using socket.io
        // sending connect request
        this.socket = io.connect('http://localhost:1000');

        if(this.userEmail){
            // calling connection handler
            this.connectionHandler();
        }
    }


    connectionHandler(){
        let self = this;

        // check if the connection is completed
        this.socket.on('connect',function(){
            console.log('Connection established using sockets');


            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'socialmedia'

            });


            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            });
        });


        $('#send-button').click(function(e){
            e.preventDefault();
            let msg = $('#chat-message').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom:'socialmedia'
                });
            }
        })


        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'friends_message';

            if(data.user_email == self.userEmail){
                messageType = 'my_message';
            }

            newMessage.append($('<span>',{
                'html':data.message
            }));

            // newMessage.append($('<sub>',{
            //     'html':data.user_email
            // }));

            newMessage.addClass(messageType);

            $('#chat_message_list').append(newMessage);
        });

    }
}