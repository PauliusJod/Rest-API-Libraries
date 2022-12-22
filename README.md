# Rest API Libraries




| API funkcija  | Register |
| ------------- | ------------- |
| Paskirtis  | Naudojama registruojantis naujam vartotojui, po registracijos naujas vartotojas nėra prisijungęs.  |
| Endpoint  | api/register  |
| Užklausos struktūra JSON  | { "userName": "paulius55", "email": "paulius55@gmail.com", "password": "!Paulius.2022" }  |
| Žetonas  | Išduodamas tik naudotojui prisijungiant!  |
| Atsakymo kodas  | Created - 201  |
| Atsakymo struktūra JSON | { "id": "8ee549de-a988-4354-8545-5f3681bf478f", "userName": "paulius55", "email": "paulius55@gmail.com" }  |
| Neigiamas atsakymo kodas  | Bad Request - 400  |

| API funkcija  | Login |
| ------------- | ------------- |
| Paskirtis  | Naudojama visų rolių naudotojų prisijungiant prie sistemos.  |
| Endpoint  | api/login  |
| Užklausos struktūra JSON  | { "userName": "Paulius55", "password": "!Paulius.2022" }  |
| Žetonas  | Išduodamas žetonas (token) naudotojui prisijungiant!  |
| Atsakymo kodas  | Ok - 200  |
| Atsakymo struktūra JSON | { "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy 8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGF1bGl1czU1IiwianRpIjoi ODM0ZGI2ODYtMWQxNy00ZDI5LTgyNDItMTQ4OTEyN2I2ZTYyIiwic3ViIjoiOGVlNTQ5ZGUtYT k4OC00MzU0LTg1NDUtNWYzNjgxYmY0NzhmIiwiaHR0cDovL3NjaGVtYXMu bWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWlt cy9yb2xlIjoiTGlicmFyeVVzZXIiLCJleHAiOjE2NzE3MDI2Mz MsImlzcyI6IlJlYWN0SXNzdWVyIiwiYXVkIjoiVHJ1c3RlZENsaWVudCJ9. hlawqsa_jiAVEHhYacp7SWROcvaxvEHiOW45x-7m6s8" }  |
| Neigiamas atsakymo kodas  | Bad Request - 400  |
