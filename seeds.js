const mongoose = require("mongoose");

const Post = require("./models/posts");

mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");

main().catch((err) => console.log("OH NO MONGO ERROR"));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite");

  console.log("MONGO CONNECTION OPEN");
}

const seedPosts = [
  {
    title: "Shakespeare",
    text: "William Shakespeare, Shakespeare also spelled Shakspere, byname Bard of Avon or Swan of Avon, (baptized April 26, 1564, Stratford-upon-Avon, Warwickshire, England—died April 23, 1616, Stratford-upon-Avon), English poet, dramatist, and actor often called the English national poet and considered by many to be the greatest dramatist of all time.",
    author: "velat hazar",
  },
  {
    title: "Chaucer",
    text: "Geoffrey Chaucer, (born c. 1342/43, London?, England—died October 25, 1400, London), the outstanding English poet before Shakespeare and “the first finder of our language.” His The Canterbury Tales ranks as one of the greatest poetic works in English. He also contributed importantly in the second half of the 14th century to the management of public affairs as courtier, diplomat, and civil servant. In that career he was trusted and aided by three successive kings—Edward III, Richard II, and Henry IV. But it is his avocation—the writing of poetry—for which he is remembered.",
    author: "velat hazar",
  },
  {
    title: "Donne",
    text: "John Donne, (born sometime between Jan. 24 and June 19, 1572, London, Eng.—died March 31, 1631, London), leading English poet of the Metaphysical school and dean of St. Paul’s Cathedral, London (1621–31). Donne is often considered the greatest love poet in the English language. He is also noted for his religious verse and treatises and for his sermons, which rank among the best of the 17th century.",
    author: "velat hazar",
  },
];

Post.insertMany(seedPosts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
