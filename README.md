# ZainAura DS2 - Docker & CI/CD

## Description
Ce projet consiste à conteneuriser le mini-site web ZainAura avec Docker et à automatiser son build avec GitHub Actions.

## Prérequis
- Docker Desktop installé
- Docker Compose installé
- Git installé
- Compte GitHub

## Lancer le projet avec Docker

```bash
docker build -t zainaura .
docker run -p 8080:80 zainaura