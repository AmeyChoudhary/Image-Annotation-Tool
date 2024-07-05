# Image-Annotation-Tool

This repository contains an extended version of an image annotation tool. The tool allows users to import images from online databases, annotate and label them, and save the changes locally. 

## Workflow of the tool:
1. The user is first asked to login with their credentials. Once logged in, the user can view, add and modify their datasets. These datasets are stored in an online database (minIO).
2. The user can then annotate a particular dataset too. On selection, the user is redirected to an image annotation tool and the images of the dataset are loaded into the tool as thumbnails.
3. The user can select any image and it is displayed on the canvas. The user can annotate the image using tools like polygon, rectangle, free hand .etc. to mark certain regions of the image with custom labels.
4. The user can opt to save these annotations. These annotations are saved locally, in an SQL database, with a corresponding image ID. The image is not stored locally.
5. The user can then load these saved annotations back onto the image in future.

## Structure of the repository:
1. The 'client' folder is responsible for the user interface. It contains the code for the homepage, and the user image annotation tool.
2. The 'server' folder is responsible for the backend of the image annotation tool. It contains code to save and load annotations in the SQL server, and schema for MongoDB.
3. The 'minio server' folder is responsible for connecting with the minIO database, and importing the requested images into an image viewer.

## Instructions to run: 
1. Install the necessary libraries by running the following command in all the 3 folders:
` npm i `
2. Change the credentials to your local system's SQL in 'server/routes/' folder and minIO database in 'minio server/minioConfig.js'.
3. Use `npm start` in the 'client' and 'server' folder to launch the frontend and backend.
