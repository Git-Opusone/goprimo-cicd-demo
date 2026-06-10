const app = require("./app");
const logger = require("./logger");

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  logger.info(`GoPrimo CI/CD Demo app listening on port ${port}`);
});
