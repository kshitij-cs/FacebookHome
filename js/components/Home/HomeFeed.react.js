var React = require('react');
var PostList = require('./Feeds/PostList.react');
var PostBox = require('./Feeds/PostBox.react');

var HomeFeed = React.createClass({
	render: function () {
		return (
			<div className="fb-feed">
				<div className="fb-feed-left">					
					<div className="padTop">
						<img className="userimage" src="http://www.drodd.com/images14/k30.gif" width="16" height="16" />
						<div className="txt-feed-left">Kshitij Gurjar</div>
					</div>
					<br/>
					<div className="padTop">
						<div className="img-edit-profile"></div>
						<div className="txt-feed-left">Edit Profile</div>
					</div>
					<br/>
					<div className="padTop">
						<div className="img-your-posts"></div>
						<div className="txt-feed-left">Your Posts</div>
					</div>
					<br/>
					<span className="tag-favorites">FAVORITES</span>
				</div>
				<div className="fb-feed-centre">
					<PostBox/>
					<PostList/>
				</div>
				<div className="fb-feed-right">
				</div>
			</div>
		);
	}
});

module.exports = HomeFeed;