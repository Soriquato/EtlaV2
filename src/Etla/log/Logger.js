//TODO Upgrade this to a better logger ? IDK ?
export default class Logger {
    info(message) {
        if(typeof(message) !== 'string'){
            throw new Error("The message must be a string")
        }
        return console.log(`\u001b[1;32m INFO` + `\u001b[0m ${message}`);
    }
    warn(message) {
        if(typeof(message) !== 'string'){
            throw new Error("The message must be a string")
        }
        return console.log(`\u001b[1;33m WARN` + `\u001b[0m ${message}`);
    }
    error(message) {
        if(typeof(message) !== 'string'){
            throw new Error("The message must be a string")
        }
        return console.log(`\u001b[1;31m ERROR` + `\u001b[0m ${message}`);
    }
}