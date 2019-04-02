cmd /k "C:\Program Files\MongoDB\Server\4.0\bin\mongoimport.exe" --host 127.0.0.1 --db scriptDb --collection tests --type csv --headerline --file .\..\csv\testResources.csv
