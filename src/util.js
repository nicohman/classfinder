const axios = require('axios');

const config = require('../config.json');

async function fetchClasses(queryString) {
  console.log('fetch');
  const res = await axios.get(
    `https://classfinder.nicohman.com/searchClasses?${queryString}`,
  );
  const data = res.data.map((i) => {
    // eslint-disable-next-line no-param-reassign
    // i.gurs = i.attributes.filter((a) => gurList.indexOf(a) !== -1);
    if (i.gurs.length > 0) {
      // eslint-disable-next-line no-param-reassign,prefer-destructuring
      i.attributes = i.attributes.filter((a) => a !== i.gurs[0]);
    }
    let color = 'green';
    if (i.available <= 0) {
      color = 'red';
    }
    // eslint-disable-next-line no-param-reassign
    i.course_count = `${i.capacity} / ${i.enrolled} / <span style="color:${color}">${i.available}</span>`;
    return i;
  });
  return data;
}

async function fetchClassesNLP(queryString) {
  console.log('fetchnlp');
  const res = await axios.get(
    `https://classfinder.nicohman.com/keywordSearch?keywords=${queryString}`,
  );
  const data = res.data.filter((i) => i).map((i) => {
    // eslint-disable-next-line no-param-reassign
    console.log(i);
    // i.gurs = i.attributes.filter((a) => gurList.indexOf(a) !== -1);
    if (i.gurs.length > 0) {
      // eslint-disable-next-line no-param-reassign,prefer-destructuring
      i.attributes = i.attributes.filter((a) => a !== i.gurs[0]);
    }
    let color = 'green';
    if (i.available <= 0) {
      color = 'red';
    }
    // eslint-disable-next-line no-param-reassign
    i.course_count = `${i.capacity} / ${i.enrolled} / <span style="color:${color}">${i.available}</span>`;
    return i;
  });
  return data;
}

function convertToCalenderFormat(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.toTimeString().substr(0, 5)}`;
}
function dayLetterToNum(letter) {
  switch (letter) {
    case 'M':
      return 1;
    case 'T':
      return 2;
    case 'W':
      return 3;
    case 'R':
      return 4;
    case 'F':
      return 5;
    default:
      return 0;
  }
}
function dayNumToWord(num) {
  switch (num) {
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    default:
      return '';
  }
}
function parseScratchDates(item) {
  return item.time_locations.filter((d) => d).map((d) => {
    d = JSON.parse(d);
    return d.days.map((i) => {
    const startDate = new Date();
    startDate.setDate(item.start_date.split('/')[1]);
    startDate.setMonth(item.start_date.split('/')[0] - 1);
    startDate.setDate(startDate.getDate() + (dayLetterToNum(i) - startDate.getDay()));
    const endDate = new Date(startDate.toString());
    let startHours = parseInt(d.start_time.split(':')[0], 10);
    let endHours = parseInt(d.end_time.split(':')[0], 10);
    if (startHours < config.calendarStartHour) {
      startHours += 12;
      endHours += 12;
    } else if (endHours < startHours) {
      endHours += 12;
    }
    startDate.setHours(startHours);
    startDate.setMinutes(d.start_time.split(':')[1]);
    endDate.setHours(endHours);
    endDate.setMinutes(d.end_time.split(':')[1]);
    return {
      CRN: item.crn,
      description: item.description,
      name: item.name,
      title: item.title,
      start: convertToCalenderFormat(startDate),
      end: convertToCalenderFormat(endDate),
      startDate,
      endDate,
    };
  });
  })
    .flat()
    .flat()
    .flat();
}

function checkIndividualOverlap(item, item2) {
  if (item && item2) {
    return item.some((scratchDate) => item2.some((i) => {
      if (scratchDate.startDate.getTime() <= i.endDate.getTime()
        && scratchDate.endDate.getTime() >= i.startDate.getTime()) {
        return true;
      }
      return false;
    }));
  }
  return false;
}

module.exports = {
  fetchClasses, fetchClassesNLP, parseScratchDates, convertToCalenderFormat, dayLetterToNum, dayNumToWord, checkIndividualOverlap,
};
