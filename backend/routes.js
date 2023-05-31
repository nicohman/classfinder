const { Op, fn } = require('sequelize');
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
      queryObject.gurs = {
        [Op.contains]: req.query.gur,
      };
      return;
    case 'other':
      const attr = [];
      if (req.query.other.includes(" ")) {
        attr = attr.concat(req.query.other.split(" "));
      } else {
        attr.push(req.query.other);
      }
      queryObject.attributes = {
        [Op.contains]: attr,
      };
      return;
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
      queryObject.title = { [Op.match]: req.query.courseTitle };
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
    where: queryObject,
    include: [Description,StemmedDescription],
  });
  query.then((classes) => {
    res.send(classes);
  }).catch((err) => {
    throw err;
  });
};

const getInstructors = (req, res) => {
  Class.aggregate('instructor', 'DISTINCT',{ plain: false }).then((instructors) => {
    res.send(instructors.map((x) => {
      return x.DISTINCT;
    }));
  });
};

async function startUp() {
  const lancasterStemmer = await import('lancaster-stemmer');
  const stemDescriptions = () => {
    StemmedDescription.findAll({where: {wasstemmed: null}}).then((descs) => {
      console.log(`Stemming janitor found ${descs.length} unstemmed descriptions`);
      Promise.all(descs.map((desc) => {
        const newDesc = (desc.description + desc.name).split(' ').map((x) => {
          return lancasterStemmer.lancasterStemmer(x);
        }).join(" ");
        return StemmedDescription.update({
          description: newDesc,
          wasstemmed: 1,
          tsdoc:  fn('to_tsvector', newDesc),
        }, {
          where: {
            name: desc.name
          }
        });
      })).then(() => {
        console.log("janitor program done!");
      });
    });
  }
  setInterval(stemDescriptions, 20000);
}
const keywordSearch = (req, res) => {
  const keywords = req.query.keywords;
  StemmedDescription.findAll({
    where: {
      tsdoc: {
        [Op.match]: fn('to_tsquery', req.query.keywords.join(" | ")),
      },
      term: 'Fall 2023',
    },
    limit: 10,
  }).then((descs) => {
    Class.findAll({where: {name: {[Op.in]: descs.map((x) => {  return x.name; })}, term: 'Fall 2023'}, include: [Description]}).then((classes) => {
      res.send(classes);  
    });
  });
};

startUp();

module.exports = {
  getClass, getInstructors, keywordSearch
};
