import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

class UserRouter extends Router{
    applyRoutes(application: restify.Server){
        
        application.get('/users', (req, resp, next) => {
            User.find().then(users => {
                resp.json(users)
                return next()
            })
        })

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(user => {
                if(user){
                    resp.json(user)
                    return next()
                }
                resp.send(404)
                return next()
            })
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined //evita que o password seja enviado na confirmacao do POST
                resp.json(user)
                return next()
            })
        })

        application.put('/users/:id', (req, resp, next) => {
            const options = {overwhite: true}   //falo que vou substituir todo o conteudo desse document
            User.update({_id: req.params.id}, req.body, options)
                .exec().then(result => {
                    if(result.n){   //sucesso! Achamos 1 cara pelo menos
                        return User.findById(req.params.id) //retorno da promise (conteudo User document)
                    }else{
                        return resp.send(404)
                    }
                }).then(user => {                           //pego aqui o retorno pra mandar pro Browser
                    resp.json(user)
                    return next()
                })
        })
    }
}

export const usersRouter = new UserRouter()