const Router = require("./Router");

module.exports = class Route {
  constructor(url, controller, func, ...args) {
    this.Router = Router.getInstance();

    this.url = url;
    this.controller = controller;
    this.func = func;
    this.args = args;

    this.Router.addRoute(this);
  }

  static command(url, controller, func, ...args) {
    return new Route(url, controller, func, ...args);
  }
};
