

class AssetsPlugin {
    constructor(opt) {
        this.options = opt;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('AssetsPlugin', compilation => {
            // console.log('compilation', compilation.hooks)
            compilation.hooks.contentHash.tap('contentHash', (chunk) => {
                console.log('chunk=', chunk.hash);
            });
        });
    }
}

module.exports = AssetsPlugin;