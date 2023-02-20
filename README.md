# Trading game playground
Current version stores development branches on different pages available via links in the header.
[Try me](https://oushanskeen.github.io/special-octo-giggle/)

----------------------------------------------------------------

## 1. Recent strategy validator
is on the 1st page and stores its main spec in BDD feature files (./src/testing/serenity/src/test/resources/features/search).


## 2. Pure strategy validator
is on the 2nd page (upcoming) is based on tdd approach and more pure MVC arcitecture. Stores its component spec in cypress files (./cypress/component/HelloWorldComponentName.cy.js).

## 3. D3 experiments
is on the 3d page and stores future planned visualizations sketches.

## 4. Old initial trading game game start version
is on the 4h page stores what's been done.

----------------------------------------------------------------

## Run by:
npm start
## Test components by:
npm run cypress
## Test BDD by:
mvn clean verify
