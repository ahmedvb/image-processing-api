# image-processing-api
a simple api that can resize images
## 📖 Overview

It is a simple application that help to resize images that stored in a certain location.

then it store the result file in the resized folder, then return the resized image for the caller.

when recall an image, the application return the stored image before so it cash the previous calls.

## How the application work

- it contains assets folder that contains original folder which contains the image files that will be resized.
- the assets folder contains also the resized folder which will contain the resized images.
- the output of the application are contained in the "build" folder in the root of the application.
- To start the application use "npm run start", which start the server on port 3000.
- To access the api use "http://localhost:3000/resize?name={the file name without extension}&width={the required width}&height={the required height}".
- To start the application in development mode use : npm run dev , which run the server on port 3000 then watch the changes of the files.
- To build the application use : npm run build, the built files will be in build folder.
- To lint files use : npm run lint.
- To apply unit test use : npm run test, which check for data validation and processing.
