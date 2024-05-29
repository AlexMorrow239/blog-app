const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  categoryIds: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXf39+zs7OwsLDIyMji4uLY2Ni7u7vV1dW+vr7MzMy1tbXe3t64uLjPz8/S0tLCwsK7aJHvAAABeUlEQVR4nO3ZwXKCMBRA0RgSFaT6/39bgdIWOgwLF9Q356wc3HAHE5KYEgAAAAAAAAAAAAAAAAAAAAAAAAAAwEHKrqPv8EX3U95xvh19jy+55dOe/Hjrp1j3C0/nAIXbP9EghY9mUx+iMF+259FrkMLhU6k1/UkJVFja7jno2nVLnMLSTDNOs4qJUzi/FvPq7R6msHzMhe3y6ziF7Vy4+pnGKbzMhffl12EKU+qnwm68WO5tnaoCFdZu+NDV4dpzYs25HyMDFabUXq/NOJN+TTvPbVN7C1X4vdetP/umfI2yLl1cGofk701VsMLyGOK6pss5ZuE0CHMtpTbzg4xVeJtWNkNTKZdHvMLSL5JKOQcrnAbh6Wf5HeptkYa1zDgIfw/LYIXjHmqx+A5WuBqE46UghXU6dZrehBFPoubz0u+1Wrzz0h0K/7l+76+nnD+OvscXtdtH+pP7ez/CtP8X6dH3BwAAAAAAAAAAAAAAAAAAAAAAAAAAbPkEIJMLx9P6xscAAAAASUVORK5CYII=",
  },
  content: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
