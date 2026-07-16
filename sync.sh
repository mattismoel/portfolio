CONTEXT_NAME="portfolio-site"
SERVICE_NAME="portfolio_backend"

echo "Switching to context '${CONTEXT_NAME}'..."
docker context use "${CONTEXT_NAME}"

CONTAINER_STR=$(docker ps | grep "${SERVICE_NAME}")
CONTAINER_ID=($CONTAINER_STR[0])

echo "Copying migrations to container..."
docker cp ./backend/pb/pb_migrations/. ${CONTAINER_ID}:/pb/pb_migrations

echo "Restarting service..."
docker service update --force "${SERVICE_NAME}"
