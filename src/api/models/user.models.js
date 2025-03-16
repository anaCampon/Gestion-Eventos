const pool = require('../../utils/conexion_db');

const addUser = async (username, password) => {
    const insert = (`INSERT INTO usuario (username, password) VALUES (?,?)`);
    const [result] = await pool.query(insert, [username, password]);
    return result.insertId;
};

const selectByUsername = async (username) => {
    const select = (`SELECT * FROM usuario WHERE username = ?`);
    const [result] = await pool.query(select, [username]);
    if (result.length === 0) {
        return false;
    }
    return result[0];
};

const seeProfile = async (username) => {
    const select = (`SELECT * FROM usuario WHERE username = ?`);
    const [result] = await pool.query(select, [username]);
    if (result.length === 0) {
        return false;
    }
    return result[0];
};

module.exports = {selectByUsername, addUser, seeProfile};
