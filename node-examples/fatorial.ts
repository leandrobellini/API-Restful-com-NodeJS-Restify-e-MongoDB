export const fatorial = (num) => {
    if(num == 0){
        return 1;
    }

    return num * fatorial(num -1);
}

//module.exports = fatorial;

/*
    module.exports  = {
        fatorial,
        funcao2,
        funcao3
    }
*/