var AppRouter = Backbone.Router.extend({

    routes:{
        "":"list",
        "list":"list",
        "decks/:id":"deckDetails",
        "decks/:id/cards":"deckCards",
        "cards/:id":"cardDetails"
    },

    initialize:function () {
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
        this.searchResults = new DeckCollection();

    },

    //list all the decks
    list:function () {
        this.changePage(new DeckListPage({model: this.searchResults}));
    },

    //list deck information
    deckDetails:function (id) {
    	var deck = new Deck();
    	deck.url = "http://localhost/hAnki/api/decks/"+id;
        var self = this;
        deck.fetch({
            success:function (data) {
                self.changePage(new DeckView({model:data}));
            }
        });
    },

    //list all the cards for a deck
    deckCards:function (id) {
    	this.cardCollection = new CardCollection();
        this.changePage(new CardListPage({model: this.cardCollection, id:id}));
    },

    //list card information
    cardDetails:function (id) {
    	var card = new Card();
    	card.url = "http://localhost/hAnki/api/cards/"+id;
        var self = this;
        card.fetch({
            success:function (data) {
                self.changePage(new CardView({model:data}));
            }
        });
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(document).ready(function () {
    tpl.loadTemplates(['search-page', 'card-list', 'deck-details', 'card-details', 'deck-list-item', 'card-list-item'],
        function () {
            app = new AppRouter();
            Backbone.history.start();
        });
});