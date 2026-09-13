import type { ToolGuide } from '@/types';

export const toolGuides: ToolGuide[] = [
  {
    slug: 'postman',
    introduction: [
      'Every developer ends up debugging an API eventually. You paste an endpoint into a browser and get a wall of JSON, or you keep a collection of shell aliases that half your team cannot decode. Postman is what most teams reach for instead: a client where requests are repeatable, shareable, and attached to the documentation and tests that go with them.',
      'This guide covers what Postman actually gives you day to day — collections, environments, and scripts that turn manual calls into checks you can run in CI. It also covers the caveats worth knowing up front: the generous but limited free tier, the account and cloud sync you cannot avoid, and the cases where a single curl command is still the better tool.',
    ],
    whatItDoes: [
      'A desktop and web client for composing HTTP requests and inspecting full responses, including status, headers, timing, and body.',
      'A workspace where requests live in collections, organized in folders, with variables, tests, and documentation attached to them.',
      'A runtime that replays those collections headlessly through Newman, so the same request and test logic works in CI pipelines and local scripts.',
    ],
    whyUseIt: [
      'It replaces a growing pile of ad-hoc curl commands with requests that are saved, reusable, and understandable by the rest of the team.',
      'It gives frontend, QA, and product people a safe way to explore an API without writing code.',
      'It lets you keep a small test suite next to your requests and run it in CI before you stand up a dedicated testing framework.',
      'It keeps API context in one place: endpoints, examples, environment configuration, and documentation stay glued to the requests themselves.',
    ],
    keyFeatures: [
      'A request builder covering method, URL, query params, headers, and body with raw, form, and binary options.',
      'Collections and workspaces that group requests into folders and let teams share, fork, and review them.',
      'Environments and variables using the {{name}} syntax, so base URLs, tokens, and credentials stay configurable instead of hardcoded.',
      'Pre-request and test scripts written in JavaScript with the pm API, including ready-made assertion helpers.',
      'Protocol breadth beyond REST: GraphQL with schema-aware autocomplete, plus WebSocket and gRPC request types.',
      'The surrounding ecosystem: Newman for the command line, mock servers, published API documentation, monitors, and code snippet generation.',
    ],
    howItWorks: [
      'A request is the core unit: a method, a URL, optional params, headers, and a body. Sending it performs a real HTTP call and renders the response with status and timing.',
      'Variables written as {{name}} resolve from the active environment, so the same request works against dev, staging, and production without editing it.',
      'Pre-request and test scripts run inside a JavaScript sandbox in the right phase — before the call and after the response — using the pm object.',
      'Collections bundle requests, scripts, and variables; the collection runner executes them in sequence, optionally with CSV or JSON data files, and Newman replays the same logic from the terminal.',
    ],
    useCases: [
      'Onboarding: hand a new teammate a saved collection instead of a written walkthrough of endpoints.',
      'CI smoke tests: run a collection through Newman with a junit reporter to catch regressions before deploying.',
      'Building against a third-party API while the payloads are still evolving.',
      'Generating client code snippets in your language of choice when the official SDK does not match your needs.',
      'Mocking an endpoint that is not implemented yet so frontend work can proceed in parallel.',
    ],
    gettingStarted: [
      'Install the desktop app or open the web version, then create a free account to get past the login.',
      'Compose a first request — for example a GET to https://postman-echo.com/get — and hit Send to see the round trip.',
      'Save it as a collection request, then add a second request that depends on data from the first.',
      'Create an environment with a base_url variable and rewrite your URLs to use {{base_url}}.',
      'Add a small test script, run the collection in the runner, and export it to run with Newman.',
    ],
    limitations: [
      'Freemium model: the free tier comfortably covers solo work, but team workspaces, business controls, and the fuller mocking and monitoring features sit behind paid plans.',
      'Sign-in and cloud sync are mandatory — requests saved to a workspace live in Postman\u2019s cloud, so review what goes into them in regulated or security-sensitive environments.',
      'The desktop client is a heavy application; for a throwaway check, curl in a terminal is faster on every axis.',
      'Test scripting assumes basic JavaScript; teams that need large, sophisticated test suites may still outgrow it in favor of a dedicated framework.',
    ],
    faqs: [
      {
        question: 'Do I have to create a Postman account to use it?',
        answer:
          'Yes. Both the desktop app and the web client require signing in, because saved requests, collections, and environments sync to your account instead of living only on your machine.',
      },
      {
        question: 'Can Postman generate code from a request?',
        answer:
          'Yes. The code button on any request can emit ready-to-run snippets in curl, Python, JavaScript, Go, and several other languages and frameworks.',
      },
      {
        question: 'What happens to my requests and data?',
        answer:
          'Saved requests and collections live in your workspace on Postman\u2019s servers. Test data and environment values with real secrets should be treated accordingly and rotated rather than committed.',
      },
    ],
    officialResources: [
      {
        title: 'Postman Learning Center',
        href: 'https://learning.postman.com/',
        description:
          'The official documentation and tutorials covering requests, collections, environments, and automation.',
      },
      {
        title: 'Postman Academy',
        href: 'https://academy.postman.com/',
        description: 'Free official courses on API development and Postman workflows.',
      },
      {
        title: 'Newman on GitHub',
        href: 'https://github.com/postmanlabs/newman',
        description: 'The command-line collection runner, including CI usage and reporters.',
      },
      {
        title: 'Postman blog',
        href: 'https://blog.postman.com/',
        description:
          'Product updates, API engineering topics, and community posts from the Postman team.',
      },
      {
        title: 'Postman API Network',
        href: 'https://www.postman.com/explore/',
        description:
          'Explore public collections and ready-to-run examples published by teams and providers.',
      },
    ],
    relatedArticles: [
      {
        title: 'Postman vs curl for API testing',
        href: '/compare/postman-vs-curl-generator',
        description:
          'When a full API platform earns its weight, and when a shell one-liner is still the right call.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'docker',
    introduction: [
      'Local apps always break in the same frustrating way: they run on your machine, then fail everywhere else. The Node version differs, the Postgres image is out of date, the operating system has a different package installed. Containerization solves that by packaging the app with everything it needs to run — and Docker is the ecosystem most developers reach for to do it.',
      'This guide focuses on the parts developers touch every day: images and Dockerfiles, running containers, and composing a local stack with services like Postgres and Redis. It also covers the honest tradeoffs, because containers are not free lunch — there is real complexity in the mental model, plus licensing and build-hygiene decisions that come with it.',
    ],
    whatItDoes: [
      'A packaging format (images) that bundles your application, its runtime, and its dependencies into a self-contained unit.',
      'A runtime (the Docker Engine) that turns those images into isolated, lightweight processes called containers.',
      'A CLI and tooling ecosystem — docker build, docker run, docker compose — plus Docker Hub for sharing images.',
      'A way to run databases, caches, and message queues locally with one command instead of installing them natively.',
      'The foundation many CI systems and deployment platforms build on.',
    ],
    whyUseIt: [
      'Reproducible environments: "works on my machine" becomes "works in the container."',
      'Dependencies you do not want on your host — a specific Postgres version, a Python binary, a CUDA toolchain — live inside the container instead.',
      'Team onboarding speeds up: a docker compose up gives everyone the same stack in minutes.',
      'The same artifact you test locally is the artifact you ship, because CI runs the same image.',
      'Container images are the standard interchange format across clouds, registries, and orchestrators.',
    ],
    howItWorks: [
      'A Dockerfile describes how to assemble an image — base image, files copied in, commands run — and each instruction adds a layer that can be cached across builds.',
      'docker build compiles the Dockerfile into an image via BuildKit; docker run instantiates it as a container.',
      'Containers share the host kernel and are isolated with namespaces and cgroups, so they start fast and use fewer resources than a full virtual machine.',
      'Volumes and bind mounts persist data and share files between host and containers; Compose declares networks, volumes, and services in one YAML file.',
    ],
    keyFeatures: [
      'A declarative image format you version in git and rebuild from anywhere.',
      'Compose: multiple services, shared networks, and volumes defined in one docker-compose.yml — the everyday local-dev workflow.',
      'Layered caching and multi-stage builds keep rebuilds fast and images small.',
      'Volumes and bind mounts for persistent data, plus an isolated filesystem per container.',
      'Docker Hub (and other registries) for pulling official images and sharing your own.',
      'Wide ecosystem adoption — base images exist for nearly every language and service.',
    ],
    useCases: [
      'Reading or testing against a database without installing it: a Compose file with Postgres and Redis booted in seconds.',
      'Reproducible builds and CI: build once, run the same image in tests and production.',
      'Microservice-style local development where each service has its own environment.',
      'Running one-off tools — a linter, a CLI, a data pipeline — without touching your operating system.',
      'Sandboxing experiments and demos in an isolated environment you can destroy afterwards.',
    ],
    gettingStarted: [
      'Install Docker Desktop (Windows/macOS) or the Docker Engine (Linux), then confirm with docker --version.',
      'Run a first container: docker run --rm -it python:3.12-slim python --version pulls the official Python image and prints its version without installing anything on your machine.',
      'Write a minimal Dockerfile (FROM node:20-alpine, WORKDIR /app, COPY package*.json ., RUN npm ci, COPY ., CMD ["npm", "start"]), then docker build -t my-app . and docker run -p 3000:3000 my-app.',
      'Model a stack in docker-compose.yml (web service plus Postgres) and start it with docker compose up -d.',
      'Check what is running with docker ps and a service\u2019s logs with docker compose logs -f.',
    ],
    limitations: [
      'Docker Desktop licensing: free for individuals and small businesses, paid for larger companies — check the subscription terms that apply to your team.',
      'Containers share the host kernel, so a Linux container needs a Linux host (or a lightweight VM on Windows/macOS), which still costs some resources.',
      'Container isolation is not a hard security boundary like a virtual machine; untrusted or hostile workloads need extra hardening.',
      'Images rot: base images age, dependencies go stale, and unoptimized Dockerfiles grow into hundreds of megabytes — build hygiene is an ongoing job.',
      'Docker itself does not orchestrate across machines; coordinating containers over many hosts is a separate problem (Kubernetes and friends).',
    ],
    faqs: [
      {
        question: 'Do I need Docker Desktop to run containers?',
        answer:
          'No. Desktop bundles the engine, Compose, and a GUI. On Linux you can install and run the Docker Engine directly, and alternative runtimes like Podman and containerd also run OCI containers if you prefer different tooling.',
      },
      {
        question: 'How do I keep container images small?',
        answer:
          'Use a minimal base image such as alpine or a slim variant, prefer multi-stage builds so build-time tools never reach the final image, and add a .dockerignore so secrets and installed dependencies do not get copied into the build context.',
      },
      {
        question: 'Are containers only for Linux backends?',
        answer:
          'No. Windows-native containers exist, and on Windows or macOS, Linux containers run inside the lightweight VM that Docker Desktop manages. The Linux ecosystem is simply the most common target in practice.',
      },
    ],
    officialResources: [
      {
        title: 'Docker Docs — Get started',
        href: 'https://docs.docker.com/get-started/',
        description: 'Official intro: run your first container and image interactively.',
      },
      {
        title: 'Docker Compose docs',
        href: 'https://docs.docker.com/compose/',
        description: 'Define and run multi-container applications with YAML.',
      },
      {
        title: 'Dockerfile reference',
        href: 'https://docs.docker.com/reference/dockerfile/',
        description: 'Every instruction you can use when authoring an image.',
      },
      {
        title: 'Docker build docs',
        href: 'https://docs.docker.com/build/',
        description: 'BuildKit, build cache, and advanced image-building features.',
      },
      {
        title: 'Docker Hub',
        href: 'https://hub.docker.com/',
        description: 'Official images and a place to publish and pull your own.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'github-actions',
    introduction: [
      'CI used to mean a separate service, a config file buried in another dashboard, and a pipeline only the person who set it up understood. GitHub Actions moves the question next to your code: a workflow lives in the repository, triggers off real GitHub events, and reuses the repo\u2019s own permissions to do its job. For many teams it is the first CI they actually maintain.',
      'This guide covers the mental model — workflows, jobs, steps, events, and secrets — and the practical patterns that keep pipelines reliable. It also covers where Actions starts to strain, because minute-based quotas and YAML sprawl are real, and knowing that up front saves a painful migration later.',
    ],
    whatItDoes: [
      'A CI/CD platform built into GitHub: YAML workflow files in .github/workflows run on GitHub\u2019s hosted runners or your own machines.',
      'Event-driven: workflows trigger on pushes, pull requests, schedules, or external calls, and can be filtered by branch or path.',
      'Prebuilt automation units (actions) shared via the Marketplace or your own repos, composed with plain shell commands.',
      'Secrets, caches, artifacts, and deployment environments managed by the platform so pipelines stay self-contained.',
    ],
    whyUseIt: [
      'Pipelines live in your repo like code — reviewed, versioned, and discoverable in the same pull request.',
      'No separate CI service to configure; public repos get free minutes and private repos get a monthly allowance.',
      'Native GitHub context: check runs, status badges, deploy environments, and secrets are already wired in.',
      'A large ecosystem of official and community actions, so most steps become "read the action, add the inputs" rather than write scripts.',
    ],
    howItWorks: [
      'A workflow is a YAML file declaring the events (on) that start it, the jobs that run, and each job\u2019s steps.',
      'Every job runs on a fresh runner — a hosted Ubuntu/macOS/Windows virtual machine or a self-hosted machine — and steps run in sequence inside it; jobs can depend on each other with needs.',
      'Steps either use a published action such as actions/checkout or actions/setup-node, or run a shell command; inputs are passed in with the syntax "uses: ... with: ...".',
      'A scoped GITHUB_TOKEN authenticates the workflow to the repository — visibility narrowed with a permissions block — while real credentials live in secrets and are masked in logs.',
    ],
    keyFeatures: [
      'Event-driven triggers with filters: branches, tags, paths, cron schedules, and manual runs via workflow_dispatch.',
      'Matrix builds that run one job across several operating systems and tool versions from a single config.',
      'Reusable workflows and composite actions so pipeline logic is not copy-pasted across repos.',
      'Artifacts and dependency caching to pass build outputs between jobs and keep installs fast.',
      'Deployment environments with protection rules such as required approvals, so production deploys cannot happen by accident.',
      'Orchestration primitives: needs, concurrency groups, if-conditions, and job outputs.',
    ],
    useCases: [
      'A standard CI gate: on every pull request, lint, typecheck, test, and build — and only green PRs merge.',
      'Release automation: build and push a container image, tag it, and create a GitHub release from one workflow.',
      'Deployment with guardrails: deploy to staging automatically and require an approval before production.',
      'Housekeeping on a schedule: close stale issues, check dependency health, or rotate secrets via cron triggers.',
      'Cross-platform testing: run the same test matrix on Windows, macOS, and Linux from one file.',
    ],
    gettingStarted: [
      'Create .github/workflows/ci.yml with "on: [push, pull_request]" and one job that checks out the repository.',
      'Use actions/checkout@v4, then actions/setup-node@v4, and run npm ci, lint, and tests — the shape of the example on this page is the standard pattern.',
      'Watch the run in the Actions tab, then intentionally break one step to learn how logs and failure states look.',
      'Add a deploy job with environment: production, store its credentials as secrets, and require approval in the environment settings.',
      'Never print secrets: reference them only as secrets.NAME so the runtime masks them.',
    ],
    limitations: [
      'Private repositories bill against a monthly minute and storage allowance; large matrices and heavy test suites should watch the caps.',
      'Hosted runners are shared, fixed-spec virtual machines; very large or specialized compute means self-hosted runners instead.',
      'Third-party actions are code running in your pipeline: pin versions, review what they do, and scope permissions to the minimum.',
      'YAML grows complex quickly, and conditionals plus expressions can turn a small file into a puzzle.',
      'Workflow files are code, but debugging is largely log-based — there is no guaranteed local dry-run parity with production runs.',
    ],
    faqs: [
      {
        question: 'My workflow does not run after a push. What went wrong?',
        answer:
          'Common causes: the file is not at .github/workflows/*.yml, the event filters exclude that branch or path, Actions is disabled for the repository, or branch protection blocks it. The Actions tab shows skipped runs and usually their reason.',
      },
      {
        question: 'What is the difference between a job and a step?',
        answer:
          'A job is a unit that runs on its own fresh runner; steps are the commands inside it. Jobs can run in parallel or wait on each other with needs, while steps always run in order within their job.',
      },
      {
        question: 'Do I ever need a self-hosted runner?',
        answer:
          'When hosted runner specifications, network access, or licensing do not fit — for example private-network services, specialized GPUs, or long resource-heavy jobs. That comes with machines you have to maintain yourself.',
      },
    ],
    officialResources: [
      {
        title: 'GitHub Actions docs',
        href: 'https://docs.github.com/en/actions',
        description: 'The official manual: quickstart, core concepts, and full references.',
      },
      {
        title: 'Workflow syntax reference',
        href: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions',
        description: 'Every workflow key: events, jobs, steps, and expressions.',
      },
      {
        title: 'Actions Marketplace',
        href: 'https://github.com/marketplace?type=actions',
        description: 'Prebuilt actions from GitHub, verified partners, and the community.',
      },
      {
        title: 'Security for GitHub Actions',
        href: 'https://docs.github.com/en/actions/security-for-github-actions',
        description: 'Hardening workflows, using GITHUB_TOKEN safely, and supply-chain practices.',
      },
      {
        title: 'github/actions on GitHub',
        href: 'https://github.com/actions',
        description:
          'The official organization: checkout, setup-node, caching, and runner projects.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'vercel',
    introduction: [
      'Shipping a frontend is deceptively boring: build, upload, point DNS at it, and then do it again on every commit. What used to require careful infrastructure work, Vercel collapses into pushing to a branch. That is its whole pitch — production deploys, pull request previews, and rollbacks that take a click — and for teams on Next.js or React it mostly delivers.',
      'Underneath the simplicity sits a real platform: build pipelines, serverless and edge functions, environment variables scoped by environment, and deployment protection. This guide explains how deployments actually work on Vercel and where the pragmatism ends — the Hobby limits, the lock-in, and the runtime constraints that matter once traffic grows.',
    ],
    whatItDoes: [
      'A hosting platform for frontend apps and static sites with git integration: push, and Vercel builds and deploys.',
      'Serverless functions and edge functions for API routes and dynamic logic without managing servers.',
      'Preview deployments for every pull request with a unique URL, plus immutable production deployments.',
      'Globally distributed static assets served from the CDN, with custom domains and automatic TLS.',
      'Managed environment variables, team collaboration, and deployment management such as rollbacks and redeploys.',
    ],
    whyUseIt: [
      'Deploying is "push to main" — no build server setup, no Dockerfile, no infrastructure babysitting.',
      'Previews give product and QA a URL for every branch, so feedback happens on real pages instead of screenshots.',
      'Framework-aware builds give sensible defaults for Next.js and other frameworks out of the box.',
      'Environments separate production, preview, and local cleanly: environment variables are scoped instead of committed to git.',
      'Rollback is immediate because deployments are immutable — the previous production deploy is always one click away.',
    ],
    howItWorks: [
      'A connected git repository is the source of truth: on each push (or pull request on supported providers), Vercel detects the framework, runs the build, and creates an immutable deployment.',
      'Every deployment gets a unique URL; the one built from the production branch is aliased to your production domain, while other branches and PRs get preview URLs.',
      'Routing splits static assets from function calls — static files are served from the CDN and functions run on demand — so a Next.js page and its API routes deploy together.',
      'Environment variables are injected at build and runtime per environment (Development, Preview, Production), are encrypted at rest, and only apply to new deployments.',
      'Rolling back is promoting a previous immutable deployment; "redeploy" rebuilds the same source rather than mutating the live site.',
    ],
    keyFeatures: [
      'Instant, immutable deployments with git push as the deploy button.',
      'Preview URLs per pull request with click-to-review comments in GitHub.',
      'Serverless and edge function support that scales per request.',
      'Environment variables scoped to Local/Preview/Production — up to 64 KB total per deployment, with a smaller per-variable limit on edge functions.',
      'Custom domains with automatic TLS, DNS management, and Vercel Firewall.',
      'A full CLI and REST API for deploy-from-terminal or CI usage.',
    ],
    useCases: [
      'Deploying a Next.js site — including its API routes — straight from GitHub with zero config.',
      'A review workflow where every pull request gets a URL stakeholders can click.',
      'Hosting marketing sites and documentation on the same tooling you build with.',
      'Serverless endpoints, webhooks, or edge logic without provisioning servers.',
      'Personal projects and prototypes that need production-grade HTTPS and CDN for free.',
    ],
    gettingStarted: [
      'Install the CLI with npm i -g vercel, or skip it and import your Git repository in the dashboard — both feed the same pipelines.',
      'From a project root, run vercel to log in, link the directory, and create the first deployment; vercel --prod deploys to production.',
      'Enable git integration and push to the production branch to make every pull request a preview with its own URL.',
      'Add environment variables in Project Settings or with vercel env add, then pull them locally with vercel env pull.',
      'Attach a custom domain under the Domains tab — TLS certificates are issued and renewed automatically.',
    ],
    limitations: [
      'Hobby is genuinely free but capped: functions, bandwidth, and builds have monthly limits that heavy or high-traffic apps will outgrow.',
      'Usage-based costs can grow with traffic — keep an eye on the usage dashboard, because image-heavy or chatty pages can cost more than expected.',
      'Platform lock-in: project config and function runtimes are Vercel-shaped, so moving elsewhere means porting builds and configuration.',
      'Functions are short-lived with execution limits; long-running or always-on compute belongs on something else.',
      'Edge functions run a leaner Node-compatible runtime; not every dependency works there, and per-variable environment sizes are tighter.',
    ],
    faqs: [
      {
        question: 'What exactly happens when I push?',
        answer:
          'The git integration builds the latest commit, creates a new immutable deployment with its own URL, and — when it was a production-branch push — aliases it to production. Nothing in production mutates in place.',
      },
      {
        question: 'Do I need a custom domain?',
        answer:
          'No. Every project gets a free *.vercel.app URL out of the box. Custom domains simply add your own hostname, and TLS is handled automatically.',
      },
      {
        question: 'How do environment variables work per environment?',
        answer:
          'You configure values separately for Development, Preview, and Production. They are injected at build and runtime, encrypted at rest, and apply only to new deployments.',
      },
    ],
    officialResources: [
      {
        title: 'Vercel docs',
        href: 'https://vercel.com/docs',
        description: 'The reference for deployments, functions, environments, and limits.',
      },
      {
        title: 'Deployments docs',
        href: 'https://vercel.com/docs/deployments',
        description: 'How preview and production deployments, rollbacks, and environments work.',
      },
      {
        title: 'Vercel CLI docs',
        href: 'https://vercel.com/docs/cli',
        description: 'vercel, vercel deploy, env, domains, and using the CLI in CI.',
      },
      {
        title: 'Environment variables docs',
        href: 'https://vercel.com/docs/environment-variables',
        description: 'Scoping, encryption, limits, and per-environment behavior.',
      },
      {
        title: 'Getting started with Vercel',
        href: 'https://vercel.com/docs/getting-started-with-vercel',
        description: 'Install the CLI, deploy a first project, and learn the core workflow.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'prisma',
    introduction: [
      'Straightforward database access in TypeScript should be boring, but it rarely is: you hand-write SQL strings that break silently, cast results to types you hope are right, and keep a separate migration ritual nobody fully trusts. Prisma makes the schema itself the contract — one file describes your data, and from it you get a type-safe client and migrations that are reviewed like code.',
      'This guide covers what developers lean on daily: the schema, the generated client, and the migrate workflow. Prisma is also mid-transition, with a next-generation authoring model landing and the CLI moving under it — so the guide stays at the concepts that hold, and flags what changes under your feet.',
    ],
    whatItDoes: [
      'A schema file where you describe models, relations, and the database connection in a readable data-modeling language.',
      'Prisma Client: an auto-generated, type-safe query builder whose methods mirror your schema, so typos and wrong field names are compile errors.',
      'Prisma Migrate: versioned migrations that turn schema changes into SQL files you review and apply.',
      'Introspection that pulls an existing database\u2019s schema into your Prisma schema so you can take it over from the code side.',
      'Prisma Studio: a local GUI for browsing and editing data while developing.',
    ],
    whyUseIt: [
      'Type safety with real teeth — the client\u2019s types are generated from your schema, so querying a field you removed breaks the build, not production.',
      'Migrations become reviewable artifacts your team can approve like code.',
      'Relations are first-class: fetching a user with their posts is a single typed call.',
      'Schemas are small and readable, so a new developer understands your data model faster than reading DDL.',
      'It works where Node.js apps usually live — API servers, serverless functions, CLIs — against the databases teams already run.',
    ],
    howItWorks: [
      'Your schema defines the data source, the generator, and the models — the single source of truth for both the database and the types.',
      'A CLI generates Prisma Client from the schema; the client renders fluent calls type-safely, translating them into SQL (or MongoDB operations) at runtime.',
      'Prisma Migrate diffs your schema against migration history, writes a new migration, and applies it to your development database with the migrate dev command.',
      'Prisma Studio reads the same connection and renders records for inspection and quick edits while you work.',
    ],
    keyFeatures: [
      'A generated, typed client covering creates, finds, updates, and deletes with complete field and relation options.',
      'Relation queries with automatic joins — include and select shape the result, fully typed.',
      'Declarative migrations with a generate-and-review workflow, plus db push for throwaway prototyping.',
      'Introspection for adopting Prisma on an existing database.',
      'Raw query escapes and interactive transactions for the cases the ORM should not own.',
      'Broad database support — PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB — with relational databases the most mature path.',
    ],
    useCases: [
      'Typed CRUD in a Node/TypeScript backend — Express, Fastify, Nest, or Next.js API routes — without hand-written SQL.',
      'Rapid prototyping where the schema changes every sprint and migrate dev rewrites the local database.',
      'Adding a typed data layer to a legacy database via introspection.',
      'Serverless functions that need a small, connection-friendly way to query a database.',
      'Teams that want schema discussions to happen in pull requests rather than in a database GUI.',
    ],
    gettingStarted: [
      'Install the CLI and client: npm install prisma --save-dev and npm install @prisma/client.',
      'Run npx prisma init to scaffold a schema and connection configuration, then point the provider at postgresql, mysql, sqlite, or your database of choice.',
      'Model a first entity in the schema — for example a User and a Post with a relation.',
      'Run npx prisma migrate dev --name init to apply it to your development database and generate the client.',
      'Query in code with something like prisma.user.findMany({ include: { posts: true } }), and browse the data with npx prisma studio.',
    ],
    limitations: [
      'It is not a SQL replacement: bespoke, highly tuned queries eventually outgrow the fluent API, and the raw escape hatch puts you back on your own.',
      'Migration complexity grows with the schema, and merging schema changes from parallel branches is a real workflow problem.',
      'Support is richer for relational databases than MongoDB, where relations and transactions are more limited.',
      'A version transition is underway — contract-based authoring renames CLI commands and moves the connection URL out of schema.prisma into prisma.config.ts, so pin the version you standardize on.',
      'The core ORM is Apache-2.0 open source, while the commercial cloud services around it are paid add-ons.',
      'The per-query engine adds a layer of overhead; very high-throughput access patterns may prefer closer-to-the-metal drivers.',
    ],
    faqs: [
      {
        question: 'Do I need a database running locally to get started?',
        answer:
          'For the quickstart, SQLite needs nothing extra. Postgres and MySQL require a running instance — a local install, a Docker container, or a cloud database — plus a DATABASE_URL that can reach it.',
      },
      {
        question: 'How does Prisma handle complex queries?',
        answer:
          'The fluent client covers most CRUD and relations. When you need window functions, exotic joins, or database-specific features, raw queries such as $queryRaw and $executeRaw, plus interactive transactions, are the escape route.',
      },
      {
        question: 'Is Prisma a good fit for MongoDB?',
        answer:
          'It works, but relational databases are where relations, joins, and migrations shine. MongoDB follows a different modeling model — collections and embedded documents — so plan accordingly.',
      },
    ],
    officialResources: [
      {
        title: 'Prisma docs',
        href: 'https://www.prisma.io/docs',
        description: 'The full manual: quickstart, schema, client, and migrations.',
      },
      {
        title: 'What is Prisma ORM',
        href: 'https://www.prisma.io/docs/orm/overview/introduction',
        description: 'A plain-language overview of the schema, client, and migrate flow.',
      },
      {
        title: 'Prisma Client API reference',
        href: 'https://www.prisma.io/docs/orm/reference/prisma-client-reference',
        description: 'Every query, option, and type available in the generated client.',
      },
      {
        title: 'Migrations docs',
        href: 'https://www.prisma.io/docs/orm/migrations/how-migrations-work',
        description: 'How schema changes become reviewable, versioned migrations.',
      },
      {
        title: 'Prisma blog',
        href: 'https://www.prisma.io/blog',
        description: 'Product updates, ORM deep-dives, and database engineering posts.',
      },
      {
        title: 'Prisma on GitHub',
        href: 'https://github.com/prisma/prisma',
        description: 'The open-source monorepo for the CLI, client, and engines.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'turborepo',
    introduction: [
      'Turborepo is a build system rather than a package manager, and that distinction decides whether it helps or confuses you. It takes the scripts field each workspace already has, layers a turbo.json file on top, and automates the tedious parts of a monorepo: running many tasks in the correct order, in parallel, and skipping any task whose inputs have not changed since the last run.',
      'Read this before wiring turbo into an existing repository. You will learn where the cache lives, how task dependencies and declared environment variables affect hash correctness, and which speed claims are worth verifying against your own build rather than accepting at face value. The project is evolving quickly — the docs now reach for single-package workspaces and agent-driven builds as much as classic monorepos — so treat the config shapes here as a starting point and confirm current syntax in the documentation.',
    ],
    whatItDoes: [
      'A task runner that executes the package.json scripts of each workspace in dependency order, inferred from your package dependencies and the task rules you declare.',
      'A local cache: each task hashes its inputs, and when the hash matches a previous run the outputs and logs are replayed from disk instead of re-executed.',
      'An optional remote cache so CI and teammates reuse each other results instead of recomputing them.',
      'Support for single-package workspaces and any package manager, because turbo reads the scripts and workspaces you already configured.',
    ],
    whyUseIt: [
      'The daily payoff is fewer wasted rebuilds: untouched tasks return from cache in milliseconds instead of running again.',
      'Time-to-result ordering you declare once, so lint, typecheck, build, and test run in the right sequence everywhere without hand-wiring each CI job.',
      'Incremental adoption: adding turbo does not force a monorepo, a package-manager change, or a rewrite of existing scripts.',
      'Environment parity: the same turbo run targets behave alike locally and in CI, and the remote cache lets both share the results.',
    ],
    howItWorks: [
      'turbo.json declares task prototypes such as build, lint, and test with options like dependsOn, outputs, and env; any package.json script matching a prototype inherits those settings.',
      'Each task computes a hash from its source files, the environment variables you declared, and the outputs of the tasks it depends on.',
      'Tasks run in the order implied by dependsOn and the dependency graph, fanning out in parallel where nothing forces a sequence.',
      'With Remote Caching enabled after login and link, the same hashes resolve against a shared store, so another machine replays the result instead of rebuilding.',
    ],
    keyFeatures: [
      'A task pipeline defined in one turbo.json: inputs, outputs, dependsOn, and env encode how repository tasks relate.',
      'A local filesystem cache under .turbo by default, plus Remote Caching for sharing results across machines and CI.',
      'Parallel execution across workspaces with a terminal UI that keeps each task logs grouped and readable.',
      'Package-manager agnostic: turbo runs the scripts that npm, pnpm, Yarn, or Bun workspaces already define.',
      'Heat up gradually: start with the default turbo.json and refine task rules as the repository grows.',
    ],
    useCases: [
      'Monorepos where lint, typecheck, and unit tests must pass across several packages without stalling CI on redundant rebuilds.',
      'A frontend and backend sharing a types or UI package, where a library change should rebuild only its dependents.',
      'Multiple apps sharing a token or config package, running check before build across every affected workspace.',
      'Repositories deployed on Vercel, where the managed Remote Cache is wired up with minimal ceremony.',
    ],
    gettingStarted: [
      'Install the Turbo CLI globally (npm install turbo --global) or run it with npx, and add turbo as a devDependency at the root.',
      'Create a minimal turbo.json declaring prototypes such as build, lint, and test with their dependsOn and outputs.',
      'Run turbo run build from the root; the first pass executes the work and populates the cache.',
      'Run it again unchanged and compare timings to confirm the cache is replaying instead of re-executing.',
      'For shared caching, run turbo login and turbo link to connect a provider such as Vercel Remote Cache or a self-hosted cache server.',
    ],
    limitations: [
      'Turborepo does not install packages, manage versions, or publish — your package manager still owns node_modules and workspace plumbing.',
      'Cache correctness is your responsibility: anything a task reads from the environment must be declared in env or globalEnv, or the cache can serve stale results.',
      'Remote Caching needs network access and authentication, and the free limits and terms of managed providers do change — verify current pages before budgeting.',
      'The product and its docs are moving (agent positioning, evolving config and CLI), so re-run CI after upgrades and test the behavior you depend on.',
      'Speed gains concentrate on unchanged tasks and wider task graphs; measure on your own repository rather than trusting marketing estimates.',
    ],
    faqs: [
      {
        question: 'Does Turborepo replace my package manager?',
        answer:
          'No. Turbo runs the scripts that your existing workspace already defines; npm, pnpm, or Yarn still install dependencies and manage the workspace.',
      },
      {
        question: 'Do I get caching benefits without a remote cache?',
        answer:
          'Yes. The local cache already skips re-running unchanged tasks. A remote cache adds sharing those results across machines and CI, which matters once several environments run the same tasks.',
      },
      {
        question: 'How does Turborepo decide a task is cached?',
        answer:
          'It hashes the task inputs: relevant source files, declared environment variables, and the outputs of tasks it depends on. A matching hash replays the cached result; a mismatch reruns the task. Undeclared environment variables are a common source of false cache hits.',
      },
    ],
    officialResources: [
      {
        title: 'Turborepo docs',
        href: 'https://turborepo.com/docs',
        description: 'The reference for turbo.json, task pipelines, and caching.',
      },
      {
        title: 'Getting started',
        href: 'https://turborepo.com/docs/getting-started',
        description:
          'Install the CLI, create a repo from a template, or add turbo to an existing project.',
      },
      {
        title: 'Remote caching',
        href: 'https://turborepo.com/docs/core-concepts/remote-caching',
        description: 'How shared caches work across machines, CI, and teams.',
      },
      {
        title: 'Crafting your repository',
        href: 'https://turborepo.com/docs/crafting-your-repository',
        description: 'Step-by-step guides for structuring and optimizing a monorepo with turbo.',
      },
      {
        title: 'Turborepo on GitHub',
        href: 'https://github.com/vercel/turborepo',
        description: 'The open-source repository for the CLI and documentation.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'supabase',
    introduction: [
      'Most backend-in-a-box services hide their database behind an API you cannot touch. Supabase makes the opposite bet: every project gets a real Postgres database — tables, SQL, indexes, extensions — with auth, storage, realtime, and edge functions wrapped around it instead of replacing it. The platform is built from open-source components and a managed dashboard, which is why it gets described as an open-source Firebase alternative.',
      'Below are the parts a typical project actually touches: the database and its generated REST API, Auth with Row Level Security behind it, and Storage. The constraints matter as much as the convenience — data security is delegated to you via RLS policies, pricing is usage-based and has changed over time, and self-hosting exists but differs in scope from the hosted product.',
    ],
    whatItDoes: [
      'A hosted full Postgres database per project with a dashboard (Table Editor, SQL Editor), standard connection strings, and an auto-generated REST and GraphQL API.',
      'Auth with email and password, magic links, one-time passwords, social logins, and SSO, issuing JWTs that clients send with requests.',
      'Storage for files with access policies, S3 compatibility, and a global CDN, plus Realtime that streams database changes to subscribers.',
      'Edge Functions as a Deno-based serverless runtime, with Postgres extensions for vectors, geospatial data, queues, and scheduled jobs.',
    ],
    whyUseIt: [
      'Real Postgres means existing skills and tools carry over: psql, pg_dump imports, and ORMs like Prisma and Drizzle connect directly.',
      'The security model composes out of pieces you already know: the client sends a JWT, and Row Level Security policies on each table decide which rows come back.',
      'One platform covers the backend essentials — database, auth, storage, realtime, functions — which removes integration glue early in a project.',
      'An open core with a self-hosting path when you must control infrastructure or satisfy strict data-residency requirements.',
    ],
    howItWorks: [
      'A project provisions a Postgres database cluster with a connection pooler (Supavisor) routing direct, transaction, or session connections.',
      'APIs are generated from your schema; client calls use the project keys plus a JWT, and RLS policies on tables evaluate each query.',
      'Auth stores users in a reserved schema, issues JWTs, and integrates with your tables through triggers or foreign keys.',
      'The Supabase CLI runs a local stack for development with migration support, while the hosted platform adds managed backups and point-in-time recovery.',
    ],
    keyFeatures: [
      'Postgres as the platform: extensions such as pgvector and PostGIS toggled from the dashboard.',
      'Row Level Security enforced in the database rather than the application layer.',
      'Auto-generated REST and GraphQL APIs plus typed client libraries for JavaScript, Flutter, Python, and more.',
      'Realtime that streams database changes to subscribed clients, plus broadcast and presence.',
      'Storage buckets with S3 compatibility, image transformation, and resumable uploads.',
    ],
    useCases: [
      'A new product that wants hosted Postgres, authentication, and file uploads without assembling three separate services.',
      'Prototypes and MVPs that need a fast path to a real relational schema that a senior team can take over later.',
      'Apps reading rows directly from the client with RLS-guarded access, such as boards and dashboards that query live data.',
      'Teams that value an exportable Postgres foundation if the platform relationship ever changes.',
    ],
    gettingStarted: [
      'Create a free project at supabase.com/dashboard, or use the CLI locally with supabase init to develop against a local stack.',
      'Create a table in the Table Editor or SQL Editor, enable RLS, and write a first policy.',
      'Copy the project URL and anon key from the dashboard settings.',
      'Install @supabase/supabase-js in your app, create a client, and fetch a row the same way you would call any API.',
      'Add email and password auth, sign a user in, and confirm the session token is sent with subsequent requests.',
    ],
    limitations: [
      'Security is application-wide RLS: the database is not safe to expose to browsers until you write correct policies, and mistakes either leak rows or lock clients out.',
      'The free tier and add-ons are usage-based and subject to change (Auth is measured in monthly active users, plus compute and storage) — confirm current numbers on the pricing page.',
      'Self-hosting diverges from the hosted product: no branching, managed backups or point-in-time recovery, some analytics, or the platform management API, and it is community-supported.',
      'Edge Functions run on Deno, so Node-specific APIs and npm packages need adaptation for that runtime.',
      'You are renting managed infrastructure; moving a growing workload to self-hosted Supabase or another Postgres provider later is possible but not painless.',
    ],
    faqs: [
      {
        question: 'Do I need Row Level Security to use the database?',
        answer:
          'Yes for anything read from the browser. Supabase exposes the anon key to clients, so RLS policies are the boundary deciding which rows a request can see; without policies, client-side queries are denied rather than returned.',
      },
      {
        question: 'Can I keep using my existing Postgres tools and ORMs?',
        answer:
          'Yes. It is a full Postgres database, so psql, pgAdmin, Prisma, Drizzle, and other standard clients connect directly, and pg_dump works for imports and backups.',
      },
      {
        question: 'Is it possible to move off Supabase later?',
        answer:
          'Your data lives in Postgres, so exports via connection strings, pg_dump, or the CLI migration commands are feasible, and self-hosting is an option. Portability is easier while the schema is still small, so plan for it early.',
      },
    ],
    officialResources: [
      {
        title: 'Supabase docs',
        href: 'https://supabase.com/docs',
        description: 'The main manual for database, auth, storage, realtime, and the platform.',
      },
      {
        title: 'Database guide',
        href: 'https://supabase.com/docs/guides/database',
        description: 'Tables, SQL, Row Level Security, extensions, and connecting to Postgres.',
      },
      {
        title: 'Auth guide',
        href: 'https://supabase.com/docs/guides/auth',
        description: 'Providers, JWTs, sessions, and integrating auth with RLS.',
      },
      {
        title: 'Storage guide',
        href: 'https://supabase.com/docs/guides/storage',
        description: 'Buckets, access policies, and serving files.',
      },
      {
        title: 'Self-hosting',
        href: 'https://supabase.com/docs/guides/self-hosting',
        description: 'Running Supabase on your own infrastructure with Docker.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'vitest',
    introduction: [
      'Why choose a newer test runner when Jest already has the mindshare? The deciding factor is the pipe between your source files and the runner. Vitest is built on Vite, so TypeScript, JSX, CSS, and import aliases transform through the same pipeline as your app — and in watch mode an edit re-runs only the affected tests without a full reload.',
      'What follows covers what matters in day-to-day use: the Jest-like API that makes migration mostly mechanical, mocking and fake timers, coverage, and the browser mode that blurs the line toward component testing. It also covers honest tradeoffs — a fast major-version cadence, Node and Vite floors, and a surface that is not line-for-line identical to Jest. Version numbers in this text reflect the current v5 release and will move.',
    ],
    whatItDoes: [
      'A test runner for JavaScript and TypeScript that reuses your Vite configuration, so plugins, aliases, and transforms behave identically in tests and in the app.',
      'Jest-compatible structure via describe, it and test, expect, and the vi module for spies, mocks, and fake timers.',
      'Watch mode with fast refresh of results, plus a run-once mode for CI.',
      'Optional coverage through V8 or Istanbul providers, browser mode for real-browser tests, and projects for splitting suites by environment.',
    ],
    whyUseIt: [
      'Iteration speed: watch mode re-runs the tests affected by a change through the same transform chain the app uses.',
      'Low ceremony: TypeScript and ESM work out of the box without a babel or ts-jest layer.',
      'Familiar ergonomics: teams coming from Jest see the API they already write, with documented differences during migration.',
      'Ecosystem fit: if your app already uses Vite for development or building, one config and one dependency cover both worlds.',
    ],
    howItWorks: [
      'Vitest reads vite.config or vitest.config, then serves test files through the Vite transform pipeline into isolated workers.',
      'Files matching the *.test.* or *.spec.* pattern are collected by default; each file runs in its own module registry for isolation.',
      'vi.mock factories are hoisted above the test file, and spies, mocks, and fake timers hook into the worker module system.',
      'In watch mode, a change to a source file re-runs the tests that imported it, and coverage can be produced by the V8 or Istanbul provider.',
    ],
    keyFeatures: [
      'Snapshots, parameterized tests with test.each and test.for, plus per-test timeout and retry controls.',
      'Mock functions, spyOn, fake timers, and module mocking through vi, including hoisted vi.mock.',
      'Coverage via @vitest/coverage-v8 (default) or @vitest/coverage-istanbul with thresholds and reporters.',
      'In-source testing, typechecking of tests, a rewritten benchmarking API in v5, and test projects for suites with different environments.',
      'Browser mode for component and visual regression testing in real browsers through providers such as Playwright.',
    ],
    useCases: [
      'Unit and integration tests in a Vite-based app where config reuse matters.',
      'Component testing for React, Vue, or Svelte components in a real browser with browser mode.',
      'Migrating an existing Jest suite that already writes plain expect and test code.',
      'Libraries that want fast test iteration without a heavyweight jest and ts-jest setup.',
    ],
    gettingStarted: [
      'Add vitest as a devDependency in your project.',
      'Write a first test next to the code it tests, for example a sum function with test and expect.',
      'Add test scripts: vitest run for CI and vitest for the interactive watch loop.',
      'Run vitest once to confirm discovery; it picks up test files automatically and reads an existing vite config if present.',
      'Enable coverage with vitest run --coverage and a provider package to see a report.',
    ],
    limitations: [
      'Version floors move between majors: current releases require recent Node and Vite versions, so pin them deliberately and read release notes on upgrade.',
      'Not every Jest plugin, transform, or global behaves identically; expect transfers well, but module mocking and globals need a check during migration.',
      'Browser mode is genuinely useful but brings its own moving parts — providers, locators, and session-bound behavior that changed in v5.',
      'The project ships change quickly; options and even the benchmarking API were reworked during v5, so lock versions in applications that must stay stable.',
      'For end-to-end journeys against a fully running app, dedicated tools such as Playwright or Cypress usually still fit better than Vitest alone.',
    ],
    faqs: [
      {
        question: 'Does Vitest require a Vite project?',
        answer:
          'No. Vitest works in plain Node projects; it reads a vite.config or vitest.config when one exists and otherwise falls back to its own defaults.',
      },
      {
        question: 'Which coverage providers does Vitest support?',
        answer:
          'Two: V8 coverage via @vitest/coverage-v8, which is the default and needs a V8-based runtime, and Istanbul via @vitest/coverage-istanbul, which works on any JavaScript runtime because it instruments the source.',
      },
      {
        question: 'Can I test UI components with it?',
        answer:
          'Yes. Browser mode runs component and visual tests in real browsers through providers like Playwright, and for lighter checks DOM environments such as jsdom or happy-dom render components without a browser.',
      },
    ],
    officialResources: [
      {
        title: 'Vitest guide',
        href: 'https://vitest.dev/guide/',
        description: 'Getting started, writing tests, mocking, and the full feature walkthrough.',
      },
      {
        title: 'Config reference',
        href: 'https://vitest.dev/config/',
        description: 'Every test configuration option, from environments to coverage and projects.',
      },
      {
        title: 'API reference',
        href: 'https://vitest.dev/api/',
        description: 'The complete test, expect, and vi API surface.',
      },
      {
        title: 'Coverage guide',
        href: 'https://vitest.dev/guide/coverage',
        description: 'V8 and Istanbul providers, thresholds, and reporters.',
      },
      {
        title: 'Vitest on GitHub',
        href: 'https://github.com/vitest-dev/vitest',
        description: 'Source code, issues, and releases.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'grafana',
    introduction: [
      'The most overlooked sentence about Grafana is also the most clarifying: it does not store your data. Grafana is a query, visualization, and alerting plane that sits in front of stores it does not own — Prometheus for metrics, Loki for logs, Elasticsearch, Postgres, CloudWatch, and dozens more — and brings them into one pane so incidents stop requiring five browser tabs.',
      'What follows is what that architecture means in practice: which piece you run yourself, how data sources and provisioning feed the dashboards you version in Git, and where the real learning curve lives — alerting rules, data source permissions, and dashboard-as-code. OSS and the managed Cloud are both covered so you can pick based on operational appetite rather than hype.',
    ],
    whatItDoes: [
      'A web application that connects to time-series, log, trace, and SQL sources and renders them into dashboards built from panels like graphs, tables, gauges, and heatmaps.',
      'An Explore mode for ad-hoc queries without creating a dashboard first.',
      'Built-in alerting that watches queries and expressions and routes notifications to Slack, PagerDuty, email, and webhooks.',
      'Provisioning: data sources, dashboards, and alert rules can be declared in YAML or Terraform instead of clicked into existence.',
    ],
    whyUseIt: [
      'One interface over the metrics, logs, and traces you already have, so teams stop switching between vendor consoles.',
      'Data stays where it lives: no copy or migration into a new store just to gain visualization.',
      'The Prometheus query language and dashboard JSON are common currency across the observability ecosystem, which eases hiring and migration.',
      'A self-hostable open-source core, with a managed Cloud for teams that prefer not to run it.',
    ],
    howItWorks: [
      'A data source is a configured connection to a backend; each one ships a query editor tailored to its query language.',
      'Panels run those queries and render through built-in visualizations, with transforms, annotations, and template variables supplying context.',
      'Alert rules evaluate queries and expressions on a schedule; a firing rule travels through notification policies to a contact point.',
      'Provisioning files sync data sources, dashboards, and alert configuration at startup, which keeps the setup reviewable in Git.',
    ],
    keyFeatures: [
      'A broad catalog of built-in and plugin data sources: Prometheus, Loki, Tempo, Jaeger, CloudWatch, Azure Monitor, InfluxDB, Elasticsearch, Postgres, MySQL, Graphite, and more.',
      'Template variables and annotations for status boards that stay reusable across environments.',
      'Alerting with grouping, silences, and notification policies across multiple contact points.',
      'Explore for tracing an incident across metrics, logs, and traces, including trace-to-log and trace-to-metrics links.',
      'Companion open-source projects (Loki, Tempo, Mimir, k6, Pyroscope) that plug into the same dashboards.',
    ],
    useCases: [
      'Operations dashboards that combine Prometheus node metrics with logs and trace context around an incident.',
      'SLO-style panels and uptime graphs for services without adopting a separate monitoring vendor.',
      'A platform team single pane across AWS, Kubernetes, and application metrics.',
      'Load-test and profiling results from k6 and Pyroscope rendered on the same dashboard surface as production data.',
    ],
    gettingStarted: [
      'Start with the Docker image (grafana/grafana) or a hosted Cloud free tier, then sign in with the default admin credentials.',
      'Add a data source, for example Prometheus, from the Connections section and give it a reachable URL.',
      'Create a dashboard, add a panel, select the data source, and write a query with the query editor.',
      'Create an alert rule on one query, add a contact point, and pick a notification channel such as email or Slack.',
      'Export the dashboard as JSON into a directory and provision it via YAML so configuration ships from Git.',
    ],
    limitations: [
      'Grafana is not a storage layer: without a metrics, log, or trace store behind it there is nothing to visualize, so plan to run Prometheus or Loki (or use Cloud) alongside.',
      'The observability stack people mean when they say Grafana (Loki, Tempo, Mimir, k6) is a set of separate projects to operate, each with its own resources.',
      'Alerting has a learning curve — rules, notification policies, and contact points interact subtly, and misrouted notifications can silently swallow alerts.',
      'The Cloud free tier quotas for metrics, logs, and traces have changed over time and are subject to change; confirm current limits on the pricing page.',
      'Without provisioning-as-code, dashboards drift and nobody can tell who changed which panel.',
    ],
    faqs: [
      {
        question: 'Does Grafana store my metrics?',
        answer:
          'Not by itself. It is a front-end over the stores you configure, and your data stays in Prometheus, Loki, InfluxDB, CloudWatch, or wherever it already lives. The companion projects Loki, Tempo, and Mimir are separate backends.',
      },
      {
        question: 'Do we need Grafana Cloud, or can we run it ourselves?',
        answer:
          'Both work. Grafana OSS is free to self-host via Docker, binary, or Kubernetes, while Grafana Cloud is the managed offering. The choice balances operations effort, data-residency rules, and what the plan includes.',
      },
      {
        question: 'How do teams version-control Grafana dashboards?',
        answer:
          'Through provisioning: dashboards and data sources exported as JSON or YAML and synced on startup, frequently managed with Terraform, so changes flow through review instead of point-and-click edits.',
      },
    ],
    officialResources: [
      {
        title: 'Grafana docs',
        href: 'https://grafana.com/docs/grafana/latest/',
        description:
          'The reference for dashboards, panels, data sources, alerting, and provisioning.',
      },
      {
        title: 'Set up Grafana',
        href: 'https://grafana.com/docs/grafana/latest/setup-grafana/',
        description: 'Installing, configuring, and securing a Grafana instance.',
      },
      {
        title: 'Data sources',
        href: 'https://grafana.com/docs/grafana/latest/datasources/',
        description: 'Connecting and querying the supported backends.',
      },
      {
        title: 'Alerting',
        href: 'https://grafana.com/docs/grafana/latest/alerting/',
        description: 'Alert rules, notifications, and the alerting workflow.',
      },
      {
        title: 'Grafana OSS',
        href: 'https://grafana.com/oss/',
        description: 'The open-source projects from Grafana Labs and download links.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'sentry',
    introduction: [
      'Production errors announce themselves in the worst order: the user sees a broken screen before the engineer sees a stack trace. Sentry exists to flip that order — capturing exceptions, traces, and performance problems from your app into a queue built for triage rather than a raw log stream.',
      'This text maps the product honestly: what the SDKs capture, why the Issues list groups events, and how tracing, session replay, and profiling relate to errors. Sentry documentation itself warns that SDKs, APIs, and features change frequently, so treat the configuration here as a primer and confirm the current integration when you wire it up.',
    ],
    whatItDoes: [
      'Error-monitoring SDKs that capture uncaught exceptions, unhandled rejections, and manually reported errors across many platforms and frameworks.',
      'Distributed tracing that ties frontend, backend, and background jobs into spans searchable in the Trace Explorer.',
      'Session replay, profiling, cron monitoring, structured logs, and application metrics attached to the same issues and traces.',
      'A triage product: the Issues list groups related events by fingerprint and layers on release health, suspect commits, and alerts.',
    ],
    whyUseIt: [
      'One platform covers frontend, backend, mobile, and increasingly AI-agent code, so a team gets a single view instead of an SDK per concern.',
      'Issue grouping cuts alert noise: thousands of events collapse into one issue you mark resolved and watch for regressions.',
      'Release awareness: release health shows crash-free sessions per version, so a regression is traceable to the deploy that introduced it.',
      'Open-source core with a self-hosting path, plus source-map and debug-symbol support for readable stack traces.',
    ],
    howItWorks: [
      'The SDK initializes with a project DSN and sends events over an authenticated path, with optional tunneling to avoid ad-blockers.',
      'Similar events are grouped into an issue by a fingerprint, and details land in the Issues queue with stack traces, breadcrumbs, and tags.',
      'tracesSampleRate or a custom sampler controls how much tracing data is sent; spans join into distributed traces.',
      'Release health and alerts work off accepted events, and quotas are consumed per event rather than per issue.',
    ],
    keyFeatures: [
      'Grouping and triage: events collapse to issues with saved searches, ownership rules, and review states pacing the queue.',
      'Performance tooling including distributed tracing, slow-query and N+1 detection, and CPU profiling.',
      'Session replay with error-linked reproductions and controls for scrubbing sensitive data.',
      'Alerts and monitors: uptime and cron monitors, plus alert rules routing to Slack, Discord, PagerDuty, and issue trackers.',
      'Source maps and debug files that de-minify and de-obfuscate stack traces in the UI.',
    ],
    useCases: [
      'Teams that want one queue for backend exceptions and browser errors.',
      'Catching regressions at release time by tracking crash-free session rate per deploy.',
      'Debugging slow or broken API paths and N+1 database access with distributed traces.',
      'Using session replay to see what a user did in the moments before an error.',
    ],
    gettingStarted: [
      'Create a Sentry account and project, or stand up the self-hosted option from the official images.',
      'Install the SDK for your platform, such as @sentry/browser or @sentry/node, and call Sentry.init with the project DSN stored in an environment variable.',
      'Trigger an error on purpose and confirm it appears in the Issues list.',
      'Enable tracing by setting tracesSampleRate, then add session replay or profiling as the app needs it.',
      'Upload source maps for readable JavaScript stack traces and connect your Git repository to unlock suspect commits.',
    ],
    limitations: [
      'SDKs and features change quickly — Sentry guidance itself says setup and configuration change frequently, so validate config snippets at integration time.',
      'Pricing is usage-based on accepted events, sessions, and replays; quotas and free-tier limits shift, so check the current pricing pages before betting on volumes.',
      'Sampling trades fidelity for cost: setting sample rates too low hides problems, and too high inflates the bill.',
      'Self-hosted Sentry has real operational requirements — sizing, upgrades, and storage for events and replays — so weigh those against the hosted tier.',
      'The JavaScript SDK adds bundle weight, and replay and utility features increase it further; review the bundle impact for frontend budgets.',
    ],
    faqs: [
      {
        question: 'How does Sentry avoid an alert for every error event?',
        answer:
          'Grouping fingerprints similar events and stacks them into one issue you triage and resolve, with alerts firing on issue state changes and thresholds instead of on every raw event.',
      },
      {
        question: 'Do I need to upload source maps?',
        answer:
          'For readable JavaScript stack traces, yes. Production code is minified, so without source maps (or native debug symbols) the trace shows mangled names. The wizard and CLI can upload them as part of the build.',
      },
      {
        question: 'Where does my data live, and can I host it myself?',
        answer:
          'The hosted service stores data in the US or the EU depending on your organization settings. A self-hosted open-source build also exists, but it means owning infrastructure, upgrades, and storage for events and replays — most teams pick hosted unless rules require otherwise.',
      },
    ],
    officialResources: [
      {
        title: 'Sentry docs',
        href: 'https://docs.sentry.io/',
        description: 'SDK setup, product guides, and the API reference.',
      },
      {
        title: 'Getting started with Sentry',
        href: 'https://docs.sentry.io/product/sentry-basics/',
        description:
          'Source integration, alerts, tracing, and the triage workflow after the SDK is installed.',
      },
      {
        title: 'Issues',
        href: 'https://docs.sentry.io/product/issues/',
        description: 'How events become issues and how to triage them.',
      },
      {
        title: 'JavaScript SDK',
        href: 'https://docs.sentry.io/platforms/javascript/',
        description: 'Installing, tracing, replay, and source maps for JavaScript.',
      },
      {
        title: 'Sentry on GitHub',
        href: 'https://github.com/getsentry/sentry',
        description: 'The open-source platform behind self-hosted Sentry.',
      },
    ],
    lastReviewed: '2026-09-11',
  },
  {
    slug: 'auth0',
    introduction: [
      'Authentication is the subsystem teams rebuild from scratch and later regret: a users table, a hashed password, a session cookie, and a password-reset flow that stays five tickets away. Auth0 (an Okta company) is an identity platform that takes over that whole problem — sign-in screens, the user directory, tokens, and attack protection — behind standards like OAuth 2.0, OpenID Connect, and SAML, so your application owns a login link instead of a password store.',
      'This guide is about how Auth0 fits into a codebase: tenants and applications, the hosted Universal Login, the token flow, and where the SDKs hand off to your own code. It also covers the tradeoffs that surface later — authentication (who you are) is not authorization (what you can do), pricing is usage-based on active users and changes over time, and you are putting a vendor between your customers and your product.',
    ],
    whatItDoes: [
      'A hosted identity platform: tenants, applications, and user directories managed from a dashboard and an API, with sign-in flows you integrate instead of build.',
      'SDKs and libraries across single-page, native, mobile, and server-side frameworks, plus the hosted Universal Login page you can customize to match your brand.',
      'A broad set of connections — email and password, passwordless, social networks, enterprise SAML and LDAP, and machine-to-machine services — with multi-factor authentication and passkeys.',
      'Token issuance and validation: ID, access, and refresh tokens issued per OAuth 2.0 and OpenID Connect, validated by your application or API.',
    ],
    whyUseIt: [
      'You skip the security-sensitive work that is easy to get subtly wrong: password hashing, session lifecycle, reset flows, and brute-force protection.',
      'Protocol support is vendor-grade from day one — OAuth 2.0, OIDC, SAML, and JWT come configured rather than hand-rolled.',
      'Quickstarts and SDKs compress integration from weeks to hours for common frameworks like React, Next.js, ASP.NET, Django, and Spring.',
      'Features that are painful to build well, such as MFA and breached-password detection, are included rather than left as future projects.',
    ],
    keyFeatures: [
      'Tenants: isolated namespaces that keep development, staging, and production configurations and user data apart.',
      'Applications and APIs modeled for different client types: single-page, native, regular web app, and backend or service clients.',
      'Universal Login with brandable, customizable sign-up and login pages, including custom domains.',
      'Actions, rules, and hooks that customize the authentication pipeline before and after login, without forking the sign-in flow.',
      'Attack protection: brute-force and suspicious-IP throttling, breached-password detection, plus enterprise SSO and SCIM provisioning.',
    ],
    howItWorks: [
      'An application registers with Auth0 as one of several client types and receives an application client ID (and a secret for server-side types).',
      'A user signs in through the hosted login page or an SDK flow; Auth0 checks the configured connections and returns ID and access tokens as JWTs.',
      'Your API validates the access token against Auth0\u2019s published signature keys or accepts it through a verification middleware, while the SDK manages session and refresh handling.',
      'User profiles live in the Auth0 directory (or in your own database via a custom connection), and roles can be attached to users for your authorization checks.',
    ],
    useCases: [
      'SaaS products that want social login, passwordless, and MFA without building a password-reset stack of their own.',
      'B2B portals with enterprise SSO, SAML connections, and per-customer organization workspaces.',
      'Mobile apps that need a native token flow plus refresh tokens and long-lived sessions.',
      'Teams that want audit logs, attack protection, and compliance-ready sign-in patterns out of the box.',
    ],
    gettingStarted: [
      'Create a free tenant at auth0.com — the free plan currently supports up to 25,000 monthly active users, but confirm the current limit on the pricing page.',
      'Register an application of the right type for your stack: Single Page App, Regular Web App, Native, or Machine to Machine.',
      'Follow the quickstart for your framework to install the SDK and copy the tenant domain and client ID into your environment.',
      'Test the login flow, then add a connection such as email and password or a social provider, and verify the user appears in the dashboard.',
      'Review the Logs view and set the allowed callback and logout URLs for your development origin.',
    ],
    limitations: [
      'Auth0 authenticates; the authorization decisions — what a signed-in user may actually do — remain your application\u2019s job, even though roles are provided.',
      'Pricing is usage-based on monthly active users with separate B2C and B2B tiers, and the terms keep changing; verify the current page before budgeting.',
      'Enterprise features such as rules, RBAC, custom connections, and log streaming add real configuration surface that needs platform knowledge.',
      'You are delegating sign-in traffic and the user directory to Auth0\u2019s cloud, so weigh vendor dependence and data-residency rules for regulated products.',
    ],
    faqs: [
      {
        question: 'What is the difference between authentication and authorization with Auth0?',
        answer:
          'Authentication confirms who the user is — Auth0 completes that and hands you identity tokens. Authorization decides what the user can do, which is still enforced in your application or API based on scopes, roles, and your own rules.',
      },
      {
        question: 'Which tokens does Auth0 issue, and what do I do with them?',
        answer:
          'Auth0 issues ID and access tokens (JWTs) and, in the flows that use them, refresh tokens. The access token is what your API checks, the ID token carries profile claims, and refresh tokens renew sessions without re-prompting the user. Validate tokens with the published signature keys rather than trusting them blindly.',
      },
      {
        question: 'How do I add single sign-on for employees or customers?',
        answer:
          'SSO is handled through enterprise connections: configure a SAML or OIDC identity provider for your organization, or use Organizations for B2B customer tenants. Users then sign in through their existing identity provider and Auth0 returns the session to your app.',
      },
    ],
    officialResources: [
      {
        title: 'Auth0 docs',
        href: 'https://auth0.com/docs/',
        description: 'The documentation index covering setup, flows, and every product area.',
      },
      {
        title: 'Get started with Auth0',
        href: 'https://auth0.com/docs/get-started',
        description: 'Tenants, applications, and identity fundamentals for new users.',
      },
      {
        title: 'Quickstarts',
        href: 'https://auth0.com/docs/quickstarts',
        description: 'Framework-by-framework integration walkthroughs and sample apps.',
      },
      {
        title: 'Authentication and authorization protocols',
        href: 'https://auth0.com/docs/protocols',
        description: 'OAuth 2.0, OpenID Connect, SAML, JWT, and the standards Auth0 implements.',
      },
      {
        title: 'Auth0 pricing',
        href: 'https://auth0.com/pricing',
        description: 'Current plans, active-user tiers, and B2C and B2B pricing.',
      },
      {
        title: 'Auth0 on GitHub',
        href: 'https://github.com/auth0',
        description: 'SDKs, sample apps, and tooling source.',
      },
    ],
    lastReviewed: '2026-09-13',
  },
  {
    slug: 'playwright',
    introduction: [
      'A unit test tells you a function behaves the way you wrote it; it cannot tell you whether the page a customer clicks actually works. Playwright answers that second question by driving real browsers — Chromium, WebKit, and Firefox — against your running application, so the assertions land on the same DOM a user interacts with, and a failure comes back with a trace instead of a guess.',
      'This guide covers the practical shape of end-to-end testing with Playwright Test: locators that survive markup churn, auto-waiting that replaces sleeps, projects that run the same suite across browsers and devices, and the CI wiring. It closes with the honest costs — browser binaries to install, heavier feedback loops than unit tests, and the discipline that isolation and stable selectors demand.',
    ],
    whatItDoes: [
      'A testing framework for end-to-end and component workflows, built on a browser-automation library that controls browsers over a real network connection.',
      'Automation across Chromium, Firefox, WebKit, and branded channels such as Google Chrome and Microsoft Edge.',
      'Code generation, a Trace Viewer that replays failures, a UI mode for debugging, and structured reports.',
      'Run features: fixtures, projects, parallelism, sharding, retries, and a webServer fixture that boots the app under test.',
    ],
    whyUseIt: [
      'Tests run in the browser engines users actually run, catching layout, timing, and integration regressions a unit suite cannot.',
      'Locators built around roles and text, such as page.getByRole, keep tests readable and resilient to DOM churn.',
      'Auto-waiting and retry-ability remove the most common source of flaky end-to-end tests: timing guesses.',
      'Built-in tracing turns every failure into replayable evidence for the developer who has to fix it.',
      'Cross-browser coverage is a config project, not a rewrite.',
    ],
    keyFeatures: [
      'Built-in locators — getByRole, getByText, getByLabel, getByTestId — aligned with accessibility and how users perceive the page.',
      'Automatic actionability checks before each action, and assertions that retry until the expected state is reached.',
      'Test isolation: every test runs in a fresh browser context, equivalent to a new incognito session.',
      'Projects that run the same suite across desktop browsers, mobile emulation, and branded channels in parallel.',
      'Tracing, video, and screenshots on failure, plus API-testing fixtures and the webServer option.',
    ],
    howItWorks: [
      'The library installs its own browser builds matched to the Playwright version with npx playwright install, into a local cache.',
      'Each test receives a fresh browser context through the page fixture, guaranteeing isolation between tests and stable parallel runs.',
      'Actions wait for elements to be actionable, and expect() assertions retry until the condition is met before timing out.',
      'Tests execute in parallel across workers and projects; failures produce trace files you can open in the Trace Viewer.',
    ],
    useCases: [
      'End-to-end regression suites for critical journeys: sign-up, checkout, and onboarding.',
      'Cross-browser smoke testing across Chromium, Firefox, and WebKit plus mobile viewport emulation.',
      'Visual comparison of screenshots to catch unintentional UI changes.',
      'Combined API and UI flows, using the request fixture against the same application the browser tests.',
    ],
    gettingStarted: [
      'Run npm init playwright@latest in a project to scaffold the config, a tests folder, and an optional CI workflow.',
      'Install the browsers with npx playwright install (plus install-deps on Linux CI images).',
      'Write a first spec using page.goto and a getByRole assertion against your app or a public page.',
      'Run npx playwright test and open the HTML report to inspect results and traces.',
      'Point the webServer config at your dev server and commit the workflow so CI runs the suite on every push.',
    ],
    limitations: [
      'Browser binaries add hundreds of megabytes per checkout and must be reinstalled when you upgrade Playwright, because each version pins its own browsers.',
      'End-to-end tests run orders of magnitude slower and heavier than unit tests; they complement lower-level suites rather than replace them.',
      'Stable selectors and isolated data are required — without them, even auto-waiting tests flake across runs.',
      'Suites need a maintenance budget: headless and headed differences, network mocking, and resource cleanup all need attention over time.',
    ],
    faqs: [
      {
        question: 'Why do I need to install browsers separately?',
        answer:
          'Playwright pins known-good browser builds instead of using whatever is installed on your machine, so the suite behaves identically everywhere. npx playwright install fetches matching Chromium, Firefox, and WebKit builds, and you re-run it after upgrading Playwright.',
      },
      {
        question: 'What does test isolation actually mean in Playwright?',
        answer:
          'Each test gets a brand-new browser context — cookies, storage, and state are discarded between tests. Tests cannot pollute each other, which is also what makes retries and parallel execution safe.',
      },
      {
        question: 'Can Playwright test my API as well as the UI?',
        answer:
          'Yes. The request fixture provides an API client configured for your test environment, so you can seed data, verify responses, and combine API calls with browser flows in the same spec.',
      },
    ],
    officialResources: [
      {
        title: 'Playwright docs',
        href: 'https://playwright.dev/docs/intro',
        description: 'Installation, your first test, and the full guide set.',
      },
      {
        title: 'Writing tests',
        href: 'https://playwright.dev/docs/writing-tests',
        description: 'Actions, assertions, isolation, and test hooks.',
      },
      {
        title: 'Locators',
        href: 'https://playwright.dev/docs/locators',
        description: 'The built-in locator API and resilience guidance.',
      },
      {
        title: 'Browsers',
        href: 'https://playwright.dev/docs/browsers',
        description: 'Projects, browser channels, emulation, and installation.',
      },
      {
        title: 'Playwright on GitHub',
        href: 'https://github.com/microsoft/playwright',
        description: 'Source, issue tracking, and releases.',
      },
    ],
    lastReviewed: '2026-09-13',
  },
  {
    slug: 'figma',
    introduction: [
      'Design handoff used to be a screenshots game: an exported PNG, a PDF of specs, and a thread of follow-ups where \u201cthe spacing is slightly off\u201d burns a day. Figma collapses the gap by keeping the design itself open to everyone — developers inspect the live file, copy measurements and tokens, and comment on the exact frame, while components and styles keep the design consistent the way code libraries keep your application consistent.',
      'On the other hand is the practical engineering view: what you inherit when engineering is invited into the file, how Dev Mode and inspect expose what you need to build, and where plugins and the REST API extend the workflow. The guide ends with constraints that matter on real teams — cloud-only files, plan and seat rules that decide who inspects what, and a versioning model that is not a code repository.',
    ],
    whatItDoes: [
      'A collaborative interface design tool where the canvas, components, prototypes, and comments live in one shared file.',
      'Component and variant systems, styles, and variables that let teams maintain design systems with code-like reuse.',
      'Prototyping for user flows with frames, interactions, animations, and conditional logic in the same document.',
      'Dev Mode with inspection, measurements, and code snippets, plus a VS Code extension that surfaces design on the code side.',
      'A plugin and widget ecosystem and a REST API at api.figma.com for reading and writing file data programmatically.',
    ],
    whyUseIt: [
      'Developers work against the live design instead of exported screenshots, so specifications stop drifting.',
      'Components, styles, and variables give the design the reuse and consistency that design systems depend on.',
      'Dev Mode exposes measurements, colors, typography, and copyable CSS, React, iOS, and Android snippets.',
      'One real-time document replaces file-transfer choreography and keeps feedback attached to the exact frame.',
    ],
    keyFeatures: [
      'Components with variants and instance override behavior, plus auto layout for responsive frames.',
      'Styles and variables — colors, spacing, typography — with modes for theming across products.',
      'Dev Mode inspection, annotations, statuses such as ready-for-dev, and asset export.',
      'REST API, webhooks, MCP connectors, and a plugin and widget ecosystem including Dev Mode plugins.',
      'Version history with named versions, comments, and multiplayer cursors.',
    ],
    howItWorks: [
      'A Figma file stores every layer and object as a node in a JSON tree, which the REST API exposes over https://api.figma.com.',
      'A component is a reusable master; instances are live references that update when the master changes, and variables carry design tokens.',
      'Dev Mode reads node properties and renders measurements and code output for the selected layer or frame.',
      'Files are hosted in Figma\u2019s cloud with autosaved version history, and access is controlled by share links and permissions per plan.',
    ],
    useCases: [
      'Handoff: developers inspect frames in Dev Mode and implement with the actual spacing, color, and type values.',
      'Design systems: one source file of components and variables published as a library for the whole product.',
      'Review workflows: stakeholders comment on the exact frame while changes stay versioned in the file.',
      'Automation: plugins or the REST API export assets, sync with issue trackers, and build internal tools.',
    ],
    gettingStarted: [
      'Create a free Figma account and start a file in a team workspace or as a draft.',
      'Learn the basics on one frame: layers, shapes, text, and frame constraints.',
      'Turn a repeated piece of UI into a component and add text, color, and effect styles.',
      'Invite a teammate to edit or comment, and set the share permissions for the file.',
      'On a paid plan, open Dev Mode or install the Dev Mode VS Code extension to inspect and copy code.',
    ],
    limitations: [
      'Files are cloud-hosted: offline work is limited and there is no equivalent of a local clone, which matters in some regulated environments.',
      'Dev Mode\u2019s advanced inspection and status features are tied to paid seats and plans — free workspaces include basic inspect only; check the current pricing.',
      'Versioning is autosave plus named versions rather than reviewable commits, so it cannot replace your project tracker or code review.',
      'Design-to-code output still needs judgment: code snippets are a starting point, not a substitute for engineering decisions about implementation.',
    ],
    faqs: [
      {
        question: 'As a developer, do I need a paid Figma account just to inspect designs?',
        answer:
          'Free viewing and basic inspect — measurements, property values, and some code output — work without payment. Advanced Dev Mode features such as annotations, statuses, and customization sit on paid Dev seats or paid plans, so check the current feature matrix.',
      },
      {
        question: 'What is the difference between a component and just copying an element?',
        answer:
          'A component is a master with instances. Editing the master propagates to every instance, so changing a button color once updates the whole design system instead of hunting down thirteen copies.',
      },
      {
        question: 'Can I read design data programmatically?',
        answer:
          'Yes. The Figma REST API at api.figma.com returns file and node trees over HTTPS using access tokens or OAuth, and webhooks push changes, so you can export assets, report on files, or feed downstream tooling.',
      },
    ],
    officialResources: [
      {
        title: 'Figma help center',
        href: 'https://help.figma.com/hc/en-us',
        description: 'Official guides for Figma Design, Make, Dev Mode, and more.',
      },
      {
        title: 'Figma developer docs',
        href: 'https://www.figma.com/developers/api',
        description:
          'REST API reference: files, comments, variables, webhooks, and authentication.',
      },
      {
        title: 'Plans and pricing',
        href: 'https://www.figma.com/pricing',
        description: 'Current plans, seats, and feature comparison.',
      },
      {
        title: 'Figma on GitHub',
        href: 'https://github.com/figma',
        description: 'Open-source samples and the developer community.',
      },
    ],
    lastReviewed: '2026-09-13',
  },
  {
    slug: 'slack',
    introduction: [
      'Group chat collapses into noise the moment every message becomes equally important. Slack stays useful because of the structure around the stream: channels split conversations by topic, threads keep replies attached to the message they follow, and search makes half-remembered decisions findable months later. For developers the same structure is also a platform — alerts, deploys, and support requests can flow into the exact channel that owns them.',
      'This guide treats Slack both as communication software and as an automation surface: channels and threads for the team, plus webhooks, the Slack CLI, Bolt SDKs, and Workflows for turning routine operations into something the tool does for you. It ends with the realistic constraints — notification fatigue, plan-gated history and retention, and the fact that conversation is not a substitute for your source of truth.',
    ],
    whatItDoes: [
      'Workspace-based team messaging with channels, threads, direct messages, huddles, and file sharing across desktop and mobile.',
      'Search across messages, files, and connected apps, along with slash commands and message reactions.',
      'A developer platform: the Slack API, incoming webhooks, the Slack CLI, Bolt SDKs for JavaScript, Python, and Java, and Workflows for automation.',
      'Admin surfaces for permissions, guest access, retention, compliance, and analytics.',
    ],
    whyUseIt: [
      'Channels and threads turn a shared chat tool into a searchable record of decisions, reducing repeated status questions.',
      'An automation surface: CI, monitoring, and ticketing push updates into channels where the team is already looking.',
      'A wide integration ecosystem with native connectors and webhooks for anything custom.',
      'Teams spend less time in email and scattered direct messages, and more time in contexts that have an owner and a search path.',
    ],
    keyFeatures: [
      'Channels (public, private, and cross-workspace), threads, direct messages, and voice huddles.',
      'Slack apps with scoped OAuth tokens, plus incoming webhooks for push-only notifications from any system.',
      'Workflows that automate common requests without code, alongside scheduled messages and reminders.',
      'Developer tooling: the Slack CLI, Bolt for JavaScript, Python, and Java, the Slack GitHub Action, and sample apps.',
      'Platform features for admins: permissions, guest accounts, retention, data residency, and single sign-on on higher plans.',
    ],
    howItWorks: [
      'A workspace groups the team, channels scope conversations, and roles and permissions control who can view, post, and administer.',
      'An app authenticates with OAuth tokens scoped to the surfaces it touches, such as chat writes, reactions, and files.',
      'Incoming webhooks post a stream of messages from an external system, while the Events API delivers activity to an app you run with Bolt or a serverless function.',
      'Workflows run in Slack\u2019s cloud and react to message shortcuts, slash commands, and scheduled triggers, calling API methods under an app token.',
    ],
    useCases: [
      'Routing build status, deploy notices, and on-call alerts into #deploys and #incidents via a GitHub Action or webhook.',
      'A product-support channel where requests are threaded and answered with pinned docs and saved replies.',
      'An internal bot built with Bolt that answers questions or runs lookups against your services.',
      'Team rhythm: scheduled standups, announcements, and reminders that reduce interruption-driven coordination.',
    ],
    gettingStarted: [
      'Create or join a workspace, then organize channels around teams, projects, and systems — with owners and purposes.',
      'Install the desktop and mobile apps and tune notifications around channels and threads.',
      'Try automation the quick way: post a payload from CI into a channel with an incoming webhook or the Slack GitHub Action.',
      'For a two-way app, follow the docs quickstart: install the Slack CLI, run slack create and slack run, and test locally.',
      'Explore Workflow automations for recurring requests such as intake, approvals, and FAQ lookups.',
    ],
    limitations: [
      'Without channel discipline, Slack becomes the noise tool it is accused of being — moderation, threading, and tone-of-channel are continuous work.',
      'Message history and retention are plan-gated: free workspaces lose older messages, and search, export, and compliance features depend on the tier you pay for.',
      'Conversation is not the source of truth: decisions buried in threads fragment knowledge, so keep design docs, issue trackers, and code as the record.',
      'Integrations and apps need maintenance — webhooks and scripts rot, scopes must be reviewed, and every added app adds notification surface.',
    ],
    faqs: [
      {
        question: 'What is the easiest way to automate messages into Slack?',
        answer:
          'An incoming webhook posts messages from scripts and CI with one payload — the lightest path for one-way notifications. A Slack app with OAuth opens up two-way interaction, while Workflows cover common cases without code. Pick based on whether you only need output or you also need the app to respond.',
      },
      {
        question: 'How do channels and threads fit together?',
        answer:
          'Channels scope the topic; threads group replies under a specific message so a busy channel stays readable. Keep long-running discussions in threads and let the channel carry the one-line outcomes.',
      },
      {
        question: 'Can Slack replace our wiki or issue tracker?',
        answer:
          'No — Slack is searchable conversation, but its structure is built for flow rather than records. Paste links, triage decisions, and keep source-of-truth documents and tickets in tools built for them; use channels to discuss and signal rather than to store.',
      },
    ],
    officialResources: [
      {
        title: 'Slack developer docs',
        href: 'https://docs.slack.dev/',
        description: 'The official developer documentation for the Slack platform.',
      },
      {
        title: 'Quickstart: creating a Slack app',
        href: 'https://docs.slack.dev/quickstart',
        description: 'Scaffold and run a Slack app with the Slack CLI and Bolt.',
      },
      {
        title: 'Slack API start page',
        href: 'https://api.slack.com/start',
        description: 'The entry point for developers, tools, and getting started guides.',
      },
      {
        title: 'Slack on GitHub',
        href: 'https://github.com/slackapi',
        description: 'SDKs, sample apps, and tooling source.',
      },
    ],
    lastReviewed: '2026-09-13',
  },
];

export function getToolGuide(slug: string): ToolGuide | undefined {
  return toolGuides.find((guide) => guide.slug === slug);
}

export function getAllToolGuides(): ToolGuide[] {
  return [...toolGuides];
}
