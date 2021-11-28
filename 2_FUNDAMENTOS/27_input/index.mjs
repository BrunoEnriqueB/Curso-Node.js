import readline from 'readline';


const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

readLine.question("Qual sua linguagem favorita?", (language) => {
    console.log(`A minha linguagem preferida é ${language}`);
    readLine.close()
});