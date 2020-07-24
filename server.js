const express = require("express");
const cors = require('cors');
const axios = require("axios");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express();
const secret_key = "";
app.use(cookieParser());
const corsOptions = { origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;
app.post('/login', async (req, res) => {
    console.log("user-agent: ", req.headers['user-agent'])
    const { token } = req.body;
    try {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
        const captchaResponse = await axios.post(url, req.headers['user-agent'])
        const tokenRes = captchaResponse.data;
        if (tokenRes.success && tokenRes.action === "submit") {
            // Username and Password Authentication
            console.log('captcha score: ', tokenRes.score)
            res.send("Login Success");
        } else {
            console.log('captcha verify failed: ', tokenRes);
            res.send("MFA Required");
        }
    } catch (error) {
        res.send(error)
    }
});

app.listen(PORT, (req, res) => console.log('Server is Running at 3001'));