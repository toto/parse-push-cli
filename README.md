# parse-push-cli

Sends out silent pushes to all (iOS) devices registered in Parse. Should be used after data update. Note that this limits targets to iOS only atm. 

## Configuration

Create a `.env` file in the repo. Set the following variables:

- `PARSE_APP_ID`: App id used for this parse app `some-fancy-app`
- `PARSE_SERVER_URL`: Parse server URL e.g. `https://example.com/parse`
- `PARSE_KEY`: The _Master-Key_ (*not* the JS key) configured for the server

## Usage

After config supply CLI options. Either `--silent` or `--title` is required

- `-s/--silent`: Send silent push (Note: Can be combined with `-t` etc. to send low priority push that still wakes the app in the background)
- `-a/--alert`: Body/alert
- `-t/--title`: Title to set (Optional)
- `--sound`: Sends the `default` alert sound
- `--url`: Sets a key `url` into the payload with the given value. Used for e.g. deep-linking.
- `--badge`: Needs to be a `number`, sets the badge