export type DesktopSection = "overview" | "about" | "work" | "community" | "fun" | "links" | "contact";

export const projects: { title:string; description:string; tags:string[]; tagsZh?:string[]; tone:string; href?:string; linkLabel?:string; titleZh:string; descriptionZh:string; linkLabelZh?:string }[] = [
  { title:"Senior Data Engineer", titleZh:"高级数据工程师", description:"Working in renewable energy, I build reliable data platforms and end-to-end products for commission forecasting, credit automation, green certificates, and pricing across Sales, Risk, Trading, and Finance.", descriptionZh:"我在可再生能源行业构建可靠的数据平台与端到端产品，支持销售、风险、交易和财务团队的佣金预测、信用自动化、绿色证书管理与产品定价。", tags:["Azure Data Factory","Azure Synapse","AWS","Medallion Architecture","Power BI","Data Pipelines","DevOps","End-to-End Product Delivery","Stakeholder Collaboration","Lunch & Learn Host"], tagsZh:["Azure Data Factory","Azure Synapse","AWS","奖章式架构","Power BI","数据管道","DevOps","端到端产品交付","利益相关者协作","午餐学习会主持人"], tone:"mint", href:"https://www.linkedin.com/in/yangyangcai", linkLabel:"View LinkedIn Profile", linkLabelZh:"查看 LinkedIn 主页" },
  { title:"Mentoring & Growing Together", titleZh:"导师陪伴，共同成长", description:"I mentor and support others by sharing practical experience, exploring ideas together, and creating space for questions. Helping others grow also challenges me to keep learning and become a better engineer.", descriptionZh:"我通过分享实践经验、一起探索想法并鼓励提问，为他人提供指导和支持。帮助他人成长，也推动我持续学习，成为更好的工程师。", tags:["Mentoring","Lecturer","1:1 Interview Guidance"], tagsZh:["导师指导","讲师","一对一面试指导"], tone:"amber", href:"https://www.linkedin.com/company/u-plus-career/about/", linkLabel:"Visit U Plus Career", linkLabelZh:"访问 U Plus Career" },
  { title:"Bootcamp Portfolio Demo", titleZh:"训练营作品集演示项目", description:"An independent learning demo built only from public Clean Energy Regulator data to explore modern data platforms, AI-assisted development, system design, and reliable delivery.", descriptionZh:"一个仅使用清洁能源监管机构公开数据的独立学习演示项目，用于探索现代数据平台、AI 辅助开发、系统设计与可靠交付。", tags:["Azure Data Factory","Databricks","Power BI","Codex","MCP","CI/CD","GitHub Pages","Terraform","Medallion Architecture","DataOps & AIOps"], tagsZh:["Azure Data Factory","Databricks","Power BI","Codex","MCP","CI/CD","GitHub Pages","Terraform","Medallion Architecture","DataOps & AIOps"], tone:"green", href:"/projects/green-certificate-shortfall-analytics", linkLabel:"View Portfolio Demo", linkLabelZh:"查看作品集演示" },
  { title:"Home Essentials, Business Project", titleZh:"Home Essentials, 商业项目", description:"A business project focused on an Australian ecommerce destination for thoughtful gifts, home decor, craft supplies, and everyday essentials.", descriptionZh:"一个面向澳大利亚消费者的电商商业项目，提供礼品、家居装饰、手工用品和日常好物。", tags:["Shopify","Ecommerce","Customer Experience","Business Operations"], tagsZh:["Shopify","电子商务","客户体验","业务运营"], tone:"cyan", href:"https://home-essentials.com.au/", linkLabel:"Visit Home Essentials", linkLabelZh:"访问 Home Essentials" },
];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; labelZh:string; tone:string }[] = [
  {id:"about",label:"About",labelZh:"关于我",tone:"mint"},{id:"work",label:"Work",labelZh:"工作",tone:"amber"},{id:"community",label:"Community",labelZh:"社区",tone:"cyan"},
  {id:"fun",label:"Just for fun",labelZh:"兴趣",tone:"yellow"},{id:"links",label:"Links",labelZh:"链接",tone:"purple"},{id:"contact",label:"Contact me",labelZh:"联系我",tone:"pink"},
];





