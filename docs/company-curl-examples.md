# Company API Examples

```bash
# Create company
curl -X POST http://localhost:3000/api/v1/companies \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"ACME","legalForm":"SARL","siren":"123456789","siret":"12345678901234","tvaNumber":"FRXX999999999","creationDate":"2024-01-01","isActive":true,"email":"info@acme.com","phone":"0123456789"}'
```
