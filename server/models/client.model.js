import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const ClientUserSchema = new Schema({
    phone: {
        type: String,
        unique: true
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
        }
    },
    local: {
        email: {
            type: String,
            required: [true, "email is importable and required"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is re quired"],
            trim: true,
            minlength: [6, 'Password must lenght'],
            validate: {
                validator(password) {

                },
                message: '{VALUE} is not a vaidl password',
            },
        },
        photo: {
            type: String,
            trim: true
        },
        resetPasswordToken: { // danh cho khoi phuc mat khau
            type: String,
            trim: true
        },
        resetPasswordExpires: {
            type: Date
        }

    },
    facebook: {
        id: {
            type: String,
            trim: true
        },
        token: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        name: {
            type: String
        },
        photo: {
            type: String,
            trim: true
        }
    },
    google: {
        id: {
            type: String,
            trim: true,
        },
        token: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        name: {
            type: String
        },
        photo: {
            type: String,
            trim: true
        }
    },
    scoreFriendly: {
        type: Number,
        default: 10
    },
    status: String // ACTIVE, DEACTIVE, SUSPENDED
}, { timestamps: true });

/*
 ** setup middleware mongoose cho hanh dong SAVE thi tu dong hash pass
 */
ClientUserSchema.pre('save', function (next) {
    if (this.isModified('local.password')) {
        this.local.password = this._hashPassword(this.local.password);
    }
    return next();
});

ClientUserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateClientUser(password) {
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