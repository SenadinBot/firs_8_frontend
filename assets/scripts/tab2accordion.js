/*!
 * Tabs-2-Accordion JS
 * Original author: http://techhysahil.com/
 * Further changes, comments: @Techhysahil
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.

; (function ($) {
    $.fn.tab2accordion = function (options) {

        // Establish our default settings
        var settings = $.extend({
            activeTab: 0
        }, options);

        return this.each(function () {


            $(".tab_content").hide();
            $(".tab_content:first").show();

            /* if in tab mode */
            $("ul.tabs li").click(function () {

                $(".tab_content").hide();
                var activeTab = $(this).attr("rel");
                $("#" + activeTab).fadeIn();

                $("ul.tabs li").removeClass("active");
                $(this).addClass("active");

                $(".tab_drawer_heading").removeClass("d_active");
                $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

            });
            /* if in drawer mode */
            $(".tab_drawer_heading").click(function () {

                $(".tab_content").hide();
                var d_activeTab = $(this).attr("rel");
                $("#" + d_activeTab).fadeIn();

                $(".tab_drawer_heading").removeClass("d_active");
                $(this).addClass("d_active");

                $("ul.tabs li").removeClass("active");
                $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
            });

        });
    }
})(jQuery);