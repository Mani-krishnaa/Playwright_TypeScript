# CircleCI Configuration Complete Guide

## Table of Contents
1. [Version Declaration](#1-version-declaration)
2. [Parameters Section](#2-parameters-section)
3. [Orbs Section](#3-orbs-section)
4. [YAML Anchors](#4-yaml-anchors-reusable-configurations)
5. [Commands Section](#5-commands-section)
6. [Executors Section](#6-executors-section)
7. [Jobs Section](#7-jobs-section)
8. [Workflows Section](#8-workflows-section)
9. [Basic Example](#basic-circleci-configyml-example)
10. [Key Concepts Summary](#key-concepts-summary)
11. [Creating Your Own Config](#creating-your-own-config)

---

## 1. Version Declaration

**Purpose**: Specifies which version of CircleCI configuration format to use.

```yaml
version: 2.1
```

**Explanation**:
- **2.1**: Latest version supporting orbs, commands, executors, and parameters
- **2.0**: Legacy version (still supported but limited features)
- Always place this at the top of your config file

**Example**:
```yaml
version: 2.1  # Required - must be first line
```

---

## 2. Parameters Section

**Purpose**: Define pipeline-level variables that can be passed when triggering builds or used with conditional workflows.

```yaml
parameters:
  environment:
    type: string
    default: "staging"
  run_tests:
    type: boolean
    default: true
  test_count:
    type: integer
    default: 10
```

**Parameter Types**:
- `string`: Text values
- `boolean`: true/false values
- `integer`: Numeric values
- `enum`: Limited set of values

**Usage in Config**:
```yaml
# Reference parameters using: << pipeline.parameters.parameter_name >>
- run: echo "Environment is << pipeline.parameters.environment >>"
```

**Real-world Example**:
```yaml
parameters:
  deploy_environment:
    type: enum
    enum: ["staging", "production"]
    default: "staging"
  skip_tests:
    type: boolean
    default: false
```

---

## 3. Orbs Section

**Purpose**: Import reusable packages of CircleCI configuration (like libraries).

```yaml
orbs:
  aws-cli: circleci/aws-cli@5.1.2
  node: circleci/node@5.0.0
  docker: circleci/docker@2.0.0
```

**What Orbs Provide**:
- **Commands**: Reusable command sequences
- **Jobs**: Pre-built job definitions
- **Executors**: Pre-configured environments

**Popular Orbs**:
- `circleci/aws-cli`: AWS CLI tools and authentication
- `circleci/node`: Node.js setup and dependency management
- `circleci/docker`: Docker build and push commands
- `circleci/slack`: Slack notifications

**Usage Example**:
```yaml
jobs:
  deploy:
    steps:
      - aws-cli/setup  # Use command from aws-cli orb
      - aws-cli/assume-role-with-web-identity
```

---

## 4. YAML Anchors (Reusable Configurations)

**Purpose**: Define reusable blocks of configuration to avoid repetition.

```yaml
# Define anchor
save_cache_config: &save_cache_config
  save_cache:
    key: deps-{{ checksum "package.json" }}
    paths:
      - node_modules

# Use anchor
restore_cache_config: &restore_cache_config
  restore_cache:
    keys:
      - deps-{{ checksum "package.json" }}
```

**Usage in Steps**:
```yaml
steps:
  - *restore_cache_config  # Reference the anchor
  - run: npm install
  - *save_cache_config     # Reference the anchor
```

**Benefits**:
- **DRY Principle**: Don't Repeat Yourself
- **Consistency**: Same configuration across jobs
- **Maintainability**: Update once, affects all references

---

## 5. Commands Section

**Purpose**: Define reusable sequences of steps that can be called from jobs.

### What Commands Do:
- **Encapsulate Logic**: Group related steps together
- **Accept Parameters**: Make commands flexible and reusable
- **Reduce Duplication**: Write once, use many times
- **Simplify Jobs**: Keep job definitions clean and readable

```yaml
commands:
  setup_environment:
    description: "Setup Node.js environment and install dependencies"
    parameters:
      node_version:
        type: string
        default: "18"
    steps:
      - checkout
      - run:
          name: Install Node.js << parameters.node_version >>
          command: |
            curl -fsSL https://deb.nodesource.com/setup_<< parameters.node_version >>.x | sudo -E bash -
            sudo apt-get install -y nodejs
      - run:
          name: Install dependencies
          command: npm ci
      - run:
          name: Verify installation
          command: |
            node --version
            npm --version

  run_tests:
    description: "Run tests with coverage"
    parameters:
      test_type:
        type: enum
        enum: ["unit", "integration", "e2e"]
        default: "unit"
    steps:
      - run:
          name: Run << parameters.test_type >> tests
          command: |
            case "<< parameters.test_type >>" in
              "unit") npm run test:unit ;;
              "integration") npm run test:integration ;;
              "e2e") npm run test:e2e ;;
            esac
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: coverage
```

**Using Commands in Jobs**:
```yaml
jobs:
  test_job:
    executor: node-executor
    steps:
      - setup_environment:
          node_version: "18"
      - run_tests:
          test_type: "unit"
```

---

## 6. Executors Section

**Purpose**: Define the execution environment where jobs run.

### What Executors Do:
- **Define Runtime Environment**: Specify Docker images, machine types, or macOS
- **Set Working Directory**: Where code is checked out
- **Configure Resources**: CPU, memory, and other resource requirements
- **Environment Variables**: Set default environment variables
- **Reusability**: Use same executor across multiple jobs

```yaml
executors:
  # Docker executor - most common
  node-executor:
    docker:
      - image: cimg/node:18.0  # Primary container
      - image: postgres:13     # Service container (optional)
        environment:
          POSTGRES_PASSWORD: password
    working_directory: ~/project
    environment:
      NODE_ENV: test
    resource_class: medium

  # Machine executor - for Docker builds or special requirements
  machine-executor:
    machine:
      image: ubuntu-2204:2022.04.1
    working_directory: ~/project
    resource_class: medium

  # macOS executor - for iOS builds
  macos-executor:
    macos:
      xcode: "14.0.0"
    working_directory: ~/project
    resource_class: medium
```

**Resource Classes**:
- `small`: 1 vCPU, 2GB RAM
- `medium`: 2 vCPU, 4GB RAM
- `large`: 3 vCPU, 8GB RAM
- `xlarge`: 4 vCPU, 8GB RAM

**Using Executors**:
```yaml
jobs:
  build:
    executor: node-executor  # References the executor defined above
    steps:
      - checkout
      - run: npm test
```

---

## 7. Jobs Section

**Purpose**: Define the actual work to be done - collections of steps that execute in an executor.

### What Jobs Do:
- **Execute Steps**: Run commands, tests, builds, deployments
- **Use Executors**: Run in specified environment
- **Store Results**: Save test results, artifacts, and logs
- **Handle Failures**: Define what happens when steps fail
- **Set Environment**: Job-specific environment variables

```yaml
jobs:
  build_and_test:
    executor: node-executor
    environment:
      DATABASE_URL: "postgresql://localhost/test_db"
    resource_class: medium
    steps:
      - checkout  # Built-in step to get source code
      - setup_environment  # Custom command
      - run:
          name: Build application
          command: npm run build
      - run:
          name: Run tests
          command: npm test
          when: always  # Run even if previous steps fail
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: build/
          destination: build-artifacts

  security_scan:
    executor: node-executor
    steps:
      - checkout
      - run:
          name: Install security scanner
          command: npm install -g audit-ci
      - run:
          name: Run security audit
          command: audit-ci --moderate
```

**Step Types**:
- `checkout`: Get source code from repository
- `run`: Execute shell commands
- `save_cache`/`restore_cache`: Cache dependencies
- `store_artifacts`: Save files for later download
- `store_test_results`: Save test results for CircleCI UI
- `persist_to_workspace`/`attach_workspace`: Share data between jobs

---

## 8. Workflows Section

**Purpose**: Orchestrate jobs - define when and how jobs run, their dependencies, and scheduling.

### What Workflows Do:
- **Job Orchestration**: Define job execution order and dependencies
- **Conditional Execution**: Run jobs based on parameters, branches, or tags
- **Parallel Execution**: Run jobs simultaneously to save time
- **Scheduling**: Run workflows on cron schedules
- **Branch/Tag Filtering**: Control when workflows run based on git refs

```yaml
workflows:
  # Basic workflow - jobs run in sequence
  build_test_deploy:
    jobs:
      - build_and_test
      - security_scan:
          requires:
            - build_and_test  # Wait for build_and_test to complete
      - deploy_staging:
          requires:
            - build_and_test
            - security_scan
          filters:
            branches:
              only: develop  # Only run on develop branch
      - deploy_production:
          requires:
            - deploy_staging
          filters:
            branches:
              only: main  # Only run on main branch

  # Conditional workflow
  feature_testing:
    when:
      and:
        - equal: [ true, << pipeline.parameters.run_tests >> ]
        - not:
            equal: [ main, << pipeline.git.branch >> ]
    jobs:
      - build_and_test

  # Scheduled workflow
  nightly_security_scan:
    triggers:
      - schedule:
          cron: "0 2 * * *"  # Run at 2 AM every day
          filters:
            branches:
              only: main
    jobs:
      - security_scan

  # Parallel jobs workflow
  parallel_testing:
    jobs:
      - unit_tests
      - integration_tests  # Runs in parallel with unit_tests
      - lint_checks        # Runs in parallel with above
      - security_scan:
          requires:
            - unit_tests
            - integration_tests
            - lint_checks
```

**Workflow Features**:
- **requires**: Job dependencies
- **filters**: Branch/tag-based execution
- **when**: Conditional logic
- **triggers**: Scheduled execution
- **context**: Shared environment variables

---

## Basic CircleCI config.yml Example

Here's a complete, basic CircleCI configuration that demonstrates all concepts:

```yaml
# .circleci/config.yml
version: 2.1

# Parameters for flexibility
parameters:
  node_version:
    type: string
    default: "18"
  run_e2e_tests:
    type: boolean
    default: false
  environment:
    type: enum
    enum: ["staging", "production"]
    default: "staging"

# Import useful orbs
orbs:
  node: circleci/node@5.0.0
  slack: circleci/slack@4.0.0

# YAML anchors for reusability
node_cache_key: &node_cache_key
  deps-v1-{{ checksum "package-lock.json" }}

save_node_cache: &save_node_cache
  save_cache:
    key: *node_cache_key
    paths:
      - ~/.npm

restore_node_cache: &restore_node_cache
  restore_cache:
    keys:
      - *node_cache_key

# Reusable commands
commands:
  setup_node_environment:
    description: "Setup Node.js and install dependencies"
    steps:
      - checkout
      - *restore_node_cache
      - run:
          name: Install Dependencies
          command: npm ci
      - *save_node_cache

  notify_slack:
    description: "Send notification to Slack"
    parameters:
      status:
        type: enum
        enum: ["success", "failure"]
    steps:
      - slack/notify:
          event: << parameters.status >>
          template: basic_success_1

# Executors
executors:
  node-executor:
    docker:
      - image: cimg/node:<< pipeline.parameters.node_version >>
    working_directory: ~/project
    environment:
      NODE_ENV: test

  node-with-db:
    docker:
      - image: cimg/node:<< pipeline.parameters.node_version >>
      - image: postgres:13
        environment:
          POSTGRES_PASSWORD: password
          POSTGRES_DB: testdb
    working_directory: ~/project
    environment:
      DATABASE_URL: "postgresql://postgres:password@localhost:5432/testdb"

# Jobs
jobs:
  # Build and basic tests
  build_and_test:
    executor: node-executor
    steps:
      - setup_node_environment
      - run:
          name: Build Application
          command: npm run build
      - run:
          name: Run Unit Tests
          command: npm run test:unit
      - store_test_results:
          path: test-results
      - store_artifacts:
          path: coverage
          destination: coverage-reports
      - persist_to_workspace:
          root: .
          paths:
            - build/
            - node_modules/

  # Linting and code quality
  code_quality:
    executor: node-executor
    steps:
      - setup_node_environment
      - run:
          name: Run ESLint
          command: npm run lint
      - run:
          name: Run Prettier Check
          command: npm run prettier:check
      - run:
          name: Type Check
          command: npm run type-check

  # Integration tests with database
  integration_tests:
    executor: node-with-db
    steps:
      - setup_node_environment
      - run:
          name: Wait for Database
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
      - run:
          name: Run Database Migrations
          command: npm run db:migrate
      - run:
          name: Run Integration Tests
          command: npm run test:integration
      - store_test_results:
          path: test-results

  # End-to-end tests (conditional)
  e2e_tests:
    executor: node-executor
    steps:
      - setup_node_environment
      - attach_workspace:
          at: .
      - run:
          name: Start Application
          command: npm start
          background: true
      - run:
          name: Wait for Application
          command: sleep 30
      - run:
          name: Run E2E Tests
          command: npm run test:e2e
      - store_artifacts:
          path: cypress/screenshots
      - store_artifacts:
          path: cypress/videos

  # Security audit
  security_audit:
    executor: node-executor
    steps:
      - setup_node_environment
      - run:
          name: Run Security Audit
          command: npm audit --audit-level moderate

  # Deployment job
  deploy:
    executor: node-executor
    parameters:
      environment:
        type: string
    steps:
      - setup_node_environment
      - attach_workspace:
          at: .
      - run:
          name: Deploy to << parameters.environment >>
          command: |
            echo "Deploying to << parameters.environment >>..."
            # Add your deployment commands here
            ./scripts/deploy.sh << parameters.environment >>
      - notify_slack:
          status: success

# Workflows
workflows:
  # Main workflow for feature branches
  build_and_test_workflow:
    jobs:
      # Parallel jobs for speed
      - build_and_test
      - code_quality
      - security_audit

      # Integration tests require database
      - integration_tests

      # E2E tests run conditionally
      - e2e_tests:
          requires:
            - build_and_test
          filters:
            branches:
              only: develop
          when: << pipeline.parameters.run_e2e_tests >>

  # Deployment workflow for main branch
  deploy_workflow:
    jobs:
      - build_and_test:
          filters: &main_branch_filter
            branches:
              only: main
      - code_quality:
          filters: *main_branch_filter
      - integration_tests:
          filters: *main_branch_filter
      - security_audit:
          filters: *main_branch_filter

      # Deploy to staging
      - deploy:
          name: deploy_staging
          environment: staging
          requires:
            - build_and_test
            - code_quality
            - integration_tests
            - security_audit
          filters: *main_branch_filter

      # Deploy to production (manual approval)
      - hold_for_approval:
          type: approval
          requires:
            - deploy_staging
          filters: *main_branch_filter

      - deploy:
          name: deploy_production
          environment: production
          requires:
            - hold_for_approval
          filters: *main_branch_filter

  # Nightly security scan
  nightly_security:
    triggers:
      - schedule:
          cron: "0 2 * * *"  # 2 AM every day
          filters:
            branches:
              only: main
    jobs:
      - security_audit
      - notify_slack:
          status: success
          requires:
            - security_audit
```

---

## Key Concepts Summary

1. **Version 2.1**: Enables all advanced features
2. **Parameters**: Make workflows flexible and reusable
3. **Orbs**: Import pre-built functionality
4. **Anchors**: Avoid configuration duplication
5. **Commands**: Create reusable step sequences
6. **Executors**: Define where jobs run
7. **Jobs**: Define what work gets done
8. **Workflows**: Orchestrate when and how jobs run

---

## Creating Your Own Config

### Step-by-Step Process:

1. **Start Simple**: Begin with basic build → test → deploy
2. **Add Gradually**: Introduce features as needed
3. **Use Orbs**: Don't reinvent common functionality
4. **Optimize for Speed**: Use parallelism and caching
5. **Test Locally**: Use CircleCI CLI to validate config
6. **Monitor**: Use CircleCI insights to optimize performance

### Best Practices:

- **Use meaningful job and step names**
- **Cache dependencies to speed up builds**
- **Run jobs in parallel when possible**
- **Use workspaces to share data between jobs**
- **Store test results and artifacts for debugging**
- **Use conditional workflows to save resources**
- **Set up proper notifications for failures**

### Common Patterns:

```yaml
# Fast feedback loop
workflows:
  quick_feedback:
    jobs:
      - lint        # Fast
      - unit_tests  # Fast
      - build:      # Slower
          requires: [lint, unit_tests]
      - integration_tests:  # Slowest
          requires: [build]

# Branch-based deployment
workflows:
  deployment:
    jobs:
      - test
      - deploy_staging:
          requires: [test]
          filters:
            branches:
              only: develop
      - deploy_production:
          requires: [test]
          filters:
            branches:
              only: main
```

This configuration provides a solid foundation that you can customize for your specific needs!

## Additional Resources

- [CircleCI Documentation](https://circleci.com/docs/)
- [CircleCI Orb Registry](https://circleci.com/developer/orbs)
- [CircleCI CLI Tool](https://circleci.com/docs/local-cli/)
- [YAML Validator](https://yaml-online-parser.appspot.com/)
- [Cron Expression Generator](https://crontab.guru/)