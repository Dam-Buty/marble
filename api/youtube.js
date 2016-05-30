const Youtube = require("youtube-api");
const key = require("../credentials").youtube;
const console = require("better-console");

module.exports = {
  Youtube: Youtube,
  key: key,

  authed: false,

  auth: function() {
    console.log("Authing...");
    return new Promise((resolve, reject) => {
      if (!this.authed) {
        this.Youtube.authenticate({
          type: "key",
          key: this.key
        });
        this.authed = true;
      }

      console.log("Authed");
      resolve();
    });
  },

  getChannel: function(handle) {
    return new Promise((resolve, reject) => {
      this.Youtube.channels.list({
        part: "id, snippet",
        forUsername: handle
      }, (err, data) => {
        if (err) {
          console.log(err);
          reject();
        } else {
          // console.log(data);
          resolve(data);
        }
      });
    });
  },

  listChannel: function(id) {
    return new Promise((resolve, reject) => {
      var done = false;
      var chapters = [];
      var opts = {
        part: "id, snippet",
        channelId: id,
        order: "date",
        maxResults: 50
      };

      var loop = (publishedBefore) => {
        if (publishedBefore) {
          opts.publishedBefore = publishedBefore;
        }

        this.Youtube.search.list(opts, (err, data) => {
          if (err) {
            console.error(err);
            reject();
          } else {
            // console.log(data.items);
            chapters = chapters.concat(data.items);

            if (data.items.length < 50) {
              resolve(chapters);
            } else {
              loop(data.items.pop().snippet.publishedAt);
            }
          }
        });
      };

      loop();
    });
  },

  crawl: function(handle) {
    return new Promise((resolve, reject) => {
      this.auth().then(() => {
        this.getChannel(handle).then((res) => {
          var channel = res.items[0];

          this.listChannel(channel.id).then(res => {
            var chapters = res.map(chapter => {
              switch(chapter.id.kind) {
                case "youtube#video":
                  return {
                    type:   "youtube",
                    media:  [chapter.id.videoId],
                    date:   new Date(chapter.snippet.publishedAt),
                    title:  chapter.snippet.title,
                    text:   chapter.snippet.description,
                    thumb:  chapter.snippet.thumbnails.high.url
                  };
                  break;

                case "youtube#channel":
                  console.log(chapter.snippet.thumbnails);
                  return {
                    type:   "short-text",
                    media:  [chapter.snippet.thumbnails.high.url],
                    date:   new Date(chapter.snippet.publishedAt),
                    text:   "Channel '" + chapter.snippet.title + "' is created on Youtube."
                  };
                  break;
              }
            });

            console.warn(handle + " crawled");

            resolve({
              id:           channel.id,
              handle:       handle,
              type:         "youtube",
              title:        channel.snippet.title,
              description:  channel.snippet.description,
              thumb:        channel.snippet.thumbnails.high.url,
              chapters:     chapters
            });
          });
        });
      });
    });
  }
};
