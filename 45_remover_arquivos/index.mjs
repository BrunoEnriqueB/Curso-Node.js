import fs from 'fs';

fs.unlink('arquivo.txt', (err) => {
    if (err){ 
        console.log(err);
        return;
    }
    console.log("arquivo removido");
})