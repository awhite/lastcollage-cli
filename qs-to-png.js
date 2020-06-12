const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Headers } = fetch;

const { savePath, params } = require('./config')

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

let raw = JSON.stringify(params);

let requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch('https://lastcollage.io/api/collage', requestOptions)
  .then(response => response.json())
  .then(({ downloadPath }) => {
    requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch(`https://lastcollage.io/${downloadPath}`, requestOptions);
  })
  .then(response => new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(path.resolve(savePath));
    response.body.pipe(fileStream)
    response.body.on('error', reject);
    response.body.on('finish', resolve);
  }))
  .then(console.log('success'))
  .catch(error => console.log('error', error));
