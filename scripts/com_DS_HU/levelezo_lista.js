javascript:
      var group = "";
      $('#content_value table:last').find('tr').not(':first').find('a:eq(0)').each(function (key, val) {
            if (key % 50 != 0 || key == 0) {
                  group += $(val).text().trim() + ";";
            } else {
                  group += "\n\n" + $(val).text().trim() + ";";
            }
      });
      $('h2:eq(0)').after('<textarea id="scriptused_text" cols="90" rows="15"></textarea>');
      $('textarea#scriptused_text').val(group);
      $("#scriptused_text").width($(".vis").width() - 16);
void(0);