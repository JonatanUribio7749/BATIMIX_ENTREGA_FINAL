--Proyecto Final - Simulador de Pedidos de Batidos: BATIMIX--

Descripción 
Este proyecto consiste en una aplicación web interactiva que permite a los usuarios realizar pedidos de batidos. La aplicación calcula automáticamente el precio del pedido, aplica un descuento del 10% en caso de superar los $50, muestra el clima actual y la hora, y genera un ticket en formato PDF con el detalle del pedido.

El proyecto cumple con los requisitos y objetivos planteados en el curso, utilizando técnicas avanzadas de JavaScript, asincronía, consumo de una API externa y manipulación dinámica del DOM.

Funcionalidades 
Realizar un Pedido de Batidos:

Los usuarios pueden elegir el producto, tamaño, y cantidad de batidos a comprar. Los datos del pedido se almacenan en localStorage para conservar la información durante la sesión.
Resumen y Descuento:

Muestra un resumen de los pedidos realizados y calcula el precio total. Si el pedido supera los $50, aplica un descuento del 10%, informando al usuario con un mensaje visual.
Clima Actual:

La aplicación consulta la API de OpenWeatherMap para obtener el clima en tiempo real de la ciudad de Buenos Aires, mostrando temperatura y descripción del clima.
Hora Actual:

Muestra la hora actual en la parte superior de la página, actualizándose cada segundo.
Generación de Ticket en PDF:

Al finalizar el pedido, se genera un ticket detallado en formato PDF usando la librería jsPDF, que incluye el subtotal, descuento (si aplica) y total final.
Filtro por Tamaño de Batido:

Los usuarios pueden filtrar el resumen de pedidos por tamaño del batido (pequeño, mediano, grande) para ver solo los ítems que coinciden con su selección.
Reseteo del Pedido:

Un botón de "Resetear Pedido" permite vaciar el pedido actual y limpiar la pantalla, incluyendo el localStorage.



Estructura del Código 📂


HTML
El archivo HTML contiene la estructura principal de la página, incluyendo:

Formulario de pedido de batidos.
Sección de clima y hora.
Resumen de pedido, sección de descuento y ticket generado.
Botón para descargar el ticket en PDF.
Filtro de tamaño para visualizar pedidos específicos.
Carrusel de imágenes de los productos (batidos).



CSS
Se aplican estilos personalizados en style.css:

Paleta de colores y animaciones para los botones.
Estilos para el resumen del pedido, mensaje de descuento y ticket final.
Configuración del carrusel y la interfaz para que la experiencia sea atractiva y dinámica.
JavaScript
El archivo app.js maneja toda la lógica del proyecto:

Funciones para manipulación del DOM:

actualizarResumenPedido(): Actualiza el resumen en pantalla cada vez que se agrega o filtra un pedido.
mostrarHoraActual(): Muestra la hora actualizada cada segundo.
cargarClima(): Consulta la API de OpenWeatherMap para mostrar el clima en tiempo real.
Eventos de Usuario:

Al enviar el formulario de pedido, se guarda el pedido en localStorage y se actualiza el resumen en pantalla.
Un botón de "Terminar Pedido" genera el ticket detallado y calcula el subtotal, descuento y total final.
Un botón de "Resetear Pedido" limpia el pedido actual y el localStorage.
Un botón de "Descargar PDF" usa la librería jsPDF para descargar el ticket.
Asincronía y uso de APIs:

La función cargarClima() utiliza fetch para obtener datos en tiempo real de la API externa y manejar las respuestas usando promesas.
Librerías y Recursos Utilizados 📚
Bootstrap: Para estilos básicos y componentes como el carrusel.
jsPDF: Para generar el ticket en formato PDF.
OpenWeatherMap API: Para obtener el clima en tiempo real de Buenos Aires.
Fetch API: Para consumir la API externa con asincronía.
Cumplimiento de las Consignas ✅
Requisito	Estado
Uso de Arrays y Objetos	✅
Funciones y Condicionales	✅
Manipulación Dinámica del DOM	✅
Uso de una librería relevante	✅ (jsPDF)
Uso de Asincronía y Promesas	✅ (fetch y manejo de API)
Carga de Datos desde una API Externa	✅ (OpenWeatherMap)
Aplicación interactiva y dinámica	✅


Instrucciones de Uso :


Realizar un Pedido: Completar el formulario seleccionando el producto, tamaño y cantidad. Hacer clic en "Agregar Batido" para añadir el pedido al resumen.
Filtrar Pedidos: Seleccionar el tamaño deseado en el menú desplegable y hacer clic en "Aplicar Filtro" para ver solo los ítems de ese tamaño.
Generar Ticket y Descuento: Hacer clic en "Terminar Pedido" para generar el ticket en pantalla. Si el total es mayor a $50, se aplicará el descuento automáticamente.
Descargar PDF: Hacer clic en "Descargar Ticket en PDF" para obtener una copia del ticket.
Resetear Pedido: Hacer clic en "Resetear Pedido" para vaciar el resumen y limpiar el almacenamiento local.
