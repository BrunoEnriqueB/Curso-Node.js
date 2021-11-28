import chalk from "chalk";
import inquirer from 'inquirer';

try {
    inquirer.prompt([{
        name: 'nome',
        message: 'Qual seu nome?',
    }, {
        name: 'idade',
        message: 'Qual sua idade?'
    },]).then((answers => {
        console.log(answers);
        console.log(`Sua idade é ${chalk.bgYellow.black(answers.idade)} e seu nome é ${chalk.bgYellow.black(answers.nome)}`)
    }));
} catch (error) {
    console.log(`Erro: ${error}`);
}

