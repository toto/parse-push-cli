# parse-push-cli

Sends out pushes to all iOS (or tvOS) devices registered in Parse. Currently only targets to iOS or tvOS.

## Configuration

Create a `.env` file in the repo or set environment variables. Set the following variables:

- `PARSE_APP_ID`: App id used for this parse app `some-fancy-app`
- `PARSE_SERVER_URL`: Parse server URL e.g. `https://example.com/parse`
- `PARSE_KEY`: The _master key_ (_not_ the JS key) configured for the server

## Usage

After config supply CLI options. Either `--silent` or `--title` is required

- `-l/--language`: Target language starting the the argument. Eg. `-l de` targets German devices
- `-s/--silent`: Send silent push (Note: Can be combined with `-t` etc. to send low priority push that still wakes the app in the background)
- `-a/--alert`: Body/alert
- `-t/--title`: Optional title to set
- `--sound`: Sends the `default` alert sound
- `--url`: Sets a key `url` into the payload with the given value. Used for e.g. deep-linking. Note that using this requires handling this in the iOS/tvOS app.
- `--badge`: Needs to be a `number`, sets the badge
- `-p/--platform`: Valid values are `ios` or `tvos`. Defaults to `ios`. Note that tvOS only processes `--silent` or `--badge` pushes.
- `--timesensetive`: If set send push with `time-sensetive` interruption level (required entitlment in the app)
