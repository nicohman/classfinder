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
        if (!queryObject.Gurs) {
          queryObject.Gurs = { $all: [] };
        }
        queryObject.Gurs.$all.push(req.query.gur);
        return;
      case 'other':
        if (!queryObject.Attributes) {
          queryObject.Attributes = { $all: [] };
        }
        if (req.query.other.includes(" ")) {
          queryObject.Attributes.$all = queryObject.Attributes.$all.concat(req.query.other.split(" "));
        } else {
          queryObject.Attributes.$all.push(req.query.other);
        }
        return;
      case 'start_date':
        parsed = 'StartDate';
        break;
      case 'end_date':
        parsed = 'EndDate';
        break;
      case 'coursenumber':
        parsed = 'CourseNumber';
        break;
      case 'onlyOpen':
        if (req.query.onlyOpen == 'true') {
          queryObject.Available = {
            $gt: 0
          };
        }
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
      case 'names':
        queryObject['Name'] = { $in: req.query.names.split(',')}
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
      case 'remote':
      case 'synchronous':
      case 'available':
        parsed = queryParam.charAt(0).toUpperCase() + queryParam.slice(1);
        break;
      default:
        break;
    }
    if (parsed) {
      if (parsed === 'CRN' || parsed === 'Capacity' || parsed === 'Enrolled' || parsed === 'Available' || parsed === 'Remote' || parsed === 'Synchronous') {
        try {
          queryObject[parsed] = parseInt(req.query[queryParam]);
        } catch (e) {
          console.log(e);
        }
      } else {
        queryObject[parsed] = req.query[queryParam];
      }
    }
  });
  res.set('Cache-Control', 'no-cache');
  console.log(queryObject);
  let aggregation_pipeline = [{$match: queryObject}, {$lookup: {
    from: 'descriptions',
    localField: 'Name',
    foreignField: 'Name',
    as: 'Description'
  }}, {
    $addFields: {
      Description: {
        $first: "$Description.Description"
      }
    }
  }];
  let query = Class.aggregate(aggregation_pipeline);
  if (queryObject['TimeLocations.days']) {
    //query = query.sort({ score: { $meta: 'textScore' } });
  }
  query.then((classes) => {
    res.send(classes);
  }).catch((err) => {
    throw err;
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
