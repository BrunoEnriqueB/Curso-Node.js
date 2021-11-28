import EventEmitter from "events";

const teste = new EventEmitter()

teste.on('start', () => {
    console.log("durante!")
})

console.log("Antes")
teste.emit('start')
console.log('depois')