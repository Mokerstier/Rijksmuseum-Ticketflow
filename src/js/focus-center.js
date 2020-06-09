// Code van:
// https://stackoverflow.com/questions/34672091/center-focused-element-of-webpages-vertically
// Het is wel geupdate omdat het verouderde code was

document.documentOffsetTop = function () {
    return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop() : 0 );
};
  
document.scrollIntoViewCenter = function () {
    window.scrollTo( 0, this.documentOffsetTop() - (window.innerHeight / 2 ) );
};
  
  
window.addEventListener("keyup", myScript);
  
function myScript(e) {
    if ('9' == e.keyCode) {  
        document.activeElement.scrollIntoViewCenter();
    }
}