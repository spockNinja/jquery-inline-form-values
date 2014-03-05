(function($){
    $.inlineFormValues = function(el, options){
        var self = this;

        // Access to jQuery and DOM versions of element
        self.$el = $(el);
        self.el = el;

        // Add a reverse reference to the DOM object
        self.$el.data("inlineFormValues", self);

        self.defaultOptions = {
            catchSubmit: true
        };

        self.init = function() {
            self.options = $.extend({}, self.defaultOptions, options);
            self.$el.on("submit", function(e) {
                self.processForm();
                e.preventDefault();
                e.stopPropagation();
            });
        };

        self.processForm = function() {
            var elements = self.$el.find(":input");
            elements.each(function() {
                element = $(this);
                if (element.attr("type") !== "submit") {
                    var newId = "";
                    if (element.attr("id")) {
                        newId = element.attr("id");
                    }
                    else if (element.attr("name")) {
                        newId = element.attr("name");
                    }
                    var newElement = $("<span />", {id: newId, html: element.val() });
                    element.replaceWith(newElement);
                }
                else {
                    element.remove();
                }
            });

            // Get rid of the actual form element.
            self.$el.replaceWith(self.$el.html());
        };

        // Run initializer
        self.init();
    };

    $.fn.inlineFormValues = function(options) {
        return this.each(function() {
            (new $.inlineFormValues(this, options));
        });
    };

})(jQuery);
