# BACKEND TASK

## WARNING!!! BY ME (Anar K. Jafarov)
### You have time limit of 3 hours and You must do Your best in such limits.



💫 Welcome! 🎉

This backend exercise involves building a Node.js/Express.js app that will serve a REST API. We imagine you should spend around 3 hours at implement this feature.

## Data Models

> **All models are defined in src/model.js**

### Profile

A profile can be either a `client` or a `contractor`.
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract

A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job

contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

1. Start by creating a local repository for this folder.

1. In the repo root directory, run `npm install` to gather all dependencies.

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

1. Then run `npm start` which should start both the server and the React client.

❗️ **Make sure you commit all changes to the master branch!**

## Technical Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize - **please spend some time reading sequelize documentation before starting the exercise.**

- To authenticate users use the `getProfile` middleware that is located under src/middleware/getProfile.js. users are authenticated by passing `profile_id` in the request header. after a user is authenticated his profile will be available under `req.profile`. make sure only users that are on the contract can access their contracts.
- The server is running on port 3001.

## APIs To Implement

Below is a list of the required API's for the application.

1. **_GET_** `/contracts/:id` - This API is broken 😵! it should return the contract only if it belongs to the profile calling. better fix that!

1. **_GET_** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. **_GET_** `/jobs/unpaid` - Get all unpaid jobs for a user (**_either_** a client or contractor), for **_active contracts only_**.

1. **_POST_** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. **_POST_** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. **_GET_** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. **_GET_** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.

```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

It would be great for example if you'd write some unit test / simple frontend demostrating calls to your fresh APIs.

## Submitting the Assignment

When you have finished the assignment, zip your repo (make sure to include .git folder) and send us the zip.

Thank you and good luck! 🙏




## NOTES
I tried to fit my work inside 3 hours.
I have not fully covered with tests and not done integrational test of api.
But src/handlers/contracts folder has 2 tests and middleware/getProfile.js was covered with test too.

---

## REQUIREMENTS:

```
Hi Anar,
Thank you for taking the time to connect with me today. It was great to meet you.
As I mentioned on our call, the next step in the hiring process is a home assignment which you can request access to via this link.
The purpose of the assignment is to identify core skills. The assignment should take no more than 3 hours of your time. 

Some things to consider (if you haven't already):
1. Use of transactions
2. Concurrency
3. Code style + structure
4. Sequelize

*If you run out of time completing the task*, I advise to add some notes in the README to outline what you would have included/implemented as further proof of your experience.

To ensure confidentiality, please refrain from sharing any part of the assignment, including code or related content, on public platforms such as YouTube or GitHub. We appreciate your cooperation in maintaining the integrity of the assessment process.
Please reply to this email to confirm receipt and complete the assignment within 2 working days and return the .zip to me via email/Google Drive/etc. Please do not share a public GitHub repo. Once received, I will then forward the assignment to our team to review.
Let me know if you have any questions. 
```

## RESULT OF TASK CHECK:

```
Hi Anar,
Thank you for completing the home task and for your genuine interest in the Senior Backend Engineer (Node.js + AWS) role at COMPANY.
After thorough consideration, we regret to inform you that we won't be proceeding with your application for this role. Your time and effort, both in the interview and in completing the assignment have not gone unnoticed and we are thankful for the opportunity to have learned more about you.
 
While the high volume of applications makes it challenging to provide detailed feedback, we hope that you find the overview of our assessment below constructive:

Feedback:

Things you did well:
1. Added validations for some flows
2. The project structure is good, but mixed repositories with services.

Improvement areas:
1. Mixed repositories with services.
2. Missed some validations
3. Didn't wrapped transactions properly
4. Missed requirements described in the README.md file.

We wish you the best in all of your future professional endeavors.
```

---

## MY ANSWER:

```
Hi, *REDACTED*

What is defined in improvement areas place is fair.

But in tight 3 hrs restrictions I’ve compressed what I could do.
If I knew I don’t have 3 hrs restrictions I would:
1. attach for example Joi and do validators as middleware attached to routes.
2. made a service which takes necessary arguments and does necessary checks and calls repository
3. made transaction wrapper which would call insert, update and etc and simplify methods in repositories

About README.md  - yes, that’s my fault I’ve totally forgot about it (time, hurry).


Overall lesson to me: 
Next time I’ll ask questions before doing it if I’m limited within 3 hrs time and would ask for tradeoffs while doing to have direct agreement.


But (:

I really appreciate time taken by You and Your colleagues.
Wish you all the best.

Thanks a lot!
```

---

Look at REQUIREMENTS:

```
The assignment should take no more than 3 hours of your time. 
```

and 

```
If you run out of time completing the task, I advise to add some notes in the README to outline what you would have included/implemented as further proof of your experience.
```

*If you run out of time* ?   is it 3 hrs assignment or 2 days?



