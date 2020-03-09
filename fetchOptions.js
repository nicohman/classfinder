const axios = require('axios');
const fs = require('fs');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
axios.get('https://classfinder.demenses.net/getInstructors').then((res) => {
  const toWrite = { instructors: res.data };
  fs.writeFileSync('./src/fetched.json', JSON.stringify(toWrite));
});
