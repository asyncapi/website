/* eslint-disable */
const { writeFileSync } = require('fs')
const { resolve } = require('path')
const { inspect } = require('util')

const { walkDirectories } = require('./utils.js');

const basePath = 'pages'
const directories = [
  [`${basePath}/docs`, '/docs'],
  [`${basePath}/blog`, '/blog'],
  [`${basePath}/about`, '/about'],
  [`${basePath}/jobs`, '/jobs']
];

const result = []
walkDirectories(directories, result)

if (process.env.NODE_ENV === 'production') {
  console.log(inspect(result, { depth: null, colors: true }))
}

writeFileSync(resolve(__dirname, '..', 'config', 'posts.json'), JSON.stringify(result, null, '  '))