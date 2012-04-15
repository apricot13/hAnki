window.DeckListPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('search-page'));
    },

    render:function (eventName) {
        this.model.showAll();
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new DeckListView({el: $('ul', this.el), model: this.model});
        this.listView.render();
        return this;
    },

    events:{
        "keyup .search-query":"search"
    },

    search:function (event) {
        var key = $('.search-query').val();
        console.log('search ' + key);
        this.model.findByName(key);
    }
});

window.DeckListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        $('#welcome').remove();
        _.each(this.model.models, function (deck) {
            $(this.el).append(new DeckListItemView({model:deck}).render().el);
        }, this);
        $('#myList').listview('refresh');
        return this;
    }
});

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

