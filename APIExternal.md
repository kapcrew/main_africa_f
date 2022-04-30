# Explorer Page

## API Request
<details>
<summary>
GetAllItems

Used to collect all Token for NFT Marketplace.

**URL** : `/items/getAll/`

**Method** : `GET`
</summary>

**Auth required** : NO

**Data constraints**

```json
{
  "walletId": "[valid near address]",
}
```

**Data example**

```json
{
  "walletId": "duck2020.testnet",
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "user": {
    "walletId": "duck2020.testnet"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfaWQiOiIxMjExMTExMTExMTExMTExMTExMSIsImlhdCI6MTY1MDI3NzQ0MiwiZXhwIjoxNjUwMzc3NDQyfQ.OwjFrp6GduXAsF76Ft_xf8f58MyoQetq6-n6p9qjGBI",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3YWxsZXRfaWQiOiIxMjExMTExMTExMTExMTExMTExMSIsImlhdCI6MTY1MDI3NzQ0MiwiZXhwIjoxNjUwMzc3NDQyfQ.F8J_lWrNOhBGa2UCYfpK2zrV-X36MzmAGSMSfR0nCkM"
}
```

## Error Response

**Condition** : -

**Code** : `400 BAD REQUEST`

**Content** :

```json
{

}
```
</details>
