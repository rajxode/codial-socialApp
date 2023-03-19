// define worker
const queue = require('../config/kue');

// importing commentsMailer
const commentMailer = require('../mailers/comments_mailer');

// process function for worker to run the following code
queue.process('emails',function(job,done){
    console.log('emails worker is processing a job', job.data);

    commentMailer.newComment(job.data);

    done();
});