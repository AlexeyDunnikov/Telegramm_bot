const Router = require("./Router");

module.exports = class Route {
  constructor(url, controller, description) {
    this.Router = Router.getInstance();

    this.url = url;
    this.controller = controller;
    this.description = description;

    this.Router.addRoute(this);
  }

  static command(url, controller, description = 'Нет информации') {
    try {
      const [ControllerName, FunctionName] = controller.split('@');

      const file = require('../controllers/' + ControllerName);

      if(file[FunctionName] === undefined) {
        throw new Error(`Функции не существует (${controller})`);
      }

      return new Route(url, { file, method: FunctionName }, description);
    } catch (e) {
      console.log(e.message);
    }
  }
};
