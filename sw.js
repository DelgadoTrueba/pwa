// Asignar nombre y version de la cahe

const CACHE_NAME = "v1_cache_delgadotrueba_pwa";

//Ficheros A CACHEAR EN LA APLICACIÓN

var urlsToCache = ["./",
                   "./index.html",
                   "./assets/img/1.png",
                   "./assets/img/2.png",
                   "./assets/img/3.png",
                   "./assets/img/4.png",
                   "./assets/img/5.png",
                   "./assets/img/6.png",
                   "./assets/img/facebook.png",
                   "./assets/img/twitter.png",
                   "./assets/img/instagram.png",
                   "./assets/img/favicon-1024.png",
                   "./assets/img/favicon-512.png",
                   "./assets/img/favicon-384.png",
                   "./assets/img/favicon-256.png",
                   "./assets/img/favicon-192.png",
                   "./assets/img/favicon-128.png",
                   "./assets/img/favicon-96.png",
                   "./assets/img/favicon-64.png",
                   "./assets/img/favicon-32.png",
                   "./assets/img/favicon-16.png",
                   "./css/styles.css"];

// EVENTO INSTALL
// INSTALACION DEL SERVICE SOEKER Y GUARDAR LA CACHE
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(()=>self.skipWaiting())
            })
            .catch(err => console.log("Error cache", err))
    );
})

// EVENTO ACTIVATE
// Que la app funcione sin conexion
self.addEventListener("activate", e => {
    const cacheWhitelist = CACHE_NAME;
    
    e.waitUntil(
        caches.keys()
            .then(cachesNames =>{
                 return Promise.all(
                    cachesNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //Borrar elementos que no necesitamos
                            return caches.delete(cacheName);
                        }
                    })
                 );
            })
            .then( () => {
                //Activar cache
                self.clients.claim();
            })
    ) 
})


// EVENTO FETCH
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(res =>{
                if(res) return res; //Devuelto datos desde cache;
                return fetch(e.request);
            })
    );
})


