const fs = require('fs');
const readline = require('readline');

const wasmModule = require('./lua.js');

wasmModule().then((instance) => {
    instance._initialize_lua();

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("Lua 5.4.7  Copyright (C) 1994-2024 Lua.org, PUC-Rio");

    function promptUser() {
        rl.question('> ', (input) => {
            if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
                instance._cleanup_lua();
                rl.close();
                return;
            }

            instance.ccall('run_lua_line', 'number', ['string'], [input]);
            promptUser();
        });
    }

    promptUser();
});