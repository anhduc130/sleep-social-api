# Sleep Social API (serverless backend) - A 24-hour hackathon in 2017

This is the code of serverless backend API for an IOS application to keep track of how much sleep a person has every night. With the recorded data, we generate fun facts and simple analysis on how healthy/productive the person is during the week/month.

Our plan on this project is to help people with sleep disoders. With that intention, people with sleep problems could use the tracked data to get prescription/advice from the doctors.

### Architecture Design
The serverless backend is written in JavaScript and deployed to MS Azure Function App. The function is triggered when there's a new request coming, then I filter out the request based on the http request type and the header value.

The backend is also connected to a database (we are using Google Firebase as it's RESTful, NoSQL & completely FREE) in order to do CRUD operations and store data.

The backend is also connected to Twilio Messaging System that allows to send text messages to the user's phone as a sleep time / wakeup time reminder.

### Functionalities:
- Signin / Signup
- Store your sleep data every night for the whole week
- See your friend's sleep data
- Set sleep time / wakeup time & text messages will be sent to the user's phone number at those times (via Twilio)

This is my very first time doing something quick and fun (pretty dirty as well -> incomplete & insecure) using the MS Azure Function & Firebase.
