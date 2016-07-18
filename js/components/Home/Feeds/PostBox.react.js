var React = require('react');
var FBActions = require('../../../actions/FBActions');
var PostBox = React.createClass({
	newPost: function() {
		if ($('#input-post').val() === "" || ('#input-url').val() === "") {return;}
		var d = new Date();
		var time = (d.getHours()<10?"0"+d.getHours():d.getHours()+"")+"."+(d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes()+"");
		var newPost = {
			uname: "Kshitij Gurjar",
			uimage: "http://www.drodd.com/images14/k30.gif",
			time: time,
			ptext: $('#input-post').val() + "",
			pimage: $('#input-url').val() + "",
			liked: "false",
			likes: 0
	    };
	    $('#input-post').val("");
	    $('#input-url').val("");
	    FBActions.newPost(newPost);
	},
	render: function () {
		return (
			<div className="postbox" height="500">
				<input id="input-url" className="input-url" type="text" placeholder="Enter Image URL here" />
				<div className="hline"></div>
				<div className="postbox-img-txt">
					<img className="postbox-img" src="http://www.drodd.com/images14/k30.gif" alt=""/>
					<textarea id="input-post" placeholder="What's on your mind?"></textarea>
				</div>
				<br/>
				<div className="hline-full"></div>
				<button id="btn-post" className="btn-post" onClick={this.newPost}>Post</button>
			</div>
		);
	}
});

module.exports = PostBox;