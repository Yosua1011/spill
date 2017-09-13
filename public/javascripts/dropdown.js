var expanded = false;

function showCheckboxes(i) {
  var checkboxes = document.getElementById("checkboxes"[i]);
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}