import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type:String
    },
    email: {
        type: String,
        unique: true
    },
    password:{
        type: String,
        select: false   //indica ao mongoose que ele nao deve trazer esse campo em um select
    }
  });

  //User - users será minha colletion
  //User será a classe para manipular todos os documentos
export const User = mongoose.model('User', userSchema)
