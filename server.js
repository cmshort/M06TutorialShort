const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //console.log('request made');
    //console.log(req);
    //console.log(req.url, req.method);

    //lodash
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();

    // Set header content type
    res.setHeader('Content-Type', 'text/html');
  
    // res.write('<head><link rel="stylesheet" href="#"></head>');
    // res.write('<p>hello, ninjas</p>');
    // res.write('<p>hello again, ninjas</p>');
    // res.end();

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us':            
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;    
        default: 
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send an html file
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            res.end();
        } else {
            //res.write(data);            
            res.end(data);
        }
    });


});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});