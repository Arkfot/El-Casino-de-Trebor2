// Mapea los identificadores a URLs reales
const juegos = {
  "evilg":"https://ornate-biscotti-ca55b7.netlify.app",
  "friendlyf":"https://nimble-entremet-5f5d28.netlify.app",
  "gladdihoper": "https://transcendent-brioche-015864.netlify.app", // puedes añadir más aquí
  "Q1k3": "https://zesty-dusk-501f85.netlify.app", // puedes añadir más aquí
  "radiusraid": "https://radiant-gnome-b28e0c.netlify.app", // puedes añadir más aquí
  "Retro-Haunt": "https://brilliant-crostata-fe0a86.netlify.app", // puedes añadir más aquí
  "ritz": "https://jocular-fenglisu-05222c.netlify.app", // puedes añadir más aquí
  "shuttledeck": "https://wonderful-dodol-b8c2f8.netlify.app", // puedes añadir más aquí
  "EdgeNotFound": "https://musical-ganache-cb1dfb.netlify.app", // puedes añadir más aquí
  "Ninja-EvilCorp": "https://mellifluous-kringle-2b93c8.netlify.app", // puedes añadir más aquí
  "Pushback": "https://aquamarine-griffin-a90960.netlify.app", // puedes añadir más aquí

  "Drifthunters": "https://precious-mochi-d4d238.netlify.app", // puedes añadir más aquí
  "Gop-Her-Kart": "https://dapper-brigadeiros-e7dd95.netlify.app", // puedes añadir más aquí
  "Moto-Dash-3D": "https://gorgeous-pegasus-443c23.netlify.app", // puedes añadir más aquí
  "Highway-Traffic": "https://magical-trifle-997ef1.netlify.app", // puedes añadir más aquí
  "Drive-Mad": "https://imaginative-seahorse-290e74.netlify.app", // puedes añadir más aquí
  "tunnel-rush":"https://effulgent-blini-4896e3.netlify.app",

  "Baldi-Basics": "https://67c9f0d83d47f634cf579fe3--moonlit-kitsune-37ae82.netlify.app", 
  "Chromain-Incident": "https://fantastic-stroopwafel-4eb7b3.netlify.app",  
  "Cluster-Rush": "https://67c9fdad3d47f64e06579fd2--visionary-cucurucho-04485c.netlify.app", 
  "DeathRun-3D": "https://joyful-piroshki-7deb60.netlify.app", 
  "deepestsword": "https://luminous-strudel-6ed897.netlify.app", 
  "Doodle-Jump": "https://cute-dragon-17fa1d.netlify.app", 
  "Fire-Water": "https://remarkable-cajeta-0070bf.netlify.app", 
  "Flappy-Bird": "https://fancy-youtiao-c63790.netlify.app", 
  "Flappy-2048": "https://resilient-hamster-a399ae.netlify.app", 
  "Flappy-Plane": "https://silly-sundae-6d53e7.netlify.app", 
  "HexGL": "https://incredible-trifle-899ac6.netlify.app", 
  "Hextris": "https://adorable-sopapillas-54539c.netlify.app", 
  "Konnekt": "https://glistening-sprinkles-39439d.netlify.app", 
  "Stack": "https://guileless-figolla-5d7e8b.netlify.app", 
  "stackball": "https://reliable-souffle-363c38.netlify.app", 
  "The-Maze-Of-Space-Goblins": "https://legendary-mermaid-f7a8ba.netlify.app", 
  "WeHold": "https://majestic-genie-b9eb0b.netlify.app", 
  "WHG2": "https://animated-concha-ec9fba.netlify.app", 
  "xx142b2exe":"https://stupendous-travesseiro-4a54db.netlify.app", 
  "Ducklife1": "https://clinquant-seahorse-846bde.netlify.app", 
  "Ducklife2": "https://loquacious-donut-0f1164.netlify.app", 
  "Ducklife3": "https://moonlit-pie-5d3b11.netlify.app", 
  "Ducklife4": "https://nimble-concha-f2b84a.netlify.app", 
  "Ducklife5": "https://singular-baklava-74ce90.netlify.app/play/", 
  "Sleep-beat": "https://darling-meerkat-b9093d.netlify.app",

  "Basket-Bros-IO": "https://polite-puppy-beac95.netlify.app", 
  "BasketBall-Legends-2020": "https://67c9f3edf7d7738bb946f6ed--frolicking-stroopwafel-47200d.netlify.app",
  "Basketball-Stars": "https://taupe-daifuku-2ed467.netlify.app",
  "Breaklock": "https://unique-marzipan-7bd442.netlify.app", 
  "Captain-Callisto": "https://rococo-gelato-8570ca.netlify.app", 
  "Chess": "https://transcendent-panda-b5c0a7.netlify.app", 
  "Connect3": "https://tiny-gumption-6c386b.netlify.app", 
  "The-Rope":"https://incandescent-melomakarona-b64646.netlify.app", 
  "Cut-T-Rope-H": "https://resonant-vacherin-38146e.netlify.app", 
  "Cut-The-Rope-TimeTravel": "https://playful-mochi-7ff578.netlify.app", 
  "Factory-Balls-Forover": "https://reliable-manatee-6fa02a.netlify.app", 
  "Packabunchas": "https://elegant-moonbeam-20dc0d.netlify.app", 
  "Space-Company": "https://astonishing-crumble-9e7714.netlify.app", 
  "Tetris": "https://majestic-biscochitos-6793e4.netlify.app", 
  "Trimps": "https://jolly-rugelach-e090c1.netlify.app", 
  "2048": "https://bejewelled-babka-ac17b3.netlify.app", 
  "CSGO-Clicker": "https://effervescent-mandazi-3ab82c.netlify.app", 
  "Monkey-Mart": "https://starlit-puppy-139981.netlify.app", 
  "Riddles-School-2": "https://astonishing-douhua-af1dd1.netlify.app", 
  "Pushback": "https://aquamarine-griffin-a90960.netlify.app", 
  
  "BackCountry": "https://67c9f27ce67f898663eca256--astonishing-haupia-9f8c16.netlify.app", 
  "Cookie-Clicker": "https://teal-gingersnap-c5453d.netlify.app", 
  "BitLife": "https://magnificent-buttercream-b594f3.netlify.app", 
  "Black-Hole-Square": "https://cosmic-arithmetic-4d273a.netlify.app", 
  "Bounce-Back": "https://bespoke-dodol-45663e.netlify.app", 
  "BTD4": "https://effulgent-narwhal-3d4ca5.netlify.app", 
  "Chorme-Dino": "https://incandescent-pixie-98611a.netlify.app", 
  "Clicker-Heroes": "https://67c9fd4e94bf9f4fbe674395--celadon-baklava-5c884f.netlify.app", 
  "Cube-Field": "https://bright-kheer-b98d02.netlify.app", 
  "Cubito-Mayhem": "https://boisterous-faloodeh-976ea2.netlify.app", 
  "Earn-To-Die": "https://thriving-salamander-24a897.netlify.app", 
  "Lets-Surf": "https://beautiful-tarsier-139dec.netlify.app", 
  "Om-Nom-Bounce": "https://silly-yeot-fff65e.netlify.app", 
  "Pacman": "https://astonishing-taffy-8bfe56.netlify.app", 
  "Paper-io": "https://magical-sfogliatella-764d4d.netlify.app", 
  "RedBall4": "https://tiny-basbousa-fb28f5.netlify.app", 
  "RetroBowl": "https://serene-toffee-8923c0.netlify.app",
  "Roadblocks": "https://dapper-kitten-57d9c9.netlify.app", 
  "Metal3": "https://venerable-jalebi-fde095.netlify.app", 
  "Slope": "https://visionary-hotteok-1e4f4d.netlify.app", 
  "Slope2": "https://shimmering-otter-e98a1b.netlify.app", 
  "Snow-Battle": "https://venerable-longma-767218.netlify.app", 
  "Space-Huggers": "https://helpful-syrniki-aedb6a.netlify.app", 
  "Space-Invaders": "https://phenomenal-griffin-f10dac.netlify.app", 
  "Tiny-Fishing": "https://lucent-beignet-87d228.netlify.app", 
  "Tomb-Of-The-Mask": "https://vocal-belekoy-92562d.netlify.app", 
  "Tower-Master": "https://cozy-palmier-b678cf.netlify.app", 
  "Vex3": "https://lively-boba-2cc4ac.netlify.app", 
  "Vex4": "https://golden-salamander-8b5820.netlify.app", 
  "Vex5": "https://startling-medovik-385dec.netlify.app", 
  "Vex6": "https://unique-lebkuchen-598e60.netlify.app", 

};

// Obtener el parámetro ?juego=
const params = new URLSearchParams(window.location.search);
const idJuego = params.get("juego");

// Buscar el enlace real
const urlJuego = juegos[idJuego];

if (urlJuego) {
  document.getElementById("iframe-juego").src = urlJuego;
} else {
  document.body.innerHTML = "<h2>Juego no encontrado o parámetro inválido.</h2>";
}