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
  mapBucket = bucket.map(function(x) {
    return x;
  })
  $('.dealer').remove();
  $('.player').remove()
  playerAces = 0;
  dealerAces = 0;
  playerHand = [];
  dealerHand = [];
}


function picker(){
    var num = Math.floor(Math.random()*mapBucket.length);
    var item = mapBucket[num];
    mapBucket.splice(num, 1);
    return item;
}

function deal(){
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
  var dealing = picker()
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
    pBlackjack();
  }
  else if(sumP > 21){
    if (playerAces > 0){
      playerHand.push(-10);
      playerAces -= 1;
      mathy();
    }
    else{
      bust();
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
  dBlackjack();
}
else if(sumD > 21){
  if (dealerAces > 0){
    dealerHand.push(-10);;
    dealerAces -= 1
    mathy();
  }
  else{
    dealerBust();
  }
}
else if(sumD >= 17){
  if(sumP === sumD){
    pusher();
  }
  else if (sumP > sumD){
    winner();
  }
  else if (sumP < sumD){
    dealerWin();
  }
}
else { dealingD(); }
}
function pBlackjack(){
  $('body').append('BLACKJACK!!!');
  playAgain();
}

function dBlackjack(){
  $('body').append('Dealer BLACKJACK - Dealer Wins');
  playAgain();
}

function winner(){
  $('body').append('You Won!!!');
  playAgain();
}

function bust(){
  $('body').append('Bust!!!');
  playAgain();
}

function dealerBust(){
  $('body').append("Dealer's Bust!!! - You win!!!");
  playAgain();
}

function dealerWin(){
  $('body').append('Dealer Wins');
  playAgain();
}

function pusher(){
  $('body').append('Push!!!');
  playAgain();
}
function playAgain(){

}

})
