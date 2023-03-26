// create a class to toggle likes when link is clicked, using ajax

class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax, it looks like same as the promises
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-like'));
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount +=1;
                }

                $(self).attr('data-like',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log('Error in completing the request');
            });
        });
    }
}