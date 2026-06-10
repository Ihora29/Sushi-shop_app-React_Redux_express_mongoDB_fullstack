export const middlewareGetUser = (roles) => {

    return (req, res, next) => {

        console.log('status:', req.user.status);
        console.log('allowed roles:', roles);
        if (!roles.includes(req.user.status)) {
            return res.status(403).json({ msg: "Access denied" });
        }


        next();
    };

}