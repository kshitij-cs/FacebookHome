var React = require('react');
var ReactDOM = require('react-dom');
var FBRoot = require('./components/FBRoot.react');
var FBActions = require('./actions/FBActions');

FBActions.updatePosts();

ReactDOM.render(
  <FBRoot/>,
  document.getElementById('target')
);
