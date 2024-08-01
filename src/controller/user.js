const bcrypt = require('bcrypt');
const Utils = require('../../utils');
const Constants = require('../constants');
const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
const Response = require('../lib/response');

// Register new user for the first time
exports.register = async (req, res) => {
    const { taskOwner, email, password, role } = req.body;

    let response = new Response();

    // Basic validation
    if (!taskOwner || !email || !password) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({message: "All fields are required!"});
        res.send(response);
    }

    try {
        // Create a new user instance
        const newUser = new UserModel({
            userId: Utils.generateRandomString(),
            taskOwner: taskOwner,
            email: email,
            role: role || Constants.ROLES.USER,
            password: await Utils.encryptPassword(password),
            created: new Date()
        });

        const user = await newUser.save();

        response.setStatusCode(200);
        response.setStatus('success');
        response.setInfo({
            message: "User registered successfully!",
            user
        });
        res.send(response);
    } catch (err) {
        response.setStatusCode(500);
        response.setStatus('failed');
        response.setInfo({
            message: err.message
        });
        res.send(response);
    }
};

// Login done using email & password
// 402 - Registered Email Not Found
// 401 - Password Not Matched
// 400 - Email or Password missing
exports.login = async (req, res) => {
    const { email, password } = req.body;

    let response = new Response();

    if (!email || !password) {
        response.setStatusCode(400);
        response.setStatus('failed');
        response.setInfo({message: "Email and password are required!"});
        res.send(response);
    }

    try {
        // Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            response.setStatusCode(402);
            response.setStatus('failed');
            response.setInfo({message: "User not found."});
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            response.setStatusCode(401);
            response.setStatus('failed');
            response.setInfo({message: "Invalid password."});
        } else {
            const token = jwt.sign({ userId: user.userId }, Constants.SECRET_KEY, {
                expiresIn: Constants.EXPIRESIN,
            });
    
            response.setStatusCode(200);
            response.setStatus('success');
            response.setInfo({
                message: "Login successful!",
                token: token
            });
        }
        res.send(response);
    } catch (err) {
        response.setStatusCode(500);
        response.setStatus('failed');
        response.setInfo({message: err.message});
        res.send(response);
    }
};