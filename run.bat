start cmd /k "cd .\auth_backend && npm start"

start cmd /k "cd .\Frontend && npm start"

start cmd /k "cd .\Server && uvicorn server:app --reload"