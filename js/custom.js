// Created by Zvonimir Dimovski

$(document).ready(function() {

  // Globals

  var myElements = {
    window: window,
    wWidth: window.innerWidth,
    missionary: $(".misionary-item"),
    fullPage: $("#fullpage"),
    scrollHelper: $(".scroll-helper"),
    progressBar: $(".progress .progress-bar"),
    toggles: $(".c-hamburger")[0],
    myMenu: $('#myMenu'),
    tooltip: $('.tooltips')
  }

  // Check devices

  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  // Full width/height pages

  function heightMethod() {

    var heightObject = {

      wHeight: window.innerHeight,
      headerHeight : 330,
      calcHeight : function() {
        return this.wHeight - this.headerHeight;
      },

      init: function(){
        this.cacheDom();
        this.render();
      },

      cacheDom: function() {
        this.fullHeight = $('.full-height');
        this.semiHeight = $('.semi-height');
        this.header = $('.header');
      },

      render: function(){
        this.headerHeight = this.calcHeight() < this.headerHeight ? this.headerHeight * 0.7 : this.headerHeight;
        $(this.header).attr("style", "height:"+this.headerHeight+"px;");
        $(this.fullHeight).attr("style", "height:"+this.wHeight+"px;");
        $(this.semiHeight).attr("style", "height:"+this.calcHeight()+"px;");
      }
    }

  heightObject.init();

  }

  var execHeight = {

    default: function() {
      heightMethod();
    },
    resize: function() {
      $( myElements.window ).on("resize", function(e) {
        e.preventDefault();
        heightMethod();
      });
    },
    init: function () {
      this.default();
      if ( !isMobile.any() ) {
        this.resize();
      }

    }

  }

  execHeight.init();

  // Overlay

  var overlay = {

    findWindow: function() {
      $(this).find(".overlay").stop().fadeToggle(300);
    },
    init: function() {
      $(myElements.missionary).hover(this.findWindow);
    }

  }

  overlay.init();

  // Loading subpages

  var loadClickedPage = {

    getClickedElem: function () {

      myElements.missionary.on("click", function(e) {

        var modalElement = $(this).attr("data-target");
        var clickedElement = $(this).attr("data-load");

        $(modalElement).on('shown.bs.modal', function() {

          $("#" + clickedElement ).load( "template/" + clickedElement + ".html", function(response) {

              if(document.readyState == "complete") {
                $(this.querySelector(".modal-body")).html(response);
              }

          });

        });

      });
    }

  }

  loadClickedPage.getClickedElem();

  // Scrolling intialization

  if ( myElements.wWidth > 960 ) {

    $(myElements.fullPage).fullpage({

      anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
      menu: '#myMenu',
      afterRender: function() {
          $(myElements.scrollHelper).delay(1400).fadeIn("slow");
      },

      onLeave: function(index, nextIndex, direction) {

        var myElems = {
          fpPrev: $(".fp-prev"),
          fpNext: $(".fp-next")
        }

        var leavingSection = $(this);

        if (index > 0) {
          if(index == 1 && direction =='down') {
            $(myElements.progressBar).progressbar({display_text: 'fill'});
          }
          if (index == 2) {
            $(myElems.fpNext).empty().append("<div class='box-control-right'><img src='images/right.png' /></div><div class='inner-control-right'><span>Frontend dev.</span></div>");
            $(myElems.fpPrev).empty().append("<div class='box-control'><img src='images/left.png' /></div> <div class='inner-control-left'><span>Miscellaneous</span></div>");
          }
         $(myElements.scrollHelper).addClass("scroll-helper-hide");
        }

      },
      scrollOverflow: true,
      normalScrollElements: '.modal, .modal-body',
      afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {

        var loadedSlide = $(this);

        var myElems = {
          fpPrev: $(".fp-prev"),
          fpNext: $(".fp-next"),
          boxCtrl: $(".box-control"),
          boxCtrlRight: $(".box-control-right")
        }

        $(myElems.fpPrev).hover( function() {
          $(myElems.boxCtrl.selector).addClass("button-hover");
        }, function() {
          $(myElems.boxCtrl.selector).removeClass("button-hover");
        });

        $(myElems.fpNext).hover( function() {
          $(myElems.boxCtrlRight.selector).addClass("button-hover-opposite");
        }, function() {
          $(myElems.boxCtrlRight.selector).removeClass("button-hover-opposite");
        });

        switch(slideIndex) {

          case 0:
            $(myElems.fpNext).empty().append("<div class='box-control-right'><img src='images/right.png' /></div><div class='inner-control-right'><span>Frontend dev.</span></div>");
            $(myElems.fpPrev).empty().append("<div class='box-control'><img src='images/left.png' /></div> <div class='inner-control-left'><span>Miscellaneous</span></div>");
            break;

          case 1:
            $(myElems.fpNext).empty().append("<div class='box-control-right'><img src='images/right.png' /></div><div class='inner-control-right'><span>Miscellaneous</span></div>");
            $(myElems.fpPrev).empty().append("<div class='box-control'><img src='images/left.png' /></div> <div class='inner-control-left'><span>Web design</span></div>");
            break;

          case 2:
            $(myElems.fpNext).empty().append("<div class='box-control-right'><img src='images/right.png' /></div><div class='inner-control-right'><span>Web design</span></div>");
            $(myElems.fpPrev).empty().append("<div class='box-control'><img src='images/left.png' /></div> <div class='inner-control-left'><span>Frontend dev.</span></div>");
            break;

        }
      },

      // Scrolling

      css3: true,
      scrollingSpeed: 700,
      easing: 'easeInOutCubic',
      easingcss3: 'ease',

    });

  } else {

    $(myElements.progressBar).progressbar({display_text: 'fill'});

    $('#myMenu a').on('click', function(e){

      e.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
      $(myElements.myMenu).fadeOut( 600 );
      $(myElements.toggles).removeClass("is-active");

    });

  }

  // Menu

  function toggleCtrl(e) {

    e.preventDefault();

    (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");

    if ( this.classList.contains("is-active") === true ) {
      $(myElements.myMenu).fadeIn( 600 );
    } else {
      $(myElements.myMenu).fadeOut( 600 );
    }
  }

  (function () {
    $(myElements.toggles).on( "click touchstart", toggleCtrl );
  })()

  // Tooltip

  $(myElements.tooltip).tooltip();

  $(myElements.tooltip).on("click", function(e) {
    e.preventDefault();
  });



});
