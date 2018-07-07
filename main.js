$("document").ready(function(){
    
    $("#menu a").click(function(e){
        e.preventDefault();
        
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top
        });
        
        return false;
    })
    
})

// Service Worker
if("serviceWorker" in navigator){
    
   navigator.serviceWorker.register("./sw.js")
    .then(res => console.log("serviceWorker Registrado", res))
    .catch(err => console.log("serviceWorker NO Registrado", err));
   
}
else{
    console.log("No se puede usar el service Worker");
}