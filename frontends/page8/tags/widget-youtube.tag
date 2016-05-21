widget-youtube

  .youtube
    #player
    img.thumb(src="{ chapter.thumb }")

  style(type="scss").
    .youtube {
      text-align: center;
    }


  script.
    this.chapter = opts.chapter;

    if(this.chapter.text === "") {
      this.chapter.text = "No description";
    }
