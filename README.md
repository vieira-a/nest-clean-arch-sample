# Clean Architecture principles with NestJS

### Objectives

The main objective to this sample project is apply the Clean Architecture principles to a NestJS core concepts. 

- You can think: why is this necessary? Clean Architecture principles applyed to a framework...humm, there is no sense!!

Maybe! I thought about it!

But I also thought: when using NestJS, as you implement various features and you application grows, the number of components also increase. In an architecture proposed by NestJS, for example, you declare all routes in just one controller file. The same happen with a service: all main features that deal with the database, for exemple, in a same file. Of course, this is not a NestJS rule, it's just a framework suggestion; you can organize as you want.

The fact is that when I started applying tests to my app, a realize the importance of modularizing. That's why I applied some concepts of Clean Architecture here: to isolate the components as much as possible, and be able to test them without difficulty.

That is what I did:

- One service to each use case;
- Strong use of Dependencie Injections;

What did I get?

- I limited the scope of the services
- I can test each use case in isolation
- I can test integrations between use cases in an organized way  

With all this. the maintance is pretty cool!

### How to test

1 - Clone this repository

`git clone git@github.com:vieira-a/nest-clean-arch-sample.git`

2 - Install all dependencies

`npm install`

3 - Create a `.env` file in the project root according with `.env.example` file

4 - Run the docker container

`docker-compose up -d`

5 - Access http://localhost:3000

The project has two sample routes:

> POST

http://localhost:3000/register

> GET

http://localhost:3000/customers

See the customer register requeriments in model: `src/domain/dtos/create-customer-dto.ts`

```
cpf: string;
name: string;
address: string;
uf: string;
city: string;
cep: string;
email: string;
password: string;
passwordConfirmation: string;
phone1: string;
phone2: string;
status: string;
createdAt: Date;
updatedAt: Date;

```

Enjoy!

If you like this soluction, share it!

### About the author

My name is [Anderson Vieira](https://www.linkedin.com/in/vieira-a).
I'm a web developer with focus in backend using the main stacks of the Javascript language.

