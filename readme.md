# Ticket Application

> Using MongoDB, Express, React-Redux and NodeJS for an application called Ticket-App. This app can generate qr code and after user buy ticket it will automatically create email and send it to the user along with the qr code and the ticket details, with user authentication also if you sign in you will see your purchase history, and in admin side CRUD functionality of the event, view, delete purchased tickets and can edit the ticket status when you logged in as admin and read the qr code.

## Key feautures

- Return a list of ALL concert/events to the user
- Return data (title, date/time, description, ticket left, type, price, quantity, and total) about a single event/concert to the user
- Allow new users to register
- Allow users to view and delete purchased ticket.
- Admin users to add, edit and delete event/concert.
- Admin users can delete and view all purchased ticket.
- Admin can change status of Ticket is valid to Ticket is used vice versa
- Application can send email after purchasing ticket.

![Alt text](frontend/src/img/ticket.png?raw=true 'TICKET_APP')

### After Cloning, Install dependencies

Go to terminal cd into frontend folder

```
cd frontend
```

then

```
npm install
```

Next

```
cd ..
```

then cd into backend

```
cd backend
```

then

```
npm install
```

### Before running the app

Go to - backend/config/config.env, change MongoURI to your own mongoDB connection and Enter your email address and password for email sending.

```
MONGO_URI=
```

```
SMTP_EMAIL=
SMTP_PASSWORD=
```

### Running after installing dependencies

Make sure you are inside the backend folder

```
npm run dev
```

### Future plan or upgrade

Integrate application with payment capabilities like stripe.

## Demo

The APP is live at (https://ticket-app-eclipticsolution.herokuapp.com/)

- Version: 1.0.0
- License: MIT
- Author: Rico John Dato-on
