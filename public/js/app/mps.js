var MP = Backbone.Model.extend({
  htmlId : function() {
    return "mp-" + this.id;
  }  
})
var MPs = Backbone.Collection.extend({
  model: MP,
  initialize: function(params){
    var that = this;
    $.ajax({
      url : 'http://api.myminister.info:3000/states/' + params.stateId+ '/mps.json',
      dataType : "jsonp",
      success : function (data, status, xhr) {
        that.refresh($.parseJSON(data.model));
      }
    });
  }
})

var MPView = Backbone.View.extend({
  id: 'mps',

  initialize: function(params){
    this.handleEvents();
    this.mps = new MPs(params);
    _.bindAll(this, "updateView");
    this.mps.bind('refresh', this.updateView);
  },

  updateView: function() {
    this.render();
  },

  render: function() {
    var that = this;
    $.get('/html/_mps.tpl.html', function(mpTemplate) {
      that.renderComplete(mpTemplate);
    });
    return this;
  },

  renderComplete: function(mpTemplate) {
    var compiledView = $.tmpl(mpTemplate, {mpList: this.mps.models});
    this.$(this.el).html(compiledView);
    $("#col-2").html(this.el);
    $("#mps table tr[id]").click(this.mpSelected);
  },
  
  mpSelected: function() {
    new MPProfileView({mpId: this.id.replace("mp-","")});
  }
});
