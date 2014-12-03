// ==UserScript==
// @name         LinkedIn Info Grabber
// @namespace    irc.blacksunhackers.club port 9001 (ssl) #blacksun
// @version      0.1
// @description  Grabs Any Contact Info Hidden Behind The Loading Span On LinkedIn As Well As Name And Position
// @author       Luis "connection" Santana
// @match        https://www.linkedin.com/in/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Set Up Our Variables

/*jshint multistr: true */ // Set jQuery to use multistr

// -- Personal Info Grabber Variables -- \\
var fullName = $('.full-name').text();
var position = $('#headline > .title').text();
var picture = $('img[alt="' + fullName +'"]').attr('src');
var linkedInUrl = window.location.href;

// -- Personal Info Grabber Variables -- \\

// -- Contact Info Grabber Variables -- \\
var links = []; // 'links' is an array that will hold all our contact links
var base_dir = "https://www.linkedin.com/"; // 'base_dir' is the base URL for LinkedIn Redirection links
var elements = $('tr > td > .editable-item > div > ul > li > a'); // CSS Path for contact info links
var urlRegex = /.*url=(.*)\&urlhash.*/; // Regex to grab just the URL portion of contact links
// -- Contact Info Grabber Variables -- \\

// -- Contact Info Grabber Code -- \\
// Parse all the links and clean them up
elements.each(function() 
              { 
                  var raw_link = decodeURIComponent(base_dir + $(this).attr('href')); // URL Decode the raw, redirection link
                  var fixed_link = raw_link.match(urlRegex)[1]; // Remove redirection by extracting info from the "url=" variable
                  links.push(fixed_link); // Store the cleaned up link in the 'links' array
              });

// -- Contact Info Grabber Code -- \\

function linkDump() {
    // Dump Links
    $.each(links, function(index, value) { // Start to dump the links
        setTimeout(function(){ // Small timeout to give the script a chance to run
            if(typeof links[index] !== 'undefined') {
                console.log(value);
                $('.linkData').prepend(value + '<br />');
            }},100);
    });
}

// Let's dump shit

// Dump Name & Position
document.write(' \
<style> \
table, th, td { \
border: 1px solid black; \
} \
table { \
width:100%; \
</style> \
<table> \
<tr> \
<th>Full Name</th> \
<td>' + fullName + '</td> \
</tr> \
<tr> \
<th>Position</th> \
<td>' + position + '</td> \
</tr> \
<tr> \
<th>Photo</th> \
<td><img src="' + picture + '"</img> \
</td> \
</tr> \
<tr> \
<th>Links</th> <td class="linkData">' + linkedInUrl + '<br />' + 
               linkDump() +
    '</td> </tr> \
</table>'
);

