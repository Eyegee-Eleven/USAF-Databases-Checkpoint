//import emails from '../emails.json';
const fs = require("fs");
const emails = JSON.parse(fs.readFileSync("emails.JSON"))



exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('emails').del()
    .then(function () {
      // Inserts seed entries
      return knex('emails').insert(emails);
    });
};
