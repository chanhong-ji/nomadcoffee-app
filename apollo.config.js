module.exports = {
  client: {
    includes: ["./**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "nomad-coffee",
      url: "http://localhost:4000/graphql",
    },
  },
};
