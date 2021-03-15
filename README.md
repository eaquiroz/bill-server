#Bill-Server Step on Mac

Open a new terminal on your Mac

```
cd server
```

```
npm install
```
   
```
npm start
```

Open another new terminal on your Mac

```
cd server
```

```
node database/migrations/item.js
```

```
node database/migrations/tax.js
```

Open browser and paste this link: http://localhost:9000/api-docs

This should create a Mongo database on your localhost called "bill-server" where you can open up the "items" and "taxes" collections with the correct information.
