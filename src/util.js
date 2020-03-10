const axios = require('axios');

const gurList = require('./selectOptions.js').gurs.map((i) => i.code);

async function fetchClasses(queryString) {
  const res = await axios.get(
    `https://classfinder.demenses.net/searchClasses?${queryString}`,
  );
  const data = res.data.map((i) => {
    // eslint-disable-next-line no-param-reassign
    i.GUR = i.Attributes.filter((a) => gurList.indexOf(a) !== -1);
    if (i.GUR.length > 0) {
      // eslint-disable-next-line no-param-reassign,prefer-destructuring
      i.Attributes = i.Attributes.filter((a) => a !== i.GUR[0]);
    }
    let color = 'green';
    if (i.Available <= 0) {
      color = 'red';
    }
    // eslint-disable-next-line no-param-reassign
    i.CourseCount = `${i.Capacity}/${i.Enrolled}/<span style="color:${color}">${i.Available}</span>`;
    return i;
  });
  return data;
}

module.exports = { fetchClasses };
