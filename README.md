1. npm start: To start the project
2. npm test: To run unit test
3. Used graphql for api querying
	a. http://localhost:3000/graphql
	b. Paste the following query in the graphql window

{
  query: sendEmail(to: "xyz@gmail.com", subject: "subject goes here", text: "text goes", html: "html goes here")
}

