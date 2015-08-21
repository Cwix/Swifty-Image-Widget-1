(function ($) {
	"use strict";
	$(function () {

		$("body").on("change", ".swifty-img-size", function(e){
			if($(this).val() == "custom") {
				$(this).parent().next().show();
			} else {
				$(this).parent().next().hide();
			}
		});

		// Add New Image
		$("body").on("click", ".swifty_add_img", function(e){
			e.preventDefault();
			var widget_holder = $(this).closest('.widget-inside');
			var clone = widget_holder.find('.swifty_imgs_clone').clone();
			$('.swifty_img_holder').append(clone.html());
		});

		// Remove image
		$("body").on("click", ".swifty_remove_img", function(e){
			e.preventDefault();
			$(this).parent().remove();
		});

		var frame,
			imgContainer,
			imgIdInput;

		//Image Frame
		$("body").on("click",".swifty_img_holder .swifty_add_image", function(e) {
			
			var $this = $(this);
			imgContainer = $this.parent().find(".imgContainer");
			imgIdInput = $this.parent().find('.imgIdInput');

			e.preventDefault();

			/* Opet ne radi :)
		    if ( frame ) {
		      frame.open();
		      return;
		    }
		    */

		    // Create a new media frame
		    frame = wp.media({
		      title: 'Select Image',
		      button: {
		        text: 'Use This One'
		      },
		      library : { type : 'image' },
		      multiple: false  // Set to true to allow multiple files to be selected
		    });

		    frame.open();

		    // When an image is selected in the media frame...
		    frame.on( 'select', function() {
		      
		      // Get media attachment details from the frame state
		      var attachment = frame.state().get('selection').first().toJSON();

		      // Send the attachment URL to our custom image input field.
		      imgContainer.html( '<img src="'+attachment.url+'" alt="" style="max-width:100%;"/>' );

		      // Send the attachment id to our hidden input
		      imgIdInput.val( attachment.id );

		      // Remove image button
		      $this.text("Edit Image");
		    });

		});
	});
}(jQuery));