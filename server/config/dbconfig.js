import mongoose from 'mongoose';

export default (uriMongodb) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(uriMongodb);
    mongoose.set('debug', true);
    mongoose.connection
        .once('open', () => console.log('Mongodb is running!'))
        .on('error', err => console.log(err));
}