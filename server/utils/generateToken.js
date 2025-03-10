import jwt from 'jsonwebtoken';

const generateToken = (user,role) => {
  try {
    var token = jwt.sign({ id: user.id, role:role } , process.env.JWT_SECRET); 
      return token
   } catch (error) {
    console.log(error);
    
  }
}


export default generateToken;
