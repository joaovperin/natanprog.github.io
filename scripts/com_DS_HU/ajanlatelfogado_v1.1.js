(function() {
        var mainSearch = beallitasok.keres.replace("fa", "wood").replace("agyag", "stone").replace("vas", "iron").replace("összes", "all");
        var mainOffer = beallitasok.kinal.replace("fa", "wood").replace("agyag", "stone").replace("vas", "iron").replace("összes", "all");

        function setResType() {
                $('form#offer_filter').children('table').first().find('table').first().find('input').filter('[value="' + mainSearch + '"]').prop("checked", true);
                $('form#offer_filter').children('table').first().find('table').last().find('input').filter('[value="' + mainOffer + '"]').prop("checked", true);
                $('form#offer_filter').trigger("submit");
        }

        function getResType() {
                var ret = {};
                ret.search = $('form#offer_filter').children('table').first().find('table').first().find('input').filter('[value="' + mainSearch + '"]').prop("checked");
                ret.offer = $('form#offer_filter').children('table').first().find('table').last().find('input').filter('[value="' + mainOffer + '"]').prop("checked");
                return ret;
        }

        function checkResType() {
                var resType = getResType();
                if (!resType.search || !resType.offer) {
                        return false;
                } else {
                        return true;
                }
        }
        var coming;
        if ($("#market_status_bar").find("th:contains('Beérkező: ')").is(":visible")) {
                $("#market_status_bar").find("th:contains('Beérkező: ')").find(".nowrap").each(function(key, val) {
                        if ($(val).find("span").hasClass("" + mainSearch + "")) {
                                coming = parseInt($(val).text().replace(".", ""));
                        } else {
                                coming = 0;
                        }
                })
        } else {
                coming = 0;
        }
        if ($("#market_status_bar").find("th:contains('Incoming: ')").is(":visible")) {
                $("#market_status_bar").find("th:contains('Incoming: ')").find(".nowrap").each(function(key, val) {
                        if ($(val).find("span").hasClass("" + mainSearch + "")) {
                                coming = parseInt($(val).text().replace(".", ""));
                        } else {
                                coming = 0;
                        }
                })
        } else {
                coming = 0;
        }
        function acceptOffer() {
                var traders = $('div#market_status_bar').children('table').first().find('th').first().text().replace("Kereskedők: ", "").replace("Merchants: ", "").split("/");
                var premiumTrading = $('form#offer_filter').parent().children('table').first().find('th').length == 3;
                var moveableInTheory = parseInt(traders[0]) * 1000;
                var allInTheory = parseInt(traders[1]) * 1000;
                var offer = 0;
                var price = 0;
                var available = 0;
                var number = 0;
                var required = beallitasok.mennyiseg - coming;
                var moveable = Math.min(moveableInTheory, parseInt($('span#' + mainOffer).text()));
                if (required <= 0) {
                        UI.SuccessMessage("Ide már elég nyersanyag jön!");
                } else {
                        $('form#offer_filter').parent().children('table').last().find('tr').slice(2).each(function(key, val) {
                                offer = parseInt($(val).children('td').first().text().replace(".", ""));
                                price = parseInt($(val).children('td').eq(1).text().replace(".", ""));
                                available = parseInt($(val).children('td').eq(5).text().replace(" Ajánlat", ""));
                                if (offer <= required && price <= moveable) {
                                        for (number = 0;
                                                (number < available) && ((number * offer) < required) && ((number * price) < moveable); number++);
                                        $('[name=count]').first().val(number);
                                        required = required - (number * offer);
                                        $(val).children('td').last().find('input.btn').first().trigger("click");
                                }
                        });
                }
        }

        function __() {
                if (checkResType()) {
                        acceptOffer();
                } else {
                        setResType();
                }
        }
        if (document.URL.match("screen=market") && document.URL.match("mode=other_offer")) {
                __();
        } else {
                alert("A script csak a piacon működik, a \"Kereskedelem\" résznél. Most átirányítunk oda.");
                self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=market&mode=other_offer");
        }
})();