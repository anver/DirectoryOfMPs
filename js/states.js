var State = Backbone.Model.extend({
  htmlId : function() {
    return "state-" + this.id;
  }
});

var States  = Backbone.Collection.extend({
  model: State,
  initialize: function(){
    var that = this;
    $.ajax({
      url : Config.api_host + '/states.json',
      dataType : "jsonp",
      success : function (data, status, xhr) {
        that.refresh($.parseJSON(data.model));
      }
    });
  },
});

var StateView = Backbone.View.extend({
  id: 'states',
  initialize: function(){
    this.handleEvents();
    this.states = new States();
    this.compiledView = null;
    _.bindAll(this, "updateView");
    this.states.bind('refresh', this.updateView);
  },
  
  events: {
    "click #states table tr[id]": "stateSelected"
  },
  
  updateView: function() {
    this.render();
  },

  render: function() {
    if(this.compiledView) {
      return this;
    }
    var that = this;
    $.get('/html/_states.tpl.html', function(statesTemplate) {
      that.renderComplete(statesTemplate);
    });
    return this;
  },

  renderComplete: function(statesTemplate) {
    this.compiledView = $.tmpl(statesTemplate, {stateList: this.states.models});
    this.$(this.el).html(this.compiledView);
    $("#col-1").html(this.el);
  },

  stateSelected: function(event){
    new MPView({stateId: event.currentTarget.id.replace("state-","")});
  }
});
