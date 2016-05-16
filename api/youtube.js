const Youtube = require("youtube-api");
const key = require("../credentials").youtube;

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

      this.Youtube.search.list({
        part: "id, snippet",
        channelId: id
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

  crawl: function(handle) {
    return new Promise((resolve, reject) => {
      this.auth().then(() => {
        this.getChannel(handle).then((res) => {
          var channel = res.items[0];

          this.listChannel(channel.id).then(res => {
            console.log(res.items.length);
            var chapters = res.items.map(chapter => {
              return {
                type:   "youtube",
                media:  [chapter.id.videoId],
                date:   new Date(chapter.snippet.publishedAt),
                title:  chapter.snippet.title,
                text:   chapter.snippet.description,
                thumb:  chapter.snippet.thumbnails.high.url
              };
            });

            resolve({
              id:           channel.id,
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
