var gulp = require('gulp');
var compress_images = require('compress-images');

// We will be compressing images [jpg] with two algorithms, [webp] and [jpg];
// gulp compress_images
gulp.task('compress_images', function() {
    //[jpg] ---to---> [webp]
    compress_images('static/images/**/*.{jpg,JPG,jpeg,JPEG}', 'static/images/', {compress_force: false, statistic: true, autoupdate: true}, false,
                                                {jpg: {engine: 'webp', command: false}},
                                                {png: {engine: false, command: false}},
                                                {svg: {engine: false, command: false}},
                                                {gif: {engine: false, command: false}}, function(err){ 
            if(err === null){ 
                //[jpg] ---to---> [jpg(jpegtran)] WARNING!!! autoupdate  - recommended to turn this off, it's not needed here - autoupdate: false
                compress_images('src/img/**/*.{jpg,JPG,jpeg,JPEG}', 'build/img/', {compress_force: false, statistic: true, autoupdate: false}, false,
                                                                {jpg: {engine: 'jpegtran', command: false}},
                                                                {png: {engine: false, command: false}},
                                                                {svg: {engine: false, command: false}},
                                                                {gif: {engine: false, command: false}}, function(){
                }); 
            }else{
                console.error(err);
            }


    });
});