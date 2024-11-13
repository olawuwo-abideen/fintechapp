## Fintech Application

A Backend to a banking application, It offers functionalities for both users and admin.

## Built With:

- typescript
- mysql2
- express
- dotenv
- axios
- chalk
- jsonwebtoken
- moment
- nodemailer
- cors
- sequelize
- tsyringe
- uuid
- winston
- yup
- @sendgrid/mail
- accesscontrol


## Installation

- clone the repository

```sh
git clone git@github.com:olawuwo-abideen/fintechapp.git
```

- navigate to the folder

```sh
cd fintechapp.git
```

## Run the app in development mode

Open a terminal window session, or the equivalent on your machine, and enter the following command to install all the
Node modules needed to run the app:

```sh

npm install
```

After doing an `npm install` enter the following `npm start` command:

```sh

npm start

```

This will start the app and set it up to listen for incoming connections on port 3000. Open up your browser of choice
and go to the url

```sh

http://localhost3000:

```

to start using the app.

## API Endpoints

## Admin Endpoints

- `GET  /users` - Get all user 
- `GET  /user/:id` - Get user by id 
- `POST /user/status` - Get user account status
- `GET  /accounts` - Get all accounts
- `GET  /account/:id` - Get user account by id
- `GET  /transactions` - Get user transaction
- `GET /loans` - Get user loans
- `POST /loans/status` - Approve or Decline User loan status

## Account Endpoints

- `POST  /create-account` - Create user account
- `GET  /accounts/:id` - Get all accounts
- `POST /account/:id` - Get  account by id
- `GET  /payee/list` - Get all payee 
- `GET  /payee/:id` - Get payee by id 
- `POST /loans/application` - User apply for loan 
- `GET /loans/list` - User apply loan list 

## Transaction Endpoints

- `POST  /initiate-deposit` - User deposit
- `POST  /verify-deposit` - User verify deposit 
- `POST /transfer` - User make transfer
- `POST  /withdrawal` - User make withdrawal
- `GET  /transactions` - Get user transactions
- `GET /transaction/:id` - Get user transaction by id

## User Endpoints

- `POST  /register` - User register 
- `POST  /login` - User login
- `POST  /forgot-password` - User forget password
- `POST  /reset-password` - User update password
- `GET   /account/:id` - User account by id


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/olawuwo-abideen/fintechapp/issues).

## Authors

👤 **Olawuwo Abideen**

- GitHub: [@Olawuwo Abideen](https://github.com/olawuwo-abideen)
- Twitter: [@Olawuwo Abideen](https://twitter.com/olawuwo_abideen)
- LinkedIn: [@Olawuwo Abideen](https://www.linkedin.com/in/olawuwo-abideen/)