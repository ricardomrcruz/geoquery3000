La query que manque sur le checkpoint:

get countries by continent

query Query($continent: String!) {
  getCountriesByContinent(continent: $continent) {
    name
    isocode
    id
    flag
    continent {
      id
      isocode
      name
    }
  }
}

example:

{  
    "continent": "North America"
}
