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

                    // call the create comment class
                    new PostComments(data.data.post._id);


                    // to add functionality to the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


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

                <br>


                <!-- showing 0 likes while creating the post -->
                <small>
                    <a class="toggle-like-button" data-like="0" href="/likes/toggle/?id=${post._id}&type=Post">
                        0 Likes
                    </a>
                </small>
            
            
                <!-- for comments on a post -->
                <div class="post-comments">
            
            
                    <!-- input section for writing a comment -->
            
                    <form id="post-${post._id}-comments-form" action="/comment/create" method="post">
                        <input type="text" name="content" placeholder="Add Comment...">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
            
                    <!-- list of comments on a post -->
                    <div class="post-comments-list">
            
                        <ul id="post-comments-${post._id}">
            
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
                type: 'get',
                url: $(delLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post_container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete_post_button', self);
            delPost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);

        });
    }


    createPost();
    convertPostsToAjax();
}