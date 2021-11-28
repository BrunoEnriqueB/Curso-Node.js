import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
const nome = args['nome'];
const profissao = args['profissao'];
console.log(nome);
console.log(profissao);