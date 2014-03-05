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
                    element.replaceWith("<span id=\"" + element.attr("id") + "\">" + element.val() + "</span>");
                }
                else {
                    element.remove();
                }
            });
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
