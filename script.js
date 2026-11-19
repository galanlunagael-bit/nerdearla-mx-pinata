```html
<!doctype html>
<html lang="es-MX">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mi piñata</title>
    <meta name="description" content="Una piñata para romper desde el navegador, publicada con AWS Amplify en Nerdearla México." />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-32 -32 64 64'%3E%3Cpath d='M0-30L7-9 29-9 11 4 18 26 0 13-18 26-11 4-29-9-7-9Z' fill='%23E4007C' stroke='%23111' stroke-width='3' stroke-linejoin='round'/%3E%3Ccircle r='8' fill='%23FFC21A' stroke='%23111' stroke-width='3'/%3E%3C/svg%3E" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Shrikhand&display=swap" rel="stylesheet" />
    <style>
      /* Paleta festiva mexicana y tokens de diseño */
      :root {
        --color-1: #E4007C;      /* Rosa mexicano */
        --color-2: #FFC21A;      /* Amarillo */
        --color-3: #1F4AA8;      /* Azul */
        --verde: #2E9E4B;        /* Verde */
        --naranja: #FF7A1A;      /* Naranja */
        --cuerpo: #FF7A1A;       /* Centro de la piñata */
        --crema: #FFF8EC;        /* Fondo cálido */
        --tarjeta: #FFFDF9;      /* Superficie elevada */
        --tinta: #2B1D14;        /* Contorno oscuro */
        --subir: 30px;           /* Controlado dinámicamente desde JS */
      }

      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: transparent;
      }

      body {
        font-family: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;
        background-color: var(--crema);
        background-image:
          radial-gradient(circle at 15% 15%, rgba(228, 0, 124, 0.08), transparent 35%),
          radial-gradient(circle at 85% 85%, rgba(31, 74, 168, 0.08), transparent 35%);
        color: var(--tinta);
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow-x: hidden;
        user-select: none;
      }

      .fiesta {
        width: 100%;
        max-width: 820px;
        padding: 1rem clamp(0.75rem, 3vw, 1.5rem) 0.5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }

      .titulo {
        font-family: 'Shrikhand', cursive;
        font-size: clamp(1.75rem, 5vw, 2.85rem);
        color: var(--color-1);
        text-align: center;
        line-height: 1.12;
        margin-bottom: 0.85rem;
        text-shadow:
          2px 2px 0 var(--color-2),
          -1.5px -1.5px 0 var(--tinta),
          1.5px -1.5px 0 var(--tinta),
          -1.5px 1.5px 0 var(--tinta),
          2.5px 3.5px 0 var(--tinta);
      }

      /* Escenario principal del patio */
      .patio {
        position: relative;
        width: 100%;
        min-height: clamp(430px, 64dvh, 560px);
        background: linear-gradient(180deg, #FFFDF8 0%, #FFF2D9 76%, #DF9464 76%, #C87646 100%);
        border: 3.5px solid var(--tinta);
        border-radius: 26px;
        box-shadow: 0 7px 0 var(--tinta);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 1rem;
        touch-action: manipulation;
      }

      /* Losetas sutiles en el piso del patio */
      .patio::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 24%;
        background-image:
          linear-gradient(90deg, rgba(43, 29, 20, 0.16) 2px, transparent 2px),
          linear-gradient(0deg, rgba(43, 29, 20, 0.16) 2px, transparent 2px);
        background-size: 60px 30px;
        pointer-events: none;
        z-index: 1;
      }

      /* Techo de papel de china con festón y colores mexicanos */
      .techo {
        position: absolute;
        top: 0;
        left: -4px;
        right: -4px;
        height: 56px;
        z-index: 5;
        pointer-events: none;
        background-color: var(--color-1);
        background-image:
          linear-gradient(135deg, var(--color-2) 25%, transparent 25%),
          linear-gradient(225deg, var(--color-3) 25%, transparent 25%),
          linear-gradient(45deg, var(--verde) 25%, transparent 25%),
          linear-gradient(315deg, var(--naranja) 25%, var(--color-1) 25%);
        background-position: 0 0, 28px 0, 28px -28px, 0 0;
        background-size: 56px 56px;
        background-repeat: repeat-x;
        border-bottom: 3px solid var(--tinta);
        clip-path: polygon(
          0% 0%, 100% 0%, 100% 78%,
          95% 100%, 90% 78%, 85% 100%, 80% 78%, 75% 100%,
          70% 78%, 65% 100%, 60% 78%, 55% 100%, 50% 78%,
          45% 100%, 40% 78%, 35% 100%, 30% 78%, 25% 100%,
          20% 78%, 15% 100%, 10% 78%, 5% 100%, 0% 78%
        );
      }

      /* Macetas laterales */
      .maceta {
        position: absolute;
        bottom: 14%;
        width: clamp(72px, 13vw, 106px);
        height: auto;
        z-index: 3;
        pointer-events: none;
        filter: drop-shadow(0 4px 0 rgba(43, 29, 20, 0.22));
      }

      .maceta-izquierda {
        left: clamp(8px, 2.5vw, 24px);
      }

      .maceta-derecha {
        right: clamp(8px, 2.5vw, 24px);
      }

      /* Conjunto colgante (cuerda + piñata) */
      .colgante {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform-origin: 50% 0%;
        z-index: 10;
        will-change: transform;
      }

      .cuerda {
        display: block;
        width: 6px;
        height: clamp(56px, 10dvh, 92px);
        background: repeating-linear-gradient(
          45deg,
          #D6A45A,
          #D6A45A 5px,
          #9F6E2A 5px,
          #9F6E2A 10px
        );
        border-left: 2px solid var(--tinta);
        border-right: 2px solid var(--tinta);
        transform-origin: 50% 0%;
        will-change: transform;
      }

      .pinata {
        background: transparent;
        border: none;
        padding: 0;
        margin-top: -10px;
        width: clamp(185px, 34vw, 250px);
        height: clamp(185px, 34vw, 250px);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        will-change: transform;
      }

      .pinata:focus-visible {
        filter: drop-shadow(0 0 10px var(--color-2));
      }

      .dibujo {
        width: 100%;
        height: 100%;
        overflow: visible;
        filter: drop-shadow(0 10px 10px rgba(43, 29, 20, 0.24));
      }

      /* Clases SVG generadas por dibujarPinata() */
      .contorno {
        stroke: var(--tinta);
        stroke-width: 4;
        stroke-linejoin: round;
        stroke-linecap: round;
      }

      .relleno-1 { fill: var(--color-1); }
      .relleno-2 { fill: var(--color-2); }
      .relleno-3 { fill: var(--color-3); }
      .relleno-cuerpo { fill: var(--cuerpo); }

      .borla {
        stroke-width: 3.5;
        stroke-linecap: round;
        fill: none;
      }

      .fleco {
        fill: none;
        stroke-width: 8;
        stroke-dasharray: 12 7;
        stroke-linecap: round;
      }

      .trazo-1 { stroke: var(--color-1); }
      .trazo-2 { stroke: var(--color-2); }
      .trazo-3 { stroke: var(--color-3); }

      .grieta {
        fill: none;
        stroke: var(--tinta);
        stroke-width: 4.5;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0;
        transition: opacity 0.15s ease;
      }

      .grieta.visible {
        opacity: 1;
      }

      /* Animación de sacudida al golpear el dibujo */
      @keyframes golpeSacudida {
        0% { transform: scale(1, 1) rotate(0deg); }
        25% { transform: scale(1.15, 0.85) rotate(-7deg); }
        55% { transform: scale(0.92, 1.1) rotate(6deg); }
        80% { transform: scale(1.04, 0.97) rotate(-3deg); }
        100% { transform: scale(1, 1) rotate(0deg); }
      }

      .dibujo.golpe {
        transform-box: fill-box;
        transform-origin: center;
        animation: golpeSacudida 0.32s cubic-bezier(0.22, 1, 0.36, 1);
      }

      /* Verso tradicional y animación al cambiar */
      .verso {
        position: relative;
        z-index: 12;
        background: var(--tarjeta);
        border: 2.5px solid var(--tinta);
        border-radius: 999px;
        padding: 0.45rem 1.25rem;
        margin-bottom: 3.4rem;
        font-weight: 800;
        font-size: clamp(0.9rem, 2.5vw, 1.12rem);
        text-align: center;
        box-shadow: 0 4px 0 var(--tinta);
        max-width: 86%;
        min-height: 2.3rem;
      }

      @keyframes saltoVerso {
        0% { transform: scale(0.94); }
        50% { transform: scale(1.07); background-color: var(--color-2); }
        100% { transform: scale(1); }
      }

      .verso.nuevo {
        animation: saltoVerso 0.25s ease-out;
      }

      /* Capa de piezas, confeti y dulces */
      .capa {
        position: absolute;
        inset: 0;
        z-index: 14;
        pointer-events: none;
        overflow: hidden;
      }

      .fragmento {
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: none;
        will-change: transform, opacity;
      }

      .confeti {
        position: absolute;
        left: 0;
        top: 0;
        width: 11px;
        height: 8px;
        border-radius: 2px;
        border: 1.5px solid var(--tinta);
        pointer-events: none;
        will-change: transform, opacity;
      }

      .dulce {
        position: absolute;
        left: 0;
        top: 0;
        font-size: clamp(1.85rem, 4.5vw, 2.45rem);
        line-height: 1;
        cursor: pointer;
        pointer-events: auto;
        filter: drop-shadow(0 3px 2px rgba(43, 29, 20, 0.28));
        will-change: transform, opacity;
      }

      .dulce:hover {
        filter: drop-shadow(0 0 6px var(--color-2));
      }

      /* Marcadores dentro de .patio */
      .marcador, .bolsa {
        position: absolute;
        bottom: 0.75rem;
        z-index: 18;
        background: var(--tarjeta);
        border: 2.5px solid var(--tinta);
        border-radius: 999px;
        padding: 0.35rem 1rem;
        font-weight: 800;
        font-size: 0.96rem;
        box-shadow: 0 3px 0 var(--tinta);
      }

      .marcador {
        left: 0.85rem;
      }

      .bolsa {
        right: 0.85rem;
        background: #FFF0B8;
      }

      .bolsa[hidden] {
        display: none;
      }

      @keyframes brincoBolsa {
        0% { transform: scale(1); }
        45% { transform: scale(1.18) rotate(-4deg); }
        100% { transform: scale(1) rotate(0deg); }
      }

      .bolsa.lleno {
        animation: brincoBolsa 0.28s ease-out;
      }

      /* Pantalla final al romper la piñata */
      .final {
        position: absolute;
        inset: 0;
        z-index: 20;
        background: rgba(255, 253, 249, 0.88);
        backdrop-filter: blur(2px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        text-align: center;
      }

      .final[hidden] {
        display: none;
      }

      .mensaje {
        font-family: 'Shrikhand', cursive;
        font-size: clamp(1.55rem, 4.8vw, 2.25rem);
        color: var(--color-1);
        margin-bottom: 0.6rem;
        text-shadow: 2px 2px 0 var(--color-2);
      }

      .resumen {
        font-size: 1rem;
        font-weight: 600;
        max-width: 38ch;
        margin-bottom: 1.25rem;
        line-height: 1.4;
      }

      .boton {
        background: var(--color-1);
        color: #FFF;
        font-family: 'Bricolage Grotesque', sans-serif;
        font-weight: 800;
        font-size: 1.05rem;
        padding: 0.7rem 1.5rem;
        border: 3px solid var(--tinta);
        border-radius: 999px;
        box-shadow: 0 4px 0 var(--tinta);
        cursor: pointer;
        transition: transform 0.1s ease, filter 0.15s ease;
      }

      .boton:hover {
        filter: brightness(1.06);
        transform: translateY(-2px);
      }

      .boton:active {
        transform: translateY(2px);
        box-shadow: 0 1px 0 var(--tinta);
      }

      /* Palo de madera para batear */
      .palo {
        position: fixed;
        top: 0;
        left: 0;
        width: 140px;
        height: 18px;
        border-radius: 999px;
        background: linear-gradient(180deg, #E3B06B 0%, #B77932 70%, #8C571C 100%);
        border: 3px solid var(--tinta);
        box-shadow: 0 4px 6px rgba(43, 29, 20, 0.3);
        pointer-events: none;
        z-index: 40;
        opacity: 0;
      }

      .palo.derecha {
        transform-origin: 92% 50%;
      }

      .palo.izquierda {
        transform-origin: 8% 50%;
      }

      @keyframes bateoDerecha {
        0% {
          opacity: 1;
          transform: translate(-88%, -50%) rotate(42deg) scale(0.95);
        }
        45% {
          opacity: 1;
          transform: translate(-88%, -50%) rotate(-26deg) scale(1.06);
        }
        100% {
          opacity: 0;
          transform: translate(-88%, -50%) rotate(10deg) scale(0.92);
        }
      }

      @keyframes bateoIzquierda {
        0% {
          opacity: 1;
          transform: translate(-12%, -50%) rotate(-42deg) scale(0.95);
        }
        45% {
          opacity: 1;
          transform: translate(-12%, -50%) rotate(26deg) scale(1.06);
        }
        100% {
          opacity: 0;
          transform: translate(-12%, -50%) rotate(-10deg) scale(0.92);
        }
      }

      .palo.derecha.activo {
        animation: bateoDerecha 0.26s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
      }

      .palo.izquierda.activo {
        animation: bateoIzquierda 0.26s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
      }

      /* Textos flotantes de golpe o fallo */
      .pum {
        position: fixed;
        z-index: 35;
        font-family: 'Shrikhand', cursive;
        font-size: 1.35rem;
        color: var(--color-2);
        text-shadow:
          2px 2px 0 var(--tinta),
          -1px -1px 0 var(--tinta),
          1px -1px 0 var(--tinta),
          -1px 1px 0 var(--tinta);
        pointer-events: none;
        animation: flotarPum 0.65s ease-out forwards;
      }

      .pum.aire {
        color: #FFF;
        font-size: 1.1rem;
      }

      @keyframes flotarPum {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(0.75);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -95%) scale(1.12);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -135%) scale(0.95);
        }
      }

      .pie {
        width: 100%;
        text-align: center;
        padding: 0.65rem 1rem 0.95rem;
        font-size: 0.84rem;
        font-weight: 600;
        color: rgba(43, 29, 20, 0.72);
      }
    </style>
  </head>
  <body>
    <main class="fiesta">
      <!--
        TODO 1: ¿Cómo se llama tu fiesta? Puede ser una posada, un cumpleaños o lo que quieras celebrar.
        Ejemplo: <h1 class="titulo">La posada de la oficina</h1>
      -->
      <h1 class="titulo">Escribe el nombre de tu fiesta</h1>

      <div class="patio" id="patio">
        <!-- Decoración: techo de papel de china y macetas. No necesitas cambiarla -->
        <div class="techo" aria-hidden="true"></div>

        <svg class="maceta maceta-izquierda" viewBox="0 0 100 150" aria-hidden="true">
          <g stroke="#2B1D14" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
            <path d="M40 92V32a10 10 0 0 1 20 0v60Z" fill="#3E9B4F" />
            <path d="M40 70H30a8 8 0 0 1-8-8V48a7 7 0 0 1 14 0v8h4" fill="#3E9B4F" />
            <path d="M60 62h8V40a7 7 0 0 1 14 0v14a8 8 0 0 1-8 8h-14" fill="#3E9B4F" />
            <path d="M50 30v56M29 52v8M75 44v10" fill="none" stroke="#2C7A3B" stroke-width="2.5" />
            <circle cx="50" cy="22" r="6" fill="#E4007C" />
            <circle cx="50" cy="22" r="2" fill="#FFC21A" stroke="none" />
            <path d="M14 92h72v12H14Z" fill="#D27A4E" />
            <path d="M18 104h64l-8 42H26Z" fill="#C0673D" />
          </g>
          <path d="M24 118l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6 6-6" fill="none" stroke="#FFF6E5" stroke-width="3" stroke-linejoin="round" />
          <g fill="#1F4AA8"><circle cx="33" cy="130" r="3" /><circle cx="50" cy="130" r="3" /><circle cx="67" cy="130" r="3" /></g>
        </svg>

        <svg class="maceta maceta-derecha" viewBox="0 0 100 150" aria-hidden="true">
          <g stroke="#2B1D14" stroke-width="3" stroke-linejoin="round">
            <ellipse cx="50" cy="74" rx="16" ry="22" fill="#4FA35A" />
            <ellipse cx="32" cy="44" rx="12" ry="17" transform="rotate(-25 32 44)" fill="#4FA35A" />
            <ellipse cx="66" cy="38" rx="12" ry="17" transform="rotate(20 66 38)" fill="#4FA35A" />
            <ellipse cx="24" cy="20" rx="5" ry="6" fill="#E4007C" />
            <ellipse cx="38" cy="22" rx="5" ry="6" fill="#E4007C" />
            <ellipse cx="74" cy="16" rx="5" ry="6" fill="#FF7A1A" />
          </g>
          <g fill="#2B1D14">
            <circle cx="44" cy="66" r="1.5" /><circle cx="56" cy="74" r="1.5" /><circle cx="46" cy="84" r="1.5" />
            <circle cx="30" cy="40" r="1.5" /><circle cx="36" cy="50" r="1.5" /><circle cx="64" cy="34" r="1.5" /><circle cx="70" cy="44" r="1.5" />
          </g>
          <g stroke="#2B1D14" stroke-width="3" stroke-linejoin="round">
            <path d="M20 96h60l-6 50H26Z" fill="#FFFDF9" />
            <path d="M16 92h68v10H16Z" fill="#1F4AA8" />
          </g>
          <g fill="#1F4AA8">
            <path d="M50 108c5 6 5 10 0 14c-5-4-5-8 0-14Z" /><path d="M50 136c5-6 5-10 0-14c-5 4-5 8 0 14Z" />
            <path d="M36 122c6-5 10-5 14 0c-4 5-8 5-14 0Z" /><path d="M64 122c-6-5-10-5-14 0c4 5 8 5 14 0Z" />
            <circle cx="31" cy="110" r="2.5" /><circle cx="69" cy="110" r="2.5" /><circle cx="32" cy="136" r="2.5" /><circle cx="68" cy="136" r="2.5" />
          </g>
          <circle cx="50" cy="122" r="3" fill="#FFC21A" />
        </svg>

        <div class="colgante" id="colgante">
          <span class="cuerda" id="cuerda"></span>
          <button class="pinata" id="pinata" type="button" aria-label="Pegarle a la piñata">
            <svg class="dibujo" id="dibujo" viewBox="-200 -200 400 400" aria-hidden="true"></svg>
          </button>
        </div>

        <p class="verso" id="verso">Toca la piñata para pegarle</p>

        <!-- Aquí caen los dulces, el confeti y los pedazos de la piñata -->
        <div class="capa" id="capa" aria-hidden="true"></div>

        <div class="final" id="final" hidden>
          <!--
            TODO 2: ¿Qué se grita en tu fiesta cuando se rompe la piñata?
            Ejemplo: <p class="mensaje">¡Ya salieron los cacahuates!</p>
          -->
          <p class="mensaje">¡Se rompió la piñata!</p>

          <p class="resumen" id="resumen"></p>
          <button class="boton" id="otra" type="button">Colgar otra piñata</button>
        </div>

        <p class="marcador" id="marcador" aria-live="polite">Golpes: 0</p>
        <p class="bolsa" id="bolsa" hidden>🛍️ Juntaste <span id="contador-bolsa">0</span></p>
      </div>
    </main>

    <footer class="pie">
      Publicada con AWS Amplify desde Nerdearla México
    </footer>

    <span class="palo" id="palo" aria-hidden="true"></span>

    <script>
      // ===== Arma tu piñata =====

      // TODO 4: ¿Qué tiene tu piñata adentro?
      // Pon cada cosa entre comillas y sepáralas con comas. En el celular puedes usar el teclado de emojis.
     
