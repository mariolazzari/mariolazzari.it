require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./Sitemap").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://www.mariolazzari.it")
    .save("./public/sitemap.xml");
}

generateSitemap();
