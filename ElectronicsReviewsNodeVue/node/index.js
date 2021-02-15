const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const history = require("connect-history-api-fallback");

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const router = require("./routes/router.js");
app.use("/api", router);

const staticMiddleware = express.static(path.join(__dirname, "dist"));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
