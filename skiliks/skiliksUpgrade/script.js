var { extractFromFiles } = require("i18n-extract");
const keys = extractFromFiles(["./src/i18n/fr.json"], {
  marker: "i18n",
});

console.log(keys);
