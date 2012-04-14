window.Deck = Backbone.Model.extend({

    urlRoot:"http://localhost/hAnki/api/decks",

    initialize:function () {
        this.cards = new DeckCollection();
        this.cards.url = 'http://localhost/hAnki/api/decks/' + this.id + '';
        
        if(this.id) {
        	this.findById(this.id);
        }
    },

    findById:function (id) {
        var url = "http://localhost/hAnki/api/decks/" + id;
        console.log('findById: ' + id);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
               console.log("search success: " + data.length);
               //self.reset(data);
            }
        });
    }
});

window.DeckCollection = Backbone.Collection.extend({

    model:Deck,

    url:"http://localhost/hAnki/api/decks",
    
    showAll:function () {
    	console.log('1');
        var url = 'http://localhost/hAnki/api/decks';
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    },

    findByName:function (key) {
    	console.log('2');
        var url = (key == '') ? 'http://localhost/hAnki/api/decks' : "http://localhost/hAnki/api/decks/search/" + key;
        console.log(url);
        console.log('findByName: ' + key);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    }

});