import fs from 'fs';

fs.rename('arquivo.txt', 'arquivo_att.txt', (err) => {
    if (err){ 
        console.log(err);
        return;
    }
    console.log("arquivo renomeado!");
})