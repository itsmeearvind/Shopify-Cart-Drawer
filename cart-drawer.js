// Change in Cart
function updateQuantity(line,quantity) {
  $.ajax({
      type: 'POST',
      url: '/cart/change',
      data: 'quantity=' + quantity + '&line=' + line,
      dataType: 'json',
      success: function(cart) {
      },
    });
}
// ===============================================================================
// Fetch product to cart Drawer
$(document).ready(function() {
	$('.product-form__cart-submit').click(function(e){
        e.preventDefault();
      var data = $(this).parents('form').serialize();
        var qty = 1;
                $.ajax({
                      type: 'POST',
                      url: '/cart/add',
                      data: data,
                       dataType: 'html',
                      success: function(response){
                       $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
                       $('.cart__drawer').html($(response).filter('.cart__drawer').html()).addClass('show-cart__drawer');
                          $('.cart__drawer').show();

                        $('.cross').click(function(){
                            $('.cart__drawer').hide();
                        });

                      }
                });
                  
              });
});
// ===============================================================================


$(document).ready(function() {
  
  // Cart Drawer Open On Click Cart Icon
  $('.site-header__cart').click(function(e){
    e.preventDefault();
    $('.cart__drawer').show();
      });
  // Cart Drawer Close On Click cross Icon
  $(document).on("click",".cross",function() {
  	 $('.cart__drawer').hide();
       });

});


// ===============================================================================



$(document).ready(function() {
  
  // Remove Item from Cart
  $(document).on("click",".cart__remove",function(e) {
        e.preventDefault();
        var itemUrl = $(this).attr('href');
        $.ajax({
          url: itemUrl,
          type:'GET',
          dataType: 'html',
          success: function(response){
            $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
          	$('.cart__drawer').html($(response).filter('.cart__drawer').html());  
          }
        });
	});
  
  
});

// ===============================================================================




// Change In Quantity Selector
$(document).ready(function() {
  
      $(document).on("click",".plus",function() {
          $(this).prev().val(+$(this).prev().val() + 1);
        var data =  $(this).parents('form').serialize();
        console.log(data);
          var quantity = $(this).prev().val();
          updateQuantity(data,quantity);
              $.ajax({
                type: 'POST',
                url: '/cart/update',
                data: data,
                dataType: 'html',
                success: function(response){
                  $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
                  $('.cart__drawer').html($(response).filter('.cart__drawer').html());
                }
              });
 
  		});

  	 $(document).on("click",".minus",function() {
          if ($(this).next().val() > 0) {
              $(this).next().val(+$(this).next().val() - 1);
            	var data =  $(this).parents('form').serialize();
              	var quantity = $(this).next().val();
           	  	updateQuantity(data,quantity);
                      $.ajax({
                        type: 'POST',
                        url: '/cart/update',
                        data: data,
                        dataType: 'html',
                        success: function(response){
                          $('.cart__drawer-item').html($(response).find('.cart__drawer-item').html());
                          $('.cart__drawer').html($(response).filter('.cart__drawer').html());
                      }
                    });
    		}
  	});
});

