const express = require("express");
const pinoHttp = require("pino-http");
const logger = require("./logger");
const { client, httpRequestDuration } = require("./metrics");

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;

    const route = req.route && req.route.path ? req.route.path : req.path;

    httpRequestDuration
      .labels(req.method, route, String(res.statusCode))
      .observe(duration);
  });

  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    app: "GoPrimo CI/CD Demo",
    status: "running",
    environment: process.env.APP_ENV || "local",
    version: process.env.APP_VERSION || "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/api/orders", (req, res) => {
  req.log.info("Sample orders API called");

  res.status(200).json({
    orders: [
      {
        id: 1001,
        client: "GoPrimo",
        service: "Title Search",
        status: "Completed"
      },
      {
        id: 1002,
        client: "GoPrimo",
        service: "Tax Search",
        status: "In Progress"
      }
    ]
  });
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = app;
