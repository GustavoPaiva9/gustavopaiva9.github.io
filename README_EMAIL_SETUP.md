# Website Hit Counter & Email Notification Setup

## Overview

This repository includes an automated system to track website visits and send email notifications when the site reaches specific milestones (currently 10,000 hits).

## How It Works

### 1. Hit Tracking
- Uses CountAPI (`https://countapi.mileshilliard.com`) to track website visits
- Each page visit automatically increments the counter

### 2. Automated Monitoring
- GitHub Actions workflow runs daily to check the counter
- Checks if the threshold (10,000 hits) has been reached
- Prevents duplicate notifications

### 3. Email Notifications
- When milestone is reached, sends email via webhook to email service
- Includes detailed information about the milestone

## Setup Requirements

### A. GitHub Actions Setup

1. **Workflow File**: Ensure `.github/workflows/website-counter.yml` exists

2. **Environment Variables** (Optional):
   - Add your email service webhook URL as `EMAIL_SERVICE_WEBHOOK`
   - Set up repository secrets for sensitive data

### B. Email Service Setup

You'll need an email service that supports webhooks. Popular options:

1. **Discord Webhook**
   - Create a Discord server with webhook integration
   - Use webhook URL in workflow

2. **Slack Webhook**
   - Set up Slack Incoming Webhook
   - Use webhook URL in workflow

3. **Custom Email Service**
   - SendGrid API
   - Mailgun API
   - AWS SES API
   - Any service with webhook support

### C. Configuration

In `.github/workflows/website-counter.yml`, update these values:

```yaml
const EMAIL_SERVICE_WEBHOOK = 'YOUR_EMAIL_SERVICE_WEBHOOK_URL'; // Replace with your email service webhook
const THRESHOLD = 10000;
```

```yaml
subject: '🎉 GPN Studio Website Milestone - 10K Hits!',
to: 'gustavo.paiva@example.com', // Replace with recipient email
from: 'website@gustavopaiva.com.br'
```

## Email Service Examples

### Discord Notification
1. Create a Discord server
2. Go to Server Settings → Webhooks
3. Create new webhook
4. Copy webhook URL
5. Update `EMAIL_SERVICE_WEBHOOK` with the Discord webhook URL

### Slack Notification
1. Create a Slack workspace with webhook integration
2. Go to Apps → Incoming Webhooks
3. Create new webhook for a channel
4. Copy webhook URL
5. Update `EMAIL_SERVICE_WEBHOOK` with the Slack webhook URL

## Usage

### Manual Testing
1. Go to the Actions tab in your GitHub repository
2. Find "Website Hit Counter & Email Notification"
3. Click "Run workflow" to test manually
4. Check the workflow logs for results

### Monitoring
1. The workflow runs automatically daily at midnight
2. Look for successful notifications in workflow history
3. Check the email service for notifications

## Customization

### Change Milestone Threshold
Update `THRESHOLD` in `.github/workflows/website-counter.yml`:

```yaml
const THRESHOLD = 10000; // Change to your desired milestone
```

### Multiple Milestones
To support multiple milestones (10K, 25K, 50K, etc.), modify the script to handle multiple thresholds.

### Multiple Recipients
Update the email payload to include multiple recipients:

```yaml
to: ['gustavo.paiva@example.com', 'team@yourcompany.com'], // Array of emails
```

## Troubleshooting

### Email Not Sent
1. Check workflow logs for errors
2. Verify the webhook URL is correct
3. Ensure the email service is properly configured
4. Check if the milestone threshold is met

### Duplicate Notifications
1. The system prevents duplicate notifications
2. Once notified, it won't send again for the same milestone
3. To reset notifications, manually delete the `last-notification.json` file

### Workflow Not Running
1. Check GitHub repository settings
2. Ensure the workflow file is in the correct location
3. Verify the cron schedule syntax
4. Check if there are any permission issues

## Files Modified

- `.github/workflows/website-counter.yml` - GitHub Actions workflow
- `script.js` - Client-side milestone checking

## Security Notes

- Never commit webhook URLs or API keys to the repository
- Use GitHub secrets for sensitive data
- Restrict workflow permissions to minimum required
- Consider rotating webhook URLs periodically

## Cost Considerations

- GitHub Actions: Free for public repositories (5,000 minutes/month)
- Email services: Most have free tiers
- CountAPI: Free with generous limits
- Storage: `last-notification.json` requires minimal storage

## Support

For issues with this setup, contact the repository maintainer or refer to the email service documentation.
