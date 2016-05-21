const Twitter = require("twit");
const keys = require("../credentials").twitter;
const console = require("better-console");

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
    return new Promise((resolve, reject) => {
      var done = false;
      var chapters = [];
      var opts = {
        screen_name: handle,
        trim_user: true,
        count: 100
      };

      var loop = (max_id) => {
        if (max_id) {
          opts.max_id = max_id;
        }

        this.Twitter.get("statuses/user_timeline", opts, (err, data) => {
          if (err) {
            console.error(err);
            reject();
          } else {
            chapters = chapters.concat(data);

            if (data.length < 100) {
              console.log(data.length);
              resolve(chapters);
            } else {
              loop(data.pop().id);
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
          var channel = res.data[0];

          this.listChannel(handle).then(res => {
            var chapters = res.map(chapter => {
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

            console.warn(handle + " crawled");

            resolve({
              id:           channel.id,
              handle:       handle,
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
