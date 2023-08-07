import express from "express";
const router = express.Router();
const app = express();
import cors from 'cors';
import bodyParser from "body-parser";
app.use(cors());
app.use(bodyParser.json());
import { minioClient } from '../minioConfig.js';



router.get("/:url", function (req, res) {
    try {
        const datasetName = req.params.url;
        let count = 0;
        minioClient.bucketExists("datafoundation-dev", function (err, exists) {
            if (err) {
                console.log("harsh");
            }
            if (exists) {
                const stream = minioClient.listObjects("datafoundation-dev", "team_dev/" + datasetName, true);
                console.log("harsh: stream collected");

                stream.on('data', (obj) => {
                    count++;
                });

                stream.on('error', (err) => {
                    console.error('harsh : Error listing objects:', err);
                    res.status(500).json({ error: 'harsh: Failed to list objects' });
                });

                stream.on('end', () => {
                    console.log('harsh: Listing objects completed.');
                    res.send({ count });
                    console.log(count)
                });
            }
            else {
                console.log(count);
                res.send({ count })
            }
        })
    } catch (err) {
        console.log(err.message);
        res.send({ err })
    }

});

export default router;