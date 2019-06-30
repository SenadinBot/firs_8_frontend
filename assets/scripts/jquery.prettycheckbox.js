(function ($) {

    var _cbs = null;

    $.fn.prettyCheckbox = function (options) {
        _cbs = $(this).filter("input[type=checkbox], input[type=radio]");

        var options = options || {};
        options.cs = typeof options.cs == "string" ? options.cs : "";


        $.each(_cbs, function (i, n) {

            n._isCB = ($(n).attr("type") == "checkbox");
            n._c = (n._isCB ? "cb" : "r");
            n._hasFocus === false;
            n._isActive === false;
            n._isChecked === false;
            n._isInitialized === false;
            n._isDisabled === false;

            var cs = $(n).attr("class") || "";
            cs = $.trim(cs + " " + options.cs);

            $(n).removeAttr("class");


            if (!n._isInitialized) {
                //Wrap checkbox with container:
                $(n)
                    .css("opacity", "0") //force opacity 0 in honour of IE
                    .wrap('<span class="' + $.trim(n._c + '-wrap ' + cs) + '" />');

                //Create dummy holding graphics:
                var objSpan = $(n).parent("span." + n._c + ":first").get(0);
                if (!objSpan) {
                    objSpan = document.createElement("span");
                    $(objSpan)
                        .addClass(n._c)
                        .insertAfter(n);
                    n.objSpan = objSpan;
                }

                //Refreshes class of dummy span:
                n.refreshSpan = function () {
                    if (this._isChecked) {
                        $(this.objSpan).addClass(this._c + "-checked");
                    }
                    else {
                        $(this.objSpan).removeClass(this._c + "-checked");
                    }

                    if (this._isActive) {
                        $(this.objSpan).addClass(this._c + "-active");
                    }
                    else {
                        $(this.objSpan).removeClass(this._c + "-active");
                    }

                    if (this._hasFocus) {
                        $(this.objSpan).addClass(this._c + "-active");
                    }

                    if (this._isDisabled) {
                        $(this.objSpan).addClass(this._c + "-disabled");
                    }
                    else {
                        $(this.objSpan).removeClass(this._c + "-disabled");
                    }
                };

                //Refreshes "siblings" of radiobuttons:
                n.refreshSiblings = function () {
                    var _this = this;
                    if (!_this.isCB) {
                        if ($(_this).attr("name") != "") {
                            $.each($("input[name='" + $(_this).attr("name") + "']").filter("input[type='radio']"), function (j, m) {
                                if (m != _this) {
                                    m._isChecked = false;
                                    if ($.isFunction(m.refreshSpan)) {
                                        m.refreshSpan();
                                    }
                                }
                            });
                        }
                    }
                };

                if ($(n).is(":disabled")) {
                    n._isDisabled = true;
                    n.refreshSpan();
                }


                if ($(n).is(":checked")) {
                    n._isChecked = true;
                    n.refreshSpan();
                }



                //Handle labels:
                if ($(n).attr("id") != "") {
                    $("label[for=" + $(n).attr("id") + "]").each(function () {
                        $(this).hover(
						function () {
						    n._isActive = true;
						    n.refreshSpan();
						},
						function () {
						    if (!n._hasFocus) {
						        n._isActive = false;
						    }
						    n.refreshSpan();
						}
					);
                    });
                }

                //Hovering on checkbox:
                $(n).hover(
				    function () {
				        n._isActive = true;
				        n.refreshSpan();
				    },
				    function () {
				        if (!n._hasFocus) {
				            n._isActive = false;
				            n.refreshSpan();
				        }
				    }
			    );

                //Checkbox gains focus:
                $(n).focus(function () {
                    n._hasFocus = true;
                    n._isActive = true;
                    n.refreshSpan();
                });

                //Checkbox loses focus:
                $(n).blur(function () {
                    n._isActive = false;
                    n._hasFocus = false;
                    n.refreshSpan();
                });

                //Handle clicks directly on checkbox (also triggered by keypressing):
                $(n).on("click", function (event) {
                    event.stopPropagation();
                    if (n._isCB) {
                        n._isChecked = $(this).is(":checked");
                        n._isDisabled = $(this).is(":disabled");
                        n.refreshSpan();
                    }
                    else {
                        n._isChecked = true;
                        n.refreshSpan();
                        n.refreshSiblings();
                    }
                });

                //Handle changes:
                $(n).on("change", function () {
                    n._isChecked = $(this).is(":checked");
                    n._isDisabled = $(this).is(":disabled");
                    n.refreshSpan();
                });


                n._isInitialized = true;

            }
        });
    };
})(jQuery);