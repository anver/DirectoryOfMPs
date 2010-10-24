var State = Backbone.Model.extend({});
var States  = Backbone.Collection.extend({
  model: State,
  initialize: function(){
    var that = this;
    $.ajax({
      url : 'http://api.myminister.info:3000/states.json',
      dataType : "jsonp",
      success : function (data, status, xhr) {
        that.refresh($.parseJSON(data.model));
      }
    });
  },
});

var StateView = Backbone.View.extend({
  id: 'states',

  events: {},
  initialize: function(){
    this.handleEvents();
    this.states = new States();
    this.compiledView = null;
    _.bindAll(this, "updateView");
    this.states.bind('refresh', this.updateView);
  },

  updateView: function() {
    $("#data").html(this.render().el);
  },

  render: function() {
    if(this.compiledView) {
      return this;
    }
    var that = this;
    $.get('/html/_states.tpl.html', function(statesTemplate) {
      that.compiledView = $.tmpl(statesTemplate, {stateList: that.states.models})
      that.$(that.el).html(that.compiledView);
    });
    return this;
  }
});

$(document).ready(function(){
  var app = new StateView()
});