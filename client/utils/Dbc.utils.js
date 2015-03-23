var DsxUtils = {
  selectElementContents: function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  },
  isValidJson: function (string) {
    try {
        JSON.parse(string);
    } catch (e) {
     console.log(e, 'error');
        return false;
    }
    return true;
 }
}


module.exports = DsxUtils;
