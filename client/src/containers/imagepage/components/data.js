const data = {
    componentData:[
        {
            id: 1,
            title: 'Blur Image',
            desc : 'The Blur tool allows you to paint blur effect on specific areas of an image',
            price : 0,
        },
        {
            id: 2,
            title: 'Edge Detection',
            desc : 'Edge detection is an image processing technique for finding the boundaries of objects within images',
            price : 0
        },
        {
            id: 3,
            title: 'Greyscale',
            desc : 'Grayscale images, a kind of black-and-white or gray monochrome, are composed exclusively of shades of gray. ',
            price : 0
        },
        {
            id: 4,
            title: 'Sharpen Image',
            desc : 'The Sharpen tool focuses on soft edges in a photo to increase clarity or focus',
            price : 0
        },
        {
            id: 5,
            title: 'Histogram Equalisation',
            desc : 'Perfrom histogram equalisation on an image',
            price : 0
        },
        {
            id: 6,
            title: 'Denoising',
            desc : 'Perform denoising on an image',
            price : 0
        },
        {
            id: 7,
            title: 'Gamma Correction',
            desc : 'Gamma correction can be used to control overall brightness of an image',
            price : 0
        },
        {
            id: 8,
            title: 'Blue Channel',
            desc : 'Seperate blue channel for preprocessing',
            price : 0
        },
        {
            id: 9,
            title: 'Green Channel',
            desc : 'Seperate green channel for preprocessing',
            price : 0
        },
        {
            id: 10,
            title: 'Red Channel',
            desc : 'Seperate red channel for preprocessing',
            price : 0
        },
        {
            id: 11,
            title: 'Hough Line Trasform',
            desc : 'Detects lines in images',
            price : 0
        },
        {
            id: 12,
            title: 'Contour',
            desc : 'Perform contouring operation on image',
            price : 0
        },
        {
            id: 13,
            title: 'Histogram Sketching',
            desc : 'Sketch the histogram to utilise the full range of pixel intensities',
            price : 0
        },
        {
            id: 14,
            title: 'Texture Analysis',
            desc : 'Extract texture features from the image',
            price : 0
        },
        {
            id: 15,
            title: 'Dialation',
            desc : 'Used to accenuate features',
            price : 0
        },
        {
            id: 16,
            title: 'Contrast Stretching',
            desc : 'Improves contrast of image',
            price : 0
        },
        {
            id: 17,
            title: 'Erosion',
            desc : 'Used to diminish the features of image',
            price : 0
        },
        {
            id: 18,
            title: 'Binary Thresholding',
            desc : 'Performs binary thresholding on image',
            price : 0
        },
        {
            id: 19,
            title: 'Binary Thresholding Inverted',
            desc : 'Performs binary thresholding with inversion on image',
            price : 0
        },
        {
            id: 20,
            title: 'Truncated Thresholding',
            desc : 'Performs truncated thresholding on an image',
            price : 0
        },
        {
            id: 21,
            title: 'Adaptive thresholding mean',
            desc : 'Performs adaptive thresholding with mean',
            price : 0
        },
        {
            id: 22,
            title: 'Adaptive thresholding Gaussian',
            desc : 'Peforms adaptive thresholding with gaussian weights',
            price : 0
        },
        {
            id: 23,
            title: 'Sobel X',
            desc : 'Performs sobel edge detection in X direction',
            price : 0
        },
        {
            id: 24,
            title: 'Sobel Y',
            desc : 'Performs sobel edge detection in Y direction',
            price : 0
        },
        {
            id: 25,
            title: 'Sobel OR',
            desc : 'Performs sobel edge detection in both X and Y direction',
            price : 0
        },
        {
            id: 26,
            title: 'Laplacian filter',
            desc : 'Applies laplacian filter',
            price : 0
        },
        {
            id: 27,
            title: 'Opening',
            desc : 'Applies morphological operation - opening',
            price : 0
        },
        {
            id: 28,
            title: 'Closing',
            desc : 'Applies morphological operation - closing',
            price : 0
        },
        {
            id: 29,
            title: 'Brighten Image',
            desc : 'Increases brightness of image',
            price : 0
        },
        {
            id: 30,
            title: 'Invert Image',
            desc : 'Inverts the values of pixels in a image',
            price : 0
        },
        {
            id: 31,
            title: 'Summer filter',
            desc : 'Increase the warmth and saturation of image',
            price : 0
        },
        {
            id: 32,
            title: 'Winter filter',
            desc : 'Increase the coldness and gloom of image',
            price : 0
        },
        {
            id: 33,
            title: 'Daylight filter',
            desc : 'Increase the lightness channel in HLS colorspace',
            price : 0
        },
        {
            id: 34,
            title: '60s TV filter',
            desc : 'Convert to 60s black and white image',
            price : 0
        },
        {
            id: 35,
            title: 'Sepia filter',
            desc : 'Gives a warmish brown tone',
            price : 0
        },
        {
            id: 36,
            title: 'Splash filter',
            desc : 'Only certain colors are left as it is and the rest are converted to grayscale',
            price : 0
        },
        {
            id: 37,
            title: 'Duo-Tone filter',
            desc : 'Duo-Tone filter applied to image',
            price : 0
        },
        {
            id: 38,
            title: 'Cartoon filter',
            desc : 'Cartoonize the given image',
            price : 0
        },
        {
            id: 39,
            title: 'Emboss',
            desc : 'Perform image embossing',
            price : 0
        },
        {
            id: 40,
            title: 'Pencil sketch grey',
            desc : 'Get a grey pencil sketch of image',
            price : 0
        },
        {
            id: 41,
            title: 'Pencil sketch color',
            desc : 'Get a colorful pencil sketch of image',
            price : 0
        },
        {
            id: 42,
            title: 'Rotate clockwise',
            desc : 'Rotates the image in clockwise direction',
            price : 0
        },
        {
            id: 43,
            title: 'Rotate Anti-Clockwise',
            desc : 'Rotates the image in anti clockwise direction',
            price : 0
        },
        {
            id: 44,
            title: 'Resize',
            desc : 'Resizes image',
            price : 0
        },
        {
            id: 45,
            title: 'Rescale',
            desc : 'Rescales image',
            price : 0
        },
        {
            id: 46,
            title: 'Horizontal flip',
            desc : 'Flips image horizintally',
            price : 0
        },
        {
            id: 47,
            title: 'Vertical flip',
            desc : 'Flips image vertically',
            price : 0
        },
        {
            id: 48,
            title: 'HLS Features',
            desc : 'Produces image in HLS colorspace',
            price : 0
        },
        {
            id: 49,
            title: 'HSV Features',
            desc : 'Produces image in HSV colorspace',
            price : 0
        },
        {
            id: 50,
            title: 'Dotted image',
            desc : 'Gives dotted image',
            price : 0
        },
        {
            id: 51,
            title: 'Enhance Zip',
            desc : 'Enhances image',
            price : 0
        },
    ]
}

export default data;







