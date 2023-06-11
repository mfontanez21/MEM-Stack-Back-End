const { Profile, Comment } = require('../models')
const cloudinary = require('cloudinary').v2

async function index(req, res) {
  try {
    const profiles = await Profile.findAll({
      include: [{model: Comment, as: "commentsReceived"}]
    })
    res.status(200).json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findByPk(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url

    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

//add show one profile view

async function show(req, res) {
  try {
    const profile = await Profile.findByPk(req.params.profileId, {
      include: [{ model: Comment, as: "commentsReceived" }]
    });
    res.status(200).json(profile);
    console.log(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function createComment(req, res) {
  try {
    req.body.profileId = req.params.profileId
    req.body.commenterId = req.user.profile.id
    console.log(req.user.profile.id);
    const comment = await Comment.create(req.body)
    res.status(200).json(comment)
  } catch (error){
    console.log(error);
    res.status(500).json ({ err:error })
  }
}


module.exports = { index, addPhoto, show, createComment }
