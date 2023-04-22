const port = process.env.PORT || 8080;
const host = "127.0.0.1";
const express = require("express");
const app = express();

const os = require("os");
const networkInterfaces = os.networkInterfaces();

app.use("/assets", express.static("assets"));
app.use("/views", express.static("views"));

require("./init/db.js")(app, () => {
  require("./init/middleware")(app);
  require("./init/router")(app);
  app.listen(port, host, (error) => {
    if (error) throw error;
    console.log("Your app is listening on " + port);
    console.log(`If you are in localhost, use the following ip for the react-native ${networkInterfaces["Ethernet"][3]?.address}:${port}`);
  });
});
