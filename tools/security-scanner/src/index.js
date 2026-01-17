const OAuth2SecurityScanner = require('./scanner')

const targetUrl = process.argv[2] || 'http://localhost:8080'

const scanner = new OAuth2SecurityScanner(targetUrl)
scanner.scan()
