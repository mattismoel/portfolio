STACK_NAME="portfolio"
CONTEXT_NAME="portfolio-site"

echo "Switching to context '${CONTEXT_NAME}'..."
docker context use "${CONTEXT_NAME}"

CONTAINER_ID=$(docker ps -qf "name=${STACK_NAME}_backend")

echo "Copying migrations to container ${CONTAINER_ID}..."
docker cp ./backend/pb/pb_migrations/. ${CONTAINER_ID}:/pb/pb_migrations

echo "Restarting service..."
docker service update --force "${STACK_NAME}_backend"
