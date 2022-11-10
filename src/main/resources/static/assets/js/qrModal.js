 function qrModalFunciton() { 
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
 // var img = document.getElementById("openQRModal");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
 // img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = "assets/img/sampleQR.jpg";
    captionText.innerHTML = "Scan to open the PDF";
 // }

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() { 
    modal.style.display = "none";
  }
}