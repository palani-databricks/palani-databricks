import React from 'react';
import {Helmet} from 'react-helmet';

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <style>{'body { background-color: red; }'}</style>
            </Helmet>
            ...
        </div>
    );
  }
};

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Welcome to Databricks" }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Hello World" }');
});
app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});
app.listen(process.env.PORT || 3000);
module.exports = app;

