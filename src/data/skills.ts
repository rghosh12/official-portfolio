export const skills = {
  languages: [
    { name: "Java", icon: "openjdk" },
    { name: "Python", icon: "python" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Swift", icon: "swift" },
    { name: "HTML", icon: "html5" },
    { name: "TypeScript", icon: "typescript" },
    { name: "R", icon: "r" },
    { name: "Fortran", icon: "" },
  ],
  frontend: [
    { name: "Next.js", icon: "nextdotjs" },
    { name: "React", icon: "react" },
    { name: "React Native", icon: "react" },
    { name: "Angular", icon: "angular" },
  ],
  aiDevelopment: [
    { name: "Cursor", icon: "", image: "/logos/cursor.png" },
    { name: "Claude Code", icon: "", image: "/logos/claude-code.png" },
    { name: "Codex", icon: "", image: "/logos/codex.png" },
    { name: "Google Gemini", icon: "", image: "/logos/google-gemini.png" },
  ],
  backend: [
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Firebase", icon: "firebase" },
    { name: "Flask", icon: "flask" },
    { name: "Django", icon: "django" },
  ],
  database: [
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "Supabase", icon: "supabase" },
    { name: "MySQL", icon: "mysql" },
    { name: "SQLite", icon: "sqlite" },
  ],
  awsServices: [
    { name: "DynamoDB", icon: "", image: "/logos/aws-dynamodb.png" },
    { name: "Lambda", icon: "", image: "/logos/aws-lambda.png" },
    { name: "Bedrock", icon: "", image: "/logos/aws-bedrock.png" },
  ],
} as const;
