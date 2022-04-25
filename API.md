## API
http://45.137.64.34:4002
###  Users
===========
####  Login
Login POST <code>http://127.0.0.1:4002/auth/login/</code>
Using Auth 2.0 <br/>
<li>Input parameters: <code>wallet_id</code>  without <code>0:</code> </li>
<li>Output:<br />
  {<br />
    "user": {<br />
        "wallet_id": "12321"<br />
    },<br />
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfaWQiOiIxMjExMTExMTExMTExMTExMTExMSIsImlhdCI6MTY1MDI3NzQ0MiwiZXhwIjoxNjUwMzc3NDQyfQ.OwjFrp6GduXAsF76Ft_xf8f58MyoQetq6-n6p9qjGBI",<br />
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfaWQiOiIxMjExMTExMTExMTExMTExMTExMSIsImlhdCI6MTY1MDI3NzQ0MiwiZXhwIjoxNjUwMzc3NDQyfQ.F8J_lWrNOhBGa2UCYfpK2zrV-X36MzmAGSMSfR0nCkM"<br />
}<br />
  
  
#### Get profile
Get profile info GET <code>http://127.0.0.1:4002/profile/get_profile/</code>
<li>The <code>wallet_id</code> is extracted automatically from the accessToken</li>
<li>Output:<br />
[<br />
    {<br />
        "id": 1,<br />
        "wallet_id": 12321,<br />
        "profile_picture": null,<br />
        "country": "Russia",<br />
        "document_type": "passport",<br />
        "passport_number": "191493",<br />
        "name": "Test",<br />
        "surname": "TestSur",<br />
        "patronymic_name": "TestPatronymic",<br />
        "description": "Test description",<br />
        "created_at": "2022-04-18T10:48:17.000Z"<br />
    }<br />
]<br />
  
  
  
 #### Update profile
Update profile info POST <code>http://127.0.0.1:4002/profile/update_profile</code>
<li>The <code>wallet_id</code> is extracted automatically from the accessToken</li>
<li>Input:<br />
Optional parameters:<br />
- profile_picture (img in base64)<br />
- country (string)<br />
- document_type (string)<br />
- passport_number (string)<br />
- name (string)<br />
- surname (string)<br />
- patronymic_name (string)<br />
- description (string)<br />
  
<li>Output: Profile data or "Error".
  
  
</ul>

### Collections
===========
<li>wallet_id is automatically extracted from access token</li>

#### Create collection

POST <code>http://127.0.0.1:4002/collections/create_collection</code>
<li>Input parameters: <br />
[<br />
    {<br />
        "name": "Test",<br />
        "description": "My Test Collection"<br />
    }<br />
]<br />
<li>Output: List of collections data or "Error".</li>
Example of successful execution: <br />
[<br />
    {<br />
        "id": 24,<br />
        "wallet_id": "11798655436575545435456546545464646456765456565",<br />
        "name": "Test",<br />
        "description": "My Test Collection",<br />
        "created_at": "2022-04-19T14:39:32.000Z"<br />
    }<br />
]<br />


#### GET all collections by wallet_id
GET <code>http://127.0.0.1:4002/collections/get_collections</code>
<li>Output: List of collections data or "Error".</li>




### Items
===========
<li>wallet_id is automatically extracted from access token</li>

#### Create item

POST <code>http://127.0.0.1:4002/items/create_item</code>
<li>Input parameters: <br />
[<br />
    {<br />
        "address": "23456782345678923456789345678945678",<br />
        "name": "Test4",<br />
        "description": "My Test Collection",<br />
        "image": {<br />
            "data": [ 108, 102, 108, 100] },<br />
        "collection": 1,<br />
        "tags": "Epic",<br />
        "price": 10000,<br />
    }<br />
]<br />
<li>Output: Item data or "Error".</li>
Example of successful execution: <br />
[<br />
    {<br />
        "id": 24,<br />
        "wallet_id": "11798655436575545435456546545464646456765456565",<br />
        "name": "Test",<br />
        "description": "My Test Collection",<br />
        "created_at": "2022-04-19T14:39:32.000Z"<br />
    }<br />
]<br />


#### GET all items by wallet_id
GET <code>http://127.0.0.1:4002/items/get_items_by_wallet</code>
<li>Output: List of items data or "Error".
The elements are identical to the query result by id.</li>


#### GET item by id
GET <code>http://127.0.0.1:4002/items/get_item_by_id</code>
<li>Output: Item data or "Error".
Output example: <br />
[<br />
    {<br />
        "id": 1,<br />
        "address": "23456782345678923456789345678945678",<br />
        "name": "Test",<br />
        "description": "My Test Collection",<br />
        "image": {<br />
            "type": "Buffer",<br />
            "data": [ 108, 102, 108 ] },<br />
        "collection": 1,<br />
        "tags": "Epic",<br />
        "price": 10000,<br />
        "creator": "11798655436575545435456546545464646456765456565",<br />
        "owner": "11798655436575545435456546545464646456765456565",<br />
        "created_at": "2022-04-19T15:22:52.000Z"<br />
    }<br />
]<br />
</li>
