var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var POSTS_FILE = path.join(__dirname, 'posts.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/posts', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/posts', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var posts = JSON.parse(data);

    var newPost = {
      id: Date.now(),
      uname: req.body.uname,
      uimage: req.body.uimage,
      time: req.body.time,
      ptext: req.body.ptext,
      pimage: req.body.pimage,
      liked: "false",
      likes: req.body.likes,
      comments: []
    };
    posts.unshift(newPost);
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(posts);
    });
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var posts = JSON.parse(data);
    var postID = req.body.id;
    var newComment = {
      id: Date.now(),
      uname: req.body.uname,
      uimage: req.body.uimage,
      comment: req.body.comment,
      time: req.body.time
    };
    for (var i in posts) {
    	if (posts[i]["id"] == postID) {
    		posts[i]["comments"].push(newComment);
    		break;
    	}
    }
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(posts);
    });
  });
});

app.post('/api/likes', function(req, res) {
  fs.readFile(POSTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var posts = JSON.parse(data);
    var postID = req.body.id;
    var liked = req.body.liked;
    for (var i in posts) {
    	if (posts[i]["id"] == postID) {
    		posts[i]["liked"] = liked;
        if(liked == "true")
          ++posts[i]["likes"];
        else
          --posts[i]["likes"];
    		break;
    	}
    }
    fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(posts);
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
