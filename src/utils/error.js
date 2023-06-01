/*
 * Netro Corporation CDN
 * (c) 2023 Netro Corporation
*/

const meta = () => {
	return {
		name: "Error Handler",
		description: "Log that something goofed.",
		author: "Aisuruneko"
	};
};

const fs = require("fs");
const crypto = require("crypto");
const logLocation = `${__dirname}/../../errors`;


class ErrorLog {

    constructor (app) {
		this.app = app;
		this.logger = new app.utils.logger(app, "SYSTEM");
    };

	log = (error) => {
		// This is where we want to create a reference number so that support can find
		//  the error once provided and someone can fix it :)
		let refID;

		const { message, stack } = error;

		const errData = {
			message,
			stack,
			generated: new Date().getTime()
		};

		const genRefID = () => { return [6,4,6].map(n => crypto.randomBytes(n/2).toString("hex")).join("-"); };


		(async() => {
			refID = genRefID();
			if (!fs.existsSync(logLocation)) fs.mkdirSync(logLocation);
			fs.writeFileSync(`${logLocation}/${refID || errData.generated}-error.log`, JSON.stringify(errData, null, "\t"));
		})();
		return refID;
	};
}

module.exports = (app) => {
	return {
		meta,
		execute: ErrorLog 
	};
};