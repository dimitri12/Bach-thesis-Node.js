var LocalStrategy = require('passport-local').Strategy;
var squel = require('squel');
var account = require('./accounts');
var flash = require('req-flash');
var bcrypt = require('bcrypt-nodejs');
var util = require('util');
var dbconfig = require('./database');

var sqlque = require('sql-query');
var sqlQuery = sqlque.Query();

var User = require('./user');

/*var dbConfig = {
    server: "DIMITRI",
    database: "Kurser",
    user: "dimitri12",
    password: "mydatabase",
    port:1433
    
};*/
/*var connection = mysql.createConnection({
    userName: 'dimitri12',
    password: 'mydatabase',
    host: "DIMITRI",
    database: 'kurser'
});*/
/*define(function (require) {
    var account = requirejs('accounts');
    return function () { };
});*/


module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        /*connection.connect();
        connection.query('SELECT * FROM users WHERE username =?', [username], function (err, rows) {
            if (err) {
                return done(err);
                connection.end();
            }
            done(err, rows[0]);
            connection.end();
        });
        */
            
      /*var conn = new sql.Connection(dbConfig,
       function (err) {
            if (err) { console.log(err); }
            var req = new sql.Request(conn);
            req.query('SELECT * FROM users WHERE id = ? ', [id], function (err, rows){

                done(err, rows[0]);
            });
            
        });*/
		/*connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });*/
		User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            
            

         
           
      
			
			process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.username    = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });
        }));
    
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username', 
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
       function (req, username, password, done) { // callback with email and password from our form
	   
         /* var conn = new sql.Connection(dbConfig);
        conn.connect(function (err) {
            if (err) { console.log(err); }
            var req = new sql.Request(conn);
            req.query("SELECT * FROM users WHERE username = ?",[username], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    console.log("No user found");
                    return done(null, false, flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user  
                return done(null, rows[0]);
            });
            selectUserFromDb();
        });*/
     
  User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });
}));
    };