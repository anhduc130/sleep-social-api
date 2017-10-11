const request = require("superagent");
const moment = require("moment");
const uuidv1 = require("uuid/v1");
const CryptoJS = require("crypto-js");;

module.exports = function (context, req) {
    if (req.method === "GET") {
        context.log("This is GET");
        context.res = {
            status: 200,
            body: "hey there"
        };
    } else if (req.method === "PATCH") {
        context.log("This is PATCH");
        context.res = {
            status: 200,
            body: "hey there"
        };
    } else if (req.method === "POST" && req.body.actionType === "signup") {
        const secretKey = uuidv1();
        request
            .post(`${process.env.POST_FIREBASE_DB_URL}users.json`)
            .send({
                username: req.body.username,
                password: CryptoJS.MD5(req.body.password).toString(),
                secretKey,
                timeSleptByDate: [
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    },
                    {
                        date: "",
                        timeSlept: ""
                    }
                ],
                phoneNumber: req.body.phoneNumber
            })
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .end((err, res) => {
                if (err) {
                    context.log(res);
                    context.res = {
                        status: 400,
                        body: "Request failed"
                    };
                    context.done();
                } else {
                    context.res = {
                        status: 201,
                        body: {
                            username: req.body.username,
                            status: "SUCCESS"
                        }
                    };
                    context.done();
                }
            });
    } else if (req.method === "POST" && req.body.actionType === "signin") {
        context.log("GOT HERE");
        const users = request
            .get(`${process.env.POST_FIREBASE_DB_URL}users.json`)
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .then((res) => {
                if (!res) {
                    context.res = {
                        status: 400,
                        body: "Request failed"
                    };
                    context.done();
                    return false;
                } else {
                    const loggedIn = false;
                    Object.keys(res.body).map((key, index) => {
                        const hashedPassword = res.body[key].password;
                        const secretKey = res.body[key].secretKey;
                        if (res.body[key].username == req.body.username &&
                            hashedPassword == CryptoJS.MD5(req.body.password).toString()) {
                            context.res = {
                                status: 200,
                                body: {
                                    status: "SUCCESS",
                                    message: "Sign in successfully",
                                    accessToken: key
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
    } else if (req.method === "POST" && req.body.actionType === "sleepTime") {
        const sleepTime = new Date().toISOString();
        request
            .patch(`${process.env.POST_FIREBASE_DB_URL}/users/${req.body.accessToken}.json`)
            .send({
                sleepTime
            })
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .end((err, res) => {
                if (err) {
                    context.log(res);
                    context.res = {
                        status: 400,
                        body: "DB Failed"
                    };
                    context.done();
                } else {
                    context.res = {
                        status: 200,
                        body: {
                            sleepTime,
                            status: "SUCCESS"
                        }
                    };
                    context.done();
                }
            });
    } else if (req.method === "POST" && req.body.actionType === "wakeupTime") {
        request
            .get(`${process.env.POST_FIREBASE_DB_URL}/users/${req.body.accessToken}.json`)
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .end((err, res) => {
                if (err) {
                    context.log(res);
                    context.res = {
                        status: 400,
                        body: "DB Failed"
                    };
                    context.done();
                } else {
                    const sleepTime = res.body.sleepTime;
                    const wakeupTime = new Date().toISOString();
                    const timeSlept = moment(wakeupTime).diff(moment(sleepTime), "minutes") / 60;
                    const hours = Math.floor(timeSlept);
                    const minutes = moment(wakeupTime).diff(moment(sleepTime), "minutes") - hours * 60;
                    const details = `${hours} Hour(s) and ${minutes} Minute(s)`;
                    // const date = new Date(sleepTime).getDay();
                    const date = 0;
                    
                    context.res = {
                        status: 200,
                        body: {
                            status: "SUCCESS",
                            wakeupTime,
                            timeSlept,
                            details
                        }
                    };

                    request
                        .patch(`${process.env.POST_FIREBASE_DB_URL}users/${req.body.accessToken}/timeSleptByDate/${date}.json`)
                        .send({
                            timeSlept,
                            date: `${moment(sleepTime).format("DD-MM-YYYY")}`,
                            details
                        })
                        .set("Content-Type", "application/json")
                        .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
                        .end((err, res) => {
                            if (err) {
                                context.log(res);
                                context.res = {
                                    status: 400,
                                    body: "Request failed"
                                };
                                context.done();
                                return false;
                            } else {
                                context.done();
                                return true;
                            }
                        });
                    return;
                }
            });
    } else if (req.method === "POST" && req.body.actionType === "searchFriend") {
        const users = request
            .get(`${process.env.POST_FIREBASE_DB_URL}users.json`)
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .then((res) => {
                if (!res) {
                    context.res = {
                        status: 400,
                        body: "Request failed"
                    };
                    context.done();
                    return false;
                } else {
                    const foundFriend = false;
                    Object.keys(res.body).map((key, index) => {
                        const username = res.body[key].username;
                        if (username == req.body.username) {
                            context.res = {
                                status: 200,
                                body: {
                                    status: "SUCCESS",
                                    message: "Found your friend",
                                    data: {
                                        timeSleptByDate: res.body[key].timeSleptByDate,
                                        username: res.body[key].username
                                    }
                                }
                            };
                            context.done();
                            foundFriend = true;
                            return true;
                        }
                    });
                    if (!foundFriend) {
                        context.res = {
                            status: 400,
                            body: {
                                status: "INVALID_USERNAME",
                                message: "Invalid Username"
                            }
                        };
                        context.done();
                        return false;
                    }
                }
            });
    } else if (req.method === "POST" && req.body.actionType === "setGoals") {
        request
            .patch(`${process.env.POST_FIREBASE_DB_URL}/users/${req.body.accessToken}/goals.json`)
            .send({
                sleepAt: req.body.sleepAt,
                sleepFor: req.body.sleepFor

            })
            .set("Content-Type", "application/json")
            .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
            .end((err, res) => {
                if (err) {
                    context.log(res);
                    context.res = {
                        status: 400,
                        body: "DB Failed"
                    };
                    context.done();
                } else {
                    context.res = {
                        status: 200,
                        body: {
                            goals: {
                                sleepAt: req.body.sleepAt,
                                sleepFor: req.body.sleepFor
                            },
                            status: "SUCCESS"
                        }
                    };
                    context.done();
                }
            });
    } else {
        context.res = {
            status: 400,
            body: "Request failed"
        };
        context.done();
    }
};