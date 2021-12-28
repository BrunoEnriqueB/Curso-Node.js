//módulos externos
import chalk from "chalk";
import inquirer from "inquirer";

//Core Modules
import fs from 'fs';
import { parse } from "path";

operation()
function operation(){
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: ['Criar uma conta', 'Consultar saldo', 'Depositar', 'Transferir', 'Sacar', 'Sair']
    }]).then((answer) => { //respostas
        const action = answer['action']; //pega as respostas do action
        if(action == 'Criar uma conta') {
            createAccount();
        } else if (action === 'Consultar saldo') {
            checkMoney();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {
            takeMoney();
        } else if (action === 'Transferir') {
            getSenderAccount();
        } else {
            console.log(chalk.bgBlue.black('Obrigado por usar o accounts!'));
            process.exit();
        }

    }).catch((err) => console.log(err))
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'));
    console.log(chalk.green('Quais opções de conta vocẽ deseja seguir?'));
    buildAccount();
}

function buildAccount() { //Pegando o nome da conta
    inquirer.prompt([{
        name: 'nameAccount',
        message: 'Qual seu nome?'
    }]).then((answer) => {
        const accountName = answer['nameAccount']; //salve o nome escolhido
        
        if (!fs.existsSync(`accounts`)) { //verifica se não existe o diretorio accounts
            fs.mkdirSync(`accounts`); // cria o diretório accounts
        }
        if(fs.existsSync(`./accounts/${accountName}.json`)) { // verifica se existe o nome em json no diretorio accounts
            console.log(chalk.bgRed.black(`Nome: ${accountName} já existe no nosso banco de dados!`)); // se ja existir da erro e pergunta o nome de novo
            buildAccount();
            return; //esse return tem q existir, porque se ele chamar outra função pra adicionar outro nome, depois q o nome corretor for colocado, o programa vai rodar o resto da função sem necesssidade
        } else {
            fs.writeFileSync(`./accounts/${accountName}.json`, '{"balance": 0}', function(err) {console.log(err)}); // se não existir, cria um novo json com o nome
        }
        console.log(chalk.green('Conta criada com sucesso!'));
        operation();
        }).catch((err) => console.log(err))
}

function deposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName'];
        //verifica se a conta existe
        if(!checkAccount(accountName)) {
            return deposit();
        }
        // a conta existe
        inquirer.prompt([{
            name: 'amount',
            message: 'Qual quantia você deseja depositar?'
        }]).then((answer) => {
            const amount = answer['amount'];
            //adicionar valor
            addAmount(accountName, amount);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
}

function takeMoney() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName'];
        //verifica se a conta existe
        if(!checkAccount(accountName)) {
            return takeMoney();
        }
        // a conta existe
        inquirer.prompt([{
            name: 'amount',
            message: 'Qual quantia você deseja sacar?'
        }]).then((answer) => {
            const amount = answer['amount'];
            //adicionar valor
            removeAmount(accountName, amount);
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
}

function getSenderAccount() {
    inquirer.prompt([{
        name: 'name',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        if (!checkAccount(answer['name'])) {
            console.log('Nenhuma conta com esse nome existe!');
            return getSenderAccount();
        }
        getAddressAccount(answer['name']);
    }).catch(err => {console.log(err)})

}

function getAddressAccount(senderName) {
    inquirer.prompt([{
        name: 'name',
        message: 'Qual o nome da conta que será transferido o dinheiro?'
    }]).then((answer) => {
        if (!checkAccount(answer['name'])) {
            console.log('Nenhuma conta com esse nome existe!');
            return getAddressAccount();
        }
        moneyTranferAmount(senderName, answer['name']);
    }).catch(err => {console.log(err)})
}

function moneyTranferAmount(senderName, addressName) {
    inquirer.prompt([{
        name: 'amount',
        message: 'Qual a quantia que você deseja transferir da sua conta?'
    }]).then((answer) => {
        const amount = answer['amount'];
        const senderAccount = getAccount(senderName);
        const addressAccount = getAccount(addressName);

        if (parseFloat(amount) > parseFloat(senderAccount.balance)) {
            console.log('Você não tem essa quantia para transferência!');
            return moneyTranferAmount(senderName, addressName);
        }
        senderAccount.balance = parseFloat(senderAccount.balance) - parseFloat(amount);
        addressAccount.balance = parseFloat(addressAccount.balance) + parseFloat(amount);

        fs.writeFileSync(`accounts/${senderName}.json`, JSON.stringify(senderAccount), function(err){console.log(err)});
        fs.writeFileSync(`accounts/${addressName}.json`, JSON.stringify(addressAccount), function(err){console.log(err)});
        console.log(chalk.green('Tranfêrencia concluída com sucesso!'));
    }).catch(err => {console.log(err)})
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName); //pega os dados do JSON que precisamos
    
    if (!amount) { // se não existir valor
        console.log(chalk.bgRed.black('Ocorreu um erro!'));
        return removeAmount();
    }
    if (accountData.balance > parseFloat(amount)) {
        accountData.balance = parseFloat(accountData.balance) - parseFloat(amount); // subtrai o valor antigo com o novo
    } else {
        console.log(`O seu saldo é apenas de ${accountData.balance}. Portanto, não pode sacar essa quantia!`)
        return takeMoney();
    }
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){console.log(err)}); //escreve no arquivo o novo valor
    console.log(chalk.green('Saque concluído com sucesso!'));
    operation();

}

function addAmount(accountName, amount) {

    const accountData = getAccount(accountName); //pega os dados do JSON que precisamos
    
    if (!amount) { // se não existir valor
        console.log(chalk.bgRed.black('Ocorreu um erro!'));
        return deposit();
    }

    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance); // soma o valor antigo com o novo
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function(err){console.log(err)}); //escreve no arquivo o novo valor
    console.log(chalk.green('Deposito concluído com sucesso!'));
    operation();

}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8', //padrao de leitura do brasil
        flag: 'r' // argumento q nos mostra q queremos apenas ler o arquivo
    });

    return JSON.parse(accountJSON); //devolve em json. Por mais que lemos o arquivo em JSON, ele ainda ta em um arquivo, ou seja, um texto.
}

function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Essa conta não existe!'));
        return false;
    }
    return true;
}

function checkMoney() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']
        if (!checkAccount(accountName)) { //verifica se a conta não existe
            console.log(chalk.red('Essa conta não existe!'));
            return checkMoney();
        }
        const accountData = getAccount(accountName); // Pega o JSON da conta
        console.log((`Extrato da conta ${accountName} de R$ ${accountData.balance}`))
        operation();
    }).catch(err => console.log(err));
}