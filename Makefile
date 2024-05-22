Command := $(firstword $(MAKECMDGOALS))
Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

up:
	docker-compose up -d

down:
	docker-compose down

migration-run:
	(cd ecook-server && npm run migration:run)
	# For docker
	# docker-compose exec -it ecook-server npm run migration:run

migration-revert:
	(cd ecook-server && npm run migration:revert)
	# For docker
	# docker-compose exec -it ecook-server npm run migration:revert

migration-create:
	(cd ecook-server && npm run migration:create ${Arguments})