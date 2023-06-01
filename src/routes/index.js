/*
 * Netro Corporation API
 * (c) 2023 Netro Corporation
*/

const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const sharp = require("sharp");

module.exports = (app) => {
	const imgExts = [".png", ".webp", ".jpg", ".jpeg", ".gif", ".svg"];
	const allowedSizes = [];
	const maxPower = 8;
	const baseSize = 16;

	(async() => {
		// // Create list of images from MIME.
		// for (const ext in app.utils.mime) {
		// 	const filter = "image/";

		// 	if (app.utils.mime[ext].includes(filter)) imgExts.push(ext.replace(filter, ""));
		// };
		for (let i = 0; i <= maxPower; i++) { allowedSizes.push(baseSize * Math.pow(2, i)); };
	})();

	router.use((req, res, next) => {
		if (typeof cacheConfig === 'object' && typeof cacheConfig.cache === 'object') {
			app.config.cacheConfig.cache.forEach(function (route) {
				if (req.path.match(new RegExp(route.path, 'g'))) {
					res.set('Cache-Control', 'max-age=' + route.ttl);
				};
			});
		};
		next();
	});

	router.get("/", (req, res, next) => {
		return res.json({
			status: "OK",
			server: app.config.server
		});
	});

	router.all("*", async(req, res) => {

		const cors = req.hostname.includes(process.env.ALLOWORIGINHOST);
		res.set({
			"Access-Control-Allow-Origin": ((cors) ? req.headers.origin : process.env.ALLOWORIGINHOST),
			"Access-Control-Allow-Methods": "POST, GET, OPTIONS",
			"Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
			"Access-Control-Allow-Credentials": "true",
			"Content-Length": 0
		});
		if (req.method == "OPTIONS") {
			return res.end();
		} else if (req.method == "GET") {

			const fileName = req.url.split("?")[0];
			const { size } = req.query;
			// Example: /avatars/2.png?size=128 | avatars/2 is fileName and png is fileExt. 128 is size.

			const sendData = (buffer, format) => {
				res.set("Content-Type", (app.utils.mime[format && format.startsWith(".") ? `${format || ".txt"}` : `.${format || "txt"}`]));
				res.send(buffer);
			};

			const fileExt = path.extname(fileName).substring(1);


			const trueName = fileName.replace(`.${fileExt}`, "");
			const isImg = (app.utils.mime[`.${fileExt}`] ? app.utils.mime[`.${fileExt}`].includes("image") : (`.${fileExt}` == ".webp")) || false;

			const trueExt = imgExts.find(ext => { return fs.existsSync(path.join(__dirname, "/public/", (trueName + ext))); });

			fs.readFile(path.join(__dirname, "/public/", ((isImg) ? (trueName + trueExt) : fileName)), (err, data) => {
				if (err) return res.status(404).json(app.functions.returnError(404, null, false));
				else {
					if (isImg) {
						if (fileExt == "svg") return sendData(data, fileExt);

						sharp(data)
							.metadata()
							.then(metadata => {
								let shInst = sharp(data, {
									animated: (`${trueExt}` === ".gif" || `${trueExt}` === ".svg")
								});

								const ogWidth = metadata.width;
								const ogHeight = metadata.height;
								const maxOGSize = Math.max(ogWidth, ogHeight);

								if (`.${fileExt}` === ".webp" || `.${fileExt}` === ".jpeg")
									shInst = shInst.rotate() // Based on EXIF Data
										.toFormat(fileExt);
								
								if (size) {
									let width, height;
									if (/^\d+x\d+$/.test(size)) {
										[width, height] = size.split("x").map(Number);
									} else {
										width = Number(size);
										height = width;

										if (!allowedSizes.includes(width)) return res.status(400).json(app.functions.returnError(400, null, false));
									};

									let maxReqSize = Math.max(width, height);
									if (maxReqSize > maxOGSize) {
										width = ogWidth;
										height = ogHeight;
									};

									shInst = shInst.resize(width, height);
								}

								return shInst.toBuffer((err, buffer) => {
									if (err) return res.status(500).json(app.functions.returnError(500, null, false));
									else return sendData(buffer, `.${fileExt}`);
								});
						}).catch(err => {
							console.log(err);
							return res.status(400).json(app.functions.returnError(400, null, false));
						});

					} else {
						return sendData(data, fileExt);
					}
				}
			});
		} else return res.status(405).json(app.functions.returnError(405, null, false));
	});

	return router;
};