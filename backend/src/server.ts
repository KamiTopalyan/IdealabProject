import app from "./app";
import mongoose from "mongoose";

const port = 5000;

mongoose.connect("mongodb://localhost:27017")
    .then(() => {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on port: " + port);
        });
    })
    .catch(console.error);