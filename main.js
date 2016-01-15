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
    {card: '', cardVal: 2},{card: '', cardVal: 2},{card: '', cardVal: 2},{card: '', cardVal: 2},
    {card: '', cardVal: 3},{card: '', cardVal: 3},{card: '', cardVal: 3},{card: '', cardVal: 3},
    {card: '', cardVal: 4},{card: '', cardVal: 4},{card: '', cardVal: 4},{card: '', cardVal: 4},
    {card: '', cardVal: 5},{card: '', cardVal: 5},{card: '', cardVal: 5},{card: '', cardVal: 5},
    {card: '', cardVal: 6},{card: '', cardVal: 6},{card: '', cardVal: 6},{card: '', cardVal: 6},
    {card: '', cardVal: 7},{card: '', cardVal: 7},{card: '', cardVal: 7},{card: '', cardVal: 7},
    {card: '', cardVal: 8},{card: '', cardVal: 8},{card: '', cardVal: 8},{card: '', cardVal: 8},
    {card: '', cardVal: 9},{card: '', cardVal: 9},{card: '', cardVal: 9},{card: '', cardVal: 9},
    {card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},
    {card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},
    {card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},
    {card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},{card: '', cardVal: 10},
    {card: '', cardVal: 11},{card: '', cardVal: 11},{card: '', cardVal: 11},{card: '', cardVal: 11}
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
    $('<div>').addClass('dealer up').text(dealing.cardVal).appendTo('#dealerRow');
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
    $('<div>').addClass('dealer up').text(dealing.cardVal).appendTo('#dealerRow');
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
    $('<div>').addClass('dealer up').text(dealing.cardVal).appendTo('#playerRow');
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
    $('<div>').addClass("outOfCards")
    .append('Out of cards!</br> Click - New Deck').appendTo('body');

    win = true;
    setTimeout(function(){
      $('.darken').removeClass('winnerCard');
      $('.dealer').remove();
      win = false;
  } ,3000)
  }

})
