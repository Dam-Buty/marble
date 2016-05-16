const crawlers = {
  youtube: require("./youtube"),
  twitter: require("./twitter")
};
const console = require("better-console");

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

Promise.all(accounts.map(account => crawlers[account.type].crawl(account.handle))).then(books => {
  console.table(books[1].chapters);
  console.table(books[0].chapters);
});
