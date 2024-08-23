const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    end_year: { type: String, default: '' },
    intensity: { type: Number },
    sector: { type: String },
    topic: { type: String },
    insight: { type: String },
    url: { type: String },
    region: { type: String },
    start_year: { type: String, default: '' },
    impact: { type: String, default: '' },
    added: { type: Date },
    published: { type: Date },
    country: { type: String },
    relevance: { type: Number },
    pestle: { type: String },
    source: { type: String },
    title: { type: String },
    likelihood: { type: Number }
});
const Data = mongoose.model('data', DataSchema);
module.exports = Data
