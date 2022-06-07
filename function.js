const chalk = require('chalk')
const fs = require('fs')

const notas = [];
/**
 * Función para agregar una nota al archivo json
 * @param {*} nota -> objeto json 
 */
const addNote = (nota) => {
    const leerNotas = readNotes();
    if (leerNotas != '' && leerNotas != null) {
        try {
            let agregar = JSON.parse(leerNotas);
            agregar.push(nota);
            fs.writeFileSync('notes.json', JSON.stringify(agregar));
            console.log(chalk.green.inverse('\n******** Nota Guardada ********\n'));
        } catch (err) {
            console.error(err);
        }
    } else {
        try {
            notas.push(nota);
            fs.writeFileSync('notes.json', JSON.stringify(notas));
            console.log(chalk.green.inverse('\n******** Nota Guardada ********\n'));
        } catch (err) {
            console.log(err);
        }
    }
}

const readNotes = () => {
    try {
        let leerNotas = fs.readFileSync('notes.json', 'utf-8');
        return leerNotas;
    } catch (err) {
        console.log(err);

    }
}

/**
 * Funcion para buscar una nota por título o por body de la nota
 * @param {*} opc -> característica del objeto
 * @param {*} texto -> texto a buscar de la característica
 * @returns objeto en caso de encontrar la nota
 */
const searchNotes = (opc, texto) => {
    leerNotas = readNotes();
    if (leerNotas != "") {
        let buscar = JSON.parse(leerNotas);
        if (opc == "title") {
            return buscar.filter(
                (nota) => nota.title === texto,
            ) /*[0] || {}*/ ;
        }
        if (opc == "body") {
            return buscar.filter(
                (nota) => nota.body === texto,
            ) /*[0] || {}*/ ;
        }
    } else {
        return "";
    }
}

/**
 * Funcion para eliminar una nota por título o por body de la nota
 * @param {*} opc -> característica del objeto
 * @param {*} texto -> texto a eliminar de la característica
 * @returns letrero de confirmación
 */
const deleteNote = (opc, texto) => {
    let leerNotas = readNotes();
    let banderaEncontrado = 0;
    let buscar = [];
    if (leerNotas != "") {
        buscar = JSON.parse(leerNotas);
        for (var i = 0; i < buscar.length; i++) {
            if (opc == "title") {
                if (buscar[i].title == texto) {
                    buscar.splice(i, 1);
                    banderaEncontrado = 1;
                }
            }
            if (opc == "body") {
                if (buscar[i].body == texto) {
                    buscar.splice(i, 1);
                    banderaEncontrado = 1;
                }
            }
        }
    }
    if (banderaEncontrado == 0) {
        console.log(chalk.redBright.inverse('\n******** No se encontro nota para ser eliminada ********\n'));
    } else {
        console.log(chalk.redBright.inverse('\n******** Nota Eliminada ********\n'));
    }
    if (buscar.length > 0) {
        try {
            fs.writeFileSync('notes.json', JSON.stringify(buscar));
        } catch (err) {
            console.error(err);
        }
    } else {
        try {
            fs.writeFileSync('notes.json', "");

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    addNote: addNote,
    readNotes: readNotes,
    searchNotes: searchNotes,
    deleteNote: deleteNote
}