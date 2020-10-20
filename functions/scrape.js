const Crawler = require('crawler')

const scrape = () => {
  let crawler = new Crawler()
  return new Promise((resolve, reject) => {
    crawler.direct({
      uri: 'https://www.leboncoin.fr/recherche/?text=table',
      callback: function (error, response) {
        if (error) {
          console.log(error)
        } else {
          let $ = response.$
          resolve($)
        }
      },
    })
  })
}

exports.handler = async (event) => {
  let $;

  $ = await scrape().then(res => res)

  return {
    statusCode: 200,
    body: `${$('body')}`,
  }
}
