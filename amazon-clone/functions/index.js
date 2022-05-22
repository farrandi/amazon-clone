const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51L1jXTDN9JGNccULpFlZcrZQdU1s1x7xlmblQPIBM7st7pof1ysxvxa1MniFfChCsIs7edPUDdNs62vdmH3SFfOQ00HWwGr45N"
);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Set up API

// App Config
const app = express();

// Middleware - using cors
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request received, amt :", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "cad",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

// emulator endpoint: http://localhost:5001/clone-17c13/us-central1/api
