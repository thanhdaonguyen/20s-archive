source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.

# Use the same version as GitHub Pages for compatibility
gem "jekyll", "~> 3.9.3"

# This is the default theme for new Jekyll sites
# gem "minima", "~> 2.5"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
gem "github-pages", "~> 228", group: :jekyll_plugins

# Essential Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.15"
  gem "jekyll-sitemap", "~> 1.4"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-paginate", "~> 1.1"
  gem "jekyll-redirect-from", "~> 0.16"
  gem "jekyll-archives", "~> 2.2"
  gem "jekyll-gist", "~> 1.5"
  gem "jekyll-github-metadata", "~> 2.13"
end

# Performance and optimization gems
gem "sassc", "~> 2.4"

# Development and build tools
group :development do
  gem "webrick", "~> 1.7"
end

# Windows and JRuby specific gems
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions 
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Additional useful gems for a personal archive site
gem "kramdown-parser-gfm", "~> 1.1"  # GitHub Flavored Markdown
gem "rouge", "~> 3.26"                # Syntax highlighting