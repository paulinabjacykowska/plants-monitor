# Database for RSI PlantsList

Mongodb database with two users:
- `admin:password` with root privileges
- `user:password` with read/write privileges

## Launch

Mongodb is fully built by docker-compose. It is preffered way to use database.

<br>

To run database console, execute mongo inside jarmarkdb docker container:
```bash
docker exec -it rsi-plants-db mongo -u admin -p password
```

<br>

Docker compose is configured to have store data inside volume. If you will delete mongodb container, data will be recovered when relaunch.
If you want to delete whole database container and data that was stored, then type:

```bash
docker-compose down -v
```

Which will also delete volume with mongodb stored data.
