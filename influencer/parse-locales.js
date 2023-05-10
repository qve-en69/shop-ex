const fs = require('fs');
const path_module = require('path');
let argv = require('minimist')(process.argv.slice(2));

let path = argv.p;
let report = argv.r;

const LOCALES_CONFIG = initLocalesConfig(path, report, argv.m, argv.l);
const REPORT_PATH = getLocalePath(path, report);
const REPORT_FILE = openFileByPath(REPORT_PATH);

parseReport(REPORT_FILE, LOCALES_CONFIG);

unlink(REPORT_PATH);
LOCALES_CONFIG.forEach((locale) => {
  write(locale.path, locale.file);
});

function getLocalePath(mainPath, lang) {
  return path_module.join(__dirname, mainPath, `${lang}.json`);
}

function openFileByPath(path) {
  return require(path);
}

function initLocalesConfig(path, report, mainLang = null, langs) {
  return langs.map((lang) => {
    let filePath = getLocalePath(path, lang);
    return {
      path: filePath,
      file: openFileByPath(filePath),
      isMainLang: lang === mainLang,
    };
  });
}

function write(path, file) {
  fs.writeFile(path, JSON.stringify(file, null, 4), (err) => {
    if (err) console.error(file, err);
  });
}

function unlink(path) {
  fs.unlink(path, (err) => {
    if (err) console.error(err);
  });
}

function parseReport(report, config) {
  report.missingKeys.forEach((word) => {
    config.forEach((locale) => {
      if (!(word.path in locale.file)) {
        locale.file[word.path] = locale.isMainLang ? word.path : '';
      }
    });
  });
}
