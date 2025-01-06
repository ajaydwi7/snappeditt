const mongoose = require("mongoose");
const Category = require("./models/Category");

mongoose
  .connect(
    "mongodb+srv://ajaydwi7:Raja%23dwi7@cluster0.zy0by.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

const categories = [
  {
    name: "Real Estate",
    slug: "real-estate",
    description: "Services related to real estate.",
    subCategories: [
      {
        name: "Real Estate Packages",
        slug: "real-estate-packages",
        description:
          "This Categories holds all the services offered by Snappeditt.",
        services: [
          {
            name: "Single Exposure",
            slug: "single-exposure",
            description:
              "This service is suitable for clients who needs perfect and natural color tone. Our professional editors work on a photo with modern digital photo editing tools to provide the best possible result of the given property with proper tones and colors.",
            price: 0.45,
            featureImage:
              "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885322/Real-Estate-Single_Exposure-S-Corrected-1_lxtkk9.jpg",

            retouchingTypes: [
              {
                name: "Standard",
                description: "Basic retouching for standard needs.",
              },
            ],
            features: [
              { name: "Color Correction", included: true },
              { name: "Color Cast Removal – Minimal", included: true },
              { name: "Lens Correction", included: true },
              { name: "Perspective Correction", included: true },
              { name: "Sharpening", included: true },
              { name: "Output: JPEG,TIFF,PSD.", included: true },
            ],
            images: [
              {
                before:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885319/Real-Estate-Single_Exposure-S-Raw-1_whtoym.jpg",
                after:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885322/Real-Estate-Single_Exposure-S-Corrected-1_lxtkk9.jpg",
              },

              {
                before:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885322/Real-Estate-Single_Exposure-S-Raw-2_nvdebu.jpg",
                after:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885318/Real-Estate-Single_Exposure-S-Corrected-2_l1nx4i.jpg",
              },
              {
                before:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885316/Real-Estate-Single_Exposure-S-Raw-3_lkoffk.jpg",
                after:
                  "https://res.cloudinary.com/dyoqduyyu/image/upload/v1732885316/Real-Estate-Single_Exposure-S-Corrected-3_lxx7ca.jpg",
              },
            ],
            formFields: [
              {
                name: "Order Name",
                type: "text",
                placeholder: "Enter order name",
                required: true,
              },
              {
                name: "Order Image",
                type: "url",
                placeholder:
                  "Provide WeTransfer  Dropbox or any cloud based link for RAW images.",
                required: true,
              },
              {
                name: "Additional Order Details",
                type: "text",
                placeholder: "Additional Order Details*",
                required: false,
              },
              {
                name: "Image Number",
                type: "number",
                placeholder: "",
                id: "imageNumber",
                required: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await Category.deleteMany(); // Clear existing categories
    await Category.insertMany(categories); // Insert new categories and subcategories
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    mongoose.connection.close();
  }
};

seedDatabase();
