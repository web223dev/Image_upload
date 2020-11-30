// This works around the Identity server not yet supporting CORS

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/rs", {
            target: "http://18.188.2.106:8090",
            logLevel: "debug",
        })
    );
};
