const { generateApi } = require("swagger-typescript-api");
const path = require("path");
require("dotenv").config();

try {
  /* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
  generateApi({
    name: "Api.ts",
    output: path.resolve(process.cwd(), "./src/helpers/api/__generated__"),
    url: process.env.SWAGGER_URL,
    httpClientType: "fetch",
  });
} catch (e) {
  console.error(e);
}
