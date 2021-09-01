# RSI Plants Monitor System

It's a microservice based system which provides IoT sensors garden plants management. A user, who is logged in, can register his plants and connect them to the added sensors in order to monitor their environment for an earlier prevention of any garden problems, such as too high air humidity.
It uses a docker containers for running services independently and without complicated configuration.

## Launch

In order to make all the servers up and running you need to copy and set all environment variables from .env.example to .env

After configuration the application can be started with:

```
docker-compose up
```

## Documentation

Source code documentation for each service is available in /docs folder.

## Authors

- Paulina Jacykowska
- Marcin Szuster

## License

Shield: [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg
