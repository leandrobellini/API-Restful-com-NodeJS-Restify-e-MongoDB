import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

class UserRouter extends Router{
    applyRoutes(application: restify.Server){
        
        application.get('/users', (req, resp, next) => {
            User.find().then(this.render(resp, next))
        })

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(this.render(resp, next))
        })

        application.post('/users', (req, resp, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined //prevents the password from being sent to the browser
                resp.json(user)
                return next()
            })
        })

        application.put('/users/:id', (req, resp, next) => {
            const options = {overwhite: true}  //tells I'm going to change all content of this document
            User.update({_id: req.params.id}, req.body, options)
                .exec().then(result => {
                    if(result.n){   //success! We got at least 1 guy
                        return User.findById(req.params.id) //promise return (content User document)
                    }else{
                        return resp.send(404)
                    }
                }).then(user => {                 //get the return to send to the browser
                    resp.json(user)
                    return next()
                })
        })

        application.patch('/users/:id', (req, resp, next)=>{
            const options = {new : true}
            User.findByIdAndUpdate(req.params.id, req.body, options).then(user=>{
              if(user){
                resp.json(user)
                return next()
              }
              resp.send(404)
              return next()
            })
          })
            //partial update. The PUT method update all content of a document. We want a partial update instead
        application.patch('/users/:id', (req, resp, next) => {
            const options = {new: true} //by default, the findByIdAndUpdate method returns the document before update. This way, with new: true, its return the new element
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(user => {
                    if(user){
                        resp.json(user)
                        return next()
                    }
                    resp.send(404)
                    return next()
                })
        })

        application.del('/users/:id', (req, resp, next) => {
            User.findByIdAndRemove({_id: req.params.id})
                .then(user => { 
                        user ? resp.send(204) : resp.send(404)                    
                        return next()
                    }
                )
        })
    } 
}

export const usersRouter = new UserRouter()