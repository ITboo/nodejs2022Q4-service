# Home Library Service

Welcome to a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!
REST endpoints with separate router paths were created for Users, Artists, Albums, Tracks and Favorites;

Service listens on PORT 4000 by default, PORT value is stored in .env file.
https://github.com/ITboo/nodejs2022Q4-service/blob/a749285fd75d023a40922346fe88ed22124cb042/.env.example#L1


## Downloading

```
git clone https://github.com/ITboo/nodejs2022Q4-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

