const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
passport.use(
    new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        const query = "SELECT * FROM nextjsauth.users WHERE email = ?";
        db.query(query, [email], (err, rows) => {
            if (err) {
                console.error(err);
                return done(err);
            }

            if (rows.length === 0) {
                console.log(`User not found for email: ${email}`);
                return done(null, false, { message: 'User not found' });
            }

            bcrypt.compare(password, rows[0].password, (err, result) => {
                if (err) {
                    console.error(err);
                    return done(err);
                }
                if (result === true) {
                    return done(null, rows[0]);
                } else {
                    console.log('Incorrect password');
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        });
    })
);




    passport.serializeUser((user, done) => {
        done(null, user.id);
    })


    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM nextjsauth.users where id = ?";
        db.query(query, [id] ,(err, rows) => {
            if(err)throw err;  
            const userInfo = {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email
            }
            done(null, userInfo);
        })
    }) 

    app.post('/logout', (req, res) => {
        req.logout();
        res.send('User logged out');
    });
}