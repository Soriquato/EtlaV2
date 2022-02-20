export default class Logger {
    info(message) {
        return console.log(`\u001b[1;32m INFO` + `\u001b[0m ${message}`);
    }
    warn(message) {
        return console.log(`\u001b[1;33m WARN` + `\u001b[0m ${message}`);
    }
    error(message) {
        return console.log(`\u001b[1;31m ERROR` + `\u001b[0m ${message}`);
    }
}