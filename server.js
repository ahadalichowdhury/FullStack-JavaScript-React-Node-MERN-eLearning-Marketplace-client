const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV === "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    // apply proxy in dev mode
    if (!dev) {
      server.use(
        "/api/v1",
        createProxyMiddleware({
          target: "https://lms-f38z.onrender.com",
          changeOrigin: true,
        })
      );
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(10000, (err) => {
      if (err) throw err;
      console.log("> Ready on ");
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
