
exports.up = function(knex) {
    return knex.schema.createTable('emails', emailtable => {
        emailtable.increments('id');
        emailtable.string('sender');
        emailtable.string('recipient');
        emailtable.string('subject');
        emailtable.string('message');
        emailtable.date('date');

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTablesifExists('emails');
  
};
