import jwt from "jsonwebtoken";

// user auth middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized Login Again" });
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId safely
        req.user = { userId: token_decoded.id };

        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default authUser;
