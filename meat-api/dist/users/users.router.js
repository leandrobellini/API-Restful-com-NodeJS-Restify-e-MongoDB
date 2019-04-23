"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UserRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(this.render(resp, next));
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(this.render(resp, next));
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(user => {
                user.password = undefined; //prevents the password from being sent to the browser
                resp.json(user);
                return next();
            });
        });
        application.put('/users/:id', (req, resp, next) => {
            const options = { overwhite: true }; //tells I'm going to change all content of this document
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) { //success! We got at least 1 guy
                    return users_model_1.User.findById(req.params.id); //promise return (content User document)
                }
                else {
                    return resp.send(404);
                }
            }).then(user => {
                resp.json(user);
                return next();
            });
        });
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        //partial update. The PUT method update all content of a document. We want a partial update instead
        application.patch('/users/:id', (req, resp, next) => {
            const options = { new: true }; //by default, the findByIdAndUpdate method returns the document before update. This way, with new: true, its return the new element
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(user => {
                if (user) {
                    resp.json(user);
                    return next();
                }
                resp.send(404);
                return next();
            });
        });
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.findByIdAndRemove({ _id: req.params.id })
                .then(user => {
                user ? resp.send(204) : resp.send(404);
                return next();
            });
        });
    }
}
exports.usersRouter = new UserRouter();
