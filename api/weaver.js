const crawlers = {
  youtube: require("./youtube"),
  twitter: require("./twitter")
};
const console = require("better-console");
const fs = require('fs');
const path = require('path');

var title = "marble-hornets";

var accounts = [
{
    "type": "twitter",
    "handle": "marblehornets"
},
{
    "type": "youtube",
    "handle": "MarbleHornets"
},
{
    "type": "youtube",
    "handle": "totheark"
}
];

var crawl = function(type, handle) {
  return new Promise((resolve, reject) => {
    var file = path.join(
      __dirname,
      "../cache/",
      title,
      type + "-" + handle + ".json"
    );

    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        if (err.code = "ENOENT") {
          crawlers[type].crawl(handle)
          .then(data => {
            fs.writeFile(file, JSON.stringify(data, null, 2), "utf8", (err) => {
              if (err) throw err;
              console.warn(type + "-" + handle + " saved!");
            });
            resolve(data);
          });
        }
      } else {
        console.warn(type + "-" + handle + " read from disk!");
        resolve(JSON.parse(data));
      }
    });
  });
};

var weave = function(books) {
  return new Promise((resolve, reject) => {
    var days = {};
  });
};

try {
  var story = require("../cache/" + title + "/story.json");
} catch (ex) {
  Promise.all(accounts.map(account => crawl(account.type, account.handle))).catch(ex => { console.error(ex); }).then(books => {
    console.log(books);
  });
}
