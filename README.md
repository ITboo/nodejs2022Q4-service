# Home Library Service

Welcome to a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!
REST endpoints with separate router paths were created for Users, Artists, Albums, Tracks and Favorites;

Service listens on PORT 4000 by default, PORT value is stored in .env file.
https://github.com/ITboo/nodejs2022Q4-service/blob/a749285fd75d023a40922346fe88ed22124cb042/.env.example#L1


## Downloading

```
git clone https://github.com/ITboo/nodejs2022Q4-service.git
```

## Change branch

```
cd nodejs2022Q4-service
```

## Installing NPM modules

```
npm install
```

## Rename .env.example file with .env

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

## Docker

```
npm run docker
```
! If you have some errors bringing up the project after running Docker, you may try to clean cache by using

```
docker builder prune -a
```