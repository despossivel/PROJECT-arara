curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer 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" \
  -H "OpenAI-Organization: org-Ail0cm221bZZyjSoe4YrX2gy"


  

  curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "um dos tres testando"}],
     "temperature": 0.7
   }'



   curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
