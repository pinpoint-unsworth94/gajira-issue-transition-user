const _ = require('lodash')
const Jira = require('./common/net/Jira')

const JIRA_DEVELOPER_GROUP_NAME = 'Developers Group';

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueChangelog = await this.Jira.getIssueChangeLog(this.argv.JIRA_ISSUE_KEY);

    if (issueChangelog) {
      let issueLog = _.reverse(issueChangelog.values);

      for (const item of issueLog)
        if (typeof item !== 'undefined') {
          if (item.items[0].field === 'status' && item.items[0].toString === this.argv.JIRA_ISSUE_STATUS) {
            return {
              jira_account_id: item.author.accountId,
              jira_account_name: item.author.displayName,
              action: item.items[0]
            };
          }
        }
      }
    }
}
