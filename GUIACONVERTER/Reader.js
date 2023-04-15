const fs = require("fs");
const util = require("util");

class Reader {

    constructor(){
        this.readFile = util.promisify(fs.readFile);
    }

    async Read(filepath) {

        try{
            return await this.readFile(filepath, "utf-8");
        }catch(err) {
            return undefined;
        }     
    }
}

module.exports = Reader;