document.addEventListener('DOMContentLoaded', function() {
  const pedidoForm = document.getElementById('pedidoForm');
  const resumenPedido = document.getElementById('resumenPedido');
  const ticketMensaje = document.getElementById('ticketMensaje');
  const descuentoInfo = document.getElementById('descuentoInfo');
  const climaInfo = document.getElementById('climaInfo');
  const horaActual = document.getElementById('horaActual');
  const filtroTamano = document.getElementById('filtroTamano');
  const filtrarPedidoBtn = document.getElementById('filtrarPedido');
  
  const preciosBatidos = {
    "Fresa": { "pequeño": 1000, "mediano": 1500, "grande": 2000 },
    "Banana": { "pequeño": 700, "mediano": 1000, "grande": 1200 },
    "Mango": { "pequeño": 800, "mediano": 1200, "grande": 1600 },
    "Piña": { "pequeño": 1000, "mediano": 1500, "grande": 2000 },
    "Frutas Mixtas": { "pequeño": 900, "mediano": 1400, "grande": 1700 }
  };

  let pedidoActual = JSON.parse(localStorage.getItem('pedidoActual')) || [];
  let numeroTicket = Math.floor(Math.random() * 10000) + 1;

  // Función para actualizar la hora actual cada segundo
  function mostrarHoraActual() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    horaActual.textContent = `Hora actual: ${hours}:${minutes}:${seconds}`;
  }
  setInterval(mostrarHoraActual, 1000);
  mostrarHoraActual();

  // Función para cargar el clima usando la API de OpenWeatherMap
  async function cargarClima() {
    const apiKey = '9eb04997977292eae3cf0581c688b0c8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,AR&units=metric&lang=es&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Error al cargar el clima');
      const data = await response.json();
      const { temp } = data.main;
      const { description } = data.weather[0];
      climaInfo.textContent = `Clima en CABA: ${temp}°C, ${description}`;
    } catch (error) {
      console.error('Hubo un problema con la carga del clima:', error);
      climaInfo.textContent = 'No se pudo obtener el clima';
    }
  }
  cargarClima();

  // Función para actualizar el resumen del pedido y el mensaje de descuento
  function actualizarResumenPedido(tamanoFiltro = "todos") {
    const pedidosFiltrados = tamanoFiltro === "todos" 
      ? pedidoActual 
      : pedidoActual.filter(({ tamano }) => tamano === tamanoFiltro);

    resumenPedido.innerHTML = pedidosFiltrados.map(({ nombre, producto, tamano, cantidad }) => 
      `${nombre}: ${producto} (${tamano}) - Cantidad: ${cantidad}`).join('<br>');

    let total = pedidosFiltrados.reduce((acc, { producto, tamano, cantidad }) => 
      acc + (preciosBatidos[producto][tamano] * cantidad), 0);

    if (total >= 50) {
      descuentoInfo.innerHTML = "¡Felicidades! Tu pedido califica para un descuento del 10%.";
    } else {
      descuentoInfo.innerHTML = "El descuento se aplica a pedidos superiores a $5000.";
    }
  }
  actualizarResumenPedido();

  // Manejar el evento de submit del formulario para agregar un nuevo pedido
  pedidoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let producto = document.getElementById('producto').value;
    let tamano = document.getElementById('tamano').value;
    let cantidad = parseInt(document.getElementById('cantidad').value);

    const nuevoPedido = { nombre, producto, tamano, cantidad };
    pedidoActual.push(nuevoPedido);

    localStorage.setItem('pedidoActual', JSON.stringify(pedidoActual));

    actualizarResumenPedido();
  });

  // Botón para terminar el pedido y generar ticket
  document.getElementById('terminarPedido').addEventListener('click', function() {
    let subtotal = 0;
    let ticketHTML = `<div class="ticket-detallado"><h3>Ticket de Pedido</h3><p>Número de ticket: <strong>${numeroTicket}</strong></p><ul>`;
    
    pedidoActual.forEach(({ producto, tamano, cantidad }) => {
      const precioUnitario = preciosBatidos[producto][tamano];
      const precioTotal = precioUnitario * cantidad;
      subtotal += precioTotal;
      ticketHTML += `<li>${producto} (${tamano}) - Cantidad: ${cantidad} - $${precioTotal.toFixed(2)}</li>`;
    });
    
    ticketHTML += `</ul><p>Subtotal: $${subtotal.toFixed(2)}</p>`;

    let total = subtotal;
    if (subtotal > 50) {
      total *= 0.9;
      ticketHTML += `<p>Descuento aplicado (10%): -$${(subtotal * 0.1).toFixed(2)}</p>`;
    }
    
    ticketHTML += `<p><strong>Total a pagar: $${total.toFixed(2)}</strong></p></div>`;
    ticketMensaje.innerHTML = ticketHTML;
  });

  // Función para resetear el pedido
  document.getElementById('resetPedido').addEventListener('click', function() {
    pedidoActual = [];
    localStorage.removeItem('pedidoActual');
    resumenPedido.innerHTML = '';
    ticketMensaje.innerHTML = '';
    descuentoInfo.innerHTML = "El descuento se aplica a pedidos superiores a $50.";
  });

  // Descargar el ticket en PDF
  document.getElementById('descargarPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.text(20, 20, `Ticket de Pedido - Número: ${numeroTicket}`);
    pdf.text(20, 30, `Fecha: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    
    let yPosition = 40;
    let subtotal = 0;
    pedidoActual.forEach(({ producto, tamano, cantidad }) => {
      const precioUnitario = preciosBatidos[producto][tamano];
      const precioTotal = precioUnitario * cantidad;
      subtotal += precioTotal;
      pdf.text(20, yPosition, `${producto} (${tamano}) - Cantidad: ${cantidad} - $${precioTotal.toFixed(2)}`);
      yPosition += 10;
    });
    
    yPosition += 10;
    pdf.text(20, yPosition, `Subtotal: $${subtotal.toFixed(2)}`);
    yPosition += 10;
    
    if (subtotal > 50) {
      const descuento = subtotal * 0.1;
      pdf.text(20, yPosition, `Descuento aplicado (10%): -$${descuento.toFixed(2)}`);
      yPosition += 10;
      subtotal -= descuento;
    }
    
    pdf.text(20, yPosition, `Total a pagar: $${subtotal.toFixed(2)}`);
    pdf.save(`Ticket_Pedido_${numeroTicket}.pdf`);
  });

  // Evento para aplicar el filtro de tamaño al resumen de pedidos
  filtrarPedidoBtn.addEventListener('click', function() {
    const tamanoSeleccionado = filtroTamano.value;
    actualizarResumenPedido(tamanoSeleccionado);
  });
});





