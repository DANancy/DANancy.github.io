export type DesktopSection = "overview" | "about" | "work" | "community" | "books" | "fun" | "contact";

export const projects = [
  { title:"Green Certificate Platform", description:"Scalable data infrastructure for renewable energy certificate analytics, modelled through auditable Bronze, Silver, and Gold layers.", tags:["Python","Azure","SQL"], tone:"mint" },
  { title:"Knowledge Agent", description:"A retrieval-augmented knowledge system that turns complex notes and technical documentation into useful answers.", tags:["AI","LLM","MCP"], tone:"amber" },
  { title:"Data Engineering Winter Bootcamp", description:"A practical learning programme covering modern data engineering foundations, modelling, cloud platforms, and delivery.", tags:["Education","Databricks","Cloud"], tone:"green" },
];

export const skills = ["Python","SQL","PySpark","Azure","AWS","Databricks","Snowflake","Power BI","Data modelling","CI/CD"];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; tone:string }[] = [
  {id:"about",label:"About",tone:"mint"},{id:"work",label:"Work",tone:"amber"},{id:"community",label:"Community",tone:"cyan"},
  {id:"books",label:"Books",tone:"purple"},{id:"fun",label:"Just for fun",tone:"yellow"},{id:"contact",label:"Contact me",tone:"pink"},
];
