window.Deck = Backbone.Model.extend({
    initialize:function () {}
});

window.DeckCollection = Backbone.Collection.extend({

    model:Deck,

    url:"http://localhost/hAnki/api/decks",
    
    showAll:function () {
        var url = 'http://localhost/hAnki/api/decks';
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                self.reset(data);
            }
        });
    },

    findByName:function (key) {
        var url = (key == '') ? 'http://localhost/hAnki/api/decks' : "http://localhost/hAnki/api/decks/search/" + key;
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                self.reset(data);
            }
        });
    }

});