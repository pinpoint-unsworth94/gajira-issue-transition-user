const fs = require('fs')
const YAML = require('yaml')
const core = require('@actions/core')

const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`
const Action = require('./action')

// eslint-disable-next-line import/no-dynamic-require
const githubEvent = require(process.env.GITHUB_EVENT_PATH)
const config = YAML.parse(fs.readFileSync(configPath, 'utf8'))

async function exec () {
  try {
    const result = await new Action({
      githubEvent,
      argv: parseArgs(),
      config,
    }).execute()

    if (result) {
      console.log(result);

      core.setOutput('jira_account_id', result.jira_account_id);
      core.setOutput('jira_account_name', result.jira_account_name);

      const yamledResult = YAML.stringify(result)
      const extendedConfig = Object.assign({}, config, result)

      fs.writeFileSync(configPath, YAML.stringify(extendedConfig))

      return fs.appendFileSync(cliConfigPath, yamledResult)
    }

    core.setNeutral()
  } catch (error) {
    core.setFailed(error.toString())
  }
}

function parseArgs () {
  return {
    JIRA_ISSUE_KEY: core.getInput('JIRA_ISSUE_KEY') || config.JIRA_ISSUE_KEY,
    JIRA_ISSUE_STATUS: core.getInput('JIRA_ISSUE_STATUS') || config.JIRA_ISSUE_STATUS
  }
}

exec()
