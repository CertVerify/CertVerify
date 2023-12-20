const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = "mongodb+srv://njath-admin:2oBazQZRjohsZF4h@njath.pdrlahx.mongodb.net/?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://CertVerify:5KKicuWY6yT0tcl9@cluster0.vrxnqdk.mongodb.net/?retryWrites=true&w=majority";

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
      const institutes = await client
        .db("CertVerify")
        .collection("institutes")
        .find({ userID: "ritRandom" })
        .toArray();
      res.status(200).json(institutes);
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      res.status(500).json({ error: "Unable to connect to database" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Unsupported HTTP method" });
  }
}

async function updateMongo(hashID, p) {
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
            hashID: hashID,
            name: "Harpranav",
            certificateID: p,
            date: "2 Apr, 2029",
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
            date: "2 Apr, 2029",
            hashID: hashID,
            issuer: "RIT, Random",
            name: "MTech - 2029",
            starred: false,
            certificateID: p,
            logo: "https://i.pinimg.com/originals/84/f7/89/84f7895dd0e7e22256a15815322bc5cf.png",
          },
        },
      },
      {}
    );
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
// updateMongo().catch(console.dir);

// const express = require('express');
// // const app = express();
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
// app.listen(5000);

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
const QRCode = require("qrcode");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const FormData = require("form-data");
const fs = require("fs");

app.get("/getCertsInsti", async (req, res) => {
  readMongo(req, res);
});

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
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/uploadImage', upload.single('image'), async (req, res) => {
//     try {
//         const { apiKey, apiSecret } = req.body;

//         if (!apiKey || !apiSecret || !req.file) {
//             return res.status(400).json({ error: 'Missing required parameters' });
//         }

//         const pinataUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/uploadImage", upload.single("image"), async (req, res) => {
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
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
    });

    const response = await axios.post(pinataUrl, formData, { headers });

    const pinataUrlPrefix = "https://gateway.pinata.cloud/ipfs/";
    const pinataIpfsHash = response.data.IpfsHash;
    const pinataImageUrl = pinataUrlPrefix + pinataIpfsHash;

    res.json({ pinataUrl: pinataImageUrl });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const GenerateQr = async (text) => {
  try {
    const QR = await QRCode.toDataURL(text);
    return QR;
  } catch (err) {
    console.error(err);
  }
};

app.post("/generateCertificate", async (req, res) => {
  const p = Math.floor(1000 + Math.random() * 9000);
  try {
    const { name, dob, marks0, marks1, marks2, marks3, photo, sign } = req.body;

    const qr = await GenerateQr(
      "localhost:3001/verify?certid=" + p + "&dob=" + dob
    );

    const image = await Jimp.read("./Marksheet.png");
    const qr_ = await Jimp.read(
      Buffer.from(
        qr.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );
    const photo_ = await Jimp.read(
      Buffer.from(
        photo.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );
    const sign_ = await Jimp.read(
      Buffer.from(
        sign.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );

    const font1 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    image.print(font1, 420, 636, name);
    image.print(font1, 532, 740, dob);
    image.print(
      font1,
      110 * 4,
      1752,
      new Date(Date.now()).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    );
    image.print(font1, 1890, 310, p);
    image.print(font2, 233 * 4, 271 * 4, marks0);
    image.print(font2, 233 * 4, 302 * 4, marks1);
    image.print(font2, 233 * 4, 332 * 4, marks2);
    image.print(font2, 233 * 4, 362 * 4, marks3);

    if (marks0 > 80) {
      image.print(font2, 1640, 271 * 4, "Excellent");
    } else if (marks0 > 60) {
      image.print(font2, 1620, 271 * 4, "Very Good");
    } else if (marks0 > 30) {
      image.print(font2, 413 * 4, 271 * 4, "Average");
    } else {
      image.print(font2, 1700, 271 * 4, "Fail");
    }

    if (marks1 > 80) {
      image.print(font2, 1640, 302 * 4, "Excellent");
    } else if (marks1 > 60) {
      image.print(font2, 1620, 302 * 4, "Very Good");
    } else if (marks1 > 30) {
      image.print(font2, 413 * 4, 302 * 4, "Average");
    } else {
      image.print(font2, 1700, 302 * 4, "Fail");
    }

    if (marks2 > 80) {
      image.print(font2, 1640, 332 * 4, "Excellent");
    } else if (marks2 > 60) {
      image.print(font2, 1620, 332 * 4, "Very Good");
    } else if (marks2 > 30) {
      image.print(font2, 413 * 4, 332 * 4, "Average");
    } else {
      image.print(font2, 1700, 332 * 4, "Fail");
    }

    if (marks3 > 80) {
      image.print(font2, 1640, 363 * 4, "Excellent");
    } else if (marks3 > 60) {
      image.print(font2, 1620, 363 * 4, "Very Good");
    } else if (marks3 > 30) {
      image.print(font2, 413 * 4, 363 * 4, "Average");
    } else {
      image.print(font2, 1700, 363 * 4, "Fail");
    }
    const ch =
      parseInt(marks0) + parseInt(marks1) + parseInt(marks2) + parseInt(marks3);
    if (ch < 120) {
      image.print(font2, 473 * 4, 435 * 4, "Fail");
    } else {
      image.print(font2, 473 * 4, 435 * 4, "Pass");
    }
    sign_.resize(80 * 4, 50 * 4);
    photo_.resize(80 * 4, 80 * 4);
    qr_.resize(65 * 4, 65 * 4);
    image.blit(photo_, 418 * 4, 130 * 4);
    image.blit(sign_, 413 * 4, 520 * 4);
    image.blit(qr_, 83 * 4, 506 * 4);

    await image.writeAsync("./export/certificate.png");
    const hashID = await pinFileToIPFS();
    updateMongo(hashID, p);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/previewCertificate", async (req, res) => {
  try {
    const p = Math.floor(1000 + Math.random() * 9000);
    const { name, dob, marks0, marks1, marks2, marks3, photo, sign } = req.body;

    const qr = await GenerateQr(
      "localhost:3001/verify?certid=" + p + "&dob=" + dob
    );

    const image = await Jimp.read("./Marksheet.png");
    const qr_ = await Jimp.read(
      Buffer.from(
        qr.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );
    const photo_ = await Jimp.read(
      Buffer.from(
        photo.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );
    const sign_ = await Jimp.read(
      Buffer.from(
        sign.replace(/^data:image\/(jpeg|png|jpg);base64,/, ""),
        "base64"
      )
    );

    const font1 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    image.print(font1, 420, 636, name);
    image.print(font1, 532, 740, dob);
    image.print(
      font1,
      110 * 4,
      1752,
      new Date(Date.now()).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      })
    );
    image.print(font1, 1890, 310, p);
    image.print(font2, 233 * 4, 271 * 4, marks0);
    image.print(font2, 233 * 4, 302 * 4, marks1);
    image.print(font2, 233 * 4, 332 * 4, marks2);
    image.print(font2, 233 * 4, 362 * 4, marks3);

    if (marks0 > 80) {
      image.print(font2, 1640, 271 * 4, "Excellent");
    } else if (marks0 > 60) {
      image.print(font2, 1620, 271 * 4, "Very Good");
    } else if (marks0 > 30) {
      image.print(font2, 413 * 4, 271 * 4, "Average");
    } else {
      image.print(font2, 1700, 271 * 4, "Fail");
    }

    if (marks1 > 80) {
      image.print(font2, 1640, 302 * 4, "Excellent");
    } else if (marks1 > 60) {
      image.print(font2, 1620, 302 * 4, "Very Good");
    } else if (marks1 > 30) {
      image.print(font2, 413 * 4, 302 * 4, "Average");
    } else {
      image.print(font2, 1700, 302 * 4, "Fail");
    }

    if (marks2 > 80) {
      image.print(font2, 1640, 332 * 4, "Excellent");
    } else if (marks2 > 60) {
      image.print(font2, 1620, 332 * 4, "Very Good");
    } else if (marks2 > 30) {
      image.print(font2, 413 * 4, 332 * 4, "Average");
    } else {
      image.print(font2, 1700, 332 * 4, "Fail");
    }

    if (marks3 > 80) {
      image.print(font2, 1640, 363 * 4, "Excellent");
    } else if (marks3 > 60) {
      image.print(font2, 1620, 363 * 4, "Very Good");
    } else if (marks3 > 30) {
      image.print(font2, 413 * 4, 363 * 4, "Average");
    } else {
      image.print(font2, 1700, 363 * 4, "Fail");
    }
    const ch =
      parseInt(marks0) + parseInt(marks1) + parseInt(marks2) + parseInt(marks3);
    if (ch < 120) {
      image.print(font2, 473 * 4, 435 * 4, "Fail");
    } else {
      image.print(font2, 473 * 4, 435 * 4, "Pass");
    }
    sign_.resize(80 * 4, 50 * 4);
    photo_.resize(80 * 4, 80 * 4);
    qr_.resize(65 * 4, 65 * 4);
    image.blit(photo_, 418 * 4, 130 * 4);
    image.blit(sign_, 413 * 4, 520 * 4);
    image.blit(qr_, 83 * 4, 506 * 4);
    const certificateBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.json({
      success: true,
      certificate: certificateBuffer.toString("base64"),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const pinFileToIPFS = async () => {
  console.log(1);
  const formData = new FormData();
  const src = "./export/certificate.png";

  const fileData = fs.readFileSync(src);
  formData.append("file", fileData, { filename: "certificate.png" });

  try {
    const resFile = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          pinata_api_key: "fe378d733a4e9c401423",
          pinata_secret_api_key:
            "f94cae7dafde7635888c8f4d66c38657f7c359bc984da59cf5c39543dd732290",
          ...formData.getHeaders(),
        },
      }
    );

    const imgHash = await resFile.data.IpfsHash;
    // console.log(imgHash);
    console.log("https://gateway.pinata.cloud/ipfs/" + imgHash);
    return imgHash;
  } catch (error) {
    console.error(
      "Error pinning file to IPFS:",
      error.response ? error.response.data : error.message
    );
  }
};

app.listen(port, () => {
  console.log("Server is running at http://localhost:${port}");
});
