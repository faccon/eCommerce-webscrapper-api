const express = require("express");
const request = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");

const PORT = process.env.PORT || 5002;
const fetch_url =
  "https://www.amazon.com/s?i=specialty-aps&bbn=16225018011&rh=n%3A7141123011%2Cn%3A16225018011%2Cn%3A1040660&ref=nav_em__nav_desktop_sa_intl_clothing_0_2_12_2";
const app = express();

const category = axios.get(`${fetch_url}`).then((res) => {
  var items = [];

  var html = res.data;
  var $ = cheerio.load(html);
  var item = $(".s-result-list").find(".s-result-item");
  item.each(function () {
    var title = $(this).find("h2").text();
    var currency = $(this).find(".a-price-symbol").text();

    // price after
    var after_price_whole = $(this).find(".a-price-whole").text();
    var after_price_decimal = $(this).find(".a-price-decimal").text();
    var after_price_fraction = $(this).find(".a-price-fraction").text();
    var after_price =
      after_price_whole + after_price_decimal + after_price_fraction;

    // price before
    var before_price = $(this)
      .find('.a-price[data-a-strike="true"]')
      .find(".a-offscreen")
      .text();

    var image = $(this).find(".s-image").attr("srcset");
    var link = $(this).find("a").attr("href");
    var item_id = $(this).attr("data-asin");
    var rating = $(this).find(".a-icon-alt").text();
    var review_count = $(this)
      .find(".a-link-normal")
      .find(".a-size-base")
      .text();
    items.push({
      title,
      image,
      link,
      item_id,
      rating,
      review_count,
      price: {
        after: {
          currency,
          after_price_whole,
          after_price_decimal,
          after_price_fraction,
          after_price,
        },
        before: {
          before_price,
        },
      },
    });
  });

  return items;
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is an amazon scarpper api!");
});

app.get("/category", async (req, res) => {
  try {
    const response = await category;
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
app.get("/products/:productID", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
