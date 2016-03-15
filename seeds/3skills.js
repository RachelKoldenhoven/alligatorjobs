
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('skills').del(),

    // Inserts seed entries
    knex('skills').insert({
        name: 'Accounting'
    }),
    knex('skills').insert({
        name: 'Automotive'
    }),
    knex('skills').insert({
        name: 'Banking'
    }),
    knex('skills').insert({
        name: 'Business Development'
    }),
    knex('skills').insert({
        name: 'Child Care'
    }),
    knex('skills').insert({
        name: 'Construction'
    }),
    knex('skills').insert({
        name: 'Customer Service'
    }),
    knex('skills').insert({
        name: 'Design'
    }),
    knex('skills').insert({
        name: 'Distribution Shipping'
    }),
    knex('skills').insert({
        name: 'Education Teaching'
    }),
    knex('skills').insert({
        name: 'Engineering'
    }),
    knex('skills').insert({
        name: 'Facilities'
    }),
    knex('skills').insert({
        name: 'Finance'
    }),
    knex('skills').insert({
        name: 'General Business'
    }),
    knex('skills').insert({
        name: 'General Labor'
    }),
    knex('skills').insert({
        name: 'Government'
    }),
    knex('skills').insert({
        name: 'Grocery'
    }),
    knex('skills').insert({
        name: 'Health Care'
    }),
    knex('skills').insert({
        name: 'Hospitality'
    }),
    knex('skills').insert({
        name: 'Human Resources'
    }),
    knex('skills').insert({
        name: 'Information Technology'
    }),
    knex('skills').insert({
        name: 'Insurance'
    }),
    knex('skills').insert({
        name: 'Journalism'
    }),
    knex('skills').insert({
        name: 'Legal'
    }),
    knex('skills').insert({
        name: 'Maintenance/Repair'
    }),
    knex('skills').insert({
        name: 'Management'
    }),
    knex('skills').insert({
        name: 'Manufacturing'
    }),
    knex('skills').insert({
        name: 'Telecommunications'
    }),
    knex('skills').insert({
        name: 'Social Services'
    }),
    knex('skills').insert({
        name: 'Pharmaceutical'
    }),
    knex('skills').insert({
        name: 'QA Quality Control'
    }),
    knex('skills').insert({
        name: 'Real Estate'
    }),
    knex('skills').insert({
        name: 'Research'
    }),
    knex('skills').insert({
        name: 'Food Service'
    }),
    knex('skills').insert({
        name: 'Retail'
    }),
    knex('skills').insert({
        name: 'Skilled Labor Trades'
    }),
    knex('skills').insert({
        name: 'Strategy Planning'
    }),
    knex('skills').insert({
        name: 'Transportation'
    }),
    knex('skills').insert({
        name: 'Warehouse'
    })
  );
};
