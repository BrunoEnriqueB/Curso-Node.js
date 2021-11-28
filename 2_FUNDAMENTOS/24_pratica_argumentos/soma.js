
function soma(a=0, b=0) {
    return a + b;
}

const multiplicacao = (a=1, b=1) => {
    return a * b;
}

const exportar = { soma, multiplicacao }

export default exportar;