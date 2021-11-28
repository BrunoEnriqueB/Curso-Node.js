// módulo externo
import minimist from 'minimist';

// módulo interno
import exportar from './soma.js';

const args = minimist(process.argv.slice(2));

const a = parseInt(args['a']);
const b = parseInt(args['b']);

console.log(`soma: ${exportar.soma(a, b)}, multiplicação: ${exportar.multiplicacao(a, b)}`);
