import jwt from "jsonwebtoken";

async function userMiddleware(req: any, res: any, next: any) {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({
      message: "Authorization Token not found!",
    });
  } else {
    const authToken = token.split(" ")[1];
    jwt.verify(
      authToken,
      process.env.JWT_SECRET || "Fallback",
      (err: any, user: any) => {
        if (err) {
          return res.status(403).json({
            message: "Not Authorized!",
          });
        } else {
          req.userId = user.id;
          next();
        }
      }
    );
  }
}

export default userMiddleware;
