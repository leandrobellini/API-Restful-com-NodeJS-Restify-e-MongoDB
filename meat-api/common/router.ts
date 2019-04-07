import * as restify from 'restify'

//classe abstrata define um template a ser usado pelas classes que a herdam
export abstract class Router{
    abstract applyRoutes(application: restify.Server)
}