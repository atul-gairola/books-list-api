const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

// dummy data
const books = [
  { name: "Rich Dad Poor Dad", genre: "Self Help", id: "1", author_id: "1" },
  {
    name: "Harry Potter and the sorcerer's stone",
    genre: "Fantasy",
    id: "2",
    author_id: "2",
  },
  { name: "Diary Of A Wimpy Kid", genre: "Fiction", id: "3", author_id: "3" },
  {
    name: "Diary Of A Wimpy Kid : The long haul",
    genre: "Fiction",
    id: "3",
    author_id: "3",
  },
  {
    name: "Diary Of A Wimpy Kid : Hard Ball",
    genre: "Fiction",
    id: "4",
    author_id: "3",
  },
  {
    name: "Harry Potter and the half blood prince",
    genre: "Fantasy",
    id: "5",
    author_id: "2",
  },
  {
    name: "Harry Potter and the prisoner of askaban",
    genre: "Fantasy",
    id: "6",
    author_id: "2",
  },
];

const authors = [
  { name: "Robert", age: 47, id: "1" },
  { name: "Michelle", age: 41, id: "2" },
  { name: "Sam", age: 42, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return authors.filter((cur) => cur.id === parent.author_id)[0];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter((cur) => cur.author_id === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   code to get data from db/other source
        return books.filter((cur) => cur.id === args.id)[0];
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //   code to get data from db/other source
        return authors.filter((cur) => cur.id === args.id)[0];
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
