const crawlers = {
  youtube: require("./youtube"),
  twitter: require("./twitter")
};

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
  // console.log(books[1].chapters);
  // console.log(books[0].chapters);
});
