# Find JIRA Transition User
Returns JIRA user details for user that last transitioned a Jira ticket to a given status.

## Usage

> ##### Note: this action requires [Jira Login Action](https://github.com/marketplace/actions/jira-login)

To find an issue key inside commit messages:
```yaml
- name: Find in commit messages
  uses: pinpoint-unsworth94/gajira-issue-transition-user@master
  with:
    JIRA_ISSUE_KEY: "JIRA-REF"
    JIRA_ISSUE_STATUS: "PR Provided"
```

----
## Action Spec:

### Environment variables
- None

### Inputs
- `JIRA_ISSUE_KEY` - Provide Jira ticket reference.
- `JIRA_ISSUE_STATUS` - Provide Jira ticket status

### Outputs
- `jira_account_id` - Jira account id.
- `jira_account_name` - Jira account display name.

### Reads fields from config file at $HOME/jira/config.yml
- None

### Writes fields to config file at $HOME/jira/config.yml
- `jira_account_id` - Jira account id.
- `jira_account_name` - Jira account display name.

### Writes fields to CLI config file at $HOME/.jira.d/config.yml
- `jira_account_id` - Jira account id.
- `jira_account_name` - Jira account display name.
