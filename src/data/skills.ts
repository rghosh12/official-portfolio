export const skills = {
  languages: [
    { name: "Java", icon: "", image: "/logos/java.png", website: "https://dev.java/" },
    { name: "Python", icon: "python", website: "https://www.python.org/" },
    { name: "JavaScript", icon: "javascript", website: "https://tc39.es/ecma262/" },
    { name: "Swift", icon: "swift", website: "https://www.swift.org/" },
    { name: "HTML", icon: "html5", website: "https://html.spec.whatwg.org/" },
    { name: "TypeScript", icon: "typescript", website: "https://www.typescriptlang.org/" },
    { name: "R", icon: "r", website: "https://www.r-project.org/" },
    { name: "Fortran", icon: "", image: "/logos/fortran.png", website: "https://fortran-lang.org/" },
  ],
  frontend: [
    { name: "Next.js", icon: "", image: "/logos/nextjs.png", website: "https://nextjs.org/" },
    { name: "React", icon: "react", website: "https://react.dev/" },
    { name: "React Native", icon: "react", website: "https://reactnative.dev/" },
    { name: "Angular", icon: "", image: "/logos/angular.png", website: "https://angular.dev/" },
  ],
  aiDevelopment: [
    { name: "Cursor", icon: "", image: "/logos/cursor.png", website: "https://www.cursor.com/" },
    { name: "Claude Code", icon: "", image: "/logos/claude-code.png", website: "https://www.anthropic.com/claude-code" },
    { name: "Codex", icon: "", image: "/logos/codex.png", website: "https://openai.com/codex/" },
    { name: "Google Gemini", icon: "", image: "/logos/google-gemini.png", website: "https://gemini.google.com/" },
  ],
  backend: [
    { name: "Node.js", icon: "nodedotjs", website: "https://nodejs.org/" },
    { name: "Firebase", icon: "firebase", website: "https://firebase.google.com/" },
    { name: "Flask", icon: "flask", website: "https://flask.palletsprojects.com/" },
    { name: "Django", icon: "django", website: "https://www.djangoproject.com/" },
  ],
  database: [
    { name: "PostgreSQL", icon: "postgresql", website: "https://www.postgresql.org/" },
    { name: "Supabase", icon: "supabase", website: "https://supabase.com/" },
    { name: "MySQL", icon: "mysql", website: "https://www.mysql.com/" },
    { name: "SQLite", icon: "sqlite", website: "https://www.sqlite.org/" },
  ],
  awsServices: [
    { name: "DynamoDB", icon: "", image: "/logos/aws-dynamodb.png", website: "https://aws.amazon.com/dynamodb/" },
    { name: "Lambda", icon: "", image: "/logos/aws-lambda.png", website: "https://aws.amazon.com/lambda/" },
    { name: "Bedrock", icon: "", image: "/logos/aws-bedrock.png", website: "https://aws.amazon.com/bedrock/" },
  ],
} as const;
