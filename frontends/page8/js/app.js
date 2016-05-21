
riot.tag2('marble', '<header> <h1>{story.title}</h1> <nav></nav> </header> <main> <section each="{day, chapters in story.days}"> <h2>{day}</h2> <widget each="{chapter in chapters}" chapter="{chapter}" account="{accounts[chapter.account]}"></widget> </section> </main>', 'body{background-color:black}body header{position:fixed;top:0;left:0;width:100%;background-color:black}body header h1{text-align:center;color:white;font-family:\'1942\',cursive;font-size:5em}body main{background-image:url("img/frame.png");background-size:90% 100vh;background-attachment:fixed;padding-top:7em}body main section{margin-top:5em;border-bottom:3em solid black;padding-top:2.5em;padding-bottom:4em}body main section h2{font-family:impact_reversed,courrier;margin-left:20vw;font-size:2.5em}@font-face{font-family:"1942";src:url("fonts/1942-webfont.eot");src:url("fonts/1942-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/1942-webfont.woff") format("woff"),url("fonts/1942-webfont.ttf") format("truetype"),url("fonts/1942-webfont.svg#1942_report1942_report") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:"impact_regular";src:url("fonts/Impact_Label-webfont.eot");src:url("fonts/Impact_Label-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/Impact_Label-webfont.woff") format("woff"),url("fonts/Impact_Label-webfont.ttf") format("truetype"),url("fonts/Impact_Label-webfont.svg#impact_labelregular") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:"impact_reversed";src:url("fonts/Impact_Label_Reversed-webfont.eot");src:url("fonts/Impact_Label_Reversed-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/Impact_Label_Reversed-webfont.woff") format("woff"),url("fonts/Impact_Label_Reversed-webfont.ttf") format("truetype"),url("fonts/Impact_Label_Reversed-webfont.svg#impact_label_reversedregular") format("svg");font-weight:normal;font-style:normal}@font-face{font-family:"texgyre_regular";src:url("fonts/texgyrecursor-regular-webfont.eot");src:url("fonts/texgyrecursor-regular-webfont.eot?#iefix") format("embedded-opentype"),url("fonts/texgyrecursor-regular-webfont.woff") format("woff"),url("fonts/texgyrecursor-regular-webfont.ttf") format("truetype"),url("fonts/texgyrecursor-regular-webfont.svg#texgyrecursorregular") format("svg");font-weight:normal;font-style:normal}', '', function(opts) {
    this.story = opts.story;
    this.accounts = opts.story.accounts;
});

riot.tag2('widget-youtube', '<div class="youtube"> <div id="player"></div><img class="thumb" riot-src="{chapter.thumb}"> </div>', '.youtube{text-align:center}', '', function(opts) {
    this.chapter = opts.chapter;

    if(this.chapter.text === "") {
      this.chapter.text = "No description";
    }
});

riot.tag2('widget', '<article> <div class="entry"> <div class="time">{chapter.time}&nbsp;<i>({account.handle} on {chapter.type})</i></div> <div class="text">{chapter.text}</div> </div> <widget-youtube if="{chapter.type === \'youtube\'}" chapter="{opts.chapter}"></widget-youtube> </article>', '.entry{margin-top:0.67em;margin-bottom:0.67em;font-family:texgyre_regular,courrier;font-size:1.2em;font-weight:bold}.entry div{width:60vw;margin-left:10vw}.entry div.time{font-family:impact_reversed,courrier}.entry div.text{margin-left:20vw}', '', function(opts) {
    this.chapter = opts.chapter;
    this.account = opts.account;

    window.setTimeout(() => {
      console.log(this.accounts);
      this.update();
    }, 2000);
});