export const middlewareGetUser = (roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.status)) {
            return res.status(403).json({ msg: "Access denied" });
        }


        next();
    };

}