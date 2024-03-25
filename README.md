- npm i -d prisma 
- npx prisma init 
when prisma is set up (in prisma/schema-prisma file) add all the schemas that you need
- npm i @prisma/client
- Connect prisma to mongodb server 
-  Make the schema for the user and the account
-  npm i next-auth@latest @next-auth/prisma-adapter
next-auth allows us to perform authentication operations while prisma-adapter allows us to connect next-auth to prisma
- make a prisma client exporter file in app/lib (this is boilerplate)
- make authentication endpoint route in app/api/auth/[...next-auth]/route.jsx
this is the file that mentions all the authentication options you want to provide (ex-google provide , github provider , credentials provider)
for google / github and more such providers , we only need to pass the client id and secret key from your account
but for credentials provider we need to pass all the credentials need in a form like format , in this provider itself , we need to write the authorize logic (inside async authorize(credentials) function) in this function credentials is the object containing all the properties passed in the form and to compare it with values from the database , we need to use prisma to operate on database

- at last to implement log in logic , use sigIn function by next-auth/react this function will set the session token and hence change the data associated with the token 
- to implement the register logic , make seperate api/register/route file to handle fetch request and check if that user is already registered , if not make an entry in the database , if yes , then throw an error as response

- an error would come , if we dont use npx prisma generate before starting our server for the first time
- also we need to add new database url everytime when we turn off for some long time