/*
 * Netro Corporation API
 * (c) 2023 Netro Corporation
*/

const meta = () => {
	return {
		name: "Codes",
		description: "Status codes and custom codes for errors.",
		author: "Aisuruneko"
	};
};

const codes = {
	HTTP: {
		200: {
			friendly: "The request completed successfully.",
			geeky: "OK"
		},
		201: {
			friendly: "The entity was created successfully.",
			geeky: "Created"
		},
		204: {
			friendly: "The request completed successfully but returned no content.",
			geeky: "No Content"
		},
		304: {
			friendly: "The entity was not modified.",
			geeky: "Not Modified"
		},
		400: {
			friendly: "The request was improper or the server could not understand it.",
			geeky: "Bad Request"
		},
		401: {
			friendly: "Missing or Invalid Authorization Header.",
			geeky: "Unauthorized"
		},
		403: {
			friendly: "You do not have permission to access this resource.",
			geeky: "Forbidden"
		},
		404: {
			friendly: "The resource does not exist.",
			geeky: "Not Found"
		},
		405: {
			friendly: "The HTTP method used is not valid for this resource.",
			geeky: "Method Not Allowed"
		},
		429: {
			friendly: "You are being rate limited.",
			geeky: "Too Many Requests"
		},
		500: {
			friendly: "An internal server error occurred.",
			geeky: "Internal Server Error"
		},
		502: {
			friendly: "There was not a gateway available to process your request.",
			geeky: "Gateway Unavailable"
		}
	}
};

module.exports = (app) => {
	return {
		meta,
		execute: codes
	};
};