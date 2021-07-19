const x = document.querySelector("#hamburger");
const elements = document.querySelector(".nav-items");
x.addEventListener('click', () => {
    if(elements.style.display === "none"){
    elements.style.display = "flex";
    // x.style.display = "none"; 
    }else{
        elements.style.display = "none";
    }
})
