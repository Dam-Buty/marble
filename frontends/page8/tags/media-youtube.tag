media-youtube

  .youtube
    #player
    .preview(
      if="{ !loaded }"
      onclick="{ loadVideo }"
    )
      img(src="{ chapter.thumb }")
      img.play(src="img/play.png")

  style(type="scss").
    .youtube {
      text-align: center;

      #player {

      }

      .preview {
        position: relative;
        width: 480px;
        height: 360px;
        margin-left: calc(50% - 240px);
        cursor: pointer;

        .play {
          position: absolute;
          box-sizing: border-box;
          top: 130px;
          left: 190px;
          width: 100px;
          height: 100px;
          transition: transform 3s linear;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.35%);
          transition: background-color 3s linear;
        }

        &:hover {
          .play {
            transform: rotate(360deg);
          }

          &:after {
            background-color: rgba(255, 255, 255, 0.12%);
          }
        }
      }
    }


  script.
    this.chapter = opts.chapter;
    this.loaded = false;
    this.playing = false;
    this.seen = false;

    if(this.chapter.text === "") {
      this.chapter.text = "No description";
    }

    loadVideo(e) {
      this.loaded = true;
    }
