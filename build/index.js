"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.get("/", function (req, res) {
  res.send('Hey Andela');
});
app.listen(PORT, function () {
  return console.log("Server is running on ".concat(PORT));
});