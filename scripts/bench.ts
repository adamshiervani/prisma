import execa from 'execa'
import globby from 'globby'

async function main() {
  const benchmarks = await globby('./packages/**/*.bench.ts', {
    gitignore: true,
  })
  await run(benchmarks)
}

async function run(benchmarks: string[]) {
  await Promise.all(
    benchmarks.map(async (location) => {
      return execa.command(`node -r esbuild-register ${location}`, {
        stdio: 'inherit',
      })
    }),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
