function copyFunction() {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById("urlText"));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById("urlText"));
    window.getSelection().addRange(range);
    document.execCommand("copy");
  }
  
}