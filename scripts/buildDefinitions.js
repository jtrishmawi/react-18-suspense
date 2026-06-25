const { generateApi } = require("swagger-typescript-api");
const path = require("path");

try {
  /* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
  generateApi({
    name: "Api.ts",
    output: path.resolve(process.cwd(), "./src/helpers/api/__generated__"),
    input: path.resolve(__dirname, "./oas.json"),
  });
} catch (e) {
  console.error(e);
}
