module.exports = (app) => {
  app.use("/", require("../routes/home.routes"));
  app.use("/auth", require("../routes/auth.routes"));
  app.use("/patients", require("../routes/patient.routes"));
  app.use("/users", require("../routes/user.routes"));
};
