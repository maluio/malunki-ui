.PHONY: build-prod
build-prod:
  docker-compose run nodejs /bin/sh -c 'cd /var/www  && npm install && ng build --prod --aot'


