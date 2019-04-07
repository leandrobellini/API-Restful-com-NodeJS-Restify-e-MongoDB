import * as restify from 'restify';
import {environment} from '../common/environment'
import {Router} from '../common/router'

export class Server{
    application: restify.Server

    initRoutes(routes: Router[] = []): Promise<any>{
        return new Promise((resolve, reject) => {
            try{
                this.application = restify.createServer({
                    name: 'meat-api',
                    version: '1.0.0'
                })
                this.application.use(restify.plugins.queryParser())

                this.application.listen(environment.server.port, () => {
                    resolve(this.application)
                })

                //routes
                for(let route of routes){
                    route.applyRoutes(this.application)
                }

            }
            catch(error){
                reject(error)
            }
        })
    }
    
    bootstrap(routes: Router[] = []): Promise<Server>{
        return this.initRoutes(routes).then(() => this)
    }
}



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