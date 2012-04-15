window.Card = Backbone.Model.extend({
    initialize:function () {}
});

window.CardCollection = Backbone.Collection.extend({

    model:Card,

    url:"http://localhost/hAnki/api/decks",
    
    showAll:function () {
        var url = 'http://localhost/hAnki/api/cards';
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                self.reset(data);
            }
        });
    },

    findById:function (id) {
        var url = "http://localhost/hAnki/api/decks/" + id + "/cards";
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