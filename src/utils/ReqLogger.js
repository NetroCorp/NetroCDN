/*
 * Netro Corporation CDN
 * (c) 2023 Netro Corporation
*/

const meta = () => {
	return {
		name: "Request Logger",
		description: "Logs requests.",
		author: "Aisuruneko"
	};
};

const reqlog = (app, req, res, next) => {
	const requestStart = Date.now();

	let errMsg = null;
	let body = [];
	req.on("data", chunk => {
		body.push(chunk);
	});
	req.on("error", error => {
		errMsg = error.message || error;
	});
	req.on("end", () => {
		// nice body.
		body = Buffer.concat(body).toString();

		// Request
		const { rawHeaders, httpVersion, method, socket, originalUrl } = req;
		const { remoteAddress, remoteFamily } = socket;
		
		// Reponse
		const { statusCode, statusMessage } = res;
		const headers = res.getHeaders();

		// Log the data
		const logger = new app.utils.logger(app, "REQUEST");

		logger.debug(`${remoteAddress} - ${statusCode} ${method} ${originalUrl} ${body ? "(has body)" : ""}`);
	});

	return next();
};

module.exports = (app) => {
	return {
		meta,
		execute: reqlog
	}
};