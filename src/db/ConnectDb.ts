import { createConnection } from "typeorm";
import { Photo } from "../entities/photos";
import { Post } from "../entities/Post";
import { Question } from "../entities/Questions";
import { User } from "../entities/userEntity";
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "typeormpractice",
  synchronize: true,
  logging: true,
  entities: [User, Photo, Post, Question],
})
  .then((connection) => {
    console.log("Connected to DB");
  })
  .catch((error) => console.log(error));
