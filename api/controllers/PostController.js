/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
    
    const attrs = req.body;

    const post = Post.create({
      user: attrs.id,
      title: attrs.title,
      content: attrs.content
    }).exec(function (err, finn){
      if (err) { return res.serverError(err); }

      sails.log('Finn\'s id is:', finn.id);
      return res.ok();
    });

    res.send({
      status: 400
    });
  }
};

