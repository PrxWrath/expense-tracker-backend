const path  = require('path');
const fs = require('fs');

const logStream = fs.createWriteStream(path.join(__dirname,'../', 'errors.log'), {flags:'a'});

const logger = {
    write: function(data){
        logStream.write(data + '\n');
    }
}

module.exports = logger;