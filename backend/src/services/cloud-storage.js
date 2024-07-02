const { Storage } = require("@google-cloud/storage");

keyPath =
  process.env.NODE_ENV === "production"
    ? "/app/gcp_key.json"
    : "./gcp_key.json";

const storage = new Storage({
  projectId: "lunar-terra-426809-d3",
  keyFilename: keyPath,
});

const uploadToFirebaseStorage = async (filepath, fileName) => {
  try {
    const gcs = storage.bucket("gs://blog-app-bucket-5543");
    const storagepath = `blog-app-bucket-5543/${fileName}`;

    const result = await gcs.upload(filepath, {
      destination: storagepath,
      public: true,
      metadata: {
        contentType: "application/plain", //application/csv for excel or csv file upload
      },
    });
    return result[0].metadata.mediaLink;
  } catch (error) {
    console.log("ERROR IN FIREBASE \n" + error);
    throw new Error(error.message);
  }
};

const deleteFromFirebaseStorage = async (fileName) => {
  try {
    const gcs = storage.bucket("gs://blog-app-bucket-5543");
    const file = gcs.file(fileName);
    await file.delete();
    return true;
  } catch (error) {
    console.log("ERROR IN FIREBASE \n" + error);
    throw new Error(error.message);
  }
};

const GoogleCloudService = {
  uploadToFirebaseStorage,
  deleteFromFirebaseStorage,
};

module.exports = GoogleCloudService;

//path: backend/src/services/cloud-storage.js
