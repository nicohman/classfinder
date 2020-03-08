const mongoose = require('mongoose');
const schemas = require('./schemas');

const Class = mongoose.model('Class', schemas.Class);
const getClass = (req, res) => {
  const queryObject = {};
  const optsObject = {};
  Object.keys(req.query).forEach((queryParam) => {
    let parsed = '';
    if (!req.query[queryParam]) {
      return;
    }
    switch (queryParam) {
      case 'crn':
        parsed = 'CRN';
        break;
      case 'gur':
        parsed = 'GUR';
        break;
      case 'start_date':
        parsed = 'StartDate';
        break;
      case 'end_date':
        parsed = 'EndDate';
        break;
      case 'coursenumber':
        parsed = 'CourseNumber';
        break;
      case 'courseTitle':
        if (req.query.courseTitle.length === 0) {
          return;
        }
        queryObject.$text = { $search: req.query.courseTitle };
        optsObject.score = { $meta: 'textScore' };
        return;
      case 'days':
        queryObject['TimeLocations.days'] = { $all: req.query.days.split(',') };
        return;
      case 'name':
      case 'subject':
      case 'instructor':
      case 'location':
      case 'time':
      case 'credits':
      case 'term':
      case 'cost':
      case 'description':
      case 'capacity':
      case 'enrolled':
      case 'available':
        parsed = queryParam.charAt(0).toUpperCase() + queryParam.slice(1);
        break;
      default:
        break;
    }
    if (parsed) {
      queryObject[parsed] = req.query[queryParam];
    }
  });
  console.log(queryObject);
  let query = Class.find(queryObject, optsObject);
  if (queryObject['TimeLocations.days']) {
    query = query.sort({ score: { $meta: 'textScore' } });
  }
  query.exec((err, classes) => {
    if (err) {
      throw err;
    } else {
      res.send(classes);
    }
  });
  Class.find(queryObject, (err, classes) => {
    if (err) {
      throw err;
    } else {
      res.send(classes);
    }
  });
};

const getInstructors = (req, res) => {
  Class.distinct('Instructor', (err, instructors) => {
    if (err) {
      throw err;
    } else {
      res.send(instructors);
    }
  });
};

module.exports = {
  getClass, getInstructors,
};
