import { useRef, useEffect } from 'react'
import * as d3 from "d3";

// const colors = {
//   "green"
// }

const oracle = {
  "name":"oracle",
  "status":"",
  "description":"",
  "children":[
      {
        "name":"asking oracle",
        "status":"ready",
        "description":
          "IN ORDER TO get perspective tokens \n"+
          "AS A user \n" +
          "I NEED AN oracle query controls \n" +
          "\n" +
          "GIVEN strategy pararm sliders \n" +
          "WHEN change the values \n" +
          "THEN immediate data change happens \n" +
          "\n" +
          "WHEN tweek interval slider \n" +
          "THEN sub-interval is enabled only for \n" +
          "  not more then half of interval value \n" +
          "\n" +
          "WHEN data is loading \n" +
          "THEN loader is seen for the whole list \n" +
          "\n" +
          "WHEN there is no tokens \n" +
          "THEN relevant notifier is shown \n"
      },
      {
        "name":"updating tokens list",
        "status":"ready",
        "description":
          "IN ORDER TO get updated data \n"+
          "AS A user \n" +
          "I NEED A whole list refetch \n" +
          "\n" +
          "GIVEN \"PERSPECTIVE TOKENS\" header \n" +
          "WHEN hover on it  \n" +
          "THEN see refetch proposition \n" +
          "WHEN click it  \n" +
          "THEN whole list refetch happens \n"
      },
      {
        "name":"getting token record",
        "status":"ready",
        "description":
          "IN ORDER TO get token details \n"+
          "AS A user \n" +
          "I NEED A token fetch \n" +
          "\n" +
          "GIVEN perspective token fetch started \n" +
          "THEN load status is displayed \n" +
          "\n" +
          "GIVEN succesful fetch \n" +
          "THEN token data is displayed \n"
      },
      {
        "name":"updating token record",
        "status":"ready",
        "description":
          "IN ORDER TO get updated token data or prevent load stuck \n"+
          "AS A user \n" +
          "I NEED A token refetch \n" +
          "\n" +
          "GIVEN token record stuck fetch and token refetch button \n" +
          "WHEN click refetch \n" +
          "THEN see loader \n" +
          "THEN see token actual data"
      },
      {
        "name":"removing duplicates",
        "status":"quest",
        "description":
          "IN ORDER TO avoid duplicates in response \n"+
          "AS A developer \n" +
          "I NEED A ... ? \n"
      },
      {
        "name":"saving oracle request params",
        "status":"ready",
        "description":
          "IN ORDER TO save oracle query in strategy \n"+
          "AS A developer \n" +
          "I NEED A saving option \n" +
          "\n" +
          "GIVEN oracle query selected \n" +
          "THEN can retrieve it from state"
      },
      {
        "name":"Dealing with \"result not found tokens\"",
        "status":"quest",
        "description":
          "IN ORDER TO avoid absence of data for perspective tokens \n"+
          "AS A developer \n" +
          "I NEED A ... ?"
      }
  ]
}

const strategyControls = {
  "name":"strategyControls",
  "children":[
      {
        "name":"addStrategy",
        "status":"ready",
        "description":
            "IN ORDER TO store set strategy \n"+
            "AS A user \n" +
            "I NEED A relevant controls \n" +
            "\n" +
            "GIVEN strategy panel with plus button\n" +
            "WHEN click button \n" +
            "THEN add panel unfolds \n" +
            "THEN it stores few previously set params \n" +
            "AND few more available params \n " +
            "\n" +
            "WHEN required params selected \n" +
            "AND 'submit' button is clicked \n" +
            "THEN loader is shown \n" +
            "THEN added strategy appears in a table"
      },
      {
        "name":"deleteStrategy",
        "status":"ready",
        "description":
            "IN ORDER TO remove wrong/unused strategy \n"+
            "AS A user \n" +
            "I NEED A delete option \n" +
            "\n" +
            "GIVEN strategy record with delete button \n" +
            "WHEN click button \n" +
            "THEN processing status appears \n" +
            "THEN table is reloaded without deleted record"
      },
      {
        "name":"disable editing existing strategy",
        "description":
            "IN ORDER TO avoid rewriting existing strategy \n" +
            "AS A user \n " +
            "I NEED A notification in case of invalid input"
      },
      {
        "name":"disable submiting invalid strategy input",
        "description":
            "IN ORDER TO avoid accidental strategy submitting \n" +
            " with invalidated state \n" +
            "AS A user \n " +
            "I NEED A blocked submit button until all fields are correct"
      },
  ]
}
const strategyStatistics = {
  "name":"strategyStatistics",
  "children":[
    {
      "name":"getStrategies",
      "status":"ready",
      "description":
          "IN ORDER TO see strategies \n"+
          "AS A user \n" +
          "I NEED A strategies table \n" +
          "\n" +
          "GIVEN main page loaded \n" +
          "THEN strategy components loads existing strategies \n" +
          "  with params ..."
    }
  ]
}
const strategyValidations = {
  "name":"strategyValidations",
  "children":[
    {"name":"strategy backtesting"},
    {"name":"strategy weighting"},
    {"name":"strategy profit projections measurement"},
    {"name":"strategy risks projections measurement"},
    {"name":"strategy validation against coarser grain MA's"},
    {"name":"strategy growth tren approval by against other tokens"},
    {"name":"strategy growth tren approval by against other indices"},
    {"name":"strategy trend strength lack of contradictions"},
    {"name":"strategies history comparison for same token"},
    {"name":"strategies current comparison for many tokens"},
    {"name":"liquidity weighting"},
    {"name":"volume weighting"},
  ]
}
const strategyControlsAndSatistics = {
  "name":"strategyControlsAndSatistics",
  "children":[
    strategyControls,
    strategyStatistics,
    strategyValidations
  ]
}
const tradingControlsAndSatistics = {
  "name":"tradingControlsAndSatistics",
  "children":
  [
    {
    "name":"wallet",
    "description":"",
    "children":[
        {
          "name":"getting wallet",
          "status":"ready",
          "description":
            "IN ORDER TO manage resources \n" +
            "AS A user \n" +
            "I NEED A wallet \n" +
            "\n" +
            "GIVEN main page \n" +
            "THEN wallet is loaded"
        },
        {
          "name":"buying token",
          "status":"wip",
          "description":"IN ORDER TO start trading \n" +
          "AS A user \n" +
          "I NEED A buy token interface \n" +
          "\n" +
          "GIVEN wallet loaded and perspective tokens loaded \n" +
          "WHEN click on \"buy\" button at token record \n" +
          "THEN buy interface unfolds underneath the token record \n" +
          "\n" +
          "THEN \n" +
          " - chain is selected \n" +
          " - token to buy is selected \n" +
          "WHEN \n" +
          " - select wallet address \n" +
          " - select input stable amount \n" +
          " - ... ? \n" +
          "THEN \n" +
          " - interface reflects balance change \n" +
          " - ... ? " +
          "+ \"wallet_address\"\n" +
          "+ \"chain_id\"\n" +
          "+ \"token_buy_address\"\n" +
          "+ \"token_sell_address\"\n" +
          "+ \"stable_amount\"\n" +
          "?\"wallet_buy_balance\"\n" +
          "?\"wallet_sell_balance\"\n" +
          "?\"block_number\"\n" +
          "~\"timestamp\""
        },
        {
          "name":"buying more token",
          "description":"... see buy token"
        },
        {
          "name":"selling token",
          "description":
          "... does it have to be at the wallet ? \n" +
          "or at the token record as with \"buy\" button"
        },
        {
          "name":"tracking gain/loss",
          "description":"same to dexguru interface?"
        },
        {
          "name":"tracking current strategy",
          "description":"?"
        },
        {
          "name":"tracking alternative strategies",
          "description":"?"
        }
    ]
  }
]
}

const implementationFeatures = [
    oracle,
    strategyControlsAndSatistics,
    tradingControlsAndSatistics
]

const exisitngToolProblems = {
  "name":"exisitngToolProblems",
  "description":
  "IN ORDER TO not fall into a trap of loosing focus \n" +
  "AND not to re-invent exisitng tools \n" +
  "AND to denote possible threats and weaknessess \n" +
  "AS A developer \n" +
  "I NEED TO \n" +
  " - analyze and store existing tool|s problems\n" +
  " - no embedded strategy managers \n" +
  " - trading buttons only \n",
  "children":[...implementationFeatures]
}
const deliveries = {
  "name":"deliveries",
  "description":
  "IN ORDER TO manage strategies \n" +
  "AS A trader \n" +
  "I NEED A \n" +
  " - trading terminal \n" +
  " - trading journal \n" +
  " - trading charts \n" +
  " - trading notes \n" +
  " - strategy controls \n" +
  " - data tables (oracle, strategy, wallets) \n",
  "children": [exisitngToolProblems]
}

const businessObjective = {
  "name":"problem",
  "description":
  "IN ORDER TO gain monthly 10% profit ? \n" +
  "AS A trader \n" +
  "I NEED A trading strategy manager",
  "children":[deliveries]
}
const LinksTree = () => {

    const ref = useRef();

      let features  =
        {
          "name":"epic",
          "children":[
              oracle,
              strategyControlsAndSatistics,
              tradingControlsAndSatistics
          ]
        }
        let data = businessObjective

        const root = d3.hierarchy(data);

    // Sort the nodes.
    // root.sort((a,b) => a - b);

    // let groups = d3.group(initialTableData,(d) => d.epic, (d) => d.story)
    // let hierarchy = d3.hierarchy(initialTableData)
    // Compute the layout.
    const width = 600
    const dx = 20;
    const dy = width / (root.height + 1);
    let layout = d3.tree().size([700,900])(root)
    // nodeData = hierarchy.descendants()
    // linkData = hierarchy.links()
    //
    // // Compute labels and titles.
    const label = (d) => d.name;
    const descendants = root.descendants();
    console.log("Hierarchy: ", root)
    const L = descendants.map(d => label(d.data, d));
    //
    console.log("L: ", L)

    //Begin making the horizontal link diagram
    // var link = d3.linkHorizontal()
    //     .source((d) => [d.source[1], d.source[0]])
    //     .target((d) => [d.target[1], d.target[0]]);

    const createRoot = (rootName) => {
        d3.select(ref.current)
        // .append("svg")
        .attr("id",rootName)
        // .attr("viewBox", [-dy * padding / 2, x0 - dx, width, height])
        // .attr("width", 800)
        // .attr("height", 800)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("transform","translate(200,10)")
    }

    //
    // .attr("xlink:href", link == null ? null : d => link(d.data, d))
    // .attr("target", link == null ? null : linkTarget)



    const addNodes = (data,rootName) => {
        let node =
          d3.select("#" + rootName) //Adding the Circle nodes
          .selectAll("a")
          .attr("class","node")
          .data(root.descendants())
          .join("a")
            .attr("transform", d => `translate(${d.y + 50},${d.x})`)

          node
          .append("circle")
          .attr("class","circle")
          .attr("fill", (d) => (
            d.data.status == "wip"
            ? "#0884CA"
            : d.data.status == "ready"
              ? "#5A8D32"
                : d.data.status == "quest"
                  ? "#E69F15"
                  : "#999")
          )
         .attr("r", 8)

         // node.append("text")
         // .attr("fill", "green")
         // .text("rrrr")

         const title = (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}` // hover text
         if(title != null){
           node.append("title")
           .text((d) => d.data.description)
         }

          node.append("text")
          .data(data)
         .attr("dy", "0.32em")
         .attr("x", d => d.children ? -10 : 10)
         .attr("y", d => d.children ? -10 : 0)
         .attr("text-anchor", d => d.children ? "end" : "start")
         .attr("paint-order", "stroke")
         .attr("class","node")
         .text((d, i) => L[i]);

         // return node
    }

    const addStatus = (node) => {
      // add status
      node.append("circle")
      .attr("fill", "green")
      .attr("r", 10)
    }

    const addLinks = (data,rootName) => {
         d3.select("#" + rootName) //Adding the link paths
        .selectAll("path")
        // .attr("stroke-opacity", strokeOpacity)
        // .attr("stroke-linecap", strokeLinecap)
        // .attr("stroke-linejoin", strokeLinejoin)
        // .attr("stroke-width", strokeWidth)
        // .selectAll("path")
        .data(data)
        .join("path")
          .attr("fill", "none")
          .attr("stroke", "#999")
          .attr("d", d3.link(d3.curveBumpX)
              .x(d => d.y + 50)
              .y(d => d.x));
    }

    const addLabels = (data, rootName) => {
          d3.selectAll(".circle")
          .append("text")
          .data(data)
         .attr("dy", "0.32em")
         .attr("x", d => d.children ? -1 : 1)
         .attr("text-anchor", d => d.children ? "end" : "start")
         .attr("paint-order", "stroke")
         .attr("stroke", "#fff")
         .attr("stroke-width", 3)
         .text((d, i) => L[i])

    }

    const addDescriptions = () => {

      const title = (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}` // hover text
      // if(title != null){
          d3.selectAll(".node")
          // node
          .append("title")
          .text((d) => d.data.description)
        // }

         // node.append("text")
        //  d3.selectAll(".node")
        //  .append("text")
        //  .data(data)
        // .attr("dy", "0.32em")
        // .attr("x", d => d.children ? -10 : 10)
        // .attr("y", d => d.children ? -10 : 0)
        // .attr("text-anchor", d => d.children ? "end" : "start")
        // .attr("paint-order", "stroke")
        // .attr("class","node")
        // .text((d, i) => L[i]);

    }

    const clearCanvas = () => d3.selectAll(".links > *").remove();

    useEffect(() => {

      let rootName = "quickDemoH"

      clearCanvas()
      createRoot(rootName)
      addLinks(root.links(),rootName)
      addNodes(root.descendants(),rootName)
      // addLabels(root.descendants(),rootName)
      // addDescriptions()

    },[data])
    return (
      <div style={{background: "lightGrey"}} class='module'>
        <h3>project plan and progress</h3>
        <svg ref={ref} class="links" width="100%" height="800" />
      </div>);
}

export default LinksTree
