import _ from 'lodash';
import chalk from 'chalk';

const a = [1, 2, 3, 4, 5];
const b = [2, 4, 6, 7, 8];

const diff = _.difference(a, b); //lista as diferenças dos array

console.log(chalk.red.bold(diff))