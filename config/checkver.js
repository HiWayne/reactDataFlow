const semver = require("semver");
const chalk = require("chalk");
const { engines } = require("../package");
const version = engines.node;
if (!semver.satisfies(process.version, version)) {
  console.error(
    chalk.bgRed(
      `required node version ${version}, but got: ${process.version}.`
    )
  );
  process.exit(1);
}
