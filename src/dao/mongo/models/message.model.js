import mongoose from 'mongoose';

const messagesCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', filter: true },
    text: { type: String },
    date: { type: Date }
});

messageSchema.pre('find', function (next) {
    this.populate('user');
    next();
});

const messageModel = mongoose.model(messagesCollection, messageSchema);

export default messageModel;