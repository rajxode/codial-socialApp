
// importing mongoose
const mongoose = require('mongoose');

const env = require('./environment');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1/${env.db}`);
    console.log('Database setup successful!!');
}