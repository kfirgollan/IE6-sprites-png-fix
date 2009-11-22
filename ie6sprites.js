try {
document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}
(function($) {
    var sizes = {
        'images/sprites3.png': ['390px', '218px']
    };
    var $body = $('body');
    var getExtension = function(filename) {
         if(typeof filename !== 'string')
            throw('Filename must be a string');
         var pos = filename.lastIndexOf('.');
         if(pos === -1)
            return '';
         return filename.substring(pos + 1).toLowerCase();
    }
    var createDivs = function(pos, bg) {
        var $this = this;
        $this.css('background-image', 'none');
        var $wrapper = $('<div></div>');
        var offset = $this.offset();
        if($this.css('position') === 'absolute') {
            var posi = [0,0];   
        } else {
            var posi = $this.position();
            posi = [
                parseInt($this.css('margin-top'))+parseInt(posi.top)+"",
                parseInt($this.css('margin-left')) + parseInt(posi.left)+""
            ];
        }
        $wrapper.css({
            'width': $this.width(),
            'height': $this.height(),
            'overflow': 'hidden',
            'position': 'absolute',
            'top': posi[0],
            'left': posi[1]
        });
        $this.append($wrapper);
        var $wrapper2 = $('<div></div>');
        $wrapper2.css({
            'width': $this.width(),
            'height': $this.height(),
            'overflow': 'hidden',
            'position': 'relative'    
        });
        $wrapper.append($wrapper2);
        var $div = $('<div></div>');
        $div.css({
            'width': sizes[bg][0],
            'height': sizes[bg][1],
            'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod='crop', src='"+bg+"')",
            'position': 'absolute',
            'left': pos[1]+'px',
            'top': pos[2]+'px' 
        });
        $wrapper2.append($div);
        return $wrapper;
   };
   var handle = function(i) {
        var $this = $(this);
        var bg = $this.css('background-image');
        if(bg !== "none") {
            bg = bg.substring(5,bg.length-2); 
        }
        if(getExtension(bg) === 'png' && typeof sizes[bg] === 'object') {
            var bg_pos = $this.css('background-position');
            if (bg_pos == 'undefined' || bg_pos == null) {
                var pos = [
                    '',
                    parseInt($this.css("background-position-x"))+"",
                    parseInt($this.css("background-position-y"))+""
                ];
            } else {
                var pos = /^(-?\d+)px +(-?\d+)px$/.exec(bg_pos);
            }
            if(pos) {
                var $wrapper = createDivs.call($this, pos, bg);
                /*
                $this.parents('.pngfix_trigger').hover(function() {
                    console.log('mouseenter',i,$wrapper);
                    $wrapper.remove();
                    handle.call($this, i); 
                }, function() {
                    console.log('mouseleave',i,$wrapper);
                    $this.append($wrapper);
                    //handle.call($this, i);
                });
                */
            }
        }
    }
    $(function() {
        $('*').each(handle);
    });
})(jQuery);