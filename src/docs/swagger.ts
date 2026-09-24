import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import * as yaml from "js-yaml"

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "catalog API",
    version: "1.0.0",
    description: "catalog service entry",
  },
  servers: [{ url: "http://localhost:3100", description: "Local dev" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
    schemas: {
      Error: { type: "object", properties: { error: { type: "string" } } },
    },
  },
  security: [{ bearerAuth: [] }],
  paths: {} as Record<string, any>,
}

// --- FIX STARTS HERE ---
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Explicitly target the paths directory relative to this file
const pathsDir = path.resolve(__dirname, "paths")

try {
  if (fs.existsSync(pathsDir)) {
    const files = fs.readdirSync(pathsDir)

    for (const file of files) {
      // Only process .yaml or .yml files
      if (file.endsWith(".yaml") || file.endsWith(".yml")) {
        const filePath = path.join(pathsDir, file)
        const fileContent = fs.readFileSync(filePath, "utf8")

        const doc = yaml.load(fileContent) as {
          paths?: Record<string, any>
          components?: { schemas?: Record<string, any> }
        }

        if (doc && doc.paths) {
          Object.assign(swaggerDefinition.paths, doc.paths)
        }
        if (doc && doc.components?.schemas) {
          Object.assign(
            swaggerDefinition.components.schemas,
            doc.components.schemas,
          )
        }
      }
    }
  } else {
    console.error(`[Swagger Error] Paths directory not found at: ${pathsDir}`)
  }
} catch (error) {
  console.error("[Swagger Error] Failed to dynamically load YAML paths:", error)
}

console.log("Swagger paths directory:", pathsDir)
console.log("Swagger files:", fs.readdirSync(pathsDir))
console.log("Swagger registered paths:", Object.keys(swaggerDefinition.paths))

export const swaggerSpec = swaggerDefinition
