# Zola Dash
A modified version of [Boring](https://github.com/ssiyad/boring) for
[Zola](https://www.getzola.org/), with a Vim-inspired touch and
[bitbrain's Dash colour palette](https://github.com/bitbrain/jekyll-dash).
Powered by [TailwindCSS](https://tailwindcss.com/).

### Demo

[Link to bitbrain's blog](https://bitbra.in)

![Screenshot](./screenshot.png)

### Setup
In your zola site directory
- Get theme

    ```shell
    git submodule add https://github.com/your-org/zola-dash themes/zola-dash
    ```

- Build CSS

    ```shell
    cd themes/zola-dash
    yarn install --frozen-lockfile
    yarn build
    ```

- Configure syntax highlighting for Zola 0.22+ if your site overrides the
  theme's Markdown config.

    ```toml
    [markdown.highlighting]
    theme = "dash"
    extra_themes = ["themes/zola-dash/syntax_themes/dash.json"]
    error_on_missing_language = true
    ```

- Change theme specific variables. They are listed in the `extra` section of
  `config.toml`.

  ```toml
  [extra.footer]
  enabled = true
  prompt = "whoami"
  theme_name = "zola-dash"
  version = "v2"
  ```

### Colours
The theme uses bitbrain's Dash colour palette in both light and dark modes.
The palette is defined as CSS custom properties in `css/base.css`.

The bundled `dash` syntax highlighting theme lives in
`syntax_themes/dash.json` and is loaded through Zola's Giallo-based
`[markdown.highlighting]` configuration.

See the [Zola documentation](https://www.getzola.org/documentation/themes/installing-and-using-themes/#using-a-theme)
for further instructions.

### Credits and license
- Based on [Boring](https://github.com/ssiyad/boring) by Sabu Siyad (GPLv3)
- Vim-inspired design and [Dash colour palette](https://github.com/bitbrain/jekyll-dash) by bitbrain (Apache-2.0)

[GPLv3](./LICENSE)

