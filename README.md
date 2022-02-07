# OAuth2 in NestJS for Social Login with GitHub (Google, Facebook, …)

This is a sample NestJS app that uses Passport to

-   authenticate a user by identity token issued from GitHub as an Identity Provider,
-   manage authenticated state (by issuing a JSON Web Token, JWT),
-   attach information about the authenticated user to the `Request` object for further use in route handlers.

It is easy to add another [strategy](https://www.passportjs.org/packages/) or replace GitHub with Google or Facebook for instance.

The code has many comments that make everything very clear and understandable.

## Run

Before:
TODO .env

TODO Ein Github Repo machen (public) mit dem Code der notwendig ist, um Social Login zu implementieren in Nest

Routes:
http://localhost:5000/auth/github => allow users to authenticate with username/password, returning a JWT for use in subsequent calls to protected API endpoints. The JWT is included in the response body and as a cookie names 'jwt'.

http://localhost:5000 => protected route that is accessible only to requests that contain a valid JWT. Send the JWT as a bearer token in an authorization header or as cookie to prove authentication.

Protection is done by annotating the routes with `@UseGuards(JwtAuthGuard)`: When our route is hit, the Guard will automatically invoke our passport-jwt custom configured logic, validating the JWT, and assigning the user property to the Request object.
