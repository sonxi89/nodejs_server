const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseSlugPlugin = require('mongoose-slug-plugin');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
    {   
        name: { type: String },
        description: { type: String },
        videoId: { type: String },
        level: { type: String },
        image: { type: String },
    },
    {  
        timestamps: true 
    },
);
Course.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>' });
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
