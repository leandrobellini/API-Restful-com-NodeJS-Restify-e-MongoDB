"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const environment_1 = require("../common/environment");
const mongoose = require("mongoose");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routes = []) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                });
                this.application.use(restify.plugins.queryParser());
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
                //routes.forEach(route => route.applyRoutes(this.application))
                //routes
                for (let route of routes) {
                    route.applyRoutes(this.application);
                }
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routes = []) {
        return this.initializeDb().then(() => this.initRoutes(routes).then(() => this));
    }
}
exports.Server = Server;
/*
this.application.get('/info', [
    (req, resp, next) => {
        //verifico se tá usando IE7. Se tiver, mando atualizar e barro
        if(req.userAgent() && req.userAgent().includes('MSIE 7.0')){
            //resp.status(400);
            //resp.json({message: 'Please, update your browser'})
            //return next(false)

            //outra opcao com Error()

            let error: any = new Error()
            error.statusCode = 400
            error.message = 'Please update your browser'
            return next(error)
        }
        return next()
    },
    (req, resp, next) => {
    //resp.setHeader('Content-Type', 'application/json')
    //resp.send({message: 'Hello'})

    //resp.json({message: 'Hello LeandroooooOO'}) //jah seta content-type

    resp.json({
        browser: req.userAgent(),
        method: req.method,
        url: req.url,
        path: req.path(),
        query: req.query    //querys da URL
    })

    return next()
}])
*/
/* //posso usar para tratar error na hora de reservar a porta
this.application.on('error', (err) => {

})
*/ 
