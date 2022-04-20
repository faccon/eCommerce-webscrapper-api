require("dotenv").config();
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const { men_accessories_types, special_cat_women } = require("./models");
const app = express();

const general_cat = [
  "shirts",
  "dresses",
  "skirts",
  "shorts",
  "socks",
  "jeans",
  "accessories",
];

function scrapper(category, gender, type, brand) {
  let url;
  if (!brand) {
    if (!type && general_cat.includes(category)) {
      url = `${process.env.BASE_URL}gender-${gender}-category-${category}-0`;
    } else if (!type && category && !general_cat.includes(category)) {
      // Other links
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}-0`;
    } else if (!category) {
      url = `${process.env.BASE_URL}gender-men?p=2`;
    } else if (category == "shirts" && type) {
      url = `${process.env.BASE_URL}gender-${gender}-category-${category}/use-${type}`;
    } else if (category == "dresses" && type) {
      url = `${process.env.BASE_URL}gender-${gender}-category-${category}/length-${type}`;
    } else if (category == "jeans" && type) {
      url = `${process.env.BASE_URL}gender-${gender}-category-${category}/fit-${type}`;
    } else if (
      category == "accessories" &&
      !men_accessories_types.includes(type)
    ) {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${type}-0`;
    } else if (
      category == "accessories" &&
      men_accessories_types.includes(type)
    ) {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}/category-${type}`;
    } else if (category == "trousers") {
      url = `${process.env.BASE_URL}gender-${gender}-category-${category}/style-chinos`;
    } else if (category == "footwear" && !special_cat_women.includes(type)) {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}/category-${type}`;
    } else if (gender == "women" && type == "heels") {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}/category-sandals-category-shoes-heel-high-heel-mid`;
    } else if (gender == "women" && type == "flats") {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}/category-shoes-heel-flat`;
    } else if (gender == "women" && type == "wide") {
      url = `${process.env.BASE_URL}gender-${gender}-productaffiliation-${category}/fit-wide-fit-xwide`;
    }
  } else if (brand == "all") {
    url = `${process.env.BASE_URL_ALL}brands/all`;
  } else {
    // If brand is provide
    url = `${process.env.BASE_URL}gender-men-brand-${brand}-0`;
  }

  return axios.get(url).then((res) => {
    var doc = {};
    var item = [];

    var $ = cheerio.load(res.data);
    var items = $(".fqVHxZ").find(".iLjPtp");
    items.each(function () {
      var id = $(this).attr("id");
      var title = $(this).find(".iiyOMh").text();
      var link = $(this).find("a").attr("href");
      var price = $(this).find("a").find("p").text();
      var image = $(this).find("img").attr("src");

      item.push({
        id,
        title,
        image,
        price,
        link,
      });
    });

    doc.items = item;
    doc.count = item.length;
    doc.category = category;
    doc.type = type;

    return doc;
  });
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: "eCommerce scrapper API is running!" });
});

app.get("/women", async (req, res) => {
  var category = req.query.category;
  var type = req.query.type;
  var brand = req.query.brand;

  if (brand) {
    brand = brand.toLowerCase();
    brand = brand.replace(/\s/g, "");
  }

  try {
    const response = await scrapper(category, "women", type, brand);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

app.get("/men", async (req, res) => {
  var category = req.query.category;
  var type = req.query.type;
  var brand = req.query.brand;

  if (brand) {
    brand = brand.toLowerCase().replace(/\s/g, "");
  }

  try {
    const response = await scrapper(category, "men", type, brand);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = app;
