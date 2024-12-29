.PHONY: install build dev clean

install:
	npm install

build:
	emcc src/wasm/sum.c -o src/wasm/sum.js \
		-s WASM=1 \
		-s EXPORTED_FUNCTIONS='["_sum"]' \
		-s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]'

dev: build
	npm start

clean:
	rm -f src/wasm/sum.js src/wasm/sum.wasm
