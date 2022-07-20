# censored-words
This web application will remove given keywords and phrases from a document and insert XXXX at the locations where text was removed.


## How to run

1. Clone the project - `git clone git@github.com:Jordanirabor/censored-words.git`
2. Install dependencies - `npm install`
3. Run development server - `npm run start`
4. The application should be running locally on this adddess - http://localhost:3333/

## How to use

1. Enter keywords and phrases into text area (keywords can be space or comma delimited and phrases can be within single or double quotes)
2. Choose the document (`.txt`) to be updated
3. Click on the button that says "Mask"
4. The updated document will be automatically downloaded with the keywords and phrases masked out.

## Running tests

1. `npm run test`
