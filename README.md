# Proceso-ETL
Parcial de Sistemas distribuidos

#Debes ejecutar esto en la consola antes de ejecutar el contenedor
# Crear la carpeta si no existe
mkdir -p import export

# Cambiar el dueño de la carpeta a Neo4j dentro del contenedor
sudo chown -R 7474:7474 import export

# Asegurar permisos de lectura y escritura para Neo4j y el sistema
sudo chmod -R 775 import export

# Verificar permisos
ls -ld import export

#Para cargar la imagen
LOAD CSV WITH HEADERS FROM 'file:///Dataset_A-Peliculas.csv' AS row
CREATE (:Movie {title: row.title, year: toInteger(row.year), rating: toFloat(row.rating)});


