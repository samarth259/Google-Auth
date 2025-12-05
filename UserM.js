const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sm","root","",{
    host:"localhost",
    dialect:"mysql"
})

const User = sequelize.define("User",{
    googleId:{
        type:DataTypes.STRING,
        unique:true
    },
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
     picture:{
        type:DataTypes.STRING,
    }
})

sequelize.sync();
console.log("synced");

module.exports = User;
