import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required:[true,"Mat khau la bat buoc!"]
    },
    info: {
        firstname: {
            type: String,
            required: [true, 'First name is required'],
            trim: true
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        passportNumber:{
            type: String,
            trim: true,
            unique: true
        },
        phoneNumber:{
            type: String
        },
        photoProfile:{
            type: String,
            trim: true
        },

    },
    resetPasswordToken: { // danh cho khoi phuc mat khau
        type: String,
        trim: true
    },
    resetPasswordExpires: {
        type: Date
    },
    role:{
        type: Number, // 1 la nhan vien phu xe, 2 lai xe, 3 nhan vien giam sat, 
        default: 1
    },
    status: String // ACTIVE, DEACTIVE, SUSPENDED
}, {timestamps: true});

/*
 ** setup middleware mongoose cho hanh dong SAVE thi tu dong hash pass
 */
ClientUserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

ClientUserSchema.methods = {
    _hashPassword(password){
        return hashSync(password);
    },
    authenticateClientUser(password){
        return compareSync(password, this.local.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            config.JWT_SECRET,
        );
    },
    toAuthJSON() {
        return {
            _id: this._id,
            email: this.local.email,
            token: `JWT ${this.createToken()}`,
        };
    },
    toJSON() {
        return {
            _id: this._id,
            token: this.createToken()
        };
    },
}
export default mongoose.model('clients', ClientUserSchema);