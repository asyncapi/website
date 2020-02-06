window.addEventListener("load", function(){
window.cookieconsent.initialise({
  content: {
    header: 'Cookies used on the website!',
    message: 'We are using cookies to personalize content and ads to make our site easier for you to use.',
    dismiss: 'Confirm',
    allow: 'Allow cookies',
    deny: 'Decline',
    link: 'Learn more',
    href: 'http://cookiesandyou.com',
    close: '&#x274c;',
  },
  cookie: {
    expiryDays: 365
  },
  position: 'top'
});
$(".cc-banner").wrapInner("<div class='cc-container container'></div>");
});