$(document).ready(function(){
  $('#search').autocomplete({
    source: '/search',
    minLength: 2,
    select: function(event, ui) {
      $.facebox({ ajax: '/mps/'+ ui.item.id});
      return false;
    }
  }).data( "autocomplete" )._renderItem = function( ul, item ) {
    return $( "<li></li>" ).data( "item.autocomplete", item)
    .append( "<a class='ui-corner-all'>" + item.name + "</a>")
    .appendTo( ul );
  };
  $('.hintable').hinty(); 
});
