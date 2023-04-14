#!/bin/sh

RED="\033[31m"
BLUE="\033[34m"
GREEN="\033[32m"
ENDGREEN="\033[0m"

QUIET=0

echoErr() {
  if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
}

usage() {
  exitCode="$1"
  cat << USAGE >&2
Usage:
  local|stop|reset
USAGE
  exit "$exitCode"
}

case $1 in
"local")
  echo "Project is building..."
  docker-compose up --build
  echo "${GREEN}Build successful${ENDCOLOR}"
  ;;
"stop")
  docker-compose down
  ;;
"reset")
  echo "${RED}Reseting all volumes...${ENDCOLOR}"
  docker system prune --all --force --volumes
  echo "${GREEN}Deleted successful${ENDCOLOR}"
  ;;
*)
  echoErr "Unknown argument: $1"
  usage 1
  ;;
esac
