const fs = require("fs");
const path = require("path");


const getRandomImage = () => {
  const directory = "./images";
  const files = fs.readdirSync(directory);

  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  const randomIndex = Math.floor(Math.random() * imageFiles.length);

  return path.join(directory, imageFiles[randomIndex]);
};

module.exports = { getRandomImage };
