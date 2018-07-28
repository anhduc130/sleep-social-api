const request = require("superagent");
const uuid = require("uuid");

module.exports = (username, password) => {
    return request
        .post(process.env.POST_FIREBASE_DB_URL)
        .send({ username, password, accessToken: uuid.v4() })
        .set("Content-Type", "application/json")
        .set("Authorization", "key=AIzaSyAGy1KOYH6gAkyD1E4iHGkq4eaj7uf7lr0")  // I understand this is super bad :P But time is running out
        .end((res) => {
            if (!res) {
                return false;
            } else {
                return true;
            }
        });

};
