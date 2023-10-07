module.exports = {
    content: [
        './docs/.vitepress/**/*.js',
        './docs/.vitepress/**/*.vue',
        './docs/.vitepress/**/*.ts',
        './docs/**/*.md',
    ],
    theme: {
        colors: {
            'blue': '#1fb6ff',
            'purple': '#7e5bef',
            'pink': '#ff49db',
            'orange': '#ff7849',
            'green': '#13ce66',
            'yellow': '#ffc82c',
            'gray-dark': '#273444',
            'gray': '#8492a6',
            'gray-light': '#d3dce6',
        },
        fontFamily: {
            sans: [
                '"Noto Sans"',
                '"Noto Color Emoji"',
                'ui-sans-serif',
                'system-ui',
            ],
            serif: ['Noto Serif SC', 'ui-serif', 'serif'],
            mono: [
                'JetBrains Mono',
                'ui-monospace',
                'monospace',
            ],
        }
    }
}
