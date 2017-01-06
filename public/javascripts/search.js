$(document).ready(function() {
      $('h3.Topic').click(function () {
          //$(this).next().toggle(300);
         $(this).next().toggle(300);
         //$(this).next().slideToggle();
      });
      // $('#ExpandAll').click(function () {
      //   $('#FAQ').children('div.TopicContents').show(300).children('div.answer').show(300);
      // });
      // $('#CollapseAll').click(function () {
      //   $('#FAQ').children('div.TopicContents').hide(300).children('div.answer').hide();
      // });
      jQuery.expr[':'].Contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
      };

      $('#FAQSearch').keyup(function () {
        var searchTerm = $("#FAQSearch").val();
        var listItem = $('.results tbody').children('tr');
        var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

        $.extend($.expr[':'], {'containsi': function(elem, i, match, array){
            return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
         }
       });

       $(".results tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
          $(this).attr('visible','false');
        });

      $(".results tbody tr:containsi('" + searchSplit + "')").each(function(e){
        $(this).attr('visible','true');
      });

      var jobCount = $('.results tbody tr[visible="true"]').length;
        $('.counter').text(jobCount + ' item');

      if(jobCount == '0') {$('.no-result').show();}
        else {$('.no-result').hide();}
      });
      $('#histroy').click(function () {
        $("#resultSet").html('');
        $("#dataResult").css("display", "none");
        $("#FAQ").css("display", "block");
      });
      $('.clickable-row').click(function () {
          var dataSplit = $(this).data("href").split("$")
          $("#resultSet").html('');

             $.ajax({
                 url: "/page",
                 type: "POST",
                 dataType: "json",
                 data: {serviceURL: dataSplit[2]},
                 complete: function() {
                   //called when complete
                   console.log('process complete');
                 },
                success: function(data) {
                   $("#resultSet").append("<tr><td>"+ dataSplit[0] +"</td><td>"+ dataSplit[1] +"</td><td><span class='halflings halflings-ok'></span></td><td>"+ data.responseTime +"ms</td></tr>");
                   $("#dataResult").css("display", "block");
                   $("#FAQ").css("display", "none");
                },
                error: function() {
                   console.log('process error');
                 },
              });
        });
});
