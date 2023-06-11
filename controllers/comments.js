const { Comment } = require("../models");

async function index(req, res) {
  try {
    const comments = await Comment.findAll();
    res.stauts(200).json(comments);
  } catch (error) {
    res.status(500).json;
  }
}

async function create(req, res) {
  try {
    req.body.commenterId = req.user.profile.id;
    console.log(req.user.profile.id);
    const comment = await Comment.create(req.body);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ err: error });
  }
}

async function update(req, res) {
  try {
    console.log(req.params.commentId);
    console.log(req.body);
    const comment = await Comment.update(req.body, {
      where: { id: req.params.commentId },
      returning: true,
    });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByPk(req.params.commentId);
    await comment.destroy();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  index,
  create,
  update,
  delete: deleteComment,
};
