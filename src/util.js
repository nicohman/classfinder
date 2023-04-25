const axios = require('axios');

const gurList = require('./selectOptions').gurs.map((i) => i.code);
const config = require('../config.json');

async function fetchClasses(queryString) {
  const res = await axios.get(
    `https://classfinder.nicohman.com/searchClasses?${queryString}`,
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
    i.CourseCount = `${i.Capacity} / ${i.Enrolled} / <span style="color:${color}">${i.Available}</span>`;
    return i;
  });
  return data;
}

async function fetchClassesNLP(queryString) {
  const res = await axios.get(
    `https://classfinder.nicohman.com/keywordSearch?keywords=${queryString}`,
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
    i.CourseCount = `${i.Capacity} / ${i.Enrolled} / <span style="color:${color}">${i.Available}</span>`;
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
  return item.TimeLocations.filter((d) => d).map((d) => d.days.map((i) => {
    const startDate = new Date();
    startDate.setDate(item.StartDate.split('/')[1]);
    startDate.setMonth(item.StartDate.split('/')[0] - 1);
    startDate.setDate(startDate.getDate() + (dayLetterToNum(i) - startDate.getDay()));
    const endDate = new Date(startDate.toString());
    let startHours = parseInt(d.startTime.split(':')[0], 10);
    let endHours = parseInt(d.endTime.split(':')[0], 10);
    if (startHours < config.calendarStartHour) {
      startHours += 12;
      endHours += 12;
    } else if (endHours < startHours) {
      endHours += 12;
    }
    startDate.setHours(startHours);
    startDate.setMinutes(d.startTime.split(':')[1]);
    endDate.setHours(endHours);
    endDate.setMinutes(d.endTime.split(':')[1]);
    return {
      CRN: item.CRN,
      description: item.Description,
      name: item.Name,
      title: item.Title,
      start: convertToCalenderFormat(startDate),
      end: convertToCalenderFormat(endDate),
      startDate,
      endDate,
    };
  }))
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
