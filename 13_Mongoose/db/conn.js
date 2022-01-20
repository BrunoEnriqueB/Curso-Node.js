const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/testemongoose');
  //console.log('conectou ao mongo db com mongoose');
}

main().catch(err => console.log(err));

module.exports = main();