export type DesktopSection = "overview" | "about" | "work" | "ventures" | "community" | "fun" | "links" | "contact";

export const projects: { title:string; description:string; tags:string[]; tagsZh?:string[]; tone:string; href?:string; linkLabel?:string; linkLabelZh?:string; secondaryHref?:string; secondaryLinkLabel?:string; secondaryLinkLabelZh?:string; titleZh:string; descriptionZh:string }[] = [
  { title:"Senior Data Engineer · Data Magician", titleZh:"高级数据工程师 · 数据魔法师", description:"I genuinely love what I do. I grew from a Data Analyst into a Senior Data Engineer, carrying my curiosity across the automotive and energy industries through Auto-IT, AGL, Shell Energy, and now SmartestEnergy Australia in renewable energy. Being recognised with Best of 2024 at Shell Energy reinforced the care and energy I bring to my work.\nToday, I turn technology into useful products and work end to end across Retail Operations, IT, Risk, Trading, and Finance to understand the bigger picture and create lasting value. I also host and contribute to internal Lunch & Learn sessions, sharing practical knowledge and helping useful ideas travel across teams.", descriptionZh:"我真心热爱自己的工作。从数据分析师到高级数据工程师，我带着对数据的好奇心跨越汽车与能源行业，先后在 Auto-IT、AGL、Shell Energy 工作，如今在 SmartestEnergy Australia 深耕可再生能源领域。在 Shell Energy 获得 Best of 2024 的认可，也印证了我投入工作中的热情与用心。\n如今，我享受把技术转化为实用产品，并与零售运营、IT、风险、交易和财务等团队开展端到端协作，理解业务全貌并创造长期价值。我也在公司内部主持并参与 Lunch & Learn 分享，通过交流实践经验，促进知识在不同团队之间流动。", tags:["PySpark","SQL","Salesforce","Azure Data Factory","Azure Synapse","AWS","Medallion Architecture","Power BI","Data Pipelines","DevOps","End-to-End Product Delivery","Stakeholder Collaboration","Lunch & Learn Host","Internal Knowledge Sharing"], tagsZh:["PySpark","SQL","Salesforce","Azure Data Factory","Azure Synapse","AWS","奖章式架构","Power BI","数据管道","DevOps","端到端产品交付","利益相关者协作","Lunch & Learn 主持人","内部知识分享"], tone:"mint", href:"https://www.linkedin.com/in/yangyangcai", linkLabel:"View LinkedIn Profile", linkLabelZh:"查看 LinkedIn 主页" },
];

export const independentPractice = [
  {
    title:"Mentoring & Interview Guidance", titleZh:"导师辅导与面试指导",
    role:"Independent Practitioner · ABN Business", roleZh:"独立业务 · ABN 经营",
    description:"Practical mentoring, lecturing, and one-to-one interview guidance that helps people connect technical knowledge with real situations, build confidence, and identify useful next steps.",
    descriptionZh:"通过导师辅导、授课和一对一面试指导，帮助学习者把技术知识与真实场景连接起来，建立信心并找到切实可行的下一步。",
    tags:["Mentoring","Lecturer","1:1 Interview Guidance"], tagsZh:["导师辅导","讲师","一对一面试指导"],
    href:"https://www.linkedin.com/company/u-plus-career/about/", linkLabel:"Visit U Plus Career", linkLabelZh:"访问 U Plus Career",
  },
  {
    title:"AI-Data Engineering Bootcamp", titleZh:"AI 数据工程训练营",
    role:"Founder & Instructor · ABN Business", roleZh:"创办人与讲师 · ABN 经营",
    description:"A self-designed, 12-session (18-hour) bootcamp using a public dataset to explore the complete data engineering lifecycle, dependable delivery, and practical AI support.",
    descriptionZh:"由我自主设计并授课、共 12 节（18 小时）的训练营，通过公开数据集探索完整的数据工程生命周期、可靠交付与实用 AI 支持。",
    tags:["Data Engineering","Databricks AI","Power BI MCP","Codex"], tagsZh:["数据工程","Databricks AI","Power BI MCP","Codex"],
    href:"https://yangyangcai.me/projects/green-certificate-shortfall-analytics", linkLabel:"View Portfolio Demo", linkLabelZh:"查看作品集演示",
  },
  {
    title:"Practical AI Workshops", titleZh:"实用 AI 工作坊",
    role:"Workshop Instructor · ABN Professional Service", roleZh:"工作坊讲师 · ABN 专业服务",
    description:"Paid, hands-on AI workshops designed to help people turn ideas and everyday information into useful, working AI solutions they can continue improving after the session.",
    descriptionZh:"通过付费的实用 AI 工作坊，帮助参与者把想法和已有信息转化为可运行、并能在课后继续完善的 AI 解决方案。",
    tags:["AI Workshops","Facilitation","Practical AI","Knowledge Agents"], tagsZh:["AI 工作坊","引导式教学","实用 AI","知识智能体"],
    href:"https://www.makeaipractical.com.au/", linkLabel:"Explore Make AI Practical", linkLabelZh:"了解 Make AI Practical",
  },
];

export const ventures = [
  {
    title: "Home Essentials",
    titleZh: "Home Essentials",
    role: "Business Partner · Ecommerce Venture",
    roleZh: "商业合作伙伴 · 电商项目",
    description:
      "A collaborative ecommerce venture built with friends, focused on thoughtful gifts, home decor, craft supplies, and everyday essentials. I contribute across the online store, customer experience, and digital operations.",
    descriptionZh:
      "与朋友共同经营的电商合作项目，专注于礼品、家居装饰、手工材料和日常好物。我主要参与线上商店、客户体验和数字化运营。",
    tags: ["Shopify", "Ecommerce", "Customer Experience", "Digital Operations"],
    tagsZh: ["Shopify", "电子商务", "客户体验", "数字化运营"],
    href: "https://home-essentials.com.au/",
    linkLabel: "Visit Home Essentials",
    linkLabelZh: "访问 Home Essentials",
    secondaryHref: "https://studio.home-essentials.com.au/night-light",
    secondaryLinkLabel: "Create a Custom Night Light",
    secondaryLinkLabelZh: "定制专属小夜灯",
  },
  {
    title: "Ren Jun Jewellery",
    titleZh: "仁君珠宝",
    role: "Venture Partner · Coming Soon",
    roleZh: "创业合作伙伴 · 即将推出",
    description:
      "An early-stage venture developing AI-powered business management solutions for jewellery retail stores. I am building it with the team as a venture partner. More details are coming soon.",
    descriptionZh:
      "一个面向珠宝零售门店、提供 AI 驱动经营管理方案的早期创业项目。我作为创业合作伙伴参与团队共同建设。更多内容即将发布。",
    tags: ["Jewellery Retail", "AI Solutions", "Business Management"],
    tagsZh: ["珠宝零售", "AI 解决方案", "经营管理"],
  },
];

export const navigation: { id:Exclude<DesktopSection,"overview">; label:string; labelZh:string; tone:string }[] = [
  {id:"about",label:"About",labelZh:"关于我",tone:"mint"},{id:"work",label:"Work",labelZh:"工作",tone:"amber"},{id:"ventures",label:"Business",labelZh:"业务与创业",tone:"pink"},{id:"community",label:"Community",labelZh:"社区",tone:"cyan"},
  {id:"fun",label:"Just for fun",labelZh:"兴趣",tone:"yellow"},{id:"links",label:"Connect",labelZh:"联系与链接",tone:"purple"},
];





