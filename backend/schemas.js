const sequelize = require('./postgres');
const { DataTypes } = require('sequelize');
const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  crn: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  prerequisites: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  prerequisite_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restrictions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  extras: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time_locations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  attributes: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  gurs: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  credits: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  enrolled: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  available: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fetched_at: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  remote: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  synchronous: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  tableName: 'classes',
  timestamps: false
});
const Description = sequelize.define('Description', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
        unique: true,
primaryKey: true,
  },
  term: {
    type: DataTypes.STRING,
  },
  term_code: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'descriptions',
  timestamps: false
});
const StemmedDescription = sequelize.define('StemmedDescription', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  term: {
    type: DataTypes.STRING,
  },
  term_code: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  wasstemmed: {
    type: DataTypes.NUMBER,
  },
  tsdoc: {
    type: DataTypes.TSVECTOR,
  }
}, {
  tableName: 'stemmed_descriptions',
  timestamps: false
});
Class.hasOne(Description, {sourceKey: 'name', foreignKey: 'name'});
Class.hasOne(StemmedDescription, {sourceKey: 'name', foreignKey: 'name'});
StemmedDescription.belongsTo(Class, {targetKey: 'name', foreignKey: 'name'})
module.exports = {
  Class,Description,StemmedDescription
};