import chalk from 'chalk';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

const nota = args['nota'];

nota >= 7 ? console.log(chalk.green('Parabens, você foi aprovado!')) : console.log(chalk.red('Vocẽ foi reprovado!'));
