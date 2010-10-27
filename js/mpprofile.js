var MPProfile = Backbone.Model.extend({
  htmlId : function() {
    return "mpprofile-" + this.id;
  },

  initialize : function(params) {
    var that = this;
    $.ajax({
      url : Config.api_host + '/mps/' + params.mpId+ '.json',
      dataType : "jsonp",
      success : function (data, status, xhr) {
        that.set($.parseJSON(data.mpProfile));
      }
    });
  } 
})

var MPProfileView = Backbone.View.extend({
  id: 'mpprofile',

  initialize: function(params){
    this.handleEvents();
    this.mpProfile = new MPProfile(params);
    _.bindAll(this, "updateView");
    this.mpProfile.bind('change', this.updateView);
  },

  updateView: function() {
    this.render();
  },

  render: function() {
    var that = this;
    $.get('/html/_mpprofile.tpl.html', function(mpprofileTemplate) {
      that.renderComplete(mpprofileTemplate);
    });
    return this;
  },

  renderComplete: function(mpprofileTemplate) {
    var compiledView = $.tmpl(mpprofileTemplate, {mpProfile: this.mpProfile});
    this.$(this.el).html(compiledView);
    $(this.el).dialog({minHeight: 900, width: 800, closeOnEscape: true, modal: true});
  }
});
