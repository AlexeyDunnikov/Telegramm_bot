const Route = require("./Router/Route");

Route.command("/info", 'MainController@info', 'Команда старта');
Route.command("/start", 'MainController@start', 'Информация');