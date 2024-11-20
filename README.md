# Coursesellerbackendexpress

This repository contains the backend implementation of a course-selling platform built using Node.js and Express.js. The backend is powered by MongoDB for data storage and integrates several libraries for enhanced functionality and security.

Features=>

1-Admin Functionalities:
		Signup and Login: Admins can create an account and securely log in using hashed passwords.

2-Course Management:
		*Create new courses.
		*View all available courses.

3-User Functionalities:
		*Signup and Login: Users can register and log in with their credentials, protected with hashing and salting.
		*Course Purchase: Users can browse and buy courses created by admins.

4-Security Measures:
		*Passwords are hashed and salted using bcryptjs to ensure secure storage.
		*Input validation is performed using Zod, preventing duplications and ensuring data integrity.
		*Authentication is token-based, implemented via jsonwebtoken (JWT), with a unique secret for secure token generation and validation.

=>Tech Stack

1-Node.js: Backend runtime.
2-Express.js: Framework for building robust APIs.
3-MongoDB: NoSQL database for storing all platform data.
4-Mongoose: Object Data Modeling (ODM) for MongoDB.
5-bcryptjs: Password hashing and salting for security.
6-jsonwebtoken: JWT-based authentication.
7-Zod: Schema validation and error handling.
8-Schemas Overview

=>Admin Schema:

*Stores admin information.
*Secures data using hashed passwords.

=>User Schema:

*Maintains user details and their purchased courses.

=>Course Schema:

*Stores information about available courses, including creator and description.

=>Payment Schema:

*Records payment-related data when a user buys a course.

=>API Endpoints
->Admin Routes:
*POST /admin/signup
-Admin signup with input validation and password hashing.

*POST /admin/login
-Secure login with token generation.

*POST /admin/addcoursecontent
-Create a new course (requires authentication).

*GET /admin/allcourse
-Fetch all courses.

*POST /admin/updateacourse
-changes the current information inside a course

=>User Routes:

*POST /user/signup
-User signup with input validation and secure password storage.

*POST /user/login
-User login with token-based authentication.

*POST /user/purchaseacourse
-Purchase a course (requires authentication).

*GET /user/allcourses
-Fetch purchased courses.

=>How It Works
->Authentication:

*Users and admins are authenticated using tokens provided by jsonwebtoken.
*Tokens are stored in headers and validated via middlewares.

->Password Security:

*Passwords are hashed and salted using bcryptjs during signup for both admins and users.

->Data Validation:

*Inputs are validated using Zod, ensuring proper data structure and preventing duplicate records.

->Course Management:

*Admins can create, view, and manage courses, while users can purchase them.

->Middleware:

*Middleware functions check authentication and validate tokens before allowing access to protected routes.

=>Libraries Used
1-bcryptjs: For hashing and salting passwords.
2-jsonwebtoken: For secure token-based authentication.
3-mongoose: MongoDB object modeling.
4-zod: Schema-based validation.
5-express: Web framework for building APIs.
6-nodemon: Development tool for auto-restarting the server on code changes.

=>Future Enhancements

*Implementing a robust payment gateway integration.
*Adding more detailed logging and monitoring.
*Building frontend to interface with the backend.


=>																																				Feel free to contribute or raise issues for further improvements!
