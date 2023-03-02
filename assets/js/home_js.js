{
    // create new post using ajax

    //for sending data to controller
    let createPost = function(){
        let newPostForm = $('#post-form');
        newPostForm.submit(function(event){
            // preventing default function of submit button in form
            event.preventDefault();

            // using ajax to send data of post to the controller
            $.ajax({
                type:'post',
                url:'/post/create',
                data:newPostForm.serialize(),
                success:function(data){
                    // storing post data in a variable 
                    let newPost = newPostDom(data.data.post);
                    // appending post in the list 
                    $('#post_container>ul').prepend(newPost);
                    
                    // for deleting a post
                    delPost($(' .delete_post_button', newPost));
                },error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // for creating post and showing it on screen
    let newPostDom=function(post){
        return $(`
            <li id="post-${post._id}">
            
                <!-- showing delete button only when the authorized person logged in  -->
                <small>
                    <!-- to delete a post -->
                    <a class="delete_post_button" href="/post/destroy/${ post._id }">X</a>
                </small>

                <p>
                    <!-- content of post -->
                    ${post.content}
                </p>
            
                <p>
                    <!-- user who posted -->
                    ${post.user.name}
                </p>
            
            
                <!-- for comments on a post -->
                <div class="post-comments">
            
            
                    <!-- input section for writing a comment -->
            
                    <form action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Add Comment...">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
            
                    <!-- list of comments on a post -->
                    <div class="comment-list">
            
                        <ul id="post-comment-${post._id}">
            
                            <!-- iterating over the list of comments on a post -->
                             
                        </ul>
            
                    </div>
            
                </div>
            
            </li>`);
    }


    // function to deleta a post 
    let delPost = function(delLink){
        $(delLink).click(function(e){
            e.preventDefault();

            // making ajax call 
            $.ajax({
                type:'get',
                url:$(delLink).prop('href'),
                success:function(data){
                    $(`#post-${data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    }


    createPost();
}