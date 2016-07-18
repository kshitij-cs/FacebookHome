var React = require('react');
var PostStore = require('../../../stores/PostStore');
var FBActions = require('../../../actions/FBActions');

var com = "";

function getPostStoreState() {
	return {posts: PostStore.getUpdatedPosts()};
}

var PostList = React.createClass({
	fetchUpdatedPosts: function() {
		this.setState({posts: PostStore.getUpdatedPosts()});
	},
	getInitialState: function() {
		return getPostStoreState();
	},
	componentDidMount: function() {
    	PostStore.addChangeListener(this._onChange);
    	setInterval(this.fetchUpdatedPosts, 500);
	},
	componentWillUnmount: function() {
    	MailStore.removeChangeListener(this._onChange);
	},
	_onChange: function() {
    	this.setState(getPostStoreState());
	},
	addNewComment: function(postID, e) {
		if(e.key === "Enter" && com !== "") {
			var d = new Date();
			var time = (d.getHours()<10?"0"+d.getHours():d.getHours()+"")+"."+(d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()+"");
			var newComment = {
				"id": postID,
                "uname": "Kshitij Gurjar",
                "uimage": "http://www.drodd.com/images14/k30.gif",
                "comment": com,
                "time": time
			};
			$('.ip-comment').val("");
			com = "";
    		FBActions.addComment(newComment);
		}
		else {
			com = com + e.key;
		}
	},
	updateLikes: function(postID, liked) {
		var data = {};
		if (liked === "true") {
			data = {
				"id": postID,
				"liked": false
			};
		} else {
			data = {
				"id": postID,
				"liked": true
			};
		}
		FBActions.updateLikes(data);
	},
	render: function() {
		var postNodes = this.state.posts.map(function(post) {
			var postID = post.id;
			var commentNodes = post.comments.map(function(comment) {
				return (
					<div key={comment.id} className="userinfo">
						<div className="h-blank"></div>
						<img className="uimage" src={comment.uimage} height="32" width="32"/>
						<div className="name-time">
							<div className="uname">{comment.uname}</div>
							<div className="ucomment">{comment.comment}</div>
							<div className="time">{comment.time}</div>
						</div>
						<div className="h-blank"></div>
					</div>
				);
			}, this);
			return (
				<div className="post-item" key={post.id}>
					<div className="userinfo">
						<img className="uimage" src={post.uimage} height="40" width="40"/>
						<div className="name-time">
							<div className="uname">{post.uname}</div>
							<div className="time">{post.time}</div>
						</div>
					</div>
					<br/>
					<br/>
					<p>{post.ptext}</p>
					<img className="pimage" src={post.pimage} alt=""/>
					<div className="hline"></div>
					<div className="lcs-container">
						<span className={post.liked == "true" ? "btn-liked btn-lcs" : "btn-unliked btn-lcs"}>Like</span>
						<div className={"btn-tag" + (post.liked == "true" ? " btn-tag-liked" : "")} onClick={this.updateLikes.bind(this, postID, post.liked)}>Like</div>
						<span className="btn-comment btn-lcs">Comment</span	>
						<div className="btn-tag">Comment</div>
						<span className="btn-share btn-lcs">Share</span>
						<div className="btn-tag">Share</div>
					</div>
					<br/>
					<div className="hline-full"></div>
					<div className="comment-container">
						<div className="likes-container">
							<div className="likes-icon"></div>
							<div className="likes-txt">{post.likes}</div>
						</div>
						<br/>
						<div className="hline"></div>
						<div>{commentNodes}</div>
						<div className="add-comment" height="50">
							<div className="h-blank"></div>
							<div className="h-blank"></div>
							<img src="http://www.drodd.com/images14/k30.gif" height="32" width="32"/>
							<div className="input-container">
								<input ref="newComment" onKeyPress={this.addNewComment.bind(this, postID)} className="ip-comment" type="text" placeholder="Write a comment..."/>
							</div>
						</div>
					</div>
				</div>
			);
		}, this);

		return (
			<div>{postNodes}</div>
		);
	}
});

module.exports = PostList;