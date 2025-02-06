# TypeScript Knowledge Assessment Task: Implementing an OAuth 2.0 REST API

## Introduction

Greetings! We invite you to complete a test task that will help us assess your TypeScript knowledge and skills in developing REST APIs. Your task is to create a server that provides OAuth 2.0 authorization. This is an excellent opportunity to get familiar with or strengthen your knowledge of OAuth 2.0, which is an essential aspect for any backend developer.

## Task Description

In this task, you will implement two REST API endpoints, entirely in TypeScript. The project should be easy to run and must adhere to the OAuth 2.0 specification. This task will not only test your skills but also allow you to dive into the OAuth 2.0 specification.

## Required Endpoints

### **Authorization Endpoint**

- **URL:** `http://localhost:8080/api/oauth/authorize`
- **Method:** `GET`
- **Description:** This endpoint handles the standard OAuth 2.0 [Authorization Request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1) with the `response_type=code` parameter. Upon successful authorization, the user should be redirected to the specified `redirect_uri` with an appended `code` parameter, which will be used to obtain an access token. Implementing support for the `state` parameter is optional but would be considered a plus. This parameter helps protect applications from CSRF attacks and maintains `state` between requests and responses.

### **Token Endpoint**

- **URL:** `http://localhost:8080/api/oauth/token`
- **Method:** `POST`
- **Description:** This endpoint processes the OAuth 2.0 [Access Token Request](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3), accepting `grant_type=authorization_code` to exchange the code obtained in the previous step for an access token. Supporting `grant_type=refresh_token` would be beneficial but is not mandatory. The response should return a JSON object that includes `access_token`, `token_type`, `expires_in`, and optionally `refresh_token`.

## Implementation Details

- OAuth Client Parameters**:**
  - `client_id=upfirst`
  - `redirect_uri=http://localhost:8081/process`
- Ensure that the `client_id` and `redirect_uri` are valid and permitted for the specified client.
- The project should be runnable with the following commands:
  - `npm install`
  - `npm start`
- Use a minimal set of external `dependencies`. It is recommended to use:
  - `express` for creating the server.
  - `jose` or a similar library for handling JWT operations.
- We do not impose restrictions on the `devDependencies`. You are free to use any tools for build, testing, and code formatting, such as `eslint`, `prettier`, or `jest`.

## Testing and Expectations

We will verify your implementation by following this scenario:

1. Request to `http://localhost:8080/api/oauth/authorize?response_type=code&client_id=upfirst&redirect_uri=http://localhost:8081/process&state=SOME_STATE`
   - Expect a 302 Found response with `Location: http://localhost:8081/process?code=SOME_CODE`. If `state` support is implemented, the response should also contain `state=SOME_STATE`.
2. Request to `http://localhost:8080/api/oauth/token` with `Content-Type: application/x-www-form-urlencoded` and body `grant_type=authorization_code&code=SOME_CODE&client_id=upfirst&redirect_uri=http://localhost:8081/process` - Expect a 200 OK response with `Content-Type: application/json;charset=UTF-8` and a body containing:
   {
   "access_token": "SOME_JWT_ACCESS_TOKEN",
   "token_type": "bearer",
   "expires_in": SOME_LIFETEME_IN_SECONDS,
   "refresh_token": "SOME_REFRESH_TOKEN" // if refresh_token support is implemented
   }

## Helpful Resources

- [OAuth 2.0 Authorization Framework RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749): The main specification document explaining how the different components of OAuth 2.0 work.
- [Introduction to OAuth 2.0](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2): A guide to help you quickly understand the basic concepts.
- [Express](https://expressjs.com/): Documentation for building web applications on Node.js.
- [JOSE](https://github.com/panva/jose): A library for working with JWTs that will be helpful for generating and validating tokens.

## Conclusion

This project is designed to demonstrate your understanding of OAuth 2.0 and your ability to write high-quality, maintainable code in TypeScript. Publish your project on GitHub and provide access to the repository at [dev@upfirst.ai](mailto:dev@upfirst.ai) (https://github.com/upfirst-dev). We look forward to seeing your work and wish you the best of luck in completing the task!
