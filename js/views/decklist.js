//this page lists all the decks
window.DeckListPage = Backbone.View.extend({

    initialize:function () {
    	//show the blank template with welcome etc
        this.template = _.template(tpl.get('search-page'));
    },

    render:function (eventName) {
    	//model is DeckCollection
    	//by default show all decks
        this.model.showAll();
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new DeckListView({el: $('ul', this.el), model: this.model});
        this.listView.render();
        return this;
    },

    events:{
    	//when we search update the view with only decks that have x in the name
        "keyup .search-query":"search"
    },

    search:function (event) {
        var key = $('.search-query').val();
        console.log('search ' + key);
        this.model.findByName(key);
    }
});

//This lists all the decks on page load - called by DeckListPage
window.DeckListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        $('#welcome').remove();
        _.each(this.model.models, function (deck) {
        	//for each item returned render according to the item view template
            $(this.el).append(new DeckListItemView({model:deck}).render().el);
        }, this);
        $('#myList').listview('refresh');
        return this;
    }
});

//renders individual decks on the DeckListPage
window.DeckListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.template = _.template(tpl.get('deck-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});



/*
window.DirectReportPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('report-list'));
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new DeckListView({el: $('ul', this.el), model: this.model});
        return this;
    }

});



*/
