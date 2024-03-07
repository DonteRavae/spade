# SPADE Mental Health

SPADE Mental Health is a web application designed to provide the community a judgement free zone to discuss and seek guidance regarding their mental health.

SPADE Mental Health was created by Anthony Henderson and he is the host of SPADE: The Podcast.

## Development

The web application is built on top of the Remix framework. Authentication is handled by Firebase Authentication and MySQL is the database of choice.

For those looking to test the application, start the Remix development asset server and the Express server by running:

```sh
npm run dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.