const Class = {
  CRN: Number,
  Prerequisites: Array,
  PrerequisiteText: String,
  Restrictions: Array,
  Extras: String,
  Instructor: String,
  Title: String,
  Name: String,
  TimeLocations: Array,
  Attributes: Array,
  Credits: String,
  Cost: String,
  Attribute: String,
  StartDate: String,
  EndDate: String,
  Capacity: Number,
  Enrolled: Number,
  Available: Number,
  Term: String,
  Gurs: Array,
  CourseNumber: String,
  Subject: String,
  Description: String,
  FetchedAt: Date,
  Remote: Number,
  Synchronous: Number
};

const Description = {
  Name: String,
  Description: String,
};

module.exports = {
  Class,Description,
};
