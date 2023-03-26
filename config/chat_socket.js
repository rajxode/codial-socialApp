

module.exports.chatSockets = function(socketServer){
    // checking on events
    let io= require('socket.io')(socketServer);

    // receive a connection
    // return back to connectionHandler
    io.on('connection',function(socket){
        console.log('new Connection received',socket.id);


        // when client is disconnect
        socket.on('disconnet',function(){
            console.log('Socket disconneted');
        });


        // joining the chatroom
        socket.on('join_room',function(data){
            // request to join
            console.log('joining request rec.',data);

            // make the user to join the chatroom
            socket.join(data.chatroom);

            // sending a message to all user when a new user joins the chatroom
            io.in(data.chatroom).emit('user_joined',data);
        });

        // detect send_message event and broadcast to everyone in chat room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });
}