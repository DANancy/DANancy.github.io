export interface TechCategory {
  anchor: string;
  title: string;
  items: string[];
  note?: string;
}

export const techCategories: TechCategory[] = [
  {
    anchor: "cloud",
    title: "Cloud & Platforms",
    items: ["Microsoft Azure", "Azure Synapse Analytics", "Azure Data Factory", "Azure Data Lake Storage", "Microsoft Fabric", "Databricks", "Snowflake", "AWS"],
  },
  {
    anchor: "aws",
    title: "AWS Services",
    items: ["S3", "Lambda", "SQS", "SNS", "EventBridge", "IAM", "KMS", "Secrets Manager"],
  },
  {
    anchor: "programming",
    title: "Programming",
    items: ["SQL", "Python", "PySpark", "Spark"],
  },
  {
    anchor: "bi",
    title: "Business Intelligence",
    items: ["Power BI"],
  },
  {
    anchor: "enterprise",
    title: "Enterprise Systems",
    items: ["Salesforce", "SAP", "Oracle", "SQL Server", "PostgreSQL"],
  },
  {
    anchor: "architecture",
    title: "Architecture",
    items: ["Lakehouse", "Medallion Architecture", "ETL / ELT", "Data Warehousing", "Data Modelling", "Kimball", "Data Governance", "Purview"],
  },
  {
    anchor: "modern",
    title: "Modern Engineering",
    items: ["REST APIs", "GraphQL", "GitHub", "GitHub Actions", "Azure DevOps", "CI/CD"],
  },
  {
    anchor: "ai",
    title: "Artificial Intelligence",
    items: ["LLMs", "Claude", "OpenAI", "Cursor", "GitHub Copilot", "AI Agents", "MCP", "RAG", "GraphRAG", "Prompt Engineering"],
    note: "AI should amplify engineers, not replace them — these are the tools I use to move faster, not a replacement for judgment.",
  },
  {
    anchor: "system-design",
    title: "System Design",
    items: ["Distributed Systems", "Scalability", "Reliability", "Architecture Design"],
  },
];
