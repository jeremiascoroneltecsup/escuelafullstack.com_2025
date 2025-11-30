# Escuela FULLSTACK - Odoo 13

Proyecto de Odoo 13 con base de datos PostgreSQL restaurada desde backup.

## 📋 Requisitos Previos

- **Docker Desktop** instalado y corriendo
- **Git** (opcional, para clonar el repositorio)
- Al menos **4GB de RAM** disponible
- **Puertos libres**: 8069 (Odoo) y 5432 (PostgreSQL)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd escuelafullstack.com_2023-04-29_03-37-25
```

### 2. Verificar que Docker Desktop está corriendo

Asegúrate de que Docker Desktop esté abierto y funcionando en tu sistema.

### 3. Iniciar los contenedores

```bash
docker-compose up -d
```

Este comando:
- Descargará las imágenes de Odoo 13 y PostgreSQL 10 (solo la primera vez)
- Creará y iniciará los contenedores
- Cargará la base de datos desde `dump.sql` (solo la primera vez)
- El proceso puede tomar 1-2 minutos la primera vez

### 4. Esperar a que Odoo inicie

Espera aproximadamente 30-60 segundos después de ejecutar el comando para que Odoo termine de iniciar completamente.

## 🔐 Acceso al Sistema

### URL de Acceso
```
http://localhost:8069
```

### Credenciales
- **Usuario:** `admin`
- **Contraseña:** `admin`

## 📁 Estructura del Proyecto

```
.
├── docker-compose.yml          # Configuración de Docker
├── dump.sql                    # Backup de base de datos
├── config/                     # Configuración de Odoo
│   └── odoo.conf              # Archivo de configuración
├── filestore/                  # Archivos adjuntos de Odoo
├── addons/                     # Módulos personalizados (opcional)
└── README.md                   # Este archivo
```

## 🛠️ Comandos Útiles

### Detener los contenedores
```bash
docker-compose down
```

### Ver logs de Odoo
```bash
docker logs odoo_app
```

### Ver logs de PostgreSQL
```bash
docker logs odoo_postgres
```

### Reiniciar Odoo
```bash
docker restart odoo_app
```

### Reiniciar todo
```bash
docker-compose restart
```

### Ver contenedores corriendo
```bash
docker ps
```

### Eliminar todo (incluyendo datos)
```bash
docker-compose down -v
```
⚠️ **Advertencia:** Este comando eliminará todos los datos de la base de datos.

## 🔧 Configuración

El archivo `config/odoo.conf` contiene la configuración de Odoo:

```ini
[options]
addons_path = /usr/lib/python3/dist-packages/odoo/addons
data_dir = /var/lib/odoo
db_host = db
db_port = 5432
db_user = odoo
db_password = odoo
dbfilter = .*
list_db = True
proxy_mode = False
workers = 0
limit_time_real = 600
```

## 🐛 Solución de Problemas

### Error: "Port 8069 is already allocated"
El puerto ya está en uso. Detén cualquier otra instancia de Odoo o cambia el puerto en `docker-compose.yml`.

### Error: "Port 5432 is already allocated"
PostgreSQL ya está corriendo. Detén cualquier instancia de PostgreSQL o cambia el puerto.

### No puedo acceder a http://localhost:8069
1. Verifica que los contenedores estén corriendo: `docker ps`
2. Espera 1-2 minutos más para que Odoo termine de iniciar
3. Revisa los logs: `docker logs odoo_app`

### Página en blanco o errores 500
1. Reinicia los contenedores: `docker-compose restart`
2. Si persiste, detén todo y vuelve a iniciar: `docker-compose down && docker-compose up -d`

### Advertencias sobre módulos faltantes
Es normal ver advertencias sobre módulos personalizados que no están disponibles. No afectan la funcionalidad básica de Odoo.

## 📊 Base de Datos

- **Nombre:** `escuelafullstack`
- **Usuario:** `odoo`
- **Contraseña:** `odoo`
- **Puerto:** `5432`

La base de datos se carga automáticamente desde el archivo `dump.sql` la primera vez que se inician los contenedores.

## 🔄 Actualizar la Base de Datos

Si necesitas recargar la base de datos desde el backup:

```bash
# Detener todo
docker-compose down -v

# Volver a iniciar (recargará el dump.sql)
docker-compose up -d
```

## 📝 Notas Importantes

- Los datos se persisten en volúmenes Docker (`odoo_db_data` y `odoo_web_data`)
- Los archivos adjuntos están en la carpeta `filestore/`
- Algunos módulos personalizados pueden estar desactivados por incompatibilidad
- La primera carga puede tardar varios minutos debido al tamaño del `dump.sql`

## 🆘 Soporte

Si encuentras problemas:
1. Revisa los logs: `docker logs odoo_app`
2. Verifica que Docker Desktop esté corriendo
3. Asegúrate de tener los puertos 8069 y 5432 disponibles

## 📜 Licencia

Este proyecto contiene una instalación de Odoo 13, que está bajo licencia LGPL v3.
