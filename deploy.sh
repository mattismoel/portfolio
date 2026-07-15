CONTEXT_NAME="portfolio-site"
SERVICE_NAME="portfolio"
COMPOSE_FILE="compose.prod.yaml"

echo "Switching to context '${CONTEXT_NAME}'..."
docker context use "${CONTEXT_NAME}"

echo "Deploying to service stack '${SERVICE_NAME}'..."
docker stack deploy -c "${COMPOSE_FILE}" "${SERVICE_NAME}" --with-registry-auth
