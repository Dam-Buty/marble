widget

  article
    .entry
      .time { chapter.time }&nbsp;
        i ({ account.handle } on { chapter.type })
      .text { chapter.text }

    widget-youtube(
      if="{ chapter.type === 'youtube' }",
      chapter="{ opts.chapter }"
    )

  style(type="scss").
    .entry {
      margin-top: 0.67em;
      margin-bottom: 0.67em;
      font-family: texgyre_regular,courrier;
      font-size: 1.2em;
      font-weight: bold;

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

  script.
    this.chapter = opts.chapter;
    this.account = opts.account;

    window.setTimeout(() => {
      console.log(this.accounts);
      this.update();
    }, 2000);
