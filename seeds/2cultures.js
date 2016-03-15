
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cultures').del(),

    // Inserts seed entries
    knex('cultures').insert({
        name: 'Somali',
        why: 'Civil war began in Somalia in 1990 and led to the disintegration of the government.  The violence and anarchy led to more than 1 million Somalis to flee.  More than 1 million people are internally displaced as well.',
        header_img:
        phrases_link:
        foods: 'Canjeero bread, Sambusa (fried pastry with savory filling)',
        co_num:
        us_num:
    }),
    knex('cultures').insert({
        name: 'Burmese',
        why: 'A military coup in 1962 led to the persecution of certain ethnic groups in Burma/Myanmar.  Refugees from Myanmar include the Karen and Rohingya groups who left Myanmar and were detained in camps in Thailand.',
        header_img:
        phrases_link:
        foods: 'Nya u (fermented fish), Rice with vegetables, Dohpira (steamed rice cake)',
        co_num:
        us_num:
    }),
    knex('cultures').insert({
        name: 'Bhutanese',
        why: 'In the 1990s, over 100,000 people were forced to leave Bhutan and relocate to refugee camps in Nepal.  Many have been relocated, including to Colorado, but more than 18,000 are still in camps in Nepal.',
        header_img:
        phrases_link:
        foods: 'Dal (lentil stew), Vegetarian dishes, Momo (steamed dumpling)',
        co_num:
        us_num:
    }),
    knex('cultures').insert({
        name: 'Sudanese',
        why: 'Civil war in South Sudan and the continuation of the Darfur conflict in Sudan have displaced more than 5 million people.  Many live in camps within Sudan and South Sudan as well as in neighboring countries of Ethiopia, Uganda, and Kenya.',
        header_img:
        phrases_link:
        foods: 'Porridge, Tamayya (broad bean balls), Sweetened semolina',
        co_num:
        us_num:
    }),
    knex('cultures').insert({
        name: 'Iraqi',
        why: 'Continued war and instability in Iraq has displaced more than 3 million people internally.  Millions have fled to surrounding countries, mostly living in urban areas instead of camps.  Some have been resettled in areas outside the Middle East.',
        header_img:
        phrases_link:
        foods: 'Fattoush salad, Pita bread, Dolma (ground meat and rice in grape leaves)',
        co_num:
        us_num:
    })
  );
};
