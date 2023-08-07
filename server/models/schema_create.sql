-- The following doc contains the schema of MySQL objects being used in the project

-- Uncomment the below line if no DB is there
drop database dfs_db;
create database dfs_db ;
use dfs_db

-- creating schema of User table , assuming user can either be only moderator or normal user but not both
CREATE TABLE User(
    user_id varchar(255),
    user_type varchar(255),
    user_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

-- creating schema of Dataset Table
CREATE TABLE Dataset_name(
    dataset_name varchar(255),
    dataset_created_by varchar(255),
    dataset_id varchar(255),
    dataset_desc varchar(1000),
    dataset_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataset_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (dataset_id),
    FOREIGN KEY (dataset_created_by) REFERENCES User(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema of Dataset Image Table
CREATE TABLE Dataset_image(
    dataset_image_id varchar(255),
    dataset_id varchar(255),
    dataset_image_name varchar(255),
    dataset_image_status varchar(255),
    dataset_image_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (dataset_image_id),
    FOREIGN KEY (dataset_id) REFERENCES Dataset_name(dataset_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema of Dataset Image Comments
CREATE TABLE Image_comment(
    comment_id varchar(255),
    dataset_image_id varchar(255),
    commented_by varchar(255),
    comment_content varchar(10000),
    comment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (dataset_image_id) REFERENCES Dataset_image(dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema of Dataset Label Table
CREATE TABLE Dataset_label(
    dataset_label_name varchar(255),
    dataset_label_color varchar(255),
    dataset_id varchar(255),
    dataset_label_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (dataset_id, dataset_label_name),
    FOREIGN KEY (dataset_id) REFERENCES Dataset_name(dataset_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema of image url
CREATE TABLE Dataset_image_url(
    dataset_image_id varchar(255),
    dataset_image_url varchar(255),
    dataset_image_url_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (dataset_image_id),
    FOREIGN KEY (dataset_image_id) REFERENCES Dataset_image(dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema of Mod annotations table

-- user id and image id are foreign keys, assuming that each image can be moderated by multiple users
CREATE TABLE Mod_annotations(
    user_id varchar (255),
    dataset_image_id varchar(255),
    mod_annotations_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, dataset_image_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (dataset_image_id) REFERENCES Dataset_image(dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema with region id, foreign key is Mod_annotations as necessary to check if  both the image and user are in table
CREATE TABLE Mod_annotations_region(
    mod_annotations_region_id varchar(255),
    mod_annotations_region_color varchar(255),
    mod_annotations_region_is_Complete boolean,
    mod_annotations_region_is_Editable boolean,
    mod_annotations_region_name varchar(255),
    user_id varchar (255),
    dataset_image_id varchar(255),
    mod_annotations_region_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (mod_annotations_region_id),
    FOREIGN KEY (user_id, dataset_image_id) REFERENCES Mod_annotations(user_id, dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema with region point id, foreign key is Mod_annotations_region
CREATE TABLE Mod_annotations_region_point(
    mod_annotations_region_id varchar(255),
    region_point_x int,
    region_point_y int,
    mod_annotations_region_point_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (mod_annotations_region_id) REFERENCES Mod_annotations_region(mod_annotations_region_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- -- creating schema for User annotations table

-- user id and image id are foreign keys, assuming that each image can be annotated by multiple users
CREATE TABLE User_annotations(
    user_id varchar (255),
    dataset_image_id varchar(255),
    user_annotations_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, dataset_image_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (dataset_image_id) REFERENCES Dataset_image(dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema with region id, foreign key is User_annotations
CREATE TABLE User_annotations_region(
    user_annotations_region_id varchar(255),
    user_annotations_region_color varchar(255),
    user_annotations_region_is_Complete boolean,
    user_annotations_region_is_Editable boolean,
    user_annotation_region_name varchar(255),
    user_id varchar (255),
    dataset_image_id varchar(255),
    user_annotations_region_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (user_annotations_region_id),
    FOREIGN KEY (user_id, dataset_image_id) REFERENCES User_annotations(user_id, dataset_image_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- creating schema with region point id, foreign key is User_annotations_region
CREATE TABLE User_annotations_region_point(
    user_annotations_region_id varchar(255),
    region_point_x int,
    region_point_y int,
    user_annotations_region_point_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_annotations_region_id) REFERENCES User_annotations_region(user_annotations_region_id) ON UPDATE CASCADE ON DELETE CASCADE
);