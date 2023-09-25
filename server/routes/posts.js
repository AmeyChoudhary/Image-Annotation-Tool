const express = require("express");
const router = express.Router();
const { execSql, SQL_INJ_ERROR } = require('./db');
// requiring uuid
const { v4: uuidv4 } = require('uuid');
const { json } = require("body-parser");

router.post("/add_user_annotation", async (req, res) => {
    try {
        var dataset_user_id = req.body.user_id;
        var dataset_image_id = req.body.image_id;
        var regions = req.body.regions; // regions will be an array of objects

        if (dataset_image_id && dataset_user_id) {
            let query = `INSERT INTO User_annotations VALUES ( "${dataset_user_id}", "${dataset_image_id}", DEFAULT )`;
            await execSql(query);
        } else {
            res.status(400).send("Invalid Request");
            return;
        }

        for (let region of regions) {
            var region_id = region.id;
            var region_color = region.color;
            var region_is_editable = region.is_editable;
            if (region_is_editable === "T") {
                region_is_editable = true;
            }
            else {
                region_is_editable = false;
            }
            var region_is_complete = region.isComplete;
            if (region_is_complete === "T") {
                region_is_complete = true;
            }
            else {
                region_is_complete = false;
            }
            var region_name = region.name;

            if (region_id && region_color && region_name) {
                let query = `INSERT INTO User_annotations_region VALUES ('${region_id}', '${region_color}', ${region_is_complete},${region_is_editable},'${region_name}','${dataset_user_id}', '${dataset_image_id}', DEFAULT)`;
                await execSql(query);

                var region_points = region.points; // points will be an array of objects

                for (let point of region_points) {
                    var point_x = point.x;
                    var point_y = point.y;

                    if (point_x && point_y) {
                        let query = `INSERT INTO User_annotations_region_point VALUES ('${region_id}',${point_x},${point_y},DEFAULT)`;
                        await execSql(query);
                    } else {
                        res.status(400).send("Invalid Request");
                        return;
                    }
                }
            } else {
                res.status(400).send("Invalid Request");
                return;
            }
        }

        // Send the response after all operations are completed
        res.status(200).send("User annotation added successfully");
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/add_mod_annotation", async (req, res) => {
    try {
        var dataset_mod_id = req.body.user_id;
        var dataset_image_id = req.body.image_id;
        var regions = req.body.regions; // regions will be an array of objects

        if (dataset_image_id && dataset_mod_id) {
            let query = `INSERT INTO Mod_annotations VALUES ( "${dataset_mod_id}", "${dataset_image_id}", DEFAULT )`;
            await execSql(query);
        } else {
            res.status(400).send("Invalid Request");
            return;
        }

        for (let region of regions) {
            var region_id = region.id;
            var region_color = region.color;
            var region_is_editable = region.is_editable;
            if (region_is_editable === "T") {
                region_is_editable = true;
            }
            else {
                region_is_editable = false;
            }
            var region_is_complete = region.isComplete;
            if (region_is_complete === "T") {
                region_is_complete = true;
            }
            else {
                region_is_complete = false;
            }
            var region_name = region.name;

            if (region_id && region_color && region_name) {
                let query = `INSERT INTO Mod_annotations_region VALUES ('${region_id}', '${region_color}', ${region_is_complete},${region_is_editable},'${region_name}','${dataset_mod_id}', '${dataset_image_id}', DEFAULT)`;
                await execSql(query);

                var region_points = region.points; // points will be an array of objects

                for (let point of region_points) {
                    var point_x = point.x;
                    var point_y = point.y;

                    if (point_x && point_y) {
                        let query = `INSERT INTO Mod_annotations_region_point VALUES ('${region_id}',${point_x},${point_y},DEFAULT)`;
                        await execSql(query);
                    } else {
                        res.status(400).send("Invalid Request");
                        return;
                    }
                }
            } else {
                res.status(400).send("Invalid Request");
                return;
            }
        }

        // Send the response after all operations are completed
        res.status(200).send("Mod annotation added successfully");
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/add_image", async (req, res) => {
    try {
        var dataset_image_url = req.body.image_url;
        var dataset_image_id = uuidv4();
        var dataset_id = req.body.dataset_id;
        var image_name = req.body.image_name;
        var image_status = req.body.image_status;

        if (dataset_image_url && dataset_id) {
            let query2 = `INSERT INTO Dataset_image_url VALUES ('${dataset_image_id}','${dataset_image_url}', DEFAULT)`;
            let query1 = `INSERT INTO Dataset_image VALUES ('${dataset_image_id}','${dataset_id}','${image_name}','${image_status}', DEFAULT)`;
            execSql(query1)
                .then((result1) => {
                    execSql(query2)
                        .then((result2) => {
                            res.status(200).send(result2);
                        })
                        .catch((err) => {
                            console.log("Error: ", err);
                        })

                })
                .catch((err) => {
                    console.log("Error: ", err);
                })
        }
        else {
            res.status(400).send("Invalid Request1");
        }
    }
    catch (err) {
        res.status(400).send("Invalid Request2");
    }
});



router.post("/add_comment", async (req, res) => {
    try {
        // var dataset_image_url = req.body.url;
        var dataset_image_id = req.body.image_id;
        var comment_id = uuidv4();
        var commented_by = req.body.commented_by;
        var content = req.body.content;

        if (dataset_image_id) {
            let query = `INSERT INTO Image_comment VALUES ('${comment_id}','${dataset_image_id}','${commented_by}','${content}', DEFAULT)`;
            execSql(query)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    console.log("Error: ", err);
                })
        }
        else {
            res.status(400).send("Invalid Request");
        }
    }
    catch (err) {
        res.status(400).send("Invalid Request");
    }
});

router.get('/get_comment/:image_id', (req, res) => {
    try {
        var image_id = req.params.image_id;
        if (image_id) {
            let query = `select * from Image_comment where dataset_image_id='${image_id}'`;
            execSql(query)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    console.log("Error :", err);
                })
        }
        else {
            res.status(400).send("Invalid Request : No Image_Id");
        }
    }
    catch (err) {
        res.status(400).send("Invalid Request,wrong");
    }

});

router.get('/get_image_id/:dataset_id', (req, res) => {
    try {
        var dataset_id = req.params.dataset_id;
        if (dataset_id) {
            let query = `select * from Dataset_image where dataset_id='${dataset_id}'`;
            execSql(query)
                .then((result) => {
                    res.status(200).send(result);
                })
                .catch((err) => {
                    console.log("Error :", err);
                })
        }
        else {
            res.status(400).send("Invalid Request : No Image_Id");
        }
    }
    catch (err) {
        res.status(400).send("Invalid Request,wrong");
    }

});


router.post('/add_dataset', (req, res) => {
    try {
        var dataset_name = req.body.dataset_name;
        var image_ids = req.body.image_ids; // image_ids will be an array of objects
        var labels = req.body.labels; // labels will be an array of objects
        var description = req.body.description;

        // ask if this is okay
        var dataset_id = uuidv4();
        var dataset_created_by = req.body.user_id;

        if (dataset_name) {
            let query1 = `INSERT IGNORE INTO User VALUES ("${dataset_created_by}","Permanent",DEFAULT)`;
            let query = `INSERT INTO Dataset_name VALUES ("${dataset_name}","${dataset_created_by}","${dataset_id}", "${description}",DEFAULT, DEFAULT)`;
            console.log(query)
            execSql(query1).then((result1) => {
                execSql(query).then((result2) => {
                    res.status(200).send(dataset_id);
                })
            })
                .catch((err) => {
                    console.log("Error: ", err);
                })
        }
        else {
            res.status(400).send("Invalid Request");
        }

        image_ids.forEach((image_id) => {
            if (image_id) {
                let query = `INSERT INTO Dataset_image VALUES ("${image_id}","${dataset_id}", DEFAULT)`;
                execSql(query)
                    .then((result) => {
                        console.log("Result: ", result);
                        res.status(200).send(result);
                    })
                    .catch((err) => {
                        console.log("Error: ", err);
                    })
            }
            else {
                res.status(400).send("Invalid Request");
            }
        })

        labels.forEach((label) => {
            var label_name = label.name;
            var label_color = label.color;

            if (label_name && label_color) {
                let query = `INSERT INTO Dataset_label VALUES ("${label_name}","${label_color}","${dataset_id}", DEFAULT)`;
                execSql(query)
                    .then((result) => {
                        console.log("Result: ", result);
                        res.status(200).send(dataset_id);
                    })
                    .catch((err) => {
                        console.log("Error: ", err);
                    })
            }
            else {
                res.status(400).send("Invalid Request");
            }
        })
    }
    catch (err) {
        res.status(400).send("Invalid Request,wrong");
    }


});

router.put("/add_label/:dataset_name", async (req, res) => {
    try {
        var dataset_name = req.params.dataset_name;
        // this is actually user_id
        var labels = req.body.labels; // labels will be an array of objects
        var user_id = getUserId(req);
        var dataset_id = null;

        // if (dataset_name) {
        //     dataset_id = await fetchDatasetId(dataset_name, user_id);
        // }

        dataset_id = dataset_name;

        if (dataset_id) {
            for (let label of labels) {
                var label_name = label.name;
                var label_color = label.color;

                if (label_name && label_color) {
                    let query = `INSERT INTO Dataset_label VALUES ( "${label_name}", "${label_color}", "${dataset_id}", DEFAULT )`;
                    execSql(query)
                        .then((result) => {
                            console.log("Result: ", result);
                            res.status(200).send(result);
                        })
                        .catch((err) => {
                            console.log("Error: ", err);
                        })
                }
                else {
                    res.status(400).send("Invalid Request");
                }
            }
        }

    }
    catch (err) {
        console.log("Error: ", err);
        res.status(400).send("Invalid Request");
    }
});

// gets  all user annotations for a particular image
router.get("/get_image_user_annotations/:image_id", async (req, res) => {
    try {
        var image_id = req.params.image_id;
        // sql query to join User_annotations_region (given image)id and User_annotations_region_points based on region_id ,
        let query = `SELECT * FROM User_annotations_region INNER JOIN User_annotations_region_point ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id WHERE User_annotations_region.dataset_image_id = '${image_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }
    catch (err) {
        res.status(400).send("Invalid Request");
    }

});

// gets all labels for a particular dataset
router.get("/get_images_labels/:dataset_name", async (req, res) => {
    try {
        // dataset_name is actually dataset_id
        var dataset_id = req.params.dataset_name;
        var dataset_name = await fetchDatasetName(dataset_id);
        var user_id = await fetchUserIdfromDatasetId(dataset_id);
        // sql query to get labels for a particular dataset
        let query = `SELECT * FROM Dataset_label INNER JOIN Dataset_name ON Dataset_label.dataset_id = Dataset_name.dataset_id WHERE Dataset_name.dataset_name = '${dataset_name}' AND Dataset_name.dataset_created_by = '${user_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }
    catch (err) {
        res.status(400).send("Invalid Request");
    }

});

// gets image url
router.get("/get_image_url/:image_id", async (req, res) => {
    try {
        var image_id = req.params.image_id;
        let query = `SELECT * FROM Dataset_image_url WHERE dataset_image_id = '${image_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }
    catch (err) {
        res.status(400).send("Invalid Request");
    }

});

// gets all the annotations done by mod for that particular image
router.get("/get_mod_annotation/:imageId", async (req, res) => {
    let user_id = getUserId(req);
    let image_id = req.params.imageId;
    try {
        let query = `SELECT * FROM Mod_annotations_region INNER JOIN Mod_annotations_region_point ON Mod_annotations_region.mod_annotations_region_id = Mod_annotations_region_point.mod_annotations_region_id WHERE Mod_annotations_region.dataset_image_id = '${image_id}' AND Mod_annotations_region.user_id = '${user_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// gets all the annotations done by user for that particular image
router.get("/get_user_annotation/:imageId", async (req, res) => {
    let user_id = getUserId(req);
    console.log("User id: ", user_id);
    let image_id = req.params.imageId;
    try {
        let query = `SELECT * FROM User_annotations_region INNER JOIN User_annotations_region_point ON User_annotations_region.user_annotations_region_id = User_annotations_region_point.user_annotations_region_id WHERE User_annotations_region.dataset_image_id = '${image_id}' AND User_annotations_region.user_id = '${user_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// gets all the dataset details from the dataset_name table using the author_name
router.get("/get_dataset/:dataset_created_by", async (req, res) => {
    let dataset_created_by = req.params.dataset_created_by;
    // console.log(dataset_id, req.body.dataset_id);
    try {
        let query = `SELECT * FROM Dataset_name WHERE dataset_created_by='${dataset_created_by}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// gets all the dataset details from the dataset_name table using the dataset_id
router.get("/get_dataset_id/:dataset_id", async (req, res) => {
    let dataset_id = req.params.dataset_id;
    // console.log(dataset_id, req.body.dataset_id);
    try {
        let query = `SELECT * FROM Dataset_name WHERE dataset_id ='${dataset_id}'`;
        execSql(query)
            .then((result) => {
                console.log("Result: ", result);
                res.status(200).send(result);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// // gets all the dervied dataset details from the dataset_name table using the dataset_id
// router.get("/get_dataset_dervied/:dataset_id", async (req, res) => {
//     let dataset_id = req.params.dataset_id;
//     // get details like Total Images , 
//     console.log(dataset_id, req.body.dataset_id);
//     try {
//         let query = `SELECT * FROM Dataset_name WHERE dataset_id='${dataset_id}'`;
//         execSql(query)
//             .then((result) => {
//                 console.log("Result: ", result);
//                 res.status(200).send(result);
//             })
//             .catch((err) => {
//                 console.log("Error: ", err);
//             })
//     } catch (err) {
//         res.status(400).json({
//             status: 400,
//             message: err.message,
//         });
//     }
// });

function getUserId(request) {
    // Extract user_id from authentication JWT token. 
    let user_id = request.headers['auth-token'];
    console.log(request.headers);
    return user_id;
}

async function fetchDatasetId(dataset_name, user_id) {
    let query = `SELECT dataset_id FROM Dataset_name WHERE dataset_name = '${dataset_name}' AND dataset_created_by = '${user_id}'`;
    try {
        const result = await execSql(query);
        console.log(result[0].dataset_id + ":from fetchDatasetId");
        return result[0].dataset_id;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    }
}

async function fetchDatasetName(dataset_id){
    let query = `SELECT dataset_name FROM Dataset_name WHERE dataset_id = '${dataset_id}'`;
    try {
        const result = await execSql(query);
        console.log(result[0].dataset_name + ":from fetchDatasetName");
        return result[0].dataset_name;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    }
}

async function fetchUserIdfromDatasetId(dataset_id){
    let query = `SELECT dataset_created_by FROM Dataset_name WHERE dataset_id = '${dataset_id}'`;
    try {
        const result = await execSql(query);
        console.log(result[0].dataset_created_by + ":from fetchUserIdfromDatasetId");
        return result[0].dataset_created_by;
    } catch (err) {
        console.log("Error: ", err);
        throw err;
    }
}




module.exports = router;