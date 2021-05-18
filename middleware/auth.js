import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    // decodedData will give data of users from token
    let decodedData;

    decodedData = jwt.verify(token, "naruto");
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
