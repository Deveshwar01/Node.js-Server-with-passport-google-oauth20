# Node.js Server with passport-google-oauth20 and Email Password- Logins

This repository contains a Node.js server that offers password-protected logins for Google and email accounts. It includes features such as user authentication, JWT token generation and validation, endpoints for managing advertisements, and admin functionality based on email domain.

## Features

### Authentication
- Implement endpoints for Google authentication, user signup, and login.
- Utilize JWT for token generation and validation to secure authentication processes.

### Advertisement Management
- Establish endpoints to manage the submission and retrieval of advertisements.

### Admin Functionality
- Develop middleware to determine whether the user is an admin based on their email domain.

## Installation

1. Clone the repository:


git clone https://github.com/your-username/your-repo.git

2. Navigate to the project directory:
cd your-repo


3. Install dependencies:

npm install

4. Set up environment variables:
- Create a `.env` file in the root directory of the project.
- Define the following environment variables in the `.env` file:
  ```
  PORT=
  DATABASE_URL= 
  JWT_SECRET=
  CLIENT_URL=
  SESSION_SECRET=
  GOOGLE_CLIENT_SECRET=
  GOOGLE_CALLBACK_URL=
##



## Usage
1. Set up your Google and email account configurations in the appropriate files.

2. Start the server:


3. Access the API endpoints to utilize the provided functionalities.

## Configuration


## Endpoints

## Endpoints

- **Google Authentication**
- `/auth/google/login` - Endpoint for initiating Google authentication.
- `/auth/google/callback` - Callback URL for Google authentication.

- **User Management**
- `/auth/login/success` - Endpoint for successful login.
- `/auth/login/failed` - Endpoint for failed login.
- `/auth/logout` - Endpoint for logging out.

## Admin Functionality

- Middleware is implemented to check whether the user is an admin based on their email domain.


## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
