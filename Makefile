install:
	npx lerna bootstrap --hoist

lint:
	npx lerna run test
