const request = require("superagent");

module.exports = (username, password, context) => {
    return request
        .get(process.env.POST_FIREBASE_DB_URL)
        .set("Content-Type", "application/json")
        .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
        .then((res) => {
            if (!res) {
                context.res = {
                    status: 400,
                    body: "FAILED TO SEARCH DB"
                };
                context.done();
                return false;
            } else {
                const loggedIn = false;
                Object.keys(res.body).map((key, index) => {
                    if (res.body[key].username == req.body.username &&
                        res.body[key].password == req.body.password) {
                        context.res = {
                            status: 200,
                            body: {
                                status: "SUCCESS",
                                message: "Login successfully",
                                accessToken: res.body[key].accessToken
                            }
                        };
                        context.done();
                        loggedIn = true;
                        return true;
                    }
                });
                if (!loggedIn) {
                    context.res = {
                        status: 400,
                        body: {
                            status: "WRONG_USERNAME_OR_PASSWORD",
                            message: "Wrong Username or Password"
                        }
                    };
                    context.done();
                    return false;
                }
            }
        });
};
