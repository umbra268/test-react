var fs = require('fs');
var fm = require('front-matter');
var markdownIt = require('markdown-it');
var hljs = require('highlight.js');
var path = require('path');

var highlight = function (str, lang) {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value
    } catch (_error) {
      console.error(_error)
    }
  }
  try {
    return hljs.highlightAuto(str).value
  } catch (_error) {
    console.error(_error)
  }
  return ''
}

var md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
}).use(require('markdown-it-sub'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-attrs'))

function load_folder(path) {
  return fs.readdirSync(path).map(function(file_name) {
    var output = fm(fs.readFileSync(path + '/' + file_name).toString());
    delete output.frontmatter;
    output.file_name = file_name;
    output.body = md.render(output.body);
    return output;
  })
}

var output = {
  projects: load_folder('projects'),
  posts: load_folder('posts')
}

console.log(JSON.stringify(output));
