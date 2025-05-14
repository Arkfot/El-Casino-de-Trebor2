function redirigirAleatorio() {
    const enlaces = [
      "https://es.wikipedia.org/wiki/Especial:Aleatoria",
      "https://classroom.google.com",
      "https://mail.google.com/mail/u/0/#inbox",
    ];

    const aleatorio = Math.floor(Math.random() * enlaces.length);
    window.location.href = enlaces[aleatorio];
  }