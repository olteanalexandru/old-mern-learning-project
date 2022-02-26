//web token for auth
import jwt from "jsonwebtoken";

//click like button -> auth middleware (next) -> like controller


const secret = 'test';
//next = do .. -> move to next ..
const auth = async (req, res, next) => {
  try {
    //token is on fist position in array
    //The split() method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array
    const token = req.headers.authorization.split(" ")[1];
    //if token higher than 500 token is googleAuth
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } 
    //google auth
    else {
      decodedData = jwt.decode(token);
//.sub google name for specific ID to dif users
      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
