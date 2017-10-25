# Sleep Social API (serverless backend)

This is the code of serverless backend API for an IOS application to keep track of how much sleep a person has every night. With the recorded data, we generate fun facts and simple analysis on how healthy/productive the person is during the week/month.

Our plan on this project is to help people with sleep disoders. Hopefully, people with sleep problems could use the tracked data to get prescription/advice from the doctors.

### Architecture Design (quick, fun and maybe dirty?)
The serverless backend is written in JavaScript and deployed to MS Azure Function App. The function is triggered when there's a new request coming, then I filter out the request depending on the http request type and header value.

Then, the backend is connected the database (we are using Firebase as it's RESTful, NoSQL & completely FREE) in order to do CRUD operations and store data.

This is my very first time doing something quick and fun (pretty dirty as well) using the MS Azure Function & Firebase (Yes, I learned to use those technologies during the hackathon too :P).
