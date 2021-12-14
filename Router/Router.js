const MainController = require("../controllers/MainController");

module.exports = class Router {
  static _instance = null;

  constructor() {
    this.routes = [];

    Router._instance = this;
  }

  static getInstance() {
    if (Router._instance === null) {
      return new Router();
    }

    return Router._instance;
  }

  addRoute(route) {
    const ind = this.routes.findIndex((r) => r.url === route.url);

    if (ind === -1) {
      this.routes.push(route);
    }

    return this;
  }

  middleware(text, args) {
    const [CMD] = text.split(/\s+/);
    const command = this.routes.find(x => x.url === CMD);

    if(command === null || command === undefined) {
      return;
    }

    command.controller.file[
        command.controller.method
    ](args);
  }
};
