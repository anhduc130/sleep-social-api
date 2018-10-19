# Sleep Social API (serverless backend) - A 24-hour hackathon in 2017

A serverless backend API for an IOS application that records how much sleep the user has every night. 

The application will also generate fun facts and simple analysis on how healthy/productive that user is during the week/month based on the recorded data.

The main objective is to assist people with sleep disoders. People with sleep problems could use the tracked data to get prescription/advice from the doctors though this is not recommended.

### Architecture Design
The serverless backend is written in JavaScript and deployed to MS Azure Function App. The API is triggered when there's a new request which will be filtered out based on the http request type and the header value.

Google Firebase is used to do CRUD operations in real-time through its RESTful APIs. 

Twilio Messaging System is used to send text messages to the user's phone as a sleep / wakeup time reminder.

### Functionalities:
- Signin / Signup
- Store user sleep data every night for the whole week
- See other users sleep data
- Set sleep / wakeup time which will notify user at those times (via Twilio text messaging)

This is my very first time doing something quick and fun (pretty dirty as well -> incomplete & insecure) using the MS Azure Function & Firebase.
