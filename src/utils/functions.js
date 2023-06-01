/*
 * Netro Corporation API
 * (c) 2023 Netro Corporation
*/

const meta = () => {
	return {
		name: "Functions",
		description: "Common functions helper.",
		author: "Aisuruneko"
	};
};

class Functions {

    constructor (app) {
		this.app = app;
    };

	checkIfEmpty = (str) => { return (!str || str.length === 0 || /^\s*$/.test(str)) };

	returnError = (code, reason, genRefID = true) => {
		let data = this.app.utils.codes.HTTP[code];
		if (!data) return { error: "Could not find a valid code to throw back!!!" };
		data["refID"] = (genRefID) ? new this.app.utils.error(this.app).log(new Error(reason)) : undefined;
		return {
			status: data.geeky,
			code,
			message: genRefID ? data.friendly : undefined,
			refID: data.refID
		};
	};
};

module.exports = (app) => {
	return {
		meta,
		execute: Functions
	}
};