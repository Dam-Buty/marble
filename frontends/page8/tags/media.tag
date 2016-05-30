media

  .media(each="{ media }")
    media-youtube(
      if="{ chapter.type === 'youtube' }"
      chapter="{ parent.chapter }"
    )

    media-img(

    )

  script.
    this.chapter = opts.chapter;
    this.media = this.chapter.media;
