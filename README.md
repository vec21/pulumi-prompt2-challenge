# 🚀 Pulumi Prompt 2 — CI/CD with GitHub Actions

My submission for **Prompt 2** of the [Pulumi Challenge on DEV.to](https://dev.to/challenges/pulumi)!
This project automates the deployment of an S3 bucket to AWS with Pulumi and GitHub Actions, hosting a static mini-site 🚧📦.

---
# 📌 Overview

## 📦 Prompt 1: Manual Deployment with Pulumi
- Creating an **S3 bucket** on AWS using **Pulumi (Python)**.
- Deploying a **static mini-site** (`HTML`, `CSS`, `JS`) documenting my journey learning Infrastructure as Code (IaC).
- Deployment was done manually via `pulumi up`.

**Explore the code and contribute to the project**: [Pulumi S3 Challenge](https://github.com/vec21/pulumi-s3-challenge)

## 🤖 Prompt 2: CI/CD with GitHub Actions
- I set up a **CI/CD** pipeline with **GitHub Actions**.
- The `deploy.yml` workflow runs `pulumi up` automatically on every `push` to the `main` branch.

## Workflow setup

```yaml
name: Deploy Pulumi Prompt 2

about:
push:
branches:
- main

jobs:
deploy:
run: ubuntu-latest

steps:
- name: Checkout repository
uses: actions/checkout@v4

- name: Install Pulumi
run: |
curl -fsSL https://get.pulumi.com | sh
echo "$HOME/.pulumi/bin" >> $GITHUB_PATH

- name: Configure Python
uses: actions/setup-python@v5
with:
python-version: '3.x'

- name: Install dependencies
run: |
pip install pulumi pulumi-aws

- name: Configure credentials
env:
AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
run: |
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY

- name: Deploy with Pulumi
env:
PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
run: |
pulumi login
pulumi stack select dev # Adjust for your stack
pulumi up --yes
```

- The website in the S3 bucket is updated with each new code change.

---

## 🌐 Access the Website

The website is hosted on the S3 bucket:
🔗 [**https://d33ejg1jsmvn6g.cloudfront.net/index.html**](https://d33ejg1jsmvn6g.cloudfront.net/index.html)

---

# 🚀 How to run the project

### 📋 Prerequisites
Before you start, you will need:
- **AWS account** with permissions to create resources (S3, IAM, etc.)
- **AWS CLI** configured or credentials via GitHub Secrets
- **Pulumi account** (free) and access token (`PULUMI_ACCESS_TOKEN`)
- **Python 3.x** and `pip` installed
- **Git** and GitHub account
- **Codebase** of the Prompt 1 (if you are reusing)

### 🛠 Step by Step

1. **Preparing the Repository**
```bash
git clone https://github.com/your-username/pulumi-prompt-2.git
cd pulumi-prompt-2
```

2. **Setting Secrets** (without GitHub)
- Go to Settings > Secrets > Actions
- Add:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `PULUMI_ACCESS_TOKEN`

3. **Workflow CI/CD**
- GitHub Actions will be run automatically when pushing:
```yaml
# .github/workflows/deploy.yml
on: [push]
jobs:
deploy:
run: ubuntu-latest
steps:
- uses: actions/checkout@v4
- run: pip install pulumi pulumi-aws
- run: pulumi up --yes
```

4. **First Deploy**
```bash
git add . git commit -m "Initial commit"
git push main origin
```

5. **Verification**
- Follow the deployment in the **Actions** tab
- Access the created S3 bucket:
```
http://<bucket-name>.s3-website-<region>.amazonaws.com
```

---

## 🗂Project Structure

```
pulumi-prompt-2/
├── www/ # Static mini-site (HTML, CSS, JS)
├── __main__.py # Pulumi code to create the bucket and upload the files
└── .github/
└── workflows/
└── deploy.yml # CI/CD workflow with GitHub Actions
```

---

## 🏆 Pulumi Contest

This project was created as part of the **Pulumi + DEV.to** contest.
🔗 The link to the article with my submission will be added here after publication.

---

Made with 💙 by **Veríssimo**