const axios = require('axios')
const chalk = require('chalk')

class OAuth2SecurityScanner {
  constructor(targetUrl) {
    this.targetUrl = targetUrl
    this.vulnerabilities = []
    this.warnings = []
  }

  async scan() {
    console.log(chalk.blue(`\n🔍 Starting OAuth2 Security Scan for ${this.targetUrl}\n`))

    await this.checkCSRF()
    await this.checkRedirectURI()
    await this.checkTokenSecurity()
    await this.checkPKCE()
    await this.checkHTTPS()

    this.printReport()
  }

  async checkCSRF() {
    console.log(chalk.yellow('Checking CSRF protection...'))

    try {
      const response = await axios.get(`${this.targetUrl}/oauth/authorize`, {
        params: {
          response_type: 'code',
          client_id: 'test-client',
          redirect_uri: 'http://localhost:3000/callback'
        },
        maxRedirects: 0,
        validateStatus: () => true
      })

      const location = response.headers.location || ''
      if (!location.includes('state=')) {
        this.vulnerabilities.push({
          severity: 'HIGH',
          type: 'CSRF',
          message: 'State parameter missing in authorization response'
        })
      }
    } catch (error) {
      this.warnings.push(`CSRF check failed: ${error.message}`)
    }
  }

  async checkRedirectURI() {
    console.log(chalk.yellow('Checking redirect URI validation...'))

    try {
      const response = await axios.get(`${this.targetUrl}/oauth/authorize`, {
        params: {
          response_type: 'code',
          client_id: 'test-client',
          redirect_uri: 'http://evil.com/callback'
        },
        maxRedirects: 0,
        validateStatus: () => true
      })

      if (response.status === 302) {
        this.vulnerabilities.push({
          severity: 'CRITICAL',
          type: 'OPEN_REDIRECT',
          message: 'Open redirect vulnerability detected'
        })
      }
    } catch (error) {
      this.warnings.push(`Redirect URI check failed: ${error.message}`)
    }
  }

  async checkTokenSecurity() {
    console.log(chalk.yellow('Checking token security...'))
    this.warnings.push('Manual check required: Verify token expiration times')
  }

  async checkPKCE() {
    console.log(chalk.yellow('Checking PKCE implementation...'))
    this.warnings.push('Manual check required: Verify PKCE is enforced for public clients')
  }

  async checkHTTPS() {
    console.log(chalk.yellow('Checking HTTPS enforcement...'))

    if (!this.targetUrl.startsWith('https://')) {
      this.vulnerabilities.push({
        severity: 'HIGH',
        type: 'HTTPS',
        message: 'HTTPS not enforced'
      })
    }
  }

  printReport() {
    console.log(chalk.blue('\n📊 Security Scan Report\n'))
    console.log(chalk.blue('='.repeat(50)))

    if (this.vulnerabilities.length === 0) {
      console.log(chalk.green('\n✅ No vulnerabilities detected!'))
    } else {
      console.log(chalk.red(`\n❌ Found ${this.vulnerabilities.length} vulnerabilities:\n`))
      this.vulnerabilities.forEach((vuln, index) => {
        console.log(chalk.red(`${index + 1}. [${vuln.severity}] ${vuln.type}`))
        console.log(chalk.white(`   ${vuln.message}\n`))
      })
    }

    if (this.warnings.length > 0) {
      console.log(chalk.yellow(`\n⚠️  ${this.warnings.length} warnings:\n`))
      this.warnings.forEach((warning, index) => {
        console.log(chalk.yellow(`${index + 1}. ${warning}`))
      })
    }

    console.log(chalk.blue('\n' + '='.repeat(50)))
  }
}

module.exports = OAuth2SecurityScanner
