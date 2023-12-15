// const mongoose = require('mongoose');
// const DB = 'mongodb+srv://CertVerify:5KKicuWY6yT0tcl9@cluster0.vrxnqdk.mongodb.net/CertVerify?retryWrites=true&w=majority'

// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true   
//   });

// const UserSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
// });
// const User = mongoose.model('users', UserSchema);
// User.createIndexes();
 
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

//         const pinataURL = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//         return res.json({ success: true, pinataURL });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/upload', async (req, res) => {
    try {
        const { apiKey, apiSecret, jsonData } = req.body;

        if (!apiKey || !apiSecret || !jsonData) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const pinataUrl = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

        // Set headers with API key and secret
        const headers = {
            'Content-Type': 'application/json',
            'pinata_api_key': apiKey,
            'pinata_secret_api_key': apiSecret,
        };

        const jsonString = JSON.stringify(jsonData);

        const payload = {
            pinataContent: jsonString,
        };

        const response = await axios.post(pinataUrl, payload, { headers });

        const pinataUrlPrefix = 'https://gateway.pinata.cloud/ipfs/';
        const pinataIpfsHash = response.data.IpfsHash;
        const pinataJsonUrl = pinataUrlPrefix + pinataIpfsHash;

        res.json({ pinataUrl: pinataJsonUrl });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
