import { fatorial } from './fatorial';

//const fatorial = require('./fatorial')
const argv = require('yargs').demandOption('num').argv  //node main.js --num=6

console.log('n-fatorial');

console.log(`Executando o script a partir do diretório ${process.cwd()}`);

//Será chamado quando o script terminar... posso fazer alguma limpeza
process.on('exit', () => {
    console.log('Script terminando')
})

const num = argv.num //parseInt(process.argv[2]) //argumento recebendo

console.log(`O fatorial de ${num} é igual a ${fatorial(num)}`)

const t = -1

console.log(`Teste -> ${t}`)

console.log(process.argv) //argumentos do programa (local do node, nome do script, args...)

console.log(module.paths) //lugares onde o node busca os modulos

console.log(`1 + 1 = ${1+1}`) //expressao será avaliada. Uso o ` nas chamadas template strings


