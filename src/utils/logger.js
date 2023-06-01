/*
 * Netro Corporation API
 * (c) 2023 Netro Corporation
*/

const meta = () => {
	return {
		name: "Logger",
		description: "Logs things to the CONSOLE.",
		author: "Aisuruneko"
	};
};

const fs = require("fs");
const logColors = {
	"Reset": "\x1b[0m",

	"FgBlack": "\x1b[30m",
	"FgRed": "\x1b[31m",
	"FgGreen": "\x1b[32m",
	"FgYellow": "\x1b[33m",
	"FgBlue": "\x1b[34m",
	"FgMagenta": "\x1b[35m",
	"FgCyan": "\x1b[36m",
	"FgWhite": "\x1b[37m",

	"BgBlack": "\x1b[40m",
	"BgRed": "\x1b[41m",
	"BgGreen": "\x1b[42m",
	"BgYellow": "\x1b[43m",
	"BgBlue": "\x1b[44m",
	"BgMagenta": "\x1b[45m",
	"BgCyan": "\x1b[46m",
	"BgWhite": "\x1b[47m"
};
const knownTypes = { "ERROR": logColors.FgRed, "INFO": logColors.FgBlue, "WARN": logColors.FgYellow, "SUCCESS": logColors.FgGreen, "DEBUG": logColors.FgMagenta };
const knownLocations = { "SYSTEM": logColors.FgGreen, "BOOTSTRAP": logColors.FgMagenta, "DATABASE": logColors.FgYellow, "REQUEST": logColors.FgCyan };

class Logger {

    constructor (app, location) {
		this.app = app;
        this.location = location;
		this.logLocation = `${__dirname}/../../logs`;
    };

	genDT = () => {
		const pZ = (i) => { return `${(i < 10) ? "0": ""}${i}` };
		const currently = new Date();
		return `${pZ(currently.getFullYear())}` + "/" +
		`${pZ(currently.getMonth() + 1)}` + "/" +
		`${pZ(currently.getDate())}` +
		" " +
		`${pZ(currently.getHours())}` + ":" +
		`${pZ(currently.getMinutes())}` + ":" +
		`${pZ(currently.getSeconds())}`;
	};

	logToFile = (data) => {
		if (!fs.existsSync(this.logLocation)) fs.mkdirSync(this.logLocation);
		fs.writeFileSync(`${this.logLocation}/${this.app.uptimeTimestamp}-log.log`, `${data}\r\n`, {flag:'a+'});
	};

	genMsg = (type, msg) => {
		const currently = this.genDT();
		const typeColor = knownTypes[type] || logColors.FgWhite;
		const locationColor = knownLocations[this.location] || logColors.FgWhite;

		console[type.toLowerCase()](
			`${logColors.Reset}[` +
			`${logColors.FgCyan}${currently}` +
			`${logColors.Reset} · ` +
			`${typeColor}${type}` +
			`${logColors.Reset} | ` +
			`${locationColor}${this.location}` +
			`${logColors.Reset}]:` +
			" " +
			msg
		);
		this.logToFile(
			`[` +
			`${currently}` +
			` · ` +
			`${type}` +
			` | ` +
			`${this.location}` +
			`]:` +
			" " +
			msg
		);
	};

	log = (msg) => { this.genMsg("LOG", msg); }
	error = (msg) => { this.genMsg("ERROR", msg); };
	info = (msg) => { this.genMsg("INFO", msg); }
	warn = (msg) => { this.genMsg("WARN", msg); };
	debug = (msg) => { this.genMsg("DEBUG", msg); };
}

module.exports = (app, location) => {
	return {
		meta,
		execute: Logger
	}
};