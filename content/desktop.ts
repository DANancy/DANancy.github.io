export type DesktopSection = "overview" | "about" | "work" | "community" | "books" | "fun" | "contact";

export const projects: { title:string; description:string; tags:string[]; tone:string; href?:string }[] = [
  { title:"Senior Data Engineer", description:"Designing reliable, scalable data platforms and translating complex business needs into practical engineering outcomes.", tags:["Data Platforms","Cloud","Leadership"], tone:"mint" },
  { title:"Lunch and Learn", description:"Creating approachable knowledge-sharing sessions that turn technical ideas into useful conversations and hands-on learning.", tags:["Knowledge Sharing","AI","Community"], tone:"amber" },
  { title:"Data Engineering Bootcamp", description:"A practical learning programme covering modern data engineering foundations, modelling, cloud platforms, and delivery.", tags:["Education","Databricks","Cloud"], tone:"green" },
  { title:"Home Essentials", description:"An Australian ecommerce destination for thoughtful gifts, home decor, craft supplies, and everyday essentials.", tags:["Ecommerce","Shopify","Retail"], tone:"cyan", href:"https://home-essentials.com.au/" },
];

export const skills = ["Python","SQL","PySpark","Azure","AWS","Databricks","Snowflake","Power BI","Data modelling","CI/CD"];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; tone:string }[] = [
  {id:"about",label:"About",tone:"mint"},{id:"work",label:"Work",tone:"amber"},{id:"community",label:"Community",tone:"cyan"},
  {id:"books",label:"Books",tone:"purple"},{id:"fun",label:"Just for fun",tone:"yellow"},{id:"contact",label:"Contact me",tone:"pink"},
];
