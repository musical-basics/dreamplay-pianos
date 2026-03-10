/**
 * Upload Learn Page Videos to Cloudflare R2
 * 
 * Usage:
 *   pnpm tsx scripts/upload-videos-to-r2.ts --dry-run   # Preview
 *   pnpm tsx scripts/upload-videos-to-r2.ts              # Upload
 */

import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const r2Client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
})

const BUCKET = process.env.R2_BUCKET_NAME!
const PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN!

// Videos used by the /learn page
const VIDEOS = [
    "DreamPlay Grid Hero.mp4",
    "Falling Notes Mode.mp4",
    "UI Play through 2.mp4",
    "Clip-4-transcode.mp4",
    "Clip-3.mp4",
]

const isDryRun = process.argv.includes("--dry-run")

async function existsInR2(key: string): Promise<boolean> {
    try {
        await r2Client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))
        return true
    } catch {
        return false
    }
}

async function main() {
    console.log(`\n📦 Uploading ${VIDEOS.length} videos to R2`)
    console.log(`   Bucket: ${BUCKET}`)
    console.log(`   Public: ${PUBLIC_DOMAIN}`)
    if (isDryRun) console.log(`\n🔍 DRY RUN — nothing will be uploaded\n`)

    const results: { file: string; url: string; status: string }[] = []

    for (const filename of VIDEOS) {
        const localPath = path.resolve(__dirname, "../public/videos", filename)
        const r2Key = `videos/${filename}`
        const publicUrl = `${PUBLIC_DOMAIN}/${r2Key}`

        if (!fs.existsSync(localPath)) {
            console.log(`  ❌ NOT FOUND: ${localPath}`)
            results.push({ file: filename, url: "", status: "not_found" })
            continue
        }

        const sizeBytes = fs.statSync(localPath).size
        const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(2)

        if (isDryRun) {
            console.log(`  📄 WOULD UPLOAD: ${r2Key} (${sizeMB} MB)`)
            console.log(`     → ${publicUrl}`)
            results.push({ file: filename, url: publicUrl, status: "dry_run" })
            continue
        }

        const alreadyExists = await existsInR2(r2Key)
        if (alreadyExists) {
            console.log(`  ✅ EXISTS: ${r2Key}`)
            results.push({ file: filename, url: publicUrl, status: "exists" })
            continue
        }

        try {
            const fileBuffer = fs.readFileSync(localPath)
            await r2Client.send(new PutObjectCommand({
                Bucket: BUCKET,
                Key: r2Key,
                Body: fileBuffer,
                ContentType: "video/mp4",
            }))
            console.log(`  ✅ UPLOADED: ${r2Key} (${sizeMB} MB)`)
            results.push({ file: filename, url: publicUrl, status: "uploaded" })
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)
            console.error(`  ❌ FAILED: ${msg}`)
            results.push({ file: filename, url: "", status: "failed" })
        }
    }

    console.log(`\n${"─".repeat(60)}`)
    console.log(`📊 Summary:`)
    for (const r of results) {
        console.log(`   ${r.status === "uploaded" || r.status === "exists" ? "✅" : r.status === "dry_run" ? "📄" : "❌"} ${r.file}`)
        if (r.url) console.log(`      ${r.url}`)
    }
    console.log(`${"─".repeat(60)}\n`)
}

main().catch(err => {
    console.error("Fatal error:", err)
    process.exit(1)
})
