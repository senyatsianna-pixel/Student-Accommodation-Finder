const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./accommodation.db');

const initialAccommodations = [
  // Flora Park
  ['Savannah Guest House', 'Flora Park', 'R700 - R850', 'Near Savannah Mall & McDonald\'s Flora Park', '+27 15 296 0000'],
  ['Bougain Villa Guest House', 'Flora Park', 'R880 - R1,100', 'Quiet suburban setting with private gardens', '+27 15 296 1111'],
  ['The Villas Boutique Hotel', 'Flora Park', 'R1,900', 'Upscale boutique lodging with luxury amenities', '+27 15 296 2222'],
  ['Miami Lodge', 'Flora Park', 'R750 - R950', 'Low-key hotel with restaurant, bar & meeting rooms', '+27 15 296 3333'],
  ['Vuwa Lodge', 'Flora Park', 'R850 - R1,200', 'Walking distance to Savannah Mall & clinic', '+27 15 296 1496'],

  // Fauna Park
  ['Marlot Guest House', 'Fauna Park', 'R968', 'Informal 3-star rooms with outdoor pool and restaurant', '+27 15 291 0000'],
  ['Limpopo Guest Manor', 'Fauna Park', 'R1,250 - R1,600', '4-star sophisticated establishment with multiple pools', '+27 15 291 1111'],
  ['The Guesthouse 8 On Impala', 'Fauna Park', 'R750 - R1,000', 'Swimming pool, braai facilities, secure gated premises', '+27 83 585 5155'],
  ['M n M Guesthouse', 'Fauna Park', 'R700 - R950', 'Queen bedrooms, en-suite bathrooms, free Wi-Fi', '+27 76 174 8888'],
  ['Ngwedi Guest House', 'Fauna Park', 'R750 - R900', 'Modern suburban accommodation with personalized service', '+27 15 291 2222'],

  // Serala View
  ['Serala View Lodge', 'Serala View', 'R750 - R1,100', 'Serviced rooms in quiet residential suburb', '+27 15 297 0000'],
  ['The Residency Serala View', 'Serala View', 'R800 - R1,200', 'Executive-style short and long-term units', '+27 15 297 1111'],
  ['Serala View B&B', 'Serala View', 'R700 - R950', 'Bed and breakfast with peaceful gardens and secure parking', '+27 15 297 2222'],
  ['Serala View Executive Suites', 'Serala View', 'R900 - R1,300', 'Self-contained upscale suites for business travelers', '+27 15 297 3333'],
  ['Nthwane Guest House', 'Serala View', 'R700 - R900', 'Quiet lodge with easy access to transport routes', '+27 15 297 4444'],

  // Seshego
  ['Seshego Guest House', 'Seshego', 'R450 - R700', 'Budget-friendly lodging within Seshego community', '+27 82 474 3688'],
  ['Kgoshi Palace Lodge', 'Seshego', 'R500 - R750', 'Traditional hospitality venue with en-suite rooms', '+27 15 223 0000'],
  ['Mohlakoana Lodge', 'Seshego', 'R450 - R650', 'Affordable and convenient local lodging', '+27 15 223 1111'],
  ['Thabitha Guest House', 'Seshego', 'R500 - R700', 'Clean, budget-friendly rooms with secure facilities', '+27 15 223 2222'],
  ['Seshego View Executive Lodge', 'Seshego', 'R600 - R850', 'Modern setup with rooms and event hosting facilities', '+27 15 223 3333']
];

db.serialize(() => {
  const stmt = db.prepare(`INSERT INTO accommodations (name, suburb, priceRange, description, contact) VALUES (?, ?, ?, ?, ?)`);
  
  initialAccommodations.forEach(item => {
    stmt.run(item);
  });
  
  stmt.finalize();
  console.log('Successfully inserted all accommodations into the database!');
});

db.close();