const chalk = require('chalk')
const yargs = require('yargs')
const functionNotes = require('./function.js')

yargs.version('1.1.0')

const nota = {
    title: '',
    body: ''
}

/**
 * Argumentos de la línea de comandos
 */
yargs.command({
    command: 'add',
    describe: 'Agregar nota',
    builder: {
        title: {
            describe: 'Título',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Contenido',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        nota.title = argv.title;
        nota.body = argv.body;
        functionNotes.addNote(nota);
    }
})

yargs.command({
    command: 'read',
    describe: 'Leer notas',
    handler: function(argv) {
        let leerNotas = functionNotes.readNotes();
        if (leerNotas == "") {
            console.log(chalk.blue.inverse('\n******** No hay notas guardadas ********\n'));
        } else {
            let agregar = JSON.parse(leerNotas);
            console.log(chalk.blue.inverse('\n******** Todas las notas: ********'));
            console.log(agregar);
            console.log("\n");
        }
    }
})

yargs.command({
    command: 'search',
    describe: 'Buscar nota',
    builder: {
        opc: {
            describe: 'Buscar por title o body',
            demandOption: true,
            type: 'string'
        },
        texto: {
            describe: 'Texto a buscar',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        let notaEncontrada = functionNotes.searchNotes(argv.opc, argv.texto);
        if (notaEncontrada.length > 0) {
            console.log(chalk.yellow.inverse('\n******** Nota Encontrada: ********'))
            console.log(notaEncontrada);
            console.log("\n");
        } else {
            console.log(chalk.yellow.inverse('\n******** No se encontraron notas ********\n'))
        }
    }
})

yargs.command({
    command: 'delete',
    describe: 'Eliminar nota',
    builder: {
        opc: {
            describe: 'Buscar por title o body',
            demandOption: true,
            type: 'string'
        },
        texto: {
            describe: 'Texto a buscar',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        functionNotes.deleteNote(argv.opc, argv.texto);
    }
})

yargs.parse()