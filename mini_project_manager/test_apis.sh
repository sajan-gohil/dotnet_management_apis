curl -s -X POST http://localhost:5005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"Secret123"}' | jq .

TOKEN=$(curl -s -X POST http://localhost:5005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"Secret123"}' | jq -r .token)
echo "TOKEN=$TOKEN"


curl -s -X POST http://localhost:5005/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Website Redesign","description":"Frontend + backend refresh"}' | jq .


curl -s http://localhost:5005/api/projects \
  -H "Authorization: Bearer $TOKEN" | jq .

curl -s http://localhost:5005/api/projects/1 \
  -H "Authorization: Bearer $TOKEN" | jq .

curl -s -X DELETE http://localhost:5005/api/projects/1 \
  -H "Authorization: Bearer $TOKEN" -v

curl -s -X POST http://localhost:5005/api/projects/1/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Design mockups","dueDate":"2025-11-01T00:00:00Z"}' | jq .

curl -s -X PUT http://localhost:5005/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Design mockups v2","dueDate":"2025-11-02T00:00:00Z","isCompleted":true}' | jq .

curl -s -X DELETE http://localhost:5005/api/tasks/1 \
  -H "Authorization: Bearer $TOKEN" -v



# Register
curl -s -X POST http://localhost:5005/api/auth/register -H "Content-Type: application/json" -d '{"username":"bob","password":"Pa55word!"}' | jq .

# Login and store token
TOKEN=$(curl -s -X POST http://localhost:5005/api/auth/login -H "Content-Type: application/json" -d '{"username":"bob","password":"Pa55word!"}' | jq -r .token)
echo "Token length: ${#TOKEN}"

# Create project
curl -s -X POST http://localhost:5005/api/projects -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Q4 Plan","description":"Quarterly planning"}' | jq .

# Add a task to project id 1
curl -s -X POST http://localhost:5005/api/projects/1/tasks -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"title":"Draft roadmap"}' | jq .