import express from "express";
const router = express.Router();
const app = express();
import formidable from "formidable";
import cors from 'cors';
import fs from 'fs';
import bodyParser from "body-parser";
app.use(cors());
app.use(bodyParser.json());
import { minioClient } from '../minioConfig.js';
import ConvertTiff from 'tiff-to-png'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/:url", function (req, res) {
    try {
        const datasetName = req.params.url; // get this from database (sql)
        minioClient.bucketExists("datafoundation-dev", function (err, exists) {
            if (err) {
                console.log("here", err);
            }
            if (exists) {
                //
            }
            console.log("trying to fetch")
            const objects = [];
            const stream = minioClient.listObjects("datafoundation-dev" , "team_dev/" + datasetName , true);
            console.log("stream collected");
            stream.on('data', (obj) => {
                objects.push(obj.name);
            });

            stream.on('error', (err) => {
                console.error('Error listing objects:', err);
                res.status(500).json({ error: 'Failed to list objects' });
            });

            stream.on('end', () => {
                console.log('Listing objects completed.');
                res.json({ objects });
            });
        })
    } catch (err) {
        console.log(err.message);
        res.send({ err })
    }

});

router.post("/:url", async function (req, res) {
    try {
        const form = formidable({ multiples: false });

        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.status(400).json({ error: "Failed to parse form data" });
                return;
            }

            let path = files.file[0].filepath;


            const datasetName = req.params.url;
            let fileName = files.file[0].originalFilename;
            minioClient.bucketExists("datafoundation-dev", function (err, exists) {
                if (err) {
                    console.log("here");
                }
                if (exists) {
                    minioClient.fPutObject("datafoundation-dev", "team_dev/" + datasetName + "/" + fileName, path, function (err, objInfo) {
                        if (err) {
                            res.status(400).json({ error: "Failed to upload" })
                        }
                        console.log("Success", objInfo.etag, objInfo.versionId)
                        res.status(200).json({ data: objInfo })
                    })
                }


            })

        })
    } catch (err) {
        console.log(err.message);
        res.send({ err })
    }
});

export default router;