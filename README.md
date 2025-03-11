# Student Database (MongoDB and Mongoose)

A web server built with express that has various endpoints that can access the local MongoDB student database.

## Developer

- **Name:** Euan Jed Tabamo
- **Degree Program** BS Computer Science

## How to Use

### Endpoints

1. /save-student
    - Provide a `stdnum`, `age`, `fname`, and `lname` in the Request Body
    - Send a POST request
    - The student, given that the data is valid, will be added to the database
2. /update
    - Provide a `fname` in the Request Body
    - Send a POST request
    - Clint Salmon (the student selected to be updated) will be updated with the new `fname` and a `lname` "Parker"
3. /remove-user
    - Provide a `stdnum` in the Request Body
    - Send a POST request
    - The user with the matching `stdnum` will be removed from the database
4. /remove-all-user
    - Send a POST request
    - All users in the database are removed
5. /user
    - Provide a `stdnum` in the Query
    - Send a GET request
    - The user from the database will be retrieved
6. /members
    - Send a GET request
    - All members in the database will be retrieved

### Testing with Needle

1. Open the test file `test.js`
2. Go to Tests section
3. Choose tests to run by uncommenting tests to run and commenting tests to skip
4. Run the test file

```shell
npm test.js
```

Note: The /user and /members endpoints can be easily checked through the browser at <http://localhost:3000/user> (provide a query with a `stdnum`) or <http://localhost:3000/members>. There is no test for members in the test.js because there is no fixed expected output for this endpoint.

## References

- [Mongoose](https://mongoosejs.com/) Mongoose Documentation
  - [Built-in Validators](https://mongoosejs.com/docs/validation.html#built-in-validators) - For ensuring that every student has the required fields and have length constraints
  - [Model.updateOne()](https://mongoosejs.com/docs/api/model.html#Model.updateOne()) - Documentation on updating a single document with the useful upsert option that allows the creation of the document if it does not exist
- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - For handling needle's asynchronous nature
- [File system](https://nodejs.org/api/fs.html) - For reading from the data file
- [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) - For JSON methods (stringify)
