const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { Headers } = fetch;

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

// change this to where you want the image to save
const savePath = `${process.env.HOME}/Desktop/collage.png`;

// change data here
let raw = JSON.stringify({
  username: 'aaapwww',
  period: 'forever',
  rowNum: '3',
  colNum: '3',
  type: 'albums',
  showName: 'false',
  hideMissing: 'false'
});

// request options for the first request
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
  .then(console.log('finished'))
  .catch(error => console.log('error', error));
