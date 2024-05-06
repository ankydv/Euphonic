const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    metadata: {
        type: Object,
        required: true,
        unique: true,
        videoId: {
            type: String,
            required: true,
            unique: true
        }
    }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;