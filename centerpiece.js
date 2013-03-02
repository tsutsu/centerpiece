function useImage(largest_image, second_largest_image) {
    // probably not a gallery-image page; if it is, the user can deal with it themselves
	if(largest_image.area < 400) { return; }

    // probably an image-gallery page (image thumbnails have an upper bound on size, so most are near the same size)
	if(second_largest_image && (largest_image.area - second_largest_image.area) < 100) { return; }

	chrome.extension.sendMessage({redirect: largest_image.src});
}

function getImageList() {
	var images = document.getElementsByTagName('img');
	var il = images.length;

	var images_with_areas = [];

	for(var i = 0; i < images.length; i++) {
		var image = images[i];
		var area = Math.sqrt((image.width * image.width) + (image.height * image.height));
		images_with_areas.push({'area': area, 'src': image.src});
	}

	images_with_areas.sort(function(a,b){ return b.area - a.area; });

	return images_with_areas;
}


function notMuchTextGoingOn() {
	var paragraphs = document.getElementsByTagName('p');
	return paragraphs.length < 6;
}


// if we're on a freshly-opened background tab that looks like it doesn't have any "content"...
if(document.webkitHidden && history.length === 1 && notMuchTextGoingOn()) {
	var images = getImageList();

	var largest_image = (images.length >= 1) ? images[0] : null;
	var second_largest_image = (images.length >= 2) ? images[1] : null;

	useImage(largest_image, second_largest_image);
}