$(document).ready(function(){
  $('#search').autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "http://api.myminister.info:3000/search/mp.json",
				dataType: "jsonp",
        data: {
        	name: request.term
        },
        
        success: function( mps ) {
          response( $.map( mps, function( mp ) {
            return {
  						label: mp.name,
  						value: mp.name,
  						id: mp.id
            }
					}))
        }
				})
			},
        
    minLength: 2,
    dataType: 'jsonp',
    select: function(event, ui) {
      new MPProfileView({mpId: ui.item.id});
      return false;
    }
  });
  
  $('.hintable').hinty(); 
});
