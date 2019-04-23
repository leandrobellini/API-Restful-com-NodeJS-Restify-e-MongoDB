"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//classe abstrata define um template a ser usado pelas classes que a herdam
class Router {
    render(response, next) {
        return (document) => {
            if (document) {
                response.json(document);
            }
            else {
                response.send(404);
            }
            return next();
        };
    }
}
exports.Router = Router;
