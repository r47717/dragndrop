(function($){

	var placeColor = '#eee';
	var placeHighlightedColor = '#aaa';

	$(function() {
	
		var dragging = false;
		var x;
		var y;
		var item = $("#item");
		var itemOriginalX;
		var itemOriginalY;
		var places = $(".place");

		function getCurrentPlace(mx, my) {
			var index = 0;
			places.each(function(ind, value) {
				var place = $(this);
				var placeX1 = parseInt(place.css('left'));
				var placeY1 = parseInt(place.css('top'));
				var placeX2 = placeX1 + parseInt(place.css('width'));
				var placeY2 = placeY1 + parseInt(place.css('height'));

				if (mx >= placeX1 && mx <= placeX2 && my >= placeY1 && my <= placeY2 ) {
					index = ind;
					return false;
				}
			});
			return index;
		}

		function highlightPlace(placeNo) {
			places.css('border-color', placeColor);
			$(places[placeNo]).css('border-color', placeHighlightedColor);
		}

		function getPlaceRect(placeNo) {
			var place = $(places[placeNo]);
			return { 
				left: parseInt(place.css('left')),
				top: parseInt(place.css('top')),
				width: parseInt(place.css('width')),
				height: parseInt(place.css('height'))
			};
		}

		item.mousedown(function(e) {
			dragging = true;
			x = e.originalEvent.clientX;
			y = e.originalEvent.clientY;
			itemOriginalX = parseInt(item.css('left'));
			itemOriginalY = parseInt(item.css('top'));
		});

		item.mouseup(function(e) {
			dragging = false;

			var rect = getPlaceRect(getCurrentPlace(x, y));

			item.animate({
				left: rect.left + "px",
				top: rect.top + "px"
			}, 300);
		});

		item.mousemove(function(e) {
			if (dragging) {
				dX = e.originalEvent.clientX - x;
				dY = e.originalEvent.clientY - y;
				x = e.originalEvent.clientX;
				y = e.originalEvent.clientY;

				var itemX = parseInt(item.css('left')) + dX;
				var itemY = parseInt(item.css('top')) + dY;

				item.css({
					left: itemX + "px",
					top: itemY + "px"
				});

				highlightPlace(getCurrentPlace(x, y));
			}
		});		

	});

})(jQuery);
