fetch('./func_test.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(results => {

        console.log('Loaded wasm module')

        let instance = results.instance
        console.log('instance', instance)

        let black = 1
        let white = 2
        let crowned_black = 5
        let crowned_white = 6

        console.log('calling offset')
        let offset = instance.exports.offsetForPosition(3, 4)
        console.log('Offset for 3,4 is ', offset)

        console.log('White is white?', instance.exports.isWhite(white))
        console.log('Black is black?', instance.exports.isBlack(black))
        console.log('Black is white?', instance.exports.isWhite(black))
        console.log('Uncrowned black', instance.exports.isBlack(instance.exports.withoutCrown(crowned_black)))
        console.log('Uncrowned white', instance.exports.isWhite(instance.exports.withoutCrown(crowned_white)))
        console.log("Crowned black is crowned", instance.exports.isCrowned(crowned_black))
        console.log("Crowned white is crowned", instance.exports.isCrowned(crowned_white))
    })