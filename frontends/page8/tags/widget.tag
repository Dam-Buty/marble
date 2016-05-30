widget

  article.entry
    header
      .time ----- { chapter.time } -----
        i ({ account.handle } on { chapter.type }) -----
      .text { chapter.text }



    media(
      if="{ chapter.media && chapter.media.length > 0 }",
      chapter="{ opts.chapter }"
    )

  style(type="scss").
    article.entry {
      margin-top: 0.67em;
      margin-bottom: 0.67em;
      font-family: texgyre_regular,courrier;
      font-size: 1.2em;
      font-weight: bold;

      header {
        div {
          width: 60vw;
          margin-left: 10vw;

          &.time {
            font-family: impact_reversed,courrier;
          }

          &.text {
            margin-left: 20vw;
          }
        }
      }
    }

  script.
    this.chapter = opts.chapter;
    this.account = opts.account;
    this.update();
