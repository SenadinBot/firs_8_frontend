(function ($) {
    var _selects = null;

    $.fn.prettySelect = function () {
        _selects = this;

        this.each(function () {
            var _this = this;
            _this.isOpen = false;

            var refreshTitle = function () {
                if (objTitleSpan) {
                    var str = "";
                    $.each($(_this).find("option:selected"), function (i, n) {
                        str += (str != "" ? ", " : "") + $.trim($(n).text());
                    });

                    if (str == "") {
                        str = $(_this).attr("title");
                    }

                    $(objTitleSpan).text(str).attr("title", str);
                }
            };

            this.toggle = function () {
                var b = typeof arguments[0] == "boolean" ? arguments[0] : !_this.isOpen;
                _this.isOpen = b;

                var objDiv = $(_this).data("selectDiv");
                if (objDiv) {
                    if (b) {
                        $(objDiv).removeClass("select-closed").addClass("select-open");
                        $.each(_selects, function (i, n) {
                            var tmp = $(n).data("selectDiv");
                            if (objDiv != tmp) {
                                $(tmp).removeClass("select-open").addClass("select-closed");
                            }
                        });
                    }
                    else {
                        $(objDiv).removeClass("select-open").addClass("select-closed");
                    }
                }
            };

            this.refreshLabel = function (opt, s) {
                $(opt).attr("data-label", s);
                var objOptDiv = $(opt).data("optionDiv");
                if (objOptDiv) {
                    var objLabel = $(objOptDiv).find(".select-option-label").get(0);
                    if (objLabel) {
                        $(objLabel).text(s);
                    }
                }
            };

            var isMultiple = false;

            //Set up clicks on label elements:
            $("label[for='" + $(_this).attr("id") + "']").click(function (e) {
                e.preventDefault();
                _this.toggle();
            });

            var objDiv = document.createElement("div");
            $(objDiv)
                .addClass("select")
                .addClass("select-closed")
                .data("selectObject", this)
                .bind("clickoutside", function (e) {
                    var t = e.target;
                    var bOwnLabel = false;
                    $.each($("label[for='" + $(_this).attr("id") + "']"), function (i, n) {
                        if (n == t) {
                            bOwnLabel = true;
                        }
                    });
                    if (!bOwnLabel) {
                        _this.toggle(false);
                    }
                });

            if ($(this).attr("multiple")) {
                $(objDiv).addClass("select-multiple");
                isMultiple = true;
            }

            $(this).data("selectDiv", objDiv);

            //Place original select outside viewport:
            $(this).css({
                "position": "absolute",
                "left": "-9999px",
                "visibility": "visible"
            });

            var objTitleDiv = document.createElement("div");
            $(objTitleDiv).addClass("select-title");

            $(objTitleDiv).hover(
				function () { $(this).addClass("select-title-over"); },
				function () { $(this).removeClass("select-title-over"); }
			);

            $(objTitleDiv).click(function (event) {
                _this.isOpen = !_this.isOpen;
                _this.toggle(_this.isOpen);
            });

            var objTitleSpan = document.createElement("span");
            $(objTitleSpan).text($(this).attr("title"));
            $(objTitleDiv).append(objTitleSpan);


            var objOptionsDiv = document.createElement("div");
            $(objOptionsDiv).addClass("select-options");

            var objOptionsContainerDiv = document.createElement("div");
            $(objOptionsContainerDiv).addClass("select-options-content");


            var fnBuildOption = function (n, i, p) {
                var objOptDiv = document.createElement("div");
                $(objOptDiv).addClass("select-option");

                if (i == 0) {
                    $(objOptDiv).addClass("first");
                }
                if (i == opts.length - 1) {
                    $(objOptDiv).addClass("last");
                }

                var bShowLabels = $(_this).attr("data-showlabels") == "true";
                if (bShowLabels) {

                    var objTextLabel = document.createElement("div");
                    $(objTextLabel)
                        .addClass("select-option-text-label")
                        .appendTo(objOptDiv);

                    var objText = document.createElement("span");
                    $(objText)
                        .addClass("select-option-text")
                        .text($(n).text())
                        .appendTo(objTextLabel);

                    var optLabel = $.trim($(n).attr("data-label") || "");
                    if (optLabel != "") {
                        var objSpan = document.createElement("span");
                        $(objSpan)
                            .addClass("select-option-label")
                            .text(optLabel)
                            .appendTo(objTextLabel);
                    }
                }
                else {
                    $(objOptDiv).text($(n).text());
                }

                if ($(n).attr("selected")) {
                    $(objOptDiv).addClass("selected");
                }

                $(objOptDiv).click(function (event) {
                    event.stopPropagation();

                    if (isMultiple) {
                        if ($(n).attr("selected")) {
                            $(n).removeAttr("selected");
                        }
                        else {
                            $(n).attr("selected", "selected");
                        }
                    }
                    else {
                        $(n).attr("selected", "selected");
                    }
                    $(_this).change();
                    if (!isMultiple) {
                        _this.toggle(false);
                    }
                });

                $(objOptDiv).change(function (event) {
                    refreshTitle();
                });


                $(n).data("optionDiv", objOptDiv);

                if (typeof p == "undefined") {
                    $(objOptionsContainerDiv).append(objOptDiv);
                }
                else {
                    $(p).append(objOptDiv);
                }
            };

            var opts = $(this).children("optgroup, option");
            $.each(opts, function (i, n) {
                switch (n.nodeName.toLowerCase()) {
                    case "optgroup":
                        var objDiv = document.createElement("div");
                        $(objDiv)
                            .addClass("select-optgroup")
                            .appendTo(objOptionsContainerDiv);

                        var bCollapse = $(n).attr("data-collapse") == "true";
                        if (bCollapse) {
                            $(objDiv).addClass("collapsible")
                            if ($(n).children("option:selected").length > 0) {
                                $(objDiv).addClass("open");
                            }
                        }

                        var objLabel = document.createElement("div");
                        $(objLabel)
                            .addClass("select-optgroup-label")
                            .text($(n).attr("data-label"))
                            .appendTo(objDiv);

                        if (bCollapse) {
                            $(objLabel).click(function () {
                                $(objDiv).toggleClass("open");
                            });
                        }

                        $.each($(n).children("option"), function (j, m) {
                            fnBuildOption(m, j, objDiv);
                        });
                        break;
                    case "option":
                        fnBuildOption(n, i);
                        break;
                }
            });

            $(objDiv).append(objTitleDiv);
            $(objOptionsDiv).append(objOptionsContainerDiv);
            $(objDiv).append(objOptionsDiv);


            refreshTitle();
            $(this).after(objDiv);


            var fnResize = function () {
                if ($(objOptionsDiv).width() < $(objDiv).width()) {
                    $(objOptionsDiv).css("width", $(objDiv).width() + "px");
                }
                else {
                    $(objOptionsDiv).css("min-width", $(objOptionsDiv).width() + "px");
                }
            }

            //Adjust width of options:
            fnResize();
            $(window).resize(function () {
                window.setTimeout(function () {
                    $(objOptionsDiv).css("width", "auto");
                    $(objOptionsDiv).css("min-width", "auto");
                    fnResize();
                }, 100);
            });

            $(this).focus(function (event) {
                var i = parseInt($(this).attr("selectedIndex"), 10);
                if (i >= 0) {
                    var objOptDiv = $(this).find("option").eq(i).data("optionDiv");
                    $(objOptDiv).addClass("selected");
                }
                _this.toggle(true);
                refreshTitle();
            });

            $(this).blur(function (event) {
                refreshTitle();
            });

            $(this).change(function (event) {
                //Loop through selected options and refresh related divs:

                $.each($(this).find("option"), function (i, n) {
                    var objDiv = $(this).data("optionDiv");
                    if (n.selected) {
                        $(objDiv).addClass("selected");
                    }
                    else {
                        $(objDiv).removeClass("selected");
                    }
                });

                refreshTitle();
            });

            $(this).keyup(function (event) {
                var i = parseInt($(this).attr("selectedIndex"), 10);

                switch (event.which) {
                    case 13: //Enter
                    case 27: //ESC
                        _this.toggle(false);
                        break;
                    case 37: //Left
                    case 38: //Up
                    case 39: //Right
                    case 40: //Down
                        if (!isMultiple) {
                            if (i >= 0) {
                                var n = $(this).find("option").eq(i);
                                $(n).attr("selected", "selected");
                                $(this).change();
                            }
                        }
                        break;
                    default: break;
                }
            });

            $(this).keydown(function (event) {
                switch (event.which) {
                    case 9: //TAB
                        _this.toggle(false);
                }
            });
        });
    };
})(jQuery);