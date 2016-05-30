marble

  header
    h1 { story.title }
    nav

  main
    section(each="{ day, chapters in story.days }")
      h2 { day }
      widget(
        each="{ chapter in chapters }",
        account="{ parent.accounts[chapter.account] }",
        chapter="{ chapter }"
      )

  style(type="scss").
    body {
      background-color: black;

      header  {
        //- position: fixed;
        //- top: 0;
        //- left: 0;
        //- width: 100%;
        //- background-color: black;

        h1 {
          text-align: center;
          color: white;
          font-family: '1942',cursive;
          font-size: 5em;
        }
      }

      main {
        background-image: url("img/frame.png");
        background-size: 90% 100vh;
        background-attachment: fixed;
        //- padding-top: 1em;

        section {
          margin-top: 5em;
          border-bottom: 3em solid black;
          padding-top: 2.5em;
          padding-bottom: 4em;

          h2 {
            font-family: impact_reversed,courrier;
            margin-left: 20vw;
            font-size: 2.5em;
          }
        }
      }

    }

    @mixin webfont($name, $file, $font) {
        @font-face {
            font-family: $name;
            src: url('fonts/' + $file + '.eot');
            src: url('fonts/' + $file + '.eot?#iefix') format('embedded-opentype'),
                 url('fonts/' + $file + '.woff') format('woff'),
                 url('fonts/' + $file + '.ttf') format('truetype'),
                 url('fonts/' + $file + '.svg#' + $font + '') format('svg');
            font-weight: normal;
            font-style: normal;
        }
    }


    @include webfont("1942", "1942-webfont", "1942_report1942_report");
    @include webfont("impact_regular", "Impact_Label-webfont", "impact_labelregular");
    @include webfont("impact_reversed", "Impact_Label_Reversed-webfont", "impact_label_reversedregular");
    @include webfont("texgyre_regular", "texgyrecursor-regular-webfont", "texgyrecursorregular");

  script.
    this.story = opts.story;
    this.accounts = opts.story.accounts;
