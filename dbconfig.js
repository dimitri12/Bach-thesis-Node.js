module.exports = {
    createConnection: function (dbConfig) {
        var conn = new sql.Connection(dbConfig);
        var req = new sql.Request(conn);
    },
    closeConnection: function () { conn.close(); }
};