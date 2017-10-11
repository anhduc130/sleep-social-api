const request = require("superagent");
const moment = require("moment");
const twilio = require('twilio');
const client = new twilio('ACe3216c39fa76badb052639b6635139e5', 'c551f5da8f818931aa09d70e0f60fc20');

module.exports = function (context, myTimer) {
    return users = request
        .get(`${process.env.POST_FIREBASE_DB_URL}users.json`)
        .set("Content-Type", "application/json")
        .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")
        .then((err, res) => {
            if (err) {
                context.log("ERROR MAN!");
                context.done();
                return false;
            } else {
                Object.keys(res.body).map((key, index) => {
                    const person = res.body[key];
                    const currentDate = new Date().toISOString();
                    const sleepAt = person.goals.sleepAt;
                    const sleepFor = person.goals.sleepFor;
                    context.log(res.body[key]);
                    if (sleepAt && moment(currentDate).diff(moment(sleepAt), "minutes") <= 1.5) {
                        client.api.messages
                            .create({
                                body: "SLEEP NOW BABY!",
                                to: person.phoneNumber,
                                from: "(514) 612-5200",
                            }).then(function (data) {
                                context.log('Administrator notified');
                                return true;
                            }).catch(function (err) {
                                context.log('Could not notify administrator');
                                context.log(err);
                                return false;
                            });
                    }
                    if (moment(currentDate).diff(moment(sleepAt), "minutes") >= sleepFor) {
                        context.log("CONGRATS YOU MADE IT MAN!");
                        client.api.messages
                            .create({
                                body: "CONGRATS! You Have Completed Your Goal!",
                                to: person.phoneNumber,
                                from: "(514) 612-5200",
                            }).then(function (data) {
                                context.log('Administrator notified');
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
                                return true;
                            }).catch(function (err) {
                                context.log('Could not notify administrator');
                                context.log(err);
                                return false;
                            });
                    }
                    context.log(moment(currentDate).diff(moment(sleepAt), "minutes"));
                    context.log(sleepFor);
                    context.done();
                });
            }
        });
};