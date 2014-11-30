test: lint
	@NODE_ENV=test ./node_modules/.bin/mocha -b --reporter spec -- recursive

test-travis: lint
	@NODE_ENV=test-travis ./node_modules/.bin/mocha -b --reporter spec -- recursive

lint:
	./node_modules/.bin/jshint ./services ./test ./index.js

test-cov:
	$(MAKE) lint
	@NODE_ENV=test ./node_modules/.bin/istanbul cover \
	./node_modules/mocha/bin/_mocha -- -R spec

.PHONY: test lint
