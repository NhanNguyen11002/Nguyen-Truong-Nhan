# Configuration #
- Create a .env file with the following configuration:\
DATABASE_URL="mysql://username:password@localhost:3306/crud99" - #change username and password to your mysql database account\
PORT=34567
- Run the following command: npm i
- Run the following command: npx prisma db push
- (Optional) Run the following command to create dummy data: npx prisma db seed
- Run the following command: npm run dev
# Service Endpoint #

1. Create a resource: POST users/:id\
Body
```
{
    "name": "string",
    "email": "string", 
    "address": "string",
    "gender": "string" 
}
```
2. List resources with basic filters: GET users?search=&gender=&page_index=\
Constraints:
- search is optional and should be a string
- gender is optional and should be a following string: male, female, other
- page_index is required and should be a number 
3. Get details of a resource: GET users/:id
4. Update resource details: PUT users/:id\
Body 
```
{
    "name": "string",
    "email": "string",
    "address": "string",
    "gender": "string"
}
```


5. Delete a resource: DELETE users/:id