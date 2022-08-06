# Econtinuum (Back-end)

[Front-end Repository](https://github.com/VanekCheck/Econtinuum)

Application in Action - [Econtinuum](http://eco-ntinuum.herokuapp.com/)


### API functionality
- /register
- /login
- /activities
- /task
- /taskHistory
- /userInformation
- /rating
- /tasks/done
- /user/points

### Run The App Locally

```sh
npm i
```

- rename `.env.template` to `.env`
- setup values for - PORT, MONGO_URL, TOKEN_KEY

```sh
node index.js
```

- Server will be running on http://localhost:{PORT}/
