# pLot

pLot is a partially crowd sourced, partially API supported parking application,
for iOS and Android, intended to help users find a parking spot in heavily
populated areas where parking can be manually added by users.

# .env

To run this application locally, it's necessary to create a .env file with the
following information:

  PORT=3000
  DB_NAME=pLot
  DB_HOST=localhost
  GOOGLE_API_KEY=your google API key
  JWT_SECRET=your secret

# react-native-css

This application utilizes the react-native-css package
(see https://github.com/sabeurthabti/react-native-css for more information). This
makes it necessary, if any changes are made to the css file, that it be recompiled
within the terminal to a styles.js before the changes are made available within
the react-native components.

run "react-native-css -i style.css -o style.js -w" from within the Style folder
to compile.

TEST
