const path = require("path");

module.exports = {
    entry: "./dist/src/ts/app.js",
    output: {
        path: path.resolve(__dirname, "dist/src/ts"),
        filename: "bundle.js",
    },
    mode: "production",
};
