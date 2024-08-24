'use strict';
const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Middleware to authenticate the request using Basic Auth
// from https://teamtreehouse.com/library/set-up-the-authentication-middleware
exports.authenticateUser = async (req, res, next) => {
    // TODO
    // Parse the user's credentials from the Authorization header.
    let message;
    const credentials = auth(req);
    
    if (credentials) {
        // If the user's credentials are available...
        // Attempt to retrieve the user from the data store
        // by their username (i.e. the user's "key"
        // from the Authorization header).
        const user = await User.findOne({ where: {emailAddress: credentials.name} });
        // If a user was successfully retrieved from the data store...
        if (user) { 
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            // Use the bcrypt npm package to compare the user's password
            // (from the Authorization header) to the user's password
            // that was retrieved from the data store.
            if (authenticated) {
                // If the passwords match...
                console.log(`Authentication successful for username: ${user.username}`);
                // Store the retrieved user object on the request object
                req.currentUser = user;
                // so any middleware functions that follow this middleware function
                // will have access to the user's information.
            } else {
                // If user authentication failed...
                message = `Authentication failure for username: ${user.username}`;
                // Return a response with a 401 Unauthorized HTTP status code.
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }
    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        // Or if user authentication succeeded...
        // Call the next() method.
        next();
    }
    
    
}