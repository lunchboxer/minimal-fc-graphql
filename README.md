# Minimal Graphql Alibaba Cloud FC function

This is a kind of starter for a graphql api function to host on Alibaba Cloud. It works, at least at the time of writing.

## Build

Alibaba Cloud Function Compute would normally have one gzip and upload the entire directory in the process of deploying. This includes node_modules and all the devDependencies. Using the Serverless cli would allow one to omit the devDependencies but would still upload the rest of the directory including node_modules. This uses a lot of network traffic and can quickly push your function close to the 50mb limit.

Instead we bundle our function with rollup. The whole directory is 24mb, and the bundled function is 736k. Most of that 24mb is, in fact Rollup, the bundler and it's dependencies, but add in your normal devDependencies like tests, linters and formatters, etc and you're back to a pretty big package.

```
npm run build
```

or

```
yarn build
```

You can also watch for changes and build as you develop.

```
npm run dev
```

The details of the deployment are kept in `template.yml`. You'll need to install `fun` to be able to make use of it. When the time is right...

```
fun validate
fun deploy
```

