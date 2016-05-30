const crawlers = {
  youtube: require("./youtube"),
  twitter: require("./twitter")
};
const console = require("better-console");
const fs = require('fs');
const path = require('path');
const months = require("months");

var name = "marble-hornets";
var title = "Marble Hornets";

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
      name,
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
    var chapters = [];
    var idx = 0;

    var accounts = books.map( book => {
      chapters = chapters.concat(book.chapters.map(chapter => {
        chapter.account = idx;
        return chapter;
      }));

      idx++;

      delete book.chapters;
      return book;
    });

    chapters = chapters.sort((a, b) => a.date < b.date ? -1 : 1);

    chapters.forEach((chapter) => {
      var date = new Date(chapter.date);

      var jour = [
        date.getDate(),
        months[date.getMonth()].slice(0, 3) + ".",
        date.getFullYear()
      ].join(" ");

      chapter.time = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      ].map(e => ("00" + e).slice(-2)).join(":");

      if (!days[jour]) {
        days[jour] = [];
      }

      days[jour].push(chapter);
    });

    resolve({
      accounts: accounts,
      days: days
    });
  });
};

try {
  var story = require("../cache/" + name + "/story.json");
} catch (ex) {
  Promise.all(accounts.map(account => crawl(account.type, account.handle)))
  .then(books => {
    console.log(books);
    weave(books).then(story => {
      var file = path.join(
        __dirname,
        "../cache/",
        name,
        "story.json"
      );

      story.title = title;

      fs.writeFile(file, JSON.stringify(story, null, 2), "utf8", (err) => {
        if (err) throw err;
        console.warn("Woven story saved!");
      });
    }).catch(ex => console.error(ex));
  })
  .catch(ex => { console.error(ex); });
}
