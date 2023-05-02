const { Op } = require('sequelize');
const { Class, Description, StemmedDescription } = require('./schemas');

const getClass = (req, res) => {
  const queryObject = {};
  const optsObject = {};
  Object.keys(req.query).forEach((queryParam) => {
    let parsed = '';
    if (!req.query[queryParam]) {
      return;
    }
    switch (queryParam) {
      case 'gur':
       /* if (!queryObject.Gurs) {
          queryObject.Gurs = { $all: [] };
        }
        queryObject.Gurs.$all.push(req.query.gur);
        return;*/
      case 'other':
        /*if (!queryObject.Attributes) {
          queryObject.Attributes = { $all: [] };
        }
        if (req.query.other.includes(" ")) {
          queryObject.Attributes.$all = queryObject.Attributes.$all.concat(req.query.other.split(" "));
        } else {
          queryObject.Attributes.$all.push(req.query.other);
        }*/
        return;
      case 'coursenumber':
        parsed = 'course_number';
        break;
      case 'onlyOpen':
        if (req.query.onlyOpen == 'true') {
          queryObject.available = {
            [Op.gt]: 0
          };
        }
        break;
      case 'courseTitle':
        if (req.query.courseTitle.length === 0) {
          return;
        }
        queryObject.course_title = { [Op.match]: req.query.courseTitle };
        return;
      case 'days':
       // queryObject['TimeLocations.days'] = { $all: req.query.days.split(',') };
        return;
      case 'names':
        queryObject['name'] = { [Op.in]: req.query.names.split(',')}
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
        parsed = queryParam;
        break;
      default:
        break;
    }
    if (parsed) {
      if (parsed === 'crn' || parsed === 'capacity' || parsed === 'enrolled' || parsed === 'available' || parsed === 'remote' || parsed === 'synchronous') {
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

  const query = Class.findAll({
    where: queryObject
  });
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

const keywordSearch = (req, res) => {
  const keywords = req.query.keywords;
  StemmedDescription.find({ $text:{ $search: req.query.keywords }},null,  {limit: 5}, (err, descs)  => {
    const dMap = {};
      if (err) {
        throw err;
      } else {
        Class.find({Name: {$in: descs.map((x) => { dMap[x.Name] = x; return x.Name; })}}, (err, classes) => {
          res.send(classes.map((c, i) => {
            c.Description = dMap[c.Name].Description;
            return c;
          }));  
        });
      
      }
  });
};

module.exports = {
  getClass, getInstructors, keywordSearch
};
