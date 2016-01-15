'use strinct'

$(document).ready(function(){
  $('#dealBTN').on('click', deal);
  $('#deckBTN').on('click', shuffle);
  $('#hitBTN').on('click', dealingP);
  $('#stayBTN').on('click', stay);
  var playerHand =[];
  var dealerHand =[];
  var playerAces = 0;
  var dealerAces = 0;
  var hasDealt = false;
  var win = false;
  var bucket = [
    {card: 'http://www.jimwegryn.com/Names/Cowboys/norris.jpg', cardVal: 2},{card: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Claude_Monet_The_Cliffs_at_Etretat.jpg', cardVal: 2},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Three-Musicians-By-Pablo-Picasso.jpg', cardVal: 2},{card: 'http://blog.degreed.com/wp-content/uploads/2015/04/757px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg', cardVal: 2},
    {card: 'https://s-media-cache-ak0.pinimg.com/236x/b9/90/a0/b990a0a167c8b9190db548c380d690c8.jpg', cardVal: 3},{card: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Claude_Monet_-_Morning_on_the_Seine_-_Google_Art_Project.jpg', cardVal: 3},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Girl-Before-A-Mirror-By-Pablo-Picasso.jpg?c65d23', cardVal: 3},{card: 'https://news.artnet.com/wp-content/news-upload/2015/03/mulberry1.jpg', cardVal: 3},
    {card: 'http://www.jimwegryn.com/Names/Cowboys/murphy.jpg', cardVal: 4},{card: 'http://www.1paintings.com/images/Autumn%20at%20Argenteuil.jpg', cardVal: 4},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/The-Old-Guitarist.jpg?c65d23', cardVal: 4},{card: 'http://www.biographyonline.net/wp-content/uploads/2014/05/Van_Gogh_sunflowers1.jpg', cardVal: 4},
    {card: 'https://s-media-cache-ak0.pinimg.com/236x/9f/3b/a9/9f3ba9e001e61f021af9d5961a7cccc7.jpg', cardVal: 5},{card: 'http://webneel.com/daily/sites/default/files/images/daily/12-2014/16-claude-monet-paintings.jpg', cardVal: 5},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Seated-Woman-Marie-Therese-By-Pablo-Picasso.jpg?c65d23', cardVal: 5},{card: 'http://www.mountainsoftravelphotos.com/USA%20-%20New%20York%20City/Metropolitan%20Museum%20of%20Art%20Top%20Paintings%20After%201860/slides/Top%20Met%20Paintings%20After%201860%2003-1%20Vincent%20van%20Gogh%20Wheat%20Field%20with%20Cypresses.jpg', cardVal: 5},
    {card: 'http://www.jimwegryn.com/Names/Cowboys/roberts.jpg', cardVal: 6},{card: 'http://images5.fanpop.com/image/photos/26500000/claude-monet-paintings-claude-monet-26520056-600-447.jpg', cardVal: 6},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Dora-Maar-au-Chat-By-Pablo-Picasso.jpg?c65d23', cardVal: 6},{card: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Starry_Night_Over_the_Rhone.jpg', cardVal: 6},
    {card: 'http://images.sodahead.com/polls/002585779/4343437733_remembering_paul_newman_photos_02152009_43_820x1003_answer_3_xlarge.jpeg', cardVal: 7},{card: 'http://www.zastavki.com/pictures/originals/2014/Drawn_wallpapers___Paintings_Painting_Claude_Monet_-_Wassabi_069245_.jpg', cardVal: 7},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Blue-Nude-By-Pablo-Picasso.jpg?c65d23', cardVal: 7},{card: 'http://www.toptenz.net/wp-content/uploads/2010/07/portrait-of-dr-gachet-325x400.jpg', cardVal: 7},
    {card: 'http://www.jimwegryn.com/Names/Cowboys/oakley.jpg', cardVal: 8},{card: 'http://ichef.bbci.co.uk/arts/yourpaintings/images/paintings/ccf/624x544/cam_ccf_pd_21953_624x544.jpg', cardVal: 8},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Le-R%C3%AAve-The-Dream-By-Pablo-Picasso.jpg?c65d23', cardVal: 8},{card: 'http://www.vangoghgallery.com/es/images/Van-Gogh_New-Template/prints-set3/print-cafe-terrace-on-place-du-forum.jpg', cardVal: 8},
    {card: 'http://www.jimwegryn.com/Names/Cowboys/owens.jpg', cardVal: 9},{card: 'http://s.hswstatic.com/gif/claude-monet-paintings-1889-1894-1.jpg', cardVal: 9},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/03-Asleep.jpg?c65d23', cardVal: 9},{card: 'https://www.ibiblio.org/wm/paint/auth/gogh/gogh.eglise-auvers.jpg', cardVal: 9},
    {card: 'http://www.jimwegryn.com/Names/Cowboys/allison.jpg', cardVal: 10},{card: 'http://images.metmuseum.org/CRDImages/ep/original/DP130800.jpg', cardVal: 10},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/02-nude-green-leaves-and-bust1.jpg?c65d23', cardVal: 10},{card: 'https://cp.responder.co.il/upload/ca198ea36508254839a1d7a24e4a3302/images/wallpaper_van-gogh_animaatjes-8.jpg', cardVal: 10},
    {card: 'https://biblioklept.files.wordpress.com/2010/10/10021568.jpg?w=739', cardVal: 10},{card: 'http://s.hswstatic.com/gif/paintings-by-claude-monet-1.jpg', cardVal: 10},{card: 'http://www.themost10.com/wp-content/uploads/2012/03/Les-Demoiselles-d-Avignon.jpg?c65d23', cardVal: 10},{card: 'https://qph.is.quoracdn.net/main-qimg-0c96cb3bd33b7348608412b3aeee5e10?convert_to_webp=true', cardVal: 10},
    {card: 'http://thumbs.dreamstime.com/z/disney-pixar-toy-story-character-woody-famous-cowboy-popular-animation-movie-35450804.jpg', cardVal: 10},{card: 'https://s-media-cache-ak0.pinimg.com/736x/31/f1/0a/31f10a66dcd32692971cba457847b2c4.jpg', cardVal: 10},{card: 'http://www.pablopicasso.org/images/paintings/the-blindmans-meal.jpg', cardVal: 10},{card: 'http://www.top10n.net/wp-content/uploads/2015/10/Top-10-most-famous-self-portraits-of-history-4.jpg', cardVal: 10},
    {card: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Lone_ranger_silver_1965.JPG', cardVal: 10},{card: 'https://s-media-cache-ak0.pinimg.com/736x/30/ef/50/30ef50a20e0fd2fbe369f13738ad5f34.jpg', cardVal: 10},{card: 'https://s-media-cache-ak0.pinimg.com/736x/80/1c/3a/801c3a487891a418165922c425cfaad3.jpg', cardVal: 10},{card: 'http://www.finearttips.com/wp-content/uploads/2009/02/van-gogh.jpg', cardVal: 10},
    {card: 'https://playingcardcollector.files.wordpress.com/2013/10/ace_of_spades_by_jason_brooks.jpg?w=645', cardVal: 11},{card: 'http://40.media.tumblr.com/tumblr_m6tjybZNY51qd7ygho1_1280.jpg', cardVal: 11},{card: 'https://c1.staticflickr.com/9/8034/7942147192_257e6b0060.jpg', cardVal: 11},{card: 'https://s-media-cache-ak0.pinimg.com/236x/28/3e/04/283e04f4fab319caeec4867dcf883fad.jpg', cardVal: 11}
  ];

  var mapBucket = bucket.map(function(x) {
    return x;
  })

  function shuffle(){
    if (win) {return;}
    $('.outOfCards').remove();
    mapBucket = bucket.map(function(x) {
      return x;
    })
    $('.dealer').remove();
    $('.player').remove()
    playerAces = 0;
    dealerAces = 0;
    playerHand = [];
    dealerHand = [];
    hasDealt = false;
  }


  function picker(){
    var num = Math.floor(Math.random()*mapBucket.length);
    var item = mapBucket[num];
    mapBucket.splice(num, 1);
    return item;
  }

  function deal(){
    if (win) {return;}
    hasDealt=true;
    $('.dealer').remove();
    $('.player').remove()
    playerAces = 0;
    dealerAces = 0;
    playerHand = [];
    dealerHand = [];
    var dealing = picker()
    dealerHand.push(dealing.cardVal)
    if (dealing.cardVal === 11){
      dealerAces += 1;
      console.log('dealerAces', dealerAces);
    }
    console.log(dealing.cardVal);
    $('<div>').addClass('dealer up').css({'background-image': 'url('+dealing.card+')', 'background-position': 'center', 'background-size': 'cover'}).text(dealing.cardVal).appendTo('#dealerRow');
    $('<div>').addClass('dealer down').appendTo('#dealerRow');
    dealingP();
    dealingP();
    mathyP();
  }

  function dealingD(){
    var dealing = picker()
    dealerHand.push(dealing.cardVal)
    if (dealing.cardVal === 11){
      dealerAces += 1;
      console.log('dealerAces', dealerAces);
    }
    console.log(dealing.cardVal);
    $('<div>').addClass('dealer up').css({'background-image': 'url('+dealing.card+')', 'background-position': 'center', 'background-size': 'cover'}).text(dealing.cardVal).appendTo('#dealerRow');
    mathyD();
  }

  function dealingP(){
    if(!hasDealt) {return;}
    var dealing = picker()
    if(!dealing) {reshuffle()}
    playerHand.push(dealing.cardVal)
    if (dealing.cardVal === 11){
      playerAces += 1;
      console.log('playerAces', playerAces);
    }
    console.log(dealing.cardVal);
    $('<div>').addClass('dealer up').css({'background-image': 'url('+dealing.card+')', 'background-position': 'center', 'background-size': 'cover'}).text(dealing.cardVal).appendTo('#playerRow');
    mathyP();
  }

  function stay(){
    if(!hasDealt) {return;}
    $('#dealerRow').children().last().remove()
    dealingD();
  }


  function mathyP(){
    var sumP = 0;
    var sumD = 0;
    playerHand.forEach(function(x){
      sumP += x
    })
    dealerHand.forEach(function(x){
      sumD += x
    })
    console.log('playerHand', sumP);
    console.log('dealerHand', sumD);
    if(sumP === 21){
      var solution = 'BLACKJACK!!!';
      playAgain(solution);
    }
    else if(sumP > 21){
      if (playerAces > 0){
        playerHand.push(-10);
        playerAces -= 1;
        mathyP();
      }
      else{
        var solution ='Bust!!!'
        playAgain(solution);
      }
    }

  }
  function mathyD(){
    var sumP = 0;
    var sumD = 0;
    playerHand.forEach(function(x){
      sumP += x
    })
    dealerHand.forEach(function(x){
      sumD += x
    })
    console.log('playerHand', sumP);
    console.log('dealerHand', sumD);
    if(sumD === 21){
      var solution = 'Dealer BLACKJACK - Dealer Wins';
      playAgain(solution);
    }
    else if(sumD > 21){
      if (dealerAces > 0){
        dealerHand.push(-10);;
        dealerAces -= 1
        mathyD();
      }
      else{
        var solution = "Dealer's Bust!!! - You win!!!";
        playAgain(solution);
      }
    }
    else if(sumD >= 17){
      if(sumP === sumD){
        var solution = 'Push!!!';
        playAgain(solution);
      }
      else if (sumP > sumD){
        var solution = 'You Won!!!';
        playAgain(solution);
      }
      else if (sumP < sumD){
        var solution = 'Dealer Wins';
        playAgain(solution);
      }
    }
    else { dealingD(); }
  }
  function reshuffle(){
    $('<div>').addClass("outOfCards")
    .append('Out of cards!</br> Click - New Deck').appendTo('body');
  }
  function playAgain(sol){
    hasDealt = false;
    $('.darken').addClass('winnerCard').appendTo('body');
    $('<div>').addClass("solution")
    .append(sol).appendTo('body');

    win = true;
    setTimeout(function(){
      $('.darken').removeClass('winnerCard');
      $('.dealer').remove();
      $('.solution').remove();
      win = false;
  } ,3000)
  }

})
