ifneq (,$(findstring src/,$(MAKECMDGOALS)))
	MAKECMDGOALS := $(subst src/,,$(MAKECMDGOALS))
endif

MAKEFLAGS += -s

up:
	docker-compose -f docker-compose.dev.yml up --build poc-api

lint:
	docker-compose -f docker-compose.dev.yml exec poc-api npx eslint "{src,apps,libs,test}/**/*.ts"

exec:
	docker-compose -f docker-compose.dev.yml exec poc-api $(filter-out $@, $(MAKECMDGOALS))
