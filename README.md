
# Backend Checkpoint Test - Wild Code School November Class

This repository contains the backend server and SQLite database for querying countries and their corresponding continents. It was developed as part of the Wild Code School November class checkpoint test.

## Getting Started


### Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/ricardomrcruz
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Populate the database with initial data:

   ```
   npm run resetDB
   ```

## Usage

After completing the installation steps, you can access Apollo Studio via localhost to test queries and mutations.

### Example GraphQL Queries

1. Find all countries:

   ```graphql
   query Query {
     countries {
       flag
       id
       isocode
       name
     }
   }
   ```

2. Find a country by its ISO code:

   ```graphql
   query Query($isocode: String!) {
     getCountryByCode(isocode: $isocode) {
       flag
       id
       isocode
       name
     }
   }
   ```

3. Get countries by continent name:

   ```graphql
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
   ```

   Example variables:
   ```json
   {  
     "continent": "North America"
   }
   ```

## Contributing

Feel free to submit issues and pull requests for any improvements or bug fixes.

Ricardo Martinho Cruz 2024 | OpenSource 4Life



