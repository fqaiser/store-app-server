const admin = require("firebase-admin");
const serviceKey = require("./firebaseConfig");

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceKey)
});

const db = app.firestore();

module.exports = { admin, db };
