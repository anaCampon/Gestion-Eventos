const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const {createToken} = require ('../../utils/jwt');

const register = async (req, res) => {
    try{
        const data = req.body;
        console.log(data)
        const selectedUsername = await userModel.selectByUsername(data.username);
        if (selectedUsername) {
            return res.status(400).json({message: 'No se ha registrado'});
        }
        data.password = bcrypt.hashSync( data.password,10)
        const result = await userModel.addUser(data.username, data.password);
        return res.status(201).json({message: 'Registrado con éxito', id: result});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};


const login = async (req, res) => {
    try{
        const data = req.body;
        const selectedUser = await userModel.selectByUsername(data.username);
        if (!selectedUser) {
            return res.status(400).json({message: 'El usuario no existe'});
        }
        const isSame = bcrypt.compareSync(data.password, selectedUser.password);
        if (!isSame){
            return res.status(400).json({message: 'Contraseña incorrecta'});
        }
        //Crear el token
        const token = createToken(selectedUser);
        return res.status(200).json({token: token});
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

const profile = async (req, res) => {
    try{
        if (req.user){
            const result = await userModel.seeProfile(req.user.username);
            if(result.length === 0) {
                return res.status(404).json({message: 'No se han encontrado datos'});
            }
            //Para que no se imprima la contraseña
            const userData = {
                id:result.idusers, username:result.username
            }
            return res.status(200).json({data: userData});
        }else{
            return res.status(400).json({message: 'Debe enviar el nombre'});
        }
    } catch (error){
        console.log(error)
        return res.status(500).json(error);
    }
};

module.exports = { login, register, profile };


/* Probar en THUNDERCLIENT POST
{
"username":"anaPlot",
"password":"Hola"
} */