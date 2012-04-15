window.CardListPage = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('card-list'));
    },

    render:function (eventName) {
        this.model.findById(this.id);
        $(this.el).html(this.template(this.model.toJSON()));
        this.listView = new CardListView({el: $('ul', this.el), model: this.model});
        this.listView.render();
        return this;
    }
});

window.CardListView = Backbone.View.extend({

    initialize:function () {
        this.model.bind("reset", this.render, this);
    },

    render:function (eventName) {
        $(this.el).empty();
        $('#welcome').remove();
        _.each(this.model.models, function (deck) {
            $(this.el).append(new CardListItemView({model:deck}).render().el);
        }, this);
        $('#myList').listview('refresh');
        return this;
    }
});

window.CardListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        this.template = _.template(tpl.get('card-list-item'));
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});

