var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var FBConstants = require('../constants/FBConstants');
var postsURL = "http://localhost:3000/api/posts";
var commentsURL = "http://localhost:3000/api/comments";
var likesURL = "http://localhost:3000/api/likes";
var posts = [];

function updatePosts() {
	$.ajax({
      url: postsURL,
      dataType: 'json',
      cache: false,
      success: function(data) {
        posts = data;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postsURL, status, err.toString());
      }.bind(this)
    });
}

function addComment(comment) {
	$.ajax({
      url: commentsURL,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        console.log('Comment successfully added to JSON file');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(commentsURL, status, err.toString());
      }.bind(this)
    });
}

function updateLikes(data) {
	$.ajax({
      url: likesURL,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log('Likes updated');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(likesURL, status, err.toString());
      }.bind(this)
    });
}

function newPost(data) {
	$.ajax({
      url: postsURL,
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        console.log('New Post Added');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(postsURL, status, err.toString());
      }.bind(this)
    });
}

var PostStore = _.extend({}, EventEmitter.prototype, {
	getUpdatedPosts: function () {
		updatePosts();
		return posts;
	},
	emitChange: function() {
		this.emit('change');
	},
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	}
});


AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {

		case FBConstants.UPDATE_POSTS:
			updatePosts();
			break;

		case FBConstants.ADD_COMMENT:
			addComment(action.comment);
			break;

		case FBConstants.UPDATE_LIKES:
			updateLikes(action.data);
			break;

		case FBConstants.NEW_POST:
			newPost(action.data);
			break;

		default:
			return true;
	}

	PostStore.emitChange();

	return true;
});

module.exports = PostStore;