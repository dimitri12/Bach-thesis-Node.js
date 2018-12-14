var dbConfig = require('./mysqlconnection');
var sql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);
/* Denna js-fil är en konstruktor till de andra js-filerna 
som anropar funktionerna nedan som ansluts till den databas som
anges. Med hjälp av mssql och dbConfig så skapas en anslutning till
servern samt databasen som är definierat.*/
    //
    
//sök efter en kurs med hjälp av kurskoden
module.exports={
getCourse: function (kursID){
    
    var connection = mysql.createConnection(dbConfig.connection);
        
        var s = squel.select();
        s.from(kurslista);
        s.field(kursID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
               // console.log("result");
            
            connection.end();
        });
    
    return result;
},
//lägg till en ny kurs i kurslistan
insertCourse: function (kurs,kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        
        var s = squel.select();
        s.into(kurslista);
        s.field(kurs);
        s.field(kursID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
                // console.log("result");
            
            
        });
    connection.end();
},
//tar bort kursen ifrån kurslistan
deleteCourse: function (kurs, kursID) {
    
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.delete();
        s.from(kurslista);
        s.field(kurs);
        s.field(kursID);
        connection.query(s.toString(), function (err, result) {
			if (err) { console.log(err); }
                console.log(result);
                // console.log("result");
        });
    connection.end();
},
//lägg till nya studenter i en kurs
insertStudentIntoCourse: function (studentID, kurs) {
    var connection = mysql.createConnection(dbConfig.connection);
        
        var s = squel.insert();
        s.into(kurs);
        s.set(studentID);
        connection.query(s.toString() , function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
                //console.log("result");
            
            
        });
    connection.end();
},
//få reda på vilka studenter läser en kurs
getStudentIDFromCourse: function (studentID, kurs) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(kurs);
        s.set(studentID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
                //console.log("result");
            
        });
    connection.end();
    return result;
},
/* ta reda på en student med hjälp av dennes studentID
function getStudentFromStudentList(studentID) {
    var conn = new sql.Connection(dbConfig);
    var req = new sql.Request(conn);
    conn.connect(function (err) {
        if (err) { console.log(err); }
        var s = squel.select();
        s.from(studentID);
        req.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                console.log(result);
                console.log("result");
            }
            conn.close();
        });
    });
    return result;
}*/
//skapa en kurstabell där läraren kan lägga till studenter
createCourse: function (kurs) {
    var connection = mysql.createConnection(dbConfig.connection);
        connection.query("CREATE TABLE IF NOT EXIST" + kurs + "studentID varchar(20)", function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
                console.log("Table" + kurs + "created");
            
        });
    connection.end();
},
//här så skapar man en tabell för en students kurser
createCoursesForStudent: function (studentID) {
    var connection = mysql.createConnection(dbConfig.connection);
        connection.query("CREATE TABLE" + studentID + "kursID varchar(50)",
            function (err, result) {
               if (err) { console.log(err); }
                    console.log(result);
                    console.log("Table" + studentID + "created");
            });
     connection.end();
},
//registrerar kursen för studenten
registerCourseForStudent: function (studentID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.insert();
        s.into(studentID);
        s.set(kursID, kursID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
                console.log(result);
                //console.log("result");
        });
    connection.end();
},
//tar bort student från en kurs
deleteStudentFromCourse:function (studentID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.delete();
        s.from(kurs);
        s.field(studentID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
                console.log("student deleted");
                //console.log("Table" + kurs + "created");
            
            
        });
    connection.end();
},
//lägga till lärare i en kurs
insertTeacherToCourse:function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.insert();
        s.into(kurs);
        s.set(teacherID);
        req.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            
                //console.log(result);
                console.log("insertion complete");
            
            
        });
    connection.end();
},
//inhämta ifrån databasen vilken lärare som undervisar den kurs som angivs
getTeacherIDFromCourse: function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(kurs);
        s.set(studentID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else if(result==null) {
                //console.log(result);
                //console.log("result");
				console.log(err);
            }
            else{
				console.log(result);
			}
        });
    connection.end();
    return result;
},
//tar bort läraren från kursen
deleteTeacherFromCourse:function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.delete();
        s.from(kurs);
        s.field(teacherID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                console.log("teacher deleted");
                //console.log("Table" + kurs + "created");
            }
            
        });
    connection.end();
},
//skapar en lista av kurser för denne lärare
createCoursesForTeacher: function (teacherID) {
    var connection = mysql.createConnection(dbConfig.connection);
        connection.query("CREATE TABLE" + teacherID + "kursID varchar(50)",
            function (err, result) {
                if (err) { console.log(err); }
                else {
                    //console.log(result);
                    console.log("Table" + teacherID + "created");
                }

            });
    connection.end();
},
//undersöker om studenten läser kursen
isStudentReadingThisCourse: function (studentID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(kurs);
        s.set(studentID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                if (result == null) {
                    conn.close();
                    return false;
                }
                console.log(result);
                //console.log("result");
            }
            
        });
    connection.end();
    return true;
},
//undersöker om läraren undervisar denna kurs
isTeacherTeachingThisCourse: function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(kurs);
        s.set(studentID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                if (result == null) {
                    conn.close();
                    return false;
                }
                //console.log("result");
            }
            
        });
    connection.end();
    return false;
},
//registrerar kurser för lärare
registerCourseForTeacher: function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.insert();
        s.into(teacherID);
        s.set(kurs);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                console.log(result);
                //console.log("result");
            }
            
        });
    connection.end();
},
//vilka kurser läser denna student?
getCoursesOfAStudent: function (studentID){
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(studentID);
        
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                if (result == null) {
                    return null;
                }
                //console.log("result");
            }
            
        });
    connection.end();
    return result;
},
//vilka kurser undervisar denna lärare?
getCoursesOfATeacher:function (teacherID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.select();
        s.from(teacherID);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                if (result == null) {
                    return null;
                }
                //console.log("result");
            }
            
        });
    connection.end();
    return result;
},
//tar bort en kurs ifrån studentkontot
deleteCourseFromStudent:function (studentID, kursID){
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.delete();
        s.from(studentID);
        s.field(kurs);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                console.log("student deleted");
                //console.log("Table" + kurs + "created");
            }
            
        })
    connection.end();
},
//tar bort en kurs ifrån lärarens konto
deleteCourseFromTeacher:function (teacherID, kursID) {
    var connection = mysql.createConnection(dbConfig.connection);
        var s = squel.delete();
        s.from(teacherID);
        s.field(kurs);
        connection.query(s.toString(), function (err, result) {
            if (err) { console.log(err); }
            else {
                console.log("student deleted");
                //console.log("Table" + kurs + "created");
            }
            
        })
    connection.end();
}
/*function profile(username) {
    //insert username into the loggedUser table

}*/
};