# Description

This project holds the solution to sessions backend assessment.The main requirement is to build a nodejs service that receives an image url, fetches the image and uploads it to S3 bucket.

## Functionalities

- **Image upload** - The `storeimage` endpoint accepts a POST request with an `imageUrl`. The content of the image from this URL is read into a buffer and then uploaded to s3 bucket. The endpoint returns the `imageKey` on successful upload.

- **Image Retrieval** - `imageKey` received from the storeimage endpoint can be passed to the `getimage` endpoint as a query parameter. This fetches the stored object from S3 and returns a presigned url(with expiry of 100000secs),that can then be used to access the stored image.

## Usage

### Running Locally

The following steps outline how this project can be run locally. In other to emulate the API gateway and lambda locally, the serverless-offline plugin has been used.

- Ensure to have Nodejs v18 installed
- run `npm install` command at the root of the project to install all required dependencies.
- once all dependencies are installed, start the project using the `npm start` script . This will expose the api by default on port 3000. You can specify a custom port by adding the flag `-- httPort <portNumber`> to the start script in package.json.

## Testing

- Unit testing for the core functionalities (validating image extension,retrieving object from s3 and uploading object to s3) were implemented. This can be tested by running the `npm test` command.

- The endpoints can be tested in two ways:

  - Running the requests in the shared postman json collection(This will be shared with the assignment submission)

    - To test the locally running version,select local environment in postman and ensure you still have the server running (`npm start`).
    - To test the deployed version,select develop environment in postman.

  - Using curl

    - Test the endpoints using curl command. Below are example curl requests for the image upload endpoint and image retrieval endpoint (the -- location can also be pointed to the locally running version i.e `localhost:3000/v1/storeimage` and `localhost:3000/v1/getimage`)

    **image upload**

    ```
        curl --location 'https://lpkytpwhoc.execute-api.eu-west-2.amazonaws.com/v1/storeimage'  --header 'Content-Type: application/json'  --data '{ "imageUrl": "https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" }'
    ```

    **get image** - using the imageKey returned from the above request

    ```
        curl --location 'https://lpkytpwhoc.execute-api.eu-west-2.amazonaws.com/v1/getimage?imageKey=sessions-image-1716260056300.jpg'
    ```
