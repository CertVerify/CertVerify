const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb+srv://njath-admin:2oBazQZRjohsZF4h@njath.pdrlahx.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://CertVerify:5KKicuWY6yT0tcl9@cluster0.vrxnqdk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
	},
});

async function readMongo(req, res) {
	if (req.method === "GET") {
		try {
			await client.connect();
			const institutes = await client.db("CertVerify").collection("institutes").find({ userID: "ritRandom" }).toArray();
			res.status(200).json(institutes);
			console.log("Pinged your deployment. You successfully connected to MongoDB!");
		} catch (error) {
			res.status(500).json({ error: "Unable to connect to database" });
		} finally {
			await client.close();
		}
	} else {
		res.status(405).json({ error: "Unsupported HTTP method" });
	}
}

async function updateMongo() {
	try {
		await client.connect();
		const cooll = client.db("CertVerify").collection("institutes");
		// for await (const doc of cooll.find({ userID: "ritRandom" })) {
		// 	console.log(doc);
		// }
		await cooll.updateOne(
			{ userID: "ritRandom" },
			{
				$push: {
					certificates: {
						hashID: "#123456789",
						name: "Harpranav",
						certificateID: "CT0987654321",
						date: "10 Jun, 2022",
					},
				},
			},
			{}
		);
		const cooll2 = client.db("CertVerify").collection("users");
		await cooll2.updateOne(
			{ uuid: "123456789012" },
			{
				$push: {
					certificates: {
						date: "12 Jul, 2027",
						hashID: "#123456789",
						issuer: "RIT, Random",
						name: "BTech - 2027",
						starred: true,
						certificateID: "CT0987654321",
						logo: "https://i.pinimg.com/originals/84/f7/89/84f7895dd0e7e22256a15815322bc5cf.png",
					},
				},
			},
			{}
		);
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		await client.close();
	}
}
// updateMongo().catch(console.dir);

// const express = require('express');
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {

//     resp.send("App is Working");
// });

// app.post("/register", async (req, resp) => {
//     try {
//         const user = new User(req.body);
//         let result = await user.save();
//         result = result.toObject();
//         if (result) {
//             delete result.password;
//             resp.send(req.body);
//             console.log(result);
//         } else {
//             console.log("User already register");
//         }

//     } catch (e) {
//         resp.send("Something Went Wrong");
//     }
// });

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// const FormData = require('form-data');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.post('/uploadToIPFS', async (req, res) => {
//     try {
//         const JSONBody = req.body;

//         if (!JSONBody) {
//             return res.status(400).json({ success: false, message: 'Invalid JSON payload' });
//         }

//         const key = process.env.REACT_APP_PINATA_KEY;
//         const secret = process.env.REACT_APP_PINATA_SECRET;

//         const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

//         const response = await axios.post(url, JSONBody, {
//             headers: {
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             },
//         });

//         const pinataURL = https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash};
//         return res.json({ success: true, pinataURL });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// });

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Jimp = require("jimp");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/getCertsInsti", async (req, res) => {
	readMongo(req, res);
})

app.post("/upload", async (req, res) => {
	try {
		const { apiKey, apiSecret, jsonData } = req.body;

		if (!apiKey || !apiSecret || !jsonData) {
			return res.status(400).json({ error: "Missing required parameters" });
		}

		const pinataUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

		const headers = {
			"Content-Type": "application/json",
			pinata_api_key: apiKey,
			pinata_secret_api_key: apiSecret,
		};

		const jsonString = JSON.stringify(jsonData);

		const payload = {
			pinataContent: jsonString,
		};

		const response = await axios.post(pinataUrl, payload, { headers });

		const pinataUrlPrefix = "https://gateway.pinata.cloud/ipfs/";
		const pinataIpfsHash = response.data.IpfsHash;
		const pinataJsonUrl = pinataUrlPrefix + pinataIpfsHash;

		res.json({ pinataUrl: pinataJsonUrl });
	} catch (error) {
		console.error("Error:", error.response ? error.response.data : error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

const storage = multer.memoryStorage();
const upload1 = multer({ storage: storage });

app.post("/uploadImage", upload1.single("image"), async (req, res) => {
	try {
		const { apiKey, apiSecret } = req.body;

		if (!apiKey || !apiSecret || !req.file) {
			return res.status(400).json({ error: "Missing required parameters" });
		}

		const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

		const headers = {
			"Content-Type": "multipart/form-data",
			pinata_api_key: apiKey,
			pinata_secret_api_key: apiSecret,
		};

		const formData = new FormData();
		formData.append("file", req.file.buffer, { filename: req.file.originalname });

		const response = await axios.post(pinataUrl, formData, { headers });

		const pinataUrlPrefix = "https://gateway.pinata.cloud/ipfs/";
		const pinataIpfsHash = response.data.IpfsHash;
		const pinataImageUrl = pinataUrlPrefix + pinataIpfsHash;

		res.json({ pinataUrl: pinataImageUrl });
	} catch (error) {
		console.error("Error:", error.response ? error.response.data : error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

///////////////////////////////////////////

const upload = multer({ storage: storage }).array("img", 2);

app.post("/generateCertificate", upload, async (req, res) => {
	try {
		const { name, dob, phy_marks, maths_marks, chem_marks, socio_marks, date } = req.body;

		const image = await Jimp.read("./Marksheet.png");
		const sign = await Jimp.read(req.files[0].buffer);
		const photo = await Jimp.read(req.files[1].buffer);

		const font1 = await Jimp.loadFont(Jimp.FONT_SANS_8_BLACK);
		const font2 = await Jimp.loadFont(Jimp.FONT_SANS_12_BLACK);
		image.print(font1, 105, 164, name);
		image.print(font1, 133, 179, dob);
		image.print(font1, 110, 439, date);
		image.print(font2, 233, 271, maths_marks);
		image.print(font2, 233, 302, socio_marks);
		image.print(font2, 233, 332, chem_marks);
		image.print(font2, 233, 363, phy_marks);

		// sign.resize(300, 150);
		// image.blit(sign, 1280, 980);

		sign.resize(80, 50);
		photo.resize(80, 80);
		image.blit(photo, 428, 80);
		image.blit(sign, 413, 520);

		const certificateBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
		// res.type('png').send(certificateBuffer);
		res.json({ success: true, certificate: certificateBuffer.toString("base64") });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
});

app.listen(port, () => {
	console.log("Server is running at http://localhost:${port}");
});
