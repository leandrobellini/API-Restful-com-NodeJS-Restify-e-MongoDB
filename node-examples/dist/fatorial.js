"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fatorial = (num) => {
    if (num == 0) {
        return 1;
    }
    return num * exports.fatorial(num - 1);
};
//module.exports = fatorial;
/*
    module.exports  = {
        fatorial,
        funcao2,
        funcao3
    }
*/ 
