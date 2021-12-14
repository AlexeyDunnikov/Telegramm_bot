const Router = require("./Router");

module.exports = class Route {
  constructor(url, controller, func) {
    this.Router = Router.getInstance();

    this.url = url;
    this.controller = controller;
    this.func = func;

    this.Router.addRoute(this);
  }

  static command(url, controller, func) {
    return new Route(url, controller, func);
  }
};
