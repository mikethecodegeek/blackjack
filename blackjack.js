/**
 * Created by Michael on 7/24/2015.
 */
$(document).ready(function(){
    bankroll();
    returnBalance();
    openGame();
    clearButtons();
  //  enableButtons();
   // prepareToDeal();
      //  initDeal();



function Card(names,suit,value,pic) {
    this.name = names;
    this.suit = suit;
    this.value = value;
    this.pic = pic;

}

function deck(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
    var cards = [];
    var count = 1;
    var cardPic = '';
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            if (this.names[n] == 'J' || this.names[n] == 'Q'  || this.names[n] == 'K') {
                cardVal = 10;
            }
            else if (this.names[n] == 'A') {
                cardVal = 11;
            }
            else {
                cardVal = parseInt(this.names[n]);
            }
            cardPic = this.names[n] + this.suits[s][0];
           var x = new Card( this.names[n], this.suits[s], cardVal,cardPic );
            cards.push(x);
            count++;
        }
    }

    return cards;
}
function currentHand() {
    myhand = [];
    console.log(myhand);
    dealToPlayer = function () {
        myhand.push(dealCard());
    };
    showPlayerHand = function() {
        console.log(myhand);
        $('#yourscore').html(scoreHand('player'));
        $('#fir').html('');
        for (var z in myhand) {
            x = '<img src = "ccards/' + myhand[z].pic + '.png">';
            $('#fir').append(x);
        }
        return myhand;
    };
    returnPlayerHand = function() {
        return myhand;
    };


}

function shuffleCards() {
    array = deck();
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    returnDeck = function () {
        return array;
    };
}

function dealCard() {
    x = returnDeck();
    showThisDeck = function() {
        console.log(x);
    };
    card = x.pop();
    return card;
}
    function openGame() {
        $('#sec').html('<img src = "ccards/back.png">');
        $('#fir').html('<img src = "ccards/back.png">');
        $('#dealerscore').html('0');
        $('#yourscore').html('0');
    }

function dealerHand () {
    thisHand = [];
    dealToDealer = function() {
        thisHand.push(dealCard());
    };
    showDealerInit = function () {
        $('#sec').html('<img src = "ccards/back.png">');
        x = '<img src = "ccards/' + thisHand[1].pic + '.png">';
        $('#sec').append(x);
        $('#dealerscore').html(thisHand[1].value);
        if (thisHand[1].value == 11) {
            insuranceBet();

        }
    };
    showDealerHand = function () {
        console.log(thisHand);
        $('#sec').html('');
        for (var z in thisHand) {
            x = '<img src = "ccards/' + thisHand[z].pic + '.png">';
            $('#sec').append(x);
        }
        $('#dealerscore').html(scoreHand('dealer'));
        return thisHand;
    };
    returnDealerHand = function() {
        return thisHand;
    }

}
function scoreHand(handToScore) {
    var playerScore = 0;
    var dealerScore = 0;
    var playerAces = [0];
    var dealerAces = [0];
    var x = [];
    if (handToScore == 'player'){
        x = returnPlayerHand();
        console.log(x.length);
        if (x.length > 2){
            $('#double').hide();
        }
        for (var i in x){
            playerScore = playerScore + x[i].value;
            if (x[i].value == 11){
                playerAces.push(-10);
            }
        }
        while (playerAces.length >1 && playerScore > 21){
            soft = playerAces.pop();
            playerScore=playerScore+soft;
        }
        if (playerScore == 21 && i == 1){
            getBlackJack()
        }
        else if (playerScore > 21) {
            bust();
        }
        return playerScore;
        }



    else if (handToScore == 'dealer'){
        x = returnDealerHand();
        for (var a in x){
            dealerScore = dealerScore + x[a].value;
            if (x[a].value == 11){
                dealerAces.push(-10);
            }
        }
        while (dealerAces.length >1 && dealerScore > 21){
            soft2 = dealerAces.pop();
            dealerScore=dealerScore+soft2;
        }
        if (dealerScore == 21 && a == 1){
            dealerBlackJack();
        }
        return dealerScore;
    }

}
function hitMe() {
    dealToPlayer();
    showPlayerHand();
    scoreHand('player');
}

function getBlackJack() {
    console.log('BlackJack');
    $('#winorlose').html('Blackjack!');
    $('#winnings').html('+$' + payBlackJack());
   // payBlackJack();
    clearButtons();
    return 'BlackJack';
}
    function playSurrender() {
        $('#winorlose').html('Surrender:');
        $('#winnings').html('+$' + returnSurrender());
        surrender();
        clearButtons();
    }

function bust() {
    console.log('Bust');
    $('#winorlose').html('Bust!');
    $('#winnings').html('-$' + returnBet());
    clearButtons();
    turnRed();
    return 'Bust';
}
function youWin() {
    console.log('You Win');
   // getPaid();
    $('#winorlose').html('You Win');
    $('#winnings').html('+$' + getPaid());
    return 'You Win';
}
function dealWins() {
    console.log('Dealer Wins');
    $('#winorlose').html('Dealer Wins');
    turnRed();
    $('#winnings').html('-$' + returnBet());
    return 'Dealer Wins';
}
function push() {
    console.log('Push');
    pushPayOff();
    $('#winorlose').html("It's a push");
    $('#winnings').html('+$' + returnBet());
    return 'Push';
}
    function dealerBust() {
        $('#winorlose').html('Dealer busts!');
        $('#winnings').html('+$' + getPaid());
        //getPaid();
    }
    function dealerBlackJack() {
        $('#winorlose').html('Dealer has blackjack!');
        turnRed();
        $('#winnings').html('-$' + returnBet());
        clearButtons();
    }
function seeIfWinner(playscore) {

    var playHand = scoreHand('player');
  //  $('#winorlose').html('Your Score ' + playscore);
    var dealHand = scoreHand('dealer');
  //  $('#winorlose').html('Dealer Score ' + dealHand);
    clearButtons();
    if (dealHand > 21){
       dealerBust();
    }
    else if (playHand > dealHand){
        youWin();
    }
    else if (playHand == dealHand){
        push();
    }
    else {
        dealWins();
    }
}
function dealerPlay() {
    var x = scoreHand('dealer');
    while (x < 18){
        dealToDealer();
        showDealerHand();
        x = scoreHand('dealer');
    }
    seeIfWinner();
}



function initDeal () {
    addButtons();
    shuffleCards();
    dealerHand();
    currentHand();
    makeBet();
    dealToDealer();
    dealToPlayer();
    dealToDealer();
    dealToPlayer();
    returnBalance();
    showDealerInit();
    showPlayerHand();
    clearWinnings();
    turnGreen();


}
    function bankroll() {
        var bankroll = 2000;
        betAmount = 0;
        returnBalance = function () {
            $('#mybalance').html('$'+bankroll);
            return bankroll;
        };
        makeBet = function () {
            bankroll = bankroll - betAmount;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
            return betAmount;
        };
        returnBet = function() {
            return betAmount;
        };
        getPaid = function (){
            payOff = betAmount*2;
            bankroll = bankroll + payOff;
            $('#mybalance').html('$'+bankroll);
            console.log(bankroll);
            console.log('Get paid ' + payOff);
            return payOff;
        };
        payBlackJack = function () {
            blackPayOff = Math.floor(betAmount * 1.5);
            bankroll = bankroll + blackPayOff + betAmount;
            console.log(blackPayOff + betAmount);
            $('#mybalance').html('$'+bankroll);
            return blackPayOff;
        };
        pushPayOff = function () {
            pushPay = betAmount;
            bankroll=bankroll+pushPay;
            $('#mybalance').html('$'+bankroll);
            return pushPay;
        };
        doubleBet = function() {
            bankroll = bankroll - betAmount;
            betAmount = betAmount*2;
            $('#mybalance').html('$'+bankroll);
            $('#pot').html('$'+betAmount);
        };
        halfBet = function() {
            betAmount = betAmount/2;
        };
        takeInsurance = function() {
            insurance = Math.floor(betAmount/2);
            bankroll = bankroll - insurance;
            $('#pot').append(' / + $' + insurance + ' Insurance');
            $('#mybalance').html('$'+bankroll);
        };
        payInsurance = function () {
            bankroll = bankroll + (insurance * 2);
            $('#mybalance').html('$'+bankroll);
        };
        surrender = function() {
            bankroll = bankroll + Math.floor((betAmount/2));
            $('#mybalance').html('$'+bankroll);

        };
        returnSurrender = function() {
            return Math.floor(betAmount);
        };
        betOne = function() {
            betAmount = betAmount+1;
           // bankroll=bankroll-1;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        };
        betFive = function() {
            betAmount=betAmount+5;
            //bankroll=bankroll-5;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        };
        betTen = function() {
            betAmount=betAmount+10;
           // bankroll=bankroll-10;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        };
        betTwentyFive= function() {
            betAmount= betAmount+25;
          //  bankroll=bankroll-25;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        };
        betOneHun = function() {
            betAmount = betAmount+100;
          //  bankroll=bankroll-100;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        };
        clearBet = function() {
            betAmount = 0;
            //bankroll=bankroll-100;
            $('#pot').html('$' + betAmount);
            $('#mybalance').html('$'+bankroll);
        }

    }
   function insuranceBet() {
       $('#insurance').show();
       $('#noinsurance').show();
       $('#hitme').hide();
       $('#stay').hide();
       $('#double').hide();
       $('#surrender').hide();
   }


    $('#hitme').on('click', function () {
        hitMe();
    });
    $('#stay').on('click', function () {
        showDealerHand();
        dealerPlay();
    });


    $('#newhand').on('click', function () {
        if (returnBet() > returnBalance()) {
            $('#pot').html("You don't have enough funds.")
        }
        if (returnBet() > 0) {
            $('#winorlose').html('');
            initDeal();
        }
        else {
            $('#pot').html("You must make a bet first")
        }
    });
    $('#double').on('click', function () {
        doubleBet();
        hitMe();
        scoreHand('player');
        var x = scoreHand('player');
        if (x <= 21) {
            showDealerHand();
            dealerPlay();
        }
        halfBet();
    });

    $('#bet1').click(function() {
        betOne();
    });
    $('#bet5').click(function() {
       betFive();
    });
    $('#bet10').click(function() {
        betTen();
    });
    $('#bet25').click(function() {
        betTwentyFive();
    });
    $('#bet100').click(function() {
        betOneHun();
    });
    $('#clear').click(function() {
        clearBet();
    });
    $('#surrender').click(function() {
        playSurrender();
    });

$('#insurance').click(function() {
    takeInsurance();
    addButtons();
    $('#insurance').hide();
    $('#noinsurance').hide();
    if (scoreHand('dealer') == 21) {
        showDealerHand();
        payInsurance();

        //  alert('You win');
    }
    else {
        $('#winorlose').html('Dealer does not have blackjack');
    }

});
    $('#noinsurance').click(function() {
        addButtons();
        $('#insurance').hide();
        $('#noinsurance').hide();
        if (scoreHand('dealer') == 21) {
            showDealerHand();
            payInsurance();

            //  alert('You win');
        }
        else {
            $('#winorlose').html('Dealer does not have blackjack');
        }
    });

    function clearButtons() {
        $('#hitme').hide();
        $('#stay').hide();
        $('#double').hide();
        $('#surrender').hide();
        $('#insurance').hide();
        $('#noinsurance').hide();
        $('#newhand').show();
        $('#bet1').show();
        $('#bet5').show();
        $('#bet10').show();
        $('#bet25').show();
        $('#bet100').show();
        $('#clear').show();
       // $('#thisbet').hide();
    }

    function addButtons() {
        $('#surrender').show();
        $('#hitme').show();
        $('#stay').show();
        $('#double').show();
        $('#bet1').hide();
        $('#bet5').hide();
        $('#bet10').hide();
        $('#bet25').hide();
        $('#bet100').hide();
        $('#newhand').hide();
        $('#clear').hide();
       // $('#thisbet').show();
    }
    function turnRed() {
        $('#winnings').css('color', 'red');
    }
    function turnGreen() {
        $('#winnings').css('color', 'green');
    }
    function clearWinnings() {
        $('#winnings').html('');
    }
});



