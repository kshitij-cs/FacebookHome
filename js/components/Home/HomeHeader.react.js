var React = require('react');

var HomeHeader = React.createClass({
	render: function () {
		return (
			<header>
	    		<span className="fb-logo">Facebook</span>
	    		<input className="searchBar" type="text" placeholder="Search Facebook" />
	    		<div className="btn-search"><div className="ico-search"></div></div>
	    		<img className="img-user" src="http://www.drodd.com/images14/k30.gif" alt="" width="24" height="24" />
	    		<div className="txt-uname">Kshitij</div>
	    		<div className="txt-uname txt-home">Home</div>
	    		<div className="img-fr"></div>
	    		<div className="img-msg"></div>
	    		<div className="img-not"></div>
	    		<div className="img-settings"></div>
	    		<div className="img-drop"></div>
			</header>
		);
	}
});

module.exports = HomeHeader;