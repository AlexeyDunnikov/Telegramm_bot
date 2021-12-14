const MainController = require("../controllers/main");

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

  middleware(text) {
    this.routes.forEach(async (r) => {
      if (r.url === text) {
        const funcName = r.func;
        console.log(r);
        return await r.controller[funcName](r.args);
      }
    });
  }
};
