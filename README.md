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

#Para cargar datos
LOAD CSV WITH HEADERS FROM 'file:///Dataset_A-Peliculas.csv' AS row
WITH row 
WHERE row.nombre IS NOT NULL AND row.año_lanzamiento IS NOT NULL AND row.calificacion IS NOT NULL
MERGE (m:Movie {nombre: row.nombre})
SET m.año_lanzamiento = toInteger(row.año_lanzamiento),
    m.calificacion = toFloat(row.calificacion);



