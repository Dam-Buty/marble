const Twitter = require("twit");
const keys = require("../credentials").twitter;

module.exports = {
  Twitter: Twitter,
  keys: keys,

  authed: false,

  auth: function() {
    console.log("Authing...");
    return new Promise((resolve, reject) => {
      if (!this.authed) {
        this.Twitter = new Twitter({
          consumer_key:        this.keys.api.key,
          consumer_secret:     this.keys.api.secret,
          app_only_auth:        true
        });

        this.authed = true;
      }

      console.log("Authed");
      resolve();
    });
  },

  getChannel: function(handle) {
    return this.Twitter.get("users/lookup", { screen_name: handle })
    .catch(err => {
      console.log(err);
      reject();
    });
  },

  listChannel: function(handle) {
    return this.Twitter.get("statuses/user_timeline", { screen_name: handle })
    .catch(err => {
      console.log(err);
      reject();
    });
  },


  crawl: function(handle) {
    return new Promise((resolve, reject) => {
      this.auth().then(() => {
        this.getChannel(handle).then((res) => {
          var channel = res.data[0];

          this.listChannel(handle).then(res => {
            var chapters = res.data.map(chapter => {
              var media = [];

              if (chapter.entities.media) {
                media = chapter.entities.media.map(medium => medium.media_url_https);
              }

              return {
                type:   "twitter",
                media:  media,
                date:   new Date(chapter.created_at),
                text:   chapter.text
              };
            });

            resolve({
              id:           channel.id,
              type:         "twitter",
              title:        channel.name,
              description:  channel.description,
              thumb:        channel.profile_image_url_https,
              chapters:     chapters
            });
          });
        });
      });
    });
  }
};
