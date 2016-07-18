var React = require('react');
var HomeHeader = require('./Home/HomeHeader.react');
var HomeFeed = require('./Home/HomeFeed.react');

var FBRoot = React.createClass({
	render: function () {
		return (
			<div>
				<HomeHeader />
				<HomeFeed />
			</div>
		);
	}
});

module.exports = FBRoot;