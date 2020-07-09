# Ejercicio Ibushak

Servicio de descarga de teléfonos celulares de Mercado Libre, que devuelve datos relevantes para realizar estudio de mercado

## Instalacion
Descargamos y descomprimimos el archivo ejercicio.zip

Utilizamos el manejador de paquetes [npm](https://www.npmjs.com) para instalar el servicio

```bash
npm install
```

Corremos el servicio 
```bash
npm run dev
```

## Uso

Hacemos una peticion hacia:

[http://localhost:3000/api/products](http://localhost:3000/api/products)

Devolvera un json con los datos

```
[
    {
        "Meli_ID": "MLM761844726",
        "Site_ID": "MLM",
        "Titulo_Publicacion": "Moto E6 Plus 64 Gb Caribbean Blue 4 Gb Ram",
        "Envio_Gratis": true,
        "Tipo_de_logistica": "fulfillment",
        "Precio_de_Venta": 3398,
        "Link_Publicacion": "https://www.mercadolibre.com.mx/moto-e6-plus-64-gb-caribbean-blue-4-gb-ram/p/MLM15469258",
        "Cantidad_Disponible": 50,
        "Condicion_Articulo": "new",
        "Seller_ID": 451405081,
        "Seller_Name": "GRUPO TELMOV",
        "Lugar_de_Operaciones_del_Seller": "Xochimilco MX-DIF",
        "Attributes": {
            "Marca": "Motorola",
            "Modelo de GPU": "PowerVR GE8320",
            "Condición del ítem": "Nuevo",
            "Línea": "Moto E",
            "Modelo": "E6 Plus",
            "Modelo del procesador": "MediaTek MT6762 Helio P22"
        }
    }
```

## License
[MIT](https://choosealicense.com/licenses/mit/)