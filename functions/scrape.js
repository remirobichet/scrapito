const Crawler = require('crawler')

const HTTP_HEADERS = {
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
}

const scrape = (url, element) => {
  let crawler = new Crawler()
  return new Promise((resolve, reject) => {
    var c = new Crawler({
      maxConnections: 10,
      // This will be called for each crawled page
      callback: function (error, res, done) {
        if (error) {
          console.log(error)
        } else {
          var $ = res.$
          // $ is Cheerio by default
          //a lean implementation of core jQuery designed specifically for the server
          resolve($(element))
        }
        done()
      },
    })

    // Queue just one URL, with default callback
    c.queue(url)
  })
}

exports.handler = async (event) => {
  let $

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const data = JSON.parse(event.body)
  const url = data.url;
  const element = data.element;

  $ = await scrape(url, element).then((res) => res)

  return {
    statusCode: 200,
    headers: HTTP_HEADERS,
    body: `${$}`,
  }
}
