module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Privada123@',
    DB: "GLWINBA_API",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
}
};
/*
module.exports = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: 'mssql'
};
*/