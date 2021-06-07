var card_container_width = $('#pack_cont').width();
var total_cards = $('.cardall').length; //any number of cards will work
var card_spacing = -38;

//shuffle plugin
(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);
//shuffle plugin


//bring cards to initail stacked position
function reset_cards(){
    //hide all cards faces
    close_all_cards();
  
    setTimeout(function () {       
        //stack all cards
        stack_cards(0.2);
       
    }, 800);       
}

//stacks all card with a relative margin, to give a 3d effect
function stack_cards(margin) {
	var left = 0;
	var step = margin;
	var i = 0;
	$('.cardall').each(function(){
		$(this).css({'z-index' : i});					
		$(this).css({'margin-left':left+'px'});
		$(this).css({'margin-top':0+'px'});
		left = left + step;
		i++;
	});
}

//seprates all cards instantly, row wise
function separate_instantly(){
	var left = 0;
	var top = 0;
	var card_width = $('.card1').width();
	var card_height = $('.card1').height();
	var left_step =  card_width + card_spacing;

	$('.cardall').each(function(){
		$(this).css({
			'margin-top':top+'px',
			'margin-left':left+'px',
		});
		left = left + left_step;
		if(left+card_width + card_spacing > card_container_width)
		{
			left = 0;
			top += card_height + card_spacing
		}
	});
}

function close_all_cards() {
    $('.card2').removeClass('open').removeClass('move');    
    $('.cardall').css('background-image', "url(card.png)");   
    $('.cardall').removeClass('card1').removeClass('card2');
}



function separate_one_by_one() {
    $('.card2').addClass('card1');
var left = 0;
var card_width = $('.cardall').width();
var card_height = $('.cardall').height();
//initial top margin for card placement
var top = card_height;
//initial left margin for card placement
var left_step =  card_width + card_spacing;
	
	//time lag between each card placement
	var sec_step = 100;
	var time = 0;
	
	//loop through all cards
	$('.cardall').each(function(){
		var card = $(this);
		setTimeout(function(){
			card.css({
				'margin-top':top+'px',
				'margin-left':left+'px',
			});

			left = left + left_step;
			//if card cannot fit in current row then place it card in next row
			if(left+card_width + card_spacing > card_container_width)
			{
				left = 0;
				top += card_height + card_spacing;
			}
		},time);
		//add time lag for next card placement
		time += sec_step;
	});
}


$(document).ready(function () {
    stack_cards(0.2);
    setTimeout(function () {
        separate_one_by_one('');
    }, 800);

});
 show=0;
$('.card1').click(function () {
	if(show ==0){
    var img = localStorage.getItem("yournum");
    $(".cardall").removeClass("card1");
    $(this).addClass("card2").addClass('move');
    var card = $(this);
    setTimeout(function () {
        card.addClass("open");
        card.css('background-image', "url(images/" + img + ".jpg)");
    }, 800);
    setTimeout(function () {
        $('#P' + img + '').modal('show');
    }, 2000);
    show =1;
	}	
	else{
		 stack_cards(0.2);
    setTimeout(function () {
        separate_one_by_one('');
    }, 800);
	setTimeout(function () {
      $(".cardall").addClass("card1");
    }, 3000);
	
	show=0;
	}
});

$(".btn").click(function () {  
    reset_cards();
})
   

