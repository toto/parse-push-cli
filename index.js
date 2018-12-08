require('dotenv').config();
const Parse = require('parse/node');
const commandLineArgs = require('command-line-args');

const PLATFORMS = ['ios', 'tvos'];

const optionDefinitions = [
  { name: 'silent', alias: 's', type: Boolean },
  { name: 'title', alias: 't', type: String },
  { name: 'alert', alias: 'a', type: String },
  { name: 'sound', type: Boolean },
  { name: 'badge', alias: 'b', type: Number },
  { name: 'url', alias: 'u', type: String },
  { name: 'testflight', type: Boolean },
  { name: 'verbose', alias: 'v', type: Boolean },
  {
    name: 'platform', alias: 'p', type: String, defaultValue: 'ios',
  },
];
const cliOptions = commandLineArgs(optionDefinitions);

function pushDataForCliOptions(options) {
  if (!options.alert && !options.silent && !options.badge) {
    return null;
  }
  const { platform } = options;
  if (!platform || !PLATFORMS.includes(platform)) {
    throw new Error(`Platform ${platform} is not valid. Pass one of ${PLATFORMS.join(', ')}`);
  }

  const platformQuery = new Parse.Query(Parse.Installation);
  platformQuery.equalTo('deviceType', platform);
  if (optionDefinitions.testflight) platformQuery.contains('channels', 'testflight');

  const pushContent = { where: platformQuery, data: {} };
  if (options.silent) pushContent.data['content-available'] = 1;
  if (options.alert) pushContent.data.alert = options.alert;
  if (options.title) pushContent.data.title = options.title;
  if (options.badge) pushContent.data.badge = options.badge;
  if (options.sound) pushContent.data.sound = 'default';
  if (options.url) pushContent.data.url = options.url;
  return pushContent;
}

// Config
const {
  PARSE_APP_ID,
  PARSE_SERVER_URL,
  PARSE_KEY,
} = process.env;

if (!PARSE_APP_ID || !PARSE_SERVER_URL || !PARSE_APP_ID) {
  console.error('Please set PARSE_APP_ID, PARSE_KEY and PARSE_SERVER_URL in your .env file.');
  process.exit(-1);
}

Parse.initialize(PARSE_APP_ID, null, PARSE_KEY);
Parse.serverURL = PARSE_SERVER_URL;

// Check CLI options
const pushData = pushDataForCliOptions(cliOptions);
if (!pushData) {
  console.error('You need to at least provide --silent or --alert');
  process.exit(-2);
}

const pushOptions = { useMasterKey: true };

if (cliOptions.verbose) console.info('Send pushes with', pushData);
Parse.Push.send(pushData, pushOptions)
  .then(() => {
    if (cliOptions.verbose) {
      console.info('Done');
    }
  })
  .catch((error) => {
    console.error('Failed to send background pushes with error', error);
  });
