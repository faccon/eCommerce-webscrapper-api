// MEN
const men_categories = [
  "jeans",
  "shirts",
  "tracksuits",
  "joggers",
  "socks",
  "trousers",
];
const men_jeans_types = ["slim", "straight", "skinny"];
const men_accessories_types = [
  "belts",
  "wallets",
  "cufflinks",
  "ties",
  "sunglasses",
];
const men_footwear_types = [
  "trainers",
  "wellies",
  "sandals",
  "shoes",
  "boots",
  "slippers",
];
const men_has_types = {
  jeans: men_jeans_types,
  accessories: men_accessories_types,
  footwear: men_footwear_types,
};
const men_brands = [
  "adidas",
  "Barbour",
  "Fat Face",
  "Joules",
  "Lacoste",
  "Nike",
  "SuperDry",
  "The North Face",
  "Tommy Hilfiger",
];

// WOMEN

const women_categories = [
  "jeans",
  "dresses",
  "coatsandjackets",
  "sweatshirtsandhoodies",
  "nightwear",
  "loungewear",
  "shorts",
  "sportswear",
  "swimwear",
  "trousersleggings",
  "shirtsandblouses",
  "jumpsuitsandplaysuits",
  "lingerie",
  "nightwear",
  "footwear",
];
const special_cat_women = ["flats", "heels", "wide"];
const women_dresses_type = ["mini", "midi"];
const women_footwear_types = [
  "trainers",
  "wellies",
  "sandals",
  "shoes",
  "boots",
  "heels",
  "flats",
  "wide",
];
const women_has_types = {
  dresses: women_dresses_type,
  footwear: women_footwear_types,
};

//EXPORTS
module.exports = {
  men_categories,
  men_has_types,
  men_accessories_types,
  men_brands,
  women_categories,
  women_has_types,
  special_cat_women,
};
