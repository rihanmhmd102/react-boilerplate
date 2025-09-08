#!/bin/bash
# Creates index.html file based on index.template.html and injects env into it

# Script will fail if any operation completes unsuccessfully
set -e

HTML='./index.html'
HTML_TEMPLATE='./index.template.html'

# Clear the file
>$HTML

ENVS=''
ENV_PREFIX='PUBLIC_'

# Read what is in .env.local and filter out comments
for line in $(cat ./.env.local | grep -v '^#' | grep '='); do
  IFS='=' read -r k v <<<"$line"
  k="${k//\"/\\\"}" # escape double quotes in key
  v="${v//\"/\\\"}" # escape double quotes in value

  # Take all env variables with prefix and write to ENVS
  case "$k" in
  ${ENV_PREFIX}*)
    if [ -n "$ENVS" ]; then
      ENVS="${ENVS},\"${k}\":\"${v}\""
    else
      ENVS="\"${k}\":\"${v}\""
    fi
    ;;
  esac
done

# Read file content
htmlTemplateContent=$(cat "$HTML_TEMPLATE")

# Replace window.__ENV__ with variable values
newContent=$(echo "$htmlTemplateContent" | sed "s|window.__ENV__={}|window.__ENV__={${ENVS}}|g")

# Overwrite html with new content
echo "$newContent" >"$HTML"
