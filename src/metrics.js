const client = require("prom-client");

client.collectDefaultMetrics({
  prefix: "goprimo_cicd_demo_"
});

const httpRequestDuration = new client.Histogram({
  name: "goprimo_cicd_demo_http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5]
});

module.exports = {
  client,
  httpRequestDuration
};
