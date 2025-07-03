# CircleCI Configuration Guide

This document explains the CircleCI configuration file (`.circleci/config.yml`) for the Playwright testing pipeline.

## 📋 Overview

The CircleCI configuration uses **version 2.1** and provides a flexible, scalable testing pipeline with the following key features:

- **Parallel test execution** with sharding
- **Tagged test runs** for focused testing
- **Scheduled nightly builds** for comprehensive regression testing
- **Code quality checks** with linting and formatting
- **Retry mechanisms** for flaky tests
- **Comprehensive artifact storage**

---

## 🔧 Parameters

**Purpose**: Define pipeline-level variables that can be set when triggering builds

```yaml
parameters:
  target_branch:
    type: string
    default: "main"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `target_branch` | string | "main" | Target branch for testing |
| `run_all_tests` | boolean | false | Run comprehensive test suite |
| `run_only_quality_checks` | boolean | false | Run only linting/formatting checks |
| `test_directories` | string | "tests/" | Directories to test |
| `test_environment` | enum | "production" | Environment to test against |
| `run_tagged_tests` | string | "" | Specific test tags to run |

**Usage**: Set these when triggering builds via API or UI to customize behavior.

---

## 🖥️ Executors

**Purpose**: Define the runtime environment for jobs

```yaml
executors:
  playwright-executor:
    docker:
      - image: mcr.microsoft.com/playwright:v1.53.0-noble
    working_directory: ~/repo
    resource_class: medium
```

### playwright-executor
- **Docker Image**: `mcr.microsoft.com/playwright:v1.53.0-noble`
- **Working Directory**: `~/repo`
- **Resource Class**: `medium` (balanced CPU/memory)
- **Purpose**: Provides Node.js environment with Playwright browsers pre-installed

---

## 🔨 Commands

**Purpose**: Reusable command definitions to avoid code duplication

### 1. `setup-pnpm-and-dependencies`

**What it does:**
- Checks out the repository code
- Installs pnpm package manager
- Installs project dependencies with caching
- Configures pnpm store for faster subsequent builds

**Key Features:**
- **Caching**: Uses `pnpm-lock.yaml` checksum for cache keys
- **Global pnpm**: Installs latest pnpm version globally
- **Store Configuration**: Sets up pnpm store directory

```yaml
- restore_cache:
    keys:
      - pnpm-packages-{{ checksum "pnpm-lock.yaml" }}
```

### 2. `run-tests-with-retry`

**What it does:**
- Runs the specified test command
- Optionally retries failed tests once
- Provides failure recovery mechanism

**Parameters:**
- `test_command`: Command to execute
- `retry_failed`: Whether to retry failed tests (max 1 retry)

**Usage:**
```yaml
- run-tests-with-retry:
    test_command: "pnpm test --shard=${SHARD_NUMBER}"
    retry_failed: true
```

### 3. `store-test-artifacts`

**What it does:**
- Stores HTML test reports
- Stores test results for debugging
- Stores JUnit results for CircleCI insights

**Artifacts Stored:**
- `playwright-report/` → HTML reports
- `test-results/` → Raw test results
- JUnit XML for test insights

---

## 💼 Jobs

**Purpose**: Define the actual work to be performed

### 1. `deploy-and-run-tests`

**Purpose**: Comprehensive test execution with parallel sharding

**Key Features:**
- **Parallelism**: 6 parallel containers
- **Sharding**: Splits tests across containers
- **Retry Logic**: Retries failed tests once
- **Artifact Storage**: Stores all test artifacts

**Execution Flow:**
1. Setup environment and dependencies
2. Calculate shard number based on container index
3. Run tests for assigned shard
4. Retry failed tests if enabled
5. Store artifacts

```yaml
parallelism: 6 # Higher parallelism for nightly builds
```

**Shard Calculation:**
```bash
SHARD=$((${CIRCLE_NODE_INDEX} + 1))
SHARD_NUMBER=${SHARD}/${CIRCLE_NODE_TOTAL}
```

### 2. `run-tagged-tests`

**Purpose**: Execute specific tests based on tags

**Key Features:**
- **No Parallelism**: Single container for focused testing
- **Dynamic Command Building**: Constructs test command based on tags
- **Tag Filtering**: Uses `--grep` for tag-based filtering

**Command Construction:**
```bash
CMD="pnpm test --grep \"<< pipeline.parameters.run_tagged_tests >>\""
```

**Example Tags:**
- `@smoke` - Critical functionality tests
- `@health` - Basic health checks
- `@regression` - Full regression suite

### 3. `code-quality-checks`

**Purpose**: Ensure code quality and consistency

**Checks Performed:**
- **Unused Code Detection**: `pnpm run unused:check`
- **TypeScript/ESLint**: `pnpm run lint:check`
- **Code Formatting**: `pnpm run format:check`

**Features:**
- **Always Run**: Uses `when: always` to run all checks
- **Independent**: Each check runs regardless of others failing

---

## 🔄 Workflows

**Purpose**: Define when and how jobs are executed

### 1. `run-specific-tags`

**Trigger**: When `run_tagged_tests` parameter is provided

**Purpose**: Execute only tests matching specific tags

**Use Case**:
- Quick smoke tests
- Feature-specific testing
- Debugging specific test suites

### 2. `quality-checks`

**Trigger**: When `run_only_quality_checks` parameter is `true`

**Purpose**: Run only code quality checks without tests

**Use Case**:
- Pre-merge code validation
- Quick syntax/style checks
- CI/CD pipeline gates

### 3. `nightly-regression`

**Trigger**: Scheduled daily at 5:00 AM IST (11:30 PM UTC)

**Purpose**: Comprehensive regression testing

**Features:**
- **Scheduled**: Runs automatically every night
- **Branch Filter**: Only runs on `main`/`master` branches
- **Full Suite**: Runs all tests with maximum parallelism

**Cron Schedule:**
```yaml
cron: "30 23 * * *"  # 11:30 PM UTC = 5:00 AM IST
```

### 4. `selenium-compatibility`

**Trigger**: When `run_all_tests` parameter is `true`

**Purpose**: Run comprehensive tests including Selenium compatibility

**Jobs Included:**
- Code quality checks
- Full test suite execution

---

## 🚀 Usage Examples

### 1. Run Smoke Tests Only
```bash
# Via API
curl -X POST \
  https://circleci.com/api/v2/project/gh/your-org/your-repo/pipeline \
  -H "Circle-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parameters": {
      "run_tagged_tests": "@smoke"
    }
  }'
```

### 2. Run Quality Checks Only
```bash
# Via API
curl -X POST \
  https://circleci.com/api/v2/project/gh/your-org/your-repo/pipeline \
  -H "Circle-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parameters": {
      "run_only_quality_checks": true
    }
  }'
```

### 3. Run All Tests
```bash
# Via API
curl -X POST \
  https://circleci.com/api/v2/project/gh/your-org/your-repo/pipeline \
  -H "Circle-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "parameters": {
      "run_all_tests": true
    }
  }'
```

---

## 📊 Performance Optimizations

### 1. **Caching Strategy**
- **pnpm packages**: Cached based on `pnpm-lock.yaml`
- **Playwright browsers**: Pre-installed in Docker image
- **Store directory**: Configured for optimal performance

### 2. **Parallel Execution**
- **6 parallel containers** for comprehensive tests
- **Shard-based splitting** for even distribution
- **Container-specific execution** using `CIRCLE_NODE_INDEX`

### 3. **Retry Logic**
- **Maximum 1 retry** for failed tests
- **Conditional retry** based on job configuration
- **Fail-fast for quality checks**

---

## 🛠️ Configuration Best Practices

### 1. **Resource Management**
- Use `medium` resource class for balanced performance
- Optimize parallelism based on test suite size
- Monitor resource usage and adjust accordingly

### 2. **Error Handling**
- Implement retry logic for flaky tests
- Use `when: always` for independent checks
- Store artifacts even on failure

### 3. **Security**
- Use parameterized builds for flexibility
- Implement branch filtering for sensitive operations
- Store sensitive data in CircleCI environment variables

### 4. **Monitoring**
- Store comprehensive artifacts for debugging
- Use JUnit results for test insights
- Monitor build times and optimize accordingly

---

## 🔍 Troubleshooting

### Common Issues:

**1. Tests failing due to browser issues**
- Ensure Playwright image version matches local development
- Check browser installation in Docker image

**2. pnpm dependency issues**
- Clear cache and rebuild
- Check `pnpm-lock.yaml` for conflicts

**3. Sharding issues**
- Verify shard calculation logic
- Check test distribution across shards

**4. Timeout issues**
- Increase Playwright timeout settings
- Optimize test execution time

---

## 📈 Monitoring & Metrics

### Key Metrics to Monitor:
- **Build Duration**: Track total pipeline time
- **Test Success Rate**: Monitor flaky test patterns
- **Artifact Size**: Ensure artifacts aren't too large
- **Resource Usage**: Monitor CPU/memory consumption

### CircleCI Insights:
- **Test Results**: View test trends and failures
- **Build Performance**: Track build time trends
- **Flaky Tests**: Identify and fix unreliable tests

---

## 🎯 Future Enhancements

### Potential Improvements:
1. **Dynamic Parallelism**: Adjust based on test count
2. **Artifact Optimization**: Compress large artifacts
3. **Advanced Filtering**: More sophisticated test selection
4. **Integration Testing**: Add API/E2E test separation
5. **Performance Testing**: Add load testing capabilities

---

*This configuration provides a robust, scalable testing pipeline that balances speed, reliability, and maintainability.*