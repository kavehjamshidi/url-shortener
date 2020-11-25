# url-shortener

A simple URL Shortener using Node.js, Express, and MongoDB.  
URLs will have a unique pathname with the length of 8 characters. The length can be adjusted by changing the number in [this line](https://github.com/kavehjamshidi/url-shortener/blob/16e362c1730ae16bf775e6bb8cfd97674c24185d/models/url.js#L19) of code.

## Using this repo

### Clone

```bash
$ git clone git@github.com:kavehjamshidi/url-shortener.git
$ cd url-shortner
```

### Installing the dependencies

```bash
$ npm install
```

### Setting up environment variables

Currently **three** environment variables need to be set for this project to work, including:

- PORT: Port number
- DOMAIN_NAME: The string which will be attached to the beginning of each unique pathname. For example, if the short URL should be `https://abc.com/Jnwk151fdfoR`, then the domain name should be `https://abc.com/` **Pay attention to the trailing forward slash!**.
- DB_URI: [MongoDB connection URI](https://docs.mongodb.com/manual/reference/connection-string/)

These environment variable could be set at OS level or be placed in a .env file located at the root of the project (not recommended).

### Running the project

```bash
$ npm start
```
