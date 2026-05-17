# 🚀 Full Cloud DevOps Project — MERN Stack

A complete DevOps pipeline for a MERN (MongoDB, Express, React, Node.js) ecommerce application using industry-standard tools.

---

## 📌 Project Overview

This project demonstrates a complete CI/CD pipeline with:
- **Terraform** — Infrastructure as Code (creates AWS EC2 automatically)
- **Jenkins** — CI/CD pipeline (builds and deploys on every code push)
- **Docker** — Containerizes frontend and backend
- **Kubernetes (Minikube)** — Orchestrates and manages containers
- **Prometheus + Grafana** — Monitors the application and server

---

## 🏗️ Project Structure

```
FullCloudDevopsProject/
├── backend/                  # Node.js + Express API
│   └── Dockerfile
├── frontend/                 # React (Vite) App
│   ├── Dockerfile
│   └── nginx.conf
├── k8s/                      # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── mongo-deployment.yaml
├── prometheus/               # Monitoring config
│   └── prometheus.yml
├── terraform/                # AWS Infrastructure
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── userdata.sh
├── Jenkinsfile               # CI/CD Pipeline
└── docker-compose.yml        # Local development
```

---

## 🔄 CI/CD Pipeline Flow

```
Developer pushes code to GitHub
        ↓
GitHub sends webhook to Jenkins
        ↓
Jenkins pulls latest code
        ↓
Stage 1 → Clone Repository
Stage 2 → Build Docker Images
Stage 3 → Push to DockerHub
Stage 4 → Deploy to Kubernetes
        ↓
Prometheus scrapes metrics
        ↓
Grafana displays dashboards
```

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| Containerization | Docker |
| Orchestration | Kubernetes (Minikube) |
| CI/CD | Jenkins |
| Infrastructure | Terraform + AWS EC2 |
| Monitoring | Prometheus + Grafana |
| Version Control | Git + GitHub |

---

## ⚙️ Prerequisites

Before running this project you need:
- AWS Account with credits
- DockerHub account
- GitHub account
- Terraform installed
- AWS CLI installed + configured

---

## 🚀 How to Deploy

### Step 1 — Clone the repo
```bash
git clone https://github.com/jassika-kaur/FullCloudDevopsProject.git
cd FullCloudDevopsProject
```

### Step 2 — Update variables
In `terraform/variables.tf`:
```hcl
variable "key_name" {
  default = "terraform-key"   # your AWS key pair name
}
```

In `Jenkinsfile`:
```groovy
DOCKERHUB_USERNAME = "your-dockerhub-username"
```

### Step 3 — Launch AWS EC2 with Terraform
```bash
cd terraform
terraform init
terraform apply
```

### Step 4 — Open Jenkins
After terraform apply finishes:
```
http://<EC2-IP>:8080
```

### Step 5 — Setup Jenkins Pipeline
1. Install suggested plugins
2. Add DockerHub credentials
3. Create pipeline job pointing to this repo
4. Add GitHub webhook

### Step 6 — Push code and watch pipeline run! 🎉

---

## 📊 Monitoring

| Tool | URL |
|---|---|
| Jenkins | http://EC2-IP:8080 |
| Prometheus | http://EC2-IP:9090 |
| Grafana | http://EC2-IP:3001 |
| Frontend App | http://EC2-IP:30300 |
| Backend API | http://EC2-IP:30500 |

---

## 👩‍💻 Author

**Jassika Kaur**
- GitHub: [@jassika-kaur](https://github.com/jassika-kaur)

---

## 📝 License

This project is for learning purposes.
