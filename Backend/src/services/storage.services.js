const { ImageKit } = require("@imagekit/nodejs");

const imgkit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(buffer) {
    const result = await imgkit.files.upload({
        file: buffer.toString("base64"),
        fileName: "image.jpg"
    });

    return result;
}

module.exports = uploadFile;