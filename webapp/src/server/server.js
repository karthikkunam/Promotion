import express from 'express';
import os from 'os';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import proxy from 'express-http-proxy';
import helmet from 'helmet';
import chalk from 'chalk';
import webpack from 'webpack';
import { loadConfig } from '../../config/config';
import router from './routes/app.router';
import { loginService } from './services/login.service';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db = low(adapter);
const lodash = require('lodash');

const config = require('../../config/webpack.config.dev.client');

const compiler = webpack(config);

let staticPath = config.output.publicPath;

// Load environment variables and configuration.
loadConfig();

const warning = chalk.yellowBright;
const good = chalk.greenBright;
const bad = chalk.redBright;

console.log(`${warning('7BOSS')} ${bad('Application Starting up...')}`);

// let staticPath = '../../dist/web/client';
// let staticPath = '../client';

if (process.env.ENVIRONMENT !== 'local') {
  staticPath = '../client';
} else {
  staticPath += '../public/';
}

const app = express();
// const router = express.Router();

if (process.env.ENVIRONMENT === 'local') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: `${config.output.publicPath}../public`
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
console.log(path.join(__dirname, `${staticPath}`));
app.use(cors());
app.use(express.static(path.join(__dirname, `${staticPath}`)));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(compression()); // Compress all routes
app.use(helmet());

app.use((req, res, next) => {
  if (req.url.indexOf('sockjs-node') <= 0) { console.log(good(`EnvironmentName: ${process.env.ENVIRONMENT} + URL: ${req.url}`)); }
  // set headers to allow cross origin request.
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, accesstoken');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
  res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
  res.setHeader('Expires', '0'); // Proxies.
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());

app.use('/', router);

app.get('/services/storeOffers',function(req,res){
  res.jsonp(db.get("storeOffers"))
});

// app.get('/services/storeOffersDetails',function(req,res){
//   res.jsonp(db.get("storeOffersDetails"))
// });

app.post('/services/updatePromotion',function(req,res){
  res.jsonp(db.post("updatePromotion"))
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send(true);
});

app.get('/api/getUsername', (req, res) => res.send({ username: `${os.userInfo().username} ` }));

app.get('*', (req, res) => {
  if (req.url.indexOf('sockjs-node') <= 0) { console.log(req.url); }
  console.log(`Path directory--> ${path.join(__dirname,  '../client/index.html')}`);
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.all(/^\/services\/(.*)/, async (req, res, next) => {
  loginService.getTokenValid();
  console.log(`Validate Service API ------------------------------------> ${response}`);
}, proxy(process.env.bff_base_url || 'http://localhost:5000', {
  proxyReqPathResolver: (req, res) => {
    return req.url;
  }
}));

app.listen(process.env.PORT || 5000, () => console.log(good(`Listening on port ${process.env.PORT || 5000}!\nClient served from : ${path.join(__dirname, `${staticPath}`)}`)));
