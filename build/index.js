"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _config = _interopRequireDefault(require("./config/config"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import cookieParser from 'cookie-parser';
// import http from 'http';
var app = (0, _express["default"])();
var port = _config["default"].port,
    env = _config["default"].env; // const PORT = parseInt(process.env.PORT, 10) || 5000;
// app.use(cookieParser());

app.use((0, _morgan["default"])('combined'));
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use('/api/v1', _routes["default"]);
app.get('/', function (req, res) {
  res.json({
    message: 'default routes'
  });
});
app.listen(port, function () {
  return console.log("app starting on port: ".concat(port));
});
var _default = app;
exports["default"] = _default;