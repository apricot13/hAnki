
window.DeckView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('deck-details'));
    },

    render:function (eventName) {
    	//this is where the problem is
    	console.log(this.model.toJSON());
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

