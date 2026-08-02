export type DesktopSection = "overview" | "about" | "work" | "community" | "fun" | "links" | "contact";

export const projects: { title:string; description:string; tags:string[]; tagsZh?:string[]; tone:string; href?:string; linkLabel?:string; titleZh:string; descriptionZh:string; linkLabelZh?:string }[] = [
  { title:"Senior Data Engineer", titleZh:"高级数据工程师", description:"Working in renewable energy, I design reliable, scalable data platforms and translate complex business needs into practical engineering outcomes.", descriptionZh:"我在可再生能源行业工作，负责设计可靠、可扩展的数据平台，并将复杂的业务需求转化为实用的工程成果。", tags:["Data Integration","Medallion Architecture","Data Governance","Stakeholder Collaboration"], tagsZh:["数据集成","奖章式架构","数据治理","跨团队协作"], tone:"mint", href:"https://www.smartestenergy.com/en_AU/", linkLabel:"Visit SmartestEnergy Australia", linkLabelZh:"访问 SmartestEnergy Australia" },
  { title:"Mentoring & Growing Together", titleZh:"导师陪伴，共同成长", description:"I mentor and support others by sharing practical experience, exploring ideas together, and creating space for questions. Helping others grow also challenges me to keep learning and become a better engineer.", descriptionZh:"我通过分享实践经验、一起探索想法并鼓励提问，为他人提供指导和支持。帮助他人成长，也推动我持续学习，成为更好的工程师。", tags:["Mentoring","Knowledge Sharing","Data Storytelling","Training"], tagsZh:["导师指导","知识分享","数据故事表达","培训"], tone:"amber", href:"https://www.linkedin.com/company/u-plus-career/about/", linkLabel:"Visit U Plus Career", linkLabelZh:"访问 U Plus Career" },
  { title:"Data Engineering Bootcamp", titleZh:"数据工程训练营", description:"A hands-on programme exploring modern data platforms, AI-assisted development, system design, and reliable delivery.", descriptionZh:"一个探索现代数据平台、AI 辅助开发、系统设计与可靠交付的实战项目。", tags:["Azure Data Factory","Databricks","Power BI","Codex","CI/CD"], tagsZh:["Azure Data Factory","Databricks","Power BI","Codex","CI/CD"], tone:"green", href:"/projects/green-certificate-shortfall-analytics", linkLabel:"View Green Certificate Project", linkLabelZh:"查看绿色证书项目" },
  { title:"Home Essentials, Business Project", titleZh:"Home Essentials, 商业项目", description:"A business project focused on an Australian ecommerce destination for thoughtful gifts, home decor, craft supplies, and everyday essentials.", descriptionZh:"一个面向澳大利亚消费者的电商商业项目，提供礼品、家居装饰、手工用品和日常好物。", tags:["Shopify","Ecommerce","Customer Experience","Business Operations"], tagsZh:["Shopify","电子商务","客户体验","业务运营"], tone:"cyan", href:"https://home-essentials.com.au/", linkLabel:"Visit Home Essentials", linkLabelZh:"访问 Home Essentials" },
];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; labelZh:string; tone:string }[] = [
  {id:"about",label:"About",labelZh:"关于我",tone:"mint"},{id:"work",label:"Work",labelZh:"工作",tone:"amber"},{id:"community",label:"Community",labelZh:"社区",tone:"cyan"},
  {id:"fun",label:"Just for fun",labelZh:"兴趣",tone:"yellow"},{id:"links",label:"Links",labelZh:"链接",tone:"purple"},{id:"contact",label:"Contact me",labelZh:"联系我",tone:"pink"},
];





