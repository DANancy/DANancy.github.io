export type DesktopSection = "overview" | "about" | "work" | "community" | "books" | "fun" | "contact";

export const projects: { title:string; description:string; tags:string[]; tone:string; href?:string; linkLabel?:string; titleZh:string; descriptionZh:string; linkLabelZh?:string }[] = [
  { title:"Senior Data Engineer", titleZh:"高级数据工程师", description:"Working in renewable energy, I design reliable, scalable data platforms and translate complex business needs into practical engineering outcomes.", descriptionZh:"我在可再生能源行业工作，负责设计可靠、可扩展的数据平台，并将复杂的业务需求转化为实用的工程成果。", tags:["Data Platforms","Cloud","Leadership"], tone:"mint", href:"https://www.smartestenergy.com/en_AU/", linkLabel:"Visit SmartestEnergy Australia", linkLabelZh:"访问 SmartestEnergy Australia" },
  { title:"Lunch and Learn", titleZh:"午餐分享会", description:"An initiative I set up at work because I love sharing what I learn and learning alongside others—turning technical ideas into useful conversations and hands-on learning.", descriptionZh:"这是我在工作中发起的分享活动，因为我喜欢分享所学，也享受和大家一起学习，把技术理念转化为有价值的讨论与动手实践。", tags:["Knowledge Sharing","AI","Community"], tone:"amber" },
  { title:"Data Engineering Bootcamp", titleZh:"数据工程训练营", description:"A practical learning programme covering modern data engineering foundations, modelling, cloud platforms, and delivery.", descriptionZh:"涵盖现代数据工程基础、建模、云平台和交付实践的实战学习项目。", tags:["Education","Databricks","Cloud"], tone:"green", href:"/projects/green-certificate-shortfall-analytics", linkLabel:"View Green Certificate Project", linkLabelZh:"查看绿色证书项目" },
  { title:"Home Essentials — Home Project", titleZh:"Home Essentials — 个人家居项目", description:"A personal home project creating an Australian ecommerce destination for thoughtful gifts, home decor, craft supplies, and everyday essentials.", descriptionZh:"这是我的个人家居项目：为澳大利亚消费者打造一个提供礼品、家居装饰、手工用品和日常好物的电商网站。", tags:["Ecommerce","Shopify","Retail"], tone:"cyan", href:"https://home-essentials.com.au/", linkLabel:"Visit Home Essentials", linkLabelZh:"访问 Home Essentials" },
];

export const skills = ["Python","SQL","PySpark","Azure","AWS","Databricks","Snowflake","Power BI","Data modelling","CI/CD"];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; labelZh:string; tone:string }[] = [
  {id:"about",label:"About",labelZh:"关于我",tone:"mint"},{id:"work",label:"Work",labelZh:"工作",tone:"amber"},{id:"community",label:"Community",labelZh:"社区",tone:"cyan"},
  {id:"books",label:"Books",labelZh:"阅读",tone:"purple"},{id:"fun",label:"Just for fun",labelZh:"兴趣",tone:"yellow"},{id:"contact",label:"Contact me",labelZh:"联系我",tone:"pink"},
];



