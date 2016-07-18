var AppDispatcher = require('../dispatcher/AppDispatcher');
var FBConstants = require('../constants/FBConstants');

var FBActions = {
	updatePosts: function () {
		AppDispatcher.handleAction({
			actionType: FBConstants.UPDATE_POSTS
		})
	},
	addComment: function (comment) {
		AppDispatcher.handleAction({
			actionType: FBConstants.ADD_COMMENT,
			comment: comment
		})
	},
	updateLikes: function (data) {
		AppDispatcher.handleAction({
			actionType: FBConstants.UPDATE_LIKES,
			data: data
		})
	},
	newPost: function(data) {
		AppDispatcher.handleAction({
			actionType: FBConstants.NEW_POST,
			data: data
		});
	}
};

module.exports = FBActions;