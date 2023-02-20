import PerspectiveTokensPureComponent from "../../src/components/PerspectiveTokensPureComponent";
import Accounts from "../../src/components/Accounts";


const dispatcher = async (msg,payload,state={}) => {

  switch(msg){
    case "SET_INTERVAL":
      return {...state, interval: payload}
      console.log("C: (dispatcher) SET INTERVAL IS TRIGGERED WITH STATE: ", state);
      break;
    case "SET_CHAIN":
      return {...state, chain: payload};
      break;
    case "SET_GAINS_THRESHOLD":
      return {...state, gainsThreshold: payload};
      break;
    case "SET_SUB_INTERVAL":
      return {...state, subInterval: payload};
      break;
    case "GET_TOKENS":
      let apiQueryPath = "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
      + state.interval
      + "&chain_id="
      + state.chain
      + "&gain_threshold="
      + state.gainsThreshold
      + "&trending_interval="
      + state.subInterval;

      let response = await fetch(apiQueryPath);
      let data = await response.json();
      let tokenData = data.tokens.map(token => ({
        id: token,
        strategy: payload.join(" ")
      }))
      return {...state, oracleCall: apiQueryPath, perspectiveTokens:tokenData};

    case "GET_WALLET":

      break;

    case "GET_STRATEGIES":
      let strategies = await fetch("https://deals-stage-lax.dexguru.biz/v1/deals/accounts?chain_id=1");
      let strategiesData = await strategies.json();
      return {...state, strategies: strategiesData.virtual};
      break;

    // case "GET_TRADER_PROFILE":
    //   return {...state, strategies: strategiesData.virtual};
    //   break;

    default:
      break;
  }
  console.log("N: (dispatcher) OUTPUT STATE: ", state);
  return state;
}

describe('Feature: HelloWorldComponentName.cy.js', () => {

  beforeEach(() => {
    cy.mount(<PerspectiveTokensPureComponent state={{}}/>)
  })

  it(`GIVEN initial state
      WHEN set interval 3600
      THEN interval is 3600`, async () => {
    //GIVEN initial state

    //WHEN
    let state = await dispatcher("SET_INTERVAL",3600);

    //THEN
    cy.mount(<PerspectiveTokensPureComponent state={state}/>)
    cy.get('#interval').should('contains.text', '3600')
  })

  it(`GIVEN initial state
      WHEN set chain 1
      THEN chain is 1`, async () => {
    //GIVEN initial state

    //WHEN
    let state = await dispatcher("SET_CHAIN",1);

    //THEN
    cy.mount(<PerspectiveTokensPureComponent state={state}/>)
    cy.get('#chain').should('contains.text', '1')
  })

  it(`GIVEN initial state
      WHEN set gains threshold 0.03
      THEN gains threshold 0.03`, async () => {
    //GIVEN initial state

    //WHEN
    let state = await dispatcher("SET_GAINS_THRESHOLD",0.03);

    //THEN
    cy.mount(<PerspectiveTokensPureComponent state={state}/>)
    cy.get('#gainsThreshold').should('contains.text', '0.03')
  })

  it(`GIVEN initial state
      WHEN set sub interval 1200
      THEN sub interval is 1200`, async () => {
    //GIVEN initial state

    //WHEN
    let state = await dispatcher("SET_SUB_INTERVAL",1200);

    //THEN
    cy.mount(<PerspectiveTokensPureComponent state={state}/>)
    cy.get('#subInterval').should('contains.text', '1200')
  })

  it(`GIVEN initial state
      WHEN get tokens with 3600 1 0.03 1200 params
      THEN url is https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.03&trending_interval=1200
      THEN api returns valid id tokens started with 0x
      THEN all records store strategy "3600 1 0.03 1200"`, async() => {
    //GIVEN initial state

    //WHEN
    let state;
    state = await dispatcher("SET_INTERVAL",3600);
    state = await dispatcher("SET_CHAIN",1,state);
    state = await dispatcher("SET_GAINS_THRESHOLD",0.03,state);
    state = await dispatcher("SET_SUB_INTERVAL",1200,state);
    state = await dispatcher("GET_TOKENS",[3600,1,0.03,1200],state);
    console.log("State after set interval: ",state);

    //THEN
    let apiQueryPath = "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
    + 3600
    + "&chain_id="
    + 1
    + "&gain_threshold="
    + 0.03
    + "&trending_interval="
    + 1200;

    cy.mount(<PerspectiveTokensPureComponent state={state}/>)

    expect(state.oracleCall).eq(apiQueryPath);
    cy.get('.perspectiveTokens').should('contains.text', '0x')
    cy.get('.tokenStrategy').each((item, index, list) => {
          expect(Cypress.$(item).text()).to.eq("3600 1 0.03 1200");
    });
  })

  it(`GIVEN initial state
      THEN wallet data is loaded`, async () => {
    //GIVEN initial state

    //WHEN
    let state = await dispatcher("GET_WALLET","");
    //THEN
    cy.mount(<PerspectiveTokensPureComponent state={state}/>)

    expect(state.wallet).length.to.be.greaterThan(0);

    // cy.get('.walletRecords').each((item, index, list) => {
    //     expect(list).to.be.greaterThan(0);
    //       // expect(Cypress.$(item).text()).to.eq("");
    // });
  })

})

describe("Feature: Accounts", () => {
  beforeEach(() => {
    cy.mount(<Accounts state={{}}/>)
  })

  describe("Scenario: Get the list of accounts", () => {
    it(`GIVEN initial state
        THEN list of accounts is loaded`, async () => {
        //GIVEN initial state

        //WHEN
        let state = await dispatcher("GET_STRATEGIES","");
        //THEN
        cy.mount(<Accounts state={state}/>);

        let accountsListLength;
        cy.get('.accountRecords #strategyName').each((item, index, list) => {
          accountsListLength = list.length;
        });

        cy.get('.accountRecords #strategyName').each((item, index, list) => {
          expect(list.length).to.be.equal(accountsListLength);
          expect(Cypress.$(item).text().length).to.be.greaterThan(0);
        });

        cy.get('.accountRecords #walletAddress').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).text().length).to.eq(42);
        });

        cy.get('.accountRecords #balanceToken').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).text().length).to.eq(42);
        });

        cy.get('.accountRecords #nativeToken').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).text().length).to.eq(42);
        });

        cy.get('.accountRecords #gainThreshold').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).length).to.be.greaterThan(0);
        });

        cy.get('.accountRecords #sellThreshold').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).length).to.be.greaterThan(0);
        });

        cy.get('.accountRecords #gainInterval').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).length).to.be.greaterThan(0);
        });

        cy.get('.accountRecords #trendingInterval').each((item, index, list) => {
            expect(list.length).to.be.equal(accountsListLength);
            expect(Cypress.$(item).length).to.be.greaterThan(0);
        });

      })

      it(`GIVEN accouts loaded
          WHEN Bob asks for account progress
          THEN account progress is loaded`, async () => {

          //GIVEN initial state

          //WHEN

      });

  })


})
