"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _items = _interopRequireDefault(require("./items"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param  {object} router - Express router object
 * Declares routes of application
 */
var _default = router => {
  router.use("/api", (0, _items.default)());
  return router;
};

exports.default = _default;