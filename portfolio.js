var anythingIWant = document.body;
var isDark = false;
var darkModeButton = document.getElementById("buttonDarkMode");
darkModeButton.addEventListener("click", changeToDarkMode);

function changeToDarkMode(){
  if(isDark === true) {
    
    darkModeButton.textContent = "DARK MODE";
    anythingIWant.style.background = "#ffffff";
    anythingIWant.style.color = "rgb(79, 78, 78)" ;
    console.log("dark mode is off!");
    isDark = false;
    
} else if(isDark === false) {
  
    darkModeButton.textContent = "LIGHT MODE";
    anythingIWant.style.background = "#000000";
    anythingIWant.style.color = "rgb(79, 78, 78)" ;
    isDark = true;
    console.log("dark mode is on!");
}
}