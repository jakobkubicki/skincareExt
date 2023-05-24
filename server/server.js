const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const cors = require('cors');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});