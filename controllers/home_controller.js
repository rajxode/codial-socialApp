// rendering home page on website
module.exports.home= function(req,res){
    return res.render('home',{
        title:"Social Media"
    });
}