#!/bin/bash
# Setup cron jobs for automated news posting

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Setting up cron jobs for automated news posting..."
echo "Project root: $PROJECT_ROOT"

# Create cron job entries
CRON_JOBS=$(cat << EOF
# momwatching.com automated news posting
# Post at 9:00 AM KST (00:00 UTC)
0 0 * * * cd $PROJECT_ROOT && /usr/bin/python3 $PROJECT_ROOT/scripts/auto-post-news.py >> $PROJECT_ROOT/logs/news-cron.log 2>&1

# Post at 6:00 PM KST (09:00 UTC)
0 9 * * * cd $PROJECT_ROOT && /usr/bin/python3 $PROJECT_ROOT/scripts/auto-post-news.py >> $PROJECT_ROOT/logs/news-cron.log 2>&1
EOF
)

# Create logs directory
mkdir -p "$PROJECT_ROOT/logs"

# Backup existing crontab
crontab -l > /tmp/crontab_backup_$(date +%Y%m%d_%H%M%S).txt 2>/dev/null

# Check if cron jobs already exist
if crontab -l 2>/dev/null | grep -q "momwatching.com automated news"; then
    echo "⚠️  Cron jobs already exist. Skipping..."
    echo "To update, remove existing jobs first with: crontab -e"
else
    # Add new cron jobs
    (crontab -l 2>/dev/null; echo ""; echo "$CRON_JOBS") | crontab -
    echo "✅ Cron jobs installed successfully!"
fi

echo ""
echo "Current crontab:"
echo "═══════════════════════════════════════════════════════════"
crontab -l | grep -A 5 "momwatching.com"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "Logs will be written to: $PROJECT_ROOT/logs/news-cron.log"
echo ""
echo "To view/edit cron jobs: crontab -e"
echo "To remove cron jobs: crontab -e (then delete the lines)"
echo "To view logs: tail -f $PROJECT_ROOT/logs/news-cron.log"
