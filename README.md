# Last.fm Collage Generator (command line)

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0 or higher

# Getting started
- Clone the repository
```
git clone  https://github.com/awhite/lastcollage-cli.git
```
- Install dependencies
```
cd lastcollage-cli
npm install
```
- Edit `config.js` to configure the collage generated and save path
```javascript
module.exports = {
  params: {
    username: 'your_lastfm_username',
    period: 'forever',    // Accepted values: 'forever', '1week', '1month', '3month', '6month', '1year'
    rowNum: '3',          // Supports values in the range of [1, 20]
    colNum: '3',          // Same as above
    type: 'albums',       // Experimental support for 'artists' and 'tracks' as well
    showName: 'false',    // 'true' or 'false'
    hideMissing: 'false'  // 'true' or 'false'
  },
  savePath: '/path/to/your/save/location', // access your home directory through process.env.HOME
}

```
- Run the script
```
npm start
```
  The file will be saved in the location you specified.
