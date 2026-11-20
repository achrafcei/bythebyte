# BytheByte

A personal blog built with Jekyll and hosted on GitHub Pages. No database, CMS, paid services, or JavaScript build tools: write Markdown, commit it, and GitHub publishes the site.

**Blog:** https://achrafcei.github.io/bythebyte/

## Publish a post

1. Open [`_posts/`](./_posts) on GitHub and choose **Add file > Create new file**.
2. Name the file `YYYY-MM-DD-your-post-title.md`, using today's date or an earlier date.
3. Paste the following, replace the example text, and commit to `main`.

```markdown
---
title: "Your post title"
description: "A short summary for the post list, search engines, and RSS."
tags: [notes, development]
---

Start writing here. The first paragraph is a good place for the big idea.

## A section heading

Write in **Markdown**. Code blocks, links, lists, and images work too.
```

GitHub Actions builds and deploys automatically. Allow a few minutes, then refresh the blog. Check the repository's **Actions** tab if a post does not appear.

The filename supplies the date; no `layout`, `date`, or manual index update is needed. Use a unique filename/slug for each post. Post URLs use `/posts/your-post-title/`, so avoid renaming published files unless you intend to change their URLs.

## Drafts and future posts

- Copy [`_drafts/post-template.md`](./_drafts/post-template.md) to start a draft. Files in `_drafts/` are never published by the deployment.
- To publish, move the draft into `_posts/` and give it a dated filename.
- Future-dated posts stay hidden. They are **not scheduled automatically**: commit again or use **Actions > Publish blog > Run workflow** on or after the publication date.
- Dates use UTC. To hide a post already in `_posts/`, add `published: false` to its front matter.

## Images and other Markdown

Put images under `assets/images/`, ideally in a folder named after your post. Use Jekyll's `relative_url` filter so links keep working when the blog is hosted under `/bythebyte`:

```liquid
![A useful description]({{ '/assets/images/my-post/example.png' | relative_url }})
```

Link to another post without hardcoding its URL:

```liquid
[Read the welcome post]({% post_url 2026-11-20-hello-bythebyte %})
```

Use fenced code blocks with a language name for syntax highlighting:

````markdown
```python
print("Hello, BytheByte")
```
````

## Where things live

| Path | Purpose |
| --- | --- |
| `_posts/` | Published Markdown posts |
| `_drafts/` | Unpublished drafts and the reusable post template |
| `assets/images/` | Post images and the site icon |
| `_config.yml` | Blog title, description, author, and navigation |
| `about.md` | About page |
| `_layouts/`, `_includes/` | Page templates and reusable components |
| `assets/css/style.css` | Responsive theme and code highlighting |
| `assets/js/archive.js` | Optional archive search and tag filtering |
| `.github/workflows/pages.yml` | Build and deployment |

The homepage, archive, tag filters, reading times, RSS feed, sitemap, and search index update from your posts automatically. Archive search includes the full text of every published post. Everything remains readable with JavaScript disabled.

## Customize

Edit `_config.yml` to change the title, tagline, description, author, GitHub link, or navigation. Edit `about.md` to introduce yourself. Change the CSS variables at the top of `assets/css/style.css` to adjust the colors.

If you rename the repository, update `baseurl` and `repository` in `_config.yml`. For a custom domain, configure it in **Settings > Pages**, update `url`, and set `baseurl: ""` when serving at the domain root.

## Preview locally

Install Ruby 3.4 and Bundler, then run:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Open http://127.0.0.1:4000/bythebyte/. Restart the server after changing `_config.yml`.

To preview drafts locally:

```sh
bundle exec jekyll serve --drafts --future
```

To reproduce the production build:

```sh
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter --trace
```

Dependencies are recorded in `Gemfile.lock`. Update deliberately with `bundle update`, preview the result, and commit the updated lockfile.

## Hosting

In **Settings > Pages**, the build source must be **GitHub Actions**. The workflow runs on pushes to `main` and can also be started manually. After deployment, it checks that the public homepage is reachable. It uses GitHub's Pages deployment permissions; no personal access token or repository secret is required.

RSS is available at [`/feed.xml`](https://achrafcei.github.io/bythebyte/feed.xml), and the sitemap at [`/sitemap.xml`](https://achrafcei.github.io/bythebyte/sitemap.xml).
