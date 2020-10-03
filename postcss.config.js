const postcssPresetEnv = require(`postcss-preset-env`)
module.exports = {
    // parser: 'sugarss',
    plugins: [
        postcssPresetEnv({
            stage: 0,
          }),
        require("postcss-import"),
        // require("postcss-cssnext"),
        require("tailwindcss"),
    ]
}