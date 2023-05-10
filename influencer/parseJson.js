const fs = require('fs')

function parseJson() {
  const data = fs.readFileSync('locales/en.json')
  const words = JSON.parse(data)
  const wordsRu = Object.keys(words).map(item => {
    return item
  })
  let end_line = ''
  wordsRu.forEach(item => {
    end_line += item + '; '
  })
  fs.writeFileSync('textRu.txt', end_line, 'utf-8')
}


function parseTxt() {
  const data = fs.readFileSync('text', 'utf8')
  const words = data.split('; ')
  const dataJson = fs.readFileSync('locales/en.json')
  const wordsJson = JSON.parse(dataJson)
  const res = {}
  Object.keys(wordsJson).forEach((key, index) => {

    res[key] = words[index]
  })
  fs.writeFileSync('locales/en_trans.json', JSON.stringify(res));
}

parseTxt()
