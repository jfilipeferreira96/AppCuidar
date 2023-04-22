module.exports = (app) => {
  app.use("/", require("../routes/home.routes"));
  app.use("/auth", require("../routes/auth.routes"));
};
