  var getElemId = "#" + $(".design-board").children()[1].id;

  var clickElem = $(".carousel-header a");
  
  $(getElemId).on('slide.bs.carousel', function (e) {
    
    var index = $(e.relatedTarget).index();
    var carIndex = index + 1;
    var carouselElemName = $(".carousel-indicators li:nth-child("+ carIndex +")").attr("title");
    var carouselCustomAtrrName = $(".carousel-indicators li:nth-child("+ carIndex +")").attr("data-title");
    
    switch (index) {
      default:
        $(".carousel-header h1").empty().append(carouselElemName);
        $(".carousel-header a").removeClass().addClass(carouselCustomAtrrName);
    }
  })
  $(clickElem).on("click", function (e) {
      
      e.preventDefault();
      
      var getElemCurrentModal = $(this).attr("data-currentModal");
      var getElemAttrName = $(this).attr("data-site");

      function loadedUrl() {
        
        $(getElemCurrentModal).modal('hide').on('hidden.bs.modal', function () {
            
            $('#modalDesigns').modal('show');
            $('#modalDesigns').on('shown.bs.modal', function () {
              
              $("#designs").load( "template/" + getElemAttrName + "/portfolio/pages.html", function(response) {
                
                  if(document.readyState == "complete") {
                    $(this.querySelector(".modal-body")).html(response);
                  }
            
              });
            })

          $(this).off('hidden.bs.modal'); // Remove the 'on' event binding
        });
      }
    
      loadedUrl();
 
  });
