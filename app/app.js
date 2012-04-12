(function ($) { 

    //demo data
    var cards = [
        { id: "1", deck_id: "1", side_1: "0123456789", side_2: "2012-04-11 00:00:00", notes: "2012-04-11 22:12:03", created: "2012-04-11 22:12:03" },
        { id: "2   mn", deck_id: "1", side_1: "0123456789", side_2: "2012-04-11 00:00:00", notes: "2012-04-11 22:12:03", created: "2012-04-11 22:12:03" }
    ];
    
    
    //define product model
    var Card = Backbone.Model.extend({
    	initialize: function(){}
    });

    //define deck collection
    var Deck = Backbone.Collection.extend({
        model: Card,
        initialize: function(){}
    });

    //define individual card view
    var CardView = Backbone.View.extend({
        tagName: "article",
        className: "card-container",
        template: $("#cardTemplate").html(),

        render: function () {
            var tmpl = _.template(this.template);
            
            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        }
    });

    //define master view
    var DeckView = Backbone.View.extend({
        el: $("#cards"),

        initialize: function () {
            this.collection = new Deck(cards);
            this.render();
        },

        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderCard(item);
            }, this);
        },

        renderCard: function (item) {
            var cardView = new CardView({
                model: item
            });
            this.$el.append(cardView.render().el);
        }
    });

    //create instance of master view
    var deck = new DeckView();

} (jQuery));