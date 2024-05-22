Command := $(firstword $(MAKECMDGOALS))
Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

up:
	docker-compose up -d

down:
	docker-compose down

migration-run:
	docker-compose exec -it to-do-server npm run migration:run

migration-revert:
	docker-compose exec -it to-do-server npm run migration:revert

migration-create:
	(cd server && npm run migration:create ${Arguments})